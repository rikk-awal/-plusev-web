export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* Logo & Copy */}
          <div className="space-y-3">
            <a href="/" className="block w-fit">
              <svg
                width="139"
                height="56"
                viewBox="0 0 185 74"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="PlusEV, Quant & Tech Company"
              >
                <rect x="4" y="3" width="50" height="50" rx="6" fill="#04408d" />
                <path d="M16.3 33.8 L28.6 18.4 L40.9 33.8" stroke="#ffffff" strokeWidth="6.9" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <text x="62" y="38" fontFamily="var(--font-body), sans-serif" fontSize="26" fontWeight="700" fill="#04408d" letterSpacing="0.5">PLUSEV</text>
                <text x="62.5" y="58" fontFamily="var(--font-mono), monospace" fontSize="7.8" fontWeight="700" fill="#04408d" letterSpacing="0.1">Quant &amp; Tech Company</text>
              </svg>
            </a>
            <div className="flex gap-4 text-xs text-[#02263c]/40">
              <a href="#" className="hover:text-[#38bdf8] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#38bdf8] transition-colors">Terms &amp; Conditions</a>
            </div>
            <p className="text-xs text-[#02263c]/50">© PlusEV 2020-2026. All Rights Reserved.</p>
          </div>

          {/* Contact action & LinkedIn */}
          <div className="flex items-center gap-6">
            <a
              href="/#contact"
              className="btn !py-2.5 !px-6"
            >
              Contact us
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#02263c]/60 hover:text-[#38bdf8] transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
