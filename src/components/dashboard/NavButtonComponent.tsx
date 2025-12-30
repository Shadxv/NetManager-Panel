'use client'

import React from "react";
import Link from "next/dist/client/link";
import {usePathname} from "next/dist/client/components/navigation";

interface NavButtonProp {
    href: string
    text: string
    icon: React.ReactNode
}

export const NavButton = ({href, text, icon}: NavButtonProp) => {
    const pathname = usePathname()
    const isActive = pathname.startsWith(href)

    return (
        <Link href={href}
              aria-current={isActive ? "page" : undefined}
              className={`w-full flex gap-2 items-center p-2 px-3 ${isActive ? "text-accent bg-secondary-white/40 dark:bg-secondary-white/10" : "text-secondary-black/70 dark:text-secondary-white/80 hover:bg-secondary-white/40 dark:hover:bg-secondary-white/10 hover:text-secondary-black dark:hover:text-primary-white"} rounded-xl `}
        >
            <div className="size-6">
                {icon}
            </div>
            <h1 className="text-lg">{text}</h1>
        </Link>
    )
}