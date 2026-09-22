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
        <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
          Commence Project
        </span>
        <h1 className="font-syne text-4xl sm:text-6xl font-extrabold text-white">
          Initiate Architectural Scoping.
        </h1>
        <p className="font-jakarta text-[#94a3b8] text-base md:text-lg leading-relaxed">
          Tell us about your venture, product roadmap, or performance challenges. We respond with a comprehensive technical proposal within 24 hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Side: Contact Information & Studio Details */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="p-8 rounded-3xl bg-[#111728] border border-white/10 space-y-6 shadow-xl">
            <h2 className="font-syne text-xl font-bold text-white">
              Studio Headquarters
            </h2>

            <div className="space-y-4 font-jakarta text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#f97316] shrink-0 mt-0.5" />
                <span className="text-[#cbd5e1] leading-relaxed">
                  551/1, Thalgahawatta Road, Wawa Road, Boralasgamuwa, Sri Lanka
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f97316] shrink-0" />
                <a 
                  href="mailto:vihangarandima8@gmail.com"
                  className="text-white font-space text-xs font-bold hover:text-[#f97316] hover:underline"
                >
                  vihangarandima8@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#10b981] shrink-0" />
                <a 
                  href="tel:0702434288"
                  className="text-[#f97316] font-space text-base font-extrabold hover:underline"
                >
                  070 243 4288
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#10b981] shrink-0" />
                <span className="text-[#94a3b8] font-space text-xs font-medium">
                  Monday – Friday: 09:00 - 19:00 IST (UTC+5:30)
                </span>
              </div>
            </div>

            {/* Instant Action Call & WhatsApp Buttons */}
            <div className="pt-2 grid grid-cols-2 gap-3">
              <a
                href="tel:0702434288"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-gradient-to-r from-[#f97316] to-[#ea580c] text-white font-space text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call Hotline</span>
              </a>
              <a
                href="https://wa.me/94702434288?text=Hello%20WEB%20CEYLON,%20I%20would%20like%20to%20discuss%20a%20website%20project"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-[#0c101c] font-space text-xs font-bold uppercase tracking-wider shadow-md hover:scale-105 transition-all text-center"
              >
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#f97316]/10 border border-[#f97316]/25 space-y-3">
            <span className="font-space text-xs uppercase tracking-widest text-[#f97316] font-bold block">
              Direct Senior Access
            </span>
            <p className="font-jakarta text-sm text-[#fdba74] leading-relaxed">
              Every scoping session is conducted directly by a Senior Digital Architect, not an account manager. We examine your architecture, tech stack, and conversion funnel upfront.
            </p>
          </div>

        </div>

        {/* Right Side: Inquiry Form */}
        <div className="lg:col-span-7">
          <div className="p-8 md:p-10 rounded-3xl bg-[#111728] border border-white/10 shadow-2xl">
            
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#10b981]/20 border border-[#10b981] flex items-center justify-center text-[#10b981] mx-auto">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-syne text-2xl font-bold text-white">
                  Inquiry Received with Distinction
                </h3>
                <p className="font-jakarta text-sm text-[#94a3b8] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to WEB CEYLON. Our architectural team has received your project briefing and will respond within 24 hours with next steps.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 font-space text-xs font-bold uppercase text-[#f97316]"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-space text-xs text-[#94a3b8] uppercase tracking-wider mb-2 font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Asoka Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0f1a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs text-[#94a3b8] uppercase tracking-wider mb-2 font-bold">
                      Corporate Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="asoka@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0f1a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-space text-xs text-[#94a3b8] uppercase tracking-wider mb-2 font-bold">
                      Company / Venture Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ceylon Botanicals Ltd"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0f1a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-space text-xs text-[#94a3b8] uppercase tracking-wider mb-2 font-bold">
                      Target Investment Band
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) => setFormData({...formData, budget: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl bg-[#0b0f1a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors"
                    >
                      <option>$2,800 - $5,000 USD</option>
                      <option>$5,000 - $10,000 USD</option>
                      <option>$10,000+ USD (Custom Enterprise App)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-space text-xs text-[#94a3b8] uppercase tracking-wider mb-2 font-bold">
                    Primary Architectural Service
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0f1a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors"
                  >
                    <option>Bespoke Website & Brand Experience</option>
                    <option>Global E-Commerce & DTC Engine</option>
                    <option>Complex Web Application / SaaS Portal</option>
                    <option>Full Architecture Audit & SEO Acceleration</option>
                  </select>
                </div>

                <div>
                  <label className="block font-space text-xs text-[#94a3b8] uppercase tracking-wider mb-2 font-bold">
                    Project Brief & Key Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Briefly describe your product, target audience, timeline, or current bottlenecks..."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-[#0b0f1a] border border-white/10 text-sm text-white focus:outline-none focus:border-[#f97316] transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#f97316] via-[#ea580c] to-[#c2410c] hover:opacity-95 text-white font-space text-sm font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl shadow-[#f97316]/25 hover:scale-105"
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
