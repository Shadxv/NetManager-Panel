import {HeroSection, HomeSection, ManagementVisualComponent} from "@/components";

export default function Home() {
  return (
      <main className="[&>section:nth-child(even)]:bg-secondary-black">
          <HeroSection/>
          <HomeSection id="manage" visual={ManagementVisualComponent()} rightSideImage={true}/>
          <HomeSection id="console" visual={<div className="w-full h-full bg-primary-white"/>} rightSideImage={false}/>
      </main>
  );
}
