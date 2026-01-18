'use client'
import { useState } from "react";
import Link from "next/link";
import { BackIcon } from "@/components/icons";
import {PodInfo} from "@/types";
import {FULL_MOCK_LOGS} from "@/constants";
import {PodConsole} from "@/components/dashboard/services/PodConsole";
import {PodSidebar} from "@/components/dashboard/services/PodSidebar";


export default function PodView({ serviceId, podId }: { serviceId: string, podId: string }) {
    const [logs, setLogs] = useState<string[]>(FULL_MOCK_LOGS);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);

    const podInfo: PodInfo = {
        id: podId,
        status: "Running",
        ip: "10.244.0.12",
        port: "25565",
    };

    return (
        <div className="flex flex-col gap-6 w-full h-full max-h-[calc(100vh-254px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent animate-in fade-in duration-500">
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest">Instance Identifier</span>
                    <h2 className="text-2xl font-mono font-bold text-primary-black dark:text-primary-white">{podInfo.id}</h2>
                </div>
                <Link href={`/dashboard/services/${serviceId}`} className="text-accent/80 hover:text-accent gap-2 items-center inline-flex w-fit transition-colors">
                    <div className="size-4 shrink-0">{BackIcon}</div>
                    Back
                </Link>
            </div>

            <div className="flex flex-col lg:flex-row items-start gap-6">
                <div className="flex-1 w-full flex flex-col gap-4 min-w-0">
                    <PodConsole logs={logs} shouldAutoScroll={shouldAutoScroll} setShouldAutoScroll={setShouldAutoScroll} />
                </div>
                <PodSidebar pod={podInfo} />
            </div>
        </div>
    );
}