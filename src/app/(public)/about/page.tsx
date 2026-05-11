import Image from "next/image";

export const metadata = {
  title: "About",
  description:
    "True Medical Concierge — a discreet medical concierge service in Türkiye.",
};

export default function About() {
  return (
    <main className="bg-tmc-ivory">
      <section className="px-8 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
            About
          </div>
          <h1 className="font-serif italic text-tmc-green text-5xl md:text-6xl lg:text-7xl leading-tight">
            A medical concierge, in the older sense of the word.
          </h1>
          <p className="mt-10 text-lg md:text-xl text-tmc-ink/80 leading-relaxed">
            True Medical Concierge was founded on the conviction that medicine, at its best, is an intimate craft. Our work is to make the apparatus around it — the consultations, the schedule, the travel, the paperwork — quiet enough that the medicine can be heard.
          </p>
        </div>
      </section>

      <section className="bg-tmc-green text-tmc-ivory px-8 py-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
              Why True Medical Concierge
            </div>
            <p className="font-serif italic text-3xl md:text-4xl leading-tight mb-8">
              We do not sell treatments. We arrange them.
            </p>
            <p className="text-base text-tmc-ivory/80 leading-relaxed">
              The market for medical travel is crowded with intermediaries whose income depends on the procedures they place. We have chosen a different model. Our consultants are paid for their judgement, not their volume. The recommendation you receive is the one a physician would give to a friend.
            </p>
          </div>
          <div className="flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="True Medical Concierge"
              width={400}
              height={400}
              className="w-64 h-64 object-contain"
            />
          </div>
        </div>
      </section>

      <section className="px-8 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif italic text-tmc-green text-3xl md:text-4xl mb-12 text-center">
            Our principles
          </h2>
          <div className="space-y-10">
            <Principle
              label="Discretion as default"
              body="Patient records are read only by those treating you. No story is shared, no name is mentioned in public-facing communication, unless you ask."
            />
            <Principle
              label="Independent counsel"
              body="The clinical advice we facilitate is independent of where the procedure is delivered. If the answer is no surgery, the answer is no surgery."
            />
            <Principle
              label="Single point of accountability"
              body="One concierge owns your case from first conversation to last follow-up. Names and numbers do not change because the institution does."
            />
            <Principle
              label="Quiet luxury, where it serves you"
              body="Accommodations, drivers, suites — chosen for calm and privacy, never for visibility."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Principle({ label, body }: { label: string; body: string }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-tmc-gold/20 pb-10">
      <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold">
        {label}
      </div>
      <p className="md:col-span-3 text-base md:text-lg text-tmc-ink/80 leading-relaxed">
        {body}
      </p>
    </div>
  );
}
