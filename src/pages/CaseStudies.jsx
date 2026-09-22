import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/siteData';
import CaseStudyModal from '../components/CaseStudyModal';
import { ArrowUpRight } from 'lucide-react';

export default function CaseStudies() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeStudy, setActiveStudy] = useState(null);

  const categories = ['All', 'Automotive & Logistics', 'Electric Vehicles & IoT', 'Luxury Hospitality', 'DTC E-Commerce & Export', 'Marine & High Luxury', 'Fine Jewelry & Luxury'];

  const filteredStudies = selectedCategory === 'All' 
    ? CASE_STUDIES 
    : CASE_STUDIES.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-12 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
          Portfolio Archive & Case Studies
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white">
          Engineering High Stakes Solutions.
        </h1>
        <p className="font-jakarta text-[#94a3b8] text-base md:text-lg leading-relaxed">
          Deep-dive into how we solve conversion bottlenecks, high-concurrency infrastructure, and bespoke branding for modern ventures.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 mb-12 pb-4 border-b border-white/10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-space uppercase tracking-wider transition-all font-bold ${
              selectedCategory === cat
                ? 'bg-[#f97316] text-white shadow-lg shadow-[#f97316]/25'
                : 'bg-white/5 text-[#94a3b8] hover:text-white border border-white/10'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredStudies.map((study) => (
          <div
            key={study.id}
            onClick={() => setActiveStudy(study)}
            className="group cursor-pointer rounded-3xl ceylon-card-glow overflow-hidden flex flex-col"
          >
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

            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <span className="font-space text-[10px] text-[#fbbf24] uppercase tracking-wider block mb-1 font-bold">
                  {study.badge}
                </span>
                <h3 className="font-syne text-xl font-bold text-white group-hover:text-[#f97316] transition-colors leading-snug">
                  {study.title}
                </h3>
              </div>

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

      {activeStudy && (
        <CaseStudyModal
          study={activeStudy}
          onClose={() => setActiveStudy(null)}
        />
      )}

    </div>
  );
}
