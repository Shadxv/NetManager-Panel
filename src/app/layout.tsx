import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '500', '700', '900'],
    variable: '--font-poppins',
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
        className={`${poppins.variable} font-sans antialiased bg-primary-black`}
      >
      <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
