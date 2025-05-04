import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";

export const metadata: Metadata = {
  title: "ماشینتو،  پلتفرم اجاره خودرو",
  description: "دیگه پیاده نمیمونی، همسفر با خودروی دلخواهت شو!",
};

const dana = localFont({
  src: [
    {
      path: '../fonts/DanaFaNum-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/DanaFaNum-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/DanaFaNum-DemiBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={dana.className}
      >
        {children}
      </body>
    </html>
  );
}
