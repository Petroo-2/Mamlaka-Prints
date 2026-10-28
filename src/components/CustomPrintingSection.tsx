import React, { useState } from 'react';
import { MessageSquare, Sparkles, Check, ArrowRight, ShieldCheck, Printer, Scissors, Palette, Package } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CustomPrintingSection: React.FC = () => {
  const { settings } = useStore();

  const [selectedService, setSelectedService] = useState('Garment Printing & Embroidery');
  const [estimatedQuantity, setEstimatedQuantity] = useState('50');
  const [customNotes, setCustomNotes] = useState('');

  const services = [
    {
      title: 'Garment Printing & Embroidery',
      desc: 'Screen printing, DTF transfer, and 3D puff embroidery for company uniforms, polo shirts, and event tees.',
      icon: Printer
    },
    {
      title: 'Stickers & Product Labels',
      desc: 'Contour die-cut, waterproof, oil-resistant vinyl stickers, holographic labels, and retail packaging seals.',
      icon: Scissors
    },
    {
      title: 'Exhibition & Large Format Displays',
      desc: 'Retractable roll-up banners, teardrop flags, backdrop banners, acrylic signage, and outdoor billboards.',
      icon: Palette
    },
    {
      title: 'Corporate Merchandise & Gift Kits',
      desc: 'Tailored luxury VIP gift boxes, laser-engraved drinkware, branded executive stationery, and tech gear.',
      icon: Package
    }
  ];

  const handleSendCustomQuote = (e: React.FormEvent) => {
    e.preventDefault();
    const message = [
      'Hello Mamlaka Prints! I would like to request a custom printing quote.',
      '',
      `Service Type: ${selectedService}`,
      `Estimated Quantity: ${estimatedQuantity} units`,
      customNotes ? `Project Details: ${customNotes}` : '',
      '',
      'Please advise on pricing tiers, artwork specifications, and turnaround time.',
      '',
      'Thank you.'
    ]
      .filter((l) => l !== '')
      .join('\n');

    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Service Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#dc2626]" />
              <span>Bespoke Branding Solutions</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">End-to-End Execution</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight text-balance">
              Tailored Custom Printing & Corporate Branding
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Whether you need 20 branded polo shirts for a corporate summit, 5,000 product labels for your retail line, or large format exhibition booths, Mamlaka Prints delivers factory-grade precision.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {services.map((srv, idx) => {
                const Icon = srv.icon;
                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedService(srv.title)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      selectedService === srv.title
                        ? 'border-[#0a3d24] bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 bg-slate-50/50 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#0a3d24] mb-2.5 shadow-2xs">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900">{srv.title}</h4>
                    <p className="text-[11px] text-slate-500 mt-1 leading-snug">{srv.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4 pt-2 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Free Digital Artwork Mockup</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5 font-medium">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Tiered Bulk Discounts</span>
              </span>
            </div>
          </div>

          {/* Right Column: Quick Quote WhatsApp Request Box */}
          <div className="lg:col-span-5">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-[#0a3d24] text-white flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-base text-slate-900">Get a Custom WhatsApp Quote</h3>
              </div>
              <p className="text-xs text-slate-600 mb-5 leading-relaxed">
                Fill in your project basics and launch directly into chat with our branding estimator.
              </p>

              <form onSubmit={handleSendCustomQuote} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Select Service Category
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                  >
                    {services.map((s, i) => (
                      <option key={i} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Printing & Custom Media">Other / Custom Bulk Printing</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Estimated Quantity
                  </label>
                  <input
                    type="text"
                    value={estimatedQuantity}
                    onChange={(e) => setEstimatedQuantity(e.target.value)}
                    placeholder="e.g. 50, 100, 500 pcs or roll length"
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Design Notes & Artwork
                  </label>
                  <textarea
                    rows={3}
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="Describe sizes, print colors, garment types, or deadline..."
                    className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Request Instant WhatsApp Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Zero obligations. Real human response in minutes during business hours.</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
