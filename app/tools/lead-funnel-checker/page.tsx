import type { Metadata } from "next";
import { LeadFunnelChecker } from "@/components/tools/lead-funnel-checker";
import { PublicShell } from "@/components/public-shell";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Lead Funnel Checker",
  description:
    "Check your lead funnel and find missing steps between traffic, landing page, enquiry, follow-up, and sales.",
  alternates: {
    canonical: absoluteUrl("/tools/lead-funnel-checker"),
  },
  openGraph: {
    title: "Free Lead Funnel Checker | Zigo Digital",
    description:
      "Score your lead funnel and get a simple action plan for stronger enquiries and faster follow-up.",
    url: absoluteUrl("/tools/lead-funnel-checker"),
    type: "website",
    images: [site.logo],
  },
};

export default function LeadFunnelCheckerPage() {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zigo Digital Lead Funnel Checker",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: metadata.description,
    url: absoluteUrl("/tools/lead-funnel-checker"),
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: absoluteUrl(site.logo),
      email: site.email,
      telephone: site.phone,
      address: site.address,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
  };

  return (
    <PublicShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }} />
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <SectionHeading
              eyebrow="Lead Funnel Checker"
              title="Find the missing steps between traffic and enquiry."
              text="Use this lightweight checker to score your funnel, spot weak conversion points, and get a simple action plan before spending more on ads."
              align="center"
              level="h1"
            />
          </Reveal>

          <div className="mt-10">
            <LeadFunnelChecker />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
