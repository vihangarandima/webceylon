import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#080c16] border-t border-white/10 pt-20 pb-12 text-white">
      <div className="max-w-[1680px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Col 1: Studio info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/brandmark.svg" 
                alt="WEB CEYLON" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="font-jakarta text-sm text-[#94a3b8] max-w-md leading-relaxed">
              Digital Experiences, Crafted in Ceylon. Engineered around high-growth businesses and discerning founders worldwide. Inspired by Geoffrey Bawa architectural digital modernism.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[#94a3b8]">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-space uppercase font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                Boralasgamuwa, Colombo, Sri Lanka
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-space uppercase font-bold text-[#f97316]">
                UTC+5:30 (IST)
              </span>
            </div>
          </div>

          {/* Col 2: Architecture */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-space text-xs text-white uppercase tracking-widest block font-bold">
              Architecture
            </span>
            <div className="flex flex-col space-y-2.5">
              <Link to="/" className="font-jakarta text-xs text-[#94a3b8] hover:text-[#f97316] font-medium transition-colors">
                Selected Work
              </Link>
              <Link to="/case-studies" className="font-jakarta text-xs text-[#94a3b8] hover:text-[#f97316] font-medium transition-colors">
                Case Studies Archive
              </Link>
              <Link to="/services" className="font-jakarta text-xs text-[#94a3b8] hover:text-[#f97316] font-medium transition-colors">
                Services & Investment
              </Link>
            </div>
          </div>

          {/* Col 3: Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-space text-xs text-white uppercase tracking-widest block font-bold">
              Ethos & Studio
            </span>
            <div className="flex flex-col space-y-2.5">
              <Link to="/heritage-and-vision" className="font-jakarta text-xs text-[#94a3b8] hover:text-[#f97316] font-medium transition-colors">
                Heritage & Vision
              </Link>
              <Link to="/process" className="font-jakarta text-xs text-[#94a3b8] hover:text-[#f97316] font-medium transition-colors">
                5-Phase Methodology
              </Link>
              <Link to="/contact" className="font-jakarta text-xs text-[#94a3b8] hover:text-[#f97316] font-medium transition-colors">
                Commence Project
              </Link>
            </div>
          </div>

          {/* Col 4: Dispatch & Social */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-space text-xs text-white uppercase tracking-widest block font-bold">
              Dispatch & Network
            </span>
            <div className="flex flex-wrap gap-2">
              {['LinkedIn', 'Instagram', 'X (Twitter)', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-space text-xs uppercase px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-[#f97316] hover:border-[#f97316] transition-all flex items-center gap-1 shadow-sm"
                >
                  <span>{social}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
            <p className="font-jakarta text-xs text-[#94a3b8] pt-2">
              Hotline: <a href="tel:0702434288" className="text-[#f97316] font-bold hover:underline">070 243 4288</a>
            </p>
            <p className="font-jakarta text-xs text-[#94a3b8]">
              Email: <a href="mailto:vihangarandima8@gmail.com" className="text-white hover:text-[#f97316] font-medium transition-colors">vihangarandima8@gmail.com</a>
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-space text-xs text-[#94a3b8]">
            © {new Date().getFullYear()} WEB CEYLON Digital Studio. All rights reserved.
          </p>
          <p className="font-space text-xs text-[#94a3b8] uppercase tracking-wider font-semibold">
            Tropical Modernism In Digital Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
