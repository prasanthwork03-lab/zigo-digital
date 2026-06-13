"use client";

import { useState } from "react";
import { LogIn } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

export function LoginForm() {
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);
  const supabase = createSupabaseBrowserClient();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const credentialResponse = await fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (credentialResponse.ok) {
      setPending(false);
      window.location.href = "/admin/dashboard";
      return;
    }

    const credentialResult = (await credentialResponse.json().catch(() => null)) as { message?: string } | null;

    if (!supabase) {
      setPending(false);
      setMessage(credentialResult?.message || "Invalid username or password.");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setPending(false);

    if (error) {
      setMessage(credentialResult?.message || error.message);
      return;
    }

    window.location.href = "/admin/dashboard";
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
        Username / Email
        <input
          name="email"
          type="email"
          className="h-12 rounded-lg border border-[#d9e7f5] px-4 text-sm outline-none focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
          placeholder="admin@example.com"
        />
      </label>
      <label className="grid gap-2 text-sm font-bold text-[#0b2447]">
        Password
        <input
          name="password"
          type="password"
          className="h-12 rounded-lg border border-[#d9e7f5] px-4 text-sm outline-none focus:border-[#0b5f9c] focus:ring-4 focus:ring-[#0b5f9c]/10"
          placeholder="Admin password"
        />
      </label>
      {!supabase ? (
        <p className="rounded-lg bg-[#eaf4ff] px-4 py-3 text-sm font-semibold leading-6 text-[#0b2447]">
          Content edits will update this website on your machine. Use the admin username and password to continue.
        </p>
      ) : null}
      {message ? <p className="rounded-lg bg-[#fff7e6] px-4 py-3 text-sm font-semibold text-[#8a5b00]">{message}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#0b5f9c] px-5 text-sm font-bold text-white hover:bg-[#0b2447] disabled:opacity-70"
      >
        {pending ? "Opening..." : "Login"}
        <LogIn className="h-4 w-4" aria-hidden="true" />
      </button>
    </form>
  );
}
