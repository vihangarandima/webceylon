import React from 'react';
import { Link } from 'react-router-dom';
import { METHODOLOGY_PHASES } from '../data/siteData';
import { ArrowUpRight, CheckCircle2, Shield, Terminal, Zap, Layers } from 'lucide-react';

export default function Process() {
  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block">
          5-Phase Architectural Methodology
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-[#f4f4f5]">
          Predictable Precision, Zero Guesswork.
        </h1>
        <p className="font-jakarta text-[#a1a1aa] text-base md:text-lg leading-relaxed">
          Most web projects slip deadlines because they lack architectural discipline. We apply rigorous engineering milestones borrowed from civil construction and aerospace systems.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-8 mb-20">
        {METHODOLOGY_PHASES.map((phase, idx) => (
          <div
            key={phase.step}
            className="p-8 md:p-10 rounded-2xl bg-[#121315] border border-[#1f2328] hover:border-[#10b981]/50 transition-colors grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-2 flex items-center gap-4">
              <span className="font-space text-4xl sm:text-5xl font-extrabold text-[#10b981]">
                {phase.step}
              </span>
              <div className="lg:hidden h-8 w-px bg-[#1f2328]"></div>
              <span className="lg:hidden font-space text-xs text-[#d4af37] uppercase">
                {phase.duration}
              </span>
            </div>

            <div className="lg:col-span-7 space-y-2">
              <span className="hidden lg:inline-block font-space text-xs text-[#d4af37] uppercase tracking-wider font-semibold">
                {phase.duration}
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#f4f4f5]">
                {phase.name}
              </h2>
              <p className="font-jakarta text-sm text-[#a1a1aa] leading-relaxed max-w-2xl">
                {phase.description}
              </p>
            </div>

            <div className="lg:col-span-3 flex justify-start lg:justify-end">
              <div className="px-4 py-2 rounded-xl bg-[#1b1c1d] border border-[#1f2328] font-space text-xs uppercase text-[#10b981] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Deliverable Milestone</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy Banner */}
      <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-r from-[#0d0e0f] via-[#121315] to-[#0d0e0f] border border-[#1f2328] text-center max-w-4xl mx-auto space-y-6">
        <h3 className="font-syne text-2xl md:text-3xl font-bold text-[#f4f4f5]">
          Ready to experience frictionless digital execution?
        </h3>
        <p className="font-jakarta text-sm text-[#a1a1aa] max-w-xl mx-auto">
          We only take on three client builds concurrently to guarantee total partner attention and zero junior developer delegation.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#10b981]/20"
        >
          <span>Reserve Next Sprint Slot</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
