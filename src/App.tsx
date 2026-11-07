/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { FoodMenuCard } from './components/FoodMenuCard';
import { MenuDetailModal } from './components/MenuDetailModal';
import { BookingStepperModal } from './components/BookingStepperModal';
import { CustomBanquetBuilder } from './components/CustomBanquetBuilder';
import { OrderTrackerView } from './components/OrderTrackerView';
import { GalleryPortfolioView } from './components/GalleryPortfolioView';
import { CartDrawer } from './components/CartDrawer';
import { StickyBottomBar } from './components/StickyBottomBar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

import { CategoryId, DishItem, CartItem, ActiveOrder } from './types/catering';
import { DISHES_DATA, SAMPLE_ORDERS } from './data/cateringData';
import { Sparkles, Utensils, Calendar, Clock, Award } from 'lucide-react';

export default function App() {
  // Navigation tab state
  const [activeTab, setActiveTab] = useState<'menu' | 'booking' | 'tracker' | 'builder' | 'gallery'>('menu');

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [selectedTag, setSelectedTag] = useState<string>('Semua Kategori');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Cart state initialized with a popular banquet package for an inviting initial state
  const [cart, setCart] = useState<CartItem[]>([
    {
      dish: DISHES_DATA[0], // Paket Prasmanan Ageng Sriwijaya
      quantity: 50,
      spicePreference: 'Sedang',
      packagingPreference: 'Piring Saji Tembikar & Daun Pisang',
      specialNotes: 'Meja utama disiapkan jamuan tembikar klasik'
    }
  ]);

  // Orders list state initialized with sample real orders
  const [orders, setOrders] = useState<ActiveOrder[]>(SAMPLE_ORDERS);

  // Modals & Drawers state
  const [selectedDishForDetail, setSelectedDishForDetail] = useState<DishItem | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Filtered dishes
  const filteredDishes = useMemo(() => {
    return DISHES_DATA.filter((dish) => {
      // Category match
      if (selectedCategory !== 'all' && dish.category !== selectedCategory) {
        return false;
      }

      // Specification tag match
      if (selectedTag !== 'Semua Kategori') {
        if (selectedTag === 'Halal MUI 100%' && !dish.halalCertified) return false;
        if (selectedTag === 'Porsi 50-100 Pax' && dish.paxTier !== 'Porsi 50-100 Pax') return false;
        if (selectedTag === 'Porsi 100-500+ Pax' && dish.paxTier !== 'Porsi 100-500+ Pax') return false;
        if (selectedTag === 'Gluten-Free Friendly' && !dish.dietaryTags.some(t => t.includes('Gluten-Free'))) return false;
        if (selectedTag === 'Rempah Khas Keraton' && !dish.dietaryTags.some(t => t.includes('Keraton'))) return false;
        if (selectedTag.includes('Pedas') && dish.spiceLevel !== 'Sedang' && dish.spiceLevel !== 'Pedas') return false;
      }

      // Search query match
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = dish.name.toLowerCase().includes(query);
        const matchesDesc = dish.description.toLowerCase().includes(query);
        const matchesIng = dish.ingredients.toLowerCase().includes(query);
        const matchesCat = dish.categoryName.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc && !matchesIng && !matchesCat) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedTag, searchQuery]);

  // Featured dishes for horizontal peek scroll
  const featuredDishes = useMemo(() => {
    return DISHES_DATA.filter(d => d.isFeatured);
  }, []);

  // Cart operations
  const handleUpdateQuantity = (dish: DishItem, delta: number) => {
    setCart((prev) => {
      const existing = prev.find(item => item.dish.id === dish.id);
      if (existing) {
        const newQty = existing.quantity + delta;
        if (newQty <= 0) {
          showToast(`Menu "${dish.name}" dihapus dari daftar jamuan.`);
          return prev.filter(item => item.dish.id !== dish.id);
        } else {
          showToast(`Porsi "${dish.name}" disesuaikan menjadi ${newQty} Pax.`);
          return prev.map(item => item.dish.id === dish.id ? { ...item, quantity: newQty } : item);
        }
      } else {
        if (delta > 0) {
          showToast(`"${dish.name}" ditambahkan (${delta} Pax) ke jamuan.`);
          return [...prev, { dish, quantity: delta, spicePreference: dish.spiceLevel, packagingPreference: dish.servingStyle }];
        }
        return prev;
      }
    });
  };

  const handleSaveDetailModal = (
    dish: DishItem, 
    quantity: number, 
    spice: string, 
    packaging: string, 
    notes: string
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.dish.id === dish.id);
      const updatedItem: CartItem = {
        dish,
        quantity,
        spicePreference: spice,
        packagingPreference: packaging,
        specialNotes: notes,
      };

      if (existingIndex >= 0) {
        const copy = [...prev];
        copy[existingIndex] = updatedItem;
        return copy;
      } else {
        return [...prev, updatedItem];
      }
    });
    showToast(`Kustomisasi rempah & kemasan "${dish.name}" berhasil disimpan.`);
  };

  const handleRemoveItem = (dishId: string) => {
    setCart(prev => prev.filter(item => item.dish.id !== dishId));
    showToast('Menu dihapus dari daftar jamuan.');
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Seluruh daftar jamuan dikosongkan.');
  };

  const handleAddCustomPackage = (dish: DishItem, quantity: number) => {
    setCart(prev => [...prev, { dish, quantity, spicePreference: 'Sedang', packagingPreference: 'Piring Saji Tembikar & Daun Pisang' }]);
    showToast(`Paket Kustom "${dish.name}" (${quantity} Pax) berhasil ditambahkan.`);
    setIsCartDrawerOpen(true);
  };

  const handleOrderCreated = (newOrder: ActiveOrder) => {
    setOrders(prev => [newOrder, ...prev]);
    showToast(`Penawaran #${newOrder.bookingCode} berhasil dibuat.`);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2421] flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#265737] text-white px-4 py-2.5 rounded-lg shadow-xl border border-[#C29B38]/30 text-xs font-semibold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-[#C29B38]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onOpenBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-28 xl:pb-0">
        {/* Tab 1: Katalog Jamuan & Menu Utama */}
        {activeTab === 'menu' && (
          <div className="space-y-10">
            {/* Hero Banner Section */}
            <HeroBanner
              onOpenBooking={() => setIsBookingModalOpen(true)}
              onExploreMenu={() => {
                const el = document.getElementById('katalog-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onOpenBuilder={() => setActiveTab('builder')}
            />

            {/* Featured Banquet Packages Horizontal Gallery (Peek Factor 15% as per specs) */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#3F704D]">
                    <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
                    <span>Paket Unggulan Kesultanan & Kenegaraan</span>
                  </div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2421]">
                    Rangkaian Jamuan Paling Diminati
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsBookingModalOpen(true)}
                  className="text-xs font-semibold text-[#3F704D] hover:underline hidden sm:block"
                >
                  Konsultasikan Jadwal Resepsi →
                </button>
              </div>

              {/* Horizontal Scroll Snap Container */}
              <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3 pt-1">
                {featuredDishes.map((dish) => {
                  const cartItem = cart.find(c => c.dish.id === dish.id);
                  return (
                    <div 
                      key={dish.id} 
                      className="snap-start shrink-0 w-[280px] sm:w-[320px] lg:w-[340px]"
                    >
                      <FoodMenuCard
                        dish={dish}
                        cartItem={cartItem}
                        onUpdateQuantity={handleUpdateQuantity}
                        onOpenDetailModal={setSelectedDishForDetail}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Main Full Menu Explorer Section */}
            <div id="katalog-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 pt-4">
              <div className="border-b border-[#3F704D]/15 pb-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2421]">
                  Katalog Hidangan & Paket Prasmanan Luhur
                </h2>
                <p className="text-xs sm:text-sm text-[#6B7A6F] mt-1 font-sans">
                  Pilih sajian pembuka, prasmanan ageng, tumpeng ritual, pondokan live stall, hingga kudapan manis keraton.
                </p>

                {/* Filter & Search Bar */}
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                  selectedTag={selectedTag}
                  onSelectTag={setSelectedTag}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
              </div>

              {/* Dishes Responsive Grid (1 col mobile, 2 col tablet, 3-4 col desktop) */}
              {filteredDishes.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredDishes.map((dish) => {
                    const cartItem = cart.find(c => c.dish.id === dish.id);
                    return (
                      <FoodMenuCard
                        key={dish.id}
                        dish={dish}
                        cartItem={cartItem}
                        onUpdateQuantity={handleUpdateQuantity}
                        onOpenDetailModal={setSelectedDishForDetail}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-[#3F704D]/10 space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[#F3EFE6] text-[#6B7A6F] flex items-center justify-center mx-auto">
                    <Utensils className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#1F2421]">
                    Tidak Ada Menu yang Sesuai dengan Kriteria Pencarian
                  </h3>
                  <p className="text-xs text-[#6B7A6F] max-w-sm mx-auto">
                    Coba ganti filter kategori, hapus kata kunci pencarian, atau buat paket perjamuan kustom Anda sendiri.
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedTag('Semua Kategori');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-[#3F704D] text-white rounded text-xs font-semibold hover:bg-[#265737]"
                  >
                    Tampilkan Semua Menu
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Custom Banquet Builder */}
        {activeTab === 'builder' && (
          <CustomBanquetBuilder
            onAddCustomPackageToCart={handleAddCustomPackage}
            onProceedToBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {/* Tab 3: Booking Stepper View (Direct interactive form view when tab clicked) */}
        {activeTab === 'booking' && (
          <div className="py-6">
            <div className="max-w-4xl mx-auto px-4 text-center mb-6 space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#3F704D] bg-[#EAF2EC] px-3 py-1 rounded-full border border-[#3F704D]/20">
                Layanan Penjadwalan & Rincian Investasi
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1F2421]">
                Formulir Reservasi Tanggal & Koordinasi Meja Jamuan
              </h2>
              <p className="text-xs sm:text-sm text-[#6B7A6F]">
                Klik tombol di bawah untuk membuka wizard 4-langkah pengaturan porsi, kalender tanggal, pramusaji, dan invoice resmi.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="px-6 py-3 bg-[#3F704D] text-white font-semibold text-xs rounded hover:bg-[#265737] shadow-sm inline-flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#C29B38]" />
                  <span>Buka Wizard Penjadwalan Acara (4 Langkah)</span>
                </button>
              </div>
            </div>

            {/* Quick overview of existing orders */}
            <div className="max-w-5xl mx-auto px-4">
              <div className="bg-white rounded-xl p-6 border border-[#3F704D]/15 space-y-4">
                <div className="flex items-center justify-between border-b border-[#3F704D]/10 pb-3">
                  <h3 className="font-serif font-bold text-base text-[#1F2421]">
                    Daftar Jamuan Terjadwal Saat Ini ({orders.length} Acara)
                  </h3>
                  <button
                    onClick={() => setActiveTab('tracker')}
                    className="text-xs text-[#3F704D] font-semibold hover:underline"
                  >
                    Buka Pemantau Dapur Lengkap →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/10 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono font-bold text-[#3F704D]">{ord.bookingCode}</span>
                        <span className="font-semibold text-[#1F2421]">{ord.totalPax} Pax</span>
                      </div>
                      <div className="font-serif font-bold text-sm text-[#1F2421] line-clamp-1">
                        {ord.clientName}
                      </div>
                      <div className="text-[#6B7A6F] text-[11px]">
                        Tanggal: {ord.eventDate} ({ord.eventTime})
                      </div>
                      <div className="pt-1">
                        <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded bg-[#EAF2EC] text-[#3F704D]">
                          {ord.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Order Tracker View */}
        {activeTab === 'tracker' && (
          <OrderTrackerView
            orders={orders}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {/* Tab 5: Gallery & VIP Portfolio */}
        {activeTab === 'gallery' && (
          <GalleryPortfolioView
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}
      </main>

      {/* Sticky Bottom Checkout Bar (Level 2 Elevation) */}
      <StickyBottomBar
        cart={cart}
        onOpenCart={() => setIsCartDrawerOpen(true)}
        onProceedToBooking={() => setIsBookingModalOpen(true)}
      />

      {/* Modals & Drawers */}
      <MenuDetailModal
        dish={selectedDishForDetail}
        initialQuantity={cart.find(c => c.dish.id === selectedDishForDetail?.id)?.quantity}
        onClose={() => setSelectedDishForDetail(null)}
        onSaveToCart={handleSaveDetailModal}
      />

      <BookingStepperModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        cart={cart}
        onOrderCreated={handleOrderCreated}
        onExploreMenu={() => {
          setIsBookingModalOpen(false);
          setActiveTab('menu');
        }}
      />

      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToBooking={() => {
          setIsCartDrawerOpen(false);
          setIsBookingModalOpen(true);
        }}
      />

      {/* Mobile Fixed Bottom Navigation Bar */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cart={cart}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
