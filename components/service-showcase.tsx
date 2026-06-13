"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  LineChart,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Route,
  Search,
  Share2,
  Sparkles,
  Target,
  Video,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Service } from "@/lib/types";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  LineChart,
  Megaphone,
  MonitorSmartphone,
  Palette,
  Route,
  Search,
  Share2,
  Video,
  Workflow,
};

type ServiceStory = {
  kicker: string;
  hook: string;
  promise: string;
  outcomes: string[];
  cta: string;
};

const serviceStories: Record<string, ServiceStory> = {
  "meta-ads": {
    kicker: "Lead engine",
    hook: "Stop boosting posts. Start building a trackable enquiry machine.",
    promise:
      "We connect audience, offer, creative, landing path, and follow-up so every rupee has a clear job.",
    outcomes: ["Sharper targeting", "Better enquiries", "Cleaner follow-up"],
    cta: "Build my lead engine",
  },
  "google-ads": {
    kicker: "Buyer intent",
    hook: "Be visible at the exact moment customers are already searching.",
    promise:
      "We shape search campaigns around service intent, calls, forms, and measurable conversion actions.",
    outcomes: ["High-intent clicks", "Conversion tracking", "Stronger ad copy"],
    cta: "Capture search demand",
  },
  "website-development": {
    kicker: "Trust builder",
    hook: "Turn your website into a premium first impression and enquiry path.",
    promise:
      "We build fast, mobile-first pages that make your services clear, credible, and easy to contact.",
    outcomes: ["Mobile-first design", "Trust sections", "Contact-ready pages"],
    cta: "Upgrade my website",
  },
  "business-automation": {
    kicker: "Follow-up system",
    hook: "Make every enquiry move faster without depending on memory.",
    promise:
      "We connect forms, WhatsApp, CRM, and status tracking so leads do not get lost after the first message.",
    outcomes: ["Faster response", "Lead routing", "Clear status tracking"],
    cta: "Automate my follow-up",
  },
  "video-production": {
    kicker: "Scroll stopper",
    hook: "Create videos that show proof, build trust, and make people act.",
    promise:
      "We plan, shoot, and edit reels and ad videos with strong hooks, clean pacing, and platform-ready formats.",
    outcomes: ["Strong hooks", "Premium visuals", "Ad-ready cuts"],
    cta: "Plan my video content",
  },
  "creative-design": {
    kicker: "Brand polish",
    hook: "Make every poster, ad, and social post look ready for business.",
    promise:
      "We create consistent campaign visuals that help your brand look premium before customers even call.",
    outcomes: ["Clean visuals", "Campaign consistency", "Premium brand feel"],
    cta: "Design my campaign",
  },
  seo: {
    kicker: "Long-term visibility",
    hook: "Build search presence that keeps working after the ad budget stops.",
    promise:
      "We improve keyword mapping, page structure, local signals, and content direction for steady discovery.",
    outcomes: ["Better structure", "Local discovery", "Content direction"],
    cta: "Improve my visibility",
  },
  "social-media": {
    kicker: "Trust calendar",
    hook: "Post with a purpose, not just because the calendar is empty.",
    promise:
      "We create content themes, captions, creatives, and posting systems that make your brand visible and useful.",
    outcomes: ["Clear monthly plan", "Consistent voice", "Trust-building posts"],
    cta: "Plan my social media",
  },
  "sales-funnel": {
    kicker: "Conversion path",
    hook: "Move people from interested to ready to talk with a clear funnel.",
    promise:
      "We map the path from ad click to enquiry to WhatsApp follow-up so sales conversations happen with context.",
    outcomes: ["Landing flow", "WhatsApp scripts", "Sales follow-up"],
    cta: "Map my sales funnel",
  },
};

function getStory(service: Service): ServiceStory {
  return (
    serviceStories[service.id] ?? {
      kicker: "Growth system",
      hook: `Make ${service.title} clearer, sharper, and easier to convert.`,
      promise:
        "We turn your service into a practical growth path with stronger messaging, better assets, and a cleaner enquiry flow.",
      outcomes: ["Clear strategy", "Better creative", "Conversion focus"],
      cta: "Talk about this service",
    }
  );
}

