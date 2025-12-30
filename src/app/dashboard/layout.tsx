import React from "react";
import {NavBar} from "@/components/dashboard";

export default function Layout({ children } : {children: React.ReactNode}) {
    return (
        <main className="h-screen flex">
            <NavBar/>
            <div className="w-full m-4 rounded-xl bg-secondary-white/20 dark:bg-secondary-black shadow-md shadow-primary-black/10">
                {children}
            </div>
        </main>
    )
}