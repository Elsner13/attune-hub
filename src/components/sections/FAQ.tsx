'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <SectionWrapper id="faq" dark={false}>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <Tag>{COPY.faq.tag}</Tag>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-cloud">
            {COPY.faq.headline}
          </h2>
        </div>
        <div>
          {COPY.faq.items.map((item, i) => (
            <div key={i} className="border-b border-cloud/[0.07] py-6">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between text-left"
              >
                <span className="font-sans text-base font-medium text-cloud">{item.q}</span>
                <ChevronDown
                  size={18}
                  className={`text-mist transition-transform flex-shrink-0 ml-4 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <p className="font-sans text-base text-mist leading-relaxed mt-4">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
