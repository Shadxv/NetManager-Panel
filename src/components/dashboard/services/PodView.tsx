'use client'
import { useState, useEffect } from "react";
import Link from "next/link";
import { BackIcon } from "@/components/icons";
import { PodInfo } from "@/types";
import { PodConsole } from "@/components/dashboard/services/PodConsole";
import { PodSidebar } from "@/components/dashboard/services/PodSidebar";
import { SSE_URL } from "@/constants";
import { useTranslations } from "next-intl";
import { useServiceData } from "@/components/dashboard/services/ServiceDataContext";

interface SSEMessage {
    type: 'log' | 'pod_update';
    payload: {
        line?: string;
        status?: string;
    };
}

export default function PodView({ serviceId, podId }: { serviceId: string, podId: string }) {
    const t = useTranslations("Services.Pod")
    const [logs, setLogs] = useState<string[]>([]);
    const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
    const [podStatus, setPodStatus] = useState<string>("Unknown");

    useEffect(() => {
        const url = `${SSE_URL}/pod?name=${podId}&service=${serviceId}`;
        const eventSource = new EventSource(url);

        eventSource.onmessage = (event) => {
            if (event.data === "connected") {
                console.log(`[SSE] Connected to pod ${podId}`);
                return;
            }

            try {
                const message: SSEMessage = JSON.parse(event.data);

                if (message.type === 'log' && message.payload.line) {
                    setLogs(prev => {
                        const newLogs = [...prev, message.payload.line!];
                        if (newLogs.length > 1000) return newLogs.slice(-1000);
                        return newLogs;
                    });
                } else if (message.type === 'pod_update' && message.payload.status) {
                    setPodStatus(message.payload.status);
                }
            } catch (e) {
                console.error("[SSE] JSON Parse Error:", e);
            }
        };

        eventSource.onerror = (err) => {
            console.error("[SSE] Connection Error:", err);
        };

        return () => {
            eventSource.close();
        };
    }, [serviceId, podId]);

    const podInfo: PodInfo = {
        name: podId,
        status: podStatus,
    };

    return (
        <div className="flex flex-col gap-6 w-full h-full max-h-[calc(100vh-254px)] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-accent/50 scrollbar-track-transparent animate-in fade-in duration-500">
            <div className="flex justify-between w-full">
                <div className="flex flex-col">
                    <span className="text-xs font-bold text-muted-gray dark:text-muted-white/40 uppercase tracking-widest">{t("instanceIdentifier")}</span>
                    <h2 className="text-2xl font-bold text-primary-black dark:text-primary-white">{podInfo.name}</h2>
                </div>
                <Link href={`/dashboard/services/${serviceId}`} className="text-accent/80 hover:text-accent gap-2 items-center inline-flex w-fit transition-colors">
                    <div className="size-4 shrink-0">{BackIcon}</div>
                    {t("back")}
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