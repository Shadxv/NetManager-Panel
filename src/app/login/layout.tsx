import React from "react";

export default function Layout({ children } : {children: React.ReactNode}) {
    return (
        <main className="flex flex-col justify-center items-center p-3 h-screen gap-4">
            {children}
        </main>
    )
}