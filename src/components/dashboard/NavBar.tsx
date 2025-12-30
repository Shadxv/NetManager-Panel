'use client'

import Link from "next/dist/client/link";
import {NavBarButtons} from "@/constants";
import {NavButton} from "@/components/dashboard";
import {useEffect, useRef, useState} from "react";

export const NavBar = () => {

    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isMenuOpen &&
                menuRef.current && !menuRef.current.contains(event.target as Node) &&
                buttonRef.current && !buttonRef.current.contains(event.target as Node)
            ) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMenuOpen]);

    return (
        <nav className="h-full flex flex-col gap-10 p-6">
            <Link
                href="/dashboard"
                className="group flex items-center cursor-pointer"
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
                    <span className="ml-3 font-bold text-primary-black dark:text-primary-white tracking-tighter text-xl">NET<span className="text-accent">Manager</span></span>
                </div>
            </Link>
            <div className="h-full flex flex-col justify-between">
                <div className="w-full flex flex-col gap-1">
                    {NavBarButtons.map(item => (
                        <NavButton key={"navbutton-"+item.text.toLowerCase()} href={item.href} text={item.text} icon={item.icon}/>
                    ))}
                </div>
                <div className="relative h-full">
                    <div className="absolute bottom-2 -left-6">
                        {/*<AccountMenu ref={menuRef} isOpen={isMenuOpen}/>*/}
                    </div>
                </div>
                <button ref={buttonRef} className="flex items-center gap-4 p-2 rounded-2xl hover:bg-secondary-white/40 dark:hover:bg-secondary-white/10" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className="size-10 rounded-full bg-white"/>
                    <div className="flex flex-col justify-start">
                        <h2 className="text-primary-black dark:text-primary-white text-start">Kamil Sadowski</h2>
                        <p className="text-secondary-black dark:text-secondary-white text-sm font-light text-start">shadxw.kontakt@gmail.com</p>
                    </div>
                </button>
            </div>
        </nav>
    )
}