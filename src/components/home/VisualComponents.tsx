import React from "react";

export const BaseView = ( { activeTile, content } : { activeTile: number, content: React.ReactNode} ) => {
    return (
        <div className="w-full h-full bg-primary-white flex flex-row">
            <div className="w-1/18 h-full shadow-sm shadow-primary-black/30 flex flex-col p-1 gap-2 py-6">
                {Array.from({ length: 7 }).map((_, index) => (
                    <IconTile key={index} active={index == activeTile}/>
                ))}
            </div>
            {content}
        </div>
    )
}

export const IconTile = ( { active } : {active: boolean}) => {
    return (
        <div className={`${active ? "bg-accent" : "bg-secondary-gray"} w-full aspect-square sm:rounded md:rounded-sm lg:rounded-md`}/>
    )
}

export const ServiceTile = ( { active } : { active: boolean }) => {
    return (
        <div className="bg-white aspect-12/1 md:aspect-8/1 w-full rounded-md shadow-md shadow-primary-black/10 p-2 sm:p-4 flex flex-col gap-2 sm:gap-3">
            <div className="flex flex-row gap-1 sm:gap-2 items-center">
                <span className="bg-secondary-gray rounded-md aspect-6/1 w-1/6 opacity-30"/>
                <span className="relative flex size-1 sm:size-2">
                    <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${active ? "bg-green-500" : "bg-red-500"} opacity-50`}></span>
                    <span className={`relative inline-flex size-1 sm:size-2 rounded-full ${active ? "bg-green-500" : "bg-red-500"} animate-pulse`}></span>
                </span>
            </div>
            <span className="bg-secondary-gray rounded-md aspect-22/1 w-1/2 opacity-10"/>
        </div>
    )
}

interface TechnologyProp {
    name: string
    borderColor: string
    image: string
}

export const SupportsTechnologyTile = ({name, borderColor, image}: TechnologyProp) => {
    return (
        <div className={`rounded-full border-2 ${borderColor} p-1 px-3 text-primary-white text-sm font-light flex gap-2`}>
            <img src={image} alt="logo" className="inline size-5"/>
            {name}
        </div>
    )
}