'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <SectionWrapper id="faq">
      <div className="text-center mb-16">
        <Reveal>
          <Tag>{COPY.faq.tag}</Tag>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
            {COPY.faq.headline}
          </h2>
        </Reveal>
      </div>
      <div className="max-w-3xl mx-auto divide-y divide-sky/[0.07]">
        {COPY.faq.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.05}>
            <div className="py-6">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-sans text-base font-medium text-cloud">{item.q}</span>
                <ChevronDown size={16} className={`text-mist transition-transform shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`} />
              </button>
              {open === i && (
                <p className="font-sans font-light text-base text-mist mt-4 leading-[1.8]">{item.a}</p>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
