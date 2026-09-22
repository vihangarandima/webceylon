import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, Mail, MapPin, Phone, Clock, Send } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$2,800 - $5,000 USD',
    service: 'Bespoke Website & Brand Experience',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen py-16 md:py-24 max-w-[1680px] mx-auto px-4 md:px-12">
      
      {/* Header */}
      <div className="max-w-3xl mb-16 space-y-4">
        <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-semibold block">
          Commence Project
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-[#f4f4f5]">
          Initiate Architectural Scoping.
        </h1>
        <p className="font-jakarta text-[#a1a1aa] text-base md:text-lg leading-relaxed">
          Tell us about your venture, product roadmap, or performance challenges. We respond with a comprehensive technical proposal within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Contact Information & Studio Details */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="p-8 rounded-2xl bg-[#121315] border border-[#1f2328] space-y-6">
            <h2 className="font-syne text-xl font-bold text-[#f4f4f5]">
              Studio Headquarters
            </h2>

            <div className="space-y-4 font-jakarta text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#10b981] shrink-0 mt-0.5" />
                <span className="text-[#a1a1aa]">
                  Ward Place, Colombo 07, Sri Lanka • High-Commission Quarter
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#10b981] shrink-0" />
                <span className="text-[#f4f4f5] font-space text-xs">
                  architecture@webceylon.com
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#10b981] shrink-0" />
                <span className="text-[#a1a1aa] font-space text-xs">
                  Monday – Friday: 09:00 - 19:00 IST (UTC+5:30)
                </span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-[#00422b]/30 border border-[#10b981]/40 space-y-3">
            <span className="font-space text-xs uppercase tracking-widest text-[#10b981] font-bold block">
              Direct Senior Access
            </span>
            <p className="font-jakarta text-sm text-[#e4e4e7] leading-relaxed">
              Every scoping session is conducted directly by a Senior Digital Architect, not an account manager. We examine your architecture, tech stack, and conversion funnel upfront.
            </p>
          </div>

        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-10 rounded-2xl bg-[#121315] border border-[#1f2328]">
            
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00422b] border border-[#10b981] flex items-center justify-center text-[#10b981] mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-syne text-2xl font-bold text-[#f4f4f5]">
                  Inquiry Received with Distinction
                </h3>
                <p className="font-jakarta text-sm text-[#a1a1aa] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to WEB CEYLON. Our architectural team has received your project briefing and will respond within 24 hours with next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-lg bg-[#1b1c1d] border border-[#1f2328] font-space text-xs uppercase text-[#10b981]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-space text-xs text-[#a1a1aa] uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asoka Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#1b1c1d] border border-[#1f2328] text-sm text-[#f4f4f5] focus:outline-none focus:border-[#10b981] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs text-[#a1a1aa] uppercase tracking-wider mb-2">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="asoka@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#1b1c1d] border border-[#1f2328] text-sm text-[#f4f4f5] focus:outline-none focus:border-[#10b981] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-space text-xs text-[#a1a1aa] uppercase tracking-wider mb-2">
                      Company / Venture Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ceylon Botanicals Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#1b1c1d] border border-[#1f2328] text-sm text-[#f4f4f5] focus:outline-none focus:border-[#10b981] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs text-[#a1a1aa] uppercase tracking-wider mb-2">
                      Target Investment Band
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#1b1c1d] border border-[#1f2328] text-sm text-[#f4f4f5] focus:outline-none focus:border-[#10b981] transition-colors"
                    >
                      <option>$2,800 - $5,000 USD</option>
                      <option>$5,000 - $10,000 USD</option>
                      <option>$10,000+ USD (Custom Enterprise App)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-space text-xs text-[#a1a1aa] uppercase tracking-wider mb-2">
                    Primary Architectural Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#1b1c1d] border border-[#1f2328] text-sm text-[#f4f4f5] focus:outline-none focus:border-[#10b981] transition-colors"
                  >
                    <option>Bespoke Website & Brand Experience</option>
                    <option>Global E-Commerce & DTC Engine</option>
                    <option>Complex Web Application / SaaS Portal</option>
                    <option>Full Architecture Audit & SEO Acceleration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-space text-xs text-[#a1a1aa] uppercase tracking-wider mb-2">
                    Project Brief & Key Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your product, target audience, timeline, or current bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#1b1c1d] border border-[#1f2328] text-sm text-[#f4f4f5] focus:outline-none focus:border-[#10b981] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-[#10b981] hover:bg-[#4edea3] text-[#08090a] font-space text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#10b981]/20"
                >
                  <span>Transmit Scoping Request</span>
                  <Send className="w-4 h-4" />
                </button>

              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
