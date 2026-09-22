import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d0e0f] border-t border-[#1f2328] pt-20 pb-12">
      <div className="max-w-[1680px] mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#1f2328]">
          
          {/* Col 1: Studio info */}
          <div className="lg:col-span-5 space-y-5">
            <div className="flex items-center gap-3">
              <img 
                src="/assets/brandmark.svg" 
                alt="WEB CEYLON" 
                className="h-8 w-auto object-contain"
              />
            </div>
            <p className="font-jakarta text-sm text-[#a1a1aa] max-w-md leading-relaxed">
              Digital Experiences, Crafted in Ceylon. Engineered around high-growth businesses and discerning founders worldwide. Inspired by Geoffrey Bawa architectural digital modernism.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2 text-[#a1a1aa]">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1c1d] border border-[#1f2328] text-xs font-space uppercase">
                <span className="w-2 h-2 rounded-full bg-[#10b981]"></span>
                Colombo 07, Sri Lanka
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1b1c1d] border border-[#1f2328] text-xs font-space uppercase text-[#10b981]">
                UTC+5:30 (IST)
              </span>
            </div>
          </div>

          {/* Col 2: Architecture */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-space text-xs text-[#a1a1aa] uppercase tracking-widest block font-semibold">
              Architecture
            </span>
            <div className="flex flex-col space-y-2.5">
              <Link to="/" className="font-jakarta text-xs text-[#f4f4f5] hover:text-[#10b981] transition-colors">
                Selected Work
              </Link>
              <Link to="/case-studies" className="font-jakarta text-xs text-[#f4f4f5] hover:text-[#10b981] transition-colors">
                Case Studies Archive
              </Link>
              <Link to="/services" className="font-jakarta text-xs text-[#f4f4f5] hover:text-[#10b981] transition-colors">
                Services & Investment
              </Link>
            </div>
          </div>

          {/* Col 3: Ethos */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-space text-xs text-[#a1a1aa] uppercase tracking-widest block font-semibold">
              Ethos & Studio
            </span>
            <div className="flex flex-col space-y-2.5">
              <Link to="/heritage-and-vision" className="font-jakarta text-xs text-[#f4f4f5] hover:text-[#10b981] transition-colors">
                Heritage & Vision
              </Link>
              <Link to="/process" className="font-jakarta text-xs text-[#f4f4f5] hover:text-[#10b981] transition-colors">
                5-Phase Methodology
              </Link>
              <Link to="/contact" className="font-jakarta text-xs text-[#f4f4f5] hover:text-[#10b981] transition-colors">
                Commence Project
              </Link>
            </div>
          </div>

          {/* Col 4: Dispatch & Social */}
          <div className="lg:col-span-3 space-y-4">
            <span className="font-space text-xs text-[#a1a1aa] uppercase tracking-widest block font-semibold">
              Dispatch & Network
            </span>
            <div className="flex flex-wrap gap-2">
              {['LinkedIn', 'Instagram', 'X (Twitter)', 'GitHub'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="font-space text-xs uppercase px-3 py-1.5 rounded-lg bg-[#1b1c1d] border border-[#1f2328] text-[#f4f4f5] hover:bg-[#10b981] hover:text-[#08090a] transition-all flex items-center gap-1"
                >
                  <span>{social}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              ))}
            </div>
            <p className="font-jakarta text-xs text-[#71717a] pt-2">
              Inquiries: <span className="text-[#10b981]">architecture@webceylon.com</span>
            </p>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-space text-xs text-[#a1a1aa]">
            © {new Date().getFullYear()} WEB CEYLON Digital Studio. All rights reserved.
          </p>
          <p className="font-space text-xs text-[#71717a] uppercase tracking-wider">
            Tropical Modernism In Digital Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
