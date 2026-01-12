'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@lib/store';
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export function AuthGuard({ children }: { children: React.ReactNode }) {
    const { isHydrated, user, status } = useSelector((state: RootState) => state.account);
    const pathname = usePathname();
    const router = useRouter();

    const isLoginPage = pathname === '/login';
    const isSetupPage = pathname.startsWith('/login/setup');
    const isResetPage = pathname.startsWith('/login/reset');
    const isMainPage = pathname === '/';

    const isPublicPage = isLoginPage || isSetupPage || isResetPage || isMainPage;

    useEffect(() => {
        if (!isHydrated) return;

        if (!user && !isPublicPage) {
            router.push('/login');
            return;
        }

        if (user && status === 'REQUIRES_SETUP' && !isSetupPage) {
            router.push('/login/setup');
            return;
        }

        if (user && status === 'REQUIRES_PASSWORD_RESET' && !isResetPage) {
            router.push('/login/reset');
            return;
        }

        if (user && status === 'AUTHENTICATED' && isLoginPage) {
            router.push('/dashboard');
            return;
        }
    }, [isHydrated, user, status, isPublicPage, isSetupPage, isResetPage, isLoginPage, isMainPage, router]);

    if (!isHydrated) {
        if (isPublicPage) return <>{children}</>;

        return (
            <div className="fixed inset-0 bg-secondary-white dark:bg-secondary-black flex items-center justify-center">
                <div className="size-10 border-4 border-accent border-b-transparent animate-spin rounded-full" />
            </div>
        );
    }

    if (user) {
        if (status === 'REQUIRES_SETUP' && !isSetupPage) return null;
        if (status === 'REQUIRES_PASSWORD_RESET' && !isResetPage) return null;
        if (status === 'AUTHENTICATED' && isLoginPage) return null;
    } else {
        if (!isPublicPage) return null;
    }

    return <>{children}</>;
}