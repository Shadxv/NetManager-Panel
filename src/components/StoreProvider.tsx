'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@lib/store';
import { initPreferences } from '@lib/features/preferencesSlice';
import { setCredentials, logout, setHydrated } from "@lib/features/accountSlice";
import axios from 'axios';
import { RESTAPI_URL } from "@/constants";
import Cookies from "js-cookie";

axios.interceptors.request.use((config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('nm_auth_token') : null;

    if (token) {
        config.headers.set('Authorization', `Bearer ${token}`);
    }

    config.timeout = 30000;
    return config;
});

export default function StoreProvider({ children, initialData }: { children: React.ReactNode, initialData: { theme: 'light' | 'dark', language: 'pl' | 'en' } }) {
    const [store] = useState<AppStore>(() => {
        const newStore = makeStore();
        newStore.dispatch(initPreferences(initialData));
        return newStore;
    });

    const isProcessing = useRef(false);

    useEffect(() => {
        const state = store.getState();
        const localToken = localStorage.getItem('nm_auth_token');

        if (state.account.isHydrated || isProcessing.current) return;

        if (state.account.user && state.account.token) {
            store.dispatch(setHydrated());
            return;
        }

        if (localToken) {
            isProcessing.current = true;
            axios.get(`${RESTAPI_URL}/auth/me`, {
                headers: { Authorization: `Bearer ${localToken}` }
            })
                .then((res) => {
                    const { user, status, token: newToken, refreshed } = res.data;

                    if (refreshed && newToken) {
                        localStorage.setItem('nm_auth_token', newToken);
                        Cookies.set('nm_auth_token', newToken, { expires: 7, path: '/' });
                    }

                    store.dispatch(setCredentials({
                        token: newToken || localToken,
                        user,
                        status
                    }));
                })
                .catch(() => {
                    store.dispatch(logout());
                    localStorage.removeItem('nm_auth_token');
                    Cookies.remove('nm_auth_token', { path: '/' });
                })
                .finally(() => {
                    store.dispatch(setHydrated());
                    isProcessing.current = false;
                });
        } else {
            store.dispatch(setHydrated());
        }
    }, [store]);

    return <Provider store={store}>{children}</Provider>;
}