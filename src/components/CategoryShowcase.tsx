import React from 'react';
import { ArrowRight, Printer, Sparkles, Box, FileText, Shirt, Coffee, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CategoryShowcase: React.FC = () => {
  const { setActiveTab, setSelectedCategory } = useStore();

  const categories = [
    {
      id: 'materials',
      name: 'Printing Materials & Supplies',
      categoryKey: 'Printing Materials',
      description: 'Self-adhesive vinyl rolls, PVC flex banner, sublimation sheets, sticker media & accessories for commercial print shops.',
      itemsCount: '12+ Varieties',
      image: '/src/assets/images/product_printing_materials_1793172273253.jpg',
      icon: Printer,
      highlights: ['Adhesive Vinyl Rolls', 'Frontlit/Backlit Flex Banner', 'Sublimation & Transfer Papers', 'Large-Format Accessories']
    },
    {
      id: 'branded',
      name: 'Branded Goods & Merchandise',
      categoryKey: 'Branded Goods',
      description: 'Customized company apparel, laser-engraved drinkware, executive stationery, tote bags, and corporate promotional gifts.',
      itemsCount: '25+ Items',
      image: '/src/assets/images/product_branded_apparel_1793172271708.jpg',
      icon: Shirt,
      highlights: ['Heavyweight Branded T-Shirts & Polos', 'Engraved Flasks & Ceramic Mugs', 'Executive Notebooks & Lanyards', 'Embroidered Caps & Tote Bags']
    },
    {
      id: 'custom',
      name: 'Custom Printing Services',
      categoryKey: 'Custom Printing',
      description: 'Professional roll-up exhibition banners, die-cut waterproof stickers, business stationery, and tailored corporate merchandise kits.',
      itemsCount: 'Custom Specs',
      image: '/src/assets/images/product_corporate_stationery_1793172274479.jpg',
      icon: Sparkles,
      highlights: ['Executive Pull-Up Banners', 'Die-Cut Waterproof Stickers', 'Velvet-Touch Business Cards', 'Custom Corporate Gift Bundles']
    }
  ];

  const handleSelect = (categoryKey: string, tab: string) => {
    setSelectedCategory(categoryKey);
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#0a3d24] uppercase tracking-wider mb-1">
              <span>Organized Product Collections</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-500 font-normal">Factory Direct Quality</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Featured Categories
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Select a category to browse in-stock supplies or configure customized branded merchandise for your organization.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveTab('shop');
            }}
            className="text-xs font-semibold text-[#0a3d24] hover:text-[#062918] flex items-center gap-1.5 transition-colors group cursor-pointer self-start md:self-auto"
          >
            <span>Browse Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => handleSelect(cat.categoryKey, cat.id === 'custom' ? 'custom' : cat.id === 'materials' ? 'materials' : 'branded')}
                className="group relative bg-slate-50/60 rounded-xl border border-slate-200/90 overflow-hidden hover:border-[#0a3d24]/50 transition-all hover:shadow-md cursor-pointer flex flex-col"
              >
                {/* Visual Image Banner */}
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded text-xs font-semibold text-[#0a3d24] flex items-center gap-1.5 shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                    <span>{cat.itemsCount}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-[#0a3d24] transition-colors">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>

                    {/* Highlights list */}
                    <div className="mt-4 pt-3 border-t border-slate-200/70 space-y-1.5">
                      {cat.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0a3d24]/60"></span>
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 flex items-center justify-between text-xs font-semibold text-[#0a3d24]">
                    <span>View Category Products</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
