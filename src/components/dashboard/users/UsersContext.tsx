'use client'

import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { BaseUser, BaseRole, FilterValues, SortOption, UsersContextType } from "@/types";
import {RESTAPI_URL} from "@/constants";
import axios from "axios";
import {useAppDispatch} from "@lib/hooks";
import {addPopup} from "@lib/features/popupSlice";
import {useTranslations} from "next-intl";

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
    const t = useTranslations("Popups")
    const [users, setUsers] = useState<BaseUser[]>([]);
    const [rolesCache, setRolesCache] = useState<Record<string, BaseRole>>({});
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useAppDispatch()

    const [filters, setFilters] = useState<FilterValues>({
        roles: [],
        notProvisionedOnly: false
    });
    const [sortBy, setSortBy] = useState<SortOption>('indexAsc');

    const handleSetFilters = (newFilters: FilterValues) => {
        setIsLoading(true);
        setFilters(newFilters);
    };

    const handleSetSortBy = (newSort: SortOption) => {
        setIsLoading(true);
        setSortBy(newSort);
    };

    useEffect(() => {
        setIsLoading(true);
        axios.get<BaseUser[]>(`${RESTAPI_URL}/users`)
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                dispatch(addPopup({type: "error", message: "fetchingUsersError"}))
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        const missingIds = users
            .map(u => u.roleId)
            .filter((id): id is string => !!id && !rolesCache[id]);

        const uniqueMissingIds = Array.from(new Set(missingIds));

        if (uniqueMissingIds.length === 0) {
            if (users.length > 0) setIsLoading(false);
            return;
        }

        const requests = uniqueMissingIds.map(id =>
            axios.get(`${RESTAPI_URL}/roles/${id}`)
        );

        Promise.all(requests)
            .then(responses => {
                const newRolesCache: Record<string, BaseRole> = {};

                responses.forEach(res => {
                    const data = res.data;
                    newRolesCache[data.id] = {
                        id: data.id,
                        name: data.name,
                        color: data.color,
                        index: data.index
                    };
                });

                setRolesCache(prev => ({ ...prev, ...newRolesCache }));
            })
            .catch(err => {
                dispatch(addPopup({type: "error", message: "fetchingUserRoleError"}))
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, [users, rolesCache]);

    const filteredUsers = useMemo(() => {
        let result = [...users];

        if (filters.email) {
            const emailSearch = filters.email.toLowerCase();
            result = result.filter(u => u.email.toLowerCase().includes(emailSearch));
        }

        if (filters.name) {
            const search = filters.name.toLowerCase();
            result = result.filter(u => {
                const name = u.name?.toLowerCase() ?? '';
                const surname = u.surname?.toLowerCase() ?? '';
                const fullName = `${name} ${surname}`.trim();

                if (search.includes(' ')) {
                    return fullName.includes(search);
                }
                return name.includes(search) || surname.includes(search);
            });
        }

        if (filters.roles && filters.roles.length > 0) {
            result = result.filter(u => {
                if (filters.roles?.includes("none") && !u.roleId) return true;

                if (!u.roleId) return false;
                return filters.roles?.includes(u.roleId);
            });
        }

        if (filters.createdAfter) {
            result = result.filter(u => new Date(u.createdAt) >= filters.createdAfter!);
        }
        if (filters.createdBefore) {
            result = result.filter(u => new Date(u.createdAt) <= filters.createdBefore!);
        }

        if (filters.notProvisionedOnly) {
            result = result.filter(u => u.isProvisioned === false);
        }

        if (filters.createdBy) {
            result = result.filter(u => u.createdBy === filters.createdBy);
        }

        if (filters.createdAfter) {
            const afterDate = new Date(filters.createdAfter);
            result = result.filter(u => new Date(u.createdAt) >= afterDate);
        }

        if (filters.createdBefore) {
            const beforeDate = new Date(filters.createdBefore);
            beforeDate.setHours(23, 59, 59, 999);
            result = result.filter(u => new Date(u.createdAt) <= beforeDate);
        }

        result.sort((a, b) => {
            switch (sortBy) {
                case 'nameAsc':
                    const getNameToSort = (u: BaseUser) => {
                        if (!u.isProvisioned) return u.email.toLowerCase();

                        const name = u.name ?? '';
                        const surname = u.surname ?? '';
                        const fullName = `${name}${surname}`.trim().toLowerCase();

                        return fullName || u.email.toLowerCase();
                    };

                    const nameA = getNameToSort(a);
                    const nameB = getNameToSort(b);

                    return nameA.localeCompare(nameB);

                case 'emailAsc':
                    return a.email.localeCompare(b.email);

                case 'dateDesc':
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

                case 'indexAsc':
                default:
                    const getIndex = (user: BaseUser) => {
                        if (!user.roleId) return 1000;
                        return rolesCache[user.roleId]?.index ?? 999;
                    };

                    const indexA = getIndex(a);
                    const indexB = getIndex(b);

                    return indexA - indexB;
            }
        });

        return result;
    }, [users, filters, sortBy, rolesCache]);

    useEffect(() => {
        if (isLoading && users.length >= 0) {
            setIsLoading(false);
        }
    }, [filteredUsers]);

    return (
        <UsersContext.Provider value={{
            users,
            filteredUsers,
            isLoading,
            setUsers: (val) => { setIsLoading(true); setUsers(val); },
            filters,
            setFilters: handleSetFilters,
            sortBy,
            setSortBy: handleSetSortBy,
            rolesCache
        }}>
            {children}
        </UsersContext.Provider>
    );
}

export const useUsers = () => {
    const context = useContext(UsersContext);
    if (!context) {
        throw new Error("useUsers must be used within UsersProvider");
    }
    return context;
};