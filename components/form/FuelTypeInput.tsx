import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { fuelTypes } from "@/utils/fuelTypes";

const name = "fuelType";
function FuelTypeInput({ defaultValue }: { defaultValue?: string }) {
   return (
      <div className="mb-2 min-w-sm">
         <Label htmlFor={name} className="mb-1">
            سوخت
         </Label>
         <Select defaultValue={defaultValue || "بنزین"} name={name} required>
            <SelectTrigger id={name}>
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               {fuelTypes.map((item) => (
                  <SelectItem key={item.label} value={item.label}>
                     <span className="flex items-center gap-2">
                        <item.icon
                           style={{
                              width: "30px",
                              height: "30px",
                              color: "#408BFF",
                           }}
                        />
                        {item.label}
                     </span>
                  </SelectItem>
               ))}
            </SelectContent>
         </Select>
      </div>
   );
}
export default FuelTypeInput;
