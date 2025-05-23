"use client";
import { SignInButton, useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useRentalCar } from "@/utils/store";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { createBookingAction } from "@/utils/actions";

function ConfirmBooking() {
   const { userId } = useAuth();
   const { carId, userId: user_id, range } = useRentalCar((state) => state);
   const checkIn = range?.from as Date;
   const checkOut = range?.to as Date;
   const isNotOwner = user_id !== userId;

   if (!userId)
      return (
         <SignInButton mode="modal">
            <Button type="button" className="w-full">
               برای انجام کرایه ابتدا وارد شوید.
            </Button>
         </SignInButton>
      );

   if (!isNotOwner) {
      return (
         <Button type="button" disabled className="w-full dark:text-white">
            شما خود صاحب خودرو هستید
         </Button>
      );
   }

   const createBooking = createBookingAction.bind(null, {
      carId,
      checkIn,
      checkOut,
   });

   return (
      <section>
         <FormContainer action={createBooking}>
            <SubmitButton text="کرایه" className="w-full" />
         </FormContainer>
      </section>
   );
}
export default ConfirmBooking;
