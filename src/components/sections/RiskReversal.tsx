import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';

export default function RiskReversal() {
  return (
    <SectionWrapper id="commitment" dark={false}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-cloud">
          {COPY.riskReversal.headline}
        </h2>
        <p className="font-sans text-lg text-mist mt-6 leading-relaxed">
          {COPY.riskReversal.body}
        </p>
      </div>
    </SectionWrapper>
  );
}
