import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw, PackageOpen, ChevronRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ShopCatalog: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setActiveTab
  } = useStore();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedBadge, setSelectedBadge] = useState<string>('All');
  const [priceSort, setPriceSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(10000);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const mainCategories = ['All', 'Printing Materials', 'Branded Goods', 'Custom Printing'];

  // Calculate dynamic subcategories based on active main category
  const subcategories = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'All') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    const unique = Array.from(new Set(list.map((p) => p.subcategory)));
    return ['All', ...unique];
  }, [products, selectedCategory]);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Main category
        if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
        // Subcategory
        if (selectedSubcategory !== 'All' && p.subcategory !== selectedSubcategory) return false;
        // Badge
        if (selectedBadge !== 'All' && p.badge !== selectedBadge) return false;
        // Price slider (exclude quote-only from filtering out, or filter if price <= max)
        if (!p.isQuoteOnly && p.price > maxPriceFilter) return false;
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchSub = p.subcategory.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchSub) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (priceSort === 'price-asc') return a.price - b.price;
        if (priceSort === 'price-desc') return b.price - a.price;
        if (priceSort === 'name-asc') return a.name.localeCompare(b.name);
        return 0; // featured natural order
      });
  }, [products, selectedCategory, selectedSubcategory, selectedBadge, maxPriceFilter, searchQuery, priceSort]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSelectedBadge('All');
    setMaxPriceFilter(10000);
    setSearchQuery('');
    setPriceSort('featured');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <button
            onClick={() => setActiveTab('home')}
            className="hover:text-[#0a3d24] transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubcategory('All');
            }}
            className="hover:text-[#0a3d24] transition-colors cursor-pointer"
          >
            Store Catalog
          </button>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-800">{selectedCategory}</span>
            </>
          )}
        </div>

        {/* Page Header with Search & Filter Trigger */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {selectedCategory === 'All' ? 'Complete Products & Services Catalog' : selectedCategory}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Browse commercial supplies, custom garments, and promotional goods with direct WhatsApp checkout.
              </p>
            </div>

            {/* Live Search input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search printing vinyl, t-shirts, mugs..."
                className="w-full text-xs sm:text-sm pl-9 pr-8 py-2.5 rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Department Selection Tabs */}
          <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
            {mainCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setSelectedSubcategory('All');
                }}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0a3d24] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden ml-auto flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        {/* Catalog Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar Filter Controls */}
          <aside className={`lg:col-span-3 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#0a3d24]" />
                <span>Filters & Sorting</span>
              </span>
              <button
                onClick={handleResetFilters}
                className="text-[11px] text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Sort By
              </label>
              <select
                value={priceSort}
                onChange={(e: any) => setPriceSort(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
              >
                <option value="featured">Featured / Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Product Name: A - Z</option>
              </select>
            </div>

            {/* Subcategory List */}
            {subcategories.length > 2 && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Subcategory
                </label>
                <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                  {subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubcategory(sub)}
                      className={`w-full text-left px-2.5 py-1.5 text-xs rounded transition-colors block truncate cursor-pointer ${
                        selectedSubcategory === sub
                          ? 'bg-emerald-50 text-[#0a3d24] font-semibold'
                          : 'text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Badge Tag Filter */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                Product Collection
              </label>
              <div className="flex flex-wrap gap-1.5">
                {['All', 'Best Seller', 'Featured', 'New Arrival'].map((badge) => (
                  <button
                    key={badge}
                    onClick={() => setSelectedBadge(badge)}
                    className={`px-2.5 py-1 text-xs rounded-md border transition-all cursor-pointer ${
                      selectedBadge === badge
                        ? 'border-[#0a3d24] bg-emerald-50 text-[#0a3d24] font-semibold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {badge}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-semibold text-slate-700 uppercase tracking-wider">
                  Max Unit Price
                </span>
                <span className="font-bold text-slate-900 tabular-nums">
                  KES {maxPriceFilter.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="500"
                max="10000"
                step="500"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#0a3d24] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>KES 500</span>
                <span>KES 10,000+</span>
              </div>
            </div>

            {/* Quick WhatsApp assistance callout */}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200/60 text-xs text-emerald-900">
              <p className="font-bold">Need a Custom Quote?</p>
              <p className="text-[11px] text-emerald-800/90 mt-0.5">
                If you have custom specs or bulk orders not listed here, message our WhatsApp team directly.
              </p>
            </div>
          </aside>

          {/* Right Column: Products Grid */}
          <main className="lg:col-span-9">
            
            {/* Results bar */}
            <div className="flex items-center justify-between mb-4 text-xs text-slate-500">
              <span>
                Showing <strong className="text-slate-800">{filteredProducts.length}</strong> products
              </span>
              {(selectedCategory !== 'All' || selectedSubcategory !== 'All' || searchQuery) && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#0a3d24] hover:underline font-medium"
                >
                  Clear all filters
                </button>
              )}
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                  <PackageOpen className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-base text-slate-900">No products match your criteria</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or adjusting the price slider and subcategory filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 bg-[#0a3d24] text-white text-xs font-bold rounded-lg hover:bg-[#072a19] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>
    </div>
  );
};
