import EmptyList from "@/components/home/EmptyList";
import Link from "next/link";
import { formatDate } from "@/utils/formats";
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
import { deleteUserReview, fetchAllReviews } from "@/utils/actions";
import Image from "next/image";
import UserReview from "@/components/admin/UserReview";

async function AllRentalsPage() {
   const allReviews = await fetchAllReviews();
   if (allReviews.length === 0) {
      return <EmptyList />;
   }
   return (
      <div className="mt-16">
         <h4 className="mb-4">کل بازخورد های این سایت: {allReviews.length}</h4>
         <Table>
            <TableCaption>لیستی از بازخورد های این سایت</TableCaption>
            <TableHeader>
               <TableRow className="[&>*]:text-right">
                  <TableHead>تصویر</TableHead>
                  <TableHead>نام کاربری</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>نام خودرو</TableHead>
                  <TableHead>امتیاز</TableHead>
                  <TableHead>کامنت</TableHead>
                  <TableHead>ایجاد شده</TableHead>
                  <TableHead>عملیات</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody className="text-right">
               {allReviews.map((review) => {
                  const { id, rating, comment, createdAt } = review;
                  const { username, email, profileImage } = review.profile;
                  const { id: carId, company, model } = review.car;
                  return (
                     <TableRow key={id}>
                        <TableCell>
                           <Image
                              src={profileImage}
                              alt="user-image"
                              loading="lazy"
                              className="w-16 h-14 rounded-md object-cover"
                              width={64}
                              height={56}
                           />
                        </TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>
                           <Link
                              href={`/cars/${carId}`}
                              className="underline text-muted-foreground tracking-wide"
                           >
                              {company} {model}
                           </Link>
                        </TableCell>
                        <TableCell>{rating}</TableCell>
                        <TableCell className="min-w-md">
                            <UserReview review={comment}/>
                        </TableCell>
                        <TableCell>{formatDate(createdAt)}</TableCell>
                        <TableCell>
                           <DeleteReview reviewId={id} />
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}

function DeleteReview({ reviewId }: { reviewId: string }) {
   return (
      <FormContainer action={deleteUserReview}>
         <input type="hidden" name="reviewId" value={reviewId} />
         <IconButton actionType="delete" />
      </FormContainer>
   );
}

export default AllRentalsPage;
