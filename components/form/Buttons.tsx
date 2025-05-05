'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type SubmitButtonProps = {
  className?: string;
  text?: string;
};

export function SubmitButton({
    className = '',
    text = 'ثبت',
  }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
      <Button
        type='submit'
        disabled={pending}
        className={`${className}`}
        size='lg'
      >
        {pending ? (
          <>
            <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
            لطفا صبر کنید...
          </>
        ) : (
          text
        )}
      </Button>
    );
  }