"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { floatingServices } from "@/lib/site-data";

export function FloatingHeroCards() {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden="true">
      {floatingServices.map((item, index) => {
        const positions = [
          "left-2 top-8",
          "right-4 top-16",
          "left-10 top-44",
          "right-10 top-48",
          "left-2 bottom-28",
          "right-4 bottom-32",
          "left-28 bottom-6",
          "right-32 bottom-4",
        ];

        return (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{
              opacity: { duration: 0.55, delay: index * 0.08 },
              y: { duration: 4 + index * 0.2, repeat: Infinity, ease: "easeInOut" },
            }}
            className={`absolute ${positions[index]} flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-2 text-xs font-bold text-[#0b2447] shadow-xl shadow-[#0b2447]/10 backdrop-blur`}
            style={{ willChange: "transform" }}
          >
            <CheckCircle2 className="h-4 w-4 text-[#0b5f9c]" />
            {item}
          </motion.div>
        );
      })}
    </div>
  );
}
