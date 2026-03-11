import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function Reframe() {
  return (
    <SectionWrapper id="reframe" dark={false}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <Tag>{COPY.reframe.tag}</Tag>
          <h2 className="font-serif text-4xl md:text-5xl font-medium leading-tight text-cloud mt-4">
            {COPY.reframe.headline}
          </h2>
        </div>
        <div>
          <p className="font-sans text-lg text-mist leading-relaxed">
            {COPY.reframe.body}
          </p>
          <div className="w-10 h-px bg-sky mt-8" />
        </div>
      </div>
    </SectionWrapper>
  );
}
