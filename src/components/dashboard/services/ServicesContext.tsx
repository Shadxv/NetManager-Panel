'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ServiceBaseInfo } from '@/types/services';
import {useDispatch} from "react-redux";
import {addPopup} from "@lib/features/popupSlice";
import {GATEWAY_URL} from "@/constants";
import axios from "axios";

interface ServicesContextType {
    services: ServiceBaseInfo[];
    isLoading: boolean;
    addService: (service: ServiceBaseInfo) => void;
    refreshServices: () => void;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
    const [services, setServices] = useState<ServiceBaseInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const dispatch = useDispatch()

    const refreshServices = useCallback(() => {
        setIsLoading(true);
        axios.get(`${GATEWAY_URL}/services`)
            .then((response) => {
                setServices(response.data);
            })
            .catch(() => {
                dispatch(addPopup({ type: "error", message: "errorFetchServices" }));
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [dispatch]);

    useEffect(() => {
        refreshServices();
    }, [refreshServices]);

    const addService = (newService: ServiceBaseInfo) => {
        setServices(prev => [...prev, newService]);
    };

    return (
        <ServicesContext.Provider value={{ services, isLoading, addService, refreshServices }}>
            {children}
        </ServicesContext.Provider>
    );
}

export function useServices() {
    const context = useContext(ServicesContext);
    if (context === undefined) {
        throw new Error('useServices must be used within a ServiceProvider');
    }
    return context;
}