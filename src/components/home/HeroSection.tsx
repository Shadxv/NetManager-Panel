'use client'
import { useTranslations } from "next-intl";
import { Image} from "next/dist/client/image-component";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";


export const HeroSection = () => {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from(".element", {
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "back.out(1.2)",
            stagger: 0.2,
        });
    }, { scope: container });


    const t = useTranslations("HeroSection");
    return (
        <section ref={container} id="hero" className="h-screen overflow-hidden">
            <div className="p-4 md:px-16 space-y-2 md:w-3/5 lg:w-1/2 h-full justify-center flex flex-col">
                <h1 className="element text-primary-white text-3xl md:text-4xl lg:text-6xl font-semibold">{t("titlePrefix1")} {t("title")}</h1>
                <p className="element text-secondary-gray text-sm md:text-lg font-light">{t("description")}</p>
                <div className="element">
                    <button className="bg-accent rounded-full p-2 px-6 text-primary-white font-semibold hover:text-accent hover:bg-primary-white hover:shadow-primary-white/50 hover:shadow-md mt-4 transition">Go to dashboard</button>
                </div>
            </div>
            <div className="relative -z-10">
                <div className="absolute w-[800] h-[800] right-[-300] bottom-[-300] md:w-[1100] md:h-[1100] md:right-[-450] md:bottom-[-500] lg:w-350 lg:h-350 lg:right-[-300] lg:bottom-[-500] rounded-full bg-[radial-gradient(circle,var(--color-accent)_0%,transparent_80%)] opacity-20 blur-3xl pointer-events-none"/>
                <Image src={"/logo.svg"} alt="logo" width="900" height="900"
                        className="element absolute -z-5 right-[-100] bottom-[-100] md:right-[-250] md:bottom-[-250] lg:right-[-250] lg:bottom-[-250] opacity-50"/>
            </div>
        </section>
    )
}