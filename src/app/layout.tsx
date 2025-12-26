import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {GsapRegistrar} from "@/components";
import {cookies} from "next/headers";
import {getMessages} from "next-intl/server";
import StoreProvider from "@/components/StoreProvider";
import ThemeWrapper from "@/components/ThemeWrapper";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '500', '700', '900'],
    variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: "Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    const cookieStore = await cookies();
    const theme = (cookieStore.get('theme')?.value as 'light' | 'dark') || 'dark';
    const language: 'pl' | 'en' = (cookieStore.get('NEXT_LOCALE')?.value as 'en' | 'pl') || 'en';
    const messages = await getMessages();

    return (
        <html lang={language} className={theme}>
            <body id="body" className={`${poppins.variable} font-sans antialiased bg-primary-white dark:bg-primary-black transition-colors duration-300 ease-in-out`}>
                <StoreProvider initialData={{ theme, language }}>
                    <ThemeWrapper>
                        <NextIntlClientProvider messages={messages} locale={language}>
                            <GsapRegistrar />
                            {children}
                        </NextIntlClientProvider>
                    </ThemeWrapper>
                </StoreProvider>
            </body>
        </html>
    );
}
