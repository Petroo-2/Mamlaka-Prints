import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, StoreSettings, OrderStatus } from '../types';

interface StoreContextType {
  products: Product[];
  settings: StoreSettings;
  cart: CartItem[];
  orders: Order[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductModal: Product | null;
  setActiveProductModal: (product: Product | null) => void;
  latestConfirmedOrder: Order | null;
  setLatestConfirmedOrder: (order: Order | null) => void;
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  updateCartQuantity: (cartId: string, quantity: number) => void;
  removeFromCart: (cartId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  hasQuoteOnlyItems: boolean;
  submitWhatsAppOrder: (customer: {
    name: string;
    phone: string;
    location: string;
    instructions: string;
  }) => Promise<{ order: Order; whatsappUrl: string }>;
  sendDirectProductInquiry: (product: Product, quantity: number, notes?: string) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, adminNotes?: string) => Promise<boolean>;
  deleteOrder: (orderId: string) => Promise<boolean>;
  saveProduct: (product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (productId: string) => Promise<boolean>;
  saveSettings: (settings: Partial<StoreSettings>) => Promise<boolean>;
  refreshData: () => Promise<void>;
}

const defaultInitialSettings: StoreSettings = {
  whatsappNumber: '254759884132',
  phone: '+254 759 884 132',
  email: 'mamlakaprints@gmail.com',
  address: 'Mamlaka Road, Commercial District, Nairobi, Kenya',
  workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM',
  announcement: 'Fast countrywide dispatch across Kenya. Order directly via WhatsApp!',
  currency: 'KES'
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [settings, setSettings] = useState<StoreSettings>(defaultInitialSettings);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('mamlaka_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeProductModal, setActiveProductModal] = useState<Product | null>(null);
  const [latestConfirmedOrder, setLatestConfirmedOrder] = useState<Order | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('mamlaka_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage save error:', e);
    }
  }, [cart]);

