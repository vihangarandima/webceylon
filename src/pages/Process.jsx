import React from 'react';
import { Link } from 'react-router-dom';
import { METHODOLOGY_PHASES } from '../data/siteData';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function Process() {
  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
          5-Phase Architectural Methodology
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white">
          Predictable Precision, Zero Guesswork.
        </h1>
        <p className="font-jakarta text-[#94a3b8] text-base md:text-lg leading-relaxed">
          Most web projects slip deadlines because they lack architectural discipline. We apply rigorous engineering milestones borrowed from civil construction and aerospace systems.
        </p>
      </div>

      {/* Step by Step Breakdown */}
      <div className="space-y-6 mb-20">
        {METHODOLOGY_PHASES.map((phase) => (
          <div
            key={phase.step}
            className="p-8 md:p-10 rounded-3xl bg-[#111728] border border-white/10 hover:border-[#f97316]/50 transition-all grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl"
          >
            <div className="lg:col-span-2 flex items-center gap-4">
              <span className="font-space text-4xl sm:text-5xl font-extrabold text-[#f97316]">
                {phase.step}
              </span>
              <div className="lg:hidden h-8 w-px bg-white/10"></div>
              <span className="lg:hidden font-space text-xs text-[#10b981] font-bold uppercase">
                {phase.duration}
              </span>
            </div>

            <div className="lg:col-span-7 space-y-2">
              <span className="hidden lg:inline-block font-space text-xs text-[#10b981] uppercase tracking-wider font-bold">
                {phase.duration}
              </span>
              <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-white">
                {phase.name}
              </h2>
              <p className="font-jakarta text-sm text-[#cbd5e1] leading-relaxed max-w-2xl">
                {phase.description}
              </p>
            </div>

            <div className="lg:col-span-3 flex justify-start lg:justify-end">
              <div className="px-4 py-2 rounded-xl bg-[#10b981]/15 border border-[#10b981]/30 font-space text-xs font-bold uppercase text-[#10b981] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Deliverable Milestone</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Philosophy Banner */}
      <div className="p-8 md:p-12 rounded-3xl bg-gradient-to-r from-[#111728] via-[#161f36] to-[#111728] border border-white/10 text-center max-w-4xl mx-auto space-y-6 shadow-2xl">
        <h3 className="font-syne text-2xl md:text-3xl font-extrabold text-white">
          Ready to experience frictionless digital execution?
        </h3>
        <p className="font-jakarta text-sm text-[#cbd5e1] max-w-xl mx-auto">
          We only take on three client builds concurrently to guarantee total partner attention and zero junior developer delegation.
        </p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#f97316]/25 hover:scale-105"
        >
          <span>Reserve Next Sprint Slot</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
