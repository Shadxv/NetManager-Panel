'use client'

import React from "react";

interface BubbleSwitchProp {
    leftOption: string | React.ReactNode
    rightOption: string | React.ReactNode
    //onClick: () => void
}

export const BubbleSwitch = ({leftOption, rightOption}: BubbleSwitchProp) => {
    return (
        <button onClick={() => {}} className="w-full h-full relative p-2 px-4 rounded-full bg-secondary-white dark:bg-muted-gray border border-muted-white shadow-md shadow-primary-black/30 dark:border-secondary-gray">
            <div className="flex justify-around gap-2 text-muted-gray dark:text-primary-white">
                <div>{leftOption}</div>
                <div>{rightOption}</div>
            </div>
            <div className="absolute top-0 right-1.5 w-1/2 h-full py-1.5">
                <div className="w-full h-full bg-secondary-gray rounded-full opacity-50"/>
            </div>
        </button>
    )
}