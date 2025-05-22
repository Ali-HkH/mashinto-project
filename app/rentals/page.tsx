import EmptyList from "@/components/home/EmptyList";
import { fetchRentals, deleteRentalAction } from "@/utils/actions";
import Link from "next/link";
import { formatCurrency } from "@/utils/formats";
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

async function RentalsPage() {
   const rentals = await fetchRentals();

   if (rentals.length === 0) {
      return (
         <EmptyList
            heading="اجاره ای برای نمایش وجود ندارد."
            message="برای ایجاد اجاره درنگ نکن!"
         />
      );
   }

   return (
      <div className="mt-16">
         <h4 className="mb-4 capitalize">اجاره های فعال : {rentals.length}</h4>
         <Table>
            <TableCaption>لیستی از ماشین های به اجاره گذاشته شما</TableCaption>
            <TableHeader>
               <TableRow className="[&>*]:text-right">
                  <TableHead>نام خودرو</TableHead>
                  <TableHead>نرخ روزانه</TableHead>
                  <TableHead>روزهای اجاره شده</TableHead>
                  <TableHead>درآمد کل</TableHead>
                  <TableHead>عملیات</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody className="text-right">
               {rentals.map((rental) => {
                  const { id: carId, company, model, price } = rental;
                  const { totalDaysSum, orderTotalSum } = rental;
                  return (
                     <TableRow key={carId}>
                        <TableCell>
                           <Link
                              href={`/cars/${carId}`}
                              className="underline text-muted-foreground tracking-wide"
                           >
                              {company} {model}
                           </Link>
                        </TableCell>
                        <TableCell>{formatCurrency(price)}</TableCell>
                        <TableCell>{totalDaysSum || 0}</TableCell>
                        <TableCell>{formatCurrency(orderTotalSum)}</TableCell>

                        <TableCell className="flex items-center gap-x-2">
                           <Link href={`/rentals/${carId}/edit`}>
                              <IconButton actionType="edit" />
                           </Link>
                           <DeleteRental carId={carId} />
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}

function DeleteRental({ carId }: { carId: string }) {
   const deleteRental = deleteRentalAction.bind(null, { carId });
   return (
      <FormContainer action={deleteRental}>
         <IconButton actionType="delete" />
      </FormContainer>
   );
}

export default RentalsPage;
