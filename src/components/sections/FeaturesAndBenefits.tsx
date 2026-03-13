import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';
import Reveal from '@/components/ui/Reveal';

export default function FeaturesAndBenefits() {
  return (
    <SectionWrapper id="features">
      <div className="text-center mb-16">
        <Reveal>
          <Tag>{COPY.featuresAndBenefits.tag}</Tag>
          <h2 className="font-serif font-light text-4xl md:text-5xl text-cloud mt-4 leading-[1.1] max-w-2xl mx-auto">
            {COPY.featuresAndBenefits.headline}
          </h2>
        </Reveal>
      </div>
      <div className="max-w-5xl mx-auto divide-y divide-sky/[0.07]">
        {COPY.featuresAndBenefits.items.map((item, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-12 py-8">
              <span className="font-sans text-base font-medium text-cloud min-w-[200px] shrink-0">{item.feature}</span>
              <p className="font-sans font-light text-base text-mist leading-[1.8]">{item.benefit}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </SectionWrapper>
  );
}
