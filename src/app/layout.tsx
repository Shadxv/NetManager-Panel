import type { Metadata } from "next";
import { Poppins, Noto_Sans, Open_Sans } from 'next/font/google';
import "./globals.css";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '500', '700', '900'],
    variable: '--font-sans',
});

const openSans = Open_Sans({
    subsets: ['latin'],
    weight: ['300', '500', '700'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${openSans.variable} font-sans antialiased bg-primary-black`}
      >
        {children}
      </body>
    </html>
  );
}
