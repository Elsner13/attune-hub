import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function IrkingPains() {
  return (
    <SectionWrapper id="pains" dark={false}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <Tag>{COPY.irkingPains.tag}</Tag>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 max-w-2xl mx-auto text-cloud">
            {COPY.irkingPains.headline}
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {COPY.irkingPains.pains.map((pain, i) => (
            <div key={i} className="p-6 border border-cloud/[0.07]">
              <span className="text-xs text-mist tracking-widest font-sans">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="font-sans text-base text-cloud mt-3 leading-relaxed">{pain}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
