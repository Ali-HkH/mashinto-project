"use server";

import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
   carSchema,
   createReviewSchema,
   imageSchema,
   profileSchema,
   validateWithZodSchema,
} from "./schemas";
import { uploadImage } from "./supabase";
import { calculateTotals } from "./calculateTotals";
import { formatDate } from "./formats";

const getAuthUser = async () => {
   const user = await currentUser();
   if (!user) {
      throw new Error("برای ساخت پروفایل ابتدا لاگین کنید");
   }
   if (!user.privateMetadata.hasProfile) redirect("/profile/create");
   return user;
};

const getAdminUser = async () => {
   const user = await getAuthUser();
   if (user.id !== process.env.ADMIN_USER_ID) redirect("/");
   return user;
};

const renderError = (error: unknown): { message: string } => {
   console.log(error);
   return {
      message:
         error instanceof Error ? error.message : "خطایی ناشناس روی داده است",
   };
};

export const createProfileAction = async (
   prevState: any,
   formData: FormData
) => {
   try {
      const user = await currentUser();
      if (!user) throw new Error("برای ساخت پروفایل ابتدا لاگین کنید");

      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(profileSchema, rawData);
      await db.profile.create({
         data: {
            clerkId: user.id,
            email: user.emailAddresses[0].emailAddress,
            profileImage: user.imageUrl ?? "",
            ...validatedFields,
         },
      });
      const client = await clerkClient();
      await client.users.updateUserMetadata(user.id, {
         privateMetadata: {
            hasProfile: true,
         },
      });
   } catch (error) {
      return renderError(error);
   }
   redirect("/");
};

export const fetchProfileImage = async () => {
   const user = await currentUser();
   if (!user) return null;

   const profile = await db.profile.findUnique({
      where: {
         clerkId: user.id,
      },
      select: {
         profileImage: true,
      },
   });
   return profile?.profileImage;
};

export const fetchProfile = async () => {
   const user = await getAuthUser();

   const profile = await db.profile.findUnique({
      where: {
         clerkId: user.id,
      },
   });
   if (!profile) return redirect("/profile/create");
   return profile;
};

export const updateProfileAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const user = await getAuthUser();
   try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(profileSchema, rawData);

      await db.profile.update({
         where: {
            clerkId: user.id,
         },
         data: validatedFields,
      });
      revalidatePath("/profile");
      return { message: "نمایه شما بروز رسانی شد" };
   } catch (error) {
      return renderError(error);
   }
};

export const updateProfileImageAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const user = await getAuthUser();
   try {
      const image = formData.get("image") as File;
      const validatedFields = validateWithZodSchema(imageSchema, { image });
      const fullPath = await uploadImage(validatedFields.image);

      await db.profile.update({
         where: {
            clerkId: user.id,
         },
         data: {
            profileImage: fullPath,
         },
      });
      revalidatePath("/profile");
      return { message: "عکس نمایه بروزرسانی شد" };
   } catch (error) {
      return renderError(error);
   }
};

export const createRentalCarAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const user = await getAuthUser();
   try {
      const rawData = Object.fromEntries(formData);
      const file = formData.get("image") as File;

      const validatedFields = validateWithZodSchema(carSchema, rawData);
      const validatedFile = validateWithZodSchema(imageSchema, { image: file });
      const fullPath = await uploadImage(validatedFile.image);

      await db.car.create({
         data: {
            ...validatedFields,
            image: fullPath,
            profileId: user.id,
         },
      });
   } catch (error) {
      return renderError(error);
   }
   redirect("/");
};

export const fetchCars = async ({
   search = "",
   category,
}: {
   search?: string;
   category?: string;
}) => {
   const cars = await db.car.findMany({
      where: {
         category,
         OR: [
            { company: { contains: search, mode: "insensitive" } },
            { model: { contains: search, mode: "insensitive" } },
            { tagline: { contains: search, mode: "insensitive" } },
         ],
      },
      select: {
         id: true,
         company: true,
         model: true,
         tagline: true,
         city: true,
         image: true,
         price: true,
      },
   });
   return cars;
};

export const fetchFavoriteId = async ({ carId }: { carId: string }) => {
   const user = await getAuthUser();
   const favorite = await db.favorite.findFirst({
      where: {
         carId,
         profileId: user.id,
      },
      select: {
         id: true,
      },
   });
   return favorite?.id || null;
};

export const toggleFavoriteAction = async (prevState: {
   carId: string;
   favoriteId: string | null;
   pathname: string;
}) => {
   const user = await getAuthUser();
   const { carId, favoriteId, pathname } = prevState;
   try {
      if (favoriteId) {
         await db.favorite.delete({
            where: {
               id: favoriteId,
            },
         });
      } else {
         await db.favorite.create({
            data: {
               carId,
               profileId: user.id,
            },
         });
      }
      revalidatePath(pathname);
      return {
         message: favoriteId
            ? "از موردعلاقه ها حذف شد"
            : "به موردعلاقه ها اضافه شد",
      };
   } catch (error) {
      return renderError(error);
   }
};

