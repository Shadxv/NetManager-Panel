import React from "react";
import {BaseRole} from "@/types/roles";

export interface BaseUser {
    id: string;
    email: string;
    roleId?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    isProvisioned: boolean;
    tempPasswordExpires?: Date;
    createdBy: string;
    createdAt: Date;
}

export interface UserDetails {
    id: string;
    email: string;
    roleId?: string;
    name?: string;
    surname?: string;
    avatar?: string;
    aditionalPermissions: string[];
    isProvisioned: boolean;
    tempPasswordExpires?: Date;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface FilterValues {
    email?: string;
    name?: string;
    roles?: string[];
    createdBefore?: Date | null;
    createdAfter?: Date | null;
    notProvisionedOnly: boolean;
    createdBy?: string;
}

export type SortOption = 'nameAsc' | 'emailAsc' | 'indexAsc' | 'dateDesc';

export interface UsersContextType {
    users: BaseUser[];
    rolesCache: Record<string, BaseRole>;
    filteredUsers: BaseUser[];
    isLoading: boolean;
    setUsers: React.Dispatch<React.SetStateAction<BaseUser[]>>;
    filters: FilterValues;
    setFilters: (filters: FilterValues) => void;
    sortBy: SortOption;
    setSortBy: (sort: SortOption) => void;
}