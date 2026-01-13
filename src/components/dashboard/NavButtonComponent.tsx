'use client'

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PermissionFlags } from "@/constants";
import { usePermissions } from "@/hooks";
import { useAppSelector } from "@lib/hooks";

interface RequiredPermissions {
    rolePermission?: PermissionFlags | PermissionFlags[]
    additionalPermission?: string
}

interface NavButtonProp {
    href: string;
    text: string;
    icon: React.ReactNode;
    hasSubpages: boolean;
    requriedPermission?: RequiredPermissions;
}

export const NavButton = ({ href, text, icon, hasSubpages, requriedPermission }: NavButtonProp) => {
    const pathname = usePathname();
    const { hasPermission } = usePermissions();

    const { user, isHydrated } = useAppSelector(state => state.account);
    const userAdditionalPermissions = user?.additionalPermissions || [];

    const isAllowed = useMemo(() => {
        if (!isHydrated) return true;

        if (!requriedPermission) return true;

        if (!user) return false;

        const { rolePermission, additionalPermission } = requriedPermission;

        const hasRolePerm = rolePermission ? hasPermission(rolePermission) : false;
        const hasAddPerm = additionalPermission ? userAdditionalPermissions.includes(additionalPermission) : false;

        return hasRolePerm || hasAddPerm;
    }, [requriedPermission, hasPermission, userAdditionalPermissions, user, isHydrated]);

    const isActive = (hasSubpages && pathname.startsWith(href)) || pathname === href;

    if (!isAllowed) {
        return (
            <div className="w-full flex gap-2 items-center p-2 px-3 text-secondary-black/30 dark:text-secondary-white/20 cursor-default select-none rounded-xl">
                <div className="size-6 opacity-40 grayscale">
                    {icon}
                </div>
                <h1 className="text-lg">{text}</h1>
            </div>
        );
    }

    return (
        <Link
            href={href}
            className={`w-full flex gap-2 items-center p-2 px-3 transition-all ${
                isActive
                    ? "text-accent bg-secondary-white/40 dark:bg-secondary-white/10"
                    : "text-secondary-black/70 dark:text-secondary-white/80 hover:bg-secondary-white/40 dark:hover:bg-secondary-white/10 hover:text-secondary-black dark:hover:text-primary-white"
            } rounded-xl`}
        >
            <div className="size-6">
                {icon}
            </div>
            <h1 className="text-lg">{text}</h1>
        </Link>
    );
};