import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function QuantifiableOutcome() {
  return (
    <SectionWrapper id="outcome">
      <Reveal>
        <div className="max-w-4xl mx-auto border border-sky/[0.05] p-12 md:p-20">
          <Tag>{COPY.quantifiableOutcome.tag}</Tag>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
            {COPY.quantifiableOutcome.headline}
          </h2>
          <p className="font-sans font-light text-base text-mist mt-6 max-w-2xl leading-[1.8]">
            {COPY.quantifiableOutcome.body}
          </p>
          <div className="mt-12 border-t border-sky/[0.07] pt-10">
            <p className="font-serif text-xl md:text-2xl text-cloud/70 italic leading-relaxed border-l-2 border-sky pl-6">
              {COPY.quantifiableOutcome.pullquote}
            </p>
          </div>
        </div>
      </Reveal>
    </SectionWrapper>
  );
}
