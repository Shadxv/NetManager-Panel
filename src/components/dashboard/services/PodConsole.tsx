'use client'
import { useRef, useLayoutEffect } from "react";
import { ArrowDownIcon } from "@/components/icons";
import {getLogStyle} from "@/utils";

interface PodConsoleProps {
    logs: string[];
    shouldAutoScroll: boolean;
    setShouldAutoScroll: (val: boolean) => void;
}

export const PodConsole = ({ logs, shouldAutoScroll, setShouldAutoScroll }: PodConsoleProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        if (!scrollRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 100;
        setShouldAutoScroll(isAtBottom);
    };

    useLayoutEffect(() => {
        if (shouldAutoScroll && scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [logs.length, shouldAutoScroll]);

    const scrollToBottom = () => {
        setShouldAutoScroll(true);
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    };

    return (
        <div className="w-full h-144 bg-primary-black border-2 border-primary-gray/20 rounded-2xl p-2 flex flex-col overflow-hidden shadow-2xl relative group">
            <div className="absolute top-0 left-0 right-0 h-12 bg-linear-to-b from-primary-black to-transparent z-10 pointer-events-none opacity-50" />
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 overflow-y-auto font-mono text-xs p-3 scrollbar-thin scrollbar-thumb-primary-gray/20 scrollbar-track-transparent selection:bg-accent scroll-smooth"
            >
                {logs.map((log, index) => (
                    <div key={index} className="flex gap-3 py-0.5 group leading-relaxed">
                        <span className={`${getLogStyle(log)} break-all`}>{log}</span>
                    </div>
                ))}
                <div className="h-4" />
            </div>
            {!shouldAutoScroll && (
                <button onClick={scrollToBottom} className="absolute bottom-4 left-1/2 -translate-x-1/2 size-10 rounded-full bg-accent text-white shadow-lg shadow-accent/20 flex items-center justify-center hover:scale-105 active:scale-95 cursor-pointer transition-all z-20">
                    <div className="size-6">{ArrowDownIcon}</div>
                </button>
            )}
        </div>
    );
};