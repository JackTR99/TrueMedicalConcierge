export const metadata = {
  title: "Privacy",
  description: "Privacy policy for True Medical Concierge.",
};

export default function Privacy() {
  return (
    <main className="bg-tmc-ivory px-8 py-24 md:py-32">
      <article className="max-w-3xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
          Legal
        </div>
        <h1 className="font-serif italic text-tmc-green text-4xl md:text-5xl mb-12">
          Privacy Policy
        </h1>

        <div className="space-y-6 text-tmc-ink/80 text-base leading-relaxed">
          <p>
            True Medical Concierge respects your privacy. This policy describes the information we collect when you use our website or services, how we use it, and the choices available to you.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Information we collect
          </h2>
          <p>
            We collect information you provide directly (when you contact us, request a consultation, or use the patient portal) and limited technical information automatically (browser, device, anonymised usage data).
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            How we use information
          </h2>
          <p>
            We use information to deliver our services, communicate with you, improve our website, and meet legal obligations. We do not share information with third parties for their marketing purposes.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            International transfers
          </h2>
          <p>
            Where data is transferred outside Türkiye, appropriate safeguards are applied in accordance with applicable law.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Contact
          </h2>
          <p>
            Questions about this policy may be addressed to info@truemedicalconcierge.com.
          </p>

          <p className="text-sm italic text-tmc-muted mt-12">
            This text is a placeholder. The final version will be reviewed by counsel.
          </p>
        </div>
      </article>
    </main>
  );
}
