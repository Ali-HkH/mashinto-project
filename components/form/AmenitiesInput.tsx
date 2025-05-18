"use client";
import { useState } from "react";
import { amenities, Amenity } from "@/utils/amenities";
import { Checkbox } from "@/components/ui/checkbox";
import { BsFillQuestionCircleFill } from "react-icons/bs";

function AmenitiesInput({ defaultValue }: { defaultValue?: Amenity[] }) {
   const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>(
      defaultValue || amenities
   );

   const handleChange = (amenity: Amenity) => {
      setSelectedAmenities((prev) => {
         return prev.map((item) => {
            if (item.name === amenity.name) {
               return { ...item, selected: !item.selected };
            }
            return item;
         });
      });
   };

   return (
      <section>
         <input
            type="hidden"
            name="amenities"
            value={JSON.stringify(selectedAmenities)}
         />
         <div className="grid grid-cols-2 gap-4">
            {selectedAmenities.map((amenity) => (
               <div key={amenity.name} className="flex items-center space-x-2">
                  <Checkbox
                     id={amenity.name}
                     checked={amenity.selected}
                     onCheckedChange={() => handleChange(amenity)}
                     className="cursor-pointer"
                  />
                  <label
                     htmlFor={amenity.name}
                     className="text-sm font-medium leading-none flex gap-x-2 items-center"
                  >
                     {amenity.name}
                     <BsFillQuestionCircleFill className="w-3 h-3 -rotate-y-180 text-primary" />
                  </label>
               </div>
            ))}
         </div>
      </section>
   );
}
export default AmenitiesInput;
