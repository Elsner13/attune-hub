'use client';
import { ChevronDown } from 'lucide-react';
import { COPY } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Tag>{COPY.hero.eyebrow}</Tag>
        <h1 className="font-serif font-medium text-5xl md:text-7xl lg:text-8xl leading-tight whitespace-pre-line text-cloud mt-4">
          {COPY.hero.headline}
        </h1>
        <p className="font-sans text-lg md:text-xl text-mist max-w-xl mx-auto mt-6 leading-relaxed">
          {COPY.hero.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
          <Button variant="primary" size="lg">{COPY.hero.cta_primary}</Button>
          <Button variant="ghost" size="lg">{COPY.hero.cta_secondary}</Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse text-mist">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}
