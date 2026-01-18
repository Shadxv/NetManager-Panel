'use client';

import { useRouter } from 'next/navigation';
import { TerminalIcon } from "@/components/icons";
import {PodInfo} from "@/types";
import {PodIPComponent} from "@/components/dashboard/services/PodIPComponent";

interface PodItemProps {
    pod: PodInfo;
    serviceId: string;
}

const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
        case 'running': case 'online': case 'succeeded': return 'text-green-primary bg-green-primary/10 border-green-primary/20';
        case 'pending': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
        case 'failed': case 'offline': return 'text-red-primary bg-red-primary/10 border-red-primary/20';
        default: return 'text-muted-gray bg-muted-gray/10 border-muted-gray/20';
    }
};

export const PodComponent = ({ pod, serviceId }: PodItemProps) => {
    const router = useRouter();

    return (
        <div
            onClick={() => router.push(`/dashboard/services/${serviceId}/pod/${pod.name}`)}
            className="group flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl bg-muted-white/30 dark:bg-primary-black/20 border border-muted-white/10 dark:border-muted-gray/10 hover:border-accent/40 hover:bg-muted-white/50 dark:hover:bg-primary-black/40 transition-all cursor-pointer"
        >
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center justify-center p-3 rounded-xl bg-primary-gray/5 dark:bg-muted-white/5 text-accent group-hover:scale-110 transition-transform size-12">
                    {TerminalIcon}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-primary-black dark:text-primary-white">{pod.name}</span>
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 mt-4 md:mt-0 w-full md:w-auto justify-between md:justify-end">
                <PodIPComponent
                    internalIP={pod.internalIP}
                    externalIP={pod.externalIP}
                    port={pod.port}
                />

                <div className={`px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(pod.status)}`}>
                    {pod.status}
                </div>

                <div className="flex gap-1" onClick={(e) => e.stopPropagation()}>
                    <button title="Stop Pod" className="p-2 rounded-lg hover:bg-red-primary/10 text-muted-gray hover:text-red-primary transition-colors">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="6" width="12" height="12"></rect></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};