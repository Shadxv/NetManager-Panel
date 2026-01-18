'use client';

import { useTranslations } from "next-intl";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import {GATEWAY_URL, PermissionFlags} from "@/constants";
import { useDispatch } from "react-redux";
import { addPopup } from "@lib/features/popupSlice";
import {usePermissions} from "@/hooks";

interface VersionCardProps {
    name: string;
    version: string;
    isActive: boolean;
    onSwitch: (version: string) => void;
}

export const VersionCard = ({ name, version, isActive, onSwitch }: VersionCardProps) => {
    const t = useTranslations("Services.Versions");
    const dispatch = useDispatch();
    const { hasPermission } = usePermissions()

    const [isSwitching, setIsSwitching] = useState(false);

    const handleSwitch = () => {
        if (isActive || isSwitching) return;

        setIsSwitching(true);

        axios.patch(`${GATEWAY_URL}/services/${name}/version`, {
            version: version
        })
            .then(() => {
                dispatch(addPopup({
                    type: "success",
                    message: "successVersionSwitched"
                }));

                onSwitch(version);
            })
            .catch((err: AxiosError<{ message?: string }>) => {
                const msg = err.response?.data?.message || "errorSwitchingVersion";
                dispatch(addPopup({
                    type: "error",
                    message: msg
                }));
            })
            .finally(() => {
                setIsSwitching(false);
            });
    };

    return (
        <div
            className={`
                relative p-5 rounded-2xl border-2 transition-all duration-200 flex flex-col min-h-45
                ${isActive
                ? 'border-accent bg-accent/5 shadow-md shadow-accent/5'
                : 'border-muted-gray/10 dark:border-muted-gray/20 bg-muted-white/5 dark:bg-primary-black/10 hover:border-muted-gray/40'
            }
            `}
        >
            <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-bold tracking-widest text-muted-gray dark:text-muted-white/40 uppercase">
                    {t("versionTag")}
                </span>
                {isActive && (
                    <span className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[10px] font-bold text-green-500 uppercase">{t("live")}</span>
                    </span>
                )}
            </div>

            <div className="text-3xl font-mono font-bold text-primary-black dark:text-primary-white mb-6">
                {version}
            </div>

            <div className="flex items-center justify-between mt-auto">
                <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    isActive
                        ? 'bg-accent text-white'
                        : 'bg-muted-gray/10 text-muted-gray dark:text-muted-white/60'
                }`}>
                    {isActive ? t("active") : t("idle")}
                </div>

                {!isActive && (
                    <button
                        onClick={handleSwitch}
                        disabled={isSwitching || !hasPermission(PermissionFlags.UPDATE_SERVICES)}
                        className="flex items-center gap-2 text-xs font-semibold text-accent hover:text-accent/80 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSwitching ? (
                            <div className="size-3 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                        ) : (
                            <>{t("switchTo")} →</>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
};