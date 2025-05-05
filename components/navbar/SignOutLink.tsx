'use client';
import { SignOutButton } from '@clerk/nextjs';
import { toast } from 'sonner';

function SignOutLink() {

  const handleLogout = () => {
    toast.message("پیغام", { description: "شما از حساب کاربری خارج شدید" })
  };

  return (
    <SignOutButton redirectUrl='/'>
      <button className='w-full text-right' onClick={handleLogout}>
        خروج از حساب
      </button>
    </SignOutButton>
  );
}
export default SignOutLink;