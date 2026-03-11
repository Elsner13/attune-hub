import Nav from '@/components/sections/Nav';
import Hero from '@/components/sections/Hero';
import BigProblem from '@/components/sections/BigProblem';
import Reframe from '@/components/sections/Reframe';
import IrkingPains from '@/components/sections/IrkingPains';
import UniqueMechanism from '@/components/sections/UniqueMechanism';
import FeaturesAndBenefits from '@/components/sections/FeaturesAndBenefits';
import QuantifiableOutcome from '@/components/sections/QuantifiableOutcome';
import RiskReversal from '@/components/sections/RiskReversal';
import SocialProof from '@/components/sections/SocialProof';
import FAQ from '@/components/sections/FAQ';
import FinalCTA from '@/components/sections/FinalCTA';
import Footer from '@/components/sections/Footer';

export default function Page() {
  return (
    <>
      <Nav />
      <Hero />
      <BigProblem />
      <Reframe />
      <IrkingPains />
      <UniqueMechanism />
      <FeaturesAndBenefits />
      <QuantifiableOutcome />
      <RiskReversal />
      <SocialProof />
      <FAQ />
      <FinalCTA />
      <Footer />
    </>
  );
}
