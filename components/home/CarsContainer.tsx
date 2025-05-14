import { fetchCars } from "@/utils/actions";
import type { CarCardProps } from "@/utils/types";
import EmptyList from "./EmptyList";
import CarsList from "./CarsList";

async function CarsContainer({
   category,
   search,
}: {
   category?: string;
   search?: string;
}) {
   const cars: CarCardProps[] = await fetchCars({
      category,
      search,
   });

   if (cars.length === 0) {
      return (
         <EmptyList
            heading="نتیجه ای یافت نشد"
            message="سعی کنید فیلتر ها را تغییر دهید یا پاک کنید."
            btnText="پاک کردن فیلتر ها"
         />
      );
   }

   return <CarsList cars={cars} />;
}
export default CarsContainer;
