import React from 'react';
import { Phone, MessageSquare, Truck, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const { settings } = useStore();

  const handleWhatsAppClick = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Mamlaka Prints! I have an inquiry about your printing and branding services.')}`, '_blank');
  };

  return (
    <div className="bg-[#0a3d24] text-white text-xs py-2 px-4 border-b border-[#0f5132]/40">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-4 text-emerald-100/90 overflow-hidden">
          <span className="flex items-center gap-1.5 font-medium shrink-0">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Nairobi CBD Hub & Countrywide Dispatch Across Kenya</span>
          </span>
          <span className="hidden md:inline text-emerald-400/50">|</span>
          <span className="hidden md:flex items-center gap-1.5 text-emerald-200/80">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Order Direct on WhatsApp · Zero Pre-Payment Required</span>
          </span>
        </div>

        <div className="flex items-center gap-4 text-xs shrink-0">
          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="hidden sm:flex items-center gap-1 hover:text-amber-300 transition-colors"
          >
            <Phone className="w-3 h-3 text-emerald-300" />
            <span>{settings.phone}</span>
          </a>
          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1 text-emerald-200 hover:text-white font-medium transition-colors"
          >
            <MessageSquare className="w-3 h-3 text-emerald-400" />
            <span>WhatsApp Orders Only</span>
          </button>
        </div>
      </div>
    </div>
  );
};
