import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Providers from "./Providers";

export const metadata: Metadata = {
   title: "ماشینتو،  پلتفرم اجاره خودرو",
   description: "دیگه پیاده نمیمونی، همسفر با خودروی دلخواهت شو!",
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
      <html lang="fa" dir="rtl" suppressHydrationWarning>
         <body className={dana.className}>
            <Providers>
               <Navbar />
               <main className="container py-10">{children}</main>
            </Providers>
         </body>
      </html>
   );
}
