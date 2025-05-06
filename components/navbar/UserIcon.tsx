import { fetchProfileImage } from "@/utils/actions";
import { LuUser } from "react-icons/lu";

async function UserIcon() {
   const profileImage = await fetchProfileImage();

   if (profileImage)
      return (
         <img
            src={profileImage}
            className="rounded-full object-cover"
            style={{ width: "24px", height: "24px" }}

         />
      );
   return (
      <LuUser
         className="bg-primary rounded-full text-white"
         style={{ width: "24px", height: "24px" }}
      />
   );
}
export default UserIcon;
