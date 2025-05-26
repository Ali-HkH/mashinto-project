import { fetchProfileImage } from "@/utils/actions";
import Image from "next/image";
import { LuUser } from "react-icons/lu";

async function UserIcon() {
   const profileImage = await fetchProfileImage();

   if (profileImage)
      return (
         <Image
            src={profileImage}
            alt="profile-picture"
            className="rounded-full object-cover"
            loading="lazy"
            width={24}
            height={24}
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
