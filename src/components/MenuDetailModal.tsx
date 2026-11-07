import React, { useState } from 'react';
import { X, Check, Flame, ShieldCheck, Plus, Minus, Sparkles, Utensils } from 'lucide-react';
import { DishItem } from '../types/catering';
import { formatRupiah } from '../utils/formatters';

interface MenuDetailModalProps {
  dish: DishItem | null;
  initialQuantity?: number;
  onClose: () => void;
  onSaveToCart: (dish: DishItem, quantity: number, spice: string, packaging: string, notes: string) => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({
  dish,
  initialQuantity = 0,
  onClose,
  onSaveToCart,
}) => {
  if (!dish) return null;

  const [quantity, setQuantity] = useState<number>(initialQuantity > 0 ? initialQuantity : dish.minPax);
  const [spiceLevel, setSpiceLevel] = useState<string>(dish.spiceLevel);
  const [packaging, setPackaging] = useState<string>(dish.servingStyle);
  const [specialNotes, setSpecialNotes] = useState<string>('');

  const packagingOptions = [
    'Piring Saji Tembikar & Daun Pisang',
    'Besek Bambu Luhur Alami',
    'Bento Kayu Jati Belanda',
    'Kotak Ivory Eksekutif (Food Grade)'
  ];

  const spiceOptions = ['Tidak Pedas', 'Sedang', 'Pedas Gurih Keraton', 'Ekstra Pedas'];

  const totalPrice = dish.pricePerPax * quantity;

  const handleConfirm = () => {
    onSaveToCart(dish, quantity, spiceLevel, packaging, specialNotes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1F2421]/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-t-3xl sm:rounded-xl elevation-3 overflow-hidden my-0 sm:my-8 border-t sm:border border-[#3F704D]/15 max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Handle Affordance */}
        <div className="sm:hidden w-12 h-1.5 bg-[#d7dbd6] rounded-full mx-auto my-2.5 shrink-0" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full bg-[#FFFFFF]/90 hover:bg-[#FFFFFF] text-[#1F2421] flex items-center justify-center shadow-md transition-all border border-[#3F704D]/10"
          aria-label="Tutup jendela kustomisasi"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Photo Section */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[#F3EFE6]">
          <img
            src={dish.imageUrl}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          <div className="absolute bottom-4 left-5 right-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-[#3F704D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <Check className="w-3 h-3" />
                100% Halal MUI
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                {dish.categoryName}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-white drop-shadow">
              {dish.name}
            </h2>
          </div>
        </div>

        {/* Modal Body & Customization Controls */}
        <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto">
          
          {/* Narrative & Ingredients */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#3F704D]">
              Filosofi & Racikan Rempah
            </h4>
            <p className="text-sm text-[#414941] leading-relaxed">
              {dish.description}
            </p>
            <div className="p-3 bg-[#FDFBF7] rounded border border-[#3F704D]/10 text-xs text-[#6B7A6F]">
              <strong className="text-[#1F2421]">Bahan Utama & Bumbu: </strong>
              {dish.ingredients}
            </div>
          </div>

          {/* Spice Customization */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421] flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-[#D9532F]" />
                Tingkat Kepedasan Bumbu Rempah
              </label>
              <span className="text-xs text-[#D9532F] font-semibold">{spiceLevel}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {spiceOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSpiceLevel(opt)}
                  className={`py-2 px-3 rounded text-xs font-semibold text-center transition-all ${
                    spiceLevel === opt
                      ? 'bg-[#3F704D] text-[#FFFFFF] shadow-sm'
                      : 'bg-[#F3EFE6] text-[#1F2421] hover:bg-[#e5e9e4]'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Packaging & Service Presentation */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421] flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-[#3F704D]" />
              Pilihan Kemasan & Wadah Jamuan
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {packagingOptions.map((pkg) => (
                <button
                  key={pkg}
                  type="button"
                  onClick={() => setPackaging(pkg)}
                  className={`p-2.5 rounded text-left text-xs font-medium border transition-all flex items-center justify-between ${
                    packaging === pkg
                      ? 'border-[#3F704D] bg-[#EAF2EC] text-[#265737] font-semibold'
                      : 'border-[#F3EFE6] bg-[#FFFFFF] text-[#1F2421] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <span>{pkg}</span>
                  {packaging === pkg && <Check className="w-3.5 h-3.5 text-[#3F704D]" />}
                </button>
              ))}
            </div>
          </div>

          {/* Special Dietary / Kitchen Notes */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
              Catatan Khusus Tamu / Alergen (Opsional)
            </label>
            <textarea
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              placeholder="Contoh: Pisahkan kacang untuk 5 porsi, kurangi minyak, beri label nama tamu..."
              rows={2}
              className="w-full p-2.5 rounded bg-[#F3EFE6] text-xs text-[#1F2421] placeholder-[#6B7A6F] border border-transparent focus:border-[#3F704D] focus:bg-[#FFFFFF] focus:outline-none transition-all"
            />
          </div>

          {/* Portion Stepper with Wide Touch Targets */}
          <div className="p-4 bg-[#FDFBF7] rounded-lg border border-[#3F704D]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-xs font-bold text-[#1F2421]">Jumlah Porsi Jamuan</div>
              <div className="text-[11px] text-[#6B7A6F]">
                Minimal pemesanan untuk menu ini: {dish.minPax} Pax
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center bg-[#FFFFFF] border border-[#3F704D]/20 rounded-full p-1 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => Math.max(dish.minPax, prev - 10))}
                  disabled={quantity <= dish.minPax}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#F3EFE6] hover:bg-[#e5e9e4] disabled:opacity-40 transition-colors"
                  aria-label="Kurangi 10 porsi"
                >
                  <Minus className="w-4 h-4 text-[#1F2421]" />
                </button>
                <div className="px-4 text-center">
                  <span className="text-base font-bold text-[#1F2421] font-sans">{quantity}</span>
                  <span className="text-xs text-[#6B7A6F] ml-1">Pax</span>
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity((prev) => prev + 10)}
                  className="w-9 h-9 rounded-full flex items-center justify-center bg-[#3F704D] text-white hover:bg-[#265737] transition-colors"
                  aria-label="Tambah 10 porsi"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Quick Jump Buttons */}
              <div className="hidden sm:flex gap-1 text-[11px]">
                {[50, 100, 200].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className="px-2 py-1 rounded bg-[#F3EFE6] text-[#1F2421] hover:bg-[#3F704D] hover:text-white font-semibold transition-colors"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer with Total & Action */}
        <div className="p-4 sm:p-5 bg-[#FDFBF7] border-t border-[#3F704D]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <div className="text-[11px] text-[#6B7A6F]">Total Investasi Menu ({quantity} Pax):</div>
            <div className="text-xl font-bold text-[#1F2421] font-sans">
              {formatRupiah(totalPrice)}
              <span className="text-xs font-normal text-[#6B7A6F] ml-1.5">
                ({formatRupiah(dish.pricePerPax)} /pax)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded text-xs font-semibold text-[#6B7A6F] hover:bg-[#F3EFE6] transition-colors"
            >
              Batal
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded bg-[#3F704D] text-[#FFFFFF] text-xs font-semibold hover:bg-[#265737] active:scale-[0.99] transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-[#C29B38]" />
              <span>Simpan ke Rangkaian Jamuan</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
