import React, { useState } from 'react';
import { 
  X, Check, Calendar as CalendarIcon, Clock, MapPin, Users, 
  Utensils, Sparkles, ChevronRight, ChevronLeft, ShieldCheck, 
  Printer, Share2, AlertCircle, FileText, CheckCircle2 
} from 'lucide-react';
import { CartItem, ActiveOrder, BanquetBookingDetails } from '../types/catering';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface BookingStepperModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderCreated: (order: ActiveOrder) => void;
  onExploreMenu: () => void;
}

export const BookingStepperModal: React.FC<BookingStepperModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderCreated,
  onExploreMenu,
}) => {
  if (!isOpen) return null;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [isSuccessView, setIsSuccessView] = useState<boolean>(false);
  const [createdOrderCode, setCreatedOrderCode] = useState<string>('');

  // Default booking state
  const totalCartPax = cart.reduce((sum, item) => sum + item.quantity, 0);
  const initialGuestCount = totalCartPax > 0 ? totalCartPax : 100;

  const [booking, setBooking] = useState<BanquetBookingDetails>({
    guestCount: initialGuestCount,
    tastingBoxRequested: true,
    dietaryRestrictions: '',
    
    // Calendar Date: Default to next week's Saturday
    eventDate: '2026-11-21',
    timeSlot: 'Jamuan Siang (11.00 - 14.00)',
    eventType: 'Pernikahan / Wedding',
    venueType: 'Ballroom / Gedung',
    cityArea: 'Jakarta Selatan (Kebayoran, Senopati, Dharmawangsa)',
    fullAddress: 'Grand Ballroom Sampoerna Strategic Square, Jl. Jend. Sudirman No. 45',
    clientName: 'Bpk. Bagus Wicaksono & Ibu Kartika',
    clientPhone: '+62 812-8877-6655',
    clientEmail: 'bagus.wicaksono@nusantara.id',

    tablewareTier: 'Porcelain Keraton & Kuningan Antik (VIP)',
    waiterCount: 6,
    includeLiveChef: true,
    includeFloralDecor: true,
    warmerType: 'Kuningan Antik Tradisional',

    notes: 'Mohon gladi bersih meja VIP 2 jam sebelum acara dimulai.',
    paymentMethod: 'Transfer Bank BCA / Mandiri',
  });

  // Calculate fees
  const baseMenuTotal = cart.reduce((sum, item) => sum + (item.dish.pricePerPax * item.quantity), 0);
  // If cart is empty, estimate based on guest count with average price of Rp 110.000
  const effectiveMenuSubtotal = baseMenuTotal > 0 ? baseMenuTotal : (booking.guestCount * 110000);

  // Tableware add-on cost
  const tablewareCost = 
    booking.tablewareTier.includes('Silverware') ? 4500000 :
    booking.tablewareTier.includes('Porcelain Keraton') ? 2500000 : 1000000;

  // Waiter cost: Rp 350.000 per waiter
  const waiterCost = booking.waiterCount * 350000;

  // Additional services
  const liveChefCost = booking.includeLiveChef ? 1200000 : 0;
  const floralDecorCost = booking.includeFloralDecor ? 1800000 : 0;
  const tastingBoxCost = booking.tastingBoxRequested ? 250000 : 0;

  const subtotalServices = tablewareCost + waiterCost + liveChefCost + floralDecorCost + tastingBoxCost;
  const totalBeforeTax = effectiveMenuSubtotal + subtotalServices;
  const pb1Tax = Math.round(totalBeforeTax * 0.10); // 10% PB1
  const grandTotal = totalBeforeTax + pb1Tax;
  const dpAmount = Math.round(grandTotal * 0.30); // 30% Down Payment

  // Available Calendar Days simulation for November 2026
  const calendarDays = [
    { day: 1, available: false, date: '2026-11-01' },
    { day: 2, available: true, date: '2026-11-02' },
    { day: 3, available: true, date: '2026-11-03' },
    { day: 4, available: true, date: '2026-11-04' },
    { day: 5, available: false, date: '2026-11-05' },
    { day: 6, available: true, date: '2026-11-06' },
    { day: 7, available: false, date: '2026-11-07' },
    { day: 8, available: true, date: '2026-11-08' },
    { day: 9, available: true, date: '2026-11-09' },
    { day: 10, available: true, date: '2026-11-10' },
    { day: 11, available: true, date: '2026-11-11' },
    { day: 12, available: false, date: '2026-11-12' },
    { day: 13, available: true, date: '2026-11-13' },
    { day: 14, available: false, date: '2026-11-14' },
    { day: 15, available: true, date: '2026-11-15' },
    { day: 16, available: true, date: '2026-11-16' },
    { day: 17, available: true, date: '2026-11-17' },
    { day: 18, available: true, date: '2026-11-18' },
    { day: 19, available: true, date: '2026-11-19' },
    { day: 20, available: true, date: '2026-11-20' },
    { day: 21, available: true, date: '2026-11-21' },
    { day: 22, available: true, date: '2026-11-22' },
    { day: 23, available: true, date: '2026-11-23' },
    { day: 24, available: true, date: '2026-11-24' },
    { day: 25, available: false, date: '2026-11-25' },
    { day: 26, available: true, date: '2026-11-26' },
    { day: 27, available: true, date: '2026-11-27' },
    { day: 28, available: true, date: '2026-11-28' },
    { day: 29, available: true, date: '2026-11-29' },
    { day: 30, available: true, date: '2026-11-30' },
  ];

  const handleFinishBooking = () => {
    const bookingCode = `MK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: ActiveOrder = {
      id: `ord-${Date.now()}`,
      bookingCode,
      createdAt: new Date().toISOString().split('T')[0],
      eventDate: booking.eventDate,
      eventTime: booking.timeSlot,
      clientName: booking.clientName,
      eventType: booking.eventType,
      totalPax: booking.guestCount,
      items: cart.length > 0 ? [...cart] : [],
      tablewareTier: booking.tablewareTier,
      waiterCount: booking.waiterCount,
      status: 'Menunggu Pembayaran',
      progressPercent: 20,
      statusNotes: `Penawaran resmi ${bookingCode} terbit. Silakan selesaikan DP 30% untuk mengunci armada dan jadwal dapur.`,
      maitreDName: 'Mas Danang Wijaya (Kapten Jamuan Merys Kitchen)',
      maitreDPhone: '081287002970',
      chillerPlate: 'Armada Siaga #04',
      totalAmount: grandTotal,
      dpAmount,
      isDpPaid: false,
    };

    setCreatedOrderCode(bookingCode);
    onOrderCreated(newOrder);
    setIsSuccessView(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#1F2421]/60 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-t-3xl sm:rounded-xl elevation-3 overflow-hidden my-0 sm:my-4 border-t sm:border border-[#3F704D]/15 flex flex-col max-h-[94vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Mobile Drag Handle Affordance */}
        <div className="sm:hidden w-12 h-1.5 bg-[#d7dbd6] rounded-full mx-auto my-2.5 shrink-0" />
        
        {/* Header Strip with Stepper */}
        <div className="bg-[#FDFBF7] border-b border-[#3F704D]/10 p-3.5 sm:p-5">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <img
                src="/assets/aistudio/image_12506148.png"
                alt="Merys Kitchen Logo"
                className="h-8 sm:h-10 w-auto object-contain drop-shadow"
              />
              <div>
                <h2 className="font-serif text-sm sm:text-lg font-bold text-[#1F2421]">
                  Merys Kitchen • Penjadwalan Acara
                </h2>
                <p className="text-[10px] sm:text-[11px] text-[#6B7A6F]">
                  Koordinasi Pelayanan Bintang Lima & Reservasi
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F3EFE6] hover:bg-[#e5e9e4] text-[#1F2421] flex items-center justify-center transition-colors"
              aria-label="Tutup pemesanan"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper Progress Bar as specified in Design System */}
          {!isSuccessView && (
            <div className="relative pt-2">
              {/* Stepper Line */}
              <div className="absolute top-5 left-8 right-8 h-0.5 bg-[#E0DDD5] -z-0" />
              <div 
                className="absolute top-5 left-8 h-0.5 bg-[#3F704D] transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / 3) * 88}%` }}
              />

              <div className="grid grid-cols-4 relative z-10 text-center">
                {[
                  { step: 1, title: 'Menu & Porsi', desc: 'Estimasi Pax' },
                  { step: 2, title: 'Tanggal & Lokasi', desc: 'Kalender Jamuan' },
                  { step: 3, title: 'Tim & Alat Saji', desc: 'Pramusaji & Meja' },
                  { step: 4, title: 'Konfirmasi & DP', desc: 'Kalkulator DP 30%' },
                ].map((s) => {
                  const isDone = currentStep > s.step;
                  const isCurrent = currentStep === s.step;

                  return (
                    <button
                      key={s.step}
                      type="button"
                      onClick={() => setCurrentStep(s.step as any)}
                      className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    >
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                          isCurrent
                            ? 'bg-[#3F704D] text-[#FFFFFF] ring-4 ring-[#3F704D]/20'
                            : isDone
                            ? 'bg-[#3F704D] text-[#FFFFFF]'
                            : 'bg-[#F3EFE6] text-[#6B7A6F] border border-[#E0DDD5]'
                        }`}
                      >
                        {isDone ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.step}
                      </div>
                      <span className={`text-[11px] sm:text-xs font-bold mt-1.5 line-clamp-1 ${isCurrent ? 'text-[#3F704D]' : 'text-[#1F2421]'}`}>
                        {s.title}
                      </span>
                      <span className="text-[10px] text-[#6B7A6F] hidden sm:block">
                        {s.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          {isSuccessView ? (
            /* Success confirmation screen */
            <div className="text-center py-6 sm:py-8 space-y-5 max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#EAF2EC] text-[#3F704D] flex items-center justify-center mx-auto shadow-sm border border-[#3F704D]/20">
                <CheckCircle2 className="w-10 h-10 text-[#3F704D]" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#C29B38] bg-[#F7F2E7] px-3 py-1 rounded-full border border-[#C29B38]/30">
                  Reservasi Jadwal Berhasil Diajukan
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#1F2421]">
                  Matur Nuwun, {booking.clientName}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7A6F]">
                  Nomor Penawaran Resmi Jamuan Anda: <strong className="text-[#3F704D] font-mono text-base">{createdOrderCode}</strong>
                </p>
              </div>

              {/* Order quick summary box */}
              <div className="p-4 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/15 text-left text-xs space-y-2 font-sans">
                <div className="flex justify-between border-b border-[#3F704D]/10 pb-2">
                  <span className="text-[#6B7A6F]">Tanggal Jamuan:</span>
                  <span className="font-bold text-[#1F2421]">{formatDateIndo(booking.eventDate)}</span>
                </div>
                <div className="flex justify-between border-b border-[#3F704D]/10 pb-2">
                  <span className="text-[#6B7A6F]">Sesi Jamuan:</span>
                  <span className="font-bold text-[#1F2421]">{booking.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-[#3F704D]/10 pb-2">
                  <span className="text-[#6B7A6F]">Total Porsi & Tamu:</span>
                  <span className="font-bold text-[#3F704D]">{booking.guestCount} Pax</span>
                </div>
                <div className="flex justify-between border-b border-[#3F704D]/10 pb-2">
                  <span className="text-[#6B7A6F]">Total Investasi Jamuan:</span>
                  <span className="font-bold text-[#1F2421]">{formatRupiah(grandTotal)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#6B7A6F] font-semibold">DP 30% Untuk Kunci Jadwal:</span>
                  <span className="font-bold text-[#D9532F] text-sm">{formatRupiah(dpAmount)}</span>
                </div>
              </div>

              {/* Instructions */}
              <p className="text-[11px] text-[#6B7A6F] leading-relaxed">
                Tim Maître d’ Merys Kitchen (Mas Danang Wijaya) akan menghubungi Anda via WhatsApp di <strong>0812-8700-2970</strong> dalam 15 menit 
                untuk verifikasi denah meja dan konfirmasi jadwal sample tasting box.
              </p>

              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded bg-[#3F704D] text-[#FFFFFF] text-xs font-semibold hover:bg-[#265737] shadow-sm"
                >
                  Kembali ke Katalog
                </button>
              </div>
            </div>
          ) : (
            /* Multi-step form flow */
            <div>
              {/* STEP 1: Pilih Menu & Porsi */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                      Langkah 1: Estimasi Porsi & Jumlah Tamu Undangan
                    </h3>
                    <p className="text-xs text-[#6B7A6F]">
                      Tentukan jumlah pax untuk jamuan Anda. Sistem kami secara otomatis menghitung porsi cadangan dan rekomendasi staf.
                    </p>
                  </div>

                  {/* Pax Counter with Wide Touch Targets */}
                  <div className="p-4 sm:p-5 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/15 space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421] block">
                          Jumlah Tamu Undangan (Pax)
                        </label>
                        <span className="text-xs text-[#6B7A6F]">
                          Disarankan menyertakan buffer 10% untuk kelancaran resepsi
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setBooking({ ...booking, guestCount: Math.max(25, booking.guestCount - 25) })}
                          disabled={booking.guestCount <= 25}
                          className="w-11 h-11 rounded-full flex items-center justify-center bg-[#F3EFE6] hover:bg-[#e5e9e4] disabled:opacity-40 transition-colors shadow-xs"
                          aria-label="Kurangi 25 pax"
                        >
                          <span className="text-lg font-bold text-[#1F2421]">-25</span>
                        </button>

                        <div className="px-5 py-2 rounded-lg bg-[#FFFFFF] border-2 border-[#3F704D] text-center min-w-[110px]">
                          <span className="text-2xl font-bold text-[#3F704D] font-sans">{booking.guestCount}</span>
                          <span className="text-xs text-[#6B7A6F] block font-semibold uppercase">Pax Tamu</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setBooking({ ...booking, guestCount: booking.guestCount + 25 })}
                          className="w-11 h-11 rounded-full flex items-center justify-center bg-[#3F704D] hover:bg-[#265737] text-white transition-colors shadow-xs"
                          aria-label="Tambah 25 pax"
                        >
                          <span className="text-lg font-bold text-white">+25</span>
                        </button>
                      </div>
                    </div>

                    {/* Quick Pax Presets */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#3F704D]/10">
                      <span className="text-xs text-[#6B7A6F] font-semibold">Pilihan Cepat:</span>
                      {[50, 100, 150, 250, 500, 1000].map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setBooking({ ...booking, guestCount: num })}
                          className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
                            booking.guestCount === num
                              ? 'bg-[#3F704D] text-[#FFFFFF]'
                              : 'bg-[#FFFFFF] text-[#1F2421] border border-[#3F704D]/15 hover:bg-[#F3EFE6]'
                          }`}
                        >
                          {num} Pax
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Selected Menu Overview or Warning */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                        Daftar Menu Terpilih Dari Keranjang ({cart.length} Menu)
                      </span>
                      <button
                        type="button"
                        onClick={onExploreMenu}
                        className="text-xs text-[#3F704D] font-semibold hover:underline"
                      >
                        + Tambah Menu Lain
                      </button>
                    </div>

                    {cart.length > 0 ? (
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {cart.map((item) => (
                          <div
                            key={item.dish.id}
                            className="p-3 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/10 flex items-center justify-between text-xs"
                          >
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.dish.imageUrl}
                                alt={item.dish.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                              <div>
                                <div className="font-serif font-bold text-[#1F2421]">{item.dish.name}</div>
                                <div className="text-[11px] text-[#6B7A6F]">
                                  {item.dish.categoryName} • {item.dish.servingStyle}
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-[#3F704D]">{item.quantity} Pax</div>
                              <div className="text-[10px] text-[#6B7A6F]">
                                {formatRupiah(item.dish.pricePerPax * item.quantity)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 rounded-lg bg-[#F7F2E7] border border-[#C29B38]/30 text-xs text-[#806100] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 text-[#C29B38]" />
                          <span>Anda belum memilih menu dari katalog. Estimasi menggunakan rata-rata paket Prasmanan Ageng (Rp 110.000 /pax).</span>
                        </div>
                        <button
                          type="button"
                          onClick={onExploreMenu}
                          className="px-3 py-1 bg-[#3F704D] text-white rounded font-semibold text-xs whitespace-nowrap ml-2"
                        >
                          Pilih Menu Sekarang
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tasting Box Request Checkbox */}
                  <div className="p-3.5 rounded-lg bg-[#EAF2EC] border border-[#3F704D]/20 flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="tastingBox"
                      checked={booking.tastingBoxRequested}
                      onChange={(e) => setBooking({ ...booking, tastingBoxRequested: e.target.checked })}
                      className="mt-1 w-4 h-4 accent-[#3F704D] rounded"
                    />
                    <label htmlFor="tastingBox" className="text-xs text-[#1F2421] cursor-pointer">
                      <strong className="block font-semibold text-[#265737]">
                        Kirimkan Box Sample Food Tasting ke Alamat Saya (+ Rp 250.000)
                      </strong>
                      <span className="text-[#6B7A6F] block mt-0.5">
                        Dapatkan 5 porsi miniatur menu pilihan Anda yang diantar sebelum pelunasan untuk dicicipi bersama keluarga atau panitia acara.
                      </span>
                    </label>
                  </div>
                </div>
              )}

              {/* STEP 2: Tanggal & Lokasi Jamuan */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                      Langkah 2: Tanggal & Lokasi Jamuan Acara
                    </h3>
                    <p className="text-xs text-[#6B7A6F]">
                      Pilih tanggal pada kalender. Tanggal berlatar hijau tersedia, tanggal dicoret telah penuh dipesan.
                    </p>
                  </div>

                  {/* Calendar Grid Component as specified */}
                  <div className="p-4 sm:p-5 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/15 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="font-serif font-bold text-sm text-[#1F2421] flex items-center gap-1.5">
                        <CalendarIcon className="w-4 h-4 text-[#3F704D]" />
                        <span>November 2026 (Bulan Perjamuan Utama)</span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-[#6B7A6F]">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#EAF2EC] border border-[#3F704D]"></span>
                          Tersedia
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#D9532F]"></span>
                          Terpilih
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="line-through text-red-500">Penuh</span>
                        </span>
                      </div>
                    </div>

                    {/* Day Names */}
                    <div className="grid grid-cols-7 text-center text-[10px] font-bold text-[#6B7A6F] uppercase tracking-wider py-1">
                      <span>Min</span>
                      <span>Sen</span>
                      <span>Sel</span>
                      <span>Rab</span>
                      <span>Kam</span>
                      <span>Jum</span>
                      <span>Sab</span>
                    </div>

                    {/* Day Grid */}
                    <div className="grid grid-cols-7 gap-1.5 text-center">
                      {calendarDays.map((cDay) => {
                        const isSelected = booking.eventDate === cDay.date;
                        return (
                          <button
                            key={cDay.day}
                            type="button"
                            disabled={!cDay.available}
                            onClick={() => setBooking({ ...booking, eventDate: cDay.date })}
                            className={`h-9 sm:h-10 rounded text-xs font-semibold transition-all flex items-center justify-center relative ${
                              isSelected
                                ? 'bg-[#D9532F] text-white shadow-md font-bold ring-2 ring-[#D9532F]/30'
                                : cDay.available
                                ? 'bg-[#EAF2EC] text-[#265737] hover:bg-[#3F704D] hover:text-white'
                                : 'bg-[#e5e9e4] text-[#a0a8a0] cursor-not-allowed line-through opacity-60'
                            }`}
                          >
                            <span>{cDay.day}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="p-2.5 bg-[#FFFFFF] rounded text-xs text-[#265737] border border-[#3F704D]/15 flex items-center justify-between">
                      <span>Tanggal Jamuan Terpilih:</span>
                      <strong className="text-[#D9532F]">{formatDateIndo(booking.eventDate)}</strong>
                    </div>
                  </div>

                  {/* Sesi Waktu Jamuan */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#3F704D]" />
                      Sesi Waktu Jamuan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Jamuan Siang (11.00 - 14.00)',
                        'Jamuan Sore/Malam (18.00 - 21.00)',
                        'Seharian Penuh (Full Day Gala)',
                      ].map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setBooking({ ...booking, timeSlot: slot as any })}
                          className={`p-3 rounded text-left text-xs font-semibold border transition-all ${
                            booking.timeSlot === slot
                              ? 'bg-[#3F704D] text-white border-[#3F704D] shadow-sm'
                              : 'bg-[#F3EFE6] text-[#1F2421] border-transparent hover:bg-[#ebefea]'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Jenis Acara & Lokasi */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                        Jenis Acara
                      </label>
                      <select
                        value={booking.eventType}
                        onChange={(e) => setBooking({ ...booking, eventType: e.target.value as any })}
                        className="w-full p-2.5 rounded bg-[#F3EFE6] text-xs font-medium text-[#1F2421] border border-transparent focus:border-[#3F704D] focus:bg-[#FFFFFF] focus:outline-none"
                      >
                        <option>Pernikahan / Wedding</option>
                        <option>Corporate Gala / Kenegaraan</option>
                        <option>Syukuran / Tumpengan</option>
                        <option>Private Gathering</option>
                        <option>Ulang Tahun / Jamuan Keluarga</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                        Kategori Tempat
                      </label>
                      <select
                        value={booking.venueType}
                        onChange={(e) => setBooking({ ...booking, venueType: e.target.value as any })}
                        className="w-full p-2.5 rounded bg-[#F3EFE6] text-xs font-medium text-[#1F2421] border border-transparent focus:border-[#3F704D] focus:bg-[#FFFFFF] focus:outline-none"
                      >
                        <option>Ballroom / Gedung</option>
                        <option>Rumah Tinggal / Kediaman</option>
                        <option>Taman / Outdoor</option>
                        <option>Kantor / Perusahaan</option>
                      </select>
                    </div>
                  </div>

                  {/* Contact & Address Information */}
                  <div className="space-y-3 p-4 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#1F2421]">Nama Tuan Rumah / PIC</label>
                        <input
                          type="text"
                          value={booking.clientName}
                          onChange={(e) => setBooking({ ...booking, clientName: e.target.value })}
                          className="w-full mt-1 p-2 rounded bg-[#F3EFE6] text-xs text-[#1F2421] focus:bg-white focus:border-[#3F704D] border border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#1F2421]">Nomor WhatsApp / HP</label>
                        <input
                          type="text"
                          value={booking.clientPhone}
                          onChange={(e) => setBooking({ ...booking, clientPhone: e.target.value })}
                          className="w-full mt-1 p-2 rounded bg-[#F3EFE6] text-xs text-[#1F2421] focus:bg-white focus:border-[#3F704D] border border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#1F2421]">Wilayah Kota</label>
                        <input
                          type="text"
                          value={booking.cityArea}
                          onChange={(e) => setBooking({ ...booking, cityArea: e.target.value })}
                          className="w-full mt-1 p-2 rounded bg-[#F3EFE6] text-xs text-[#1F2421] focus:bg-white focus:border-[#3F704D] border border-transparent outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#1F2421]">Alamat Lengkap Gedung / Lokasi</label>
                      <textarea
                        rows={2}
                        value={booking.fullAddress}
                        onChange={(e) => setBooking({ ...booking, fullAddress: e.target.value })}
                        className="w-full mt-1 p-2 rounded bg-[#F3EFE6] text-xs text-[#1F2421] focus:bg-white focus:border-[#3F704D] border border-transparent outline-none"
                        placeholder="Nama gedung, lantai, akses loading dock..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pengaturan Tim Waiter & Alat Saji */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                      Langkah 3: Pengaturan Tim Waiter & Tata Meja Aristokrat
                    </h3>
                    <p className="text-xs text-[#6B7A6F]">
                      Pilih standar piring saji, jumlah pramusaji adat, dan instalasi pondokan live chef.
                    </p>
                  </div>

                  {/* Tableware Tier Options */}
                  <div className="space-y-2.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                      Koleksi Piring & Wadah Jamuan
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        {
                          name: 'Tembikar Luhur & Daun Pisang (Klasik)',
                          fee: 1000000,
                          desc: 'Piring tanah liat bakar halus dilapisi daun pisang klutuk, sendok kuningan artisanal.',
                        },
                        {
                          name: 'Porcelain Keraton & Kuningan Antik (VIP)',
                          fee: 2500000,
                          desc: 'Porselen putih berlist emas keraton, roll-top chafing kuningan antik, gelas kristal.',
                          recommended: true,
                        },
                        {
                          name: 'Silverware & Kristal Modern (Eksklusif)',
                          fee: 4500000,
                          desc: 'Set perak sterling, piring bone china impor, dan kristal Bohemia mewah untuk tamu VVIP.',
                        },
                      ].map((tier) => (
                        <button
                          key={tier.name}
                          type="button"
                          onClick={() => setBooking({ ...booking, tablewareTier: tier.name as any })}
                          className={`p-3.5 rounded-lg text-left border transition-all flex flex-col justify-between ${
                            booking.tablewareTier === tier.name
                              ? 'bg-[#EAF2EC] border-[#3F704D] shadow-sm'
                              : 'bg-[#FFFFFF] border-[#3F704D]/15 hover:bg-[#FDFBF7]'
                          }`}
                        >
                          <div>
                            {tier.recommended && (
                              <span className="text-[10px] font-bold text-[#D9532F] bg-[#FDF0ED] px-2 py-0.5 rounded-full inline-block mb-1">
                                Rekomendasi Jamuan Luhur
                              </span>
                            )}
                            <div className="font-serif font-bold text-xs text-[#1F2421]">
                              {tier.name}
                            </div>
                            <p className="text-[11px] text-[#6B7A6F] mt-1 leading-snug">
                              {tier.desc}
                            </p>
                          </div>
                          <div className="mt-3 pt-2 border-t border-[#3F704D]/10 text-xs font-bold text-[#3F704D]">
                            + {formatRupiah(tier.fee)}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Waiter Staffing Counter */}
                  <div className="p-4 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <div className="text-xs font-bold text-[#1F2421]">
                        Pramusaji Berkebaya & Beskap Tradisional
                      </div>
                      <div className="text-[11px] text-[#6B7A6F]">
                        Rasio ideal: 1 pramusaji untuk setiap 25-30 tamu undangan (Rp 350.000 /petugas)
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setBooking({ ...booking, waiterCount: Math.max(2, booking.waiterCount - 1) })}
                        className="w-9 h-9 rounded-full bg-[#F3EFE6] text-[#1F2421] flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <div className="text-center px-3">
                        <span className="text-lg font-bold text-[#3F704D]">{booking.waiterCount}</span>
                        <span className="text-xs text-[#6B7A6F] block font-semibold">Petugas</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBooking({ ...booking, waiterCount: booking.waiterCount + 1 })}
                        className="w-9 h-9 rounded-full bg-[#3F704D] text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Additional Bespoke Add-ons */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                      Fasilitas Kehormatan Tambahan
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Live Chef Carving Stall */}
                      <label className="p-3 rounded-lg border border-[#3F704D]/15 bg-[#FFFFFF] flex items-start gap-3 cursor-pointer hover:bg-[#FDFBF7]">
                        <input
                          type="checkbox"
                          checked={booking.includeLiveChef}
                          onChange={(e) => setBooking({ ...booking, includeLiveChef: e.target.checked })}
                          className="mt-0.5 w-4 h-4 accent-[#3F704D]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1F2421]">
                            Executive Chef Carving Live (+ Rp 1.200.000)
                          </div>
                          <div className="text-[11px] text-[#6B7A6F]">
                            Koki utama memotong kambing guling / sate maranggi langsung di hadapan para tamu kehormatan.
                          </div>
                        </div>
                      </label>

                      {/* Floral Ronce Melati Centerpieces */}
                      <label className="p-3 rounded-lg border border-[#3F704D]/15 bg-[#FFFFFF] flex items-start gap-3 cursor-pointer hover:bg-[#FDFBF7]">
                        <input
                          type="checkbox"
                          checked={booking.includeFloralDecor}
                          onChange={(e) => setBooking({ ...booking, includeFloralDecor: e.target.checked })}
                          className="mt-0.5 w-4 h-4 accent-[#3F704D]"
                        />
                        <div>
                          <div className="text-xs font-bold text-[#1F2421]">
                            Ronce Bunga Melati & Daun Palem Segar (+ Rp 1.800.000)
                          </div>
                          <div className="text-[11px] text-[#6B7A6F]">
                            Dekorasi floral wangi semerbak di sepanjang meja prasmanan utama dan meja VIP.
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: Selesai & Pembayaran DP / Kalkulator Penawaran */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="font-serif text-lg font-semibold text-[#1F2421]">
                      Langkah 4: Ringkasan Rincian Penawaran & Pembayaran DP
                    </h3>
                    <p className="text-xs text-[#6B7A6F]">
                      Periksa rincian investasi jamuan Anda. Jadwal akan dikunci setelah konfirmasi pembayaran DP 30%.
                    </p>
                  </div>

                  {/* Financial Breakdown Table */}
                  <div className="p-4 sm:p-5 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/20 space-y-3 font-sans">
                    <div className="flex items-center justify-between border-b border-[#3F704D]/15 pb-2.5">
                      <span className="font-serif font-bold text-sm text-[#1F2421]">
                        Rincian Item Investasi Jamuan
                      </span>
                      <span className="text-xs text-[#3F704D] font-bold">
                        Porsi: {booking.guestCount} Pax
                      </span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-[#6B7A6F]">Subtotal Hidangan & Menu Utama:</span>
                        <span className="font-semibold text-[#1F2421]">{formatRupiah(effectiveMenuSubtotal)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7A6F]">Koleksi Alat Meja ({booking.tablewareTier}):</span>
                        <span className="font-semibold text-[#1F2421]">{formatRupiah(tablewareCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#6B7A6F]">Petugas Pramusaji ({booking.waiterCount} Petugas):</span>
                        <span className="font-semibold text-[#1F2421]">{formatRupiah(waiterCost)}</span>
                      </div>
                      {booking.includeLiveChef && (
                        <div className="flex justify-between">
                          <span className="text-[#6B7A6F]">Executive Chef Live Carving:</span>
                          <span className="font-semibold text-[#1F2421]">{formatRupiah(liveChefCost)}</span>
                        </div>
                      )}
                      {booking.includeFloralDecor && (
                        <div className="flex justify-between">
                          <span className="text-[#6B7A6F]">Ronce Melati Floral Decor:</span>
                          <span className="font-semibold text-[#1F2421]">{formatRupiah(floralDecorCost)}</span>
                        </div>
                      )}
                      {booking.tastingBoxRequested && (
                        <div className="flex justify-between">
                          <span className="text-[#6B7A6F]">Box Sample Food Tasting:</span>
                          <span className="font-semibold text-[#1F2421]">{formatRupiah(tastingBoxCost)}</span>
                        </div>
                      )}
                      <div className="flex justify-between border-t border-[#3F704D]/10 pt-2">
                        <span className="text-[#6B7A6F]">Pajak Restoran PB1 (10%):</span>
                        <span className="font-semibold text-[#1F2421]">{formatRupiah(pb1Tax)}</span>
                      </div>
                    </div>

                    {/* Grand Total & DP Banner */}
                    <div className="pt-3 border-t-2 border-[#3F704D]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FFFFFF] p-3 rounded-lg border border-[#3F704D]/10">
                      <div>
                        <div className="text-[11px] uppercase font-bold text-[#6B7A6F]">
                          Total Investasi Keseluruhan:
                        </div>
                        <div className="text-xl font-bold text-[#1F2421]">
                          {formatRupiah(grandTotal)}
                        </div>
                      </div>

                      <div className="text-left sm:text-right">
                        <div className="text-[11px] uppercase font-bold text-[#D9532F]">
                          Down Payment (DP 30%) Untuk Kunci Jadwal:
                        </div>
                        <div className="text-xl font-bold text-[#D9532F]">
                          {formatRupiah(dpAmount)}
                        </div>
                        <div className="text-[10px] text-[#6B7A6F]">
                          Pelunasan H-3 sebelum pelaksanaan acara
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#1F2421]">
                      Metode Pembayaran DP
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {[
                        'Transfer Bank BCA / Mandiri',
                        'Virtual Account Prioritas',
                        'Invoice Perusahaan (Corporate PO)',
                      ].map((method) => (
                        <button
                          key={method}
                          type="button"
                          onClick={() => setBooking({ ...booking, paymentMethod: method as any })}
                          className={`p-3 rounded text-left text-xs font-semibold border transition-all ${
                            booking.paymentMethod === method
                              ? 'bg-[#3F704D] text-white border-[#3F704D]'
                              : 'bg-[#F3EFE6] text-[#1F2421] border-transparent hover:bg-[#ebefea]'
                          }`}
                        >
                          {method}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Trust badge */}
                  <div className="p-3 bg-[#EAF2EC] rounded text-xs text-[#265737] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#3F704D]" />
                    <span>
                      Jaminan 100% Halal MUI & Standar Higienis ISO 22000. Dikelola langsung oleh Maître d’ bersertifikat.
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Bottom Action Controls */}
        {!isSuccessView && (
          <div className="p-4 bg-[#FDFBF7] border-t border-[#3F704D]/10 flex items-center justify-between">
            <button
              type="button"
              disabled={currentStep === 1}
              onClick={() => setCurrentStep((prev) => Math.max(1, prev - 1) as any)}
              className="px-4 py-2 rounded text-xs font-semibold text-[#1F2421] hover:bg-[#F3EFE6] disabled:opacity-30 disabled:hover:bg-transparent transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <div className="flex items-center gap-2">
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((prev) => Math.min(4, prev + 1) as any)}
                  className="px-6 py-2.5 rounded bg-[#3F704D] text-[#FFFFFF] text-xs font-semibold hover:bg-[#265737] transition-all flex items-center gap-1.5 shadow-sm active:scale-[0.99]"
                >
                  <span>Lanjut: {currentStep === 1 ? 'Tanggal & Lokasi' : currentStep === 2 ? 'Tim & Alat Saji' : 'Rincian Penawaran'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleFinishBooking}
                  className="px-6 py-2.5 rounded bg-[#D9532F] text-[#FFFFFF] text-xs font-semibold hover:bg-[#ac3311] transition-all flex items-center gap-1.5 shadow-md active:scale-[0.99]"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Konfirmasi Jadwal & Terbitkan Penawaran</span>
                </button>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
