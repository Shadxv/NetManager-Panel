'use client'

import Link from "next/dist/client/link";
import {NavBarButtons} from "@/constants";
import {AccountMenu, NavButton} from "@/components/dashboard";
import {useEffect, useRef, useState} from "react";
import {CloseIcon, HamburgerIcon, Logo, Signet} from "@/components/icons";
import {useTranslations} from "next-intl";

export const NavBar = () => {

    const accountMenuRefMobile = useRef<HTMLDivElement>(null);
    const accountMenuRefDesktop = useRef<HTMLDivElement>(null);
    const accountMenuButtonRefMobile = useRef<HTMLButtonElement>(null);
    const accountMenuButtonRefDesktop = useRef<HTMLButtonElement>(null);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false)
    const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)
    const t = useTranslations("DashboardNavBar")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isAccountMenuOpen &&
                accountMenuRefMobile.current && !accountMenuRefMobile.current.contains(event.target as Node) &&
                accountMenuRefDesktop.current && !accountMenuRefDesktop.current.contains(event.target as Node) &&
                accountMenuButtonRefMobile.current && !accountMenuButtonRefMobile.current.contains(event.target as Node) &&
                accountMenuButtonRefDesktop.current && !accountMenuButtonRefDesktop.current.contains(event.target as Node)
            ) {
                setIsAccountMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isAccountMenuOpen]);

    useEffect(() => {
        const handleScrollLock = () => {
            if (isNavMenuOpen && window.innerWidth < 1024) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        handleScrollLock();

        window.addEventListener('resize', handleScrollLock);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('resize', handleScrollLock);
        };
    }, [isNavMenuOpen]);

    const toggleAccountMenu = () => {
        setIsAccountMenuOpen(!isAccountMenuOpen)
    }

    return (
        <>
            <nav className="relative z-97 w-full bg-primary-white dark:bg-primary-black p-4 px-6 md:px-8 flex justify-between lg:hidden shadow-lg shadow-primary-black/10 dark:shadow-primary-black/60 transition-colors duration-300 ease-in-out">
                <button
                    className="p-2 rounded-full transition-all hover:shadow-sm text-secondary-gray hover:text-secondary-black hover:dark:text-primary-white dark:hover:bg-muted-gray/20 dark:outline dark:outline-transparent dark:hover:outline-muted-gray/40"
                    onClick={() => setIsNavMenuOpen(true)}
                >
                    <div className="flex justify-center items-center size-6">
                        {HamburgerIcon}
                    </div>
                </button>
                <button ref={accountMenuButtonRefMobile} onClick={toggleAccountMenu}>
                    <div className="rounded-full bg-white size-8 shadow-sm shadow-primary-black/10"/>
                </button>
                <div className="absolute top-18 right-0">
                    <AccountMenu ref={accountMenuRefMobile} isOpen={isAccountMenuOpen}/>
                </div>
            </nav>

            {isNavMenuOpen && <div className="lg:hidden fixed w-screen h-screen top-0 left-0 bg-primary-black/20 dark:bg-primary-black/90 backdrop-blur-xs z-98" onClick={() => setIsNavMenuOpen(false)}/>}

            <nav className={`${isNavMenuOpen ? "fixed top-0 left-0 z-99" : "not-lg:hidden"} h-screen w-78 min-w-78 shrink-0 lg:static flex flex-col gap-10 p-6 bg-primary-white dark:bg-primary-black shadow-lg shadow-primary-black/10`}>
                <div className="flex w-full items-center justify-between lg:block">
                    <Link
                        href="/dashboard"
                        className="group flex items-center cursor-pointer"
                    >
                        <div className="transition-transform duration-300 active:scale-95 group-hover:scale-105">
                            {Logo}
                        </div>
                    </Link>
                    <button
                        className="lg:hidden p-2 rounded-full transition-all hover:shadow-sm text-secondary-gray hover:text-secondary-black hover:dark:text-primary-white dark:hover:bg-muted-gray/20 dark:outline dark:outline-transparent dark:hover:outline-muted-gray/40"
                        onClick={() => setIsNavMenuOpen(false)}
                    >
                        <div className="flex justify-center items-center size-6">
                            {CloseIcon}
                        </div>
                    </button>
                </div>
                <div className="h-full w-full flex flex-col justify-between">
                    <div className="w-full flex flex-col gap-1">
                        {NavBarButtons.map(item => (
                            <NavButton key={"navbutton-"+item.text.toLowerCase()} href={item.href} text={t(item.text)} icon={item.icon} hasSubpages={item.hasSubpages}/>
                        ))}
                    </div>
                    <div className="hidden w-full lg:flex flex-col">
                        <div className="relative h-full">
                            <div className="absolute bottom-2 -left-6">
                                <AccountMenu ref={accountMenuRefDesktop} isOpen={isAccountMenuOpen}/>
                            </div>
                        </div>
                        <div className="w-full">
                            <button
                                ref={accountMenuButtonRefDesktop}
                                className="flex items-center gap-4 p-2 rounded-2xl hover:bg-secondary-white/40 dark:hover:bg-secondary-white/10 w-full"
                                onClick={toggleAccountMenu}
                            >
                                <div className="size-10 rounded-full bg-white shrink-0"/>

                                <div className="flex flex-col justify-start min-w-0 flex-1">
                                    <h2 className="text-primary-black dark:text-primary-white text-start truncate font-normal">
                                        Kamil Sadowski
                                    </h2>
                                    <p className="text-secondary-black dark:text-secondary-white text-sm font-light text-start truncate opacity-60">
                                        shadxw.kontakt@gmail.com
                                    </p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}