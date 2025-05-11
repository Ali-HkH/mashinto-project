'use client';

import { useActionState } from 'react';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { type ActionFunction } from '@/utils/types';

const initialState = {
  message: '',
};

function FormContainer({
  action,
  children,
}: {
  action: ActionFunction;
  children: React.ReactNode;
}) {

  const [state, formAction] = useActionState(action, initialState);

  useEffect(() => {
    if (state.message) {
      toast("پیغام",{ description: state.message });
    }
  }, [state]);

  return <form action={formAction}>{children}</form>;
}
export default FormContainer;