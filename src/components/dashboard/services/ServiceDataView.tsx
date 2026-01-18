'use client';

import {useServiceData} from "@/components/dashboard/services/ServiceDataContext";
import {PodComponent} from "@/components/dashboard/services/PodComponent";

export const ServiceDetailsView = ({ serviceId }: { serviceId: string }) => {
    const { data, isLoading } = useServiceData();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="size-10 border-4 border-accent/20 border-t-accent rounded-full animate-spin" />
            </div>
        );
    }

    if (!data) return <div>Service not found</div>;

    return (
        <div className="flex flex-col gap-6 w-full h-full max-h-[calc(100vh-250px)] animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-muted-white/10 dark:bg-primary-black/10 p-4 rounded-2xl border border-muted-white/10 dark:border-muted-gray/10">
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest">Global Status</span>
                        <div className="flex items-center gap-4">
                            <div className={`size-2.5 rounded-full animate-pulse ${data.status === 'Online' ? 'bg-green-primary' : 'bg-red-primary'}`} />
                            <h2 className="text-xl font-bold text-primary-black dark:text-primary-white">{data.status}</h2>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg border border-red-primary/30 text-red-primary hover:bg-red-primary/10 transition-colors uppercase tracking-wider">Stop All</button>
                    <button className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-lg bg-accent text-white hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 uppercase tracking-wider">Restart All</button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <h3 className="text-lg font-bold text-primary-black dark:text-primary-white tracking-tight">Pod Instances</h3>
                    <p className="text-sm text-muted-gray dark:text-muted-white/60">Aktywne kontenery obsługujące ruch dla {serviceId}.</p>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent max-h-[400px]">
                    <div className="flex flex-col gap-3">
                        {data.pods.map((pod) => (
                            <PodComponent key={pod.name} pod={pod} serviceId={serviceId} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};