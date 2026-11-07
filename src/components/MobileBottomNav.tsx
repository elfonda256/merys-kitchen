import React from 'react';
import { UtensilsCrossed, Sparkles, Calendar, Clock, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types/catering';

interface MobileBottomNavProps {
  activeTab: 'menu' | 'booking' | 'tracker' | 'builder' | 'gallery';
  setActiveTab: (tab: 'menu' | 'booking' | 'tracker' | 'builder' | 'gallery') => void;
  cart: CartItem[];
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  cart,
  onOpenCart,
}) => {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navItems = [
    {
      id: 'menu' as const,
      label: 'Katalog',
      icon: UtensilsCrossed,
      onClick: () => setActiveTab('menu'),
    },
    {
      id: 'builder' as const,
      label: 'Kustom',
      icon: Sparkles,
      onClick: () => setActiveTab('builder'),
    },
    {
      id: 'booking' as const,
      label: 'Jadwal',
      icon: Calendar,
      onClick: () => setActiveTab('booking'),
    },
    {
      id: 'tracker' as const,
      label: 'Lacak',
      icon: Clock,
      onClick: () => setActiveTab('tracker'),
    },
  ];

  return (
    <nav 
      aria-label="Navigasi Bawah Layar"
      className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/98 backdrop-blur-md border-t border-[#3F704D]/15 shadow-lg h-16 pb-safe transition-all"
    >
      <div className="grid grid-cols-5 h-full max-w-md mx-auto items-center px-1">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              type="button"
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center min-h-[48px] w-full py-1 transition-all relative ${
                isActive ? 'text-[#3F704D]' : 'text-[#6B7A6F] hover:text-[#1F2421]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-[#3F704D]' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#3F704D]" />
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-bold text-[#3F704D]' : 'font-medium'}`}>
                {item.label}
              </span>
            </button>
          );
        })}

        {/* 5th Tab: Cart Button with Live Badge */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center min-h-[48px] w-full py-1 transition-all relative text-[#6B7A6F] hover:text-[#3F704D]"
          aria-label="Buka Keranjang Pesanan"
        >
          <div className="relative flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-[#1F2421]" />
            {totalItemsCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-[#D9532F] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {totalItemsCount > 99 ? '99+' : totalItemsCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-1 font-medium text-[#1F2421]">
            Pesanan
          </span>
        </button>
      </div>
    </nav>
  );
};
