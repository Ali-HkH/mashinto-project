import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { NounGasoline, NounDiesel, NounElectric, NounHybrid  } from "@/utils/icons";

const name = "fuelType";
function FuelTypeInput({ defaultValue }: { defaultValue?: string }) {
   return (
      <div className="mb-2 min-w-sm">
         <Label htmlFor={name} className="mb-1">
            سوخت
         </Label>
         <Select defaultValue="بنزین" name={name} required>
            <SelectTrigger id={name}>
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="بنزین">
                  <span className="flex items-center gap-2">
                     <NounGasoline
                        style={{ width: "30px", height: "30px", color: "#408BFF"}}
                     />
                     بنزین
                  </span>
               </SelectItem>
               <SelectItem value="دیزل">
                  <span className="flex items-center gap-2">
                     <NounDiesel
                        style={{ width: "30px", height: "30px", color: "#408BFF"}}
                     />
                     دیزل
                  </span>
               </SelectItem>
               <SelectItem value="برقی">
                  <span className="flex items-center gap-2">
                     <NounElectric
                        style={{ width: "30px", height: "30px", color: "#408BFF"}}
                     />
                     برقی
                  </span>
               </SelectItem>
               <SelectItem value="هیبرید">
                  <span className="flex items-center gap-2">
                     <NounHybrid
                        style={{ width: "30px", height: "30px", color: "#408BFF"}}
                     />
                     هیبرید
                  </span>
               </SelectItem>
            </SelectContent>
         </Select>
      </div>
   );
}
export default FuelTypeInput;
