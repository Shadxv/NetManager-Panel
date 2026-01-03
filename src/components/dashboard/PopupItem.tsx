'use client'

import { useEffect, useRef } from 'react';
import { useAppDispatch } from '@lib/hooks';
import {removePopup, PopupType, Popup} from '@lib/features/popupSlice';
import { CloseIcon, ErrorIcon, SuccessIcon } from "@/components/icons";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {useTranslations} from "next-intl";

export const PopupItem = ({ id, type, message, params }: Popup) => {
    const dispatch = useAppDispatch();
    const containerRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Popups")

    const handleClose = () => {
        gsap.to(containerRef.current, {
            opacity: 0,
            scale: 0.9,
            x: 20,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                dispatch(removePopup(id));
            }
        });
    };

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.from(containerRef.current, {
            y: -50,
            opacity: 0,
            scale: 0.9,
            duration: 0.4,
            ease: "back.out(1.7)"
        });

        tl.to(progressBarRef.current, {
            width: "0%",
            duration: 10,
            ease: "linear",
            onComplete: () => handleClose()
        });
    }, { scope: containerRef });

    const styles = {
        success: "bg-green-primary text-primary-white",
        error: "bg-red-primary text-primary-white"
    };

    return (
        <div
            ref={containerRef}
            className={`
                relative w-full sm:w-96 flex items-center gap-3 p-4 pr-10 rounded-2xl 
                shadow-2xl overflow-hidden ${styles[type]}
            `}
        >
            <div className="shrink-0">
                {type === 'success' ?
                    <div className="size-5 fill-primary-white">{SuccessIcon}</div> :
                    <div className="size-5 fill-primary-white">{ErrorIcon}</div>
                }
            </div>

            <p className="flex-1 text-sm font-medium leading-tight tracking-wide">
                {t(message, params)}
            </p>

            <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
                <div className="size-3 fill-primary-white">{CloseIcon}</div>
            </button>

            <div className="absolute bottom-0 left-0 h-1 w-full bg-black/15">
                <div
                    ref={progressBarRef}
                    className="h-full bg-primary-white/50 w-full"
                />
            </div>
        </div>
    );
};