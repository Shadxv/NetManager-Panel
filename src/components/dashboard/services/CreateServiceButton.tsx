'use client'

import {useTranslations} from "next-intl";
import React, {useState} from "react";
import {CreateServiceModal} from "@/components/dashboard/services/CreateServiceModal";
import {usePermissions} from "@/hooks";
import {PermissionFlags} from "@/constants";

export const CreateServiceButton = () => {
    const t = useTranslations("Services")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { hasPermission } = usePermissions()

    if (!hasPermission(PermissionFlags.CREATE_NEW_SERVICES)) {
        return null;
    }

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="dashboard-small-btn sm:max-w-56 bg-accent text-primary-white dark:disabled:text-primary-white disabled:text-muted-gray/50 disabled:bg-muted-white/30 dark:disabled:bg-secondary-gray"
            >
                {t('create')}
            </button>

            <CreateServiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>

    )
}