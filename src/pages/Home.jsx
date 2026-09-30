import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ScrollTrigger } from '../lib/motion';
import { useScroll } from '../components/ui/SmoothScroll';
import Hero from '../components/hero/Hero';
import Statement from '../components/statement/Statement';
import Work from '../components/portfolio/Work';
import Services from '../components/services/Services';
import About from '../components/about/About';
import Technology from '../components/technology/Technology';
import Process from '../components/process/Process';
import Contact from '../components/contact/Contact';

export default function Home({ ready }) {
  const { hash } = useLocation();
  const { scrollTo } = useScroll();

  // Arriving at /#work (from a case study, or an old /services link):
  // wait for pins to measure, then go straight there.
  useEffect(() => {
    if (!ready || !hash) return;
    const id = setTimeout(() => {
      ScrollTrigger.refresh();
      scrollTo(hash, { immediate: true });
    }, 60);
    return () => clearTimeout(id);
  }, [ready, hash, scrollTo]);

  return (
    <>
      <Hero ready={ready} />
      <Statement />
      <Work />
      <Services />
      <About />
      <Technology />
      <Process />
      <Contact />
    </>
  );
}
