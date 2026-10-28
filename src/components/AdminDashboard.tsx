import React, { useState } from 'react';
import { Shield, KeyRound, ShoppingBag, Package, Settings, Search, Check, Clock, Truck, CheckCircle2, XCircle, Trash2, Edit3, Plus, ExternalLink, MessageSquare, AlertCircle, Save, LogOut } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Order, Product, OrderStatus, StoreSettings } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    products,
    settings,
    updateOrderStatus,
    deleteOrder,
    saveProduct,
    deleteProduct,
    saveSettings,
    refreshData
  } = useStore();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mamlaka_admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [authError, setAuthError] = useState('');
  const [activeAdminTab, setActiveAdminTab] = useState<'orders' | 'products' | 'settings'>('orders');

  // Order filters
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<Order | null>(null);

  // Product editor state
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<StoreSettings>(settings);
  const [settingsSavedNotice, setSettingsSavedNotice] = useState(false);

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    // Accepts 'mamlaka2026', 'admin123', or '254759'
    if (pinInput === 'mamlaka2026' || pinInput === 'admin123' || pinInput === '254759') {
      setIsAuthenticated(true);
      sessionStorage.setItem('mamlaka_admin_auth', 'true');
      refreshData();
    } else {
      setAuthError('Incorrect PIN. Default PIN: mamlaka2026');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('mamlaka_admin_auth');
  };

  // Filtered orders
  const filteredOrders = orders.filter((o) => {
    if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchName = o.customerName.toLowerCase().includes(q);
      const matchPhone = o.customerPhone.toLowerCase().includes(q);
      const matchLoc = o.deliveryLocation.toLowerCase().includes(q);
      if (!matchId && !matchName && !matchPhone && !matchLoc) return false;
    }
    return true;
  });

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-800">Pending Review</span>;
      case 'confirmed':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800">Confirmed</span>;
      case 'in_production':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-800">In Production</span>;
      case 'ready_for_dispatch':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-100 text-indigo-800">Ready for Dispatch</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-red-100 text-red-800">Cancelled</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  // WhatsApp follow-up link to customer
  const handleFollowUpWhatsApp = (order: Order) => {
    const cleanCustomerPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const message = `Hello ${order.customerName}! This is Mamlaka Prints regarding your Order Reference ${order.id}. Current status: ${order.status.replace(/_/g, ' ').toUpperCase()}. How may we assist with the artwork or delivery today?`;
    window.open(`https://wa.me/${cleanCustomerPhone}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveSettings(settingsForm);
    if (success) {
      setSettingsSavedNotice(true);
      setTimeout(() => setSettingsSavedNotice(false), 3000);
    }
  };

  // Save Product
  const handleSaveProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct?.name) return;
    await saveProduct(editingProduct);
    setEditingProduct(null);
    setIsNewProduct(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="py-20 bg-slate-50 min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
          <div className="w-12 h-12 bg-emerald-100 text-[#0a3d24] rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-center text-slate-900">Mamlaka Admin Portal</h2>
          <p className="text-xs text-slate-500 text-center mt-1 mb-6">
            Enter authorized store management PIN to manage orders and products.
          </p>

          {authError && (
            <div className="p-3 mb-4 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg">
              {authError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Passcode / PIN
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (e.g. mamlaka2026)"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 bg-white focus:ring-2 focus:ring-[#0a3d24]/20 focus:outline-none"
                  autoFocus
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Default demo access PIN: <code className="font-mono text-slate-700">mamlaka2026</code></p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#0a3d24] hover:bg-[#072a19] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              Sign In to Admin Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-slate-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header Bar */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#0a3d24] text-white flex items-center justify-center font-bold">
              M
            </div>
            <div>
              <h1 className="font-extrabold text-lg sm:text-xl text-slate-900">
                Mamlaka Prints Operations Desk
              </h1>
              <p className="text-xs text-slate-500">
                Order Management · Product Catalog · Store Configuration
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => refreshData()}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Refresh Data
            </button>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setActiveAdminTab('orders')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'orders'
                ? 'bg-[#0a3d24] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Orders & Inquiries ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveAdminTab('products')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'products'
                ? 'bg-[#0a3d24] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products & Pricing ({products.length})</span>
          </button>

          <button
            onClick={() => {
              setActiveAdminTab('settings');
              setSettingsForm(settings);
            }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeAdminTab === 'settings'
                ? 'bg-[#0a3d24] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Store & WhatsApp Settings</span>
          </button>
        </div>

        {/* TAB 1: ORDERS MANAGEMENT */}
        {activeAdminTab === 'orders' && (
          <div className="space-y-4">
            
            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by order ID, name, location..."
                  className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                {['all', 'pending', 'confirmed', 'in_production', 'ready_for_dispatch', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-2.5 py-1 text-xs rounded font-medium transition-colors cursor-pointer capitalize ${
                      orderStatusFilter === st
                        ? 'bg-[#0a3d24] text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {st.replace(/_/g, ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Customer Details</th>
                      <th className="py-3 px-4">Delivery Location</th>
                      <th className="py-3 px-4">Subtotal</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No orders match the current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((ord) => (
                        <tr key={ord.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-4 font-mono font-bold text-slate-900">
                            {ord.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-800">{ord.customerName}</div>
                            <div className="text-slate-500 text-[11px]">{ord.customerPhone}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-600 max-w-xs truncate">
                            {ord.deliveryLocation}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                            KES {ord.subtotalKes.toLocaleString()}
                          </td>
                          <td className="py-3 px-4">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-xs font-semibold py-1 px-2 rounded border border-slate-200 bg-white cursor-pointer focus:outline-none"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="in_production">In Production</option>
                              <option value="ready_for_dispatch">Ready for Dispatch</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-[11px] whitespace-nowrap">
                            {new Date(ord.createdAt).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                            <button
                              onClick={() => setSelectedOrderDetails(ord)}
                              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded"
                              title="View Order Items"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleFollowUpWhatsApp(ord)}
                              className="p-1.5 text-emerald-700 hover:bg-emerald-50 rounded"
                              title="Message Customer on WhatsApp"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Delete order ${ord.id}?`)) {
                                  deleteOrder(ord.id);
                                }
                              }}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                              title="Delete Order Record"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Order Details Modal */}
            {selectedOrderDetails && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
                <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-slate-900">
                      Order Details: {selectedOrderDetails.id}
                    </h3>
                    <button
                      onClick={() => setSelectedOrderDetails(null)}
                      className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <div className="text-xs space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <div><strong>Customer:</strong> {selectedOrderDetails.customerName} ({selectedOrderDetails.customerPhone})</div>
                    <div><strong>Location:</strong> {selectedOrderDetails.deliveryLocation}</div>
                    <div><strong>Instructions:</strong> {selectedOrderDetails.specialInstructions || 'None provided'}</div>
                    <div><strong>Status:</strong> {selectedOrderDetails.status.toUpperCase()}</div>
                  </div>

                  <div>
                    <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700 mb-2">
                      Items Ordered ({selectedOrderDetails.items.length})
                    </h4>
                    <div className="space-y-2">
                      {selectedOrderDetails.items.map((it, i) => (
                        <div key={i} className="p-2.5 bg-slate-50 rounded border border-slate-200 text-xs space-y-1">
                          <div className="flex justify-between font-bold text-slate-900">
                            <span>{it.quantity}x {it.productName}</span>
                            <span>{it.isQuoteOnly ? 'Quote Required' : `KES ${(it.unitPrice * it.quantity).toLocaleString()}`}</span>
                          </div>
                          <div className="text-slate-500 text-[11px] space-x-2">
                            {it.selectedSize && <span>Size: {it.selectedSize}</span>}
                            {it.selectedColor && <span>Color: {it.selectedColor}</span>}
                            {it.selectedFinish && <span>Finish: {it.selectedFinish}</span>}
                            {it.selectedMaterial && <span>Material: {it.selectedMaterial}</span>}
                            {it.artworkFileName && <span className="text-emerald-700 font-semibold">Artwork: {it.artworkFileName}</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button
                      onClick={() => handleFollowUpWhatsApp(selectedOrderDetails)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Customer</span>
                    </button>
                    <button
                      onClick={() => setSelectedOrderDetails(null)}
                      className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-lg text-xs font-semibold"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeAdminTab === 'products' && (
          <div className="space-y-4">
            
            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div>
                <h3 className="font-bold text-sm text-slate-900">Store Inventory & Catalog</h3>
                <p className="text-xs text-slate-500">Edit prices, toggle custom quote status, or add new materials & branded items.</p>
              </div>
              <button
                onClick={() => {
                  setIsNewProduct(true);
                  setEditingProduct({
                    name: '',
                    category: 'Printing Materials',
                    subcategory: 'General Supplies',
                    price: 1000,
                    isQuoteOnly: false,
                    description: '',
                    features: ['Heavyweight commercial quality'],
                    image: '/src/assets/images/product_printing_materials_1793172273253.jpg',
                    badge: 'New Arrival',
                    inStock: true,
                    moq: 1,
                    unit: 'piece',
                    allowArtworkUpload: true
                  });
                }}
                className="px-3.5 py-2 bg-[#0a3d24] hover:bg-[#072a19] text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products List Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-3 px-4">Item</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price (KES)</th>
                      <th className="py-3 px-4">MOQ</th>
                      <th className="py-3 px-4">Badge</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {products.map((prod) => (
                      <tr key={prod.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded overflow-hidden bg-slate-100 shrink-0">
                              <img src={prod.image} alt={prod.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-semibold text-slate-900 line-clamp-1">{prod.name}</div>
                              <div className="text-slate-400 text-[10px]">{prod.subcategory}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-slate-600 font-medium">{prod.category}</td>
                        <td className="py-3 px-4 font-bold text-slate-900 tabular-nums">
                          {prod.isQuoteOnly ? (
                            <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px]">Price on Request</span>
                          ) : (
                            <span>KES {prod.price.toLocaleString()}</span>
                          )}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{prod.moq} {prod.unit}</td>
                        <td className="py-3 px-4">
                          {prod.badge ? (
                            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                              {prod.badge}
                            </span>
                          ) : (
                            <span className="text-slate-400">—</span>
                          )}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[11px] font-bold ${prod.inStock ? 'text-emerald-700' : 'text-red-600'}`}>
                            {prod.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-1 whitespace-nowrap">
                          <button
                            onClick={() => {
                              setIsNewProduct(false);
                              setEditingProduct(prod);
                            }}
                            className="p-1.5 text-slate-700 hover:bg-slate-100 rounded"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete product ${prod.name}?`)) {
                                deleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Product Edit / Create Modal */}
            {editingProduct && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
                <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl my-8 space-y-4 max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center pb-3 border-b border-slate-200">
                    <h3 className="font-bold text-base text-slate-900">
                      {isNewProduct ? 'Add New Product' : `Edit: ${editingProduct.name}`}
                    </h3>
                    <button
                      onClick={() => setEditingProduct(null)}
                      className="text-slate-400 hover:text-slate-700 text-lg font-bold"
                    >
                      ×
                    </button>
                  </div>

                  <form onSubmit={handleSaveProductSubmit} className="space-y-4 text-xs">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Product Name</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Department</label>
                        <select
                          value={editingProduct.category || 'Printing Materials'}
                          onChange={(e: any) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                          className="w-full p-2 rounded border border-slate-300"
                        >
                          <option value="Printing Materials">Printing Materials</option>
                          <option value="Branded Goods">Branded Goods</option>
                          <option value="Custom Printing">Custom Printing</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Subcategory</label>
                        <input
                          type="text"
                          value={editingProduct.subcategory || ''}
                          onChange={(e) => setEditingProduct({ ...editingProduct, subcategory: e.target.value })}
                          className="w-full p-2 rounded border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 items-center">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Price (KES)</label>
                        <input
                          type="number"
                          disabled={editingProduct.isQuoteOnly}
                          value={editingProduct.price || 0}
                          onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                          className="w-full p-2 rounded border border-slate-300 disabled:bg-slate-100"
                        />
                      </div>

                      <div className="pt-4 flex items-center gap-2">
                        <input
                          type="checkbox"
                          id="quote-only-check"
                          checked={editingProduct.isQuoteOnly || false}
                          onChange={(e) => setEditingProduct({ ...editingProduct, isQuoteOnly: e.target.checked })}
                          className="w-4 h-4 accent-[#0a3d24]"
                        />
                        <label htmlFor="quote-only-check" className="font-semibold text-slate-800">
                          Price on Request
                        </label>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">MOQ</label>
                        <input
                          type="number"
                          min="1"
                          value={editingProduct.moq || 1}
                          onChange={(e) => setEditingProduct({ ...editingProduct, moq: Number(e.target.value) })}
                          className="w-full p-2 rounded border border-slate-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Description</label>
                      <textarea
                        rows={3}
                        value={editingProduct.description || ''}
                        onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                        className="w-full p-2 rounded border border-slate-300"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Badge</label>
                        <select
                          value={editingProduct.badge || ''}
                          onChange={(e: any) => setEditingProduct({ ...editingProduct, badge: e.target.value || undefined })}
                          className="w-full p-2 rounded border border-slate-300"
                        >
                          <option value="">None</option>
                          <option value="Best Seller">Best Seller</option>
                          <option value="Featured">Featured</option>
                          <option value="New Arrival">New Arrival</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Unit of Measurement</label>
                        <input
                          type="text"
                          value={editingProduct.unit || 'piece'}
                          onChange={(e) => setEditingProduct({ ...editingProduct, unit: e.target.value })}
                          className="w-full p-2 rounded border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer font-semibold">
                        <input
                          type="checkbox"
                          checked={editingProduct.inStock ?? true}
                          onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                          className="w-4 h-4 accent-[#0a3d24]"
                        />
                        <span>In Stock</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer font-semibold">
                        <input
                          type="checkbox"
                          checked={editingProduct.allowArtworkUpload ?? true}
                          onChange={(e) => setEditingProduct({ ...editingProduct, allowArtworkUpload: e.target.checked })}
                          className="w-4 h-4 accent-[#0a3d24]"
                        />
                        <span>Allow Artwork Upload</span>
                      </label>
                    </div>

                    <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProduct(null)}
                        className="px-4 py-2 bg-slate-200 text-slate-800 rounded font-semibold"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#0a3d24] text-white rounded font-bold"
                      >
                        Save Product
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: SETTINGS CONFIGURATION */}
        {activeAdminTab === 'settings' && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs max-w-2xl">
            <h3 className="font-bold text-base text-slate-900 mb-1">
              Store & WhatsApp Integration Configuration
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Update the WhatsApp order desk number, phone lines, and physical pickup address across the entire website.
            </p>

            {settingsSavedNotice && (
              <div className="p-3 mb-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Settings updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-800 mb-1">
                  WhatsApp Orders Number (International Format, no + or spaces) *
                </label>
                <input
                  type="text"
                  required
                  value={settingsForm.whatsappNumber}
                  onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300 font-mono text-sm"
                  placeholder="e.g. 254759884132"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  This phone number receives all click-to-chat order payloads via https://wa.me/
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Phone Line (Display)</label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-800 mb-1">Official Email Address</label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Workshop / Pickup Address</label>
                <input
                  type="text"
                  value={settingsForm.address}
                  onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Working Hours</label>
                <input
                  type="text"
                  value={settingsForm.workingHours}
                  onChange={(e) => setSettingsForm({ ...settingsForm, workingHours: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-800 mb-1">Top Announcement Banner Text</label>
                <input
                  type="text"
                  value={settingsForm.announcement}
                  onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-slate-300"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0a3d24] hover:bg-[#072a19] text-white font-bold text-xs sm:text-sm rounded-lg transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
