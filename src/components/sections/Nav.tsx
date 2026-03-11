'use client';
import { Menu } from 'lucide-react';
import { COPY } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-void/60 backdrop-blur-md border-b border-cloud/10">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <span className="font-serif text-xl font-medium tracking-widest uppercase text-cloud">
          {COPY.nav.logo}
        </span>
        <div className="hidden md:flex items-center gap-8">
          {COPY.nav.links.map((link) => (
            <a key={link} href="#" className="text-sm text-mist hover:text-cloud tracking-wide transition font-sans">
              {link}
            </a>
          ))}
        </div>
        <div className="hidden md:block">
          <Button variant="primary" size="sm">{COPY.nav.cta}</Button>
        </div>
        <button className="md:hidden text-mist" aria-label="Menu">
          <Menu size={22} />
        </button>
      </div>
    </nav>
  );
}
