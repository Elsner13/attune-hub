import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function BigProblem() {
  return (
    <SectionWrapper id="problem" dark={true}>
      <div className="max-w-3xl mx-auto text-center">
        <Tag>{COPY.bigProblem.tag}</Tag>
        <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-cloud mt-4">
          {COPY.bigProblem.headline}
        </h2>
        <p className="font-sans text-lg text-cloud/70 mt-6 leading-relaxed">
          {COPY.bigProblem.body}
        </p>
      </div>
    </SectionWrapper>
  );
}
