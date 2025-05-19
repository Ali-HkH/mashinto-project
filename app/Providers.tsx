"use client";
import { ThemeProvider } from "./theme-provider";
import { useTheme } from "next-themes";
import { Toaster as SonnerToaster, type ToasterProps } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
   const { resolvedTheme } = useTheme();

   return (
      <>
         <SonnerToaster
            theme={resolvedTheme as ToasterProps["theme"]}
            richColors
         />
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
