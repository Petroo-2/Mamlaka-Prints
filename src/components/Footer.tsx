import React from 'react';
import { MessageSquare, Phone, Mail, MapPin, Shield, ArrowUp } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setSelectedCategory, settings } = useStore();

  const handleNav = (tab: string, cat?: string) => {
    setActiveTab(tab);
    if (cat) setSelectedCategory(cat);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Mamlaka Prints! I would like to make an inquiry.')}`, '_blank');
  };

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800">
      
      {/* Upper Footer: 4-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          
          {/* Col 1 & 2: Brand Lockup & Bio */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center overflow-hidden">
                <img
                  src="/assets/aistudio/WhatsApp_Image_2026-10-27_at_19.04.47_0488f7e0.jpeg"
                  alt="Mamlaka Prints"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5 font-extrabold text-xl text-white tracking-tight">
                  <span className="text-emerald-400">Mamlaka</span>
                  <span className="text-red-500">Prints</span>
                </div>
                <p className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                  Printing & Branding Hub Kenya
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Your premier partner for commercial printing supplies, self-adhesive vinyl rolls, large-format substrates, custom branded merchandise, and corporate promotional gifts across Kenya.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={handleWhatsApp}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs flex items-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('shop', 'All')} className="hover:text-white transition-colors cursor-pointer">
                  Shop All Products
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors cursor-pointer">
                  About Mamlaka
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Categories */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Product Categories
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => handleNav('branded', 'Branded Goods')} className="hover:text-white transition-colors cursor-pointer">
                  Branded T-Shirts & Polos
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('branded', 'Branded Goods')} className="hover:text-white transition-colors cursor-pointer">
                  Custom Drinkware & Mugs
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('custom', 'Custom Printing')} className="hover:text-white transition-colors cursor-pointer">
                  Roll-Up Exhibition Banners
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('custom', 'Custom Printing')} className="hover:text-white transition-colors cursor-pointer">
                  Die-Cut Waterproof Stickers
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Operations & Hub
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{settings.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white">
                  {settings.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-white truncate">
                  {settings.email}
                </a>
              </div>
              <div className="pt-2 text-[11px] text-slate-500">
                Hours: {settings.workingHours}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar: Copyright & Back to Top */}
      <div className="border-t border-slate-800/80 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Mamlaka Prints. All rights reserved. Branded merchandise & custom printing Kenya.
          </div>

          <div className="flex items-center gap-4">
            <span>Direct WhatsApp Checkout Platform</span>
            <span>·</span>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
};
