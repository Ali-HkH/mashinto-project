import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { NounAutoTransmission, NounManualTransmission } from "@/utils/icons";

const name = "transmission";
function TransmissionInput({ defaultValue }: { defaultValue?: string }) {
   return (
      <div className="mb-2 min-w-sm">
         <Label htmlFor={name} className="mb-1">
            گیربکس
         </Label>
         <Select
            defaultValue={defaultValue || "گیربکس دستی"}
            name={name}
            required
         >
            <SelectTrigger id={name}>
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               <SelectItem value="گیربکس دستی">
                  <span className="flex items-center gap-2">
                     <NounManualTransmission
                        style={{
                           width: "30px",
                           height: "30px",
                           color: "#408BFF",
                        }}
                     />
                     گیربکس دستی
                  </span>
               </SelectItem>
               <SelectItem value="گیربکس اتومات">
                  <span className="flex items-center gap-2">
                     <NounAutoTransmission
                        style={{
                           width: "30px",
                           height: "30px",
                           color: "#408BFF",
                        }}
                     />
                     گیربکس اتومات
                  </span>
               </SelectItem>
            </SelectContent>
         </Select>
      </div>
   );
}
export default TransmissionInput;
