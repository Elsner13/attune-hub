import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function UniqueMechanism() {
  return (
    <SectionWrapper id="method" dark={true}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <Tag>{COPY.uniqueMechanism.tag}</Tag>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-cloud mt-4">
            {COPY.uniqueMechanism.headline}
          </h2>
          <p className="font-sans text-lg text-cloud/70 mt-6 max-w-2xl mx-auto">
            {COPY.uniqueMechanism.body}
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.uniqueMechanism.steps.map((step, i) => (
            <div key={i}>
              <div className="w-full h-px bg-cloud/20 mb-6" />
              <span className="text-xs text-sky uppercase tracking-widest font-sans">{step.label}</span>
              <h3 className="font-serif text-2xl text-cloud font-medium mt-2">{step.title}</h3>
              <p className="font-sans text-base text-cloud/60 mt-3 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
