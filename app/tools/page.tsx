import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, Clock3, FileSearch, SearchCheck, Sparkles } from "lucide-react";
import { PublicShell } from "@/components/public-shell";
import { Reveal, Stagger, StaggerItem } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site, toolItems } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Use Zigo Digital tools for SEO audits, lead funnel checks, content planning, and digital growth analysis.",
  alternates: {
    canonical: absoluteUrl("/tools"),
  },
  openGraph: {
    title: "Zigo Digital Tools",
    description:
      "Free digital growth tools for SEO audits, lead funnel checks, content planning, and practical marketing decisions.",
    url: absoluteUrl("/tools"),
    type: "website",
    images: [site.logo],
  },
};

const toolIcons = [SearchCheck, FileSearch, Sparkles];

export default function ToolsPage() {
  const toolsJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Zigo Digital Tools",
    description: metadata.description,
    url: absoluteUrl("/tools"),
    mainEntity: toolItems.map((tool) => ({
      "@type": "SoftwareApplication",
      name: tool.label,
      description: tool.description,
      applicationCategory: "BusinessApplication",
      url: absoluteUrl(tool.href),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
      },
    })),
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }} />
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Tools"
              title="Growth tools that turn confusion into clear next steps."
              text="Start with a complete SEO audit report or lead funnel check today. More tools for content planning, AI workflows, and marketing decisions will be added here."
              align="center"
              level="h1"
            />
          </Reveal>

          <Stagger className="mt-12 grid gap-6 lg:grid-cols-3">
            {toolItems.map((tool, index) => {
              const Icon = toolIcons[index] || SearchCheck;
              const live = tool.status === "Live";

              return (
                <StaggerItem key={tool.label}>
                  <Link
                    href={tool.href}
                    className="group flex h-full min-h-[22rem] flex-col justify-between overflow-hidden rounded-lg border border-[#d9e7f5] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0b5f9c]/10"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c] transition group-hover:bg-[#0b5f9c] group-hover:text-white">
                          <Icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f6faff] px-3 py-1 text-xs font-black uppercase text-[#0b5f9c]">
                          {live ? <BadgeCheck className="h-3.5 w-3.5 text-[#0fa968]" aria-hidden="true" /> : <Clock3 className="h-3.5 w-3.5 text-[#c2932e]" aria-hidden="true" />}
                          {tool.status}
                        </span>
                      </div>

                      <p className="mt-7 text-sm font-black uppercase text-[#c2932e]">Zigo Tool {String(index + 1).padStart(2, "0")}</p>
                      <h2 className="mt-3 text-3xl font-black leading-tight text-[#0b2447]">{tool.label}</h2>
                      <p className="mt-4 text-base leading-7 text-[#526170]">{tool.description}</p>
                    </div>

                    <span className="mt-8 inline-flex items-center gap-2 text-sm font-black text-[#0b5f9c]">
                      {live ? "Open Tool" : "View Roadmap"}
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>
    </PublicShell>
  );
}
