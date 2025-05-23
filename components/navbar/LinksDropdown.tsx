import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuTrigger,
   DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { LuAlignLeft } from "react-icons/lu";
import Link from "next/link";
import { Button } from "../ui/button";
import UserIcon from "./UserIcon";
import { links } from "@/utils/links";
import SignOutLink from "./SignOutLink";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

async function LinksDropdown() {
   const { userId } = await auth();
   const isAdminUser = userId === process.env.ADMIN_USER_ID;
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex gap-4 max-w-[100px]">
               <LuAlignLeft style={{ width: "20px", height: "20px" }} />
               <UserIcon />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-48" align="center" sideOffset={10}>
            <SignedOut>
               <DropdownMenuItem>
                  <SignInButton mode="modal">
                     <button className="w-full text-right">ورود</button>
                  </SignInButton>
               </DropdownMenuItem>
               <DropdownMenuSeparator />
               <DropdownMenuItem>
                  <SignUpButton mode="modal">
                     <button className="w-full text-right">ثبت نام</button>
                  </SignUpButton>
               </DropdownMenuItem>
            </SignedOut>
            <SignedIn>
               {links.map((link) => {
                  if (link.label === "صفحه ادمین" && !isAdminUser) return null;
                  return (
                     <DropdownMenuItem key={link.href}>
                        <Link
                           href={link.href}
                           className="w-full flex justify-end"
                        >
                           <span>{link.label}</span>
                        </Link>
                     </DropdownMenuItem>
                  );
               })}
               <DropdownMenuSeparator />
               <DropdownMenuItem>
                  <SignOutLink />
               </DropdownMenuItem>
            </SignedIn>
         </DropdownMenuContent>
      </DropdownMenu>
   );
}
export default LinksDropdown;
