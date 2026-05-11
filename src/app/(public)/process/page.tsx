export const metadata = {
  title: "Process",
  description:
    "Four steps, end to end — how a True Medical Concierge engagement unfolds.",
};

const steps = [
  {
    numeral: "I",
    title: "Initial Consultation",
    body: "A first, unhurried conversation. We listen — not to a list of procedures, but to the situation. The aim is not to recommend; it is to understand.",
    detail: [
      "Confidential discussion of medical history and priorities",
      "Review of any existing records or imaging you wish to share",
      "Initial estimate of timeline and feasibility",
    ],
  },
  {
    numeral: "II",
    title: "Medical Evaluation",
    body: "Your situation is reviewed by the most appropriate consultant in our network. The evaluation is independent of any commercial relationship between us and the clinic.",
    detail: [
      "Specialist review by an experienced consultant",
      "Second opinion if useful, sourced independently",
      "Written evaluation prepared for your records",
    ],
  },
  {
    numeral: "III",
    title: "Plan & Approval",
    body: "We share a written plan: the proposed treatment, the team, the schedule, the cost — every line item, in plain English. Nothing proceeds without your approval, in writing.",
    detail: [
      "Treatment plan with realistic outcomes and risks",
      "Itinerary and accommodation options",
      "Transparent pricing — every line item explained",
    ],
  },
  {
    numeral: "IV",
    title: "Travel & Treatment",
    body: "From the moment you board your flight to the moment you return, every step is held in a single thread. The procedure is one event in that thread — important, but not the whole story.",
    detail: [
      "Flights, transfers, accommodation, and care coordination",
      "On-call concierge contact throughout your stay",
      "Aftercare coordination with a clinician local to you",
    ],
  },
];

export default function ProcessPage() {
  return (
    <main className="bg-tmc-ivory">
      <section className="px-8 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
            Process
          </div>
          <h1 className="font-serif italic text-tmc-green text-5xl md:text-6xl lg:text-7xl leading-tight">
            Four steps, end to end.
          </h1>
          <p className="mt-10 text-lg md:text-xl text-tmc-ink/80 leading-relaxed">
            The structure that holds every engagement — from a first quiet conversation to long-term follow-up.
          </p>
        </div>
      </section>

      {steps.map((step, i) => (
        <section
          key={step.numeral}
          className={`px-8 py-24 ${i % 2 === 0 ? "bg-tmc-parchment" : "bg-tmc-ivory"}`}
        >
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-3">
                <div className="font-serif italic text-tmc-gold text-7xl md:text-8xl leading-none">
                  {step.numeral}
                </div>
              </div>
              <div className="md:col-span-9">
                <h2 className="font-serif italic text-tmc-green text-3xl md:text-4xl mb-6">
                  {step.title}
                </h2>
                <p className="text-base md:text-lg text-tmc-ink/80 leading-relaxed mb-8 max-w-2xl">
                  {step.body}
                </p>
                <ul className="space-y-3">
                  {step.detail.map((d, j) => (
                    <li key={j} className="flex gap-3 text-sm text-tmc-ink/70">
                      <span className="text-tmc-gold">·</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
