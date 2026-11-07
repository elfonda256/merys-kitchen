import React from 'react';
import { Plus, Minus, Check, Flame, SlidersHorizontal, Sparkles } from 'lucide-react';
import { DishItem, CartItem } from '../types/catering';
import { formatRupiah } from '../utils/formatters';

interface FoodMenuCardProps {
  dish: DishItem;
  cartItem?: CartItem;
  onUpdateQuantity: (dish: DishItem, delta: number) => void;
  onOpenDetailModal: (dish: DishItem) => void;
}

export const FoodMenuCard: React.FC<FoodMenuCardProps> = ({
  dish,
  cartItem,
  onUpdateQuantity,
  onOpenDetailModal,
}) => {
  const currentQuantity = cartItem?.quantity || 0;
  const isSelected = currentQuantity > 0;

  return (
    <div className="bg-[#FFFFFF] rounded-xl elevation-1 overflow-hidden flex flex-col transition-all duration-300 hover:shadow-lg border border-[#3F704D]/15 group">
      
      {/* Photo Container: 16:10 on Mobile for full-width glory, 4:3 on desktop */}
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-[#F3EFE6]">
        <img
          src={dish.imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        
        {/* Subtle gradient vignette on lower edge */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Top-Left Overlay Tag: Halal Certified 100% */}
        <div className="absolute top-3 left-3">
          <div className="bg-[#FFFFFF]/95 backdrop-blur-md text-[#3F704D] px-3 py-1 rounded-full text-[11px] font-bold shadow-xs border border-[#3F704D]/15 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-[#3F704D] stroke-[2.5]" />
            <span>Halal Certified 100%</span>
          </div>
        </div>

        {/* Top-Right Badge (e.g. Featured / Packaging) */}
        {dish.badge && (
          <div className="absolute top-3 right-3">
            <div className="bg-[#3F704D] text-[#FFFFFF] px-3 py-1 rounded-full text-[11px] font-bold shadow-xs flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>{dish.badge}</span>
            </div>
          </div>
        )}

        {/* Bottom overlay: Serving Style & Minimum Pax */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-xs text-[#FFFFFF] drop-shadow-md">
          <span className="font-semibold bg-black/50 px-2.5 py-0.5 rounded-md backdrop-blur-xs text-[11px]">
            {dish.servingStyle}
          </span>
          <span className="bg-[#D9532F] text-white px-2.5 py-0.5 rounded-md font-bold text-[11px] shadow-xs">
            Min. {dish.minPax} Pax
          </span>
        </div>
      </div>

      {/* Card Lower Section */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between space-y-4">
        
        <div className="space-y-2">
          {/* Category & Spice indicator */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#3F704D] font-bold text-xs uppercase tracking-wide">
              {dish.categoryName}
            </span>
            <div className="flex items-center gap-1 text-xs font-semibold text-[#D9532F] bg-[#FDF0ED] px-2.5 py-0.5 rounded-full border border-[#D9532F]/20">
              <Flame className="w-3.5 h-3.5" />
              <span>{dish.spiceLevel}</span>
            </div>
          </div>

          {/* Noto Serif Dish Title */}
          <h3 className="font-serif text-lg sm:text-[19px] font-bold text-[#1F2421] leading-snug group-hover:text-[#3F704D] transition-colors">
            {dish.name}
          </h3>

          {/* Two-line ingredient summary in #6B7A6F */}
          <p className="text-[#6B7A6F] text-xs sm:text-[13px] leading-relaxed line-clamp-2 font-sans">
            {dish.ingredients}
          </p>
        </div>

        {/* Dietary tags */}
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {dish.dietaryTags.slice(0, 2).map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#F3EFE6] text-[#414941]"
            >
              {tag}
            </span>
          ))}
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-[#EAF2EC] text-[#3F704D]">
            {dish.paxTier}
          </span>
        </div>

        {/* Pricing & Interactive Action Area with Touch Ergonomics */}
        <div className="pt-3 border-t border-[#3F704D]/15 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6B7A6F] tracking-wide">Investasi Menu</div>
            <div className="text-base sm:text-lg font-bold text-[#1F2421] font-sans">
              {formatRupiah(dish.pricePerPax)}
              <span className="text-xs font-normal text-[#6B7A6F]"> /pax</span>
            </div>
          </div>

          {/* Quick-Add Pill Counter with >= 44px Thumb Area */}
          {isSelected ? (
            <div className="flex items-center bg-[#3F704D] text-[#FFFFFF] rounded-full p-1 shadow-sm shrink-0">
              <button
                type="button"
                onClick={() => onUpdateQuantity(dish, -dish.minPax)}
                className="min-w-[40px] min-h-[40px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-[#265737] text-white active:scale-90 transition-all cursor-pointer"
                title={`Kurang ${dish.minPax} porsi`}
                aria-label="Kurangi porsi"
              >
                <Minus className="w-4 h-4 stroke-[2.5]" />
              </button>
              <div className="px-2.5 text-xs sm:text-sm font-bold whitespace-nowrap font-sans">
                {currentQuantity} <span className="font-normal text-[11px]">pax</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateQuantity(dish, dish.minPax)}
                className="min-w-[40px] min-h-[40px] sm:w-8 sm:h-8 rounded-full flex items-center justify-center hover:bg-[#265737] text-white active:scale-90 transition-all cursor-pointer"
                title={`Tambah ${dish.minPax} porsi`}
                aria-label="Tambah porsi"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => onUpdateQuantity(dish, dish.minPax)}
              className="min-h-[44px] px-4 py-2 rounded-full bg-[#3F704D] text-[#FFFFFF] text-xs sm:text-sm font-bold hover:bg-[#265737] active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Pesan {dish.minPax} Pax</span>
            </button>
          )}
        </div>

        {/* Secondary Action: Pilih Varian Rempah with 44px Touch Target */}
        <button
          type="button"
          onClick={() => onOpenDetailModal(dish)}
          className="w-full min-h-[44px] py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold text-[#3F704D] border-[1.5px] border-[#3F704D] hover:bg-[#3F704D]/5 active:bg-[#3F704D]/10 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Pilih Varian Rempah / Kustomisasi</span>
        </button>

      </div>
    </div>
  );
};
