import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export default function HeritageAndVision() {
  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
          Ethos & Studio Philosophy
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white">
          Geoffrey Bawa’s Spirit in Digital Geometry.
        </h1>
        <p className="font-jakarta text-[#94a3b8] text-base md:text-lg leading-relaxed">
          Sri Lanka’s world-renowned architectural pioneer taught the world how spaces should breathe, blend effortlessly with their environment, and stand as timeless monuments. We bring that exact doctrine to modern internet architecture.
        </p>
      </div>

      {/* Narrative grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        <div className="lg:col-span-6 space-y-6 text-[#cbd5e1] font-jakarta leading-relaxed text-base">
          <h2 className="font-syne text-2xl md:text-3xl font-bold text-white">
            Rejecting the Template Industrial Complex
          </h2>
          <p>
            The internet today has become generic. Companies spend millions on brand identity, only to squeeze their products into repetitive, bloated WordPress themes and cookie-cutter Webflow templates that look indistinguishable from their competitors.
          </p>
          <p>
            At <strong className="text-[#f97316]">WEB CEYLON</strong>, we believe every business with a real product deserves a bespoke digital pavilion. We combine the craftsmanship of Sri Lankan stone masons, wood-carvers, and tropical modern architects with Silicon Valley-grade React, edge CDNs, and micro-animations.
          </p>
          <p>
            The result? Digital storefronts and platforms that command immediate authority, double conversion rates, and stand as permanent assets on your balance sheet.
          </p>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 rounded-3xl bg-[#111728] border border-white/10 space-y-4 shadow-xl">
            <span className="font-space text-xs uppercase tracking-widest text-[#fbbf24] font-bold block">
              Principle I
            </span>
            <h3 className="font-syne text-xl font-bold text-white">Breathe With Nature & Screen</h3>
            <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
              Every layout is balanced between empty space (the breath) and sharp density (the stone). Users never feel claustrophobic or bombarded by clutter.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111728] border border-white/10 space-y-4 shadow-xl">
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-bold block">
              Principle II
            </span>
            <h3 className="font-syne text-xl font-bold text-white">Obsession with Raw Speed</h3>
            <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
              True luxury is instantaneous. No visitor should ever see a spinning preloader for more than 400 milliseconds. We code with zero runtime waste.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-[#111728] border border-white/10 space-y-4 shadow-xl">
            <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
              Principle III
            </span>
            <h3 className="font-syne text-xl font-bold text-white">Zero Agency Intermediaries</h3>
            <p className="font-jakarta text-xs text-[#94a3b8] leading-relaxed">
              When you hire WEB CEYLON, you speak and build directly with principal engineers in Colombo who know every single line of code in your repo.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-white/10">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-xs font-bold uppercase tracking-wider transition-all shadow-lg shadow-[#f97316]/25 hover:scale-105"
        >
          <span>Commence Dialogue</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
