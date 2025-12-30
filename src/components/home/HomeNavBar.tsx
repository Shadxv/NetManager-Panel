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
                            <svg viewBox="0 0 5000 5000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                                <path d="M912.942,1550.438l1591.3,-893.783l1586.879,891.771l0.408,1953.279l-1595.158,889.912l-1587.379,-883.808l3.95,-1957.367l0,-0.004Zm1249.567,-4.417l-617.512,356.733l0,1242.229l614.054,356.788l0,-1160.946l348.213,-190.492l335.442,194.721l5.854,1150.279l623.325,-340.162l0,-1248.083l-621.083,-359.975l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229Z" fill="#1e1b4b"/>
                                <path d="M2159.05,2340.829l348.213,-190.492l335.442,194.721l-330.504,189.633l-353.154,-193.863l0.004,0Z" fill="#3730a3"/>
                                <path d="M910.371,2822.842l2.567,-1272.4l1591.3,-893.783l1586.879,891.771l0.262,1268.883l-619.496,337.871l0,-1248.083l-621.083,-359.975l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229l-617.512,356.733l0,1242.229l-634.625,-322.146l0,-0.008Z" fill="#3730a3"/>
                                <path d="M912.921,1559.692l0.017,-9.254l1591.3,-893.783l1582.367,889.238l-614.725,361.904l0,-0.7l-621.083,-359.975l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229l-617.512,356.733l-632.054,-352.325l-0.017,9.254Z" fill="#4f46e5"/>
                                <path d="M2418.258,704.95l85.983,-48.296l85.712,48.171l677.084,1083.538l-416.238,-241.246l-2.554,543.938l-349.213,-203.096l-334.817,201.296l-1.708,-543.229l-409.763,236.721l665.513,-1077.792l0,-0.004Z" fill="#473fcf"/>
                            </svg>
                        </div>
                        <span className="ml-3 font-bold text-primary-white tracking-tighter text-xl hidden sm:block">NET<span className="text-accent">Manager</span></span>
                    </div>
                </a>

                <button
                    className="group p-2 rounded-full hover:bg-muted-gray/20 transition-all hover:outline hover:outline-muted-gray/40 shadow-sm"
                    onClick={() => setActive(true)}
                >
                    <svg viewBox="0 0 53 31" className="size-7 text-secondary-gray group-hover:text-primary-white transition-colors" fill="none">
                        <g transform="scale(1,-1) translate(0,-30.80859375)">
                            <path fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" d="M 6.015625,25.30859375 L 46.943359375,25.30859375 M 6.015625,15.404296875 L 46.943359375,15.404296875 M 6.015625,5.5 L 46.943359375,5.5" />
                        </g>
                    </svg>
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

                    <button className="mt-10 w-full py-3 bg-accent hover:bg-primary-white text-primary-white hover:text-accent font-bold rounded-xl shadow-lg shadow-accent/20 transition-all active:scale-[0.98]">
                        {t("signIn")}
                    </button>
                </div>
            </div>
        </>
    );
};