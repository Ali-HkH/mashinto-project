import { fetchReservations } from "@/utils/actions";
import Link from "next/link";
import EmptyList from "@/components/home/EmptyList";
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

async function ReservationsPage() {
   const reservations = await fetchReservations();

   if (reservations.length === 0) {
      return <EmptyList />;
   }

   return (
      <div className="mt-16">
         <h4 className="mb-4 capitalize">کل رزرو شده ها : {reservations.length}</h4>
         <Table>
            <TableCaption>لیستی از کل رزرو شده های شما</TableCaption>
            <TableHeader>
               <TableRow className="[&>*]:text-right">
                  <TableHead>نام خودرو</TableHead>
                  <TableHead>شهر</TableHead>
                  <TableHead>روزها</TableHead>
                  <TableHead>کل مبلغ</TableHead>
                  <TableHead>تحویل خودرو</TableHead>
                  <TableHead>عودت خودرو</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody className="text-right">
               {reservations.map((item) => {
                  const { id, orderTotal, totaldays, checkIn, checkOut } = item;
                  const { id: carId, company, model, city } = item.car;
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
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}
export default ReservationsPage;