  // Initial fetch from backend
  const refreshData = async () => {
    try {
      const [prodRes, settRes, ordRes] = await Promise.all([
        fetch('/api/products').catch(() => null),
        fetch('/api/settings').catch(() => null),
        fetch('/api/orders').catch(() => null)
      ]);

      if (prodRes && prodRes.ok) {
        const prodData = await prodRes.json();
        if (prodData.success && Array.isArray(prodData.data)) {
          setProducts(prodData.data);
        }
      }

      if (settRes && settRes.ok) {
        const settData = await settRes.json();
        if (settData.success && settData.data) {
          setSettings(settData.data);
        }
      }

      if (ordRes && ordRes.ok) {
        const ordData = await ordRes.json();
        if (ordData.success && Array.isArray(ordData.data)) {
          setOrders(ordData.data);
        }
      }
    } catch (err) {
      console.error('Data refresh error:', err);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Cart operations
  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    setCart((prev) => {
      // Check if exact same item variation exists
      const existingIndex = prev.findIndex(
        (ci) =>
          ci.productId === item.productId &&
          ci.selectedSize === item.selectedSize &&
          ci.selectedColor === item.selectedColor &&
          ci.selectedFinish === item.selectedFinish &&
          ci.selectedMaterial === item.selectedMaterial
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + item.quantity
        };
        return updated;
      }

      const newItem: CartItem = {
        ...item,
        cartId: `cart_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`
      };
      return [...prev, newItem];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (cartId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartSubtotal = cart.reduce((sum, item) => {
    if (item.product.isQuoteOnly) return sum;
    return sum + item.product.price * item.quantity;
  }, 0);

  const hasQuoteOnlyItems = cart.some((item) => item.product.isQuoteOnly);

  // Submit WhatsApp Order
  const submitWhatsAppOrder = async (customer: {
    name: string;
    phone: string;
    location: string;
    instructions: string;
  }) => {
    const orderRef = `MP-${new Date().getFullYear().toString().slice(-2)}-${Math.floor(1000 + Math.random() * 9000)}`;

    const orderItemsRecord = cart.map((item) => ({
      productId: item.productId,
      productName: item.product.name,
      unitPrice: item.product.price,
      isQuoteOnly: item.product.isQuoteOnly,
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      selectedFinish: item.selectedFinish,
      selectedMaterial: item.selectedMaterial,
      customizationNotes: item.customizationNotes,
      artworkFileName: item.artworkFileName
    }));

    const newOrder: Order = {
      id: orderRef,
      customerName: customer.name,
      customerPhone: customer.phone,
      deliveryLocation: customer.location,
      specialInstructions: customer.instructions || 'Standard processing',
      items: orderItemsRecord,
      subtotalKes: cartSubtotal,
      totalKes: cartSubtotal,
      hasQuoteOnlyItems,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    // Save to backend
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
      // Update local state orders
      setOrders((prev) => [newOrder, ...prev]);
    } catch (err) {
      console.warn('Could not post order to backend, order saved locally:', err);
    }

    // Format WhatsApp message strictly per specifications:
    // Format:
    // Hello Mamlaka Prints! I would like to place an order.
    //
    // Order Number: [Generated Order Reference]
    //
    // Products:
    // 1. [Product Name] — Quantity: [Quantity] — Price: KES [Price]
    // 2. [Product Name] — Quantity: [Quantity] — Price: KES [Price]
    //
    // Subtotal: KES [Subtotal]
    // Estimated Total: KES [Total]
    //
    // Customer Name: [Customer Name]
    // Phone Number: [Customer Phone]
    // Delivery Location: [Customer Location]
    // Customization Details: [Customer Instructions]
    //
    // Please confirm product availability, final pricing, delivery charges, and payment instructions.
    //
    // Thank you.

    const productLines = cart.map((item, idx) => {
      const priceDisplay = item.product.isQuoteOnly
        ? 'Price on Request'
        : `KES ${(item.product.price * item.quantity).toLocaleString()}`;

      const variants = [
        item.selectedSize ? `Size: ${item.selectedSize}` : null,
        item.selectedColor ? `Color: ${item.selectedColor}` : null,
        item.selectedFinish ? `Finish: ${item.selectedFinish}` : null,
        item.selectedMaterial ? `Material: ${item.selectedMaterial}` : null,
        item.artworkFileName ? `Artwork: ${item.artworkFileName}` : null,
        item.customizationNotes ? `Note: ${item.customizationNotes}` : null
      ]
        .filter(Boolean)
        .join(', ');

      const variantSuffix = variants ? ` (${variants})` : '';
      return `${idx + 1}. ${item.product.name}${variantSuffix} — Quantity: ${item.quantity} — Price: ${priceDisplay}`;
    }).join('\n');

    const subtotalText = hasQuoteOnlyItems
      ? `KES ${cartSubtotal.toLocaleString()} (+ Price on Request items)`
      : `KES ${cartSubtotal.toLocaleString()}`;

    const totalText = hasQuoteOnlyItems
      ? `KES ${cartSubtotal.toLocaleString()} (Pending custom quote items)`
      : `KES ${cartSubtotal.toLocaleString()}`;

    const customizationDetailsText = customer.instructions
      ? customer.instructions
      : 'As specified in product options above. Will attach logo files in this chat if required.';

    const message = [
      'Hello Mamlaka Prints! I would like to place an order.',
      '',
      `Order Number: ${orderRef}`,
      '',
      'Products:',
      productLines,
      '',
      `Subtotal: ${subtotalText}`,
      `Estimated Total: ${totalText}`,
      '',
      `Customer Name: ${customer.name}`,
      `Phone Number: ${customer.phone}`,
      `Delivery Location: ${customer.location}`,
      `Customization Details: ${customizationDetailsText}`,
      '',
      'Please confirm product availability, final pricing, delivery charges, and payment instructions.',
      '',
      'Thank you.'
    ].join('\n');

    // Clean international format for WhatsApp (e.g. 254759884132)
    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;

    // Set latest confirmed order for receipt popup
    setLatestConfirmedOrder(newOrder);
    clearCart();
    setIsCartOpen(false);
    setIsCheckoutOpen(false);

    return { order: newOrder, whatsappUrl };
  };

  // Direct product inquiry via WhatsApp
  const sendDirectProductInquiry = (product: Product, quantity: number, notes?: string) => {
    const priceText = product.isQuoteOnly
      ? 'Price on Request'
      : `KES ${(product.price * quantity).toLocaleString()} (Unit: KES ${product.price.toLocaleString()})`;

    const message = [
      'Hello Mamlaka Prints!',
      '',
      `I am inquiring about: ${product.name}`,
      `Category: ${product.category} (${product.subcategory})`,
      `Quantity: ${quantity} ${product.unit}(s)`,
      `Estimated Pricing: ${priceText}`,
      notes ? `Requirements: ${notes}` : '',
      '',
      'Please share available customization options, lead time, and quotation.',
      '',
      'Thank you.'
    ]
      .filter((line) => line !== '')
      .join('\n');

    const cleanPhone = settings.whatsappNumber.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Admin Actions
  const updateOrderStatus = async (orderId: string, status: OrderStatus, adminNotes?: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes })
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status, adminNotes: adminNotes ?? o.adminNotes } : o))
        );
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteOrder = async (orderId: string) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE' });
      if (res.ok) {
        setOrders((prev) => prev.filter((o) => o.id !== orderId));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const saveProduct = async (productData: Partial<Product>) => {
    try {
      const isNew = !productData.id;
      const url = isNew ? '/api/products' : `/api/products/${productData.id}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      });

      if (res.ok) {
        const saved = await res.json();
        if (saved.success) {
          if (isNew) {
            setProducts((prev) => [saved.data, ...prev]);
          } else {
            setProducts((prev) => prev.map((p) => (p.id === saved.data.id ? saved.data : p)));
          }
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const deleteProduct = async (productId: string) => {
    try {
      const res = await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts((prev) => prev.filter((p) => p.id !== productId));
        return true;
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  const saveSettings = async (newSettings: Partial<StoreSettings>) => {
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setSettings(data.data);
          return true;
        }
      }
    } catch (e) {
      console.error(e);
    }
    return false;
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        settings,
        cart,
        orders,
        activeTab,
        setActiveTab,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductModal,
        setActiveProductModal,
        latestConfirmedOrder,
        setLatestConfirmedOrder,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        hasQuoteOnlyItems,
        submitWhatsAppOrder,
        sendDirectProductInquiry,
        updateOrderStatus,
        deleteOrder,
        saveProduct,
        deleteProduct,
        saveSettings,
        refreshData
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
