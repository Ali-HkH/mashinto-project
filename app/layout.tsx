import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./Providers";
import { ClerkProvider } from "@clerk/nextjs";
import { faLocalization } from "@/utils/clerkFaLocalization";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
   title: "ماشینتو",
   description: "پلتفرم اجاره خودرو، دیگه پیاده نمیمونی، همسفر با خودروی دلخواهت شو!",
};

const dana = localFont({
   src: [
      {
         path: "../fonts/DanaFaNum-Regular.woff2",
         weight: "400",
         style: "normal",
      },
      {
         path: "../fonts/DanaFaNum-Medium.woff2",
         weight: "500",
         style: "normal",
      },
      {
         path: "../fonts/DanaFaNum-DemiBold.woff2",
         weight: "700",
         style: "normal",
      },
   ],
   display: "swap",
});

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <ClerkProvider localization={faLocalization}>
         <html lang="fa" dir="rtl" suppressHydrationWarning>
            <body className={dana.className}>
               <Providers>
                  <Navbar />
                  <main className="container py-10">{children}</main>
                  <Footer />
               </Providers>
            </body>
         </html>
      </ClerkProvider>
   );
}