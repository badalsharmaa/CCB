import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Search, Clock, ShoppingBag, Plus, Minus, User, ArrowLeft,
  Bell, SlidersHorizontal, Heart, Star, Trash2, Tag, ChevronRight,
  LayoutGrid, History, Settings, Flame, Leaf, LogOut, Loader2, CheckCircle2,
  CreditCard, Lock, X, Menu
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { CATEGORIES, MENU_ITEMS } from '../data/menu';

interface MenuItemCardProps {
  item: any;
  onAdd: (item: any) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onViewDetails: (item: any) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAdd, isFavorite, onToggleFavorite, onViewDetails }) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAdd(item);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group"
    >
      <div className="relative h-44 mb-4 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {item.spicy && <span className="bg-red-500 text-white p-1.5 rounded-full shadow-sm"><Flame className="w-3 h-3" /></span>}
          {item.veg && <span className="bg-green-500 text-white p-1.5 rounded-full shadow-sm"><Leaf className="w-3 h-3" /></span>}
        </div>

        {/* Wishlist Button */}
        <button 
          onClick={() => onToggleFavorite(item.id)}
          className={`absolute top-3 right-3 p-2 backdrop-blur-sm rounded-full transition-colors shadow-sm ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-400 hover:text-red-500'}`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>
      
      <h3 className="font-bold text-gray-900 mb-1 leading-tight">{item.name}</h3>
      
      <div className="flex items-center gap-2 mb-4">
        <span className="font-black text-brand-orange text-lg">${item.price.toFixed(2)}</span>
        <div className="ml-auto flex items-center gap-1 text-xs font-bold text-gray-600 bg-gray-50 px-2 py-1 rounded-lg">
          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {item.rating} <span className="text-gray-400 font-normal">({item.reviews})</span>
        </div>
      </div>
      
      <div className="mt-auto flex gap-2">
        <button 
          onClick={() => onViewDetails(item)}
          className="flex-1 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-bold rounded-xl transition-colors border border-gray-100"
        >
          Details
        </button>
        <motion.button 
          whileTap={{ scale: 0.95 }}
          animate={isAdded ? { scale: [1, 1.05, 1], backgroundColor: '#22c55e' } : {}}
          transition={{ duration: 0.3 }}
          onClick={handleAdd} 
          className={`flex-1 py-2.5 text-white text-sm font-bold rounded-xl transition-colors shadow-sm ${isAdded ? 'bg-green-500 shadow-green-500/20' : 'bg-brand-orange hover:bg-brand-orange/90 shadow-brand-orange/20'}`}
        >
          {isAdded ? 'Added!' : 'Order Now'}
        </motion.button>
      </div>
    </motion.div>
  );
}

const CategoryIcon = ({ icon }: { icon: string }) => {
  if (icon.startsWith('/') || icon.startsWith('http')) {
    return <img src={icon} alt="" className="w-5 h-5 object-contain" />;
  }
  return <span className="text-base">{icon}</span>;
};

