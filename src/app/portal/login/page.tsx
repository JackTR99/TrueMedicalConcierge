"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function PortalLogin() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const fd = new FormData(e.currentTarget);
    const supabase = createSupabaseBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: fd.get("email") as string,
      password: fd.get("password") as string,
    });

    if (error) {
      setStatus("error");
      setErrorMsg(error.message);
      return;
    }

    router.push("/portal/dashboard");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-tmc-ivory flex flex-col items-center justify-center px-8 py-16">
      <Link
        href="/"
        className="text-xs uppercase tracking-[0.3em] text-tmc-green mb-12 hover:text-tmc-gold transition-colors"
      >
        True Medical Concierge
      </Link>

      <div className="w-full max-w-sm border border-tmc-gold/30 bg-white/40 p-10">
        <h1 className="font-serif italic text-tmc-green text-3xl text-center mb-2">
          Patient access
        </h1>
        <p className="text-[10px] uppercase tracking-[0.3em] text-tmc-muted text-center mb-10">
          By invitation only
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              autoComplete="email"
              className="w-full bg-transparent border-b border-tmc-ink/20 focus:border-tmc-gold focus:outline-none py-3 text-base text-tmc-ink"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              autoComplete="current-password"
              className="w-full bg-transparent border-b border-tmc-ink/20 focus:border-tmc-gold focus:outline-none py-3 text-base text-tmc-ink"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full mt-4 px-10 py-4 bg-tmc-green text-tmc-ivory border border-tmc-gold/60 text-xs uppercase tracking-[0.25em] hover:bg-tmc-green-deep hover:border-tmc-gold transition-all duration-300 disabled:opacity-60"
          >
            {status === "loading" ? "Entering…" : "Enter"}
          </button>

          {status === "error" && (
            <p className="text-sm italic text-tmc-gold text-center pt-2">
              {errorMsg}
            </p>
          )}
        </form>

        <p className="text-xs text-tmc-muted text-center mt-10 leading-relaxed">
          If you do not have an account, please{" "}
          <Link
            href="/contact"
            className="text-tmc-green underline-offset-4 hover:underline"
          >
            contact a concierge
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
