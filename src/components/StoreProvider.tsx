'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from '@lib/store';
import { initPreferences } from '@lib/features/preferencesSlice';

interface InitialData {
    theme: 'light' | 'dark';
    language: 'pl' | 'en';
}

export default function StoreProvider({ children, initialData }: { children: React.ReactNode; initialData: InitialData; }) {
    const storeRef = useRef<AppStore>(undefined);

    if (!storeRef.current) {
        const store = makeStore();
        store.dispatch(initPreferences(initialData));
        storeRef.current = store;
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}