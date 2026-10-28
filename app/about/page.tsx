import type { Metadata } from "next";
import Script from "next/script";
import { AboutContent } from "./about-content";
import { siteConfig } from "@/site.config";

export const metadata: Metadata = {
  title: `About ${siteConfig.brand.legalName} | SF6 Equipment Manufacturer`,
  description: "Discover Relations' SF6 gas equipment manufacturing capabilities, engineering team, global service footprint, company milestones, honors and qualifications.",
  alternates: { canonical: `${siteConfig.site_domain}/about` },
  openGraph: {
    title: `About ${siteConfig.brand.legalName}`,
    description: "Technology-driven SF6 gas handling, analysis, leak detection and regeneration solutions delivered worldwide.",
    images: [{ url: "/pics/about/sf6-equipment-manufacturer-factory.webp", width: 1920, height: 550 }],
  },
};

export default function AboutPage() {
  return <main className="bg-white">
    <Script id="about-schema" type="application/ld+json">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: `About ${siteConfig.brand.legalName}`,
      url: `${siteConfig.site_domain}/about`,
      mainEntity: {
        "@type": "Organization",
        name: siteConfig.brand.legalName,
        url: siteConfig.site_domain,
        logo: siteConfig.brand.logoUrl,
        foundingDate: "1997",
        numberOfEmployees: { "@type": "QuantitativeValue", minValue: 700 },
        areaServed: "Worldwide",
        email: siteConfig.contact.email,
        telephone: siteConfig.contact.phone,
      },
    })}</Script>
    <AboutContent />
  </main>;
}
