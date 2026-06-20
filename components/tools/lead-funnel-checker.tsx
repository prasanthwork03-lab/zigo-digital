"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, BadgeCheck, CheckCircle2, ClipboardCheck, RefreshCw, Target, XCircle } from "lucide-react";

type Answer = "yes" | "partial" | "no";

type FunnelCheck = {
  id: string;
  label: string;
  question: string;
  weight: number;
  fix: string;
};

const checks: FunnelCheck[] = [
  {
    id: "audience",
    label: "Right audience",
    question: "You know exactly who the campaign should attract.",
    weight: 10,
    fix: "Define one ideal buyer, their problem, and the result they want.",
  },
  {
    id: "offer",
    label: "Clear offer",
    question: "Your offer explains the service, benefit, and next step clearly.",
    weight: 12,
    fix: "Rewrite the offer in one simple line: service + result + location or audience.",
  },
  {
    id: "landing",
    label: "Landing page",
    question: "Traffic goes to a focused page, not only a social profile.",
    weight: 12,
    fix: "Create one page with problem, proof, offer, FAQ, and enquiry button.",
  },
  {
    id: "cta",
    label: "Strong CTA",
    question: "The page has easy WhatsApp, call, or form actions above the fold.",
    weight: 10,
    fix: "Add one primary CTA and repeat it after every important section.",
  },
  {
    id: "proof",
    label: "Trust proof",
    question: "You show reviews, client logos, results, photos, or case studies.",
    weight: 10,
    fix: "Add 3 proof blocks: testimonial, before-after/result, and client logo.",
  },
  {
    id: "leadCapture",
    label: "Lead capture",
    question: "You collect name, phone, need, and source without making it long.",
    weight: 10,
    fix: "Use a short enquiry form with only the fields your team needs to reply fast.",
  },
  {
    id: "followup",
    label: "Fast follow-up",
    question: "Every enquiry gets a reply or call within the same working hour.",
    weight: 12,
    fix: "Create an auto WhatsApp/email response plus a same-day call process.",
  },
  {
    id: "tracking",
    label: "Tracking",
    question: "You track traffic source, button clicks, enquiries, and closed leads.",
    weight: 12,
    fix: "Track every source and mark each lead as new, contacted, qualified, or closed.",
  },
  {
    id: "retargeting",
    label: "Retargeting",
    question: "People who visit but do not enquire see follow-up content or ads.",
    weight: 12,
    fix: "Run a small retargeting audience with proof, FAQ, and offer reminder content.",
  },
];

const defaultAnswers = checks.reduce<Record<string, Answer>>((answers, check) => {
  answers[check.id] = "no";
  return answers;
}, {});

function scoreAnswer(answer: Answer, weight: number) {
  if (answer === "yes") {
    return weight;
  }

  if (answer === "partial") {
    return weight * 0.5;
  }

  return 0;
}

function getVerdict(score: number) {
  if (score >= 80) {
    return {
      label: "Strong funnel",
      text: "Your lead flow has the main conversion pieces. Improve the weakest steps and scale carefully.",
      tone: "text-[#166534]",
    };
  }

  if (score >= 55) {
    return {
      label: "Needs tuning",
      text: "You have useful parts, but a few missing steps can leak enquiries before sales follow-up.",
      tone: "text-[#b26b00]",
    };
  }

  return {
    label: "Leaky funnel",
    text: "Traffic may be coming in, but the path to enquiry and follow-up needs a clearer system.",
    tone: "text-[#b42318]",
  };
}

