import Image from "next/image";

type UserInfoProps = {
   profile: {
      profileImage: string;
      firstName: string;
   };
};

function UserInfo({ profile: { profileImage, firstName } }: UserInfoProps) {
   return (
      <article className="flex items-center gap-4 mt-5">
         <Image
            src={profileImage}
            alt={firstName}
            width={50}
            height={50}
            className="rounded-md w-14 h-14 object-cover"
         />
         <div>
            <p>
               اجاره گذاشته توسط
               <span className="font-bold"> {firstName}</span>
            </p>
            <p className="text-muted-foreground font-light">
             پرشین خودرو، سابقه دو سال نمایندگی
            </p>
         </div>
      </article>
   );
}
export default UserInfo;
