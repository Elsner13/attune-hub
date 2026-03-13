import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Reveal from '@/components/ui/Reveal';

export default function RiskReversal() {
  return (
    <SectionWrapper id="commitment">
      <div className="max-w-2xl mx-auto text-center">
        <Reveal>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud leading-[1.1]">
            {COPY.riskReversal.headline}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="font-sans font-light text-base text-mist mt-8 leading-[1.8]">
            {COPY.riskReversal.body}
          </p>
        </Reveal>
      </div>
    </SectionWrapper>
  );
}
