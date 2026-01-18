'use client';

import { useServiceData } from "@/components/dashboard/services/ServiceDataContext";
import { VersionCard } from "@/components/dashboard/services/VersionCard";
import { useTranslations } from "next-intl";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import {GATEWAY_URL, PermissionFlags} from "@/constants";
import { useDispatch } from "react-redux";
import { addPopup } from "@lib/features/popupSlice";
import {usePermissions} from "@/hooks";

export const VersionsListView = ({name} : {name: string}) => {
    const t = useTranslations("Services.Versions");
    const dispatch = useDispatch();

    const { data, isLoading, updateVersion } = useServiceData();
    const { hasPermission } = usePermissions();

    const [isSending, setIsSending] = useState(false);

    const handleCreate = () => {
        setIsSending(true);

        axios.post(`${GATEWAY_URL}/services/${name}/build`)
            .then(() => {
                dispatch(addPopup({
                    type: "success",
                    message: "successBuildStarted"
                }));
            })
            .catch((err: AxiosError<{ message?: string }>) => {
                const msg = err.response?.data?.message || "errorBuildFailed";
                dispatch(addPopup({
                    type: "error",
                    message: msg
                }));
            })
            .finally(() => {
                setIsSending(false);
            });
    };

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center min-h-100">
                <div className="size-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) return <div className="p-8 text-center">{t("noVersions")}</div>;

    return (
        <div className="flex flex-col gap-6 w-full h-full max-h-[calc(100vh-260px)] animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-primary-black dark:text-primary-white tracking-tight">
                        {t("serviceVersions")}
                    </h2>
                    <p className="text-sm text-muted-gray dark:text-muted-white/60">
                        {t("serviceVersionsDescription")}
                    </p>
                </div>

                {hasPermission(PermissionFlags.UPDATE_SERVICES) && <button
                    onClick={handleCreate}
                    disabled={isSending}
                    className="w-full sm:w-auto bg-accent hover:bg-accent/90 disabled:bg-muted-white disabled:opacity-50 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-accent/25 active:scale-95 font-medium text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer min-w-[160px]"
                >
                    {isSending ? (
                        <div className="size-5 border-2 border-white/20 border-t-white rounded-full animate-spin"/>
                    ) : (
                        <>
                            <span className="text-xl leading-none">+</span>
                            {t("newVersion")}
                        </>
                    )}
                </button>}
            </div>

            <div className="flex flex-col gap-4 flex-1 overflow-hidden pb-4">
                <h3 className="text-lg font-bold text-primary-black dark:text-primary-white tracking-tight">
                    {t("availableVersions")}
                </h3>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent">
                    {data.availableVersions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-gray">
                            <p className="text-sm font-medium">{t("noVersionsAvailable")}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {[...data.availableVersions].reverse().map((v) => (
                                <VersionCard
                                    key={v}
                                    name={name}
                                    version={v}
                                    isActive={v === data.currentVersion}
                                    onSwitch={updateVersion}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};