import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    hasQuoteOnlyItems,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/60 backdrop-blur-xs transition-opacity">
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#0a3d24]" />
            <h2 className="font-bold text-base text-slate-900">Your Shopping Cart</h2>
            <span className="text-xs font-semibold text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <p className="font-semibold text-slate-800 text-sm">Your cart is empty</p>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Explore our printing materials, branded merchandise, and custom solutions to add items.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-2 text-xs font-semibold text-[#0a3d24] hover:underline"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemTotal = item.product.isQuoteOnly
                ? null
                : item.product.price * item.quantity;

              return (
                <div
                  key={item.cartId}
                  className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/90 flex gap-3.5 relative"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 pr-6">
                    <h4 className="font-semibold text-xs text-slate-900 leading-snug line-clamp-1">
                      {item.product.name}
                    </h4>

                    {/* Variations */}
                    <div className="flex flex-wrap gap-x-2 gap-y-0.5 text-[11px] text-slate-500 mt-1">
                      {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                      {item.selectedColor && <span>· Color: {item.selectedColor}</span>}
                      {item.selectedFinish && <span>· Finish: {item.selectedFinish}</span>}
                      {item.selectedMaterial && <span>· {item.selectedMaterial}</span>}
                      {item.artworkFileName && (
                        <span className="text-emerald-700 font-medium">
                          · Artwork: {item.artworkFileName}
                        </span>
                      )}
                    </div>

                    {/* Unit Price */}
                    <div className="mt-1 text-xs text-slate-600 font-medium">
                      {item.product.isQuoteOnly ? (
                        <span className="text-amber-800 font-semibold">Price on Request</span>
                      ) : (
                        <span>KES {item.product.price.toLocaleString()} each</span>
                      )}
                    </div>

                    {/* Quantity Stepper & Subtotal */}
                    <div className="mt-2.5 flex items-center justify-between">
                      <div className="flex items-center border border-slate-300 rounded bg-white">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartId, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.cartId, item.quantity + 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-100 text-xs font-bold"
                        >
                          +
                        </button>
                      </div>

                      {itemTotal !== null && (
                        <span className="text-xs font-bold text-slate-900 tabular-nums">
                          KES {itemTotal.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.cartId)}
                    className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-slate-200 bg-slate-50/80 space-y-4 shrink-0">
            {/* Subtotal calculation */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-semibold text-slate-900 tabular-nums">
                  KES {cartSubtotal.toLocaleString()}
                </span>
              </div>

              {hasQuoteOnlyItems && (
                <div className="flex items-start gap-1.5 text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200/70">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Cart includes custom quote items. Final quote will be confirmed on WhatsApp.
                  </span>
                </div>
              )}

              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Estimated Total</span>
                <span className="text-[#0a3d24] tabular-nums">
                  KES {cartSubtotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Place Order via WhatsApp</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Direct WhatsApp Submission</span>
                <button
                  onClick={clearCart}
                  className="text-slate-400 hover:text-red-600 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
