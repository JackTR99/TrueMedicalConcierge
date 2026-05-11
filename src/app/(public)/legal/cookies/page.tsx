export const metadata = {
  title: "Cookies",
  description: "Cookie policy for True Medical Concierge.",
};

export default function Cookies() {
  return (
    <main className="bg-tmc-ivory px-8 py-24 md:py-32">
      <article className="max-w-3xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold mb-6">
          Legal
        </div>
        <h1 className="font-serif italic text-tmc-green text-4xl md:text-5xl mb-12">
          Cookie Policy
        </h1>

        <div className="space-y-6 text-tmc-ink/80 text-base leading-relaxed">
          <p>
            This site uses a small number of cookies to operate the website and, with your consent, to understand how the site is used.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Essential cookies
          </h2>
          <p>
            Required for core functions: session management, security, and language preference. These cannot be turned off.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Analytics cookies
          </h2>
          <p>
            With your consent, we use a privacy-respecting analytics service to count visits. No data is shared with advertisers and no individual is identified.
          </p>

          <h2 className="font-serif italic text-tmc-green text-2xl mt-12 mb-4">
            Managing your preferences
          </h2>
          <p>
            You can withdraw consent at any time by clearing your browser cookies for this site or by writing to info@truemedicalconcierge.com.
          </p>

          <p className="text-sm italic text-tmc-muted mt-12">
            This text is a placeholder. The final version will be reviewed by counsel.
          </p>
        </div>
      </article>
    </main>
  );
}
