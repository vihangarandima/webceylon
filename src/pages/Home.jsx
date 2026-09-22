import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES, SERVICES, METHODOLOGY_PHASES } from '../data/siteData';
import CaseStudyModal from '../components/CaseStudyModal';
import { ArrowUpRight, CheckCircle2, Shield, Zap, Sparkles, Layers, Award, Terminal } from 'lucide-react';

export default function Home() {
  const [selectedStudy, setSelectedStudy] = useState(null);

  return (
    <div className="min-h-screen">
      
      {/* ========================================================= */}
      {/* HERO SECTION                                              */}
      {/* ========================================================= */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden border-b border-[#1f2328]">
        {/* Background Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#10b981]/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-[#d4af37]/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-[1680px] mx-auto px-4 md:px-12 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1b1c1d] border border-[#1f2328] mb-8">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold">
              Colombo Digital Architecture Studio
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8 space-y-6">
              <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[#f4f4f5] leading-[1.08]">
                Bespoke Websites & Digital Systems <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#10b981] to-[#4edea3]">Worth Showing Off.</span>
              </h1>
              <p className="font-jakarta text-lg sm:text-xl text-[#a1a1aa] max-w-2xl leading-relaxed font-normal">
                We craft museum-grade web architectures, ultra-scalable e-commerce engines, and high-performance bespoke digital platforms for founders who refuse generic templates.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-4">
              <Link
                to="/contact"
                className="flex items-center justify-between p-5 rounded-2xl bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#10b981]/20"
              >
                <span>Initiate Consultation</span>
                <ArrowUpRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/case-studies"
                className="flex items-center justify-between p-5 rounded-2xl bg-[#121315] hover:bg-[#1b1c1d] border border-[#1f2328] text-[#f4f4f5] font-space text-sm uppercase tracking-wider transition-colors"
              >
                <span>Explore 2026 Archive</span>
                <ArrowUpRight className="w-5 h-5 text-[#a1a1aa]" />
              </Link>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-[#1f2328]">
            <div>
              <div className="font-syne text-3xl md:text-4xl font-bold text-[#f4f4f5]">100%</div>
              <div className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider mt-1">Lighthouse Performance</div>
            </div>
            <div>
              <div className="font-syne text-3xl md:text-4xl font-bold text-[#10b981]">0 Templates</div>
              <div className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider mt-1">100% Bespoke Code</div>
            </div>
            <div>
              <div className="font-syne text-3xl md:text-4xl font-bold text-[#d4af37]">3.4x</div>
              <div className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider mt-1">Avg Client Conversion Lift</div>
            </div>
            <div>
              <div className="font-syne text-3xl md:text-4xl font-bold text-[#06b6d4]">Sub-50ms</div>
              <div className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider mt-1">Edge Cache Latency</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* SELECTED WORK / PORTFOLIO                                 */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1680px] mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block mb-2">
              Selected Works
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-[#f4f4f5]">
              Architectures of Distinction
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 font-space text-xs uppercase text-[#10b981] hover:underline"
          >
            <span>View Full Archive ({CASE_STUDIES.length} Projects)</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              onClick={() => setSelectedStudy(study)}
              className="group cursor-pointer rounded-2xl bg-[#121315] border border-[#1f2328] hover:border-[#10b981]/50 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#1b1c1d]">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0d0e0f]/80 backdrop-blur-md border border-[#1f2328] text-[11px] font-space text-[#10b981] uppercase tracking-wider">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="font-space text-[10px] text-[#d4af37] uppercase tracking-wider block mb-1">
                    {study.badge}
                  </span>
                  <h3 className="font-syne text-xl font-bold text-[#f4f4f5] group-hover:text-[#10b981] transition-colors leading-snug">
                    {study.title}
                  </h3>
                </div>

                {/* Primary Metric Preview */}
                <div className="pt-4 border-t border-[#1f2328] flex items-center justify-between">
                  <div>
                    <span className="font-syne text-lg font-bold text-[#10b981]">
                      {study.metrics[0].value}
                    </span>
                    <span className="font-space text-[10px] text-[#a1a1aa] uppercase ml-2">
                      {study.metrics[0].label}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#1b1c1d] group-hover:bg-[#10b981] group-hover:text-[#08090a] text-[#f4f4f5] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* SERVICES PREVIEW                                          */}
      {/* ========================================================= */}
      <section className="py-24 bg-[#0d0e0f] border-y border-[#1f2328]">
        <div className="max-w-[1680px] mx-auto px-4 md:px-12">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block">
              Core Capabilities
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-[#f4f4f5]">
              Engineered for Discerning Brands and Ambitious Scalers
            </h2>
            <p className="font-jakarta text-[#a1a1aa] text-base">
              Transparent investments, predictable sprints, and clean codebases you own completely forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-8 rounded-2xl bg-[#121315] border border-[#1f2328] hover:border-[#10b981]/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-space text-xs text-[#10b981] uppercase tracking-wider px-3 py-1 rounded-full bg-[#00422b]/50 border border-[#10b981]/30">
                      {srv.tag}
                    </span>
                    <span className="font-space text-xs text-[#a1a1aa] uppercase">
                      {srv.timeline}
                    </span>
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-[#f4f4f5]">
                    {srv.title}
                  </h3>
                  <p className="font-jakarta text-sm text-[#a1a1aa] leading-relaxed">
                    {srv.description}
                  </p>
                  
                  <div className="space-y-2 pt-2">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#e4e4e7] font-jakarta">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-[#1f2328] flex items-center justify-between">
                  <div>
                    <span className="font-space text-xs text-[#71717a] uppercase block">Starting Investment</span>
                    <span className="font-syne text-xl font-bold text-[#f4f4f5]">{srv.price}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="px-4 py-2 rounded-lg bg-[#1b1c1d] hover:bg-[#10b981] hover:text-[#08090a] text-xs font-space uppercase text-[#f4f4f5] transition-colors"
                  >
                    Select Tier
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================= */}
      {/* 5-PHASE PROCESS TEASER                                     */}
      {/* ========================================================= */}
      <section className="py-24 max-w-[1680px] mx-auto px-4 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block mb-2">
              Rigorous Methodology
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-bold text-[#f4f4f5]">
              How Exceptional Websites Are Built
            </h2>
          </div>
          <Link
            to="/process"
            className="inline-flex items-center gap-2 font-space text-xs uppercase text-[#10b981] hover:underline"
          >
            <span>Learn More About Our Process</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {METHODOLOGY_PHASES.map((phase) => (
            <div
              key={phase.step}
              className="p-6 rounded-2xl bg-[#121315] border border-[#1f2328] space-y-4 hover:border-[#10b981]/40 transition-colors"
            >
              <div className="font-space text-2xl font-bold text-[#10b981]">
                {phase.step}
              </div>
              <h4 className="font-syne text-base font-bold text-[#f4f4f5]">
                {phase.name}
              </h4>
              <span className="font-space text-[11px] text-[#d4af37] uppercase tracking-wider block">
                {phase.duration}
              </span>
              <p className="font-jakarta text-xs text-[#a1a1aa] leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* CTA BANNER                                                */}
      {/* ========================================================= */}
      <section className="py-20 bg-gradient-to-b from-[#0d0e0f] to-[#08090a] border-t border-[#1f2328]">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold">
            Ready To Elevate Your Digital Architecture?
          </span>
          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-[#f4f4f5]">
            Let’s Build Something Worth Showing Off.
          </h2>
          <p className="font-jakarta text-[#a1a1aa] text-base max-w-xl mx-auto">
            Book a confidential scoping conversation directly with our Lead Digital Architect. No junior sales reps.
          </p>
          <div className="pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-sm font-bold uppercase tracking-wider transition-all shadow-xl shadow-[#10b981]/20"
            >
              <span>Schedule Architecture Call</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Active Modal */}
      {selectedStudy && (
        <CaseStudyModal
          study={selectedStudy}
          onClose={() => setSelectedStudy(null)}
        />
      )}

    </div>
  );
}
