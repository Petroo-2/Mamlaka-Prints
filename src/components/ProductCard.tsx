import React from 'react';
import { ShoppingBag, MessageSquare, Plus, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { setActiveProductModal, sendDirectProductInquiry, addToCart } = useStore();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If product has variations or requires quote, open the detail modal to select options
    if (product.options || product.isQuoteOnly || product.allowArtworkUpload) {
      setActiveProductModal(product);
      return;
    }

    addToCart({
      productId: product.id,
      product,
      quantity: product.moq || 1
    });
  };

  const handleDirectWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    sendDirectProductInquiry(product, product.moq || 1);
  };

  return (
    <div
      onClick={() => setActiveProductModal(product)}
      className="group relative bg-white rounded-xl border border-slate-200/90 overflow-hidden hover:border-[#0a3d24]/50 hover:shadow-lg transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image Slot */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Styled graceful fallback container
            (e.target as HTMLElement).style.display = 'none';
          }}
        />

        {/* Badge (at most 1 subtle tag) */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[11px] font-semibold text-[#0a3d24] px-2.5 py-0.5 rounded shadow-xs border border-slate-200/50">
            {product.badge}
          </div>
        )}

        {/* Quick View Overlay on Desktop */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <span className="bg-white/95 text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm">
            View Customization Options
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed clean metadata */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-1">
            <span className="uppercase tracking-wider font-medium text-[11px] text-[#0a3d24]">
              {product.category}
            </span>
            <span aria-hidden="true">·</span>
            <span className="truncate">{product.subcategory}</span>
          </div>

          {/* Product Title */}
          <h3 className="font-semibold text-slate-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#0a3d24] transition-colors">
            {product.name}
          </h3>

          {/* Price & MOQ */}
          <div className="mt-2.5 flex items-baseline justify-between gap-2">
            <div>
              {product.isQuoteOnly ? (
                <div className="text-sm font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/60 inline-block">
                  Price on Request
                </div>
              ) : (
                <div className="text-base sm:text-lg font-bold text-slate-900 tabular-nums">
                  <span className="text-xs font-normal text-slate-500 mr-1">KES</span>
                  {product.price.toLocaleString()}
                  <span className="text-xs font-normal text-slate-500 ml-1">/ {product.unit}</span>
                </div>
              )}
            </div>

            {product.moq > 1 && (
              <span className="text-[11px] text-slate-500 font-medium">
                MOQ: {product.moq} {product.unit}s
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={handleQuickAdd}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0a3d24] hover:bg-[#072a19] text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{product.isQuoteOnly ? 'Request Quote' : 'Add to Cart'}</span>
          </button>

          <button
            onClick={handleDirectWhatsApp}
            title="Chat about this product on WhatsApp"
            className="p-2 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 rounded-lg transition-colors shrink-0"
          >
            <MessageSquare className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
