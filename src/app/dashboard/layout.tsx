import React from "react";
import {NavBar} from "@/components/dashboard";

export default function Layout({ children } : {children: React.ReactNode}) {
    return (
        <main className="h-screen w-full flex flex-col lg:flex-row">
            <NavBar/>
            <div className="w-full h-full lg:p-4">
                <div className="w-full h-full p-6 lg:rounded-xl bg-secondary-white/20 dark:bg-secondary-black shadow-md shadow-primary-black/10 ">
                    {children}
                </div>
            </div>
        </main>
    )
}