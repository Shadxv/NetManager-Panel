'use client';

import {useServiceData} from "@/components/dashboard/services/ServiceDataContext";
import {VersionCard} from "@/components/dashboard/services/VersionCard";

export const VersionsListView = () => {
    const { data, isLoading, updateVersion } = useServiceData();

    if (isLoading) {
        return (
            <div className="flex flex-1 items-center justify-center min-h-100">
                <div className="size-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) return <div>No version data available.</div>;

    return (
        <div className="flex flex-col gap-6 w-full h-full max-h-[calc(100vh-260px)] animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-primary-black dark:text-primary-white tracking-tight">
                        Wersje Projektu
                    </h2>
                    <p className="text-sm text-muted-gray dark:text-muted-white/60">
                        Zarządzaj dostępnymi buildami aplikacji.
                    </p>
                </div>

                <button className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-accent/25 active:scale-95 font-medium text-sm flex items-center justify-center gap-2 shrink-0 cursor-pointer">
                    <span className="text-xl leading-none">+</span>
                    Build New Version
                </button>
            </div>

            <div className="flex flex-col gap-4 flex-1 overflow-hidden pb-4">
                <h3 className="text-lg font-bold text-primary-black dark:text-primary-white tracking-tight">
                    Available Builds
                </h3>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {data.availableVersions.map((v) => (
                            <VersionCard
                                key={v}
                                version={v}
                                isActive={v === data.currentVersion}
                                onSwitch={updateVersion}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};