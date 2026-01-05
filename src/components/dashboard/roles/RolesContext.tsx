'use client'

import React, { createContext, useContext, useState } from 'react';
import {BaseRole, RoleDetails} from "@/types";
import axios from "axios";
import { RESTAPI_URL } from "@/constants";
import {useAppDispatch} from "@lib/hooks";
import {addPopup} from "@lib/features/popupSlice";

const RolesContext = createContext<{
    roles: BaseRole[];
    isLoading: boolean;
    setRoles: React.Dispatch<React.SetStateAction<BaseRole[]>>;
    refreshRoles: () => Promise<void>;
    removeRoleLocal: (id: string) => void;
    updateRoleLocal: (id: string, partialRole: Partial<RoleDetails>) => void
} | undefined>(undefined);

export const RolesProvider = ({ children }: { children: React.ReactNode }) => {
    const [roles, setRoles] = useState<BaseRole[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const dispatch = useAppDispatch()

    const refreshRoles = async () => {
        setIsLoading(true);
        await axios.get(`${RESTAPI_URL}/roles`)
            .then((res) => {
                setRoles(res.data.sort((a: BaseRole, b: BaseRole) => a.index - b.index))
            })
            .catch((e) => {
                dispatch(addPopup({type: "error", message: "failedRefreshRoles"}))
            })
            .finally(() => setIsLoading(false))
    };

    const removeRoleLocal = (id: string) => {
        setRoles(prev => prev.filter(r => r.id !== id));
    };

    const updateRoleLocal = (id: string, partialRole: Partial<RoleDetails>) => {
        setRoles(prev => prev.map(r =>
            r.id === id ? { ...r, ...partialRole } : r
        ));
    };

    return (
        <RolesContext.Provider value={{ roles, isLoading, setRoles, refreshRoles, removeRoleLocal, updateRoleLocal }}>
            {children}
        </RolesContext.Provider>
    );
}

export const useRoles = () => {
    const context = useContext(RolesContext);
    if (!context) throw new Error("useRoles must be used within RolesProvider");
    return context;
};