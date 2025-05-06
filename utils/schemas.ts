import * as z from "zod";
import { ZodSchema } from "zod";

export const profileSchema = z.object({
   firstName: z.string().min(2, {message: "نام حداقل باید دو حروف شامل شود"}),
   lastName: z.string().min(2, {message: "نام خانوادگی حداقل باید دو حروف شامل شود"}),
   username: z.string().min(2, {message: "نام کاربری حداقل باید دو حروف شامل شود"}),
});
