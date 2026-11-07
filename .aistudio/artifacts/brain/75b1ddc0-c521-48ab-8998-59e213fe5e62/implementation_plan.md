# Rencana Peningkatan Tampilan Mobile-First Merys Kitchen

Peningkatan menyeluruh pada pengalaman tampilan smartphone (Mobile UX) untuk Merys Kitchen agar siap dibagikan ke klien, keluarga, dan panitia acara dengan standar aplikasi modern yang mulus, ergonomis, dan berestetika tinggi.

## User Review & Critical Decisions

> [!IMPORTANT]
> **Keputusan yang Telah Dikonfirmasi Pengguna:**
> - **Gaya Navigasi Mobile**: Menggunakan **Bar Navigasi di Bawah Layar (Fixed Bottom App Bar)** seperti aplikasi modern (Gojek / Traveloka / Luxury F&B Apps) yang mudah dijangkau satu jempol.
> - **Penataan Kartu Makanan**: Menggunakan **Satu Kolom Penuh (Full-Width Card)** di layar smartphone dengan foto hidangan besar berkualitas tinggi dan tombol porsi sentuh yang luas.

---

## 1. Overview & Core Concept

- **Tujuan Utama**: Mentransformasi tampilan mobile web Merys Kitchen menjadi pengalaman *App-Like* premium yang sangat responsif, nyaman digulir dengan satu tangan, dan tidak ada elemen bertumpukan ketika dibuka di browser smartphone (Safari iOS / Chrome Android).
- **Masalah Mobile yang Diperbaiki**:
  1. Header dan strip tab horizontal di bagian atas sebelumnya memakan ruang vertikal terlalu banyak di layar kecil.
  2. Kartu makanan di smartphone butuh visual foto yang lebih megah dan area sentuh tombol (+ / -) yang lebih leluasa (minimal 44px) tanpa risiko salah pencet.
  3. Bar bawah sticky checkout sebelumnya berpotensi bertabrakan dengan navigasi bawah.

---

## 2. User Experience & Visual Design (Mobile Architecture)

```
┌─────────────────────────────────────────────────────────┐
│ [LOGO] Merys Kitchen                  [WA / 0812]  [ 🛍 ]│ Top Bar (Compact 56px)
├─────────────────────────────────────────────────────────┤
│                                                         │
│  HERO MOBILE (Pacing Lega, Headline Seimbang)           │
│                                                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  [ FOTO MAKANAN BESAR RASIO 16:10 ]                     │
│  Paket Prasmanan Ageng Sriwijaya                        │
│  Rangkaian 8 hidangan kehormatan kesultanan...          │
│  Rp 135.000 /pax                                        │
│  [  - 50 Pax +  ]   [ Pilih Varian Rempah ]             │
│                                                         │
│  [ FOTO MAKANAN BESAR RASIO 16:10 ]                     │
│  Besek Bambu Luhur Rendang Marapi                       │
│  ...                                                    │
│                                                         │
├─────────────────────────────────────────────────────────┤
│  [ FLOATING CHECKOUT PILL: 50 Pax · Lanjut Jadwal → ]   │ Floating Action Pill
├─────────────────────────────────────────────────────────┤
│  [ 🍽 Menu ]  [ ✨ Kustom ]  [ 📅 Jadwal ]  [ ⏱ Lacak ] │ Fixed Bottom Nav Bar
└─────────────────────────────────────────────────────────┘ (Natural Thumb Zone)
```

### A. Mobile Fixed Bottom Navigation Bar (Pattern 1)
- **Struktur**: Menampilkan bar navigasi tetap di bawah layar (`fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#3F704D]/15 h-16 pb-safe`).
- **5 Tab Navigasi Jempol**:
  1. `Menu` (Ikon sendok garpu / Utensils)
  2. `Kustom` (Ikon Sparkles Cipta Rasa)
  3. `Jadwalkan` (Ikon Calendar Reservasi)
  4. `Lacak` (Ikon Clock Armada Dapur)
  5. `Keranjang` (Ikon ShoppingBag dengan live badge porsi merah)
- **Status Aktif**: Warna hijau pandan `#3F704D` dengan label tebal dan titik penanda aktif.

### B. Mobile Top Bar Ramping (Pattern 2)
- Di mobile, header atas dibuat ramping (`h-14 sm:h-16`) dengan logo Merys Kitchen berdimensi jelas, tombol telepon/WhatsApp cepat (`0812-8700-2970`), dan tombol keranjang mini.
- Menghilangkan tab strip bertingkat ganda di atas yang memotong tinggi layar.

