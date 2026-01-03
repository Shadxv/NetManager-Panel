'use client'

import React, {useState} from "react";
import {BaseRole} from "@/types";
import {MOCK_ROLE} from "@/constants";
import {RoleCard} from "@/components/dashboard/roles/RoleCard";
import {PlusIcon} from "@/components/icons";
import {usePathname} from "next/dist/client/components/navigation";
import {useTranslations} from "next-intl";

export default function Layout({ children } : {children: React.ReactNode}) {
    const path = usePathname()
    const [roles, setRoles] = useState<BaseRole[]>([MOCK_ROLE])

    const t = useTranslations("Roles")

    return (
        <main className="flex flex-col w-full h-full gap-6 overflow-hidden">
            <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">{t("title")}</h1>
            <div className="w-full flex-1 min-h-0 flex gap-1 overflow-hidden">
                <div className="flex flex-col gap-4 w-full md:max-w-68 overflow-y-scroll md:pr-3">
                    <button className="flex items-center justify-center gap-1.5 bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white hover:text-primary-white dark:hover:text-accent text-sm py-2 rounded-xl transition-all">
                        <div className="size-2 translate-y-px">
                            {PlusIcon}
                        </div>
                        {t("createNew")}
                    </button>
                    <div className="w-full flex flex-col gap-2 pt-4">
                        {roles.map(role => <RoleCard key={role.id} role={role} active={path.endsWith(role.id)}/>)}
                    </div>
                </div>
                <div className="hidden md:block w-px h-full py-4 rounded-full bg-muted-gray/20 dark:bg-muted-white/20"></div>
                <div className={`w-full h-full absolute top-0 left-0 z-50 md:static md:block ${path.endsWith("/dashboard/roles") ? "hidden" : ""} overflow-y-scroll bg-primary-white dark:bg-secondary-black md:bg-transparent`}>
                    {children}
                </div>
            </div>
        </main>
    )
}