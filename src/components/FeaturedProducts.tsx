import React, { useState } from 'react';
import { ArrowRight, Sparkles, Flame, Star } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const FeaturedProducts: React.FC = () => {
  const { products, setActiveTab, setSelectedCategory } = useStore();
  const [filterType, setFilterType] = useState<'all' | 'bestseller' | 'new'>('all');

  const filteredProducts = products.filter((p) => {
    if (filterType === 'bestseller') return p.badge === 'Best Seller';
    if (filterType === 'new') return p.badge === 'New Arrival';
    return p.badge === 'Best Seller' || p.badge === 'Featured' || p.badge === 'New Arrival';
  });

  return (
    <section className="py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider mb-1">
              <span>Top Selections</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Ready for Customization & Delivery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Best Sellers & Featured Products
            </h2>
          </div>

          {/* Interactive filter tabs (functional buttons) */}
          <div className="flex items-center gap-1.5 p-1 bg-white rounded-lg border border-slate-200 self-start md:self-auto shadow-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                filterType === 'all'
                  ? 'bg-[#0a3d24] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Featured
            </button>
            <button
              onClick={() => setFilterType('bestseller')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                filterType === 'bestseller'
                  ? 'bg-[#0a3d24] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Best Sellers</span>
            </button>
            <button
              onClick={() => setFilterType('new')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1 cursor-pointer ${
                filterType === 'new'
                  ? 'bg-[#0a3d24] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span>New Arrivals</span>
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All Bottom Bar */}
        <div className="mt-10 text-center">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold border border-slate-300 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <span>View All Printing Supplies & Merchandise</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
