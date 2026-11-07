export type CategoryId = 
  | 'all'
  | 'prasmanan'
  | 'nasi-kotak'
  | 'tumpeng'
  | 'gubukan'
  | 'jajanan'
  | 'minuman';

export interface DishItem {
  id: string;
  name: string;
  category: CategoryId;
  categoryName: string;
  pricePerPax: number;
  minPax: number;
  description: string;
  ingredients: string;
  imageUrl: string;
  halalCertified: boolean;
  spiceLevel: 'Tidak Pedas' | 'Sedang' | 'Pedas' | 'Sangat Pedas';
  paxTier: 'Porsi 25-50 Pax' | 'Porsi 50-100 Pax' | 'Porsi 100-500+ Pax';
  dietaryTags: string[];
  servingStyle: 'Prasmanan Meja' | 'Besek Bambu Luhur' | 'Kotak Ivory' | 'Gubukan / Live Stall' | 'Tumpeng Tampah';
  isFeatured?: boolean;
  badge?: string;
}

export interface CartItem {
  dish: DishItem;
  quantity: number; // pax count
  spicePreference?: string;
  packagingPreference?: string;
  specialNotes?: string;
}

export type BookingStep = 1 | 2 | 3 | 4;

export interface BanquetBookingDetails {
  // Step 1: Pax & Menu
  guestCount: number;
  tastingBoxRequested: boolean;
  dietaryRestrictions: string;
  
  // Step 2: Date & Venue
  eventDate: string; // YYYY-MM-DD
  timeSlot: 'Jamuan Siang (11.00 - 14.00)' | 'Jamuan Sore/Malam (18.00 - 21.00)' | 'Seharian Penuh (Full Day Gala)';
  eventType: 'Pernikahan / Wedding' | 'Corporate Gala / Kenegaraan' | 'Syukuran / Tumpengan' | 'Private Gathering' | 'Ulang Tahun / Jamuan Keluarga';
  venueType: 'Ballroom / Gedung' | 'Rumah Tinggal / Kediaman' | 'Taman / Outdoor' | 'Kantor / Perusahaan';
  cityArea: string;
  fullAddress: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;

  // Step 3: Hospitality & Tableware
  tablewareTier: 'Tembikar Luhur & Daun Pisang (Klasik)' | 'Porcelain Keraton & Kuningan Antik (VIP)' | 'Silverware & Kristal Modern (Eksklusif)';
  waiterCount: number;
  includeLiveChef: boolean;
  includeFloralDecor: boolean;
  warmerType: 'Kuningan Antik Tradisional' | 'Stainless Chafing Modern' | 'Platter Display Besek';

  // Step 4: Summary & Payment
  notes: string;
  paymentMethod: 'Transfer Bank BCA / Mandiri' | 'Virtual Account Prioritas' | 'Invoice Perusahaan (Corporate PO)';
}

export interface ActiveOrder {
  id: string;
  bookingCode: string;
  createdAt: string;
  eventDate: string;
  eventTime: string;
  clientName: string;
  eventType: string;
  totalPax: number;
  items: CartItem[];
  tablewareTier: string;
  waiterCount: number;
  status: 'Menunggu Pembayaran' | 'Dapur Menyiapkan' | 'Dalam Pengiriman' | 'Selesai';
  progressPercent: number;
  statusNotes: string;
  maitreDName: string;
  maitreDPhone: string;
  chillerPlate: string;
  totalAmount: number;
  dpAmount: number;
  isDpPaid: boolean;
}
