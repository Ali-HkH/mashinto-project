"use client";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
   return (
      <ThemeProvider
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
      >
         <Toaster
            toastOptions={{
               unstyled: true,
               classNames: custom_sonner_class,
            }}
         />
         {children}
      </ThemeProvider>
   );
}

const custom_sonner_class = {
   toast: "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-md p-4 pl-8",
   title: "text-zinc-800 dark:text-zinc-100 font-medium text-sm",
};

export default Providers;
