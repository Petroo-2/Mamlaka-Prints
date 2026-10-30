import React from 'react';
import { ArrowRight, MessageSquare, CheckCircle2, Sparkles, Layers, ShieldCheck, Printer } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setActiveTab, setSelectedCategory, settings } = useStore();

  const handleWhatsAppChat = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(
      `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        'Hello Mamlaka Prints! I want to inquire about custom printing materials and merchandise.'
      )}`,
      '_blank'
    );
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/70 to-slate-100/50 py-12 md:py-16 lg:py-20 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#0a3d24] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#dc2626]"></span>
              <span>Official Mamlaka Printing & Branding Hub</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Nairobi, Kenya</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1] text-balance">
              Print Better. <br className="hidden sm:inline" />
              <span className="text-[#0a3d24]">Brand Smarter.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              Your trusted partner for commercial printing supplies, large-format materials, custom branded merchandise, and corporate promotional solutions in Kenya.
            </p>

            {/* Trust points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0a3d24] shrink-0" />
                <span>Heavyweight Vinyl, Specialty Paper & Consumables</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0a3d24] shrink-0" />
                <span>Precision Garment & Promotional Laser Branding</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0a3d24] shrink-0" />
                <span>Fast Nairobi Pick-up & Countrywide Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#0a3d24] shrink-0" />
                <span>Direct WhatsApp Confirmation · No Online Card Hassle</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setActiveTab('shop');
                  setSelectedCategory('All');
                }}
                className="px-6 py-3.5 bg-[#0a3d24] hover:bg-[#072a19] text-white font-semibold text-sm rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleWhatsAppChat}
                className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>

            {/* Quiet metadata footer */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-xs text-slate-500 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Eco-Solvent, UV & Sublimation</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>MOQ from 1 Unit on select items</span>
              </div>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Quality Guaranteed</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto rounded-2xl overflow-hidden shadow-xl border border-slate-200/80 bg-white">
              
              <img
                src="/images/hero_printing_workshop.jpg"
                alt="Mamlaka Prints Commercial Workshop"
                className="w-full h-80 sm:h-96 lg:h-[430px] object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Minimal overlay highlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-300 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>State-of-the-Art Production Facility</span>
                </div>
                <h3 className="text-lg font-bold">Mamlaka Quality Guarantee</h3>
                <p className="text-xs text-slate-200 mt-1 max-w-sm">
                  From large-format roll media to executive branded corporate gifts, every piece is inspected before dispatch.
                </p>
                <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-300">
                  <span>Color Profiling Calibrated</span>
                  <span>·</span>
                  <span>Direct WhatsApp Ordering</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