export function ServiceShowcase({ services }: { services: Service[] }) {
  const activeServices = useMemo(() => services.filter((service) => service.active), [services]);
  const [activeId, setActiveId] = useState(() => activeServices[0]?.id ?? "");

  useEffect(() => {
    function syncFromHash() {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      const matchedService = activeServices.find((service) => service.slug === hash || service.id === hash);

      if (matchedService) {
        setActiveId(matchedService.id);
      }
    }

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);

    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [activeServices]);

  if (!activeServices.length) {
    return null;
  }

  const activeService = activeServices.find((service) => service.id === activeId) ?? activeServices[0];
  const activeIndex = Math.max(
    activeServices.findIndex((service) => service.id === activeService.id),
    0,
  );
  const ActiveIcon = icons[activeService.icon] ?? Sparkles;
  const activeStory = getStory(activeService);

  function selectService(service: Service) {
    setActiveId(service.id);
    window.history.replaceState(null, "", `#${service.slug}`);
  }

  return (
    <section
      id="service-details"
      className="relative overflow-hidden bg-[linear-gradient(135deg,#071827_0%,#0b2447_48%,#0b5f9c_100%)] px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]" />
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5c64f]">Service System</p>
          <h2 className="mt-3 text-3xl font-black leading-tight sm:text-4xl">
            Pick the growth engine. Watch the plan come alive.
          </h2>
          <p className="mt-4 text-base leading-7 text-white/78">
            Each service is built like a conversion path: find the business gap, create the right assets, launch with
            purpose, and move enquiries toward sales.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[0.43fr_1fr] lg:items-start">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-lg border border-white/15 bg-white/[0.07] p-3 shadow-2xl shadow-black/20 backdrop-blur"
          >
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {activeServices.map((service, index) => {
                const Icon = icons[service.icon] ?? Sparkles;
                const isActive = service.id === activeService.id;

                return (
                  <motion.button
                    id={service.slug}
                    data-service-id={service.id}
                    key={service.id}
                    type="button"
                    onClick={() => selectService(service)}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative overflow-hidden rounded-lg border p-4 text-left transition",
                      isActive
                        ? "border-[#f5c64f]/70 bg-white text-[#0b2447] shadow-lg shadow-black/15"
                        : "border-white/10 bg-white/[0.04] text-white hover:border-white/30 hover:bg-white/[0.08]",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="activeServiceGlow"
                        className="absolute inset-y-2 left-2 w-1 rounded-full bg-[#f5c64f]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative z-10 flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition",
                          isActive ? "bg-[#eaf4ff] text-[#0b5f9c]" : "bg-white/10 text-[#f5c64f]",
                        )}
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className={cn("block text-xs font-black", isActive ? "text-[#c2932e]" : "text-white/55")}>
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="mt-1 block text-sm font-black leading-5">{service.title}</span>
                      </span>
                      <ChevronRight
                        className={cn(
                          "h-4 w-4 shrink-0 transition",
                          isActive ? "translate-x-1 text-[#0b5f9c]" : "text-white/45 group-hover:translate-x-1",
                        )}
                        aria-hidden="true"
                      />
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>

          <AnimatePresence mode="wait">
            <motion.article
              key={activeService.id}
              initial={{ opacity: 0, y: 24, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -18, scale: 0.985 }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden rounded-lg border border-white/15 bg-white/[0.08] p-5 shadow-2xl shadow-black/25 backdrop-blur sm:p-7 lg:p-8"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#f5c64f,#26b38f,#69bfff)]" />
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-4 py-2">
                    <ActiveIcon className="h-4 w-4 text-[#f5c64f]" aria-hidden="true" />
                    <span className="text-xs font-black uppercase tracking-[0.16em] text-white/75">
                      {activeStory.kicker}
                    </span>
                  </div>
                  <h3 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl">
                    {activeStory.hook}
                  </h3>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-white/78">{activeStory.promise}</p>
                </div>
                <Link
                  href={`/contact?service=${encodeURIComponent(activeService.title)}`}
                  className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-[#0b2447] shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:bg-[#f5c64f]"
                >
                  {activeStory.cta}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>

              <div className="mt-8 grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
                <motion.div
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08, duration: 0.42 }}
                  className="rounded-lg border border-white/12 bg-[#071827]/45 p-5"
                >
                  <p className="text-sm font-black text-[#f5c64f]">Customer Block</p>
                  <p className="mt-3 text-base leading-7 text-white/82">{activeService.painPoint}</p>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {["Problem seen", "Trust built", "Enquiry ready"].map((step, index) => (
                      <div key={step} className="rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3">
                        <span className="text-xs font-black text-[#69bfff]">{String(index + 1).padStart(2, "0")}</span>
                        <span className="mt-1 block text-sm font-bold text-white">{step}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12, duration: 0.42 }}
                  className="rounded-lg border border-white/12 bg-white/[0.07] p-5"
                >
                  <p className="text-sm font-black text-[#f5c64f]">Zigo Growth Move</p>
                  <p className="mt-3 text-base leading-7 text-white/82">{activeService.zigoDoes}</p>
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/12">
                    <motion.div
                      key={activeService.id}
                      initial={{ width: "16%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full rounded-full bg-[linear-gradient(90deg,#f5c64f,#26b38f,#69bfff)]"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs font-black uppercase tracking-[0.14em] text-white/50">
                    <span>Strategy</span>
                    <span>Launch</span>
                    <span>Leads</span>
                  </div>
                </motion.div>
              </div>

              <div className="mt-6">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-black text-[#f5c64f]">Launch Assets</p>
                    <h4 className="mt-1 text-xl font-black text-white">{activeService.title} deliverables</h4>
                  </div>
                  <p className="text-sm font-bold text-white/60">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(activeServices.length).padStart(2, "0")}
                  </p>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {activeService.deliverables.map((item, index) => (
                    <motion.div
                      key={`${activeService.id}-${item}`}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * index, duration: 0.32 }}
                      className="flex min-h-14 items-center gap-3 rounded-lg border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-bold text-white/86"
                    >
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#69bfff]" aria-hidden="true" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="mt-7 grid gap-3 md:grid-cols-3">
                {activeStory.outcomes.map((outcome, index) => (
                  <motion.div
                    key={outcome}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + 0.05 * index, duration: 0.34 }}
                    className="flex items-center gap-3 border-t border-white/12 pt-4"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f5c64f] text-sm font-black text-[#0b2447]">
                      {index + 1}
                    </span>
                    <span className="text-sm font-black text-white">{outcome}</span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-5 right-5 hidden text-white/5 lg:block"
                animate={{ rotate: [0, 4, 0], scale: [1, 1.03, 1] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Target className="h-28 w-28" />
              </motion.div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
