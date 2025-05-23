export const dynamic = "force-dynamic";

import EmptyList from "@/components/home/EmptyList";
import Link from "next/link";

import { formatDate, formatCurrency } from "@/utils/formats";
import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from "@/components/ui/table";

import FormContainer from "@/components/form/FormContainer";
import { IconButton } from "@/components/form/Buttons";
import { fetchBookings, deleteBookingAction } from "@/utils/actions";

async function BookingsPage() {
   const bookings = await fetchBookings();
   if (bookings.length === 0) {
      return <EmptyList />;
   }
   return (
      <div className="mt-16">
         <h4 className="mb-4">کل کرایه های شما : {bookings.length}</h4>
         <Table>
            <TableCaption>لیستی از کرایه های اخیر شما</TableCaption>
            <TableHeader>
               <TableRow className="[&>*]:text-right">
                  <TableHead>نام خودرو</TableHead>
                  <TableHead>شهر</TableHead>
                  <TableHead>روز ها</TableHead>
                  <TableHead>مبلغ</TableHead>
                  <TableHead>تحویل خودرو</TableHead>
                  <TableHead>عودت خودرو</TableHead>
                  <TableHead>عملیات</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody className="text-right">
               {bookings.map((booking) => {
                  const { id, orderTotal, totaldays, checkIn, checkOut } =
                     booking;
                  const { id: carId, company, model, city } = booking.car;
                  const startDate = formatDate(checkIn);
                  const endDate = formatDate(checkOut);
                  return (
                     <TableRow key={id}>
                        <TableCell>
                           <Link
                              href={`/cars/${carId}`}
                              className="underline text-muted-foreground tracking-wide"
                           >
                              {company} {model}
                           </Link>
                        </TableCell>
                        <TableCell>{city}</TableCell>
                        <TableCell>{totaldays}</TableCell>
                        <TableCell>{formatCurrency(orderTotal)}</TableCell>
                        <TableCell>{startDate}</TableCell>
                        <TableCell>{endDate}</TableCell>
                        <TableCell>
                           <DeleteBooking bookingId={id} />
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}

function DeleteBooking({ bookingId }: { bookingId: string }) {
  return (
    <FormContainer action={deleteBookingAction}>
      <input type="hidden" name="bookingId" value={bookingId} />
      <IconButton actionType='delete' />
    </FormContainer>
  );
}



export default BookingsPage;
