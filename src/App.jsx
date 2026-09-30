import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ScrollTrigger } from './lib/motion';
import { SmoothScroll } from './components/ui/SmoothScroll';
import { PageTransitionProvider } from './components/ui/PageTransition';
import Loader from './components/ui/Loader';
import Cursor from './components/ui/Cursor';
import Nav from './components/navigation/Nav';
import Home from './pages/Home';
import CaseStudy from './components/projects/CaseStudy';

// Pins are measured against the page as it was; re-measure after every route
// change and once late images have settled.
function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0);
    const a = setTimeout(() => ScrollTrigger.refresh(), 100);
    const b = setTimeout(() => ScrollTrigger.refresh(), 1200);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [pathname, hash]);
  return null;
}

export default function App() {
  const [ready, setReady] = useState(false);
  const onLoaded = useCallback(() => setReady(true), []);

  return (
    <SmoothScroll>
      <PageTransitionProvider>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Loader onDone={onLoaded} />
        <Cursor />
        <Nav />
        <RouteEffects />
        <main id="main">
          <Routes>
            <Route path="/" element={<Home ready={ready} />} />
            <Route path="/work/:slug" element={<CaseStudy />} />
            {/* The previous site's pages, so old links still land somewhere sensible */}
            <Route path="/case-studies" element={<Navigate to="/#work" replace />} />
            <Route path="/services" element={<Navigate to="/#services" replace />} />
            <Route path="/process" element={<Navigate to="/#process" replace />} />
            <Route path="/heritage-and-vision" element={<Navigate to="/#about" replace />} />
            <Route path="/contact" element={<Navigate to="/#contact" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <div className="grain" aria-hidden="true" />
      </PageTransitionProvider>
    </SmoothScroll>
  );
}
