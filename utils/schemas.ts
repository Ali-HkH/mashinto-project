import * as z from "zod";
import { ZodSchema } from "zod";

export function validateWithZodSchema<T>(
   schema: ZodSchema<T>,
   data: unknown
): T {
   const result = schema.safeParse(data);
   if (!result.success) {
      const errors = result.error.errors.map((error) => error.message);

      throw new Error(errors.join(", "));
   }
   return result.data;
}

export const profileSchema = z.object({
   firstName: z.string().min(2, { message: "نام حداقل باید دو حروف شامل شود" }),
   lastName: z
      .string()
      .min(2, { message: "نام خانوادگی حداقل باید دو حروف شامل شود" }),
   username: z
      .string()
      .min(2, { message: "نام کاربری حداقل باید دو حروف شامل شود" }),
});

export const imageSchema = z.object({
   image: validateFile(),
});

function validateFile() {
   const maxUploadSize = 3 * 1024 * 1024;
   const acceptedFileTypes = ["image/"];
   return z
      .instanceof(File)
      .refine((file) => !file || file.size <= maxUploadSize, {
         message: "اندازه فایل باید کمتر از 3 مگابایت باشد",
      })
      .refine(
         (file) =>
            !file ||
            acceptedFileTypes.some((type) => file.type.startsWith(type)),
         { message: "فایل باید فرمت عکس داشته باشد" }
      );
}

export const carSchema = z.object({
   company: z
      .string()
      .min(2, {
         message: "شرکت حداقل باید شامل 2 حرف باشد",
      })
      .max(20, {
         message: "شرکت حداکثر باید شامل 20 حرف باشد",
      }),
   model: z
      .string()
      .min(2, {
         message: "مدل حداقل باید شامل 2 حرف باشد",
      })
      .max(20, {
         message: "مدل حداکثر باید شامل 20 حرف باشد",
      }),
   tagline: z
      .string()
      .min(5, {
         message: "شعار حداقل باید شامل 5 حرف باشد",
      })
      .max(100, {
         message: "شعار حداکثر باید شامل 100 حرف باشد",
      }),
   description: z.string().refine(
      (description) => {
         const wordCount = description.split(" ").length;
         return wordCount >= 10 && wordCount <= 500;
      },
      {
         message: "توصیف باید بین 10 تا 500 کلمه باشد",
      }
   ),
   color: z
   .string()
   .min(5, {
      message: "رنگ حداقل باید شامل 5 حرف باشد",
   })
   .max(15, {
      message: "رنگ حداکثر باید شامل 15 حرف باشد",
   }),
   category: z.string(),
   city: z.string(),
   transmission: z.string(),
   fuelType: z.string(),
   year: z.coerce.number().int().min(0, {
      message: "سال ساخت باید عددی مثبت باشد",
   }),
   price: z.coerce.number().int().min(0, {
      message: "مبلغ باید عددی مثبت باشد",
   }),
   kilometer: z.coerce.number().int().min(0, {
      message: "کیلومتر کارکرد باید عددی مثبت باشد",
   }),
   seats: z.coerce.number().int().min(0, {
      message: "تعداد صندلی  باید عددی مثبت باشد",
   }),
   doors: z.coerce.number().int().min(0, {
      message: "تعداد در باید عددی مثبت باشد",
   }),
   amenities: z.string(),
});
