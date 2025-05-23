"use client";

import { useActionState } from "react";
import { useEffect } from "react";
import { toast } from "sonner";
import { type ActionFunction } from "@/utils/types";
import { useRouter } from "next/navigation";

const initialState = {
   message: "",
};

function FormContainer({
   action,
   children,
}: {
   action: ActionFunction;
   children: React.ReactNode;
}) {
   const [state, formAction] = useActionState(action, initialState);
   const router = useRouter();

   useEffect(() => {
      if (state?.message) {
         toast(state.message);
      }

      router.refresh();
   }, [state]);

   return <form action={formAction}>{children}</form>;
}
export default FormContainer;
