export const metadata = {
  title: "Data Protection (KVKK)",
  description:
    "Information regarding the processing of personal data under KVKK and applicable law.",
};

export default function DataProtection() {
  return (
    <main className="bg-tmc-ivory px-8 py-24 md:py-32">
      <article className="max-w-3xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
          Legal
        </div>
        <h1 className="font-serif italic text-tmc-green text-4xl md:text-5xl mb-12">
          Data Protection (KVKK) Notice
        </h1>

        <div className="space-y-6 text-tmc-ink/80 text-base leading-relaxed">
          <p>
            This notice is provided in accordance with the Turkish Personal Data Protection Law No. 6698 (KVKK) and applicable data protection regulations. It describes how True Medical Concierge (&quot;we&quot;, &quot;us&quot;) collects, uses, and protects personal data.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Data we collect
          </h2>
          <p>
            We collect identity information, contact details, medical information necessary for treatment coordination, financial information for billing, and technical data when you use our website. Special-category data (health information) is processed only with your explicit consent.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Purposes of processing
          </h2>
          <p>
            Personal data is processed for the purpose of arranging medical care, coordinating travel, communicating with you, and fulfilling our legal obligations. We do not sell personal data and we do not use it for marketing without your consent.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Your rights
          </h2>
          <p>
            Under KVKK, you have the right to know whether your personal data is processed, request information, request correction or deletion, and object to processing. You may exercise these rights by writing to info@truemedicalconcierge.com.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Retention
          </h2>
          <p>
            Personal data is retained only for as long as necessary to fulfil the purposes set out above, or as required by applicable law.
          </p>

          <p className="text-sm italic text-tmc-muted mt-12">
            This text is a placeholder. The final version will be reviewed by counsel.
          </p>
        </div>
      </article>
    </main>
  );
}
