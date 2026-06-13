import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  level?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({ eyebrow, title, text, align = "left", level = "h2", className }: SectionHeadingProps) {
  const HeadingTag = level === "h1" ? "h1" : "h2";

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase text-[#c2932e]">{eyebrow}</p>
      ) : null}
      <HeadingTag className="text-3xl font-black leading-tight text-[#0b2447] sm:text-4xl lg:text-5xl">{title}</HeadingTag>
      {text ? <p className="mt-5 text-base leading-7 text-[#526170] sm:text-lg">{text}</p> : null}
    </div>
  );
}
