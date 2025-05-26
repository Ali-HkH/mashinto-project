import EmptyList from "@/components/home/EmptyList";
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
import { deleteUserRental, fetchAllRentals } from "@/utils/actions";
import Image from "next/image";

async function AllRentalsPage() {
   const allRentals = await fetchAllRentals();
   if (allRentals.length === 0) {
      return <EmptyList />;
   }
   return (
      <div className="mt-16">
         <h4 className="mb-4">کل اجاره های این سایت: {allRentals.length}</h4>
         <Table>
            <TableCaption>لیستی از اجاره های این سایت</TableCaption>
            <TableHeader>
               <TableRow className="[&>*]:text-right">
                  <TableHead>نام کاربری</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>نام خودرو</TableHead>
                  <TableHead>عکس خودرو</TableHead>
                  <TableHead>قیمت</TableHead>
                  <TableHead>رنگ</TableHead>
                  <TableHead>شهر</TableHead>
                  <TableHead>عملیات</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody className="text-right">
               {allRentals.map((rental) => {
                  const { id, company, model, image, price, color, city } =
                     rental;
                  const { username, email } = rental.profile;
                  return (
                     <TableRow key={id}>
                        <TableCell>{username}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>
                           <Link
                              href={`/cars/${id}`}
                              className="underline text-muted-foreground tracking-wide"
                           >
                              {company} {model}
                           </Link>
                        </TableCell>
                        <TableCell>
                           <Image
                              src={image}
                              alt="car-image"
                              loading="lazy"
                              className="w-16 h-14 rounded-md object-cover"
                              width={64}
                              height={56}
                           />
                        </TableCell>
                        <TableCell>{formatCurrency(price)}</TableCell>
                        <TableCell>{color}</TableCell>
                        <TableCell>{city}</TableCell>
                        <TableCell>
                           <DeleteRental rentalId={id} />
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}

function DeleteRental({ rentalId }: { rentalId: string }) {
   return (
      <FormContainer action={deleteUserRental}>
         <input type="hidden" name="rentalId" value={rentalId} />
         <IconButton actionType="delete" />
      </FormContainer>
   );
}

export default AllRentalsPage;
