/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { FeaturedProducts } from './components/FeaturedProducts';
import { CustomPrintingSection } from './components/CustomPrintingSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Testimonials } from './components/Testimonials';
import { ShopCatalog } from './components/ShopCatalog';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { AdminDashboard } from './components/AdminDashboard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmedModal } from './components/OrderConfirmedModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

const MainContent: React.FC = () => {
  const { activeTab, activeProductModal, setActiveProductModal } = useStore();

  const renderActiveView = () => {
    switch (activeTab) {
      case 'home':
        return (
          <>
            <Hero />
            <CategoryShowcase />
            <FeaturedProducts />
            <CustomPrintingSection />
            <WhyChooseUs />
            <Testimonials />
          </>
        );

      case 'shop':
      case 'materials':
      case 'branded':
        return <ShopCatalog />;

      case 'custom':
        return (
          <div className="space-y-4">
            <CustomPrintingSection />
            <ShopCatalog />
          </div>
        );

      case 'about':
        return <AboutSection />;

      case 'contact':
        return <ContactSection />;

      case 'admin':
        return <AdminDashboard />;

      default:
        return (
          <>
            <Hero />
            <CategoryShowcase />
            <FeaturedProducts />
            <CustomPrintingSection />
            <WhyChooseUs />
            <Testimonials />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {renderActiveView()}
      </main>

      {/* Global Modals & Overlays */}
      <ProductDetailModal
        product={activeProductModal}
        onClose={() => setActiveProductModal(null)}
      />
      <CartDrawer />
      <CheckoutModal />
      <OrderConfirmedModal />

      {/* Persistent Floating WhatsApp Help Desk */}
      <WhatsAppFloatingButton />

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <MainContent />
    </StoreProvider>
  );
}
