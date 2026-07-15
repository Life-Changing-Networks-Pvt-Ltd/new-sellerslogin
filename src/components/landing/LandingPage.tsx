import { GlobalBackground } from "./GlobalBackground";

import { HeroSection } from "./HeroSection";
import { Navbar } from "./Navbar";
import { NeedHelpButton } from "./NeedHelpButton";
import { ScrollRevealInit } from "./ScrollRevealInit";
import { TrustedMarquee } from "./TrustedMarquee";
import { DeferredLandingSections } from "./DeferredLandingSections";

export function LandingPage() {
  return (
    <>
      <GlobalBackground />
      <ScrollRevealInit />
      <Navbar />
      <NeedHelpButton />
      <HeroSection />
      <TrustedMarquee />
      <DeferredLandingSections />
    </>
  );
}
