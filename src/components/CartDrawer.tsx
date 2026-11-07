import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles } from 'lucide-react';
import { CartItem, DishItem } from '../types/catering';
import { formatRupiah } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (dish: DishItem, delta: number) => void;
  onRemoveItem: (dishId: string) => void;
  onClearCart: () => void;
  onProceedToBooking: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToBooking,
}) => {
  if (!isOpen) return null;

  const totalPax = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.dish.pricePerPax * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Scrim Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1F2421]/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFFFF] shadow-2xl flex flex-col border-l border-[#3F704D]/15">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#FDFBF7] border-b border-[#3F704D]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EAF2EC] text-[#3F704D] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-serif text-base font-bold text-[#1F2421]">
                  Pilihan Rangkaian Jamuan
                </h3>
                <p className="text-[11px] text-[#6B7A6F]">
                  {cart.length} Hidangan Terpilih • Total {totalPax} Pax
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F3EFE6] text-[#1F2421] hover:bg-[#e5e9e4] flex items-center justify-center transition-colors"
              aria-label="Tutup keranjang"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-14 h-14 rounded-full bg-[#F3EFE6] text-[#6B7A6F] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <h4 className="font-serif font-bold text-sm text-[#1F2421]">
                  Belum Ada Menu Jamuan Terpilih
                </h4>
                <p className="text-xs text-[#6B7A6F] max-w-xs mx-auto">
                  Silakan jelajahi katalog Prasmanan Luhur, Nasi Besek Bambu, atau Tumpeng Agung kami.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.dish.id}
                  className="p-3.5 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/15 space-y-2.5 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex gap-2.5">
                      <img
                        src={item.dish.imageUrl}
                        alt={item.dish.name}
                        className="w-12 h-12 rounded object-cover border border-[#3F704D]/10 shrink-0"
                      />
                      <div>
                        <h4 className="font-serif font-bold text-xs text-[#1F2421] leading-snug">
                          {item.dish.name}
                        </h4>
                        <span className="text-[10px] text-[#3F704D] font-semibold block">
                          {item.dish.categoryName} • {formatRupiah(item.dish.pricePerPax)} /pax
                        </span>
                        {item.spicePreference && (
                          <span className="text-[10px] text-[#D9532F] block">
                            Rempah: {item.spicePreference}
                          </span>
                        )}
                        {item.packagingPreference && (
                          <span className="text-[10px] text-[#6B7A6F] block truncate max-w-[180px]">
                            Kemasan: {item.packagingPreference}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.dish.id)}
                      className="text-[#6B7A6F] hover:text-[#D9532F] p-1 transition-colors"
                      title="Hapus menu"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#3F704D]/10">
                    <div className="flex items-center bg-[#FFFFFF] border border-[#3F704D]/20 rounded-full p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.dish, -item.dish.minPax)}
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[#1F2421] hover:bg-[#F3EFE6]"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2.5 text-xs font-bold text-[#1F2421]">
                        {item.quantity} <span className="font-normal text-[10px] text-[#6B7A6F]">pax</span>
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.dish, item.dish.minPax)}
                        className="w-6 h-6 rounded-full flex items-center justify-center bg-[#3F704D] text-white hover:bg-[#265737]"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#1F2421]">
                        {formatRupiah(item.dish.pricePerPax * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculations & CTA */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-[#FDFBF7] border-t border-[#3F704D]/15 space-y-3">
              <div className="space-y-1 text-xs">
                <div className="flex justify-between text-[#6B7A6F]">
                  <span>Total Porsi Menu:</span>
                  <span className="font-bold text-[#3F704D]">{totalPax} Pax</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#1F2421]">
                  <span>Subtotal Menu:</span>
                  <span className="text-[#1F2421]">{formatRupiah(subtotal)}</span>
                </div>
                <p className="text-[10px] text-[#6B7A6F]">
                  *Belum termasuk pilihan tata meja, pramusaji, dan pajak PB1 (Dihitung di langkah berikutnya).
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onProceedToBooking();
                  }}
                  className="w-full py-3 px-4 rounded bg-[#3F704D] text-[#FFFFFF] text-xs font-semibold hover:bg-[#265737] shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-[#C29B38]" />
                  <span>Lanjut: Jadwalkan Tanggal & Meja Jamuan</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex justify-between items-center text-xs pt-1">
                  <button
                    type="button"
                    onClick={onClearCart}
                    className="text-[11px] text-[#6B7A6F] hover:text-[#D9532F] underline"
                  >
                    Kosongkan Pilihan
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="text-[11px] text-[#3F704D] font-semibold hover:underline"
                  >
                    + Tambah Menu Lain
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
