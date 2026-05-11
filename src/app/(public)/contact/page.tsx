"use client";

import { useState, useRef } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const supabase = createSupabaseBrowserClient();

    const { error } = await supabase.from("inquiries").insert({
      full_name: (formData.get("name") as string) || null,
      email: (formData.get("email") as string) || null,
      phone: (formData.get("phone") as string) || null,
      area_of_interest: (formData.get("area") as string) || null,
      message: (formData.get("message") as string) || null,
      source: "website",
    });

    if (error) {
      console.error("Inquiry insert failed", error);
      setStatus("error");
      return;
    }

    setStatus("sent");
    formRef.current?.reset();
  }

  return (
    <main className="bg-tmc-ivory">
      <section className="px-8 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
              Contact
            </div>
            <h1 className="font-serif italic text-tmc-green text-5xl md:text-6xl lg:text-7xl leading-tight">
              A quiet conversation, in confidence.
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
              <Field label="Full name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <SelectField
                label="Area of interest"
                name="area"
                options={[
                  "Dental & Oral Health",
                  "Plastic & Aesthetic Surgery",
                  "Bariatric Surgery",
                  "Orthopedics",
                  "Other",
                ]}
              />
              <div>
                <label className="block text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-2">
                  Message
                </label>
                <div className="relative">
                  <textarea
                    name="message"
                    rows={5}
                    className="peer w-full bg-transparent border-b border-tmc-ink/20 focus:outline-none py-3 text-base text-tmc-ink resize-none"
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-tmc-gold transition-all duration-500 peer-focus:w-full" />
                </div>
              </div>

              <button
                type="submit"
                disabled={status === "sending" || status === "sent"}
                className="px-10 py-4 bg-tmc-green text-tmc-ivory border border-tmc-gold/60 text-xs md:text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-tmc-green-deep hover:border-tmc-gold disabled:opacity-60"
              >
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                  ? "Received"
                  : "Send"}
              </button>

              {status === "sent" && (
                <p className="text-sm italic text-tmc-green">
                  Thank you. A concierge will be in touch shortly.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm italic text-tmc-gold">
                  Something prevented the message from being saved. Please try again, or write to info@truemedicalconcierge.com.
                </p>
              )}
            </form>

            <aside className="space-y-12">
              <InfoBlock label="Office" body="İzmir, Türkiye" />
              <InfoBlock label="Email" body="info@truemedicalconcierge.com" />
              <InfoBlock
                label="Hours"
                body="By appointment, every day of the week."
              />
              <div className="border-t border-tmc-gold/30 pt-12">
                <p className="text-sm italic text-tmc-ink/70 leading-relaxed">
                  Every inquiry is read by a member of the concierge team. We respond within one working day.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          required={required}
          className="peer w-full bg-transparent border-b border-tmc-ink/20 focus:outline-none py-3 text-base text-tmc-ink"
        />
        <span className="absolute bottom-0 left-0 w-0 h-px bg-tmc-gold transition-all duration-500 peer-focus:w-full" />
      </div>
    </div>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-2">
        {label}
      </label>
      <div className="relative">
        <select
          name={name}
          defaultValue=""
          className="peer w-full bg-transparent border-b border-tmc-ink/20 focus:outline-none py-3 text-base text-tmc-ink"
        >
          <option value="" disabled>
            —
          </option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <span className="absolute bottom-0 left-0 w-0 h-px bg-tmc-gold transition-all duration-500 peer-focus:w-full" />
      </div>
    </div>
  );
}

function InfoBlock({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.3em] text-tmc-gold mb-3">
        {label}
      </div>
      <p className="text-base text-tmc-ink/85 leading-relaxed">{body}</p>
    </div>
  );
}
