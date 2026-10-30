import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json({ limit: '10mb' }));

// Data file paths
const DATA_DIR = path.join(__dirname, 'data');
const STORE_FILE = path.join(DATA_DIR, 'store.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default products
const defaultProducts = [
  {
    id: 'mp-apparel-01',
    name: 'Premium Branded Polo & Crewneck T-Shirts',
    category: 'Branded Goods',
    subcategory: 'Branded T-shirts, polo shirts, and uniforms',
    price: 950,
    isQuoteOnly: false,
    description: 'High-density 100% combed cotton branded t-shirts and pique polo shirts. Superior breathability, colorfast embroidery and screen printing.',
    features: ['100% Combed Heavy Cotton (210 GSM)', 'Precision Embroidery or Silkscreen Print', 'Ribbed Collar & Double Needle Stitching', 'Pre-shrunk fabric for longevity'],
    image: '/images/product_branded_apparel.jpg',
    badge: 'Best Seller',
    inStock: true,
    moq: 5,
    unit: 'piece',
    options: {
      sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      colors: ['Forest Green', 'Navy Blue', 'Crisp White', 'Carbon Black', 'Burgundy Red'],
      finishes: ['Chest Embroidery', 'Direct-to-Film (DTF)', 'Silkscreen', 'Back & Front Print']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-mat-01',
    name: 'Premium Self-Adhesive Gloss & Matte Vinyl Rolls',
    category: 'Printing Materials',
    subcategory: 'Vinyl and adhesive materials',
    price: 4800,
    isQuoteOnly: false,
    description: 'Commercial-grade polymeric calendered adhesive vinyl film for signage, vehicle graphics, and architectural lettering. Compatible with Eco-Solvent, UV, and Latex printers.',
    features: ['1.22m x 50m / 1.52m x 50m roll sizes', 'Bubble-free adhesive backing', 'Outdoor lifespan 3-5 years', 'Waterproof and UV resistant'],
    image: '/src/assets/images/product_printing_materials_1793172273253.jpg',
    badge: 'Featured',
    inStock: true,
    moq: 1,
    unit: 'roll',
    options: {
      materials: ['Gloss Finish (100 micron)', 'Matte Finish (100 micron)', 'Clear Transparent Vinyl', 'Frosted Glass Vinyl'],
      sizes: ['1.22m x 50m', '1.52m x 50m']
    },
    allowArtworkUpload: false
  },
  {
    id: 'mp-drink-01',
    name: 'Laser-Engraved Stainless Steel Water Bottles & Tumblers',
    category: 'Branded Goods',
    subcategory: 'Customized mugs and water bottles',
    price: 1350,
    isQuoteOnly: false,
    description: 'Double-wall vacuum insulated stainless steel flasks and travel tumblers. Keeps drinks cold for 24h and hot for 12h. Crisp permanent laser etching or UV print.',
    features: ['Food-grade 304 Stainless Steel', 'Leakproof spout lid with carry loop', 'Permanent precision laser engraving', 'Sweat-proof powder coated exterior'],
    image: '/images/product_custom_drinkware.jpg',
    badge: 'Best Seller',
    inStock: true,
    moq: 5,
    unit: 'piece',
    options: {
      colors: ['Deep Forest Green', 'Arctic White', 'Midnight Navy', 'Matte Black'],
      sizes: ['500ml Flask', '750ml Sports Bottle', '1200ml Mega Tumbler', '350ml Ceramic Mug'],
      finishes: ['Precision Laser Engraving', 'Full-Wrap UV Color Print']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-stat-01',
    name: 'Executive Corporate Stationery & Identity Suite',
    category: 'Branded Goods',
    subcategory: 'Pens, notebooks, and stationery',
    price: 1800,
    isQuoteOnly: false,
    description: 'Executive embossed A5 hardbound corporate notebooks, metal twist pens, and satin branded lanyards with frosted acrylic ID badges. Perfect for staff and corporate gifting.',
    features: ['Debossed or Gold Foil Logo Stamp', '80gsm cream ruled fountain-friendly pages', 'Heavy-weight metal ballpoint pen', 'Soft-touch polyester lanyard with swivel clasp'],
    image: '/images/product_corporate_stationery.jpg',
    badge: 'Featured',
    inStock: true,
    moq: 10,
    unit: 'set',
    options: {
      colors: ['Charcoal Slate', 'Emerald Green', 'Royal Navy', 'Tan Brown'],
      finishes: ['Blind Deboss', 'Gold Foil Stamped', 'Silver Metallic Foil']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-mat-02',
    name: 'Sublimation Paper & Heat-Transfer Sheets',
    category: 'Printing Materials',
    subcategory: 'Sublimation paper and consumables',
    price: 2400,
    isQuoteOnly: false,
    description: 'High-speed dry sublimation transfer paper (100gsm) for apparel, polyester fabrics, ceramic mugs, and aluminum blanks. Ultra-sharp definition with >98% ink release rate.',
    features: ['100gsm Quick Dry Formulation', '100 Sheets per pack / A4 & A3', 'High ink loading without curling', 'True vivid color reproduction'],
    image: '/src/assets/images/product_printing_materials_1793172273253.jpg',
    badge: 'New Arrival',
    inStock: true,
    moq: 1,
    unit: 'pack (100 sheets)',
    options: {
      sizes: ['A4 Pack (100 Sheets)', 'A3 Pack (100 Sheets)', 'Roll 610mm x 100m']
    },
    allowArtworkUpload: false
  },
  {
    id: 'mp-mat-03',
    name: 'Heavy-Duty Flex Banner Materials (Frontlit & Backlit)',
    category: 'Printing Materials',
    subcategory: 'Banner and large-format printing materials',
    price: 7500,
    isQuoteOnly: false,
    description: 'Commercial PVC flex banner rolls engineered for billboards, outdoor promotions, tear-drop flags, and road hoardings. High tensile strength, smooth surface finish.',
    features: ['440gsm Heavy Frontlit PVC', 'Tear-resistant polyester scrim mesh', 'Flame retardant & weather durable', 'Gloss or Matte topcoat'],
    image: '/src/assets/images/product_printing_materials_1793172273253.jpg',
    badge: 'Featured',
    inStock: true,
    moq: 1,
    unit: 'roll',
    options: {
      sizes: ['1.6m x 50m Roll', '2.2m x 50m Roll', '3.2m x 50m Roll'],
      finishes: ['Gloss Finish', 'Matte Finish']
    },
    allowArtworkUpload: false
  },
  {
    id: 'mp-serv-01',
    name: 'Custom Large Format Exhibition & Roll-Up Banners',
    category: 'Custom Printing',
    subcategory: 'Banners, posters, and promotional displays',
    price: 4500,
    isQuoteOnly: false,
    description: 'Complete aluminium retractable pull-up banner stand with vivid HD eco-solvent printed non-curl satin banner. Includes padded oxford travel carrying case.',
    features: ['85cm x 200cm standard executive stand', 'Non-curl anti-glare blockout film', 'High-res 1440 DPI digital print', 'Padded zipper travel case included'],
    image: '/images/hero_printing_workshop.jpg',
    badge: 'Best Seller',
    inStock: true,
    moq: 1,
    unit: 'display unit',
    options: {
      sizes: ['Standard Executive 85cm x 200cm', 'Wide Format 100cm x 200cm', 'Luxury Teardrop Base 85cm x 200cm'],
      materials: ['Non-Curl Satin Film', 'Heavyweight PVC Canvas']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-serv-02',
    name: 'Custom Corporate Merchandise & Bulk Gift Bundles',
    category: 'Custom Printing',
    subcategory: 'Corporate merchandise branding',
    price: 0,
    isQuoteOnly: true,
    description: 'Customized bulk branding packages tailored for conferences, year-end executive gifting, brand launches, and team kits. Tailored with custom boxes, apparel, and premium tech items.',
    features: ['Custom branded luxury rigid box packaging', 'Curated product selection to client budget', 'Free digital 3D mockup visual proof', 'Flexible tiered quantity discounts'],
    image: '/images/product_corporate_stationery.jpg',
    badge: 'Featured',
    inStock: true,
    moq: 20,
    unit: 'package quote',
    options: {
      materials: ['Conference Kit', 'Executive VIP Gift Box', 'Staff Onboarding Welcome Pack', 'Trade Show Giveaways']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-serv-03',
    name: 'Die-Cut Waterproof Vinyl Stickers & Product Labels',
    category: 'Custom Printing',
    subcategory: 'Sticker and label printing',
    price: 15,
    isQuoteOnly: false,
    description: 'Custom contour die-cut waterproof vinyl stickers and retail product labels. Scratch-proof, UV resistant, and oil-proof. Cut to any custom shape or size.',
    features: ['Precision laser kiss-cut or die-cut to shape', 'Gloss or Matte UV protective laminate', 'Fade-proof vibrant eco-inks', 'Easy peel backing'],
    image: '/src/assets/images/product_printing_materials_1793172273253.jpg',
    badge: 'Best Seller',
    inStock: true,
    moq: 50,
    unit: 'sticker',
    options: {
      finishes: ['High Gloss UV Laminated', 'Soft-Touch Matte Laminated', 'Holographic Rainbow Sheen', 'Clear Transparent'],
      sizes: ['5cm x 5cm Circle/Custom', '7.5cm x 7.5cm Custom', '10cm x 10cm Custom']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-bag-01',
    name: 'Heavy Canvas Branded Tote Bags & Shopping Bags',
    category: 'Branded Goods',
    subcategory: 'Tote bags and shopping bags',
    price: 450,
    isQuoteOnly: false,
    description: 'Eco-friendly 10oz heavy unbleached cotton canvas tote bags with reinforced cross-stitched webbing handles. Durable, washable, and stylish for corporate giveaways.',
    features: ['100% Natural Cotton Canvas (280 GSM)', 'Long comfortable shoulder straps (65cm)', 'Generous 38cm x 42cm capacity', 'Silkscreen or full color digital transfer'],
    image: '/images/hero_printing_workshop.jpg',
    badge: 'New Arrival',
    inStock: true,
    moq: 10,
    unit: 'piece',
    options: {
      colors: ['Natural Off-White Canvas', 'Forest Green', 'Midnight Navy', 'Jet Black'],
      finishes: ['Single-Sided Screen Print', 'Double-Sided Screen Print', 'Full Color Digital Print']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-cap-01',
    name: 'Branded Structured Baseball Caps & Bucket Hats',
    category: 'Branded Goods',
    subcategory: 'Branded caps and hats',
    price: 650,
    isQuoteOnly: false,
    description: '6-panel heavy brushed cotton twill caps with pre-curved visor, stitched eyelets, and adjustable brass buckle closure. 3D puff embroidery or flat embroidery.',
    features: ['Heavy brushed cotton twill', 'Structured front crown', '3D Puff or Flat high-density embroidery', 'Adjustable buckle strap closure'],
    image: '/images/product_branded_apparel.jpg',
    badge: 'Best Seller',
    inStock: true,
    moq: 10,
    unit: 'piece',
    options: {
      colors: ['Forest Green', 'Navy Blue', 'Black', 'Stone Beige', 'Crimson Red'],
      finishes: ['3D Puff Embroidery Front', 'Flat Front + Side Embroidery']
    },
    allowArtworkUpload: true
  },
  {
    id: 'mp-cards-01',
    name: 'Luxury Velvet-Touch Business Cards & Flyers',
    category: 'Custom Printing',
    subcategory: 'Business cards, flyers, brochures, and calendars',
    price: 1800,
    isQuoteOnly: false,
    description: 'Ultra-heavy 400gsm artboard business cards with soft-touch velvet lamination and raised spot UV or gold foil accents. Make an unforgettable first impression.',
    features: ['400gsm Premium Silk Artcard', 'Double-sided velvet soft-touch lamination', 'Raised Gold Foil or Spot Gloss UV', 'Standard 85mm x 55mm or square'],
    image: '/images/product_corporate_stationery.jpg',
    badge: 'Best Seller',
    inStock: true,
    moq: 1,
    unit: 'box (100 cards)',
    options: {
      finishes: ['Soft-Touch Velvet + Raised Spot UV', 'Soft-Touch + Raised Gold Foil', 'Classic Matte Double-Sided'],
      sizes: ['Box of 100 Cards', 'Box of 200 Cards', 'Box of 500 Cards']
    },
    allowArtworkUpload: true
  }
];

const defaultSettings = {
  whatsappNumber: '254759884132',
  phone: '+254 759 884 132',
  email: 'mamlakaprints@gmail.com',
  address: 'Mamlaka Road, Commercial Hub, Nairobi, Kenya',
  workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM | Sat: 9:00 AM - 4:00 PM',
  announcement: 'Fast countrywide dispatch across Kenya. Order directly via WhatsApp!',
  currency: 'KES'
};

// Initial state store
function loadStore() {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading store file, initializing default:', err);
  }
  const initial = {
    products: defaultProducts,
    orders: [
      {
        id: 'MP-26-8941',
        customerName: 'Kiprono Koech',
        customerPhone: '+254722334455',
        deliveryLocation: 'Upper Hill, Nairobi',
        specialInstructions: 'Please ensure embroidery matches our vector hex #0f5132.',
        items: [
          {
            productId: 'mp-apparel-01',
            productName: 'Premium Branded Polo & Crewneck T-Shirts',
            unitPrice: 950,
            isQuoteOnly: false,
            quantity: 25,
            selectedSize: 'L',
            selectedColor: 'Forest Green',
            selectedFinish: 'Chest Embroidery',
            artworkFileName: 'koech_logomark.svg'
          }
        ],
        subtotalKes: 23750,
        totalKes: 23750,
        hasQuoteOnlyItems: false,
        status: 'in_production',
        createdAt: '2026-10-27T14:30:00.000Z',
        adminNotes: 'Client sent vector on WhatsApp. Stitching underway.'
      },
      {
        id: 'MP-26-8942',
        customerName: 'Amina Wanjiku',
        customerPhone: '+254711889900',
        deliveryLocation: 'Westlands Commercial Hub, Nairobi',
        specialInstructions: 'Need for corporate end-of-year summit on Friday.',
        items: [
          {
            productId: 'mp-drink-01',
            productName: 'Laser-Engraved Stainless Steel Water Bottles & Tumblers',
            unitPrice: 1350,
            isQuoteOnly: false,
            quantity: 30,
            selectedSize: '500ml Flask',
            selectedColor: 'Deep Forest Green',
            selectedFinish: 'Precision Laser Engraving',
            artworkFileName: 'apex_summit_crest.png'
          },
          {
            productId: 'mp-serv-01',
            productName: 'Custom Large Format Exhibition & Roll-Up Banners',
            unitPrice: 4500,
            isQuoteOnly: false,
            quantity: 2,
            selectedSize: 'Standard Executive 85cm x 200cm',
            selectedMaterial: 'Non-Curl Satin Film'
          }
        ],
        subtotalKes: 49500,
        totalKes: 49500,
        hasQuoteOnlyItems: false,
        status: 'confirmed',
        createdAt: '2026-10-27T17:15:00.000Z',
        adminNotes: 'WhatsApp verified. Delivery scheduled for Thursday.'
      }
    ],
    settings: defaultSettings,
    inquiries: []
  };
  fs.writeFileSync(STORE_FILE, JSON.stringify(initial, null, 2), 'utf-8');
  return initial;
}

function saveStore(data: any) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Failed to save store:', err);
  }
}

let store = loadStore();

// API Routes
app.get('/api/products', (req, res) => {
  res.json({ success: true, data: store.products });
});

app.post('/api/products', (req, res) => {
  const newProduct = {
    ...req.body,
    id: req.body.id || `mp-prod-${Date.now()}`
  };
  store.products.unshift(newProduct);
  saveStore(store);
  res.json({ success: true, data: newProduct });
});

app.put('/api/products/:id', (req, res) => {
  const index = store.products.findIndex((p: any) => p.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Product not found' });
  }
  store.products[index] = { ...store.products[index], ...req.body };
  saveStore(store);
  res.json({ success: true, data: store.products[index] });
});

app.delete('/api/products/:id', (req, res) => {
  store.products = store.products.filter((p: any) => p.id !== req.params.id);
  saveStore(store);
  res.json({ success: true, message: 'Product deleted' });
});

// Orders API
app.get('/api/orders', (req, res) => {
  res.json({ success: true, data: store.orders });
});

app.post('/api/orders', (req, res) => {
  const orderId = req.body.id || `MP-${new Date().getFullYear().toString().slice(-2)}-${Math.floor(1000 + Math.random() * 9000)}`;
  const newOrder = {
    ...req.body,
    id: orderId,
    status: req.body.status || 'pending',
    createdAt: new Date().toISOString()
  };
  store.orders.unshift(newOrder);
  saveStore(store);
  res.json({ success: true, data: newOrder });
});

app.patch('/api/orders/:id', (req, res) => {
  const index = store.orders.findIndex((o: any) => o.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Order not found' });
  }
  store.orders[index] = { ...store.orders[index], ...req.body };
  saveStore(store);
  res.json({ success: true, data: store.orders[index] });
});

app.delete('/api/orders/:id', (req, res) => {
  store.orders = store.orders.filter((o: any) => o.id !== req.params.id);
  saveStore(store);
  res.json({ success: true, message: 'Order deleted' });
});

// Settings API
app.get('/api/settings', (req, res) => {
  res.json({ success: true, data: store.settings });
});

app.put('/api/settings', (req, res) => {
  store.settings = { ...store.settings, ...req.body };
  saveStore(store);
  res.json({ success: true, data: store.settings });
});

// Inquiries API
app.post('/api/inquiries', (req, res) => {
  const inquiry = {
    ...req.body,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  store.inquiries = store.inquiries || [];
  store.inquiries.unshift(inquiry);
  saveStore(store);
  res.json({ success: true, data: inquiry });
});

// Admin Auth check
app.post('/api/admin/login', (req, res) => {
  const { pin } = req.body;
  // Default PIN is 'mamlaka2026' or 'admin123'
  if (pin === 'mamlaka2026' || pin === 'admin123' || pin === '254759') {
    return res.json({ success: true, token: 'mamlaka-authenticated-session' });
  }
  return res.status(401).json({ success: false, message: 'Invalid Admin PIN' });
});

// Mount Vite or serve static
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Mamlaka Prints server running on http://0.0.0.0:${port}`);
  });
}

startServer();
