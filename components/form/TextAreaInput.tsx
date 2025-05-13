import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type TextAreaInputProps = {
   name: string;
   labelText?: string;
   defaultValue?: string;
};

function TextAreaInput({ name, labelText, defaultValue }: TextAreaInputProps) {
   return (
      <div className="mb-8">
         <Label htmlFor={name} className="mb-1">
            {labelText || name}
         </Label>
         <Textarea
            id={name}
            name={name}
            defaultValue={defaultValue || tempDefaultDescription}
            rows={5}
            required
            className="leading-loose"
         />
      </div>
   );
}

const tempDefaultDescription =
   "این خودروی شیک و پرامکانات، انتخاب ایده‌آلی برای سفرهای درون‌شهری، مسافرت‌های جاده‌ای و مناسبت‌های رسمی می‌باشد. سدان ارائه‌شده با طراحی مدرن و کلاسیک، ترکیبی منحصر به فرد از زیبایی و عملکرد را به شما عرضه می‌کند.";

export default TextAreaInput;
