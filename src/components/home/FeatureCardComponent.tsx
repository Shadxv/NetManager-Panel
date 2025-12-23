import {useTranslations} from "next-intl";
import React from "react";

interface FeatureCardProp {
    id: string
    visual: React.ReactNode
    technologies?: React.ReactNode[]
}

export const FeatureCard = ({id, visual, technologies} : FeatureCardProp) => {
    const t = useTranslations("HomeSections")
    return(
        <div className="overflow-hidden bg-primary-black shadow-md shadow-black/50 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col rounded-2xl h-full">
            <div className="aspect-16/10 w-full overflow-hidden relative">
                {visual}
            </div>

            <div className="p-6 md:p-10 py-10 sm:py-16 lg:py-20 flex flex-col gap-3 flex-1">
                <h1 className="text-primary-white font-semibold text-xl leading-tight">
                    {t(id + "Title")}
                </h1>
                <p className="text-secondary-gray font-light text-sm leading-relaxed">
                    {t(id + "Description")}
                </p>
                <div className="flex flex-row flex-wrap gap-4 pt-4">
                    {technologies && technologies.map((tech, index) => (
                        <div key={index}>
                            {tech}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}