export interface Product {
  id: string;
  name: string;
  category: 'Printing Materials' | 'Branded Goods' | 'Custom Printing';
  subcategory: string;
  price: number;
  isQuoteOnly: boolean;
  description: string;
  features: string[];
  image: string;
  badge?: 'Featured' | 'Best Seller' | 'New Arrival';
  inStock: boolean;
  moq: number;
  unit: string;
  options?: {
    sizes?: string[];
    colors?: string[];
    finishes?: string[];
    materials?: string[];
  };
  allowArtworkUpload?: boolean;
}

export interface CartItem {
  cartId: string;
  productId: string;
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFinish?: string;
  selectedMaterial?: string;
  customizationNotes?: string;
  artworkFileName?: string;
  artworkDataUrl?: string;
}

export type OrderStatus = 'pending' | 'confirmed' | 'in_production' | 'ready_for_dispatch' | 'completed' | 'cancelled';

export interface OrderItemRecord {
  productId: string;
  productName: string;
  unitPrice: number;
  isQuoteOnly: boolean;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
  selectedFinish?: string;
  selectedMaterial?: string;
  customizationNotes?: string;
  artworkFileName?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  deliveryLocation: string;
  specialInstructions: string;
  items: OrderItemRecord[];
  subtotalKes: number;
  totalKes: number;
  hasQuoteOnlyItems: boolean;
  status: OrderStatus;
  createdAt: string;
  adminNotes?: string;
}

export interface StoreSettings {
  whatsappNumber: string;
  phone: string;
  email: string;
  address: string;
  workingHours: string;
  announcement: string;
  currency: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}
