import type { Metadata } from "next";
import { SeoAuditTool } from "@/components/tools/seo-audit-tool";
import { PublicShell } from "@/components/public-shell";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site-data";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free SEO Audit Tool",
  description:
    "Run a free SEO audit and get a Zigo Digital branded report with technical SEO checks, content analysis, AEO readiness, and priority fixes.",
  alternates: {
    canonical: absoluteUrl("/tools/seo-audit"),
  },
  openGraph: {
    title: "Free SEO Audit Tool | Zigo Digital",
    description:
      "Analyze a website page for SEO, content, schema, links, AEO readiness, and conversion signals with a branded report.",
    url: absoluteUrl("/tools/seo-audit"),
    type: "website",
    images: [site.logo],
  },
};

export default function SeoAuditPage() {
  const toolJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Zigo Digital SEO Audit Tool",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: metadata.description,
    url: absoluteUrl("/tools/seo-audit"),
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
              eyebrow="SEO Audit Tool"
              title="Complete website analysis with a branded action report."
              text="Check the SEO basics, content strength, schema, internal links, image alt text, AI answer readiness, and conversion signals in one report."
              align="center"
              level="h1"
            />
          </Reveal>

          <div className="mt-10">
            <SeoAuditTool />
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
