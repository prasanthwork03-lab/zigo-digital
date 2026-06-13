import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PublicShell } from "@/components/public-shell";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { site } from "@/lib/site-data";
import { whatsappLink } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Zigo Digital for a free consultation about ads, websites, automation, SEO, content, and sales funnels.",
};

export default function ContactPage() {
  return (
    <PublicShell>
      <section className="mesh-bg px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Contact"
              title="Ready to Grow Your Business Online?"
              text="Let us build your digital growth system with content, ads, website, automation, and sales strategy."
              level="h1"
            />
            <div className="mt-8 grid gap-4">
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-4 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm hover:border-[#0b5f9c]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c]">
                  <Phone className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#526170]">Phone</span>
                  <span className="block text-base font-black text-[#0b2447]">{site.phone}</span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="flex items-center gap-4 rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm hover:border-[#0b5f9c]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#fff5db] text-[#c2932e]">
                  <Mail className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-sm font-bold text-[#526170]">Email</span>
                  <span className="block text-base font-black text-[#0b2447]">{site.email}</span>
                </span>
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-full bg-[#1f9f5f] px-6 text-sm font-bold text-white hover:bg-[#17834e]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-xl shadow-[#0b2447]/8 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </PublicShell>
  );
}
