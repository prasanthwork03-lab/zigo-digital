"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitEnquiry } from "@/lib/actions";
import type { EnquiryFormState } from "@/lib/types";

const initialState: EnquiryFormState = {
  status: "idle",
  message: "",
};

const services = [
  "Meta Ads & Lead Generation",
  "Google Ads",
  "Website Development",
  "Business Automation",
  "Video Shooting & Editing",
  "Creative Design",
  "SEO",
  "Social Media Management",
  "Sales Funnel & Follow-Up System",
];

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) {
    return null;
  }

  return <p className="mt-2 text-xs font-semibold text-[#b42318]">{errors[0]}</p>;
}

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
          Name
          <input
            name="name"
            className="h-12 rounded-lg border border-[#d9e7f5] bg-white px-4 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            placeholder="Your name"
          />
          <FieldError errors={state.fieldErrors?.name} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
          Business Name
          <input
            name="business_name"
            className="h-12 rounded-lg border border-[#d9e7f5] bg-white px-4 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            placeholder="Your business"
          />
          <FieldError errors={state.fieldErrors?.business_name} />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
          Phone Number
          <input
            name="phone"
            className="h-12 rounded-lg border border-[#d9e7f5] bg-white px-4 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            placeholder="7373507257"
          />
          <FieldError errors={state.fieldErrors?.phone} />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
          Email
          <input
            name="email"
            type="email"
            className="h-12 rounded-lg border border-[#d9e7f5] bg-white px-4 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
            placeholder="name@example.com"
          />
          <FieldError errors={state.fieldErrors?.email} />
        </label>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-bold text-[#0b2447]">Service Needed</legend>
        <div className="grid gap-3 rounded-lg border border-[#d9e7f5] bg-[#fbfdff] p-4 sm:grid-cols-2">
          {services.map((service) => (
            <label
              key={service}
              className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border border-[#d9e7f5] bg-white px-3 py-2 text-sm font-bold text-[#0b2447] transition hover:border-[#0b5f9c] hover:bg-[#eaf4ff]"
            >
              <input
                type="checkbox"
                name="service_needed"
                value={service}
                className="h-4 w-4 rounded border-[#b9ccdf] text-[#0b5f9c] focus:ring-[#0b5f9c]"
              />
              <span>{service}</span>
            </label>
          ))}
        </div>
        <FieldError errors={state.fieldErrors?.service_needed} />
      </fieldset>

      <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
        Message
        <textarea
          name="message"
          rows={5}
          className="resize-none rounded-lg border border-[#d9e7f5] bg-white px-4 py-3 text-sm font-medium outline-none transition focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
          placeholder="Tell us about your business goal."
        />
        <FieldError errors={state.fieldErrors?.message} />
      </label>

      {state.message ? (
        <div
          className={`rounded-lg border px-4 py-3 text-sm font-semibold ${
            state.status === "success"
              ? "border-[#b7e4cd] bg-[#f0fbf5] text-[#166534]"
              : "border-[#ffd0c7] bg-[#fff4f2] text-[#b42318]"
          }`}
        >
          {state.message}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-6 text-sm font-bold text-white shadow-lg shadow-[#0b5f9c]/20 transition hover:bg-[#0b2447] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {pending ? "Sending..." : "Send Enquiry"}
        <Send className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
