'use client'

import { SettingsSection } from "@/components/dashboard/services";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import {GATEWAY_URL, PermissionFlags} from "@/constants";
import { useDispatch } from "react-redux";
import { addPopup } from "@lib/features/popupSlice";
import {AlertComponent} from "@/components/dashboard";
import {usePermissions} from "@/hooks";

export default function SettingsPage() {
    const t = useTranslations("Services.Settings");
    const params = useParams();
    const router = useRouter();
    const dispatch = useDispatch();
    const { hasPermission } = usePermissions();

    const serviceId = params.id as string;

    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = () => {
        if (!serviceId) return;

        setIsDeleting(true);

        axios.delete(`${GATEWAY_URL}/services/${serviceId}`)
            .then(() => {
                dispatch(addPopup({
                    type: "success",
                    message: "successServiceDeleted"
                }));

                setIsAlertOpen(false);
                router.push('/dashboard/services');
            })
            .catch((err: AxiosError<{ message?: string }>) => {
                const msg = err.response?.data?.message || "errorDeletingService";
                dispatch(addPopup({
                    type: "error",
                    message: msg
                }));
            })
            .finally(() => {
                setIsDeleting(false);
            });
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in duration-500">
            <div>
                <h2 className="text-2xl font-bold text-primary-black dark:text-primary-white">
                    {t("title")}
                </h2>
                <p className="text-sm text-muted-gray dark:text-muted-white/60">
                    {t("description")}
                </p>
            </div>

            <div className="flex flex-col gap-2">
                <SettingsSection color="#FF3B30" active={hasPermission(PermissionFlags.UPDATE_SERVICES)}>
                    <div className="w-full flex justify-between items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-bold text-primary-black dark:text-primary-white">
                                {t("deleteTitle")}
                            </h1>
                            <p className="text-sm font-light text-primary-gray dark:text-muted-white">
                                {t("deleteDescription")}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsAlertOpen(true)}
                            disabled={isDeleting || !hasPermission(PermissionFlags.UPDATE_SERVICES)}
                            className="dashboard-small-btn bg-red-primary/80 hover:bg-red-primary text-primary-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 rounded-2xl min-w-[100px] flex items-center justify-center transition-all"
                        >
                            {t("delete")}
                        </button>
                    </div>
                </SettingsSection>
            </div>

            <AlertComponent
                isOpen={isAlertOpen}
                onClose={() => !isDeleting && setIsAlertOpen(false)}
                type="warning"
                title={t("deleteAlertTitle")}
                description={t("deleteAlertDescription")}
                proceedLabel={t("confirmDelete")}
                onProceed={handleDelete}
                isLoading={isDeleting}
                isLoadingOnRight={true}
                onRight={() => setIsAlertOpen(false)}
                rightLabel={t("cancel")}
            />
        </div>
    )
}