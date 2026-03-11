import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function QuantifiableOutcome() {
  const stats = [COPY.quantifiableOutcome.stat_1, COPY.quantifiableOutcome.stat_2, COPY.quantifiableOutcome.stat_3];
  return (
    <SectionWrapper id="outcome">
      <div className="max-w-4xl mx-auto border border-cloud/8 p-12 md:p-20">
        <Tag>{COPY.quantifiableOutcome.tag}</Tag>
        <h2 className="font-serif text-4xl md:text-5xl text-cloud font-medium mt-4">
          {COPY.quantifiableOutcome.headline}
        </h2>
        <p className="font-sans text-lg text-cloud/50 mt-6 max-w-2xl">
          {COPY.quantifiableOutcome.body}
        </p>
        <div className="mt-12 grid grid-cols-3 gap-8 border-t border-cloud/8 pt-10">
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="font-serif text-5xl md:text-6xl font-medium text-cloud">{stat.number}</p>
              <p className="font-sans text-sm text-cloud/40 mt-2 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
