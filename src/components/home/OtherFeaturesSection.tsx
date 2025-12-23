'use client'
import {useTranslations} from "next-intl";
import {
    DatabaseVisual,
    DeploymentVisual,
    FeatureCard,
    FileManagerCardVisual,
    PermissionsVisual,
    SupportsTechnologyTile
} from "@/components";
import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {gsap} from "gsap";

export const OtherFeaturesSection = () => {
    const container = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".feature-card");

        gsap.set(cards, { y: 50, opacity: 0 });

        ScrollTrigger.batch(cards, {
            onEnter: (batch) => {
                gsap.to(batch, {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "back.out(1.2)",
                    stagger: 0.2,
                });
            },
            start: "top 95%",
            once: true
        });
    }, { scope: container });

    const t = useTranslations("HomeSections")

    return (
        <section ref={container} id="other" className="w-full p-8 md:px-16 py-20 lg:py-40 md:pb-40">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 sm:gap-8 lg:gap-8">
                <div className="feature-card opacity-0 will-change-transform"><FeatureCard id="files" visual={FileManagerCardVisual()}/></div>
                <div className="feature-card opacity-0 will-change-transform"><FeatureCard id="database" visual={DatabaseVisual()} technologies={[SupportsTechnologyTile({name: "MongoDB", borderColor: "border-[#12AA53]", image: "/mongodb-logo.svg"})]}/></div>
                <div className="feature-card opacity-0 will-change-transform"><FeatureCard id="roles" visual={PermissionsVisual()}/></div>
                <div className="feature-card opacity-0 will-change-transform lg:col-start-2">
                    <FeatureCard id="setup" visual={DeploymentVisual()} technologies={[
                        SupportsTechnologyTile({name: "Velocity", borderColor: "border-[#ffffff]", image: "/velocity-logo.svg"}),
                        SupportsTechnologyTile({name: "PaperMC", borderColor: "border-[#FD5057]", image: "/papermc-logo.svg"})
                    ]}/>
                </div>
            </div>
        </section>
    )
}