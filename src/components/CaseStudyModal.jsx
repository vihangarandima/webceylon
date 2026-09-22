import React, { useState, useEffect } from 'react';
import { X, ArrowUpRight, CheckCircle, ExternalLink, Cpu } from 'lucide-react';

export default function CaseStudyModal({ study, onClose }) {
  if (!study) return null;

  const [activeImage, setActiveImage] = useState(study.image);

  useEffect(() => {
    setActiveImage(study.image);
  }, [study]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#111728] border border-white/15 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0c101c]">
          <div className="flex items-center gap-2">
            <span className="font-space text-xs text-[#38bdf8] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-[#0ea5e9]/15 border border-[#0ea5e9]/30">
              {study.category}
            </span>
            <span className="font-space text-xs text-[#94a3b8] uppercase tracking-wider hidden sm:inline font-medium">
              Case Study Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 border border-white/15 text-[#94a3b8] hover:text-white hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          
          {/* Main Title & Hero Image */}
          <div>
            <span className="font-space text-xs text-[#fbbf24] uppercase tracking-widest block mb-1.5 font-bold">
              {study.badge}
            </span>
            <h2 className="font-syne text-2xl md:text-3xl font-extrabold text-white leading-tight">
              {study.title}
            </h2>
          </div>

          {/* Main Hero / Gallery Image */}
          <div className="space-y-3">
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-[420px] bg-[#090d17] shadow-xl">
              <img 
                src={activeImage} 
                alt={study.title} 
                className="w-full h-full object-cover max-h-[420px]"
              />
            </div>

            {study.gallery && study.gallery.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
                {study.gallery.map((g, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(g.url)}
                    className={`rounded-xl overflow-hidden border text-left transition-all p-1.5 ${
                      activeImage === g.url
                        ? 'border-[#f97316] bg-[#f97316]/20 shadow-md'
                        : 'border-white/10 bg-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={g.url} alt={g.caption} className="w-full h-16 object-cover rounded-lg" />
                    <span className="block font-space text-[10px] text-[#cbd5e1] font-medium truncate mt-1 px-0.5">
                      {g.caption}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
            {study.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-2xl border ${
                  m.highlight 
                    ? 'bg-[#f97316]/15 border-[#f97316]/35 shadow-sm' 
                    : 'bg-[#151e33] border-white/10'
                }`}
              >
                <div className={`font-syne text-xl md:text-2xl font-extrabold ${m.highlight ? 'text-[#f97316]' : 'text-white'}`}>
                  {m.value}
                </div>
                <div className="font-space text-[11px] text-[#94a3b8] uppercase tracking-wider mt-1 font-semibold">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-2xl bg-[#0e1424] border border-white/10 space-y-3">
              <span className="font-space text-xs text-[#94a3b8] uppercase tracking-wider block font-bold">
                The Challenge
              </span>
              <p className="font-jakarta text-sm text-[#cbd5e1] leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0f2420] border border-[#10b981]/30 space-y-3">
              <span className="font-space text-xs text-[#10b981] uppercase tracking-wider block font-bold">
                The Engineering Solution
              </span>
              <p className="font-jakarta text-sm text-[#a7f3d0] leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#f97316]" />
              <span className="font-space text-xs text-white uppercase tracking-wider font-bold">
                Production Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="font-space text-xs px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-[#e2e8f0] font-semibold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-white/10 bg-[#0c101c] flex items-center justify-between">
          <span className="font-space text-xs text-[#94a3b8] hidden sm:inline font-semibold">
            Client: {study.client}
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-space font-bold uppercase text-white"
            >
              Close
            </button>
            {study.liveUrl && study.liveUrl !== '#' && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-xs font-bold uppercase shadow-lg shadow-[#f97316]/25"
              >
                <span>Visit Live Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
