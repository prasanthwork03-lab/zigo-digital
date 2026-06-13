"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, ChevronDown, Menu, SearchCheck, X } from "lucide-react";
import { navItems, site, toolItems } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#d9e7f5] bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Zigo Digital home">
          <Image
            src={site.logo}
            alt="Zigo Digital logo"
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-contain"
            priority
          />
          <div className="leading-tight">
            <span className="block text-base font-bold text-[#0b2447]">{site.name}</span>
            <span className="block text-xs font-medium text-[#6a7480]">Digital Growth Agency</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

            if (item.href === "/tools") {
              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setToolsOpen(true)}
                  onMouseLeave={() => setToolsOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setToolsOpen((value) => !value)}
                    className={cn(
                      "inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold transition",
                      active
                        ? "bg-[#eaf4ff] text-[#0b5f9c]"
                        : "text-[#263747] hover:bg-[#f3f7fb] hover:text-[#0b5f9c]",
                    )}
                    aria-expanded={toolsOpen}
                    aria-haspopup="menu"
                  >
                    {item.label}
                    <ChevronDown className={cn("h-4 w-4 transition", toolsOpen && "rotate-180")} aria-hidden="true" />
                  </button>
                  {toolsOpen ? (
                    <div className="absolute left-1/2 top-full z-50 mt-3 w-[24rem] -translate-x-1/2 rounded-lg border border-[#d9e7f5] bg-white p-3 shadow-2xl shadow-[#0b2447]/14">
                      <div className="mb-2 flex items-center gap-2 px-3 py-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c]">
                          <SearchCheck className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="text-sm font-black text-[#0b2447]">Zigo Tools</p>
                          <p className="text-xs font-semibold text-[#667789]">Free digital growth utilities</p>
                        </div>
                      </div>
                      <div className="grid gap-1">
                        {toolItems.map((tool) => (
                          <Link
                            key={tool.label}
                            href={tool.href}
                            onClick={() => setToolsOpen(false)}
                            className="group rounded-lg px-3 py-3 transition hover:bg-[#f3f8fd]"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-black text-[#0b2447] group-hover:text-[#0b5f9c]">{tool.label}</p>
                              <span className="rounded-full bg-[#eef6ff] px-2 py-0.5 text-[0.68rem] font-black uppercase text-[#0b5f9c]">
                                {tool.status}
                              </span>
                            </div>
                            <p className="mt-1 text-xs leading-5 text-[#667789]">{tool.description}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-semibold transition",
                  active
                    ? "bg-[#eaf4ff] text-[#0b5f9c]"
                    : "text-[#263747] hover:bg-[#f3f7fb] hover:text-[#0b5f9c]",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white shadow-lg shadow-[#0b5f9c]/20 transition hover:bg-[#0b2447]"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#d8e5f2] text-[#0b2447] lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#d9e7f5] bg-white px-4 pb-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2 py-4" aria-label="Mobile navigation">
            {navItems.map((item) => (
              item.href === "/tools" ? (
                <div key={item.href} className="rounded-xl border border-[#d9e7f5] bg-[#fbfdff] p-2">
                  <Link
                    href="/tools"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-black text-[#0b2447]"
                  >
                    Tools
                    <ChevronDown className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <div className="grid gap-1">
                    {toolItems.map((tool) => (
                      <Link
                        key={tool.label}
                        href={tool.href}
                        onClick={() => setOpen(false)}
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-[#526170] hover:bg-white hover:text-[#0b5f9c]"
                      >
                        {tool.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-[#263747] hover:bg-[#f3f7fb]"
                >
                  {item.label}
                </Link>
              )
            ))}
          </nav>
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mx-auto flex h-12 max-w-7xl items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white"
          >
            Book Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      ) : null}
    </header>
  );
}
