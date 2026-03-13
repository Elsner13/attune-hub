import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function BigProblem() {
  return (
    <SectionWrapper id="problem">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <Reveal>
          <div className="md:sticky md:top-24">
            <Tag>{COPY.bigProblem.tag}</Tag>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
              {COPY.bigProblem.headline}
            </h2>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-sans font-light text-base text-mist leading-[1.8]">
            {COPY.bigProblem.body}
          </p>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
