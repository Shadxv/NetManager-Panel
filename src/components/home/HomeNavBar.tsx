'use client'

import { BubbleSwitch } from "@/components/BubbleSwitchComponent";
import { useEffect, useRef, useState } from "react";
import { gsap } from 'gsap';
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@lib/store";
import {setLanguage, setTheme} from "@lib/features/preferencesSlice";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {useTranslations} from "next-intl";
import {HamburgerIcon, Signet} from "@/components/icons";
import {logout} from "@lib/features/accountSlice";

export const HomeNavBar = () => {
    const [active, setActive] = useState(false);
    const [isAtTop, setIsAtTop] = useState(true);
    const menuRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLAnchorElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (active && menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setActive(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [active]);

    useEffect(() => {
        const handleScroll = () => {
            setIsAtTop(window.scrollY < 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useGSAP(() => {
        ScrollTrigger.refresh();

        gsap.set(logoRef.current, { y: -16, autoAlpha: 0 });

        gsap.to(logoRef.current, {
            y: 0,
            autoAlpha: 1,
            duration: 0.3,
            ease: "none",
            scrollTrigger: {
                trigger: "#hero",
                start: "bottom 0%",
                toggleActions: "play none none reverse",
            }
        });
    }, { dependencies: [] });

    const dispatch = useDispatch();
    const theme = useSelector((state: RootState) => state.preferences.theme);
    const language = useSelector((state: RootState) => state.preferences.language);
    const authState = useSelector((state: RootState) => state.account.status);
    const t = useTranslations("HomeNavBar")

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
        <>
            <nav className={`fixed top-0 left-0 z-40 w-full flex items-center justify-between p-4 md:px-16 px-6 transition-all duration-500 ${
                isAtTop
                    ? "bg-transparent border-transparent shadow-none"
                    : "bg-primary-black/90 backdrop-blur-md border-b border-muted-gray/10 shadow-lg shadow-primary-black/40"
            }`}>
                <a
                    ref={logoRef}
                    href="#hero"
                    className="group flex items-center cursor-pointer"
                    style={{ visibility: 'hidden' }}
                >
                    <div className="flex items-center transition-transform duration-300 active:scale-95 group-hover:scale-105">
                        <div className="size-10">
                            {Signet}
                        </div>
                        <span className="ml-3 font-bold text-primary-white tracking-tighter text-xl hidden sm:block">NET<span className="text-accent">Manager</span></span>
                    </div>
                </a>

                <button
                    className="group p-2 rounded-full hover:bg-muted-gray/20 transition-all outline-transparent hover:outline hover:outline-muted-gray/40 shadow-sm text-secondary-gray group-hover:text-primary-white"
                    onClick={() => setActive(true)}
                >
                    <div className="flex justify-center items-center size-7">
                        {HamburgerIcon}
                    </div>
                </button>
            </nav>

            <div
                ref={menuRef}
                className={`${active ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"} fixed top-0 left-0 z-50 w-full bg-primary-black/95 backdrop-blur-md border-b border-muted-gray/20 transition-all duration-500 ease-in-out shadow-2xl shadow-primary-black`}
            >
                <div className="flex flex-col p-6 max-w-lg mx-auto">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-secondary-white font-bold text-sm uppercase tracking-[0.2em]">{t("preferences")}</h2>
                        <button
                            className="group p-2 rounded-full bg-primary-gray hover:bg-muted-gray/20 transition-all border border-muted-gray/30"
                            onClick={() => setActive(false)}
                        >
                            <svg viewBox="0 0 43.18 33.75" className="size-6 text-secondary-gray group-hover:text-primary-white transition-colors" fill="none">
                                <g transform="scale(1,-1) translate(0,-33.751953125)">
                                    <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M 5.62890625,1.654296875 L 37.533203125,32.09765625 M 5.62890625,32.09765625 L 37.533203125,1.654296875" />
                                </g>
                            </svg>
                        </button>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-between group">
                            <div>
                                <p className="text-primary-white font-medium text-lg">{t("language")}</p>
                                <p className="text-muted-white text-xs">{t("languageDescription")}</p>
                            </div>
                            <BubbleSwitch leftOption="en" rightOption="pl" currentOption={language} onClick={toggleLanguage} />
                        </div>

                        <div className="h-px w-full bg-linear-to-r from-transparent via-muted-gray/20 to-transparent" />

                        <div className="flex items-center justify-between group">
                            <div>
                                <p className="text-primary-white font-medium text-lg">{t("appearance")}</p>
                                <p className="text-muted-white text-xs">{t("appearanceDescription")}</p>
                                <p className="text-secondary-gray text-xs">({t("homePageExcluded")})</p>
                            </div>
                            <BubbleSwitch leftOption="dark" rightOption="light" currentOption={theme} onClick={toggleTheme} />
                        </div>
                    </div>

                    <button onClick={
                        authState === "IDLE" ?
                            () => router.push("/login") :
                            () => {
                                Cookies.remove('nm_auth_token');
                                localStorage.removeItem('nm_auth_token');
                                dispatch(logout());
                                router.refresh()
                            }
                    } className="mt-10 w-full py-3 bg-accent hover:bg-primary-white text-primary-white hover:text-accent font-bold rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98]">
                        {authState === "IDLE" ?
                            t("signIn") :
                            t("logout")
                        }
                    </button>
                </div>
            </div>
        </>
    );
};