import React from "react";
import {ServiceDataProvider, ServiceNavBar} from "@/components/dashboard/services";

interface ServiceProp {
    children: React.ReactNode
    params: Promise<{ id: string, podId?: string }>;
}

export default async function Layout({ children, params } : ServiceProp) {
    const paramsObj = await params;
    const id = paramsObj.id;

    return (
        <div className="flex flex-col gap-8 w-full h-full">
            <div className="flex flex-col gap-4 w-full">
                <h1 className="text-3xl font-bold text-primary-black dark:text-primary-white">
                    {id}
                </h1>
                <ServiceNavBar/>
            </div>
            <div className="w-full h-full">
                <ServiceDataProvider serviceName={id}>
                    {children}
                </ServiceDataProvider>
            </div>
        </div>
    )
}