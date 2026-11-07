import React from 'react';
import { ShieldCheck, Phone, Mail, MapPin, Award, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#1F2421] text-[#edf2ed] pt-14 pb-20 sm:pb-14 border-t border-[#3F704D]/30 mt-16 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/aistudio/image_12506148.png"
                alt="Merys Kitchen Logo"
                className="h-16 w-auto object-contain drop-shadow bg-white/10 rounded-lg p-1"
              />
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-[#FFFFFF] block">
                  Merys Kitchen
                </span>
                <span className="text-[11px] text-[#bbf1c5] tracking-wide block">
                  Premium Cuisine & Royal Catering
                </span>
              </div>
            </div>

            <p className="text-xs text-[#d7dbd6] leading-relaxed max-w-sm">
              Layanan katering jamuan perjamuan agung berskala kenegaraan, korporasi, dan resepsi pernikahan mewah. 
              Menjunjung tinggi resep adiluhung nenek moyang dengan tata saji tembikar dan kepatuhan higienitas modern.
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-[#C29B38]">
              <Award className="w-4 h-4" />
              <span>Sertifikasi Halal MUI No. 00160098450919</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FFFFFF] tracking-wide">
              Koleksi Menu
            </h4>
            <ul className="space-y-2 text-xs text-[#d7dbd6]">
              <li><span className="hover:text-white transition-colors cursor-pointer">Prasmanan Ageng Sriwijaya</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Prasmanan Luhur Majapahit</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Nasi Besek Rendang Marapi</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Tumpeng Agung Roepiah Keraton</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Pondokan Kambing Guling Rempah</span></li>
              <li><span className="hover:text-white transition-colors cursor-pointer">Jajanan Pasar 7 Rupa</span></li>
            </ul>
          </div>

          {/* Service Areas */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FFFFFF] tracking-wide">
              Layanan Jamuan
            </h4>
            <ul className="space-y-2 text-xs text-[#d7dbd6]">
              <li>Resepsi Pernikahan Ballroom</li>
              <li>Gala Dinner Diplomatik & Kenegaraan</li>
              <li>Jamuan Syukuran & Potong Tumpeng</li>
              <li>Corporate Launch & Board Luncheon</li>
              <li>Penyewaan Alat Piring Tembikar Luhur</li>
              <li>Tim Pramusaji Adat Berkebaya</li>
            </ul>
          </div>

          {/* Contact & Concierge */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-[#FFFFFF] tracking-wide">
              Dapur Pusat & Concierge
            </h4>
            <ul className="space-y-2 text-xs text-[#d7dbd6]">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#3F704D] shrink-0 mt-0.5" />
                <span>Jl. Dharmawangsa Raya No. 18, Kebayoran Baru, Jakarta Selatan 12160</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3F704D] shrink-0" />
                <a href="tel:081287002970" className="hover:text-white transition-colors">
                  081287002970
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#3F704D] shrink-0" />
                <a href="mailto:meryshospitality@gmail.com" className="hover:text-white transition-colors">
                  meryshospitality@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#3F704D] shrink-0" />
                <span>Setiap Hari: 07.00 - 22.00 WIB</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#3F704D]/20 flex flex-col sm:flex-row items-center justify-between text-xs text-[#717971] gap-3">
          <p>© 2026 Merys Kitchen Premium Cuisine. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="hover:text-white transition-colors cursor-pointer">Kebijakan Privasi</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Syarat & Ketentuan Layanan</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Protokol Higienitas CHSE</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
