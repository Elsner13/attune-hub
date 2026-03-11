import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import Tag from '@/components/ui/Tag';

export default function FinalCTA() {
  return (
    <SectionWrapper id="start" dark={true}>
      <div className="max-w-3xl mx-auto text-center">
        <Tag className="text-cloud/50">{COPY.finalCTA.tag}</Tag>
        <h2 className="font-serif text-5xl md:text-6xl text-cloud font-medium mt-4 leading-tight">
          {COPY.finalCTA.headline}
        </h2>
        <p className="font-sans text-lg text-cloud/70 mt-6 max-w-xl mx-auto">
          {COPY.finalCTA.body}
        </p>
        <div className="mt-10">
          <Button variant="primary" size="lg">{COPY.finalCTA.cta}</Button>
        </div>
      </div>
    </SectionWrapper>
  );
}
