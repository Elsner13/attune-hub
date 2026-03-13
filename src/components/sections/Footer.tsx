import { COPY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="w-full py-16 px-6 md:px-12 text-cloud">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <span className="font-serif text-lg tracking-[0.3em] uppercase text-cloud/70">{COPY.footer.logo}</span>
            <p className="font-sans text-sm text-mist/50 mt-2">{COPY.footer.tagline}</p>
          </div>
          <div className="flex gap-8">
            {COPY.footer.links.map((link) => (
              <a key={link} href="#" className="font-sans text-sm text-mist/50 hover:text-cloud transition">{link}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-sky/[0.05] mt-12 pt-8">
          <p className="font-sans text-xs text-mist/30">{COPY.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
