import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function FeaturesAndBenefits() {
  return (
    <SectionWrapper id="features" dark={false}>
      <div className="max-w-5xl mx-auto">
        <div className="max-w-2xl">
          <Tag>{COPY.featuresAndBenefits.tag}</Tag>
          <h2 className="font-serif text-4xl md:text-5xl font-medium mt-4 text-cloud">
            {COPY.featuresAndBenefits.headline}
          </h2>
        </div>
        <div className="mt-16 divide-y divide-cloud/10">
          {COPY.featuresAndBenefits.items.map((item, i) => (
            <div key={i} className="flex items-start justify-between py-8 gap-12">
              <span className="font-sans text-base font-medium text-cloud min-w-48">{item.feature}</span>
              <p className="font-sans text-base text-mist leading-relaxed">{item.benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
