'use client'

import {SettingsSection} from "@/components/dashboard/services";
import {useTranslations} from "next-intl";
import React from "react";

export default function SettingsPage() {
    const t = useTranslations("Services.Settings")

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
                <SettingsSection color="#FF3B30" active={true}>
                    <div className="w-full flex justify-between items-center gap-4">
                        <div className="flex flex-col gap-2">
                            <h1 className="text-xl font-bold text-primary-black dark:text-primary-white">{t("deleteTitle")}</h1>
                            <p className="text-sm font-light text-primary-gray dark:text-muted-white">{t("deleteDescription")}</p>
                        </div>
                        <button
                            disabled={false}
                            className="dashboard-small-btn bg-red-primary/80 hover:bg-red-primary text-primary-white cursor-pointer disabled:cursor-not-allowed rounded-2xl">
                            {t("delete")}
                        </button>
                    </div>
                </SettingsSection>
            </div>
        </div>
    )
}