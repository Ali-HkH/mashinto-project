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
