import { Contact } from '@/components/chapters/Contact';
import { Hero } from '@/components/chapters/Hero';
import { Manifesto } from '@/components/chapters/Manifesto';
import { Path } from '@/components/chapters/Path';
import { Principles } from '@/components/chapters/Principles';
import { Security } from '@/components/chapters/Security';
import { Whoami } from '@/components/chapters/Whoami';
import { WorkGallery } from '@/components/chapters/WorkGallery';
import { products } from '@/content/products';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Manifesto />
      <WorkGallery products={products} />
      <Security />
      <Principles />
      <Path />
      <Whoami />
      <Contact />
    </>
  );
}
