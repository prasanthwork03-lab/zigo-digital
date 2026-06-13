import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Target, Telescope } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { processSteps, site } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn how Zigo Digital builds complete digital growth systems with strategy, content, ads, websites, automation, and sales support.",
};

const reasons = [
  "Complete growth strategy under one roof",
  "Founder-led communication and planning",
  "Performance-focused campaigns and content",
  "Conversion-ready websites and lead paths",
  "Automation for faster follow-up",
  "Premium creative direction for stronger trust",
];

export default function AboutPage() {
  return (
    <PublicShell>
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="About Zigo Digital"
              title="Your complete digital growth partner, from content to conversion."
              text="Zigo Digital helps businesses build a stronger online presence through strategy, creative content, performance ads, websites, automation, and sales-focused digital systems."
              level="h1"
            />
            <p className="mt-6 max-w-3xl text-base leading-7 text-[#526170]">
              We do not just post content or run ads. We design connected systems that attract the right audience,
              generate quality enquiries, improve brand trust, and help your business grow consistently.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-6 text-sm font-bold text-white hover:bg-[#0b2447]"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex h-12 items-center justify-center rounded-full border border-[#c6d7e8] bg-white px-6 text-sm font-bold text-[#0b2447] hover:border-[#0b5f9c] hover:text-[#0b5f9c]"
              >
                Explore Services
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-[#d9e7f5] bg-white p-6 shadow-sm">
                <Target className="h-8 w-8 text-[#0b5f9c]" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-black text-[#0b2447]">Mission</h2>
                <p className="mt-3 text-sm leading-6 text-[#526170]">
                  Help businesses turn online presence into measurable enquiries, trust, and sales conversations.
                </p>
              </div>
              <div className="rounded-lg border border-[#d9e7f5] bg-white p-6 shadow-sm">
                <Telescope className="h-8 w-8 text-[#c2932e]" aria-hidden="true" />
                <h2 className="mt-5 text-xl font-black text-[#0b2447]">Vision</h2>
                <p className="mt-3 text-sm leading-6 text-[#526170]">
                  Become the growth team brands trust for content, ads, websites, automation, and follow-up systems.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <Reveal>
            <div className="overflow-hidden rounded-lg border border-[#d9e7f5] bg-white p-3 shadow-xl shadow-[#0b2447]/8">
              <Image
                src={site.founderImage}
                alt="Prasanth M, Founder of Zigo Digital"
                width={1140}
                height={1240}
                className="aspect-[4/5] w-full rounded-lg object-cover object-top"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <SectionHeading
              eyebrow="Founder"
              title="Prasanth M"
              text="Founder, Zigo Digital"
            />
            <p className="mt-6 text-base leading-7 text-[#526170]">
              Prasanth M is an MBA graduate with 3 years of digital marketing experience across various business
              domains. With strong practical knowledge in performance marketing, lead generation, content planning,
              website strategy, and client communication, he founded Zigo Digital to help businesses grow with
              result-oriented digital systems.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Performance marketing",
                "Lead generation",
                "Content planning",
                "Website strategy",
                "Client communication",
                "Digital growth systems",
              ].map((skill) => (
                <div key={skill} className="flex items-center gap-3 rounded-lg bg-[#f6faff] p-3 text-sm font-bold text-[#0b2447]">
                  <CheckCircle2 className="h-4 w-4 text-[#0b5f9c]" aria-hidden="true" />
                  {skill}
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f4f8fb] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Built for businesses that need momentum, not scattered marketing tasks."
            text="Zigo Digital keeps strategy, creative, media, website, automation, and follow-up connected so your growth work has one direction."
          />
          <Stagger className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {reasons.map((reason) => (
              <StaggerItem key={reason}>
                <div className="flex h-full items-start gap-3 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0b5f9c]" aria-hidden="true" />
                  <p className="text-sm font-bold leading-6 text-[#0b2447]">{reason}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="Process"
            title="A clean growth process from discovery to optimization."
            align="center"
          />
          <div className="mt-10 grid gap-4 md:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-5">
                <p className="text-sm font-black text-[#c2932e]">0{index + 1}</p>
                <h2 className="mt-3 text-xl font-black text-[#0b2447]">{step.title}</h2>
                <p className="mt-3 text-sm leading-6 text-[#526170]">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