export const fetchFavorites = async () => {
   const user = await getAuthUser();
   const favorites = await db.favorite.findMany({
      where: {
         profileId: user.id,
      },
      select: {
         car: {
            select: {
               id: true,
               company: true,
               model: true,
               tagline: true,
               price: true,
               city: true,
               image: true,
            },
         },
      },
   });
   return favorites.map((favorite) => favorite.car);
};

export const fetchCarDetails = async (id: string) => {
   return db.car.findUnique({
      where: {
         id,
      },
      include: {
         profile: true,
         bookings: {
            select: {
               checkIn: true,
               checkOut: true,
            },
         },
      },
   });
};

export async function createReviewAction(prevState: any, formData: FormData) {
   const user = await getAuthUser();
   try {
      const rawData = Object.fromEntries(formData);

      const validatedFields = validateWithZodSchema(
         createReviewSchema,
         rawData
      );
      await db.review.create({
         data: {
            ...validatedFields,
            profileId: user.id,
         },
      });
      revalidatePath(`/cars/${validatedFields.carId}`);
      return { message: "بازخورد شما ثبت شد" };
   } catch (error) {
      return renderError(error);
   }
}

export async function fetchCarReviews(carId: string) {
   const reviews = await db.review.findMany({
      where: {
         carId,
      },
      select: {
         id: true,
         rating: true,
         comment: true,
         profile: {
            select: {
               firstName: true,
               profileImage: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });
   return reviews;
}

export const fetchCarReviewsByUser = async () => {
   const user = await getAuthUser();
   const reviews = await db.review.findMany({
      where: {
         profileId: user.id,
      },
      select: {
         id: true,
         rating: true,
         comment: true,
         car: {
            select: {
               company: true,
               model: true,
               image: true,
            },
         },
      },
   });
   return reviews;
};

export const deleteReviewAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const reviewId = formData.get("reviewId") as string;
   const user = await getAuthUser();

   try {
      await db.review.delete({
         where: {
            id: reviewId,
            profileId: user.id,
         },
      });
      return { message: "بازخورد شما حذف شد" };
   } catch (error) {
      return renderError(error);
   }
};

export const findExistingReview = async (userId: string, carId: string) => {
   return db.review.findFirst({
      where: {
         profileId: userId,
         carId: carId,
      },
   });
};

export async function fetchCarRating(carId: string) {
   const result = await db.review.groupBy({
      by: ["carId"],
      _avg: {
         rating: true,
      },
      _count: {
         rating: true,
      },
      where: {
         carId,
      },
   });

   // empty array if no reviews
   return {
      rating: result[0]?._avg.rating?.toFixed(1) ?? 0,
      count: result[0]?._count.rating ?? 0,
   };
}

export const createBookingAction = async (prevState: {
   carId: string;
   checkIn: Date;
   checkOut: Date;
}) => {
   const user = await getAuthUser();

   const { carId, checkIn, checkOut } = prevState;

   const car = await db.car.findUnique({
      where: { id: carId },
      select: { price: true },
   });
   if (!car) {
      return { message: "ماشینی پیدا نشد!" };
   }

   const { orderTotal, totalDays } = calculateTotals({
      checkIn,
      checkOut,
      price: car.price,
   });

   try {
      await db.booking.create({
         data: {
            checkIn,
            checkOut,
            orderTotal,
            totaldays: totalDays,
            profileId: user.id,
            carId,
         },
      });
   } catch (error) {
      return renderError(error);
   }
   redirect("/bookings");
};

export const fetchBookings = async () => {
   const user = await getAuthUser();
   const bookings = await db.booking.findMany({
      where: {
         profileId: user.id,
      },
      include: {
         car: {
            select: {
               id: true,
               company: true,
               model: true,
               city: true,
            },
         },
      },
      orderBy: {
         checkIn: "desc",
      },
   });
   return bookings;
};

export const deleteBookingAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const bookingId = formData.get("bookingId") as string;
   const user = await getAuthUser();
   try {
      await db.booking.delete({
         where: {
            id: bookingId,
            profileId: user.id,
         },
      });
      return { message: "کرایه شما لغو و حذف شد." };
   } catch (error) {
      return renderError(error);
   }
};

export const fetchRentals = async () => {
   const user = await getAuthUser();
   const rentals = await db.car.findMany({
      where: {
         profileId: user.id,
      },
      select: {
         id: true,
         company: true,
         model: true,
         price: true,
      },
   });

   const rentalsWithBookingSums = await Promise.all(
      rentals.map(async (rental) => {
         const totalDaysSum = await db.booking.aggregate({
            where: {
               carId: rental.id,
            },
            _sum: {
               totaldays: true,
            },
         });

         const orderTotalSum = await db.booking.aggregate({
            where: {
               carId: rental.id,
            },
            _sum: {
               orderTotal: true,
            },
         });

         return {
            ...rental,
            totalDaysSum: totalDaysSum._sum.totaldays,
            orderTotalSum: orderTotalSum._sum.orderTotal,
         };
      })
   );

   return rentalsWithBookingSums;
};

export const deleteRentalAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const carId = formData.get("carId") as string;
   const user = await getAuthUser();

   try {
      await db.car.delete({
         where: {
            id: carId,
            profileId: user.id,
         },
      });
      return { message: "اجاره شما با موفقیت حذف شد." };
   } catch (error) {
      return renderError(error);
   }
};

