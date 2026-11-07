import React from 'react';
import { ShieldCheck, Sparkles, Utensils, Users, ArrowRight, Award } from 'lucide-react';

interface HeroBannerProps {
  onOpenBooking: () => void;
  onExploreMenu: () => void;
  onOpenBuilder: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenBooking,
  onExploreMenu,
  onOpenBuilder,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F3EFE6]/70 via-[#FDFBF7] to-[#FDFBF7] border-b border-[#3F704D]/10 pt-12 pb-16 sm:pt-16 sm:pb-20">
      {/* Decorative Botanical & Subtle Heritage Texture */}
      <div 
        className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#3F704D_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Editorial Narrative with Spacious Typography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-7">
            
            {/* Top Quiet Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EAF2EC] border border-[#3F704D]/25 text-[#265737] text-xs font-semibold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Merys Kitchen • Kemegahan Kuliner Perjamuan Luhur</span>
            </div>

            {/* Display Headline with Balanced Spacing */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1F2421] leading-[1.22] max-w-2xl text-balance">
              Keagungan Cita Rasa Keraton Untuk Resepsi & Jamuan Bersejarah Anda.
            </h1>

            {/* Descriptive Body with Generous Line-Height */}
            <p className="text-sm sm:text-base text-[#6B7A6F] leading-relaxed max-w-2xl font-sans">
              Menghadirkan pesona <em>Rijsttafel modern</em> dan <em>Prasmanan Luhur</em> dengan bumbu rempah asli 
              tanah kepulauan. Dimasak lambat dengan filosofi adiluhung, disajikan dalam tembikar porselen klasik 
              dan dipandu pramusaji berbusana kebaya keraton yang berdedikasi tinggi.
            </p>

            {/* Clear Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#3F704D] text-[#FFFFFF] text-sm font-semibold hover:bg-[#265737] transition-all shadow-sm group active:scale-[0.99]"
              >
                <span>Jadwalkan Acara & Penawaran</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                onClick={onOpenBuilder}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg border-[1.5px] border-[#3F704D] text-[#3F704D] text-sm font-semibold hover:bg-[#3F704D]/5 transition-all"
              >
                <Utensils className="w-4 h-4 text-[#C29B38]" />
                <span>Kustomisasi Menu Pilihan</span>
              </button>

              <button
                type="button"
                onClick={onExploreMenu}
                className="inline-flex items-center justify-center px-4 py-3.5 text-xs text-[#6B7A6F] hover:text-[#1F2421] underline underline-offset-4 font-semibold transition-colors"
              >
                Lihat Katalog Piring Saji
              </button>
            </div>

            {/* Trust Markers Bar with Generous Margin */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#3F704D]/15">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EAF2EC] flex items-center justify-center text-[#3F704D] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2421]">100% Halal MUI</div>
                  <div className="text-[10px] text-[#6B7A6F]">Tersertifikasi Resmi</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#F7F2E7] flex items-center justify-center text-[#C29B38] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2421]">Rempah Alami</div>
                  <div className="text-[10px] text-[#6B7A6F]">Tanpa Pengawet</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#EAF2EC] flex items-center justify-center text-[#3F704D] shrink-0">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2421]">Tim Pramusaji</div>
                  <div className="text-[10px] text-[#6B7A6F]">Adat & Terlatih</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FDF0ED] flex items-center justify-center text-[#D9532F] shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#1F2421]">Armada Dingin</div>
                  <div className="text-[10px] text-[#6B7A6F]">Suhu Terkontrol</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Composition Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ring */}
              <div className="relative rounded-2xl p-3 bg-gradient-to-br from-[#EAF2EC] via-[#FFFFFF] to-[#F3EFE6] shadow-xl border border-[#3F704D]/15">
                <div className="relative rounded-xl overflow-hidden aspect-[4/3] group">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80"
                    alt="Jamuan Prasmanan Luhur Merys Kitchen"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1F2421]/80 via-transparent to-transparent" />
                  
                  {/* Floating VIP Card Tag */}
                  <div className="absolute top-3.5 left-3.5 bg-[#FFFFFF]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#3F704D] border border-[#3F704D]/20 shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#3F704D]"></span>
                    <span>Pelayanan Bintang Lima</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-xs text-[#bbf1c5] font-semibold tracking-wider uppercase">
                      Merys Kitchen Royal Banquet
                    </div>
                    <div className="font-serif text-lg sm:text-xl font-bold text-[#FFFFFF]">
                      Sajian Meja Tamu Kehormatan Kenegaraan
                    </div>
                    <div className="text-xs text-[#d7dbd6] mt-0.5">
                      Koleksi Piring Tembikar Luhur & Ronce Melati Segar
                    </div>
                  </div>
                </div>

                {/* Floating Micro Satisfaction Box */}
                <div className="mt-3.5 p-3.5 bg-[#FFFFFF] rounded-xl border border-[#3F704D]/10 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#3F704D] text-white flex items-center justify-center font-serif text-xs font-bold shrink-0">
                      4.9
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1F2421]">Kepuasan Tamu Resepsi</div>
                      <div className="text-[11px] text-[#6B7A6F]">Dari 1.250+ Perhelatan Akbar</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-[#D9532F] bg-[#FDF0ED] px-2.5 py-1 rounded-full border border-[#D9532F]/30">
                      Terjadwal Penuh Nov-Des
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
