'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@lib/store';
import { useEffect } from 'react';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
    const theme = useSelector((state: RootState) => state.preferences.theme);

    useEffect(() => {
        document.documentElement.className = theme;
    }, [theme]);

    return <>{children}</>;
}