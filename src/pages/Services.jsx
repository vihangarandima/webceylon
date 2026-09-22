import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/siteData';
import { CheckCircle2, ArrowUpRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react';

export default function Services() {
  const [selectedPlan, setSelectedPlan] = useState('bespoke-web');

  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
          Transparent Scope & Pricing
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white">
          Architectural Services & Investment Tiers.
        </h1>
        <p className="font-jakarta text-[#94a3b8] text-base md:text-lg leading-relaxed">
          Fixed sprints. Predictable deliverables. Zero hidden agency retainers or markups. Everything is owned 100% by your company.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        {SERVICES.map((srv) => (
          <div
            key={srv.id}
            className={`p-8 md:p-10 rounded-3xl border transition-all flex flex-col justify-between ${
              selectedPlan === srv.id
                ? 'bg-[#151e33] border-[#f97316] shadow-xl shadow-[#f97316]/15'
                : 'bg-[#111728] border-white/10 hover:border-[#f97316]/50 shadow-lg'
            }`}
            onClick={() => setSelectedPlan(srv.id)}
          >
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="font-space text-xs text-[#10b981] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30">
                  {srv.tag}
                </span>
                <span className="font-space text-xs text-[#fbbf24] uppercase font-bold">
                  {srv.timeline}
                </span>
              </div>

              <div>
                <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-white mb-3">
                  {srv.title}
                </h2>
                <p className="font-jakarta text-sm text-[#cbd5e1] leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <span className="font-space text-xs text-white uppercase tracking-wider font-bold block">
                  What’s Included:
                </span>
                {srv.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#e2e8f0] font-jakarta">
                    <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-1" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="font-space text-xs text-[#94a3b8] uppercase block font-medium">Guaranteed Fixed Pricing</span>
                <span className="font-syne text-2xl md:text-3xl font-extrabold text-white">{srv.price}</span>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#f97316]/20 transition-all hover:scale-105"
              >
                <span>Select & Discuss Scope</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Guarantees Box */}
      <div className="p-8 md:p-12 rounded-3xl bg-[#111728] border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-8 shadow-xl">
        <div className="space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-[#10b981]/15 border border-[#10b981]/30 flex items-center justify-center text-[#10b981]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-syne text-lg font-bold text-white">100% Code Sovereign Ownership</h3>
          <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
            You hold complete copyright and git repository ownership from day one. No vendor lock-in or proprietary hostage code.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-[#f97316]/15 border border-[#f97316]/30 flex items-center justify-center text-[#f97316]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-syne text-lg font-bold text-white">Sub-1 Second Speed Guarantee</h3>
          <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
            Every site we ship meets the stringent 95-100 Google Lighthouse Core Web Vitals standard or we optimize at our own expense.
          </p>
        </div>

        <div className="space-y-3">
          <div className="w-11 h-11 rounded-2xl bg-[#fbbf24]/15 border border-[#fbbf24]/30 flex items-center justify-center text-[#fbbf24]">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="font-syne text-lg font-bold text-white">60-Day Post-Launch Hypercare</h3>
          <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
            Direct slack/phone channel with your lead digital engineer for two months post-launch for fixes, telemetry calibration, and peace of mind.
          </p>
        </div>
      </div>

    </div>
  );
}
