import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { ThemeProvider } from './lib/theme';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Works from './pages/Works';
import CaseStudy from './pages/CaseStudy';

// New page: start at the top. A /#section link: go to that section once the
// page has rendered.
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    const id = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' }), 60);
    return () => clearTimeout(id);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <ThemeProvider>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Works />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          {/* The previous site's pages, so old links still land somewhere sensible */}
          <Route path="/case-studies" element={<Navigate to="/works" replace />} />
          <Route path="/services" element={<Navigate to="/#services" replace />} />
          <Route path="/process" element={<Navigate to="/#approach" replace />} />
          <Route path="/heritage-and-vision" element={<Navigate to="/#intro" replace />} />
          <Route path="/contact" element={<Navigate to="/#contact" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
