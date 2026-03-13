import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function IrkingPains() {
  return (
    <SectionWrapper id="pains">
      <div className="text-center mb-16">
        <Reveal>
          <Tag>{COPY.irkingPains.tag}</Tag>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
            {COPY.irkingPains.headline}
          </h2>
        </Reveal>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {COPY.irkingPains.pains.map((pain, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="p-8 border border-sky/[0.05] hover:border-sky/[0.12] transition">
              <span className="font-serif text-3xl text-sky/20 block mb-4">{String(i + 1).padStart(2, '0')}</span>
              <p className="font-sans font-light text-sm text-cloud leading-[1.7]">{pain}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
