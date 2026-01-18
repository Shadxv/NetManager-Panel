'use client';

import {useTranslations} from "next-intl";

interface PodIPDisplayProps {
    internalIP?: string;
    externalIP?: string;
    port?: number;
}

export const PodIPComponent = ({ internalIP, externalIP, port }: PodIPDisplayProps) => {
    const t = useTranslations("Services.Pod")
    if (externalIP) {
        return (
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted-gray dark:text-muted-white/40 uppercase font-bold tracking-tight">{t("externalIP")}</span>
                <span className="text-sm font-mono dark:text-secondary-white">{externalIP}:{port}</span>
            </div>
        );
    }

    if (internalIP) {
        return (
            <div className="flex flex-col items-end">
                <span className="text-[10px] text-muted-gray dark:text-muted-white/40 uppercase font-bold tracking-tight">{t("internalIP")}</span>
                <span className="text-sm font-mono dark:text-secondary-white">{internalIP}:{port}</span>
            </div>
        );
    }

    return null;
};