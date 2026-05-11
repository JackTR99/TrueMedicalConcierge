const steps = [
  {
    numeral: "I",
    title: "Initial Consultation",
    body: "We listen in a quiet conversation; we understand your priorities and expectations.",
  },
  {
    numeral: "II",
    title: "Medical Evaluation",
    body: "Your file is shared with relevant physicians; an independent assessment and plan are prepared.",
  },
  {
    numeral: "III",
    title: "Plan & Approval",
    body: "Timeline and details are clarified; no step is taken without your approval.",
  },
  {
    numeral: "IV",
    title: "Travel & Treatment",
    body: "Flights, accommodation, transfers, and every stage of treatment are handled from a single point.",
  },
];

export function Process() {
  return (
    <section className="bg-tmc-parchment py-32 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-4">
            Process
          </div>
          <h2 className="font-serif italic text-tmc-green text-4xl md:text-5xl leading-tight">
            Four steps, end to end.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {steps.map((step) => (
            <div key={step.numeral} className="text-center md:text-left">
              <div className="font-serif italic text-tmc-gold text-5xl md:text-6xl mb-6">
                {step.numeral}
              </div>
              <h3 className="font-serif italic text-tmc-green text-xl md:text-2xl mb-4">
                {step.title}
              </h3>
              <p className="text-sm text-tmc-ink/75 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
