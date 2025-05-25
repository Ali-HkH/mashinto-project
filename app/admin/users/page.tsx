import EmptyList from "@/components/home/EmptyList";
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
import { adminDeleteUser, fetchAllUsers } from "@/utils/actions";

async function AllUsersPage() {
   const allUsers = await fetchAllUsers();

   if (allUsers.length === 0) {
      return <EmptyList />;
   }

   return (
      <div className="mt-16">
         <h4 className="mb-4">کل کاربران این سایت: {allUsers.length}</h4>
         <Table>
            <TableCaption>لیستی از کاربران این سایت</TableCaption>
            <TableHeader>
               <TableRow className="[&>*]:text-right">
                  <TableHead>تصویر</TableHead>
                  <TableHead>نام کامل</TableHead>
                  <TableHead>نام کاربری</TableHead>
                  <TableHead>ایمیل</TableHead>
                  <TableHead>پیوسته</TableHead>
                  <TableHead>تعداد اجاره</TableHead>
                  <TableHead>تعداد کرایه</TableHead>
                  <TableHead>عملیات</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody className="text-right">
               {allUsers.map((user) => {
                  const {
                     id,
                     clerkId,
                     firstName,
                     lastName,
                     username,
                     profileImage,
                     email,
                     createdAt,
                  } = user;
                  const isUserAdmin = clerkId === process.env.ADMIN_USER_ID;

                  return (
                     <TableRow key={id}>
                        <TableCell>
                           <img
                              src={profileImage}
                              alt="car-image"
                              className="w-16 h-16 rounded-full object-cover"
                           />
                        </TableCell>
                        <TableCell>
                           {firstName} {lastName}
                        </TableCell>
                        <TableCell>{username}</TableCell>
                        <TableCell>{email}</TableCell>
                        <TableCell>{formatDate(createdAt)}</TableCell>
                        <TableCell>{user._count.cars}</TableCell>
                        <TableCell>{user._count.bookings}</TableCell>
                        <TableCell>
                           {isUserAdmin ? (
                              <span className="text-primary">شما (ادمین)</span>
                           ) : (
                              <DeleteUser userId={id} />
                           )}
                        </TableCell>
                     </TableRow>
                  );
               })}
            </TableBody>
         </Table>
      </div>
   );
}

function DeleteUser({ userId }: { userId: string }) {
   return (
      <FormContainer action={adminDeleteUser}>
         <input type="hidden" name="userId" value={userId} />
         <IconButton actionType="delete" />
      </FormContainer>
   );
}

export default AllUsersPage;
