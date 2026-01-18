'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PodInfo, ServiceDetails } from "@/types";
import { GATEWAY_URL, SSE_URL } from "@/constants";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { addPopup } from "@lib/features/popupSlice";

interface SSEMessage {
    serviceName: string;
    type: 'pod_update' | 'pod_deleted' | 'version' | 'current_version' | 'status';
    payload: {
        pod?: string;
        status?: string;
        event?: string;
        verison?: string;
        newVersion?: string;
    };
}

interface ServiceDataContextType {
    data: ServiceDetails | null;
    isLoading: boolean;
    isStoppingPod: string | null;
    updateVersion: (version: string) => void;
    stopPod: (podName: string) => void;
}

const ServiceDataContext = createContext<ServiceDataContextType | undefined>(undefined);

export function ServiceDataProvider({ children, serviceName }: { children: React.ReactNode, serviceName: string }) {
    const dispatch = useDispatch();
    const [data, setData] = useState<ServiceDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isStoppingPod, setIsStoppingPod] = useState<string | null>(null);

    const fetchInitialData = useCallback(() => {
        axios.get<ServiceDetails>(`${GATEWAY_URL}/services/${serviceName}`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err: AxiosError) => {
                console.error("REST Fetch error:", err.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [serviceName]);

    const updateVersion = useCallback((version: string) => {
        setData(prev => {
            if (!prev) return null;
            return {
                ...prev,
                currentVersion: version
            };
        });
    }, []);

    const stopPod = useCallback((podName: string) => {
        if (!serviceName) return;

        setIsStoppingPod(podName);

        axios.post(`${GATEWAY_URL}/services/${serviceName}/pod/${podName}/stop`)
            .then(() => {
                dispatch(addPopup({
                    type: "success",
                    message: "successPodStopped"
                }));
            })
            .catch((err: AxiosError<{ message?: string }>) => {
                const msg = err.response?.data?.message || "errorStoppingPod";
                dispatch(addPopup({
                    type: "error",
                    message: msg
                }));
            })
            .finally(() => {
                setIsStoppingPod(null);
            });
    }, [serviceName, dispatch]);

    useEffect(() => {
        fetchInitialData();

        const eventSource = new EventSource(`${SSE_URL}/service?name=${serviceName}`);

        eventSource.onmessage = (event) => {
            if (event.data === "connected") {
                console.log(`[SSE] Connected to service events for ${serviceName}`);
                return;
            }

            try {
                const message: SSEMessage = JSON.parse(event.data);
                const podName = message.payload.pod;
                const newStatus = message.payload.status || 'Unknown';
                const newVersion = message.payload.newVersion;
                const version = message.payload.verison;

                switch (message.type) {
                    case 'pod_update':
                        if (!podName) return;
                        setData(prev => {
                            if (!prev) return null;
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

                    case 'status':
                        setData(prev => {
                            if (!prev) return null;
                            return { ...prev, status: newStatus };
                        });
                        break;

                    case 'version':
                        if (!newVersion) return;
                        setData(prev => {
                            if (!prev) return null;
                            if (prev.availableVersions.includes(newVersion)) return prev;
                            return {
                                ...prev,
                                availableVersions: [...prev.availableVersions, newVersion]
                            };
                        });
                        break;

                    case 'current_version':
                        if (!version) return;
                        updateVersion(version);
                        break;
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
    }, [serviceName, fetchInitialData, updateVersion]);

    return (
        <ServiceDataContext.Provider value={{ data, isLoading, isStoppingPod, updateVersion, stopPod }}>
            {children}
        </ServiceDataContext.Provider>
    );
}

export const useServiceData = () => {
    const context = useContext(ServiceDataContext);
    if (!context) throw new Error('useServiceData must be used within ServiceDataProvider');
    return context;
};