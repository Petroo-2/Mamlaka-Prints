import React from 'react';
import { Award, Zap, Truck, MessageSquare, CheckCircle2, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Award,
      title: 'Commercial-Grade Printing Materials',
      desc: 'We supply certified polymeric vinyl rolls, outdoor-tested PVC banner film, high-yield sublimation consumables, and heavy combed cotton apparel that never compromises on longevity.'
    },
    {
      icon: MessageSquare,
      title: 'Frictionless WhatsApp Ordering',
      desc: 'No complicated cart checkout hurdles or credit card fees. Submit your item list directly to our WhatsApp desk, confirm delivery logistics, and communicate with dedicated print specialists.'
    },
    {
      icon: Zap,
      title: 'Factory Color Accuracy & Proofing',
      desc: 'Color-calibrated digital RIP workflows guarantee your company logo hex codes, gradients, and photographic elements print true to life on garments, bottles, banners, and stationery.'
    },
    {
      icon: Truck,
      title: 'Nairobi Hub & Countrywide Kenya Dispatch',
      desc: 'Convenient same-day pick-up in Nairobi CBD and prompt, trackable courier dispatch to Mombasa, Kisumu, Nakuru, Eldoret, Thika, and all 47 counties in Kenya.'
    }
  ];

  return (
    <section className="py-16 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Why Kenyan Businesses Trust Mamlaka Prints</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Quality Products. Creative Branding. Reliable Service.
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            From growing startups to established corporate institutions, we equip organizations with lasting brand presence and high-yield printing consumables.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-xl border border-slate-200/90 hover:border-[#0a3d24]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 text-[#0a3d24] flex items-center justify-center mb-4 border border-emerald-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-[#0a3d24]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mamlaka Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
