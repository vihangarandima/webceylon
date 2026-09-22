import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Compass, Shield, Sparkles } from 'lucide-react';

export default function HeritageAndVision() {
  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block">
          Ethos & Studio Philosophy
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-[#f4f4f5]">
          Geoffrey Bawa’s Spirit in Digital Geometry.
        </h1>
        <p className="font-jakarta text-[#a1a1aa] text-base md:text-lg leading-relaxed">
          Sri Lanka’s world-renowned architectural pioneer taught the world how spaces should breathe, blend effortlessly with their environment, and stand as timeless monuments. We bring that exact doctrine to modern internet architecture.
        </p>
      </div>

      {/* Narrative grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        
        <div className="lg:col-span-6 space-y-6 text-[#e4e4e7] font-jakarta leading-relaxed text-base">
          <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#f4f4f5]">
            Rejecting the Template Industrial Complex
          </h2>
          <p>
            The internet today has become generic. Companies spend millions on brand identity, only to squeeze their products into repetitive, bloated WordPress themes and cookie-cutter Webflow templates that look indistinguishable from their competitors.
          </p>
          <p>
            At <strong className="text-[#10b981]">WEB CEYLON</strong>, we believe every business with a real product deserves a bespoke digital pavilion. We combine the craftsmanship of Sri Lankan stone masons and tropical modern architects with Silicon Valley-grade React, edge CDNs, and micro-animations.
          </p>
          <p>
            The result? Digital storefronts and platforms that command immediate authority, double conversion rates, and stand as permanent assets on your balance sheet.
          </p>
        </div>

        <div className="lg:col-span-6 space-y-6">
          <div className="p-8 rounded-2xl bg-[#121315] border border-[#1f2328] space-y-4">
            <span className="font-space text-xs uppercase tracking-widest text-[#d4af37] font-semibold block">
              Principle I
            </span>
            <h3 className="font-syne text-xl font-bold text-[#f4f4f5]">Breathe With Nature & Screen</h3>
            <p className="font-jakarta text-xs text-[#a1a1aa] leading-relaxed">
              Every layout is balanced between empty space (the breath) and sharp density (the stone). Users never feel claustrophobic or bombarded by clutter.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#121315] border border-[#1f2328] space-y-4">
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block">
              Principle II
            </span>
            <h3 className="font-syne text-xl font-bold text-[#f4f4f5]">Obsession with Raw Speed</h3>
            <p className="font-jakarta text-xs text-[#a1a1aa] leading-relaxed">
              True luxury is instantaneous. No visitor should ever see a spinning preloader for more than 400 milliseconds. We code with zero runtime waste.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#121315] border border-[#1f2328] space-y-4">
            <span className="font-space text-xs uppercase tracking-widest text-[#06b6d4] font-semibold block">
              Principle III
            </span>
            <h3 className="font-syne text-xl font-bold text-[#f4f4f5]">Zero Agency Intermediaries</h3>
            <p className="font-jakarta text-xs text-[#a1a1aa] leading-relaxed">
              When you hire WEB CEYLON, you speak and build directly with principal engineers in Colombo who know every single line of code in your repo.
            </p>
          </div>
        </div>

      </div>

      {/* Bottom CTA */}
      <div className="text-center pt-8 border-t border-[#1f2328]">
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-xs font-bold uppercase tracking-wider transition-all"
        >
          <span>Commence Dialogue</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
