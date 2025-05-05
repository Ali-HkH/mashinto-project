"use client";
import { ThemeProvider } from "./theme-provider";
import { useTheme } from "next-themes";
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
   const { resolvedTheme } = useTheme();
   return (
      <>
         <Toaster />
         <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
         >
            {children}
         </ThemeProvider>
      </>
   );
}
export default Providers;
