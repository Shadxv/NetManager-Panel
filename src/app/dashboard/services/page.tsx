'use client'

import {ServiceList, ServicesProvider} from "@/components/dashboard/services/";
import {useTranslations} from "next-intl";

export default function ServicesPage() {
    const t = useTranslations("Services")

    return (
        <ServicesProvider>
            <div className="flex flex-col gap-4 w-full h-full overflow-y-auto animate-in fade-in duration-500">
                <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">
                    {t("services")}
                </h1>

                <ServiceList />
            </div>
        </ServicesProvider>
    );
}