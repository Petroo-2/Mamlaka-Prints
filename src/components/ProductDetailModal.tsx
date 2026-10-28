import React, { useState, useEffect } from 'react';
import { X, ShoppingBag, MessageSquare, Check, Upload, FileCheck, AlertCircle, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, sendDirectProductInquiry, settings } = useStore();

  if (!product) return null;

  const minQty = product.moq || 1;
  const [quantity, setQuantity] = useState<number>(minQty);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedFinish, setSelectedFinish] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [customizationNotes, setCustomizationNotes] = useState<string>('');
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [artworkPreview, setArtworkPreview] = useState<string | null>(null);

  // Initialize options defaults when product changes
  useEffect(() => {
    if (product) {
      setQuantity(product.moq || 1);
      setSelectedSize(product.options?.sizes?.[0] || '');
      setSelectedColor(product.options?.colors?.[0] || '');
      setSelectedFinish(product.options?.finishes?.[0] || '');
      setSelectedMaterial(product.options?.materials?.[0] || '');
      setCustomizationNotes('');
      setArtworkFile(null);
      setArtworkPreview(null);
    }
  }, [product]);

  // Handle artwork file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (< 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB. Please select a smaller file or send vector via WhatsApp directly.');
        return;
      }
      setArtworkFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setArtworkPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setArtworkPreview(null);
      }
    }
  };

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      product,
      quantity,
      selectedSize: selectedSize || undefined,
      selectedColor: selectedColor || undefined,
      selectedFinish: selectedFinish || undefined,
      selectedMaterial: selectedMaterial || undefined,
      customizationNotes: customizationNotes.trim() || undefined,
      artworkFileName: artworkFile ? artworkFile.name : undefined
    });
    onClose();
  };

  const handleDirectWhatsAppOrder = () => {
    // Generate tailored WhatsApp chat message directly for this single item
    const unitPriceText = product.isQuoteOnly
      ? 'Price on Request'
      : `KES ${product.price.toLocaleString()}`;

    const totalEstimateText = product.isQuoteOnly
      ? 'Custom Quote Required'
      : `KES ${(product.price * quantity).toLocaleString()}`;

    const variantDetails = [
      selectedSize ? `Size: ${selectedSize}` : null,
      selectedColor ? `Color: ${selectedColor}` : null,
      selectedFinish ? `Finish: ${selectedFinish}` : null,
      selectedMaterial ? `Material: ${selectedMaterial}` : null,
      artworkFile ? `Artwork attached/ready: ${artworkFile.name}` : null,
      customizationNotes ? `Custom Notes: ${customizationNotes}` : null
    ]
      .filter(Boolean)
      .join('\n- ');

    const message = [
      'Hello Mamlaka Prints! I would like to order this item:',
      '',
      `Product: ${product.name}`,
      `Category: ${product.category} (${product.subcategory})`,
      `Quantity: ${quantity} ${product.unit}(s)`,
      `Unit Price: ${unitPriceText}`,
      `Estimated Subtotal: ${totalEstimateText}`,
      '',
      variantDetails ? `Specifications:\n- ${variantDetails}` : 'Standard specifications',
      '',
      artworkFile
        ? 'Note: I have artwork ready and will attach it in this WhatsApp chat.'
        : 'Please confirm availability, artwork requirements, and delivery.',
      '',
      'Thank you.'
    ].join('\n');

    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`, '_blank');
    onClose();
  };

  const currentTotal = product.isQuoteOnly ? null : product.price * quantity;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="font-semibold text-[#0a3d24] uppercase">{product.category}</span>
            <span>/</span>
            <span className="truncate max-w-xs">{product.subcategory}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: 2-Column Split */}
        <div className="p-6 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Left Column: Image & Feature Highlights */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-white/95 text-xs font-semibold text-[#0a3d24] px-2.5 py-1 rounded shadow-xs">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Feature Highlights */}
            {product.features && product.features.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#0a3d24]" />
                  <span>Product Specifications</span>
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {product.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock / Lead time advisory */}
            <div className="flex items-center gap-2 text-xs text-slate-500 px-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Available for Nairobi pick-up & countrywide courier dispatch</span>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase Configuration */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
                  Pricing
                </span>
                {product.isQuoteOnly ? (
                  <div className="text-lg font-bold text-amber-800">Price on Request</div>
                ) : (
                  <div className="text-2xl font-bold text-slate-900 tabular-nums">
                    <span className="text-xs text-slate-500 font-normal mr-1">KES</span>
                    {product.price.toLocaleString()}
                    <span className="text-xs text-slate-500 font-normal ml-1">/ {product.unit}</span>
                  </div>
                )}
              </div>

              {currentTotal !== null && (
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 uppercase tracking-wider block font-medium">
                    Calculated Total
                  </span>
                  <div className="text-lg font-bold text-[#0a3d24] tabular-nums">
                    KES {currentTotal.toLocaleString()}
                  </div>
                </div>
              )}
            </div>

            {/* Variation: Sizes */}
            {product.options?.sizes && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Size / Dimension
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.options.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedSize === s
                          ? 'border-[#0a3d24] bg-emerald-50 text-[#0a3d24] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variation: Colors */}
            {product.options?.colors && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Select Color
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.options.colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setSelectedColor(c)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedColor === c
                          ? 'border-[#0a3d24] bg-emerald-50 text-[#0a3d24] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variation: Finishes */}
            {product.options?.finishes && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Branding Finish / Method
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.options.finishes.map((f) => (
                    <button
                      key={f}
                      type="button"
                      onClick={() => setSelectedFinish(f)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedFinish === f
                          ? 'border-[#0a3d24] bg-emerald-50 text-[#0a3d24] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variation: Materials */}
            {product.options?.materials && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Material Specification
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.options.materials.map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setSelectedMaterial(m)}
                      className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all cursor-pointer ${
                        selectedMaterial === m
                          ? 'border-[#0a3d24] bg-emerald-50 text-[#0a3d24] shadow-xs'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                  Quantity ({product.unit}s)
                </label>
                {product.moq > 1 && (
                  <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    Minimum Order: {product.moq} {product.unit}s
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(minQty, quantity - 1))}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={minQty}
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || minQty;
                      setQuantity(Math.max(minQty, val));
                    }}
                    className="w-16 text-center text-sm font-bold text-slate-900 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-slate-500">
                  {quantity} {product.unit}(s) selected
                </span>
              </div>
            </div>

            {/* Artwork Upload Component (For branded products) */}
            {product.allowArtworkUpload && (
              <div className="p-3.5 bg-slate-50/80 rounded-xl border border-dashed border-slate-300">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                    <Upload className="w-3.5 h-3.5 text-[#0a3d24]" />
                    <span>Upload Logo or Artwork File (Optional)</span>
                  </label>
                  <span className="text-[11px] text-slate-500">PNG, JPG, PDF, SVG (Max 10MB)</span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    id="artwork-upload"
                    accept=".png,.jpg,.jpeg,.svg,.pdf,.ai,.eps"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="artwork-upload"
                    className="cursor-pointer px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium border border-slate-300 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>{artworkFile ? 'Change File' : 'Browse Files'}</span>
                  </label>

                  {artworkFile ? (
                    <div className="flex items-center gap-2 text-xs text-emerald-800 font-medium truncate">
                      <FileCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="truncate">{artworkFile.name}</span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">No file chosen</span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>You can also attach high-res vectors directly in the WhatsApp chat.</span>
                </p>
              </div>
            )}

            {/* Custom Notes */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Special Customization Instructions (Optional)
              </label>
              <textarea
                rows={2}
                value={customizationNotes}
                onChange={(e) => setCustomizationNotes(e.target.value)}
                placeholder="e.g. Logo on left chest, specific hex color, delivery deadline..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:border-[#0a3d24] focus:outline-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full sm:flex-1 py-3 px-4 bg-[#0a3d24] hover:bg-[#072a19] text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>{product.isQuoteOnly ? 'Add to Quote Request' : 'Add to Cart'}</span>
              </button>

              <button
                type="button"
                onClick={handleDirectWhatsAppOrder}
                className="w-full sm:flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm rounded-lg transition-colors flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order on WhatsApp Now</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
