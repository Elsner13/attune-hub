import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function QuantifiableOutcome() {
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
        <div className="mt-12 border-t border-cloud/8 pt-10">
          <p className="font-serif text-xl md:text-2xl text-cloud/70 italic leading-relaxed border-l-2 border-sky pl-6">
            {COPY.quantifiableOutcome.pullquote}
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
