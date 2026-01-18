'use client'

import Link from "next/link";
import {useServices} from "@/components/dashboard/services/ServicesContext";
import {ServiceComponent} from "@/components/dashboard/services/ServiceComponent";
import {useTranslations} from "next-intl";
import {CreateServiceButton} from "@/components/dashboard/services/CreateServiceButton";

export const ServiceList = () => {
    const t = useTranslations("Services")
    const { services, isLoading } = useServices();

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center min-h-100">
                <div className="size-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (services.length === 0) {
        return (
            <div className="flex flex-col w-full h-full gap-2">
                <CreateServiceButton/>

                <div className="flex flex-col w-full h-full gap-2 items-center justify-center">
                    <p className="text-2xl text-muted-gray dark:text-muted-white">
                        {t("noServicesFound")}
                    </p>
                    <p className="font-light text-muted-gray/60 dark:text-muted-white/60">
                        {t("noServicesFoundDescription")}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-6">
            <CreateServiceButton/>

            {services.map((service) => (
                service.status === "CREATING" ?
                    <ServiceComponent key={service.name} service={service} /> :
                    <Link
                        key={service.name}
                        href={`/dashboard/services/${service.name.toLowerCase()}`}
                        className="group cursor-pointer"
                    >
                        <ServiceComponent service={service} />
                    </Link>

            ))}
        </div>
    );
};