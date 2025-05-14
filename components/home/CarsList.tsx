import { CarCardProps } from "@/utils/types";
import CarCard from "../card/CarCard";

function CarsList({ cars }: { cars: CarCardProps[] }) {
   return (
      <section className="mt-4 gap-12 grid sm:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4">
         {cars.map((car) => {
            return <CarCard key={car.id} car={car} />;
         })}
      </section>
   );
}

export default CarsList;