export const fetchRentalDetails = async (carId: string) => {
   const user = await getAuthUser();

   return db.car.findUnique({
      where: {
         id: carId,
         profileId: user.id,
      },
   });
};

export const updateCarInfoAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const user = await getAuthUser();
   const carId = formData.get("id") as string;
   try {
      const rawData = Object.fromEntries(formData);
      const validatedFields = validateWithZodSchema(carSchema, rawData);
      await db.car.update({
         where: {
            id: carId,
            profileId: user.id,
         },
         data: {
            ...validatedFields,
         },
      });

      revalidatePath(`/rentals/${carId}/edit`);
      return { message: "اطلاعات خودرو بروزرسانی شد." };
   } catch (error) {
      return renderError(error);
   }
};

export const updateCarImageAction = async (
   prevState: any,
   formData: FormData
): Promise<{ message: string }> => {
   const user = await getAuthUser();
   const carId = formData.get("id") as string;

   try {
      const image = formData.get("image") as File;
      const validatedFields = validateWithZodSchema(imageSchema, { image });
      const fullPath = await uploadImage(validatedFields.image);

      await db.car.update({
         where: {
            id: carId,
            profileId: user.id,
         },
         data: {
            image: fullPath,
         },
      });
      revalidatePath(`/rentals/${carId}/edit`);
      return { message: "عکس خودرو ویرایش شد." };
   } catch (error) {
      return renderError(error);
   }
};

export const fetchReservations = async () => {
   const user = await getAuthUser();

   const reservations = await db.booking.findMany({
      where: {
         car: {
            profileId: user.id,
         },
      },
      orderBy: {
         createdAt: "desc",
      },
      include: {
         car: {
            select: {
               id: true,
               company: true,
               model: true,
               price: true,
               city: true,
            },
         },
      },
   });
   return reservations;
};

export const fetchStats = async () => {
   await getAdminUser();

   const usersCount = await db.profile.count();
   const carsCount = await db.car.count();
   const bookingsCount = await db.booking.count();

   return {
      usersCount,
      carsCount,
      bookingsCount,
   };
};

export const fetchChartsData = async () => {
   await getAdminUser();
   const date = new Date();
   date.setMonth(date.getMonth() - 6);
   const sixMonthsAgo = date;

   const bookings = await db.booking.findMany({
      where: {
         createdAt: {
            gte: sixMonthsAgo,
         },
      },
      orderBy: {
         createdAt: "asc",
      },
   });
   let bookingsPerMonth = bookings.reduce((total, current) => {
      const date = formatDate(current.createdAt, true);

      const existingEntry = total.find((entry) => entry.date === date);
      if (existingEntry) {
         existingEntry.count += 1;
      } else {
         total.push({ date, count: 1 });
      }
      return total;
   }, [] as Array<{ date: string; count: number }>);
   return bookingsPerMonth;
};

export const fetchAllRentals = async () => {
   await getAdminUser();

   const rentals = await db.car.findMany({
      select: {
         id: true,
         company: true,
         model: true,
         price: true,
         city: true,
         color: true,
         image: true,
         profile: {
            select: {
               username: true,
               email: true,
            },
         },
      },
   });

   return rentals;
};

export const deleteUserRental = async (prevState: any, formData: FormData) => {
   const rentalId = formData.get("rentalId") as string;
   await getAdminUser();

   try {
      await db.car.delete({
         where: {
            id: rentalId,
         },
      });
      return { message: "اجاره کاربر جاری با موفقیت حذف شد." };
   } catch (error) {
      return renderError(error);
   }
};

export const fetchAllUsers = async () => {
   await getAdminUser();

   const users = await db.profile.findMany({
      select: {
         id: true,
         clerkId: true,
         firstName: true,
         lastName: true,
         username: true,
         profileImage: true,
         email: true,
         createdAt: true,
         _count: {
            select: {
               cars: true,
               bookings: true,
            },
         },
      },
      orderBy: {
         createdAt: "desc",
      },
   });
   return users;
};

export const adminDeleteUser = async (prevState: any, formData: FormData) => {
   await getAdminUser();
   const userId = formData.get("userId") as string;

   try {
      await db.profile.delete({
         where: {
            id: userId,
         },
      });
      return { message: "کاربر مدنظر با موفقیت حذف شد." };
   } catch (error) {
      return renderError(error);
   }
};

