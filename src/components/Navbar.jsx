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
    <header className="sticky top-0 z-50 w-full glass-nav border-b border-[#1f2328]">
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
              className={`px-3.5 py-2 rounded-lg text-xs font-space tracking-wider uppercase transition-all duration-200 ${
                isActive(link.path)
                  ? 'bg-[#1b1c1d] text-[#10b981] border border-[#1f2328] font-semibold'
                  : 'text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#121315]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Live Colombo Time & Action CTA */}
        <div className="hidden md:flex items-center gap-5">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#121315] border border-[#1f2328]">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            <Clock className="w-3.5 h-3.5 text-[#10b981]" />
            <span className="font-space text-xs text-[#a1a1aa] tracking-widest uppercase">
              Colombo {colomboTime} <span className="text-[#10b981]">IST</span>
            </span>
          </div>

          <Link
            to="/contact"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-lg shadow-[#10b981]/20 hover:shadow-[#10b981]/40"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="lg:hidden p-2 rounded-lg bg-[#1b1c1d] border border-[#1f2328] text-[#f4f4f5] hover:text-[#10b981] focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden border-b border-[#1f2328] bg-[#0d0e0f] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-[#1f2328]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
              <span className="font-space text-xs text-[#a1a1aa] tracking-wider uppercase">
                Colombo {colomboTime} IST
              </span>
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 rounded-xl text-sm font-space uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'bg-[#1b1c1d] text-[#10b981] border border-[#1f2328] font-bold'
                    : 'text-[#a1a1aa] hover:bg-[#121315] hover:text-[#f4f4f5]'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <Link
            to="/contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[#10b981] text-[#08090a] font-space text-sm font-bold uppercase tracking-wider"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
