"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  CheckCircle2,
  Download,
  ExternalLink,
  FileSearch,
  Loader2,
  RefreshCw,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AuditStatus = "good" | "warning" | "critical";

type AuditCheck = {
  label: string;
  status: AuditStatus;
  detail: string;
  recommendation: string;
};

type AuditRecommendation = {
  priority: "High" | "Medium" | string;
  action: string;
  reason: string;
};

type SeoAuditReport = {
  brand: {
    name: string;
    logo: string;
    email: string;
    phone: string;
  };
  auditedUrl: string;
  finalUrl: string;
  generatedAt: string;
  score: number;
  grade: string;
  executiveSummary: {
    title: string;
    description: string;
    contentType: string;
    indexability: string;
    strongestArea: string;
    biggestRisk: string;
  };
  metrics: {
    wordCount: number;
    titleLength: number;
    descriptionLength: number;
    h1Count: number;
    h2Count: number;
    h3Count: number;
    imageCount: number;
    imagesMissingAlt: number;
    internalLinks: number;
    externalLinks: number;
    nofollowLinks: number;
    schemaBlocks: number;
    topTerms: Array<{ term: string; count: number }>;
  };
  checks: AuditCheck[];
  recommendations: AuditRecommendation[];
  opportunities: string[];
};

type NumericMetricKey = Exclude<keyof SeoAuditReport["metrics"], "topTerms">;

const metricLabels: Array<{ key: NumericMetricKey; label: string }> = [
  { key: "wordCount", label: "Words" },
  { key: "titleLength", label: "Title length" },
  { key: "descriptionLength", label: "Description" },
  { key: "h1Count", label: "H1 tags" },
  { key: "imageCount", label: "Images" },
  { key: "imagesMissingAlt", label: "Missing alt" },
  { key: "internalLinks", label: "Internal links" },
  { key: "externalLinks", label: "External links" },
  { key: "schemaBlocks", label: "Schema blocks" },
];

const statusStyles = {
  good: {
    label: "Healthy",
    icon: CheckCircle2,
    className: "border-[#bfe5d1] bg-[#f0fbf5] text-[#0b7a3b]",
  },
  warning: {
    label: "Improve",
    icon: AlertTriangle,
    className: "border-[#f0dca8] bg-[#fff9e9] text-[#9a6a05]",
  },
  critical: {
    label: "Fix first",
    icon: XCircle,
    className: "border-[#f2b9b9] bg-[#fff2f2] text-[#b42323]",
  },
};

function scoreTone(score: number) {
  if (score >= 85) {
    return "from-[#0fa968] to-[#0b5f9c]";
  }

  if (score >= 70) {
    return "from-[#0b5f9c] to-[#2f766d]";
  }

  if (score >= 50) {
    return "from-[#d0a345] to-[#0b5f9c]";
  }

  return "from-[#b42323] to-[#d0a345]";
}

function safeDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SeoAuditTool() {
  const [url, setUrl] = useState("");
  const [report, setReport] = useState<SeoAuditReport | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const issueCounts = useMemo(() => {
    const checks = report?.checks || [];

    return {
      good: checks.filter((check) => check.status === "good").length,
      warning: checks.filter((check) => check.status === "warning").length,
      critical: checks.filter((check) => check.status === "critical").length,
    };
  }, [report]);

  async function runAudit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/tools/seo-audit", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const payload = (await response.json()) as SeoAuditReport | { error?: string };

      if (!response.ok) {
        throw new Error("error" in payload && payload.error ? payload.error : "Could not complete this audit.");
      }

      setReport(payload as SeoAuditReport);
    } catch (caughtError) {
      setReport(null);
      setError(caughtError instanceof Error ? caughtError.message : "Could not complete this audit.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-xl shadow-[#0b5f9c]/8"
      >
        <div className="grid gap-0 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d9e7f5] bg-[#f6faff] px-4 py-2 text-sm font-black text-[#0b5f9c]">
              <SearchCheck className="h-4 w-4 text-[#c2932e]" aria-hidden="true" />
              Free SEO Audit Tool
            </div>
            <h2 className="mt-5 max-w-xl text-3xl font-black leading-tight text-[#0b2447] sm:text-4xl">
              Find the SEO gaps that stop clicks from becoming enquiries.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#526170]">
              Scan any website page for title, meta description, headings, indexability, schema, alt text, links,
              content depth, AEO readiness, and conversion signals.
            </p>

            <form onSubmit={runAudit} className="mt-7 space-y-4">
              <label htmlFor="seo-audit-url" className="text-sm font-black text-[#0b2447]">
                Website URL
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="seo-audit-url"
                  type="url"
                  value={url}
                  onChange={(event) => setUrl(event.target.value)}
                  placeholder="https://example.com"
                  required
                  className="min-h-12 flex-1 rounded-full border border-[#c8dcec] bg-white px-5 text-base font-semibold text-[#0b2447] outline-none transition placeholder:text-[#8fa0b1] focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-6 text-sm font-black text-white shadow-xl shadow-[#0b5f9c]/20 transition hover:bg-[#0b2447] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <FileSearch className="h-4 w-4" aria-hidden="true" />}
                  {loading ? "Auditing" : "Run SEO Audit"}
                </button>
              </div>
            </form>

            {error ? (
              <div className="mt-5 rounded-lg border border-[#f2b9b9] bg-[#fff2f2] p-4 text-sm font-bold leading-6 text-[#b42323]">
                {error}
              </div>
            ) : null}
          </div>

          <div className="relative min-h-[26rem] overflow-hidden border-t border-[#d9e7f5] bg-[#071827] p-6 text-white lg:border-l lg:border-t-0 sm:p-8 lg:p-10">
            <div className="absolute inset-0 opacity-35">
              <div className="h-full w-full bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:64px_64px]" />
            </div>
            <motion.div
              aria-hidden="true"
              animate={{ x: [0, 18, -10, 0], y: [0, -12, 14, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-8 top-8 h-24 w-24 rounded-full border border-white/20 bg-white/10"
            />
            <motion.div
              aria-hidden="true"
              animate={{ x: [0, -14, 10, 0], y: [0, 14, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 h-16 w-16 rounded-full border border-[#d0a345]/40 bg-[#d0a345]/15"
            />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div>
                <p className="text-sm font-black uppercase text-[#f2d68b]">Audit Report Includes</p>
                <div className="mt-5 grid gap-3">
                  {[
                    "Technical SEO checks",
                    "Content and heading review",
                    "AI answer readiness",
                    "Priority action plan",
                  ].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.08 }}
                      className="flex items-center gap-3 rounded-lg border border-white/12 bg-white/8 p-3 backdrop-blur"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#0b5f9c]">
                        <BadgeCheck className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-black">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="rounded-lg border border-white/12 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center gap-3">
                  <Image src="/assets/zigo-logo.png" alt="Zigo Digital logo" width={56} height={56} className="h-14 w-14 rounded-full bg-white object-contain" />
                  <div>
                    <p className="text-lg font-black">Zigo Digital SEO Report</p>
                    <p className="text-sm font-semibold text-[#c9d8e7]">Branded report with practical next steps</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {report ? (
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden rounded-lg border border-[#d9e7f5] bg-white shadow-xl shadow-[#0b5f9c]/8 print:border-0 print:shadow-none"
        >
          <div className="dark-mesh p-6 text-white sm:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div className="flex items-start gap-4">
                <Image
                  src={report.brand.logo}
                  alt={`${report.brand.name} logo`}
                  width={72}
                  height={72}
                  className="h-20 w-20 rounded-full border-4 border-white bg-white object-contain"
                />
                <div>
                  <p className="text-sm font-black uppercase text-[#f2d68b]">SEO Audit Report</p>
                  <h2 className="mt-2 text-3xl font-black leading-tight sm:text-4xl">{report.brand.name}</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#d7e2ee]">
                    Report generated for{" "}
                    <a href={report.finalUrl} target="_blank" rel="noreferrer" className="font-black text-white underline underline-offset-4">
                      {report.finalUrl}
                    </a>
                  </p>
                  <p className="mt-1 text-xs font-semibold text-[#aebfd0]">{safeDate(report.generatedAt)}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 print:hidden">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-black text-[#0b2447] transition hover:bg-[#f2d68b]"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Save PDF
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReport(null);
                    setError("");
                  }}
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-sm font-black text-white transition hover:bg-white/10"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                  New Audit
                </button>
              </div>
            </div>

            <div className="mt-8 grid gap-5 lg:grid-cols-[0.75fr_1fr]">
              <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-black uppercase text-[#f2d68b]">SEO Health Score</p>
                    <p className="mt-2 text-5xl font-black">{report.score}</p>
                    <p className="mt-1 text-sm font-bold text-[#d7e2ee]">{report.grade}</p>
                  </div>
                  <div className={cn("flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br text-3xl font-black shadow-2xl", scoreTone(report.score))}>
                    {report.score}
                  </div>
                </div>
                <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${report.score}%` }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className={cn("h-full rounded-full bg-gradient-to-r", scoreTone(report.score))}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Healthy", value: issueCounts.good, icon: CheckCircle2, className: "text-[#62d692]" },
                  { label: "Improve", value: issueCounts.warning, icon: AlertTriangle, className: "text-[#f2d68b]" },
                  { label: "Fix First", value: issueCounts.critical, icon: XCircle, className: "text-[#ff9a9a]" },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <item.icon className={cn("h-6 w-6", item.className)} aria-hidden="true" />
                    <p className="mt-4 text-3xl font-black">{item.value}</p>
                    <p className="mt-1 text-sm font-bold text-[#d7e2ee]">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h3 className="text-2xl font-black text-[#0b2447]">Executive Summary</h3>
              <div className="mt-4 grid gap-4">
                {[
                  { label: "Page title", value: report.executiveSummary.title },
                  { label: "Meta description", value: report.executiveSummary.description },
                  { label: "Indexability", value: report.executiveSummary.indexability },
                  { label: "Biggest risk", value: report.executiveSummary.biggestRisk },
                  { label: "Strongest area", value: report.executiveSummary.strongestArea },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-4">
                    <p className="text-xs font-black uppercase text-[#c2932e]">{item.label}</p>
                    <p className="mt-2 text-sm font-bold leading-6 text-[#0b2447]">{item.value || "Not detected"}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-black text-[#0b2447]">Key Metrics</h3>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                {metricLabels.map((item) => (
                  <div key={item.key} className="rounded-lg border border-[#d9e7f5] bg-white p-4 shadow-sm">
                    <p className="text-2xl font-black text-[#0b5f9c]">{report.metrics[item.key]}</p>
                    <p className="mt-1 text-xs font-black uppercase text-[#667789]">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-5">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-[#c2932e]" aria-hidden="true" />
                  <h4 className="font-black text-[#0b2447]">Top Content Terms</h4>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {report.metrics.topTerms.length ? (
                    report.metrics.topTerms.map((item) => (
                      <span key={item.term} className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#0b5f9c] shadow-sm">
                        {item.term} x{item.count}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm font-semibold text-[#667789]">No clear repeated terms detected.</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#d9e7f5] p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-black uppercase text-[#c2932e]">Priority Fixes</p>
                <h3 className="mt-2 text-2xl font-black text-[#0b2447]">Action plan for better ranking, trust, and enquiries.</h3>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-black text-white transition hover:bg-[#0b2447] print:hidden"
              >
                Talk to Zigo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {(report.recommendations.length ? report.recommendations : [{ priority: "Low", action: "Keep monitoring the page monthly.", reason: "No major issue detected." }]).map((item, index) => (
                <motion.div
                  key={`${item.action}-${index}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <span className={cn("rounded-full px-3 py-1 text-xs font-black uppercase", item.priority === "High" ? "bg-[#fff2f2] text-[#b42323]" : "bg-[#fff9e9] text-[#9a6a05]")}>
                      {item.priority}
                    </span>
                    <span className="text-xs font-black uppercase text-[#667789]">Step {index + 1}</span>
                  </div>
                  <h4 className="mt-3 text-lg font-black leading-tight text-[#0b2447]">{item.action}</h4>
                  <p className="mt-2 text-sm leading-6 text-[#526170]">{item.reason}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#d9e7f5] p-6 sm:p-8">
            <h3 className="text-2xl font-black text-[#0b2447]">Detailed SEO Checks</h3>
            <div className="mt-5 grid gap-3">
              {report.checks.map((check) => {
                const styles = statusStyles[check.status];
                const Icon = styles.icon;

                return (
                  <details key={check.label} className="group rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-4 open:bg-white">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className={cn("flex h-9 w-9 items-center justify-center rounded-full border", styles.className)}>
                          <Icon className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                          <p className="font-black text-[#0b2447]">{check.label}</p>
                          <p className="text-xs font-bold uppercase text-[#667789]">{styles.label}</p>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#0b5f9c] transition group-open:rotate-90" aria-hidden="true" />
                    </summary>
                    <div className="mt-4 grid gap-3 pl-0 sm:pl-12">
                      <p className="text-sm leading-6 text-[#526170]">{check.detail}</p>
                      <p className="rounded-lg bg-white p-4 text-sm font-bold leading-6 text-[#0b2447] shadow-sm">
                        {check.recommendation}
                      </p>
                    </div>
                  </details>
                );
              })}
            </div>
          </div>

          <div className="border-t border-[#d9e7f5] bg-[#fbfdff] p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-[#c2932e]" aria-hidden="true" />
                  <h3 className="text-2xl font-black text-[#0b2447]">SEO + AEO Opportunities</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-[#526170]">
                  These actions improve search visibility and make the page easier for AI answer engines to understand,
                  quote, and recommend.
                </p>
              </div>
              <div className="grid gap-3">
                {report.opportunities.map((item) => (
                  <div key={item} className="flex gap-3 rounded-lg border border-[#d9e7f5] bg-white p-4">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#c2932e]" aria-hidden="true" />
                    <p className="text-sm font-bold leading-6 text-[#0b2447]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-[#d9e7f5] p-6 text-sm font-bold text-[#526170] sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <span>
              Prepared by {report.brand.name} - {report.brand.phone} - {report.brand.email}
            </span>
            <a href={report.finalUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#0b5f9c] print:hidden">
              Open audited page
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </motion.section>
      ) : null}
    </div>
  );
}
