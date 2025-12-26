'use client'

import React, {useState} from "react";

interface BubbleSwitchProp {
    leftOption: string;
    rightOption: string;
    currentOption: string;
    onClick: () => void;
}

export const BubbleSwitch = ({ leftOption, rightOption, currentOption, onClick }: BubbleSwitchProp) => {
    const [isLeftActive, setLeftActive] = useState(leftOption === currentOption)

    return (
        <div
            onClick={() => {
                onClick()
                setLeftActive(!isLeftActive)
            }}
            className="relative flex items-center p-1.5 rounded-full bg-primary-gray border border-muted-gray/30 w-full max-w-35 h-10 cursor-pointer select-none ml-auto"
        >
            <div
                className={`absolute w-[calc(50%-6px)] h-[calc(100%-12px)] bg-accent rounded-full transition-all duration-300 shadow-lg shadow-accent/20 ${
                    !isLeftActive ? 'translate-x-[calc(100%+0px)]' : 'translate-x-0'
                }`}
            />

            <div className="relative z-10 flex w-full justify-around text-[13px] font-bold uppercase tracking-wider">
                <span className={`transition-colors duration-300 ${isLeftActive ? 'text-primary-white' : 'text-secondary-gray'}`}>
                    {leftOption}
                </span>
                <span className={`transition-colors duration-300 ${!isLeftActive ? 'text-primary-white' : 'text-secondary-gray'}`}>
                    {rightOption}
                </span>
            </div>
        </div>
    )
}