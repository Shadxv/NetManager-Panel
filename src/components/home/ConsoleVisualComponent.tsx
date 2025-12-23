'use client'

import {BaseView} from "@/components/home/VisualComponents";
import React, {useRef} from "react";
import {gsap} from "gsap";
import {useGSAP} from "@gsap/react";

export const ConsoleVisualComponent = () => {
    const container = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const lines = gsap.utils.toArray<HTMLElement>(".console-line");

        const tl = gsap.timeline({
            repeat: -1,
            repeatDelay: 2.5,
            scrollTrigger: {
                trigger: container.current,
                start: "top 90%",
                toggleActions: "play pause resume pause"
            }
        });

        tl.to(lines, {
            opacity: 1,
            duration: 0.1,
            stagger: 0.4,
            ease: "none"
        });

        tl.to(lines, {
            opacity: 0,
            duration: 0.3,
            delay: 1.5
        });

    }, { scope: container });

    return (
        <div ref={container} className="w-full h-full">
            <BaseView activeTile={2} content={(
                <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-2">
                    <span className="bg-primary-black rounded-xl aspect-5/1 sm:aspect-4/1 w-1/6 mb-1 sm:mb-2"/>
                    {ConsoleView()}
                </div>
            )}/>
        </div>
    )
}

const ConsoleView = () => {
    const linesSchema = [
        { segments: [0.15, 0.4], type: 1 },
        { segments: [0.9], type: 0 },
        { segments: [0.2, 0.6], type: 2 },
        { segments: [0.3, 0.2, 0.3], type: 0 },
        { segments: [0.2, 0.5], type: 3 },
        { segments: [0.7], type: 0 },
        { segments: [0.15, 0.3], type: 1 },
        { segments: [0.85], type: 0 },
        { segments: [0.2, 0.4], type: 2 },
        { segments: [0.4, 0.2], type: 0 },
        { segments: [0.9], type: 0 },
        { segments: [0.2, 0.55], type: 3 },
        { segments: [0.5, 0.1], type: 0 },
        { segments: [0.15, 0.2], type: 1 },
    ];

    const getColors = (type: number, isFirst: boolean) => {
        if (!isFirst) return "bg-primary-white/30";
        switch (type) {
            case 1: return "bg-accent/50";
            case 2: return "bg-green-500/50";
            case 3: return "bg-red-500/50";
            default: return "bg-white/20";
        }
    };

    return (
        <div className="w-full h-full p-2 sm:p-4 pl-0 sm:pl-0">
            <div className="bg-secondary-black w-full h-full rounded-xl flex flex-col overflow-hidden p-3 gap-2 sm:gap-2.5 shadow-inner">
                <div className="flex flex-col gap-2 sm:gap-3 overflow-hidden">
                    {linesSchema.map((line, i) => (
                        <div key={i} className="console-line flex gap-2 h-1 sm:h-1.5 shrink-0 opacity-0">
                            {line.segments.map((width, j) => (
                                <div
                                    key={j}
                                    style={{ width: `${width * 100}%` }}
                                    className={`h-full rounded-full ${getColors(line.type, j === 0)}`}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};