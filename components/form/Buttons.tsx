'use client';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';

type BtnSize = 'default' | 'lg' | 'sm'

type SubmitButtonProps = {
  className?: string;
  text?: string;
  size?: BtnSize
};

export function SubmitButton({
    className = '',
    text = 'ثبت',
    size = "lg"
  }: SubmitButtonProps) {
    const { pending } = useFormStatus();
    return (
      <Button
        type='submit'
        disabled={pending}
        className={`cursor-pointer ${className} `}
        size={size}
      >
        {pending ? (
          <>
            <ReloadIcon className='ml-2 h-4 w-4 animate-spin' />
            کمی صبر کنید...
          </>
        ) : (
          text
        )}
      </Button>
    )
  }