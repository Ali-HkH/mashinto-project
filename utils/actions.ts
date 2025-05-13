"use server";

import db from "./db";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { carSchema, imageSchema, profileSchema, validateWithZodSchema } from "./schemas";
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
    const file = formData.get('image') as File;

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
  redirect('/');
};