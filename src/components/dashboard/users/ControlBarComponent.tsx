'use client'

import React, {useState} from "react";
import {CreateUserModal, SortDropdown} from "@/components/dashboard/users";
import {useTranslations} from "next-intl";
import {FiltersComponent} from "@/components/dashboard/users/FiltersComponent";
import {usePermissions} from "@/hooks";
import {PermissionFlags} from "@/constants";


export const ControlBar = () => {
    const t = useTranslations('Users');
    const [filterMenuOpen, setFilterMenuOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const { hasPermission } = usePermissions();

    const canCreate = hasPermission([
        PermissionFlags.CREATE_USERS,
        PermissionFlags.MANAGE_USERS
    ]);

    return (
        <div className="w-full flex flex-col gap-4 p-4 rounded-xl shadow-md shadow-primary-black/10 bg-primary-white dark:bg-primary-black">
            <div className="w-full flex justify-between">
                <button
                    onClick={() => setCreateModalOpen(true)}
                    disabled={!canCreate}
                    className="dashboard-small-btn max-w-30 md:max-w-48 bg-accent text-primary-white dark:disabled:text-primary-white disabled:text-muted-gray/50 disabled:bg-muted-white/30 dark:disabled:bg-secondary-gray"
                >
                    {t('createUser')}
                </button>
                <div className="flex gap-2">
                    <button onClick={() => setFilterMenuOpen(prev => !prev)} className={`dashboard-small-btn max-w-30 md:max-w-48 ${filterMenuOpen ? "bg-accent text-primary-white" : "bg-secondary-white/20 dark:bg-primary-gray text-muted-gray dark:text-secondary-white"} transition-colors duration-300`}>Filters</button>
                    <SortDropdown/>
                </div>
            </div>

            <CreateUserModal
                isOpen={createModalOpen}
                onClose={() => setCreateModalOpen(false)}
            />

            {filterMenuOpen && (
                <>
                    <div className="w-full h-0.5 bg-muted-gray/10 dark:bg-primary-white/10" />
                    <FiltersComponent/>
                </>
            )}
        </div>
    )
}