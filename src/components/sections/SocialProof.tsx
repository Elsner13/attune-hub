import { COPY } from '@/lib/constants';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Tag from '@/components/ui/Tag';

export default function SocialProof() {
  return (
    <SectionWrapper id="proof" dark={true}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <Tag className="text-cloud/30">{COPY.socialProof.tag}</Tag>
          <h2 className="font-serif text-4xl text-cloud font-medium mt-4">
            {COPY.socialProof.headline}
          </h2>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {COPY.socialProof.testimonials.map((t, i) => (
            <div key={i} className="p-8 border border-cloud/[0.07]">
              <span className="font-serif text-4xl text-sky leading-none">&ldquo;</span>
              <p className="font-sans text-base text-cloud/80 mt-4 leading-relaxed italic">{t.quote}</p>
              <p className="font-sans text-sm font-medium text-cloud mt-6">{t.name}</p>
              <p className="font-sans text-xs text-cloud/50">{t.title}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
