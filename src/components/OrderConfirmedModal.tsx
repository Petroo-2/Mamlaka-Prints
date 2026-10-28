import React from 'react';
import { CheckCircle2, MessageSquare, Copy, ArrowRight, ExternalLink } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderConfirmedModal: React.FC = () => {
  const { latestConfirmedOrder, setLatestConfirmedOrder, setActiveTab, settings } = useStore();

  if (!latestConfirmedOrder) return null;

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(latestConfirmedOrder.id);
    alert(`Order reference ${latestConfirmedOrder.id} copied to clipboard!`);
  };

  const handleReopenWhatsApp = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = `Hello Mamlaka Prints! Following up on my recent order ${latestConfirmedOrder.id} placed for ${latestConfirmedOrder.customerName}.`;
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Top Success Banner */}
        <div className="bg-emerald-800 text-white p-6 text-center">
          <div className="w-14 h-14 bg-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-8 h-8 text-emerald-200" />
          </div>
          <h2 className="text-xl font-bold">Order Sent to WhatsApp!</h2>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-sm mx-auto">
            Your order enquiry has been successfully compiled and launched in WhatsApp chat.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-700/60 rounded-lg px-3 py-1.5 text-xs">
            <span className="text-emerald-300 font-medium">Order Reference:</span>
            <span className="font-mono font-bold text-white tracking-wider">
              {latestConfirmedOrder.id}
            </span>
            <button
              onClick={handleCopyOrderId}
              className="text-emerald-300 hover:text-white transition-colors ml-1 p-0.5"
              title="Copy Order ID"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Order Details Receipt */}
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-2">
            <div className="flex justify-between text-slate-600">
              <span className="font-semibold text-slate-800">Customer Name:</span>
              <span>{latestConfirmedOrder.customerName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-semibold text-slate-800">Phone:</span>
              <span>{latestConfirmedOrder.customerPhone}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span className="font-semibold text-slate-800">Delivery Location:</span>
              <span>{latestConfirmedOrder.deliveryLocation}</span>
            </div>
            <div className="flex justify-between text-slate-600 pt-2 border-t border-slate-200 font-bold">
              <span>Estimated Subtotal:</span>
              <span className="text-[#0a3d24] tabular-nums">
                KES {latestConfirmedOrder.subtotalKes.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Action explanation */}
          <div className="text-xs text-slate-600 space-y-1.5 leading-relaxed bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/60">
            <p className="font-semibold text-amber-900">Next Steps:</p>
            <p>1. Send the pre-filled message inside your WhatsApp window.</p>
            <p>2. If you have custom artwork or logo vectors, attach them directly in the chat.</p>
            <p>3. A Mamlaka Prints team member will confirm product availability, finalize exact delivery charges, and coordinate payment.</p>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleReopenWhatsApp}
              className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Reopen WhatsApp Chat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => {
                setLatestConfirmedOrder(null);
                setActiveTab('shop');
              }}
              className="w-full sm:w-auto py-3 px-5 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
