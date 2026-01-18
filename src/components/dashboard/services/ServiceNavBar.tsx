'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { useRouter, usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { gsap } from 'gsap';
import { Flip } from "gsap/all";
import { SERVICE_SECTIONS } from "@/constants";

export const ServiceNavBar = () => {
    const t = useTranslations('Services');
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    const containerRef = useRef<HTMLUListElement>(null);
    const highlighterRef = useRef<HTMLDivElement>(null);
    const [isReady, setIsReady] = useState(false);

    const serviceId = params.id;
    const basePath = `/dashboard/services/${serviceId}`;

    const activeSection = [...SERVICE_SECTIONS]
        .sort((a, b) => b.href.length - a.href.length)
        .find(section => {
            const fullHref = `${basePath}${section.href}`;
            return pathname === fullHref || pathname.startsWith(`${fullHref}/`);
        });

    useLayoutEffect(() => {
        if (!containerRef.current || !highlighterRef.current) return;

        const activeBtn = containerRef.current.querySelector(`[data-active="true"]`);
        if (!activeBtn) return;

        const state = Flip.getState(highlighterRef.current);
        activeBtn.appendChild(highlighterRef.current);

        if (!isReady) {
            requestAnimationFrame(() => {
                gsap.set(highlighterRef.current, { clearProps: "all" });
                setIsReady(true);
            });
        } else {
            Flip.from(state, {
                duration: 0.4,
                ease: "power2.out",
                absolute: true
            });
        }
    }, [pathname, isReady, activeSection?.id]);

    return (
        <nav className="w-full">
            <ul
                ref={containerRef}
                className="flex flex-wrap gap-2 w-full p-1.5 rounded-lg md:rounded-xl lg:rounded-2xl bg-muted-white/20 dark:bg-primary-black/20 shadow-inner border border-muted-white/10 dark:border-muted-gray/20 relative"
            >
                {SERVICE_SECTIONS.map((section) => {
                    const fullHref = `${basePath}${section.href}`;
                    const isActive = activeSection?.id === section.id;

                    return (
                        <li
                            key={section.id}
                            className="flex-1 min-w-30 relative"
                            data-active={isActive}
                        >
                            <button
                                onClick={() => router.push(fullHref)}
                                className={`
                                    relative z-10 w-full px-4 py-2 rounded-md md:rounded-lg lg:rounded-xl text-sm font-light transition-all duration-300
                                    truncate
                                    ${isActive
                                    ? 'text-white font-normal'
                                    : 'text-muted-gray hover:text-primary-black dark:text-muted-white dark:hover:text-primary-white hover:bg-muted-white/80 dark:hover:bg-muted-gray/40 cursor-pointer'
                                }
                                `}
                            >
                                {t(section.id)}
                            </button>
                        </li>
                    );
                })}

                <div
                    ref={highlighterRef}
                    className={`
                        absolute inset-0 z-0 rounded-md md:rounded-lg lg:rounded-xl
                        bg-accent shadow-md shadow-accent/20
                        pointer-events-none
                        ${!isReady ? 'opacity-0' : 'opacity-100'}
                    `}
                />
            </ul>
        </nav>
    );
};