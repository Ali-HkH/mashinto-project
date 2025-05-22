"use client";

import { useRentalCar } from "@/utils/store";
import ConfirmBooking from "./ConfirmBooking";
import BookingForm from "./BookingForm";

function BookingContainer() {
   const { range } = useRentalCar((state) => state);

   if (!range || !range.from || !range.to) return null;
   if (range.to.getTime() === range.from.getTime()) return null;

   return (
      <div className="w-full">
         <BookingForm />
         <ConfirmBooking />
      </div>
   );
}

export default BookingContainer;
