import React from "react";
import {useTranslations} from "next-intl";

interface HomeSectionProp {
    id: string
    visual: React.ReactNode
    rightSideImage: boolean
}

export const HomeSection = ({id, visual, rightSideImage}: HomeSectionProp) => {
    const t = useTranslations("HomeSections")
    return (
        <section id={id} className={`overflow-hidden p-4 md:px-16 py-20 lg:py-40 md:pb-40 lg:flex ${!rightSideImage ? "lg:flex-row-reverse" : "lg:flex-row"} lg:items-center lg:gap-20`}>
            <div className="py-20 lg:py-0 px-6 flex justify-center lg:w-1/2">
                <div className="rounded-2xl aspect-16/11 w-full md:max-w-5/6 overflow-hidden shadow-md shadow-black">
                    {visual}
                </div>
            </div>
            <div className="flex flex-col gap-2 lg:gap-6 lg:w-1/2">
                <h1 className=" text-primary-white text-3xl md:text-4xl lg:text-6xl font-semibold">{t(id+"Title")}</h1>
                <p className="text-secondary-gray text-sm md:text-lg font-light">{t(id+"Description")}</p>
            </div>
        </section>
    )
}