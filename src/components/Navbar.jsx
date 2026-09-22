import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Clock, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [colomboTime, setColomboTime] = useState('');
  const location = useLocation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setColomboTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Selected Work', path: '/' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Services & Pricing', path: '/services' },
    { name: '5-Phase Process', path: '/process' },
    { name: 'Heritage & Vision', path: '/heritage-and-vision' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-nav-sunset">
      <div className="max-w-[1680px] mx-auto px-4 md:px-12 h-20 flex items-center justify-between">
        
        {/* Brandmark / Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img 
            src="/assets/brandmark.svg" 
            alt="WEB CEYLON Logo" 
            className="h-8 md:h-9 w-auto object-contain transition-transform group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3.5 py-2 rounded-xl text-xs font-space tracking-wider uppercase transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-gradient-to-r from-[#f97316]/20 to-[#eab308]/20 text-[#f97316] font-bold border border-[#f97316]/40 shadow-sm'
                  : 'text-[#94a3b8] hover:text-[#f8fafc] hover:bg-white/5 font-medium'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Live Colombo Time & Direct Hotline Action */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:0702434288"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-[#f97316]/20 border border-white/10 hover:border-[#f97316]/50 text-white font-space text-xs tracking-wider transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[#94a3b8]">Hotline:</span>
            <span className="font-bold text-[#f97316]">070 243 4288</span>
          </a>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Clock className="w-3.5 h-3.5 text-[#f97316]" />
            <span className="font-space text-xs text-[#cbd5e1] tracking-wider uppercase">
              {colomboTime} <span className="text-[#f97316] font-bold">IST</span>
            </span>
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#c2410c] hover:opacity-95 text-white font-space text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#f97316]/25 hover:shadow-xl hover:scale-105"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2.5 rounded-xl bg-white/10 border border-white/10 text-white focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-white/10 bg-[#0c101c] px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f97316] animate-pulse"></span>
              <span className="font-space text-xs text-[#cbd5e1] tracking-wider uppercase">
                Colombo {colomboTime} IST
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-space uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#f97316]/20 text-[#f97316] font-bold border border-[#f97316]/30'
                    : 'text-[#94a3b8] hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-sm font-bold uppercase tracking-wider shadow-lg"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
