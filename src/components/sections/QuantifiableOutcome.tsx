import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function QuantifiableOutcome() {
  const stats = [COPY.quantifiableOutcome.stat_1, COPY.quantifiableOutcome.stat_2, COPY.quantifiableOutcome.stat_3];
  return (
    <SectionWrapper id="outcome" dark={false}>
      <div className="bg-slate/90 backdrop-blur-sm text-cloud p-12 md:p-20">
        <Tag className="text-cloud/50">{COPY.quantifiableOutcome.tag}</Tag>
        <h2 className="font-serif text-4xl md:text-5xl text-cloud font-medium mt-4">
          {COPY.quantifiableOutcome.headline}
        </h2>
        <p className="font-sans text-lg text-cloud/70 mt-6 max-w-2xl">
          {COPY.quantifiableOutcome.body}
        </p>
        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-cloud/20 pt-10">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-serif text-5xl md:text-6xl font-medium text-cloud">{stat.number}</p>
              <p className="font-sans text-sm text-cloud/50 mt-2 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
