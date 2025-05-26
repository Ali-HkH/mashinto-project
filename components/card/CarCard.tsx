import Image from "next/image";
import Link from "next/link";
import CarRating from "./CarRating";
import FavoriteToggleButton from "./FavoriteToggleButton";
import { CarCardProps } from "@/utils/types";
import { formatCurrency } from "@/utils/formats";
import { MdLocationPin } from "react-icons/md";

function CarCard({ car }: { car: CarCardProps }) {
   const { company, model, image, price } = car;
   const { city, id: carId, tagline } = car;
   const name = `${company} ${model}`;
   return (
      <article className="group relative">
         <Link href={`/cars/${carId}`}>
            <div className="relative h-[300px] mb-2 overflow-hidden rounded-md">
               <Image
                  src={image}
                  alt={model}
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  className="rounded-md object-cover transform group-hover:scale-110 transition-transform duration-500"
               />
            </div>
            <div className="flex justify-between items-center mt-2">
               <h3 className="text-sm font-semibold">
                  {name.substring(0, 30)}
               </h3>
               <CarRating carId={carId} inPage={false} />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
               {tagline.substring(0, 40)}
            </p>
            <div className="flex justify-between items-center mt-1">
               <p className="text-sm mt-1 ">
                  <span className="font-semibold">
                     {formatCurrency(price)}{" "}
                  </span>
                  <span className="text-primary ">روزانه</span>
               </p>
               <span className="flex gap-x-0.5 items-center">
                  <MdLocationPin style={{ color: "#408BFF" }} /> {city}
               </span>
            </div>
         </Link>
         <div className="absolute top-5 right-5 z-5">
            <FavoriteToggleButton carId={carId} />
         </div>
      </article>
   );
}
export default CarCard;
