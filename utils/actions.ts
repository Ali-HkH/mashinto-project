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

const getAuthUser = async () => {
   const user = await currentUser();
   if (!user) {
      throw new Error("برای ساخت پروفایل ابتدا لاگین کنید");
   }
   if (!user.privateMetadata.hasProfile) redirect("/profile/create");
   return user;
};

const renderError = (error: unknown): { message: string } => {
   console.log(error);
   return {
      message: error instanceof Error ? error.message : "خطایی روی داده است",
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

export async function fetchPropertyReviews(carId: string) {
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

export const fetchPropertyReviewsByUser = async () => {
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

export const deleteReviewAction = async (prevState: { reviewId: string }) => {
   const { reviewId } = prevState;
   const user = await getAuthUser();

   try {
      await db.review.delete({
         where: {
            id: reviewId,
            profileId: user.id,
         },
      });

      revalidatePath("/reviews");
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
