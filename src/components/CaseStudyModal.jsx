import React from 'react';
import { X, ArrowUpRight, CheckCircle, ExternalLink, Cpu } from 'lucide-react';

export default function CaseStudyModal({ study, onClose }) {
  if (!study) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-[#121315] border border-[#1f2328] rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1f2328] bg-[#0d0e0f]/80">
          <div className="flex items-center gap-2">
            <span className="font-space text-xs text-[#10b981] uppercase tracking-widest px-2 py-0.5 rounded bg-[#00422b]/50 border border-[#10b981]/30">
              {study.category}
            </span>
            <span className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider hidden sm:inline">
              Case Study Dossier
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-[#1b1c1d] border border-[#1f2328] text-[#a1a1aa] hover:text-[#f4f4f5] hover:bg-[#292a2b] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto space-y-8">
          
          {/* Main Title & Hero Image */}
          <div>
            <span className="font-space text-xs text-[#d4af37] uppercase tracking-widest block mb-2 font-medium">
              {study.badge}
            </span>
            <h2 className="font-syne text-2xl md:text-3xl font-bold text-[#f4f4f5] leading-tight">
              {study.title}
            </h2>
          </div>

          <div className="rounded-xl overflow-hidden border border-[#1f2328] max-h-[360px]">
            <img 
              src={study.image} 
              alt={study.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {study.metrics.map((m, idx) => (
              <div 
                key={idx} 
                className={`p-4 rounded-xl border ${
                  m.highlight 
                    ? 'bg-[#00422b]/30 border-[#10b981]/40' 
                    : 'bg-[#1b1c1d] border-[#1f2328]'
                }`}
              >
                <div className={`font-syne text-xl md:text-2xl font-bold ${m.highlight ? 'text-[#10b981]' : 'text-[#f4f4f5]'}`}>
                  {m.value}
                </div>
                <div className="font-space text-[11px] text-[#a1a1aa] uppercase tracking-wider mt-1">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="p-6 rounded-xl bg-[#0d0e0f] border border-[#1f2328] space-y-3">
              <span className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider block font-semibold">
                The Challenge
              </span>
              <p className="font-jakarta text-sm text-[#a1a1aa] leading-relaxed">
                {study.challenge}
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#0d0e0f] border border-[#1f2328] space-y-3">
              <span className="font-space text-xs text-[#10b981] uppercase tracking-wider block font-semibold">
                The Engineering Solution
              </span>
              <p className="font-jakarta text-sm text-[#f4f4f5] leading-relaxed">
                {study.solution}
              </p>
            </div>
          </div>

          {/* Technical Stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#10b981]" />
              <span className="font-space text-xs text-[#a1a1aa] uppercase tracking-wider font-semibold">
                Production Tech Stack
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {study.stack.map((tech, idx) => (
                <span 
                  key={idx} 
                  className="font-space text-xs px-3 py-1.5 rounded-lg bg-[#1b1c1d] border border-[#1f2328] text-[#e4e4e7]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="px-6 py-4 border-t border-[#1f2328] bg-[#0d0e0f]/90 flex items-center justify-between">
          <span className="font-space text-xs text-[#71717a] hidden sm:inline">
            Client: {study.client}
          </span>
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#1b1c1d] hover:bg-[#292a2b] border border-[#1f2328] text-xs font-space uppercase text-[#f4f4f5]"
            >
              Close
            </button>
            {study.liveUrl && study.liveUrl !== '#' && (
              <a
                href={study.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-xs font-bold uppercase"
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
