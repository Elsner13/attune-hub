import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function Reframe() {
  return (
    <SectionWrapper id="reframe">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <Tag>{COPY.reframe.tag}</Tag>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
            {COPY.reframe.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-sans font-light text-base text-mist mt-8 leading-[1.8]">
            {COPY.reframe.body}
          </p>
          <div className="w-12 h-px bg-sky mx-auto mt-10" />
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
