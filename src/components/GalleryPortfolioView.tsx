import React from 'react';
import { Award, ShieldCheck, Star, Sparkles, CheckCircle2, Quote } from 'lucide-react';
import { TESTIMONIALS, GALLERY_ITEMS } from '../data/cateringData';

interface GalleryPortfolioViewProps {
  onOpenBooking: () => void;
}

export const GalleryPortfolioView: React.FC<GalleryPortfolioViewProps> = ({
  onOpenBooking,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Editorial Title */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2EC] text-[#3F704D] text-xs font-bold border border-[#3F704D]/20">
          <Award className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>Portofolio Kehormatan & Jejak Jamuan VIP</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1F2421]">
          Kemegahan Visual Jamuan & Apresiasi Para Tokoh
        </h2>
        <p className="text-sm text-[#6B7A6F]">
          Dokumentasi kemewahan penataan meja jamuan prasmanan, kehangatan pramusaji berkebaya, 
          dan ulasan para tuan rumah acara kenegaraan serta pernikahan terkemuka.
        </p>
      </div>

      {/* Visual Photo Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {GALLERY_ITEMS.map((item, idx) => (
          <div 
            key={idx}
            className="group relative rounded-xl overflow-hidden bg-[#FFFFFF] elevation-1 border border-[#3F704D]/15 flex flex-col"
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFE6]">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <div className="absolute top-2.5 left-2.5">
                <span className="bg-[#3F704D] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {item.category}
                </span>
              </div>
            </div>
            <div className="p-4 space-y-1">
              <h3 className="font-serif font-bold text-sm text-[#1F2421] leading-snug">
                {item.title}
              </h3>
              <p className="text-xs text-[#6B7A6F] line-clamp-2">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* VIP Testimonials Section */}
      <div className="bg-[#FFFFFF] rounded-2xl elevation-1 border border-[#3F704D]/15 p-6 sm:p-10 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <Quote className="w-8 h-8 text-[#C29B38] mx-auto opacity-70" />
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1F2421]">
            Tutur Kata Dari Tuan Rumah Jamuan
          </h3>
          <p className="text-xs text-[#6B7A6F]">
            Kepercayaan tinggi yang kami jaga dalam setiap hidangan dan perjumpaan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-xl bg-[#FDFBF7] border border-[#3F704D]/10 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex gap-1 text-[#C29B38]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#414941] leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#3F704D]/10">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-10 h-10 rounded-full object-cover border border-[#3F704D]/30"
                />
                <div>
                  <div className="font-serif font-bold text-xs text-[#1F2421]">
                    {t.author}
                  </div>
                  <div className="text-[11px] text-[#6B7A6F]">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Official Hygiene & Halal Standards Banner */}
      <div className="bg-gradient-to-r from-[#265737] to-[#3F704D] text-white rounded-2xl p-6 sm:p-10 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-[11px] uppercase font-bold tracking-widest text-[#bbf1c5] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#C29B38]" />
              Sertifikasi & Kepatuhan Standar Higienis Mutu Tinggi
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold">
              Kepastian Higienitas 100% Halal MUI & Standar Dapur ISO 22000
            </h3>
            <p className="text-xs sm:text-sm text-[#d7dbd6] leading-relaxed">
              Seluruh bahan daging sapi, ayam, dan rempah diproses melalui sertifikasi Halal MUI No. 00160098450919. 
              Dapur kami diawasi berkala oleh auditor keamanan pangan bersertifikat HACCP dan CHSE.
            </p>
            <div className="flex flex-wrap gap-4 pt-2 text-xs text-[#bbf1c5]">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Halal MUI LP-POM</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> ISO 22000:2018</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> CHSE Cleanliness Kemlu</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Uji Lab Mikrobiologi Berkala</span>
            </div>
          </div>

          <div className="lg:col-span-4 text-center lg:text-right">
            <button
              type="button"
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded bg-[#C29B38] text-[#1F2421] text-xs sm:text-sm font-bold hover:bg-[#ffe1a0] transition-colors shadow-md active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Jadwalkan Konsultasi VIP</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
