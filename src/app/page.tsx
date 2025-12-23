'use client'

import {
    ConsoleVisualComponent,
    HeroSection,
    HomeSection,
    ManagementVisualComponent,
    OtherFeaturesSection
} from "@/components";

export default function Home() {
  return (
      <main className="[&>section:nth-child(even)]:bg-secondary-black">
          <HeroSection/>
          <HomeSection id="manage" visual={<ManagementVisualComponent />} rightSideImage={true}/>
          <HomeSection id="console" visual={<ConsoleVisualComponent />} rightSideImage={false}/>
          <OtherFeaturesSection/>
      </main>
  );
}
