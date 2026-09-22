import React, { useState } from 'react';
import { Phone, MessageCircle, ArrowUpRight, Copy, Check, Sparkles, X } from 'lucide-react';

export default function DirectContactBar() {
  const [copied, setCopied] = useState(false);
  const [showCallMenu, setShowCallMenu] = useState(false);
  const phoneNumber = '0702434288';
  const intlNumber = '+94702434288';
  const whatsappUrl = 'https://wa.me/94702434288?text=Hello%20WEB%20CEYLON,%20I%20would%20like%20to%20discuss%20a%20website%20project';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Floating Bottom Contact Bar for Immediate Mobile & Desktop Access */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        
        {/* Expanded Quick Action Popover */}
        {showCallMenu && (
          <div className="w-80 p-5 rounded-3xl bg-[#111728]/95 border border-[#f97316]/40 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-bottom-5 duration-200 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping"></span>
                <span className="font-space text-xs text-[#10b981] font-bold uppercase">Direct Lead Architect</span>
              </div>
              <button 
                onClick={() => setShowCallMenu(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-[#94a3b8]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 text-left">
              <span className="font-space text-[11px] text-[#94a3b8] uppercase tracking-wider block">Official Direct Line</span>
              <div className="font-syne text-2xl font-extrabold text-white mt-0.5 tracking-wide flex items-center justify-between">
                <span>070 243 4288</span>
                <button
                  onClick={copyToClipboard}
                  title="Copy Number"
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-[#f97316] text-[#cbd5e1] hover:text-white transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-[#10b981]" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <p className="font-jakarta text-xs text-[#cbd5e1] mt-2 leading-relaxed">
                Available for immediate call, WhatsApp scoping, and project briefings.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <a
                href={`tel:${phoneNumber}`}
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#f97316]/25 hover:scale-105 transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Call Now</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0c101c] font-space text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#25D366]/25 hover:scale-105 transition-all"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        )}

        {/* The Main Pulsing Floating Trigger Button */}
        <div className="flex items-center gap-2">
          {/* Quick Click-to-Call direct button */}
          <a
            href={`tel:${phoneNumber}`}
            className="hidden sm:flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0e1424]/90 hover:bg-[#151e33] border border-white/15 text-white font-space text-xs font-bold tracking-wider shadow-xl backdrop-blur-xl transition-all group"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse"></span>
            <span className="text-[#94a3b8] group-hover:text-white">Call:</span>
            <span className="text-[#f97316] group-hover:text-white">070 243 4288</span>
          </a>

          {/* WhatsApp Direct */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp Us"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-[#0c101c] shadow-2xl shadow-[#25D366]/40 hover:scale-110 transition-all"
          >
            <MessageCircle className="w-7 h-7" />
          </a>

          {/* Main Floating Hotline Button */}
          <button
            onClick={() => setShowCallMenu(!showCallMenu)}
            aria-label="Direct Phone & WhatsApp Hotline"
            className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white shadow-2xl shadow-[#f97316]/50 hover:scale-110 transition-all border border-white/20"
          >
            <Phone className="w-6 h-6 animate-pulse" />
          </button>
        </div>

      </div>
    </>
  );
}
