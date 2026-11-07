import React from 'react';
import { ShoppingBag, UtensilsCrossed, Calendar, Clock, Sparkles, Phone, Mail, Award } from 'lucide-react';
import { CartItem } from '../types/catering';
import { formatRupiah } from '../utils/formatters';

interface HeaderProps {
  activeTab: 'menu' | 'booking' | 'tracker' | 'builder' | 'gallery';
  setActiveTab: (tab: 'menu' | 'booking' | 'tracker' | 'builder' | 'gallery') => void;
  cart: CartItem[];
  onOpenCart: () => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cart,
  onOpenCart,
  onOpenBooking,
}) => {
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartValue = cart.reduce((sum, item) => sum + (item.dish.pricePerPax * item.quantity), 0);

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/98 backdrop-blur-md border-b border-[#3F704D]/15 shadow-xs transition-all">
      {/* 1. Top Utility & Contact Information Bar */}
      <div className="bg-[#1F2421] text-[#edf2ed] py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium border-b border-[#3F704D]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          
          {/* Left Metadata */}
          <div className="flex items-center gap-2.5 text-[11px] sm:text-xs">
            <span className="font-semibold text-white tracking-wide">Merys Kitchen</span>
            <span className="text-[#6B7A6F]">•</span>
            <span className="text-[#d7dbd6] hidden md:inline">Layanan Katering Aristokrat & Perjamuan Kenegaraan</span>
            <span className="text-[#bbf1c5] font-medium flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#C29B38]" />
              100% Halal MUI & ISO 22000
            </span>
          </div>

          {/* Right Direct Contact Channels */}
          <div className="flex items-center gap-4 text-[11px] sm:text-xs text-[#d7dbd6]">
            <a 
              href="tel:081287002970" 
              className="flex items-center gap-1.5 hover:text-[#bbf1c5] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C29B38]" />
              <span>WhatsApp / Telp: <strong>0812-8700-2970</strong></span>
            </a>
            <span className="text-[#6B7A6F] hidden sm:inline">|</span>
            <a 
              href="mailto:meryshospitality@gmail.com" 
              className="hidden sm:flex items-center gap-1.5 hover:text-[#bbf1c5] transition-colors"
            >
              <Mail className="w-3 h-3 text-[#C29B38]" />
              <span>meryshospitality@gmail.com</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Spacious Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5 sm:py-4 gap-4">
          
          {/* Brand Zone: Prominent Merys Kitchen Logo & Title */}
          <button 
            onClick={() => setActiveTab('menu')}
            className="flex items-center gap-3.5 text-left focus:outline-none group shrink-0"
          >
            <div className="h-14 sm:h-16 w-auto flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
              <img
                src="/assets/aistudio/image_12506148.png"
                alt="Merys Kitchen Logo"
                className="h-14 sm:h-16 w-auto object-contain drop-shadow"
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#1F2421] group-hover:text-[#3F704D] transition-colors">
                  Merys Kitchen
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] sm:text-[11px] font-bold text-[#3F704D] tracking-[0.16em] uppercase font-sans">
                  Premium Cuisine
                </span>
                <span className="text-[#6B7A6F] text-[10px] hidden md:inline">·</span>
                <span className="text-[11px] text-[#6B7A6F] hidden md:inline font-sans">
                  Royal Catering & Banquets
                </span>
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links: Clean, Uncrowded & Elegant */}
          <nav className="hidden xl:flex items-center gap-7 lg:gap-8 text-sm font-semibold text-[#1F2421]">
            <button
              onClick={() => setActiveTab('menu')}
              className={`py-2 transition-all relative whitespace-nowrap ${
                activeTab === 'menu'
                  ? 'text-[#3F704D] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3F704D] after:rounded-full'
                  : 'text-[#1F2421] hover:text-[#3F704D]'
              }`}
            >
              Katalog Jamuan
            </button>
            <button
              onClick={() => setActiveTab('builder')}
              className={`py-2 transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'builder'
                  ? 'text-[#3F704D] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3F704D] after:rounded-full'
                  : 'text-[#1F2421] hover:text-[#3F704D]'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#C29B38]" />
              <span>Kustomisasi Menu</span>
            </button>
            <button
              onClick={() => setActiveTab('booking')}
              className={`py-2 transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'booking'
                  ? 'text-[#3F704D] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3F704D] after:rounded-full'
                  : 'text-[#1F2421] hover:text-[#3F704D]'
              }`}
            >
              <Calendar className="w-4 h-4 text-[#3F704D]" />
              <span>Jadwalkan Acara</span>
            </button>
            <button
              onClick={() => setActiveTab('tracker')}
              className={`py-2 transition-all relative whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === 'tracker'
                  ? 'text-[#3F704D] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3F704D] after:rounded-full'
                  : 'text-[#1F2421] hover:text-[#3F704D]'
              }`}
            >
              <Clock className="w-4 h-4 text-[#3F704D]" />
              <span>Lacak Dapur & Armada</span>
            </button>
            <button
              onClick={() => setActiveTab('gallery')}
              className={`py-2 transition-all relative whitespace-nowrap ${
                activeTab === 'gallery'
                  ? 'text-[#3F704D] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#3F704D] after:rounded-full'
                  : 'text-[#1F2421] hover:text-[#3F704D]'
              }`}
            >
              Galeri & Testimoni
            </button>
          </nav>

          {/* Action Zone: Clear Separation of Primary CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Quick Call / WhatsApp button on mobile */}
            <a
              href="tel:081287002970"
              className="xl:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-[#EAF2EC] text-[#3F704D] hover:bg-[#3F704D] hover:text-white transition-colors border border-[#3F704D]/20"
              aria-label="Hubungi Telepon / WhatsApp"
              title="Hubungi 0812-8700-2970"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Quick Consultation CTA on desktop */}
            <button
              onClick={onOpenBooking}
              className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-[#3F704D] border-[1.5px] border-[#3F704D] rounded-lg hover:bg-[#3F704D]/5 transition-all shadow-xs"
            >
              <UtensilsCrossed className="w-3.5 h-3.5 text-[#C29B38]" />
              <span>Konsultasi Jamuan</span>
            </button>

            {/* Cart Trigger Button */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg bg-[#3F704D] text-[#FFFFFF] hover:bg-[#265737] transition-all shadow-sm group active:scale-[0.99]"
              aria-label="Keranjang Jamuan"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-[#FFFFFF]" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#D9532F] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#FDFBF7]">
                    {cart.length}
                  </span>
                )}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-[10px] uppercase font-bold text-[#bbf1c5] leading-tight">
                  {totalItemsCount > 0 ? `${totalItemsCount} Porsi` : 'Pilihan Jamuan'}
                </div>
                <div className="text-xs font-bold leading-tight text-white font-sans">
                  {totalCartValue > 0 ? formatRupiah(totalCartValue) : 'Atur Porsi'}
                </div>
              </div>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
