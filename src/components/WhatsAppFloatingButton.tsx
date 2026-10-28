import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const WhatsAppFloatingButton: React.FC = () => {
  const { settings } = useStore();
  const [showTooltip, setShowTooltip] = useState(true);

  const handleClick = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(
      `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        'Hello Mamlaka Prints! I want to inquire about printing materials and branded goods.'
      )}`,
      '_blank'
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip bubble on first load */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-white text-slate-800 text-xs px-3.5 py-2 rounded-xl shadow-lg border border-slate-200 animate-in fade-in slide-in-from-right-4 duration-300">
          <span className="font-semibold text-emerald-800">Order & Chat on WhatsApp</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-slate-400 hover:text-slate-600 ml-1 text-xs"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={handleClick}
        title="Direct WhatsApp with Mamlaka Prints"
        className="w-14 h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer relative"
      >
        <MessageSquare className="w-7 h-7" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
      </button>
    </div>
  );
};
