import React from 'react';
import { Star, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const reviews = [
    {
      name: 'Dennis Mutua',
      role: 'Head of Marketing',
      company: 'Kilifi Agro Innovations, Nairobi',
      text: 'We ordered 120 branded polo shirts and laser-engraved flasks for our annual shareholder forum. The fabric quality, embroidery finish, and turnaround speed in Nairobi CBD were world-class. Ordering through WhatsApp made reviewing proofs seamless.',
      metric: '120 Units Delivered in 4 Days'
    },
    {
      name: 'Grace Nyambura',
      role: 'Managing Director',
      company: 'Nyota Visuals & Signage, Nakuru',
      text: 'As a commercial sign maker, I source my self-adhesive vinyl rolls and flex banner materials exclusively from Mamlaka Prints. The ink adhesion on our eco-solvent machines is flawless and the bubble-free vinyl holds up in outdoor weather.',
      metric: '15+ Vinyl Rolls Sourced'
    },
    {
      name: 'Brian Otieno',
      role: 'Brand & Event Coordinator',
      company: 'Apex Tech Hub Kenya',
      text: 'The roll-up exhibition banners and executive stationery kits received huge compliments at the Nairobi Convention Center. No stress of card payments or broken checkout gateways—our order was handled directly on WhatsApp with clear timelines.',
      metric: '3 Major Conferences Branded'
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider mb-1">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>Customer Stories</span>
            <span aria-hidden="true" className="text-slate-300">·</span>
            <span className="text-slate-500 font-normal">Verified Kenyan Partners</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Trusted by Brands, Print Shops & Organizations
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            See how organizations across Nairobi and Kenya rely on Mamlaka Prints for materials and brand merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/70 p-6 rounded-xl border border-slate-200/90 flex flex-col justify-between hover:border-slate-300 transition-colors"
            >
              <div>
                {/* Metric kicker */}
                <div className="text-[11px] font-bold text-[#0a3d24] bg-emerald-100/60 inline-block px-2 py-0.5 rounded mb-3">
                  {rev.metric}
                </div>

                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                  "{rev.text}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200/80">
                <div className="font-bold text-xs text-slate-900">{rev.name}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {rev.role} · <span className="text-slate-700 font-medium">{rev.company}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
