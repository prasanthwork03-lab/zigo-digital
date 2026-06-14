"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, MousePointerClick, Search, Zap } from "lucide-react";

const orbitCards = [
  { label: "Lead flow", icon: MousePointerClick, className: "left-5 top-8" },
  { label: "SEO reach", icon: Search, className: "right-7 top-12" },
  { label: "Ad performance", icon: BarChart3, className: "left-8 bottom-16" },
  { label: "Automation", icon: Zap, className: "right-8 bottom-10" },
];

const pulsePoints = [
  "left-[22%] top-[30%]",
  "right-[24%] top-[28%]",
  "left-[42%] bottom-[29%]",
  "right-[30%] bottom-[23%]",
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#071827]/25 via-transparent to-white/0" />

          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-[-45%] w-1/3 rotate-12 bg-gradient-to-r from-transparent via-white/30 to-transparent blur-sm"
            animate={{ x: ["0%", "430%"] }}
            transition={{ duration: 5.5, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
            style={{ willChange: "transform" }}
          />

          <motion.div
            aria-hidden="true"
            className="absolute left-[14%] top-[22%] h-20 w-20 rounded-full border border-cyan-200/45"
            animate={{ scale: [1, 1.28, 1], opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {pulsePoints.map((point, index) => (
            <motion.span
              key={point}
              aria-hidden="true"
              className={`absolute ${point} h-3 w-3 rounded-full bg-[#f2d68b] shadow-[0_0_24px_rgba(242,214,139,0.8)]`}
              animate={{ scale: [1, 1.9, 1], opacity: [0.7, 0.15, 0.7] }}
              transition={{ duration: 2.4 + index * 0.3, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}
        </motion.div>
      </div>

      {orbitCards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.label}
            aria-label={card.label}
            className={`absolute ${card.className} hidden h-14 w-14 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#0b5f9c] shadow-xl shadow-[#0b2447]/10 backdrop-blur sm:flex`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: [0, index % 2 === 0 ? -10 : 10, 0] }}
            transition={{
              opacity: { duration: 0.45, delay: 0.2 + index * 0.08 },
              y: { duration: 4 + index * 0.35, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{ willChange: "transform" }}
          >
            <Icon className="h-6 w-6" aria-hidden="true" />
          </motion.div>
        );
      })}
    </div>
  );
}
