'use client'

import {
    ConsoleVisualComponent,
    HeroSection, HomeNavBar,
    HomeSection,
    ManagementVisualComponent,
    OtherFeaturesSection
} from "@/components";
import {useEffect} from "react";

export default function Home() {

    return (
        <main>
            <HomeNavBar/>
            <div className="[&>section:nth-child(even)]:bg-secondary-black">
                <HeroSection/>
                <HomeSection id="manage" visual={<ManagementVisualComponent />} rightSideImage={true}/>
                <HomeSection id="console" visual={<ConsoleVisualComponent />} rightSideImage={false}/>
                <OtherFeaturesSection/>
            </div>
            <style>{`
            body { 
                background-color: var(--color-primary-black) !important;
            }
            `}</style>
        </main>
    );
}
