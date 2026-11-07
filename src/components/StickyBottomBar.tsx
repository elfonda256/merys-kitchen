import React from 'react';
import { ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types/catering';
import { formatRupiah } from '../utils/formatters';

interface StickyBottomBarProps {
  cart: CartItem[];
  onOpenCart: () => void;
  onProceedToBooking: () => void;
}

export const StickyBottomBar: React.FC<StickyBottomBarProps> = ({
  cart,
  onOpenCart,
  onProceedToBooking,
}) => {
  if (cart.length === 0) return null;

  const totalPax = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.dish.pricePerPax * item.quantity), 0);

  return (
    <div 
      className="fixed bottom-[72px] left-3 right-3 sm:left-6 sm:right-6 xl:bottom-0 xl:left-0 xl:right-0 xl:rounded-none z-40 bg-[#FFFFFF]/98 backdrop-blur-md rounded-2xl elevation-2 py-3 px-4 sm:px-6 transition-all border border-[#3F704D]/20 shadow-xl"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        
        {/* Left: Summary & Pax */}
        <div 
          onClick={onOpenCart}
          className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
        >
          <div className="w-10 h-10 rounded-full bg-[#EAF2EC] text-[#3F704D] flex items-center justify-center relative group-hover:bg-[#3F704D] group-hover:text-white transition-colors">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-[#D9532F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          </div>

          <div>
            <div className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#3F704D]">
              {totalPax} Porsi ({cart.length} Menu)
            </div>
            <div className="text-sm sm:text-base font-bold text-[#1F2421] font-sans">
              {formatRupiah(subtotal)}
            </div>
          </div>
        </div>

        {/* Right: Primary Action Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenCart}
            className="hidden sm:inline-flex px-3.5 py-2.5 rounded-lg text-xs font-semibold text-[#1F2421] hover:bg-[#F3EFE6] transition-colors"
          >
            Rincian Menu
          </button>

          <button
            type="button"
            onClick={onProceedToBooking}
            className="min-h-[44px] inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-[#3F704D] text-[#FFFFFF] text-xs sm:text-sm font-bold hover:bg-[#265737] active:scale-[0.98] transition-all shadow-md group cursor-pointer whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-[#C29B38]" />
            <span className="hidden sm:inline">Pesan Sekarang / Konfirmasi Jadwal</span>
            <span className="sm:hidden">Lanjut Jadwalkan</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </div>
  );
};
