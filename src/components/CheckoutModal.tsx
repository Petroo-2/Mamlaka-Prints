import React, { useState } from 'react';
import { X, MessageSquare, MapPin, User, Phone, FileText, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    hasQuoteOnlyItems,
    submitWhatsAppOrder,
    settings
  } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [instructions, setInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isCheckoutOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your full name');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMessage('Please enter your mobile phone number for order updates');
      return;
    }
    if (!deliveryLocation.trim()) {
      setErrorMessage('Please specify your delivery town/location or pick-up preference');
      return;
    }

    setIsSubmitting(true);

    try {
      const { whatsappUrl } = await submitWhatsAppOrder({
        name: customerName.trim(),
        phone: customerPhone.trim(),
        location: deliveryLocation.trim(),
        instructions: instructions.trim()
      });

      // Open WhatsApp click-to-chat URL in new window/tab
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.error(err);
      setErrorMessage('Could not initialize WhatsApp link. Please check your browser popup settings.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-emerald-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-800 flex items-center justify-center text-emerald-300">
              <MessageSquare className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-base">Complete Your Order on WhatsApp</h2>
              <p className="text-xs text-emerald-200/90">
                Official Mamlaka Prints WhatsApp Order Desk · Verified Direct Ordering
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {errorMessage}
            </div>
          )}

          {/* Order Snapshot */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/90 space-y-2">
            <div className="flex justify-between items-center text-xs text-slate-600">
              <span className="font-semibold text-slate-800 uppercase tracking-wider text-[11px]">
                Order Items ({cart.length})
              </span>
              <span className="font-bold text-slate-900 tabular-nums">
                Subtotal: KES {cartSubtotal.toLocaleString()}
              </span>
            </div>

            <div className="max-h-24 overflow-y-auto space-y-1 pr-1 text-xs text-slate-600">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between truncate py-0.5 border-b border-slate-100 last:border-none">
                  <span className="truncate">
                    {item.quantity}x {item.product.name}
                    {item.selectedSize ? ` (${item.selectedSize})` : ''}
                  </span>
                  <span className="font-medium shrink-0 ml-2">
                    {item.product.isQuoteOnly ? 'Quote' : `KES ${(item.product.price * item.quantity).toLocaleString()}`}
                  </span>
                </div>
              ))}
            </div>

            {hasQuoteOnlyItems && (
              <p className="text-[11px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200/50">
                Notice: Custom quotation items will be priced by the Mamlaka team on WhatsApp.
              </p>
            )}
          </div>

          {/* Customer Input Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#0a3d24]" />
                <span>Customer / Business Name *</span>
              </label>
              <input
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Kiprono Koech / Apex Solutions Ltd"
                className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:border-[#0a3d24] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0a3d24]" />
                  <span>Phone Number (Call/WhatsApp) *</span>
                </label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. +254 759 884 132"
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:border-[#0a3d24] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0a3d24]" />
                  <span>Delivery Town / Location *</span>
                </label>
                <input
                  type="text"
                  required
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  placeholder="e.g. Nairobi CBD, Westlands, Kisumu, etc."
                  className="w-full text-xs sm:text-sm px-3.5 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:border-[#0a3d24] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#0a3d24]" />
                <span>Customization Details & Special Instructions</span>
              </label>
              <textarea
                rows={2}
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Include details about brand logo placement, color codes, or urgent delivery deadlines..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:border-[#0a3d24] focus:outline-none"
              />
            </div>
          </div>

          {/* Trust reassurance notice */}
          <div className="flex items-start gap-2 p-3 bg-emerald-50/70 rounded-xl border border-emerald-200/60 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">How WhatsApp Ordering Works:</p>
              <p className="text-[11px] text-emerald-800/90 mt-0.5 leading-relaxed">
                Clicking below opens WhatsApp with a pre-filled breakdown of your products and specifications. A Mamlaka Prints specialist will verify product availability, confirm delivery fees, review your artwork, and arrange payment. No payment is charged right now.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={() => setIsCheckoutOpen(false)}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Back to Cart
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:flex-1 py-3 px-6 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-bold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Preparing WhatsApp Message...</span>
                </>
              ) : (
                <>
                  <MessageSquare className="w-4 h-4" />
                  <span>Place Order via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
