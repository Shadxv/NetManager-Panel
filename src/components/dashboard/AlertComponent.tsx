'use client'

import {useRef, useEffect, useSyncExternalStore, cloneElement} from 'react';
import { createPortal } from 'react-dom';
import { ErrorIcon } from "@/components/icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface AlertProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description: string;
    type?: 'warning' | 'info';
    onProceed?: () => void;
    proceedLabel?: string;
    onSave?: () => void;
    saveLabel?: string;
    isSaving?: boolean;
}

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export const AlertComponent = (props: AlertProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useGSAP(() => {
        if (props.isOpen && isClient) {
            gsap.to(overlayRef.current, { opacity: 1, duration: 0.2 });
            gsap.fromTo(containerRef.current,
                { scale: 0.95, opacity: 0, y: 10 },
                { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, { dependencies: [props.isOpen, isClient] });

    if (!props.isOpen || !isClient) return null;

    return createPortal(
        <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
            <div
                ref={overlayRef}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0"
                onClick={props.onClose}
            />

            <div
                ref={containerRef}
                className="relative w-full max-w-md bg-secondary-white dark:bg-secondary-black rounded-3xl shadow-2xl p-8 flex flex-col items-center text-center gap-6"
            >
                <div className={`size-14 rounded-full flex items-center justify-center shrink-0 ${props.type === 'warning' ? 'bg-red-primary/10' : 'bg-accent/10'}`}>
                    <span className={`size-7 ${props.type === 'warning' ? 'text-red-primary' : 'text-accent'}`}>
                        {ErrorIcon}
                    </span>
                </div>

                <div className="space-y-2 text-center w-full">
                    <h2 className="text-primary-black dark:text-primary-white text-xl font-bold">{props.title}</h2>
                    <p className="text-muted-gray dark:text-muted-white/70 text-sm leading-relaxed">{props.description}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
                    {props.onProceed && (
                        <button
                            type="button"
                            onClick={props.onProceed}
                            className="flex-1 px-6 py-3 rounded-xl bg-red-primary text-white font-semibold order-2 sm:order-1 text-sm transition-all hover:brightness-110 active:scale-95 shadow-lg shadow-red-primary/20"
                        >
                            {props.proceedLabel}
                        </button>
                    )}
                    {props.onSave && (
                        <button
                            type="button"
                            onClick={props.onSave}
                            disabled={props.isSaving}
                            className="flex-1 px-6 py-3 rounded-xl bg-accent text-white font-semibold order-1 sm:order-2 text-sm flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95 disabled:opacity-50 shadow-lg shadow-accent/20"
                        >
                            {props.isSaving && <div className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                            {props.saveLabel}
                        </button>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};