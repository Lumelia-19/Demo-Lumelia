import { AboutSection } from '@/components/AboutSection';
import { ContactSection } from '@/components/ContactSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { Hero } from '@/components/Hero';
import { MetricStrip } from '@/components/MetricStrip';
import { SecuritySection } from '@/components/SecuritySection';
import { WorkSection } from '@/components/WorkSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <MetricStrip />
      <WorkSection />
      <SecuritySection />
      <ExperienceSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
