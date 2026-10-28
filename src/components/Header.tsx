import React, { useState } from 'react';
import { ShoppingBag, MessageSquare, Menu, X, Shield, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    cartCount,
    setIsCartOpen,
    setSelectedCategory,
    settings,
    setSearchQuery
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const handleNavClick = (tab: string, category: string = 'All') => {
    setActiveTab(tab);
    setSelectedCategory(category);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsAppGeneral = () => {
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent('Hello Mamlaka Prints! I would like to make an inquiry about your printing materials and branded goods.')}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
          
          {/* Zone 1: Brand Mark & Official Logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none group shrink-0"
          >
            <div className="w-12 h-12 rounded-lg bg-emerald-50/80 p-1 border border-emerald-100 flex items-center justify-center overflow-hidden shadow-xs group-hover:scale-105 transition-transform">
              <img
                src="/assets/aistudio/WhatsApp_Image_2026-10-27_at_19.04.47_0488f7e0.jpeg"
                alt="Mamlaka Prints Logo"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#0a3d24]">
                  Mamlaka
                </span>
                <span className="font-extrabold text-xl sm:text-2xl tracking-tight text-[#dc2626]">
                  Prints
                </span>
              </div>
              <p className="text-[10px] tracking-wider font-semibold text-slate-500 uppercase -mt-0.5">
                Printing & Branding Kenya
              </p>
            </div>
          </button>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('home')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'home' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'shop' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              All Products
            </button>
            <button
              onClick={() => handleNavClick('materials', 'Printing Materials')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'materials' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              Printing Materials
            </button>
            <button
              onClick={() => handleNavClick('branded', 'Branded Goods')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'branded' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              Branded Goods
            </button>
            <button
              onClick={() => handleNavClick('custom', 'Custom Printing')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'custom' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              Custom Printing
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'about' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`hover:text-[#0a3d24] transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'contact' ? 'text-[#0a3d24] font-semibold border-b-2 border-[#0a3d24] py-1' : ''
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions (Search, WhatsApp, Cart) */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Quick search button */}
            <div className="relative">
              {showSearchInput ? (
                <div className="flex items-center bg-slate-100 rounded-lg px-2.5 py-1.5 border border-slate-300">
                  <Search className="w-4 h-4 text-slate-500 mr-2" />
                  <input
                    type="text"
                    placeholder="Search vinyl, t-shirts..."
                    autoFocus
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleNavClick('shop');
                        setShowSearchInput(false);
                      }
                    }}
                    className="w-32 sm:w-48 text-xs bg-transparent focus:outline-none text-slate-800"
                  />
                  <button
                    onClick={() => setShowSearchInput(false)}
                    className="text-slate-400 hover:text-slate-600 text-xs ml-1"
                  >
                    ×
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setShowSearchInput(true);
                    if (activeTab !== 'shop') {
                      handleNavClick('shop');
                    }
                  }}
                  className="p-2 text-slate-600 hover:text-[#0a3d24] hover:bg-slate-100 rounded-lg transition-colors"
                  title="Search products"
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Quick WhatsApp CTA (Desktop) */}
            <button
              onClick={openWhatsAppGeneral}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/80 rounded-lg transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Us</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center justify-center p-2.5 bg-[#0a3d24] text-white rounded-lg hover:bg-[#072d1a] transition-colors shadow-xs"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#dc2626] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Admin button subtle access */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`p-2 rounded-lg transition-colors ${
                activeTab === 'admin'
                  ? 'bg-amber-100 text-amber-900 font-semibold'
                  : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
              }`}
              title="Admin Orders & Portal"
            >
              <Shield className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 space-y-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'home' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop', 'All')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'shop' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              All Products & Catalog
            </button>
            <button
              onClick={() => handleNavClick('materials', 'Printing Materials')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'materials' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Printing Materials & Consumables
            </button>
            <button
              onClick={() => handleNavClick('branded', 'Branded Goods')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'branded' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Branded Goods & Promotional
            </button>
            <button
              onClick={() => handleNavClick('custom', 'Custom Printing')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'custom' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Custom Printing Services
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'about' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              About Mamlaka Prints
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'contact' ? 'bg-emerald-50 text-[#0a3d24] font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Contact & Location
            </button>
            <button
              onClick={() => handleNavClick('admin')}
              className={`w-full text-left px-4 py-2.5 rounded-md text-sm font-medium ${
                activeTab === 'admin' ? 'bg-amber-50 text-amber-900 font-semibold' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              Admin Portal (Orders & Catalog)
            </button>

            <div className="pt-2 px-4">
              <button
                onClick={openWhatsAppGeneral}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold text-sm transition-colors shadow-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Order via WhatsApp Direct</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
