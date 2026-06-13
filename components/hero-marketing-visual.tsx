"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, MousePointerClick, Search, Share2, Zap } from "lucide-react";

const orbitCards = [
  { label: "Lead Flow", value: "+42%", icon: MousePointerClick, className: "left-3 top-5" },
  { label: "SEO Reach", value: "3.8x", icon: Search, className: "right-4 top-10" },
  { label: "Ad ROAS", value: "2.6x", icon: BarChart3, className: "left-5 bottom-16" },
  { label: "Automation", value: "Live", icon: Zap, className: "right-6 bottom-8" },
];

export function HeroMarketingVisual() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[2rem] bg-[conic-gradient(from_120deg,#0b5f9c,#2f766d,#d0a345,#0b5f9c)] opacity-20 blur-2xl"
      />

      <div className="relative overflow-hidden rounded-lg border border-white/70 bg-white/75 p-4 shadow-2xl shadow-[#0b2447]/12 backdrop-blur">
        <motion.div
          className="relative overflow-hidden rounded-lg bg-[#071827]"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src="/assets/digital-marketing-hero.png"
            alt="Digital marketing analytics dashboard, lead funnel, ads, SEO, and automation visual"
            width={1536}
            height={1024}
            className="aspect-[4/3] w-full object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/75 via-transparent to-white/5" />

          <motion.div
            className="absolute left-6 top-6 flex items-center gap-3 rounded-lg border border-white/15 bg-white/12 px-4 py-3 text-white shadow-xl backdrop-blur"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2d68b] text-[#071827]">
              <Share2 className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-bold text-[#f2d68b]">Digital Growth</span>
              <span className="block text-sm font-black">Content to Conversion</span>
            </span>
          </motion.div>

          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-sm font-bold text-[#f2d68b]">Animated growth system</p>
            <h2 className="mt-2 max-w-sm text-2xl font-black leading-tight">
              Ads, websites, SEO, automation, and leads working together.
            </h2>
          </div>
        </motion.div>
      </div>

      {orbitCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            className={`absolute ${card.className} hidden min-w-32 rounded-lg border border-white/70 bg-white/92 p-3 shadow-xl shadow-[#0b2447]/10 backdrop-blur sm:block`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, index % 2 === 0 ? -10 : 10, 0] }}
            transition={{
              opacity: { duration: 0.45, delay: 0.2 + index * 0.08 },
              y: { duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ willChange: "transform" }}
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c]">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span>
                <span className="block text-xs font-bold text-[#667789]">{card.label}</span>
                <span className="block text-lg font-black text-[#0b2447]">{card.value}</span>
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
