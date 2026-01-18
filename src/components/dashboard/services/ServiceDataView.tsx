'use client';

import { useServiceData } from "@/components/dashboard/services/ServiceDataContext";
import { PodComponent } from "@/components/dashboard/services/PodComponent";
import { RequestError } from "@/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import {GATEWAY_URL, PermissionFlags} from "@/constants";
import { useDispatch } from "react-redux";
import { addPopup } from "@lib/features/popupSlice";
import {usePermissions} from "@/hooks";

export const ServiceDetailsView = ({ serviceId }: { serviceId: string }) => {
    const t = useTranslations("Services");
    const dispatch = useDispatch();

    const { data, isLoading } = useServiceData();
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const { hasPermission } = usePermissions()

    const canUpdateState = hasPermission(PermissionFlags.MANAGE_SERVICES_STATE)

    const handleAction = (action: 'start' | 'stop' | 'restart') => {
        setActionLoading(action);

        axios.post(`${GATEWAY_URL}/services/${serviceId}/${action}`)
            .then(() => {
                dispatch(addPopup({
                    type: "success",
                    message: `success${action.charAt(0).toUpperCase() + action.slice(1)}Service`
                }));
            })
            .catch((err: AxiosError<{ message?: string }>) => {
                const msg = err.response?.data?.message || "errorExecutingAction";
                dispatch(addPopup({ type: "error", message: msg }));
            })
            .finally(() => {
                setActionLoading(null);
            });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="size-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) throw new RequestError(404);

    const isAnyActionLoading = actionLoading !== null;

    return (
        <div className="flex flex-col gap-6 w-full h-full max-h-[calc(100vh-250px)] animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted-white/10 dark:bg-primary-black/10 p-4 rounded-2xl border border-muted-white/10 dark:border-muted-gray/10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-muted-gray dark:text-muted-white/40 uppercase">{t("globalStatus")}</span>
                        <div className="flex items-center gap-4">
                            <div className={`size-2.5 rounded-full animate-pulse ${data.status === "RUNNING" ? "bg-green-primary" : (data.status === "STOPPED" ? "bg-red-primary" : "bg-orange-500")}`} />
                            <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">{data.status}</h2>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    {data.status === "STOPPED" ? (
                        <button
                            disabled={!data.currentVersion || isAnyActionLoading || !canUpdateState}
                            onClick={() => handleAction('start')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg border border-green-primary/30 text-green-primary not-disabled:hover:bg-green-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-w-[100px]"
                        >
                            {actionLoading === 'start' ? <div className="size-4 border-2 border-green-primary/20 border-t-green-primary rounded-full animate-spin" /> : t("start")}
                        </button>
                    ) : (
                        <button
                            disabled={isAnyActionLoading || !canUpdateState}
                            onClick={() => handleAction('stop')}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg border border-red-primary/30 text-red-primary hover:bg-red-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer min-w-[100px]"
                        >
                            {actionLoading === 'stop' ? <div className="size-4 border-2 border-red-primary/20 border-t-red-primary rounded-full animate-spin" /> : t("stopAll")}
                        </button>
                    )}

                    <button
                        disabled={data.status !== "RUNNING" || isAnyActionLoading || !canUpdateState}
                        onClick={() => handleAction('restart')}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-accent disabled:bg-muted-white disabled:opacity-50 text-white disabled:cursor-not-allowed not-disabled:hover:bg-accent/90 transition-all not-disabled:shadow-lg shadow-accent/20 cursor-pointer min-w-[100px]"
                    >
                        {actionLoading === 'restart' ? <div className="size-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : t("restartAll")}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-primary-black dark:text-primary-white tracking-tight">{t("podInstances")}</h3>
                    <p className="text-sm text-muted-gray dark:text-muted-white/60">{t("podInstancesDescription", {"name": serviceId})}</p>
                </div>
                {data.pods.length === 0 ? (
                    <div className="flex flex-col w-full pt-40 gap-2 items-center justify-center">
                        <p className="text-2xl text-muted-gray dark:text-muted-white">
                            {t("noPodsFound")}
                        </p>
                    </div>
                ) : (
                    <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent max-h-100">
                        <div className="flex flex-col gap-3">
                            {data.pods.map((pod) => (
                                <PodComponent key={pod.name} pod={pod} serviceId={serviceId} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};