'use client';
import { Menu } from 'lucide-react';
import { COPY } from '@/lib/constants';
import Button from '@/components/ui/Button';

export default function Nav() {
  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-void/60">
      <div className="max-w-6xl mx-auto h-14 flex items-center justify-between px-6 md:px-12">
        <span className="font-serif text-lg tracking-[0.3em] uppercase text-cloud">{COPY.nav.logo}</span>
        <div className="hidden md:flex items-center gap-8">
          {COPY.nav.links.map((link) => (
            <a key={link} href="#" className="font-sans text-sm text-mist hover:text-cloud transition">{link}</a>
          ))}
        </div>
        <div className="hidden md:block">
          <Button variant="outline" size="sm">{COPY.nav.cta}</Button>
        </div>
        <button className="md:hidden text-mist"><Menu size={20} /></button>
      </div>
    </nav>
  );
}
