'use client';

import { PodInfo } from "@/types";
import { useTranslations } from "next-intl";
import { useServiceData } from "@/components/dashboard/services/ServiceDataContext";
import {usePermissions} from "@/hooks";
import {PermissionFlags} from "@/constants";

export const PodSidebar = ({ pod }: { pod: PodInfo }) => {
    const t = useTranslations("Services.Pod");
    const { hasPermission } = usePermissions()
    const { stopPod, isStoppingPod } = useServiceData();

    const isLoading = isStoppingPod === pod.name;

    const handleStop = () => {
        if (isLoading) return;
        stopPod(pod.name);
    };

    return (
        <div className="w-full lg:w-80 shrink-0">
            <div
                className="bg-muted-white/10 dark:bg-primary-black/10 p-5 rounded-2xl border border-muted-white/10 dark:border-muted-gray/10 flex flex-col gap-6">
                <div className="flex flex-col gap-1">
                    <span
                        className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest">Status</span>
                    <div className="flex items-center gap-2">
                        <div className={`size-2.5 rounded-full ${pod.status === "Failed" ? "bg-red-primary" : (pod.status === "Running" ? "bg-green-primary" : "bg-orange-500")} animate-pulse`}/>
                        <span
                            className="text-sm font-bold text-primary-black dark:text-primary-white uppercase">{pod.status}</span>
                    </div>
                </div>
                <div className="flex flex-col gap-4 text-primary-black dark:text-primary-white">
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] text-muted-gray dark:text-muted-white/40 uppercase font-bold">{pod.internalIP ? t("internalIP") : (pod.externalIP ? t("externalIP") : t("ipAddress"))}</span>
                        <span className="text-sm font-mono">{pod.internalIP || pod.externalIP || ""}</span>
                    </div>
                    <div className="flex flex-col">
                        <span
                            className="text-[10px] text-muted-gray dark:text-muted-white/40 uppercase font-bold">Port</span>
                        <span className="text-sm font-mono">{(pod.port && pod.port !== 0) ? pod.port : ""}</span>
                    </div>
                </div>
                <div className="h-px bg-muted-gray/10 dark:bg-muted-gray/20"/>

                <button
                    onClick={handleStop}
                    disabled={isLoading || pod.status === "Offline" || !hasPermission(PermissionFlags.MANAGE_SERVICES_STATE)}
                    className="w-full py-2.5 text-sm rounded-lg border border-red-primary/30 text-red-primary hover:bg-red-primary/10 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isLoading ? (
                        <div className="size-4 border-2 border-red-primary/20 border-t-red-primary rounded-full animate-spin" />
                    ) : (
                        t("stop")
                    )}
                </button>
            </div>
        </div>
    )
};