"use client";

import { useRentalCar } from "@/utils/store";
import { Booking } from "@/utils/types";
import BookingCalendar from "./BookingCalendar";
import BookingContainer from "./BookingContainer";
import { useEffect } from "react";

type BookingWrapperProps = {
   carId: string;
   userId: string;
   price: number;
   bookings: Booking[];
};
export default function BookingWrapper({
   carId,
   userId,
   price,
   bookings,
}: BookingWrapperProps) {
   useEffect(() => {
      useRentalCar.setState({
         carId,
         userId,
         price,
         bookings,
      });
   }, []);

   return (
      <>
         <BookingCalendar />
         <BookingContainer />
      </>
   );
}