export function Order() {
  const { user, login, logout } = useAuth();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState<{item: any, quantity: number}[]>([]);
  const [isCartOpenMobile, setIsCartOpenMobile] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'form' | 'processing' | 'success'>('form');
  const [lastOrderId, setLastOrderId] = useState('');
  const [cardDetails, setCardDetails] = useState({ name: '', number: '', expiry: '', cvv: '' });
  const [showHamburgerMenu, setShowHamburgerMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showPastOrders, setShowPastOrders] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [filterVeg, setFilterVeg] = useState(false);
  const [filterSpicy, setFilterSpicy] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]);
  };

  const filteredItems = MENU_ITEMS.filter(item => 
    (activeCategory === "All" || item.category === activeCategory) &&
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!filterVeg || item.veg) &&
    (!filterSpicy || item.spicy) &&
    (!showFavoritesOnly || favorites.includes(item.id))
  );

  const notifications = [
    { id: 1, title: 'Order Delivered!', message: 'Your last order was delivered successfully.', time: '2h ago', icon: <CheckCircle2 className="w-4 h-4 text-green-500" /> },
    { id: 2, title: 'New Promo Code', message: 'Use CHAT20 for 20% off on your next order.', time: '5h ago', icon: <Tag className="w-4 h-4 text-brand-orange" /> },
    { id: 3, title: 'Menu Update', message: 'Check out our new Mango Lassi!', time: '1d ago', icon: <Star className="w-4 h-4 text-yellow-400" /> },
  ];

  const pastOrders = [
    { id: 'ORD-8271', date: 'May 1, 2026', total: 42.50, itemsCount: 3, status: 'Delivered' },
    { id: 'ORD-7162', date: 'Apr 28, 2026', total: 28.99, itemsCount: 2, status: 'Delivered' },
    { id: 'ORD-6541', date: 'Apr 25, 2026', total: 15.40, itemsCount: 1, status: 'Delivered' },
  ];

  const addToCart = (item: any) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) {
        return prev.map(c => c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId: number, removeAll = false) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === itemId);
      if (existing && existing.quantity > 1 && !removeAll) {
        return prev.map(c => c.item.id === itemId ? { ...c, quantity: c.quantity - 1 } : c);
      }
      return prev.filter(c => c.item.id !== itemId);
    });
  };

  const cartTotal = cart.reduce((sum, c) => sum + (c.item.price * c.quantity), 0);
  const cartItemCount = cart.reduce((sum, c) => sum + c.quantity, 0);

  const handleCheckout = () => {
    if (!user) { login(); return; }
    setPaymentStep('form');
    setShowPaymentModal(true);
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentStep('processing');

    // Simulate payment processing (2.5 seconds)
    await new Promise(resolve => setTimeout(resolve, 2500));

    const orderId = `ORD-${Date.now()}-${Math.random().toString(36).slice(2, 5).toUpperCase()}`;

    // Send to backend API
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          userId: user?.uid,
          customerName: user?.displayName,
          customerEmail: user?.email,
          items: cart.map(c => ({ id: c.item.id.toString(), name: c.item.name, price: c.item.price, quantity: c.quantity })),
          subtotal: cartTotal,
          tax: cartTotal * 0.09,
          total: cartTotal * 1.09,
        }),
      });
    } catch {
      // If API is down in demo, continue anyway
    }

    setLastOrderId(orderId);
    setPaymentStep('success');
    setCart([]);
    setIsCartOpenMobile(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-[#F4F7FE] font-sans flex flex-col"
    >
      
      {/* Custom Header */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white border-b border-gray-100 sticky top-0 z-50 px-4 lg:px-8 py-4 flex items-center justify-between gap-4 shadow-sm"
      >
        <div className="flex items-center gap-3">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <Link to="/">
            <img src="/assets/logo.png" alt="Calcutta Chaat & Bakery" className="h-14 w-auto object-contain" />
          </Link>
        </div>

        {/* Hamburger Nav Menu */}
        <div className="relative">
          <button
            onClick={() => setShowHamburgerMenu(!showHamburgerMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <AnimatePresence>
            {showHamburgerMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowHamburgerMenu(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50 overflow-hidden"
                >
                  <button 
                    onClick={() => { setShowHamburgerMenu(false); setShowFavoritesOnly(false); }} 
                    className={`w-full flex items-center gap-3 px-4 py-2.5 font-bold text-sm transition-colors ${!showFavoritesOnly ? 'text-brand-orange bg-brand-orange/10' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <LayoutGrid className="w-4 h-4" /> Dashboard
                  </button>
                  <button 
                    onClick={() => { setShowHamburgerMenu(false); setShowFavoritesOnly(true); }} 
                    className={`w-full flex items-center gap-3 px-4 py-2.5 font-bold text-sm transition-colors ${showFavoritesOnly ? 'text-brand-orange bg-brand-orange/10' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Heart className={`w-4 h-4 ${showFavoritesOnly ? 'fill-current' : ''}`} /> Favorites
                  </button>
                  <button 
                    onClick={() => { setShowHamburgerMenu(false); setShowPastOrders(true); }} 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
                  >
                    <History className="w-4 h-4" /> Past Orders
                  </button>
                  <button 
                    onClick={() => { setShowHamburgerMenu(false); setShowSettings(true); }} 
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-gray-600 hover:bg-gray-50 font-medium text-sm transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Settings
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="flex-1 max-w-2xl hidden md:flex items-center gap-3">
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for dishes, rolls, chaat..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-orange/20 focus:border-brand-orange transition-all"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 rounded-xl transition-colors ${showFilters ? 'bg-brand-orange text-white' : 'bg-brand-orange/10 text-brand-orange hover:bg-brand-orange hover:text-white'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
            <AnimatePresence>
              {showFilters && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowFilters(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-3 px-4 z-50 space-y-3"
                  >
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Filters</h4>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={filterVeg} onChange={() => setFilterVeg(!filterVeg)} className="accent-brand-orange" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Vegetarian Only</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="checkbox" checked={filterSpicy} onChange={() => setFilterSpicy(!filterSpicy)} className="accent-brand-orange" />
                      <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">Spicy Only</span>
                    </label>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:gap-6">
          <div className="hidden xl:flex items-center gap-3 text-sm font-medium text-gray-600 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200">
            <span className="flex items-center gap-1.5 text-green-600">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Accepting Orders
            </span>
            <span className="w-px h-4 bg-gray-300"></span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" /> 15-20 min
            </span>
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 hover:bg-gray-100 rounded-full relative transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-orange rounded-full border border-white"></span>
            </button>
            <AnimatePresence>
              {showNotifications && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-2 border-b border-gray-50 flex items-center justify-between">
                      <span className="font-bold text-gray-900">Notifications</span>
                      <button className="text-xs text-brand-orange font-bold hover:underline">Mark all as read</button>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map(n => (
                        <div key={n.id} className="px-4 py-3 hover:bg-gray-50 transition-colors flex gap-3 border-b border-gray-50 last:border-0">
                          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                            {n.icon}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{n.title}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{n.message}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{n.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-gray-200 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || 'User'} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-brand-navy text-white flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <span className="text-sm font-bold hidden sm:block text-brand-navy truncate max-w-[100px]">
                  {user.displayName?.split(' ')[0] || 'Profile'}
                </span>
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 mb-2">
                      <p className="text-sm font-bold text-brand-navy truncate">{user.displayName}</p>
                      <p className="text-xs text-gray-500 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setShowProfileMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <button 
              onClick={login}
              className="flex items-center gap-2 hover:bg-gray-50 p-1 pr-3 rounded-full border border-gray-200 transition-colors"
            >
              <div className="w-8 h-8 bg-brand-navy text-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
              <span className="text-sm font-bold hidden sm:block text-brand-navy">Login</span>
            </button>
          )}
        </div>
      </motion.header>

      {/* Main Layout */}
      <div className="flex-1 w-full px-4 lg:px-8 py-6 flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar (Navigation) */}
        <motion.aside 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden lg:flex flex-col w-64 shrink-0 sticky top-28 h-[calc(100vh-120px)]"
        >
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 h-full flex flex-col">
            <div className="flex-1">
              <h3 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-3 px-4">Categories</h3>
              <div className="space-y-0.5 overflow-y-auto">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-1.5 rounded-xl text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-brand-navy text-white shadow-md'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <CategoryIcon icon={cat.icon} /> {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Promo Banner in Sidebar */}
            <div className="mt-auto bg-gradient-to-br from-brand-orange to-brand-yellow rounded-2xl p-5 text-white relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="font-bold mb-1">Free Mango Lassi</h4>
                <p className="text-xs text-white/90 mb-3">On orders over $50</p>
                <button className="bg-white text-brand-orange text-xs font-bold px-4 py-2 rounded-lg shadow-sm">Use Code: SWEET50</button>
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl opacity-20">🥤</div>
            </div>
          </div>
        </motion.aside>

        {/* Center Content (Menu Grid) */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex-1 flex flex-col gap-6"
        >
          
          {/* Mobile Search & Categories */}
          <div className="lg:hidden flex flex-col gap-4">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:border-brand-orange"
              />
            </div>
            
            <div className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              <div className="flex gap-2 w-max">
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                      activeCategory === cat.id 
                        ? 'bg-brand-navy text-white shadow-md' 
                        : 'bg-white text-gray-600 border border-gray-200'
                    }`}
                  >
                    <CategoryIcon icon={cat.icon} /> {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl text-brand-navy">{activeCategory === 'All' ? 'Explore Menu' : activeCategory}</h2>
            <div className="text-sm text-gray-500 font-medium">{filteredItems.length} items</div>
          </div>
          
          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 pb-24 lg:pb-0">
            <AnimatePresence mode="popLayout">
              {filteredItems.map(item => (
                <MenuItemCard 
                  key={item.id} 
                  item={item} 
                  onAdd={addToCart} 
                  isFavorite={favorites.includes(item.id)}
                  onToggleFavorite={toggleFavorite}
                  onViewDetails={setSelectedItem}
                />
              ))}
            </AnimatePresence>
          </div>
          
          {filteredItems.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              <p className="text-gray-500 font-medium">No items found matching your search.</p>
            </div>
          )}
        </motion.main>

        {/* Right Sidebar (Cart / Invoice) */}
        <motion.aside 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="hidden lg:flex flex-col w-80 xl:w-96 shrink-0 sticky top-28 h-[calc(100vh-120px)]"
        >
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
              <h3 className="font-bold text-lg text-brand-navy flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Invoice
              </h3>
              <span className="bg-brand-orange/10 text-brand-orange text-xs font-bold px-2.5 py-1 rounded-lg">{cartItemCount} Items</span>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30">
              {orderSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-green-500 space-y-4 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <CheckCircle2 className="w-16 h-16" />
                  </motion.div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">Order Placed!</p>
                    <p className="text-sm text-gray-500 mt-1">Your food is being prepared.</p>
                  </div>
                </div>
              ) : cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag className="w-12 h-12 opacity-20" />
                  <p className="font-medium">Your cart is empty</p>
                </div>
              ) : (
                cart.map(c => (
                  <div key={c.item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                      <img src={c.item.image} alt={c.item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1 line-clamp-1">{c.item.name}</h4>
                      <p className="text-brand-orange font-black text-sm">${c.item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <button onClick={() => removeFromCart(c.item.id, true)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-1.5 py-0.5">
                        <button onClick={() => removeFromCart(c.item.id)} className="p-0.5 hover:bg-white rounded text-gray-600 shadow-sm"><Minus className="w-3 h-3" /></button>
                        <span className="text-xs font-bold w-3 text-center">{c.quantity}</span>
                        <button onClick={() => addToCart(c.item)} className="p-0.5 hover:bg-white rounded text-gray-600 shadow-sm"><Plus className="w-3 h-3" /></button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-gray-100">
                {/* Promo Code */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Promo Code" className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange transition-all" />
                  </div>
                  <button className="px-4 py-2.5 bg-brand-navy text-white text-sm font-bold rounded-xl hover:bg-brand-navy/90 transition-colors">Apply</button>
                </div>

                <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax (9%)</span>
                    <span className="font-medium text-gray-900">${(cartTotal * 0.09).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Discount</span>
                    <span className="font-medium text-green-600">-$0.00</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Total Payment</span>
                    <span className="text-2xl font-black text-brand-navy">${(cartTotal * 1.09).toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange/90 transition-colors shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isCheckingOut ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                  ) : (
                    <>Place Order Now <ChevronRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            )}
          </div>
        </motion.aside>

      </div>

      {/* Mobile Cart Floating Bar */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <button 
              onClick={() => setIsCartOpenMobile(true)}
              className="w-full bg-brand-orange text-white py-4 rounded-2xl font-bold flex items-center justify-between px-6 shadow-lg shadow-brand-orange/20"
            >
              <div className="flex items-center gap-3">
                <div className="bg-white/20 w-8 h-8 rounded-full flex items-center justify-center text-sm backdrop-blur-sm">
                  {cartItemCount}
                </div>
                <span>View Invoice</span>
              </div>
              <span className="text-lg">${(cartTotal * 1.09).toFixed(2)}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Cart Full Screen Modal */}
      <AnimatePresence>
        {isCartOpenMobile && (
          <motion.div 
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "100%" }}
            className="fixed inset-0 z-[60] bg-[#F4F7FE] flex flex-col lg:hidden"
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm">
              <h2 className="font-bold text-lg text-brand-navy flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" /> Invoice
              </h2>
              <button onClick={() => setIsCartOpenMobile(false)} className="p-2 bg-gray-50 rounded-full text-gray-600">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cart.map(c => (
                <div key={c.item.id} className="flex gap-4 bg-white p-3 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-50">
                    <img src={c.item.image} alt={c.item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-gray-900 leading-tight mb-1">{c.item.name}</h4>
                    <p className="text-brand-orange font-black">${c.item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(c.item.id, true)} className="text-gray-400 hover:text-red-500 p-1">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-2 py-1">
                      <button onClick={() => removeFromCart(c.item.id)} className="p-1 hover:bg-white rounded text-gray-600 shadow-sm"><Minus className="w-3 h-3" /></button>
                      <span className="font-bold w-4 text-center">{c.quantity}</span>
                      <button onClick={() => addToCart(c.item)} className="p-1 hover:bg-white rounded text-gray-600 shadow-sm"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-white border-t border-gray-100 pb-safe shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="space-y-3 mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-medium text-gray-900">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (9%)</span>
                  <span className="font-medium text-gray-900">${(cartTotal * 0.09).toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                  <span className="text-gray-900 font-bold">Total Payment</span>
                  <span className="text-2xl font-black text-brand-navy">${(cartTotal * 1.09).toFixed(2)}</span>
                </div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isCheckingOut ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</>
                ) : (
                  <>Place Order Now <ChevronRight className="w-4 h-4" /></>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Item Detail Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {selectedItem && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[80]"
              onClick={() => setSelectedItem(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[81] w-full md:w-[700px] bg-white md:rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 bg-white/20 backdrop-blur-md hover:bg-white/40 rounded-full text-white z-10 transition-colors md:text-gray-400 md:bg-gray-100 md:hover:bg-gray-200"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-100">
                <img src={selectedItem.image} alt={selectedItem.name} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 flex gap-2">
                  {selectedItem.spicy && <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"><Flame className="w-3 h-3" /> Spicy</span>}
                  {selectedItem.veg && <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"><Leaf className="w-3 h-3" /> Veg</span>}
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-8 md:p-10 flex flex-col overflow-y-auto">
                <div className="mb-6">
                  <span className="text-brand-orange text-xs font-black uppercase tracking-widest mb-2 block">{selectedItem.category}</span>
                  <h2 className="font-serif text-3xl md:text-4xl text-brand-navy mb-3 leading-tight">{selectedItem.name}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-yellow-500 bg-yellow-50 px-2.5 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="font-bold text-sm">{selectedItem.rating}</span>
                    </div>
                    <span className="text-gray-400 text-sm font-medium">{selectedItem.reviews} Verified Reviews</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Description</h4>
                  <p className="text-gray-600 leading-relaxed italic">
                    "{selectedItem.description || "An authentic, freshly prepared dish featuring our signature spice blend and the finest local ingredients. Experience the true taste of Calcutta street food in every bite."}"
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Calories</p>
                    <p className="font-bold text-gray-900">320 - 450 kcal</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                    <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Prep Time</p>
                    <p className="font-bold text-gray-900">12 - 15 mins</p>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-6">
                  <div>
                    <p className="text-xs text-gray-400 font-bold uppercase mb-1">Price</p>
                    <p className="text-3xl font-black text-brand-orange">${selectedItem.price.toFixed(2)}</p>
                  </div>
                  <button 
                    onClick={() => { addToCart(selectedItem); setSelectedItem(null); }}
                    className="flex-1 py-4 bg-brand-navy text-white font-bold rounded-2xl hover:bg-brand-navy/90 transition-colors shadow-xl shadow-brand-navy/20 flex items-center justify-center gap-2"
                  >
                    Add to Cart <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Demo Payment Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showPaymentModal && (
          <>
            <motion.div
              key="pay-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
              onClick={() => paymentStep === 'form' && setShowPaymentModal(false)}
            />

            <motion.div
              key="pay-modal"
              initial={{ opacity: 0, y: 60, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 60, scale: 0.97 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[71] w-full md:w-[480px] bg-white rounded-t-3xl md:rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Success state */}
              {paymentStep === 'success' && (
                <div className="p-10 flex flex-col items-center text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', bounce: 0.5 }}>
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                  </motion.div>
                  <h3 className="font-serif text-3xl text-brand-navy mb-2">Order Confirmed!</h3>
                  <p className="text-gray-500 mb-2">Your food is being prepared 🍽️</p>
                  <div className="bg-brand-orange/10 text-brand-orange font-bold text-sm px-4 py-2 rounded-full mb-8">
                    {lastOrderId}
                  </div>
                  <div className="w-full bg-gray-50 rounded-2xl p-4 text-left space-y-2 mb-8 text-sm">
                    <div className="flex justify-between text-gray-500"><span>Subtotal</span><span className="text-gray-900 font-medium">${cartTotal.toFixed(2)}</span></div>
                    <div className="flex justify-between text-gray-500"><span>Tax (9%)</span><span className="text-gray-900 font-medium">${(cartTotal * 0.09).toFixed(2)}</span></div>
                    <div className="flex justify-between font-bold text-brand-navy pt-2 border-t"><span>Total Paid</span><span>${(cartTotal * 1.09).toFixed(2)}</span></div>
                  </div>
                  <button onClick={() => { setShowPaymentModal(false); setOrderSuccess(true); setTimeout(() => setOrderSuccess(false), 5000); }} className="w-full py-4 bg-brand-orange text-white font-bold rounded-xl">
                    Done
                  </button>
                </div>
              )}

              {/* Processing state */}
              {paymentStep === 'processing' && (
                <div className="p-10 flex flex-col items-center text-center">
                  <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mb-6">
                    <Loader2 className="w-10 h-10 text-brand-orange animate-spin" />
                  </div>
                  <h3 className="font-serif text-2xl text-brand-navy mb-2">Processing Payment</h3>
                  <p className="text-gray-400 text-sm">Securely processing your demo payment…</p>
                </div>
              )}

              {/* Card form state */}
              {paymentStep === 'form' && (
                <form onSubmit={handlePayment} className="p-6 md:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="font-serif text-2xl text-brand-navy">Payment</h3>
                      <span className="text-xs text-brand-orange font-bold bg-brand-orange/10 px-2 py-0.5 rounded-full">DEMO MODE</span>
                    </div>
                    <button type="button" onClick={() => setShowPaymentModal(false)} className="p-2 hover:bg-gray-100 rounded-full">
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  {/* Order summary strip */}
                  <div className="bg-gray-50 rounded-2xl p-4 mb-6 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">Total Due</p>
                      <p className="text-2xl font-black text-brand-navy">${(cartTotal * 1.09).toFixed(2)}</p>
                    </div>
                    <div className="text-right text-xs text-gray-400">
                      <p>{cart.reduce((s, c) => s + c.quantity, 0)} items</p>
                      <p>Tax incl.</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Name on Card</label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        value={cardDetails.name}
                        onChange={e => setCardDetails(p => ({ ...p, name: e.target.value }))}
                        required
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="4242 4242 4242 4242"
                          value={cardDetails.number}
                          onChange={e => setCardDetails(p => ({ ...p, number: e.target.value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim() }))}
                          required
                          className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Expiry</label>
                        <input
                          type="text"
                          placeholder="MM / YY"
                          value={cardDetails.expiry}
                          onChange={e => setCardDetails(p => ({ ...p, expiry: e.target.value }))}
                          required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">CVV</label>
                        <input
                          type="text"
                          placeholder="•••"
                          value={cardDetails.cvv}
                          onChange={e => setCardDetails(p => ({ ...p, cvv: e.target.value.slice(0, 4) }))}
                          required
                          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-orange"
                        />
                      </div>
                    </div>
                  </div>

                  <button type="submit" className="mt-6 w-full py-4 bg-brand-orange text-white font-bold rounded-xl hover:bg-brand-orange/90 transition-colors shadow-lg shadow-brand-orange/20 flex items-center justify-center gap-2">
                    <Lock className="w-4 h-4" /> Pay ${(cartTotal * 1.09).toFixed(2)} (Demo)
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">🔒 This is a demo — no real charge will be made</p>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Past Orders Modal ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showPastOrders && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
              onClick={() => setShowPastOrders(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[71] w-full md:w-[600px] bg-[#F4F7FE] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 bg-white border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-brand-navy">Order History</h3>
                <button onClick={() => setShowPastOrders(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {pastOrders.map(order => (
                  <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-brand-orange/30 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-brand-orange/5 group-hover:text-brand-orange transition-colors">
                        <History className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{order.id}</p>
                        <p className="text-xs text-gray-500">{order.date} • {order.itemsCount} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-brand-navy text-lg">${order.total.toFixed(2)}</p>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-white border-t border-gray-100">
                <button onClick={() => setShowPastOrders(false)} className="w-full py-3 bg-brand-navy text-white font-bold rounded-xl">Close</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── Settings Modal ────────────────────────────────────────────── */}
      <AnimatePresence>
        {showSettings && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[70]"
              onClick={() => setShowSettings(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-[15%] bottom-[15%] md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[71] w-full md:w-[500px] bg-white md:rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-brand-navy">Settings</h3>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-gray-100 rounded-full">
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                <section>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Account Information</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-brand-navy text-white flex items-center justify-center shrink-0">
                        {user?.photoURL ? <img src={user.photoURL} className="w-full h-full rounded-full" /> : <User />}
                      </div>
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-gray-900 truncate">{user?.displayName || 'Guest User'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || 'Login to see details'}</p>
                      </div>
                      <button className="text-xs font-bold text-brand-orange hover:underline">Edit</button>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Preferences</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div>
                        <p className="font-bold text-sm text-gray-900">Email Notifications</p>
                        <p className="text-xs text-gray-500">Receive order updates via email</p>
                      </div>
                      <div className="w-10 h-5 bg-green-500 rounded-full relative p-0.5 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <div>
                        <p className="font-bold text-sm text-gray-900">SMS Updates</p>
                        <p className="text-xs text-gray-500">Get text messages for delivery</p>
                      </div>
                      <div className="w-10 h-5 bg-gray-300 rounded-full relative p-0.5 cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute left-0.5" />
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Danger Zone</h4>
                  <button onClick={() => { logout(); setShowSettings(false); }} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl border border-red-100 hover:bg-red-100 transition-colors">
                    Sign Out
                  </button>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

    </motion.div>
  );
}
