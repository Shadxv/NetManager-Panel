'use client'

import Link from "next/link";
import {useServices} from "@/components/dashboard/services/ServicesContext";
import {ServiceComponent} from "@/components/dashboard/services/ServiceComponent";

export const ServiceList = () => {
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
            <div className="flex flex-col items-center justify-center py-20 bg-muted-white/5 dark:bg-primary-black/5 rounded-3xl border-2 border-dashed border-muted-gray/10">
                <p className="text-sm font-medium text-muted-gray dark:text-muted-white/40 uppercase tracking-widest">
                    No services found
                </p>
                <p className="text-xs text-muted-gray/60 mt-1">
                    Twój system nie posiada jeszcze żadnych aktywnych instancji.
                </p>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full gap-2">
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