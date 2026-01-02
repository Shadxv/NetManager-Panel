'use client';

import React, {forwardRef} from 'react';
import {BubbleSwitch} from "@/components";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@lib/store";
import {setLanguage, setTheme} from "@lib/features/preferencesSlice";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";

interface AccountMenuProp {
    isOpen: boolean;
}

export const AccountMenu = forwardRef<HTMLDivElement, AccountMenuProp>((props, ref) => {

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.preferences.theme);
    const language = useSelector((state: RootState) => state.preferences.language);
    const router = useRouter();
    const t = useTranslations("DashboardNavBar")

    if (!props.isOpen) return null;

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';

        dispatch(setTheme(newTheme));

        Cookies.set('theme', newTheme, { expires: 365 });
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'pl' : 'en';

        dispatch(setLanguage(newLanguage));

        Cookies.set('NEXT_LOCALE', newLanguage, { expires: 365 });
        router.refresh();
    };

    return (
        <div
            ref={ref}
            className="w-78 bg-primary-white dark:bg-primary-black border border-secondary-white dark:border-secondary-black rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in duration-150 origin-bottom-left z-97"
        >
            <div className="mb-4 ml-1">
                <h3 className="text-xs font-bold tracking-widest text-secondary-gray uppercase dark:opacity-40">
                    {t("preferences")}
                </h3>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-black dark:text-primary-white ml-1">{t("language")}</span>
                    <BubbleSwitch
                        leftOption="en"
                        rightOption="pl"
                        currentOption={language}
                        onClick={toggleLanguage}
                    />
                </div>

                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary-black dark:text-primary-white ml-1">{t("theme")}</span>
                        <BubbleSwitch
                            leftOption="dark"
                            rightOption="light"
                            currentOption={theme}
                            onClick={toggleTheme}
                        />
                </div>

                <div className="h-px bg-muted-white/40 dark:bg-primary-gray mx-1 my-2" />

                <button className="w-full flex items-center p-2 rounded-lg hover:bg-muted-white/20 dark:hover:bg-primary-gray transition-colors group">
                    <span className="text-sm text-primary-gray dark:text-secondary-gray group-hover:text-secondary-black dark:group-hover:text-primary-white transition-colors">
                        {t("userSettings")}
                    </span>
                </button>

                <button className="w-full bg-accent text-primary-white hover:bg-primary-black dark:hover:bg-primary-white hover:text-primary-white dark:hover:text-accent text-sm py-2 rounded-xl transition-all">
                    {t("signout")}
                </button>
            </div>
        </div>
    );
});

AccountMenu.displayName = 'AccountMenu'