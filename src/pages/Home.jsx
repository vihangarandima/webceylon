import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CASE_STUDIES, SERVICES, METHODOLOGY_PHASES } from '../data/siteData';
import CaseStudyModal from '../components/CaseStudyModal';
import { ArrowUpRight, CheckCircle2, Shield, Zap, Sparkles, Layers, Award, Flame } from 'lucide-react';

export default function Home() {
  const [selectedStudy, setSelectedStudy] = useState(null);

  return (
    <div className="min-h-screen">
      
      {/* ========================================================= */}
      {/* VIBRANT CEYLON SUNSET HERO SECTION                        */}
      {/* ========================================================= */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden border-b border-white/10 ceylon-sunset-canvas">
        
        {/* Glowing Auroras */}
        <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-[#f97316]/25 via-[#eab308]/20 to-transparent rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-[#0ea5e9]/15 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-[1680px] mx-auto px-4 md:px-12 relative z-10">
          
          {/* Top Pill / Cultural Badge */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/40 shadow-lg shadow-[#f97316]/10 backdrop-blur-md">
              <Flame className="w-4 h-4 text-[#f97316] animate-bounce" />
              <span className="font-space text-xs uppercase tracking-widest text-[#fb923c] font-bold">
                Authentic Ceylon Craftsmanship × High-Performance Digital
              </span>
            </div>
            <span className="font-space text-xs text-[#94a3b8] uppercase tracking-wider font-semibold hidden sm:inline">
              Colombo Studio • Crafting Digital Pavilions Worldwide
            </span>
          </div>

          {/* Hero Grid with Real Sri Lankan Masks and Modern Copy */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <h1 className="font-syne text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
                Bespoke Digital Systems <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#fbbf24] to-[#10b981]">
                  Rooted in Ceylon,
                </span> <br />
                Built to Dominate.
              </h1>

              <p className="font-jakarta text-lg sm:text-xl text-[#cbd5e1] max-w-2xl leading-relaxed font-normal">
                Neither plain black nor dull white. We merge the vibrant soul of centuries-old Sri Lankan wood-carving artistry with high-octane React architectures, sub-second edge speeds, and flawless modern aesthetics.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#c2410c] hover:opacity-95 text-white font-space text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-xl shadow-[#f97316]/30 hover:scale-105"
                >
                  <span>Initiate Consultation</span>
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                
                <Link
                  to="/case-studies"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/20 text-white font-space text-sm font-bold uppercase tracking-wider transition-all backdrop-blur-md"
                >
                  <span>Explore 2026 Archive (Yamu, Caltea...)</span>
                  <ArrowUpRight className="w-4 h-4 text-[#f97316]" />
                </Link>
              </div>

              {/* Trust & Convenience highlights */}
              <div className="pt-6 flex flex-wrap items-center gap-6 text-xs font-jakarta text-[#cbd5e1] font-medium">
                <span className="flex items-center gap-2 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
                  Sub-1s Mobile Core Vitals
                </span>
                <span className="flex items-center gap-2 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#f97316]" />
                  Zero Cookie-Cutter Templates
                </span>
                <span className="flex items-center gap-2 bg-white/5 px-3.5 py-1.5 rounded-xl border border-white/10 backdrop-blur-xs">
                  <CheckCircle2 className="w-4 h-4 text-[#fbbf24]" />
                  100% Sovereign Code Ownership
                </span>
              </div>
            </div>

            {/* Right Side: Authentic Sri Lankan Wooden Masks Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#172033]/90 to-[#0e1424]/90 p-5 shadow-2xl backdrop-blur-xl group">
                
                {/* Visual Header */}
                <div className="flex items-center justify-between pb-4 px-2 border-b border-white/10 text-xs font-space">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#f97316] animate-ping"></span>
                    <span className="text-white font-bold uppercase">The Ceylon Spirit</span>
                  </div>
                  <span className="text-[#f97316] uppercase font-bold tracking-wider">Gurulu & Mayura Raksha</span>
                </div>

                {/* Mask Collage Showcase */}
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080c16] relative aspect-[4/5] shadow-lg group/card">
                    <img
                      src="/masks/gurulu_raksha_mask.jpg"
                      alt="Gurulu Raksha Authentic Sri Lankan Mask"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-transparent flex flex-col justify-end p-4">
                      <span className="font-space text-[10px] text-[#fbbf24] uppercase font-bold">Traditional Wood Carving</span>
                      <span className="font-syne text-sm font-bold text-white leading-tight">Gurulu Raksha Mask</span>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#080c16] relative aspect-[4/5] shadow-lg group/card">
                    <img
                      src="/masks/ceylon_masks_gallery.jpg"
                      alt="Traditional Sri Lankan Masks Collection"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e18] via-transparent to-transparent flex flex-col justify-end p-4">
                      <span className="font-space text-[10px] text-[#38bdf8] uppercase font-bold">Island Living Art</span>
                      <span className="font-syne text-sm font-bold text-white leading-tight">Mayura & Kolam Craft</span>
                    </div>
                  </div>
                </div>

                {/* Cultural Quote Footer */}
                <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-[#f97316]/15 via-[#eab308]/10 to-transparent border border-[#f97316]/20 flex items-center justify-between">
                  <div className="text-xs font-jakarta text-[#fdba74]">
                    <span className="font-bold text-white">Ceylon Soul:</span> Handcrafted artisan intensity meets modern digital precision.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Metrics Bar with Sunset Glass Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/10">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="font-syne text-3xl md:text-4xl font-extrabold text-white">100%</div>
              <div className="font-space text-xs text-[#94a3b8] uppercase tracking-wider mt-1 font-semibold">Lighthouse Speed</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="font-syne text-3xl md:text-4xl font-extrabold text-[#f97316]">0 Templates</div>
              <div className="font-space text-xs text-[#94a3b8] uppercase tracking-wider mt-1 font-semibold">100% Bespoke Code</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="font-syne text-3xl md:text-4xl font-extrabold text-[#fbbf24]">3.4x</div>
              <div className="font-space text-xs text-[#94a3b8] uppercase tracking-wider mt-1 font-semibold">Average Conversion Lift</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-lg">
              <div className="font-syne text-3xl md:text-4xl font-extrabold text-[#10b981]">Sub-50ms</div>
              <div className="font-space text-xs text-[#94a3b8] uppercase tracking-wider mt-1 font-semibold">Edge Server Latency</div>
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
            <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block mb-2">
              Featured Client Case Studies
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
              Architectures of Distinction
            </h2>
          </div>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 font-space text-xs uppercase font-bold text-[#fb923c] hover:underline"
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
              className="group cursor-pointer rounded-3xl ceylon-card-glow overflow-hidden flex flex-col"
            >
              {/* Card Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0a0e1a]">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-[#0c101c]/80 backdrop-blur-md border border-white/10 text-[11px] font-space text-[#38bdf8] font-bold uppercase tracking-wider shadow-sm">
                    {study.category}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="font-space text-[10px] text-[#fbbf24] uppercase tracking-wider block mb-1 font-bold">
                    {study.badge}
                  </span>
                  <h3 className="font-syne text-xl font-bold text-white group-hover:text-[#f97316] transition-colors leading-snug">
                    {study.title}
                  </h3>
                </div>

                {/* Primary Metric Preview */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-syne text-xl font-bold text-[#10b981]">
                      {study.metrics[0].value}
                    </span>
                    <span className="font-space text-[10px] text-[#94a3b8] uppercase ml-2 font-semibold">
                      {study.metrics[0].label}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-white/10 group-hover:bg-[#f97316] group-hover:text-white text-white border border-white/10 transition-all shadow-sm">
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
      <section className="py-24 bg-[#090d17] border-y border-white/10">
        <div className="max-w-[1680px] mx-auto px-4 md:px-12">
          
          <div className="max-w-3xl mb-16 space-y-4">
            <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
              Core Capabilities
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
              Engineered for High-Growth Brands
            </h2>
            <p className="font-jakarta text-[#94a3b8] text-base">
              Transparent investments, predictable sprints, and clean codebases you own completely forever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="p-8 md:p-10 rounded-3xl bg-[#111728] border border-white/10 hover:border-[#f97316]/50 transition-all flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-space text-xs text-[#10b981] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-[#10b981]/15 border border-[#10b981]/30">
                      {srv.tag}
                    </span>
                    <span className="font-space text-xs text-[#fbbf24] uppercase font-bold">
                      {srv.timeline}
                    </span>
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-white">
                    {srv.title}
                  </h3>
                  <p className="font-jakarta text-sm text-[#cbd5e1] leading-relaxed">
                    {srv.description}
                  </p>
                  
                  <div className="space-y-2.5 pt-2">
                    {srv.features.slice(0, 3).map((f, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#e2e8f0] font-jakarta font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="font-space text-xs text-[#94a3b8] uppercase block font-medium">Starting Investment</span>
                    <span className="font-syne text-2xl font-bold text-white">{srv.price}</span>
                  </div>
                  <Link
                    to="/contact"
                    className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-[#f97316] hover:text-white border border-white/20 text-xs font-space font-bold uppercase text-white transition-all shadow-sm"
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
            <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block mb-2">
              Rigorous Methodology
            </span>
            <h2 className="font-syne text-3xl md:text-5xl font-extrabold text-white">
              How Exceptional Websites Are Built
            </h2>
          </div>
          <Link
            to="/process"
            className="inline-flex items-center gap-2 font-space text-xs uppercase font-bold text-[#fb923c] hover:underline"
          >
            <span>Learn More About Our Process</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {METHODOLOGY_PHASES.map((phase) => (
            <div
              key={phase.step}
              className="p-6 rounded-2xl bg-[#111728] border border-white/10 space-y-4 hover:border-[#f97316]/50 transition-all shadow-lg"
            >
              <div className="font-space text-2xl font-extrabold text-[#f97316]">
                {phase.step}
              </div>
              <h4 className="font-syne text-base font-bold text-white">
                {phase.name}
              </h4>
              <span className="font-space text-[11px] text-[#10b981] font-bold uppercase tracking-wider block">
                {phase.duration}
              </span>
              <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================= */}
      {/* DIRECT HOTLINE & CONSULTATION BANNER                      */}
      {/* ========================================================= */}
      <section className="py-24 bg-gradient-to-b from-[#111728] via-[#0d1322] to-[#070b14] border-t border-white/10 relative overflow-hidden">
        
        {/* Glow behind call box */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-[#f97316]/20 via-[#eab308]/15 to-[#10b981]/15 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f97316]/15 border border-[#f97316]/40 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
            <span className="font-space text-xs uppercase tracking-widest text-[#fb923c] font-bold">
              Instant Scoping & Direct Advisory
            </span>
          </div>

          <h2 className="font-syne text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            Speak Directly with our Lead Digital Architect.
          </h2>

          <p className="font-jakarta text-[#cbd5e1] text-base md:text-lg max-w-2xl mx-auto">
            Skip the generic quote waitlist. Call or message us directly on our official studio hotline for an immediate scoping estimate and technical roadmap.
          </p>

          {/* Prominent Direct Contact Hotline Box */}
          <div className="p-8 md:p-10 rounded-3xl bg-[#151f36]/90 border border-[#f97316]/40 shadow-2xl backdrop-blur-xl max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
              <span className="font-space text-xs text-[#94a3b8] uppercase tracking-widest block font-semibold">
                Direct Studio Hotline / WhatsApp
              </span>
              <a 
                href="tel:0702434288" 
                className="block font-syne text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#fbbf24] to-[#f8fafc] hover:opacity-90 tracking-wide transition-opacity"
              >
                070 243 4288
              </a>
              <span className="font-space text-xs text-[#10b981] uppercase font-bold tracking-wider block pt-1">
                • Available Now • Colombo IST
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <a
                href="tel:0702434288"
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#f97316]/30 hover:scale-105 transition-all"
              >
                <span>Call 070 243 4288</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/94702434288?text=Hello%20WEB%20CEYLON,%20I%20would%20like%20to%20discuss%20a%20website%20project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0c101c] font-space text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#25D366]/25 hover:scale-105 transition-all"
              >
                <span>Message on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="pt-2">
            <Link
              to="/contact"
              className="font-space text-xs text-[#94a3b8] hover:text-white uppercase tracking-wider underline transition-colors"
            >
              Prefer submitting a formal RFP dossier? Click here to fill the project form →
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
