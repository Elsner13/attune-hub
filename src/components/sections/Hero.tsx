'use client';
import { ChevronDown } from 'lucide-react';
import { COPY } from '@/lib/constants';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <Tag>{COPY.hero.eyebrow}</Tag>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-serif font-light text-5xl md:text-6xl lg:text-7xl leading-[1.05] whitespace-pre-line text-cloud mt-4">
            {COPY.hero.headline}
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-sans font-light text-base text-mist max-w-lg mx-auto mt-8 leading-relaxed">
            {COPY.hero.subheadline}
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
            <Button variant="primary" size="lg">{COPY.hero.cta_primary}</Button>
            <Button variant="ghost" size="md">{COPY.hero.cta_secondary}</Button>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-mist animate-gentle-float">
        <ChevronDown size={20} />
      </div>
    </section>
  );
}
