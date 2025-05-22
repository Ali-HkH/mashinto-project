import { fetchCarRating } from "@/utils/actions";
import { FaStar } from "react-icons/fa";

async function CarRating({
   carId,
   inPage,
}: {
   carId: string;
   inPage: boolean;
}) {
   const { rating, count } = await fetchCarRating(carId);
   if (count === 0) return null;

   const className = `flex gap-1 items-center ${
      inPage ? "text-md" : "text-xs"
   }`;
   const countText = count > 1 ? "بازخوردها" : "بازخورد";
   const countValue = `(${count}) ${inPage ? countText : ""}`;
   return (
      <span className={className}>
         <FaStar className="w-3 h-3" style={{ color: "#408BFF" }} />
         {rating} {countValue}
      </span>
   );
}

export default CarRating;