### C. Kartu Makanan Satu Kolom Penuh (Full-Width Photographic Cards)
- Di layar mobile ($\le 640\text{px}$), kartu tampil 1 kolom penuh (`w-full`) dengan sudut membulat modern (`rounded-xl`).
- Rasio foto proporsional ($16:10$ atau $4:3$) dengan resolusi tajam dan vignette bawah elegan.
- **Touch Target Ergonomis**:
  - Tombol penambah porsi (- / +) berukuran minimum $44 \times 44\text{px}$ untuk jempol mobile.
  - Tombol kustomisasi rempah berukuran tinggi 44px dengan teks terbaca jelas.

### D. Floating Bottom Checkout Pill (Level 2 Elevation)
- Saat keranjang berisi menu, bilah checkout mengapung rapi tepat di atas bottom navigation bar (`bottom-[72px] mx-4 rounded-xl`), menampilkan total pax dan tombol "Lanjut Pesan Jamuan".
- Mematuhi aturan batas 15% sticky surface agar 85% layar tetap leluasa untuk membaca menu.

### E. Bottom Sheet Modal untuk HP (Pattern 3)
- Modal kustomisasi rempah (`MenuDetailModal`) dan wizard reservasi (`BookingStepperModal`) di mobile bertransformasi menjadi *Bottom Sheet* elegan dengan *drag handle bar* di atasnya dan scrolling vertikal yang halus.

---

## 3. Key Product Decisions & Trade-Offs

- **Bottom Nav Bar vs Top Tabs**: Memindahkan navigasi utama ke bagian bawah layar di mobile terbukti jauh lebih ergonomis untuk penggunaan satu tangan di smartphone masa kini (iPhone/Android berlayar 6.1"–6.7").
- **1 Kolom vs 2 Kolom di HP**: Memilih 1 kolom penuh memastikan foto makanan nusantara Merys Kitchen terlihat menggugah selera (*food appeal*) dan tidak terpotong, serta teks nama hidangan tidak terpotong.
- **Bottom Clearance (`pb-28`)**: Seluruh halaman diberi jarak bantalan bawah 112px agar konten terbawah (seperti footer atau menu terakhir) tidak tertutup bilah navigasi bawah.

---

## 4. Technical Implementation & Verification Plan

```
┌────────────────────────────────────────────────────────┐
│                   App.tsx (Root View)                  │
├──────────────────────────┬─────────────────────────────┤
│  Top Mobile Header       │  Bottom Mobile Nav Bar      │
│  • Compact 56px          │  • Fixed bottom-0 h-16      │
│  • Direct WhatsApp Call  │  • 5 Thumb Destinations     │
├──────────────────────────┴─────────────────────────────┤
│  Full-Width Food Menu Cards (1 Column on Mobile)       │
│  • Min 44px Touch Targets for Steppers & Buttons       │
│  • 16:10 Vivid Hero Photography                        │
├────────────────────────────────────────────────────────┤
│  Mobile-Optimized Bottom Sheet Modals (Detail/Stepper) │
└────────────────────────────────────────────────────────┘
```

1. **Komponen Header & Bottom Nav (`Header.tsx` & `MobileBottomNav.tsx`)**:
   - Jadikan header atas mobile ramping dan bersih.
   - Buat komponen `MobileBottomNav` yang otomatis muncul di mobile (`xl:hidden`) dan terhubung ke state tab aktif.
2. **Kartu Makanan Mobile (`FoodMenuCard.tsx`)**:
   - Sempurnakan padding dan ukuran tombol sentuh porsi (`min-w-[44px] min-h-[44px]`).
   - Pastikan grid 1 kolom di mobile mengalir mulus dengan spasi `space-y-4`.
3. **Floating Checkout Bar (`StickyBottomBar.tsx`)**:
   - Di mobile, posisikan melayang di atas bottom navigation bar (`bottom-[72px]`) dengan gaya kapsul mewah.
4. **Modals Mobile Tuning (`MenuDetailModal.tsx` & `BookingStepperModal.tsx`)**:
   - Sesuaikan container modal agar di mobile menjadi bottom sheet penuh (`max-h-[90vh] rounded-t-2xl sm:rounded-xl`).
5. **Verifikasi Teknis**:
   - Jalankan `compile_applet` dan `lint_applet` bersamaan.
   - Jalankan `npm run build` untuk memverifikasi bundle.
   - Uji responsivitas pada viewport iPhone/Android (375px - 430px) dan desktop (1440px).
