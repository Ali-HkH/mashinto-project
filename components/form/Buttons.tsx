"use client";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

import { SignInButton } from "@clerk/nextjs";
import { FaRegHeart, FaHeart } from "react-icons/fa";

type BtnSize = "default" | "lg" | "sm";

type SubmitButtonProps = {
   className?: string;
   text?: string;
   size?: BtnSize;
};

export function SubmitButton({
   className = "",
   text = "ثبت",
   size = "lg",
}: SubmitButtonProps) {
   const { pending } = useFormStatus();
   return (
      <Button
         type="submit"
         disabled={pending}
         className={`cursor-pointer dark:text-white ${className} `}
         size={size}
      >
         {pending ? (
            <>
               <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />
               کمی صبر کنید...
            </>
         ) : (
            text
         )}
      </Button>
   );
}

export const CardSignInButton = () => {
   return (
      <SignInButton mode="modal">
         <Button
            type="button"
            size="icon"
            variant="outline"
            className="p-2 cursor-pointer"
            asChild
         >
            <FaRegHeart />
         </Button>
      </SignInButton>
   );
};

export const CardToggleFavesButton = ({ isFavorite }: { isFavorite: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      size='icon'
      variant='outline'
      className=' p-2 cursor-pointer'
    >
      {pending ? (
        <ReloadIcon className=' animate-spin' />
      ) : isFavorite ? (
        <FaHeart />
      ) : (
        <FaRegHeart />
      )}
    </Button>
  );
};