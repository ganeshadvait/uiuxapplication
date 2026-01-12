"use client";
import { useState } from "react";

import PinnedImageReveal from "@/components/pinnedImageReveal";
import { EthicalHero } from "@/components/herosections";
import Tabs from "@/components/tabs";
import Pricing from "@/components/pricing-base";
import { FrequencyCircle } from "@/components/FrequencyCircle";
import Button from "@/components/Header/button";
import RadialScrollGalleryExample from "@/components/RadialScrollGallery";

export default function PortfolioPage({
  isActiveProp,
}: {
  isActiveProp?: boolean;
}) {
  const [isActive, setIsActive] = useState(false);

  const heroData = {
    title: (
      <>
        Invest in companies
        <br />
        and industries that share your{" "}
        <span className="text-primary">ethical values.</span>
      </>
    ),
    subtitle:
      "GOODFOLIO is a simple and transparent investment platform designed for experienced and aspiring socially responsible investors.",
    ctaLabel: "Join the waitlist",
    ctaHref: "#",
    features: [
      {
        id: "deforestation",
        title: "Fight deforestation",
        imageUrl:
          "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=800&auto=format&fit=crop",
        href: "#",
      },
      {
        id: "ocean-health",
        title: "Invest in ocean health",
        imageUrl:
          "https://images.unsplash.com/photo-1503756234508-e32369269deb?q=80&w=800&auto=format&fit=crop",
        href: "#",
      },
      {
        id: "animal-welfare",
        title: "Support animal welfare",
        imageUrl:
          "https://images.unsplash.com/photo-1534759846116-5799c33ce22a?q=80&w=800&auto=format&fit=crop",
        href: "#",
      },
    ],
  };
  return (
    <>
      <EthicalHero
        title={heroData.title}
        subtitle={heroData.subtitle}
        ctaLabel={heroData.ctaLabel}
        ctaHref={heroData.ctaHref}
        features={heroData.features}
      />

      <Tabs />
      <PinnedImageReveal />
    

      <RadialScrollGalleryExample />
      <FrequencyCircle />
      <Pricing />
    </>
  );
}
