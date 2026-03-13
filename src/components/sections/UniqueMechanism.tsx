import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function UniqueMechanism() {
  return (
    <SectionWrapper id="method">
      <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-16">
        <Reveal>
          <div className="md:sticky md:top-24">
            <Tag>{COPY.uniqueMechanism.tag}</Tag>
            <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1]">
              {COPY.uniqueMechanism.headline}
            </h2>
            <p className="font-sans font-light text-base text-mist mt-6 leading-[1.8]">
              {COPY.uniqueMechanism.body}
            </p>
          </div>
        </Reveal>
        <div>
          {COPY.uniqueMechanism.steps.map((step, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <div className="py-8 border-t border-sky/[0.07]">
                <span className="text-xs text-sky uppercase tracking-widest font-sans font-medium">{step.label}</span>
                <h3 className="font-serif text-2xl font-light text-cloud mt-3">{step.title}</h3>
                <p className="font-sans font-light text-sm text-mist mt-3 leading-[1.7]">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
