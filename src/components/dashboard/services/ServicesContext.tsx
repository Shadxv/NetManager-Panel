'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ServiceBaseInfo } from '@/types/services';

interface ServicesContextType {
    services: ServiceBaseInfo[];
    isLoading: boolean;
    addService: (service: ServiceBaseInfo) => void;
    refreshServices: () => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export function ServicesProvider({ children }: { children: React.ReactNode }) {
    const [services, setServices] = useState<ServiceBaseInfo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const refreshServices = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/services');
            if (!response.ok) throw new Error('Failed to fetch');
            const data = await response.json();
            setServices(data);
        } catch (error) {
            // TODO handling
        } finally {
            setIsLoading(false);
        }
    }, []);

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