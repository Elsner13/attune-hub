import { COPY } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="text-cloud py-16 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div>
            <p className="font-serif text-xl tracking-widest uppercase text-cloud/70">{COPY.footer.logo}</p>
            <p className="font-sans text-sm text-cloud/30 mt-2">{COPY.footer.tagline}</p>
          </div>
          <div className="flex flex-wrap gap-8">
            {COPY.footer.links.map((link) => (
              <a key={link} href="#" className="font-sans text-sm text-cloud/30 hover:text-cloud/70 tracking-wide transition">
                {link}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-cloud/8 flex items-center justify-between">
          <p className="font-sans text-xs text-cloud/20">{COPY.footer.legal}</p>
        </div>
      </div>
    </footer>
  );
}
