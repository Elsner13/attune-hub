import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Button from '@/components/ui/Button';
import Reveal from '@/components/ui/Reveal';

export default function FinalCTA() {
  return (
    <SectionWrapper id="cta">
      <div className="max-w-3xl mx-auto text-center">
        <Reveal>
          <Tag className="text-mist/50">{COPY.finalCTA.tag}</Tag>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
            {COPY.finalCTA.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-sans font-light text-base text-mist mt-8 max-w-xl mx-auto leading-[1.8]">
            {COPY.finalCTA.body}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-12">
            <Button variant="primary" size="lg" className="px-10 py-4 tracking-wide">{COPY.finalCTA.cta}</Button>
          </div>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
