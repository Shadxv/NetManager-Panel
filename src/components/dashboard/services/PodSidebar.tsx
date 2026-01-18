import {PodInfo} from "@/types";

export const PodSidebar = ({ pod }: { pod: PodInfo }) => (
    <div className="w-full lg:w-80 shrink-0">
        <div className="bg-muted-white/10 dark:bg-primary-black/10 p-5 rounded-2xl border border-muted-white/10 dark:border-muted-gray/10 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest">Status</span>
                <div className="flex items-center gap-2">
                    <div className="size-2.5 rounded-full bg-green-primary animate-pulse" />
                    <span className="text-sm font-bold text-primary-black dark:text-primary-white uppercase">{pod.status}</span>
                </div>
            </div>
            <div className="flex flex-col gap-4 text-primary-black dark:text-primary-white">
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted-gray dark:text-muted-white/40 uppercase font-bold">Internal IP</span>
                    <span className="text-sm font-mono">{pod.ip}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-[10px] text-muted-gray dark:text-muted-white/40 uppercase font-bold">Port</span>
                    <span className="text-sm font-mono">{pod.port}</span>
                </div>
            </div>
            <div className="h-px bg-muted-gray/10 dark:bg-muted-gray/20" />
            <button className="w-full py-2.5 text-xs font-bold rounded-lg border border-red-primary/30 text-red-primary hover:bg-red-primary/10 transition-colors uppercase tracking-wider cursor-pointer">
                Stop Pod Instance
            </button>
        </div>
    </div>
);