import Image from "next/image";

export function Footer() {
  return (
    <footer className="relative bg-tmc-green-deep text-tmc-ivory/80 px-6 md:px-8 py-12 md:py-16 overflow-hidden">
      <Image
        src="/logo.png"
        alt=""
        width={600}
        height={600}
        aria-hidden
        className="absolute -right-40 -bottom-40 w-[24rem] md:w-[32rem] h-[24rem] md:h-[32rem] object-contain opacity-[0.05] pointer-events-none select-none"
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 mb-10 md:mb-12">
          <div>
            <div className="text-sm uppercase tracking-[0.3em] text-tmc-gold mb-4">
              True Medical Concierge
            </div>
            <p className="text-sm leading-relaxed">
              İzmir · MMXXVI<br />
              info@truemedicalconcierge.com
            </p>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold/70 mb-4">
              Site
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="/services" className="hover:text-tmc-gold transition-colors">Services</a></li>
              <li><a href="/process" className="hover:text-tmc-gold transition-colors">Process</a></li>
              <li><a href="/about" className="hover:text-tmc-gold transition-colors">About</a></li>
              <li><a href="/contact" className="hover:text-tmc-gold transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-tmc-gold/70 mb-4">
              Legal
            </div>
            <ul className="space-y-2 text-sm">
              <li><a href="/legal/data-protection" className="hover:text-tmc-gold transition-colors">Data Protection (KVKK)</a></li>
              <li><a href="/legal/privacy" className="hover:text-tmc-gold transition-colors">Privacy</a></li>
              <li><a href="/legal/cookies" className="hover:text-tmc-gold transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 md:pt-8 border-t border-tmc-gold/20 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-4">
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-tmc-ivory/50">
            © MMXXVI True Medical Concierge
          </span>
          <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-tmc-ivory/50">
            EN · TR · DE · FR
          </span>
        </div>
      </div>
    </footer>
  );
}
