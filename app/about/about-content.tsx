"use client";

import Image from "next/image";
import { useState } from "react";

const facts = [
  ["Manufacturing Base", "100,000+ m²"], ["Skilled Personnel", "700+"],
  ["Global Reach", "75+ Countries"], ["Intellectual Property", "600+"],
  ["Invention Patents", "70+"], ["Customized Service", "60+"],
];

const milestones = [
  ["1997", "Founding of Relations."],
  ["1998", "Designed China’s first integrated hydrogen-generator solution."],
  ["1999", "Certified as a High-Tech Enterprise."],
  ["2000", "Introduced China’s first backpack-type dew point analyzer."],
  ["2004", "Achieved ISO 9001:2000 certification; the RS-301 Thermal Conductivity Gas Analyzer entered China’s Innovation Fund."],
  ["2006", "Pioneered China’s first hydrogen-control device and established the Henan Province Engineering Research Center of Intelligent Instrumentation."],
  ["2008", "Launched China’s first nuclear-hydrogen leakage instrument and received a national Innofund project for the Intelligent SF6 Gas Sensor."],
  ["2010", "Established an Academician Workstation."],
  ["2011", "Recognized as a Henan Provincial Innovative Enterprise and established a Postdoctoral R&D Base."],
  ["2012", "Undertook a project under China’s National High-tech R&D Program (863 Program)."],
  ["2013", "Launched SF6/CF4 mixed-gas recovery and purification equipment."],
  ["2014", "Pioneered underground-substation SF6 leak warning and recovery equipment."],
  ["2015", "Listed on China’s National Equities Exchange and Quotations (NEEQ)."],
  ["2017", "Introduced an IoT emergency response system for SF6 leakage; the calibration and testing laboratory gained CNAS accreditation."],
  ["2019", "Introduced an SF6 gas lifecycle solution for State Grid applications."],
  ["2021", "Undertook a National Key R&D Program project on silicon-based gas-sensitive thin films and industrialisation technologies."],
  ["2022", "Delivered the world’s first SF6 Gas Service Workstation."],
];

const tabs = ["Facts", "Milestones", "Honors & Qualifications"] as const;
type Tab = (typeof tabs)[number];

export function AboutContent() {
  const [activeTab, setActiveTab] = useState<Tab>("Facts");
  return <>
    <section className="mx-auto max-w-[1540px] px-5 pb-12 pt-6 sm:px-8 lg:pb-16 lg:pt-9">
      <div className="relative aspect-[2341/671] min-h-[265px] overflow-hidden rounded-sm bg-sky-100 shadow-sm">
        <Image src="/pics/about/sf6-equipment-manufacturer-factory.webp" alt="Relations SF6 equipment manufacturing campus and global service facilities" fill priority sizes="100vw" className="object-cover object-center" />
      </div>
    </section>

    <section className="mx-auto grid max-w-[1450px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.35fr_0.9fr] lg:items-center lg:gap-16 lg:pb-20">
      <div className="text-[15px] leading-7 text-slate-600">
        <p>We develop SF6 gas handling, analysis, leak detection, monitoring and gas-treatment equipment for utilities, GIS manufacturers and field service teams. From portable instruments to high-capacity recovery systems and integrated workstations, our products are designed around the actual tasks carried out during installation, maintenance, gas recovery and reuse.</p>
        <p className="mt-5">We combine equipment engineering, manufacturing and field application experience to make SF6 handling more controlled, measurable and practical. Our focus is simple: reliable equipment, clear operating logic and solutions that fit real service conditions.</p>
        <p className="mt-5">With products and solutions serving customers in more than 75 countries, Relations supports SF6 management across the equipment lifecycle—from leak detection and gas-quality assessment to recovery, treatment and return to service.</p>
        <blockquote className="mt-7 border-l-4 border-[#8bbb32] py-1 pl-6 text-[15px] italic text-slate-500">“Good SF6 management starts with knowing the gas condition, controlling every handling step and keeping unnecessary emissions to a minimum.”<footer className="mt-4 text-right text-xs not-italic text-slate-500">— Company Engineering Team</footer></blockquote>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-slate-100"><Image src="/pics/about/sf6-engineering-team.webp" alt="Relations SF6 engineering and manufacturing team" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" /></div>
    </section>

    <section className="border-y border-slate-200 bg-[#fbfcfd]">
      <div className="mx-auto max-w-[1450px] px-5 py-14 sm:px-8 lg:py-16">
        <div className="mb-10 flex justify-center overflow-x-auto"><div className="flex min-w-max gap-7 sm:gap-12">{tabs.map((tab) => <button key={tab} type="button" onClick={() => setActiveTab(tab)} className={`relative pb-3 text-xs font-bold uppercase tracking-[0.14em] transition-colors ${activeTab === tab ? "text-[#6f9e24]" : "text-slate-500 hover:text-[#003a79]"}`}>{tab}{activeTab === tab && <span className="absolute inset-x-0 bottom-0 h-0.5 bg-[#8bbb32]" />}</button>)}</div></div>

        {activeTab === "Facts" && <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{facts.map(([label, value]) => <article key={label} className="flex min-h-40 flex-col justify-between rounded-lg bg-[#0b4a92] p-7 text-white shadow-sm"><h2 className="max-w-[14ch] text-xl font-semibold leading-tight">{label}</h2><p className="mt-8 text-lg font-bold">{value}</p></article>)}</div>}
        {activeTab === "Milestones" && <div className="mx-auto max-w-5xl">{milestones.map(([year, description]) => <article key={year} className="grid grid-cols-[72px_1fr] gap-4 border-b border-slate-200 py-5 sm:grid-cols-[110px_1fr]"><p className="text-2xl font-bold text-[#0b4a92]">{year}</p><p className="leading-7 text-slate-600">{description}</p></article>)}</div>}
        {activeTab === "Honors & Qualifications" && <div className="space-y-14"><CertificateGrid title="Company Honors" folder="honors" prefix="sf6-company-honor" /><CertificateGrid title="Enterprise Qualifications" folder="qualifications" prefix="sf6-company-qualification" /></div>}
      </div>
    </section>
  </>;
}

function CertificateGrid({ title, folder, prefix }: { title: string; folder: string; prefix: string }) {
  return <div><h2 className="mb-7 text-center text-2xl font-bold text-[#002c6c] sm:text-3xl">{title}</h2><div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">{Array.from({ length: 8 }, (_, index) => <div key={index} className="relative aspect-square overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm"><Image src={`/pics/about/${folder}/${prefix}-${index + 1}.webp`} alt={`${title} certificate ${index + 1}`} fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-contain p-2" /></div>)}</div></div>;
}
