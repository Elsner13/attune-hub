import { Shield } from 'lucide-react';
import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function RiskReversal() {
  return (
    <SectionWrapper id="guarantee" dark={false}>
      <div className="max-w-3xl mx-auto text-center">
        <Shield size={48} className="text-sky mx-auto" />
        <Tag className="mt-6 block">{COPY.riskReversal.tag}</Tag>
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
