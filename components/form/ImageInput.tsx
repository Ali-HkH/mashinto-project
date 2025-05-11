import { Label } from "../ui/label";
import { Input } from "../ui/input";

function ImageInput() {
   const name = "image";
   return (
      <div className="mb-2">
         <Label htmlFor={name} className="mb-1">
            عکس (حداکثر 3 مگابایت)
         </Label>
         <Input
            id={name}
            name={name}
            type="file"
            required
            accept="image/*"
            className="max-w-xs mb-2"
         />
      </div>
   );
}
export default ImageInput;