export function LeadFunnelChecker() {
  const [industry, setIndustry] = useState("");
  const [channel, setChannel] = useState("Instagram / Facebook");
  const [monthlyLeads, setMonthlyLeads] = useState("");
  const [answers, setAnswers] = useState<Record<string, Answer>>(defaultAnswers);

  const report = useMemo(() => {
    const score = Math.round(checks.reduce((total, check) => total + scoreAnswer(answers[check.id], check.weight), 0));
    const missing = checks.filter((check) => answers[check.id] !== "yes");
    const critical = missing.filter((check) => answers[check.id] === "no").slice(0, 4);
    const verdict = getVerdict(score);

    return { score, missing, critical, verdict };
  }, [answers]);

  const reset = () => {
    setIndustry("");
    setChannel("Instagram / Facebook");
    setMonthlyLeads("");
    setAnswers(defaultAnswers);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
      <div className="rounded-lg border border-[#d9e7f5] bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#eaf4ff] text-[#0b5f9c]">
            <ClipboardCheck className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <h2 className="text-2xl font-black text-[#0b2447]">Check your lead funnel</h2>
            <p className="mt-2 text-sm leading-6 text-[#526170]">
              Answer quickly. The score shows where traffic may be dropping before enquiry or sale.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
            Industry
            <input
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              placeholder="Clinic, retail, education..."
              className="h-11 rounded-lg border border-[#d9e7f5] px-3 text-sm font-semibold outline-none focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            />
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
            Main channel
            <select
              value={channel}
              onChange={(event) => setChannel(event.target.value)}
              className="h-11 rounded-lg border border-[#d9e7f5] px-3 text-sm font-semibold outline-none focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            >
              <option>Instagram / Facebook</option>
              <option>Google Search</option>
              <option>Website SEO</option>
              <option>Referral</option>
              <option>Mixed channels</option>
            </select>
          </label>
          <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
            Monthly leads
            <input
              value={monthlyLeads}
              onChange={(event) => setMonthlyLeads(event.target.value)}
              placeholder="Example: 25"
              inputMode="numeric"
              className="h-11 rounded-lg border border-[#d9e7f5] px-3 text-sm font-semibold outline-none focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            />
          </label>
        </div>

        <div className="mt-6 grid gap-4">
          {checks.map((check) => (
            <div key={check.id} className="rounded-lg border border-[#edf3f8] bg-[#fbfdff] p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-black text-[#0b2447]">{check.label}</p>
                  <p className="mt-1 text-sm leading-6 text-[#526170]">{check.question}</p>
                </div>
                <div className="grid grid-cols-3 overflow-hidden rounded-lg border border-[#d9e7f5] bg-white text-xs font-black uppercase">
                  {(["yes", "partial", "no"] as Answer[]).map((answer) => {
                    const selected = answers[check.id] === answer;

                    return (
                      <button
                        key={answer}
                        type="button"
                        onClick={() => setAnswers((current) => ({ ...current, [check.id]: answer }))}
                        className={`px-3 py-2 transition ${
                          selected ? "bg-[#0b5f9c] text-white" : "text-[#526170] hover:bg-[#eaf4ff] hover:text-[#0b2447]"
                        }`}
                      >
                        {answer}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <aside className="h-fit rounded-lg border border-[#d9e7f5] bg-[#071827] p-5 text-white shadow-sm sm:p-6 lg:sticky lg:top-24">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-black uppercase text-[#ffcf70]">Funnel score</p>
            <p className="mt-2 text-5xl font-black">{report.score}</p>
          </div>
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0b5f9c]">
            <Target className="h-8 w-8" aria-hidden="true" />
          </span>
        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-[#ffcf70]" style={{ width: `${report.score}%` }} />
        </div>

        <div className="mt-6 rounded-lg bg-white p-4">
          <div className="flex items-start gap-3">
            {report.score >= 80 ? (
              <BadgeCheck className="mt-1 h-5 w-5 text-[#166534]" aria-hidden="true" />
            ) : report.score >= 55 ? (
              <AlertTriangle className="mt-1 h-5 w-5 text-[#b26b00]" aria-hidden="true" />
            ) : (
              <XCircle className="mt-1 h-5 w-5 text-[#b42318]" aria-hidden="true" />
            )}
            <div>
              <p className={`font-black ${report.verdict.tone}`}>{report.verdict.label}</p>
              <p className="mt-1 text-sm leading-6 text-[#526170]">{report.verdict.text}</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="text-lg font-black">Top missing steps</h3>
          <div className="mt-4 grid gap-3">
            {(report.critical.length ? report.critical : report.missing.slice(0, 4)).map((check) => (
              <div key={check.id} className="rounded-lg border border-white/10 bg-white/10 p-3">
                <p className="flex items-center gap-2 text-sm font-black">
                  <CheckCircle2 className="h-4 w-4 text-[#ffcf70]" aria-hidden="true" />
                  {check.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[#d7e2ee]">{check.fix}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white/10 p-4 text-sm leading-6 text-[#d7e2ee]">
          <p className="font-black text-white">Quick summary</p>
          <p className="mt-2">
            {industry || "Your business"} gets leads mainly from {channel.toLowerCase()}. Current lead volume:{" "}
            {monthlyLeads || "not entered"}. Fix the missing steps above before increasing ad spend.
          </p>
        </div>

        <button
          type="button"
          onClick={reset}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-black text-white transition hover:bg-white hover:text-[#0b2447]"
        >
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Reset checker
        </button>
      </aside>
    </div>
  );
}
