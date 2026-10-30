import React from 'react';
import { ShieldCheck, Printer, Users, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AboutSection: React.FC = () => {
  const { setActiveTab } = useStore();

  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Title */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider mb-2">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>About Mamlaka Prints</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Kenya's Dedicated Hub for Printing Materials & Branded Merchandise
          </h1>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Founded to provide Kenyan enterprises, print service providers, and marketing teams with genuine, high-yield printing consumables and customized branding solutions.
          </p>
        </div>

        {/* Story & Image Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-4 text-sm text-slate-600 leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Craftsmanship, Reliability & Direct Access
            </h2>
            <p>
              At <strong>Mamlaka Prints</strong>, we believe every piece of promotional merchandise or outdoor signage is an ambassador for your company's reputation. That is why we refuse to cut corners with counterfeit media or substandard inks.
            </p>
            <p>
              From our operational headquarters in Nairobi, we maintain an inventory of commercial-grade adhesive vinyl rolls, PVC flex banner substrates, sublimation transfer papers, and heavy combed cotton apparel.
            </p>
            <p>
              Our production floor brings together high-resolution digital large-format printers, precision computerized embroidery heads, fiber laser engraving systems, and pneumatic garment heat presses.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs text-slate-800 font-semibold">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nairobi CBD Central Hub</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Eco-Solvent & UV Inks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Nationwide Courier Dispatch</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Direct WhatsApp Support</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
              <img
                src="/images/hero_printing_workshop.jpg"
                alt="Mamlaka Prints Workshop"
                className="w-full h-80 sm:h-96 object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* 3 Values Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#0a3d24] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Certified Substrates</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              Every roll of adhesive vinyl, flex banner, and ream of transfer paper is tested for tensile strength, ink adhesion, and colorfastness.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#0a3d24] flex items-center justify-center mb-3">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">Human Connection</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              No automated chatbots or cold checkout screens. Your order is handled directly by dedicated print professionals on WhatsApp.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-[#0a3d24] flex items-center justify-center mb-3">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900">End-to-End Capabilities</h3>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">
              From raw media supplies for sign shops to finished, custom-packaged merchandise for multinationals, we handle the full spectrum.
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 bg-emerald-900 text-white rounded-2xl p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-bold">Ready to Elevate Your Brand Presence?</h3>
            <p className="text-xs sm:text-sm text-emerald-200/90 mt-1">
              Browse our catalog or message our team with your custom requirements.
            </p>
          </div>
          <button
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="px-6 py-3 bg-white text-[#0a3d24] hover:bg-emerald-50 text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Explore All Products</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
