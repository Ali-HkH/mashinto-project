import { Label } from "@/components/ui/label";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { iranianCities } from "@/utils/citiesData";
import { MdLocationPin } from "react-icons/md";

const name = "city";
function CitiesInput({ defaultValue }: { defaultValue?: string }) {
   return (
      <div className="mb-2 min-w-sm">
         <Label htmlFor={name} className="mb-1">
            شهر
         </Label>
         <Select
            defaultValue={defaultValue || iranianCities[23].name}
            name={name}
            required
         >
            <SelectTrigger id={name}>
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
               {iranianCities.map((item) => {
                  return (
                     <SelectItem key={item.coordinates.lat} value={item.name}>
                        <div className="flex items-center gap-2">
                           <MdLocationPin style={{ color: "#408BFF" }} />
                           <span>
                              {item.name} ({item.province})
                           </span>
                        </div>
                     </SelectItem>
                  );
               })}
            </SelectContent>
         </Select>
      </div>
   );
}

export default CitiesInput;
