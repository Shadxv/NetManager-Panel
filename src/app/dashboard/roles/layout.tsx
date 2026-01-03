'use client'

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { PlusIcon } from "@/components/icons";
import { usePathname, useRouter } from "next/navigation";
import { RoleListContainer } from "@/components/dashboard/roles/RoleListContainer";
import { BaseRole } from "@/types";
import axios from "axios";
import { RESTAPI_URL } from "@/constants";
import {RolesProvider, useRoles} from "@/components/dashboard/roles";
import {useAppDispatch} from "@lib/hooks";
import {addPopup} from "@lib/features/popupSlice";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RolesProvider>
            <RolesLayoutContent>{children}</RolesLayoutContent>
        </RolesProvider>
    );
}

function RolesLayoutContent({ children }: { children: React.ReactNode }) {
    const { roles, setRoles, isLoading, refreshRoles } = useRoles();
    const [isCreating, setIsCreating] = useState(false);
    const router = useRouter();
    const t = useTranslations("Roles");
    const path = usePathname();
    const dispatch = useAppDispatch()

    useEffect(() => {
        refreshRoles();
    }, []);

    const handleCreateRole = async () => {
        setIsCreating(true);

        await axios.post<BaseRole>(`${RESTAPI_URL}/roles`, {}, {timeout: 5000})
            .then((res) => {
                const newRole = res.data
                setRoles(prev => [...prev, newRole]);
                router.push(`/dashboard/roles/${newRole.id}`);
            })
            .catch((e) => {
                dispatch(addPopup({type: "error", message: "errorCreatingRole"}))
            })
            .finally(() => setIsCreating(false))
    };

    return (
        <main className="flex flex-col w-full h-full gap-6 overflow-hidden p-4 md:p-0">
            <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">
                {t("title")}
            </h1>

            <div className="w-full flex-1 min-h-0 flex gap-1 overflow-hidden">
                <div className="flex flex-col gap-4 w-full md:max-w-68 md:pr-3 overflow-y-auto">
                    <button
                        onClick={handleCreateRole}
                        disabled={isCreating}
                        className={`flex items-center justify-center gap-1.5 bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white hover:text-primary-white dark:hover:text-accent text-sm py-2 rounded-xl transition-all shrink-0 ${isCreating ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <div className="size-2 translate-y-px">
                            {PlusIcon}
                        </div>
                        {isCreating ? t("creating") : t("createNew")}
                    </button>

                    <RoleListContainer
                        roles={roles}
                        setRoles={setRoles}
                        isLoading={isLoading}
                    />
                </div>

                <div className="hidden md:block w-px h-full py-4 rounded-full bg-muted-gray/20 dark:bg-muted-white/20 shrink-0" />

                <div className={`
                    w-full h-full absolute top-0 left-0 z-50 md:static md:block 
                    ${path.endsWith("/dashboard/roles") ? "hidden" : ""} 
                    overflow-y-auto bg-primary-white dark:bg-secondary-black md:bg-transparent
                `}>
                    {children}
                </div>
            </div>
        </main>
    );
}