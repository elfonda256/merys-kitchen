import React, { useState } from 'react';
import { 
  Truck, Clock, CheckCircle2, AlertCircle, Phone, 
  MapPin, ShieldCheck, Thermometer, UserCheck, Search, Sparkles 
} from 'lucide-react';
import { ActiveOrder } from '../types/catering';
import { formatRupiah, formatDateIndo } from '../utils/formatters';

interface OrderTrackerViewProps {
  orders: ActiveOrder[];
  onOpenBooking: () => void;
}

export const OrderTrackerView: React.FC<OrderTrackerViewProps> = ({
  orders,
  onOpenBooking,
}) => {
  const [selectedOrderId, setSelectedOrderId] = useState<string>(orders[0]?.id || '');
  const [searchCode, setSearchCode] = useState<string>('');

  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = orders.find(o => o.bookingCode.toLowerCase().includes(searchCode.trim().toLowerCase()));
    if (found) {
      setSelectedOrderId(found.id);
    }
  };

  // Helper to render the exact status badges from design doc:
  const renderStatusBadge = (status: ActiveOrder['status']) => {
    switch (status) {
      case 'Dapur Menyiapkan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F7F2E7] text-[#C29B38] border border-[#C29B38]/30">
            <span className="w-2 h-2 rounded-full bg-[#C29B38] animate-ping" />
            <span className="w-2 h-2 rounded-full bg-[#C29B38] -ml-3.5" />
            <span>Dapur Menyiapkan</span>
          </span>
        );
      case 'Dalam Pengiriman':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#EAF2EC] text-[#3F704D] border border-[#3F704D]/30">
            <Truck className="w-3.5 h-3.5" />
            <span>Dalam Pengiriman Armada Chiller</span>
          </span>
        );
      case 'Selesai':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#3F704D] text-[#FFFFFF]">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Jamuan Berlangsung / Selesai</span>
          </span>
        );
      case 'Menunggu Pembayaran':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#FDF0ED] text-[#D9532F] border border-[#D9532F]/30">
            <Clock className="w-3.5 h-3.5" />
            <span>Menunggu Pembayaran DP</span>
          </span>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2EC] text-[#3F704D] text-xs font-bold border border-[#3F704D]/20">
          <Clock className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>Sistem Pemantauan Dapur & Logistik Dingin Terpadu</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1F2421]">
          Lacak Kesiapan Dapur & Pergerakan Armada Jamuan
        </h2>
        <p className="text-sm text-[#6B7A6F]">
          Pantau tahap marinasi rempah, pemasakan arang, kontrol suhu armada hantar, hingga kehadiran Maître d’ di lokasi acara Anda.
        </p>
      </div>

      {/* Search by Booking Code */}
      <div className="max-w-xl mx-auto">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7A6F]" />
            <input
              type="text"
              value={searchCode}
              onChange={(e) => setSearchCode(e.target.value)}
              placeholder="Masukkan kode reservasi (contoh: MK-2026-8849)..."
              className="w-full pl-10 pr-4 py-2.5 rounded bg-[#FFFFFF] border border-[#3F704D]/20 text-xs sm:text-sm text-[#1F2421] placeholder-[#6B7A6F] focus:border-[#3F704D] focus:outline-none shadow-sm"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded bg-[#3F704D] text-white text-xs font-semibold hover:bg-[#265737] shadow-sm whitespace-nowrap"
          >
            Lacak Jamuan
          </button>
        </form>
      </div>

      {/* Active Orders Switcher Tabs */}
      <div className="flex items-center space-x-3 overflow-x-auto no-scrollbar pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-[#6B7A6F] whitespace-nowrap">
          Jamuan Aktif Terjadwal:
        </span>
        {orders.map((ord) => (
          <button
            key={ord.id}
            type="button"
            onClick={() => setSelectedOrderId(ord.id)}
            className={`whitespace-nowrap px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-2 border ${
              activeOrder?.id === ord.id
                ? 'bg-[#3F704D] text-white border-[#3F704D] shadow-sm'
                : 'bg-[#FFFFFF] text-[#1F2421] border-[#3F704D]/15 hover:bg-[#FDFBF7]'
            }`}
          >
            <span className="font-mono">{ord.bookingCode}</span>
            <span className="opacity-80">({ord.totalPax} Pax)</span>
          </button>
        ))}
      </div>

      {/* Active Order Detail View */}
      {activeOrder && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Progress & Milestones */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-[#FFFFFF] rounded-xl elevation-1 border border-[#3F704D]/15 p-5 sm:p-6 space-y-5">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#3F704D]/10 pb-4">
                <div>
                  <div className="text-xs text-[#6B7A6F] font-mono">Kode Penawaran #{activeOrder.bookingCode}</div>
                  <h3 className="font-serif text-xl font-bold text-[#1F2421]">
                    {activeOrder.clientName}
                  </h3>
                  <div className="text-xs text-[#3F704D] font-semibold mt-0.5">
                    {activeOrder.eventType} • {activeOrder.totalPax} Tamu Undangan
                  </div>
                </div>

                <div>
                  {renderStatusBadge(activeOrder.status)}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-[#6B7A6F]">Kesiapan Jamuan Dapur & Logistik</span>
                  <span className="text-[#3F704D] font-bold">{activeOrder.progressPercent}% Selesai</span>
                </div>
                <div className="h-2.5 w-full bg-[#F3EFE6] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C29B38] to-[#3F704D] transition-all duration-500 rounded-full"
                    style={{ width: `${activeOrder.progressPercent}%` }}
                  />
                </div>
                <p className="text-xs text-[#6B7A6F] pt-1 italic">
                  "{activeOrder.statusNotes}"
                </p>
              </div>

              {/* Detailed Operational Milestones */}
              <div className="space-y-4 pt-3">
                <h4 className="font-serif font-bold text-sm text-[#1F2421] uppercase tracking-wider">
                  Protokol Penyelenggaraan Jamuan Luhur
                </h4>

                <div className="space-y-3 relative pl-6 border-l-2 border-[#3F704D]/20 ml-2">
                  {[
                    {
                      title: 'H-24 Jam: Kurasi Bahan Petik Pagi & Marinasi Rempah',
                      desc: 'Daging sapi Marapi dan bumbu kelapa sangrai dimarinasi dalam ruang dingin 4°C untuk penyerapan sempurna.',
                      done: activeOrder.progressPercent >= 25,
                      time: 'Dapur Pusat Sentul'
                    },
                    {
                      title: 'H-6 Jam: Pemasakan Lambat & Pengasapan Arang Batok',
                      desc: 'Pengolahan rendang, kuah rawon kluwek, dan ungkep ayam areh di bawah pengawasan Executive Chef.',
                      done: activeOrder.progressPercent >= 50,
                      time: 'Dapur Induk'
                    },
                    {
                      title: 'H-3 Jam: Pengemasan Wadah Tembikar / Chafing Kuningan',
                      desc: 'Penataan higienis piring tembikar, sendok kuningan, dan perangkaian ronce melati segar.',
                      done: activeOrder.progressPercent >= 75,
                      time: 'Ruang Staging'
                    },
                    {
                      title: 'H-2 Jam: Dispatch Armada Hawa Dingin & Maître d’ Berangkat',
                      desc: `Armada Chiller (${activeOrder.chillerPlate}) meluncur dengan suhu kabin stabil 8°C menuju lokasi perjamuan.`,
                      done: activeOrder.progressPercent >= 85,
                      time: 'Dalam Perjalanan'
                    },
                    {
                      title: 'H-1 Jam: Tata Meja Prasmanan & Gladi Resepsi',
                      desc: 'Tim pramusaji berkebaya menyalakan pemanas, menata bunga meja, dan menyambut tuan rumah.',
                      done: activeOrder.progressPercent >= 100,
                      time: 'Lokasi Acara'
                    },
                  ].map((m, idx) => (
                    <div key={idx} className="relative">
                      <div 
                        className={`absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-white flex items-center justify-center ${
                          m.done ? 'bg-[#3F704D]' : 'bg-[#d7dbd6]'
                        }`}
                      >
                        {m.done && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <div className="text-xs">
                        <div className="flex items-center justify-between">
                          <strong className={m.done ? 'text-[#1F2421]' : 'text-[#6B7A6F]'}>
                            {m.title}
                          </strong>
                          <span className="text-[10px] text-[#6B7A6F] bg-[#F3EFE6] px-1.5 py-0.5 rounded">
                            {m.time}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#6B7A6F] mt-0.5 leading-relaxed">
                          {m.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Dishes in this Order */}
            <div className="bg-[#FFFFFF] rounded-xl elevation-1 border border-[#3F704D]/15 p-5 space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#1F2421]">
                Daftar Sajian Menu Dalam Jamuan Ini ({activeOrder.items.length} Menu)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeOrder.items.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/10 flex items-center gap-3">
                    <img
                      src={item.dish.imageUrl}
                      alt={item.dish.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="text-xs flex-1">
                      <div className="font-serif font-bold text-[#1F2421] line-clamp-1">{item.dish.name}</div>
                      <div className="text-[#6B7A6F] text-[11px]">{item.quantity} Pax • {item.dish.servingStyle}</div>
                      {item.specialNotes && (
                        <div className="text-[10px] text-[#D9532F] italic mt-0.5">Note: {item.specialNotes}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Maître d’ & Dispatcher Info */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Maître d’ Contact Card */}
            <div className="bg-[#FFFFFF] rounded-xl elevation-1 border border-[#3F704D]/15 p-5 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#3F704D] bg-[#EAF2EC] px-2 py-0.5 rounded">
                Penanggung Jawab Jamuan (Maître d’)
              </span>

              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#3F704D] text-white flex items-center justify-center font-serif text-lg font-bold">
                  {activeOrder.maitreDName.charAt(4)}
                </div>
                <div>
                  <div className="font-serif font-bold text-sm text-[#1F2421]">
                    {activeOrder.maitreDName}
                  </div>
                  <div className="text-xs text-[#6B7A6F]">
                    Kapten Pelayanan Keraton
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-xs border-t border-[#3F704D]/10 pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7A6F]">Kontak Langsung:</span>
                  <a
                    href={`https://wa.me/6281299883421`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#3F704D] hover:underline flex items-center gap-1"
                  >
                    <Phone className="w-3 h-3 text-[#265737]" />
                    {activeOrder.maitreDPhone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7A6F]">Armada Logistik:</span>
                  <span className="font-mono font-bold text-[#1F2421]">{activeOrder.chillerPlate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#6B7A6F]">Suhu Chiller Saat Ini:</span>
                  <span className="font-bold text-[#3F704D] flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-[#3F704D]" />
                    4.2°C (Optimal)
                  </span>
                </div>
              </div>

              <a
                href={`https://wa.me/6281287002970?text=Halo%20${encodeURIComponent(activeOrder.maitreDName)},%20saya%20ingin%20koordinasi%20untuk%20pesanan%20${activeOrder.bookingCode}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-3 rounded bg-[#265737] text-white text-xs font-semibold hover:bg-[#3F704D] transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Hubungi Maître d’ via WhatsApp</span>
              </a>
            </div>

            {/* Financial Status Card */}
            <div className="bg-[#FFFFFF] rounded-xl elevation-1 border border-[#3F704D]/15 p-5 space-y-3 font-sans">
              <h4 className="font-serif font-bold text-sm text-[#1F2421]">
                Status Keuangan & Reservasi
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#6B7A6F]">Total Investasi:</span>
                  <span className="font-bold text-[#1F2421]">{formatRupiah(activeOrder.totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#6B7A6F]">Down Payment (DP 30%):</span>
                  <span className="font-bold text-[#D9532F]">{formatRupiah(activeOrder.dpAmount)}</span>
                </div>
                <div className="flex justify-between items-center border-t border-[#3F704D]/10 pt-2">
                  <span className="text-[#6B7A6F]">Status DP:</span>
                  {activeOrder.isDpPaid ? (
                    <span className="text-[#3F704D] font-bold bg-[#EAF2EC] px-2 py-0.5 rounded text-[11px] flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Lunas Terverifikasi
                    </span>
                  ) : (
                    <span className="text-[#D9532F] font-bold bg-[#FDF0ED] px-2 py-0.5 rounded text-[11px]">
                      Menunggu Transfer
                    </span>
                  )}
                </div>
              </div>

              {!activeOrder.isDpPaid && (
                <div className="p-3 bg-[#FDF0ED] rounded text-[11px] text-[#D9532F] border border-[#D9532F]/20">
                  Silakan transfer ke Rekening BCA Prioritas: <strong>8820-192-888</strong> a.n. PT Merys Kitchen Nusantara.
                </div>
              )}
            </div>

            {/* Schedule New Banquet CTA */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-[#EAF2EC] to-[#F3EFE6] border border-[#3F704D]/20 text-center space-y-2">
              <Sparkles className="w-6 h-6 text-[#C29B38] mx-auto" />
              <div className="font-serif font-bold text-xs text-[#1F2421]">
                Punya Acara Resepsi Mendatang?
              </div>
              <p className="text-[11px] text-[#6B7A6F]">
                Kunci tanggal jamuan Anda lebih awal untuk memastikan ketersediaan pramusaji adat dan armada chiller.
              </p>
              <button
                type="button"
                onClick={onOpenBooking}
                className="w-full py-2 rounded bg-[#3F704D] text-white text-xs font-semibold hover:bg-[#265737] shadow-sm transition-all"
              >
                Buat Jadwal Baru
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
