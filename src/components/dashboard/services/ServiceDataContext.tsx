'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {PodInfo, ServiceDetails} from "@/types";

interface SSEMessage {
    serviceName: string;
    type: 'log' | 'pod_update' | 'pod_deleted';
    payload: {
        pod: string;
        line?: string;
        status?: string;
        event?: string;
    };
}

interface ServiceDataContextType {
    data: ServiceDetails | null;
    logs: Record<string, string[]>;
    isLoading: boolean;
    updateVersion: (version: string) => Promise<void>;
}

const ServiceDataContext = createContext<ServiceDataContextType | undefined>(undefined);

export function ServiceDataProvider({ children, serviceName }: { children: React.ReactNode, serviceName: string }) {
    const [data, setData] = useState<ServiceDetails | null>(null);
    const [logs, setLogs] = useState<Record<string, string[]>>({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchInitialData = useCallback(async () => {
        try {
            // const res = await fetch(`http://localhost:4000/services/${serviceName}`);
            // const initial = await res.json();
            // setData(initial);
        } catch (e) {
            console.error("REST Fetch error:", e);
        } finally {
            setIsLoading(false);
        }
    }, [serviceName]);

    useEffect(() => {
        fetchInitialData();

        const eventSource = new EventSource(`http://localhost:4000/events?service=${serviceName}`);

        eventSource.onmessage = (event) => {
            if (event.data === "connected") {
                console.log(`[SSE] Connected to ${serviceName}`);
                return;
            }

            const message: SSEMessage = JSON.parse(event.data);

            switch (message.type) {
                case 'log':
                    if (message.payload.line) {
                        const podId = message.payload.pod;
                        const line = message.payload.line;

                        setLogs(prev => ({
                            ...prev,
                            [podId]: [...(prev[podId] || []).slice(-499), line]
                        }));
                    }
                    break;

                case 'pod_update':
                    setData(prev => {
                        if (!prev) return null;

                        const podName = message.payload.pod;
                        const newStatus = message.payload.status || 'Unknown';
                        const exists = prev.pods.some(p => p.name === podName);

                        if (exists) {
                            return {
                                ...prev,
                                pods: prev.pods.map(p => p.name === podName ? { ...p, status: newStatus } : p)
                            };
                        } else {
                            const newPod: PodInfo = {
                                name: podName,
                                status: newStatus,
                            };
                            return { ...prev, pods: [...prev.pods, newPod] };
                        }
                    });
                    break;

                case 'pod_deleted':
                    setData(prev => {
                        if (!prev) return null;
                        return {
                            ...prev,
                            pods: prev.pods.filter(p => p.name !== message.payload.pod)
                        };
                    });
                    break;
            }
        };

        eventSource.onerror = (err) => {
            console.error("[SSE] Connection Error:", err);
            eventSource.close();
        };

        return () => {
            eventSource.close();
        };
    }, [serviceName, fetchInitialData]);

    const updateVersion = async (version: string) => {
        console.log(`Switching ${serviceName} to version ${version}`);
    };

    return (
        <ServiceDataContext.Provider value={{ data, logs, isLoading, updateVersion }}>
            {children}
        </ServiceDataContext.Provider>
    );
}

export const useServiceData = () => {
    const context = useContext(ServiceDataContext);
    if (!context) throw new Error('useServiceData must be used within ServiceDataProvider');
    return context;
}