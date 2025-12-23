import {BaseView, ServiceTile} from "@/components/home/VisualComponents";
import React from "react";

export const ManagementVisualComponent = () => {
    return (<BaseView activeTile={1} content={(
        <div className="w-full h-full p-4 sm:p-6 flex flex-col gap-2">
            <span className="bg-primary-black rounded-xl aspect-5/1 sm:aspect-4/1 w-1/6 mb-1 sm:mb-2 lg:mb-4"/>
            {Array.from({ length: 6 }).map((_, index) => (
                <ServiceTile key={index} active={index != 2}/>
            ))}
        </div>
    )}/>)
}