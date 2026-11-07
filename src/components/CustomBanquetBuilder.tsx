import React, { useState } from 'react';
import { Sparkles, Utensils, Check, Plus, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';
import { DishItem } from '../types/catering';
import { formatRupiah } from '../utils/formatters';

interface CustomBanquetBuilderProps {
  onAddCustomPackageToCart: (dish: DishItem, quantity: number) => void;
  onProceedToBooking: () => void;
}

interface ComponentOption {
  id: string;
  name: string;
  desc: string;
  priceDelta: number;
  dietary?: string;
}

export const CustomBanquetBuilder: React.FC<CustomBanquetBuilderProps> = ({
  onAddCustomPackageToCart,
  onProceedToBooking,
}) => {
  // Selections
  const [packageName, setPackageName] = useState('Paket Jamuan Luhur Cipta Rasa');
  const [paxCount, setPaxCount] = useState(100);

  // Bases
  const [selectedRice, setSelectedRice] = useState<string>('nasi-liwet');
  const [selectedMeat, setSelectedMeat] = useState<string>('rendang-marapi');
  const [selectedPoultry, setSelectedPoultry] = useState<string>('ayam-klaten');
  const [selectedSeafood, setSelectedSeafood] = useState<string>('kakap-rujak');
  const [selectedVeggie, setSelectedVeggie] = useState<string>('sayur-lodeh');
  const [selectedSambal, setSelectedSambal] = useState<string>('sambal-kecombrang');
  const [selectedDessert, setSelectedDessert] = useState<string>('es-kopyor');

  // Options definitions
  const riceOptions: ComponentOption[] = [
    { id: 'nasi-liwet', name: 'Nasi Liwet Solo Santan Daun Salam', desc: 'Beras pulen diaron santan kental kelapa, serai, dan daun salam harum.', priceDelta: 0 },
    { id: 'nasi-kuning', name: 'Nasi Kuning Cengkeh Maluku', desc: 'Warna kuning alami kunyit empu dengan rempah cengkeh dan daun pandan.', priceDelta: 3000 },
    { id: 'nasi-jeruk', name: 'Nasi Wangi Irisan Daun Jeruk Purut', desc: 'Aroma segar daun jeruk purut muda dan bawang merah goreng renyah.', priceDelta: 2000 },
    { id: 'nasi-merah', name: 'Nasi Merah Organik & Ubi Pandan', desc: 'Rendah indeks glikemik, kaya serat dengan wangi suji alami.', priceDelta: 4000, dietary: 'Gluten-Free' },
  ];

  const meatOptions: ComponentOption[] = [
    { id: 'rendang-marapi', name: 'Rendang Daging Sapi Marapi (Slow Cooked 12 Jam)', desc: 'Daging sapi gandik empuk dengan karamelisasi santan kelapa tua murni.', priceDelta: 0, dietary: 'Best Seller' },
    { id: 'empal-gentong', name: 'Empal Daging Sengkel Bumbu Gentong Cirebon', desc: 'Kaya aroma kayu manis, kapulaga, dan kuah santan kuning gurih.', priceDelta: 2000 },
    { id: 'sate-maranggi', name: 'Sate Maranggi Has Dalam Purwakarta', desc: 'Marinasi ketumbar, gula kelapa tebu, dipanggang arang batok harum.', priceDelta: 5000 },
  ];

  const poultryOptions: ComponentOption[] = [
    { id: 'ayam-klaten', name: 'Ayam Panggang Madu Klaten Bumbu Areh', desc: 'Ayam kampung muda dimasak ungkep areh santan lalu dipanggang karamel.', priceDelta: 0 },
    { id: 'bebek-betutu', name: 'Bebek Betutu Gianyar Bumbu Genep', desc: 'Bebek empuk dengan 16 bumbu wangen khas puri Bali.', priceDelta: 6000 },
    { id: 'ayam-tangkap', name: 'Ayam Tangkap Daun Kari Renyah Aceh', desc: 'Potongan ayam renyah bertabur daun temurui dan cabai hijau goreng.', priceDelta: 2000 },
  ];

  const seafoodOptions: ComponentOption[] = [
    { id: 'kakap-rujak', name: 'Fillet Kakap Merah Bakar Bumbu Rujak', desc: 'Ikan segar pesisir dengan baluran bumbu asam pedas manis aromatik.', priceDelta: 0 },
    { id: 'cumi-jimbaran', name: 'Cumi Telur Bakar Saus Madu Jimbaran', desc: 'Cumi segar lembut dengan siraman saus mentega madu bawang putih.', priceDelta: 4000 },
    { id: 'udang-galah', name: 'Udang Galah Saus Tiram Rempah Serai', desc: 'Udang ukuran besar berkulit renyah dengan aroma serai wangi.', priceDelta: 8000 },
  ];

  const veggieOptions: ComponentOption[] = [
    { id: 'sayur-lodeh', name: 'Sayur Lodeh Labu Siam & Ebi Kasunanan', desc: 'Labu siam manis berpadu tempe kedelai, ebi sangrai, dan kuah gurih.', priceDelta: 0 },
    { id: 'urap-pesisir', name: 'Sayur Urap Pesisir 7 Rupa Bumbu Kelapa Bakar', desc: 'Aneka sayuran hijau segar dengan parutan kelapa berbumbu kencur wangi.', priceDelta: 1000 },
    { id: 'tumis-pepaya', name: 'Tumis Daun Pepaya Jepang & Teri Medan', desc: 'Tanpa rasa pahit, ditumis gurih dengan ikan teri medan renyah.', priceDelta: 0 },
  ];

  const sambalOptions: ComponentOption[] = [
    { id: 'sambal-kecombrang', name: 'Sambal Matah Iris Daun Kecombrang', desc: 'Bawang merah, cabai rawit merah, minyak kelapa dingin, dan bunga rias.', priceDelta: 0 },
    { id: 'sambal-bajak', name: 'Sambal Bajak Buah Kemang Matang', desc: 'Sambal masak kaya rasa dengan sentuhan buah kemang harum manis.', priceDelta: 1000 },
    { id: 'sambal-terasi', name: 'Sambal Terasi Mentah Bakar Juwana', desc: 'Terasi udang juwana bakar, cabai merah petik, dan perasan jeruk limau.', priceDelta: 0 },
  ];

  const dessertOptions: ComponentOption[] = [
    { id: 'es-kopyor', name: 'Es Kopyor De Coco Kelapa Puan Murni', desc: 'Kelapa kopyor lembut dengan sirup gula melaka dan es kristal higienis.', priceDelta: 0 },
    { id: 'jajanan-tampah', name: 'Nampan Mini Jajanan Pasar Keraton (Klepon & Serabi)', desc: 'Kudapan manis tradisional lumer gula kelapa alami.', priceDelta: 3000 },
    { id: 'es-kunyit', name: 'Es Kunyit Asam Madu Hutan & Selasih Botanikal', desc: 'Rebusan rimpang segar penutup jamuan yang menyehatkan lambung.', priceDelta: 0 },
  ];

  // Base package price
  const basePricePerPax = 125000;
  
  // Calculate selected additions
  const currentRiceDelta = riceOptions.find(o => o.id === selectedRice)?.priceDelta || 0;
  const currentMeatDelta = meatOptions.find(o => o.id === selectedMeat)?.priceDelta || 0;
  const currentPoultryDelta = poultryOptions.find(o => o.id === selectedPoultry)?.priceDelta || 0;
  const currentSeafoodDelta = seafoodOptions.find(o => o.id === selectedSeafood)?.priceDelta || 0;
  const currentVeggieDelta = veggieOptions.find(o => o.id === selectedVeggie)?.priceDelta || 0;
  const currentSambalDelta = sambalOptions.find(o => o.id === selectedSambal)?.priceDelta || 0;
  const currentDessertDelta = dessertOptions.find(o => o.id === selectedDessert)?.priceDelta || 0;

  const finalPricePerPax = basePricePerPax + currentRiceDelta + currentMeatDelta + currentPoultryDelta + currentSeafoodDelta + currentVeggieDelta + currentSambalDelta + currentDessertDelta;
  const totalPackageInvestment = finalPricePerPax * paxCount;

  const handleAddToCart = () => {
    const selectedItemsSummary = [
      riceOptions.find(o => o.id === selectedRice)?.name,
      meatOptions.find(o => o.id === selectedMeat)?.name,
      poultryOptions.find(o => o.id === selectedPoultry)?.name,
      seafoodOptions.find(o => o.id === selectedSeafood)?.name,
      veggieOptions.find(o => o.id === selectedVeggie)?.name,
      sambalOptions.find(o => o.id === selectedSambal)?.name,
      dessertOptions.find(o => o.id === selectedDessert)?.name,
    ].join(', ');

    const customDish: DishItem = {
      id: `custom-pkg-${Date.now()}`,
      name: packageName,
      category: 'prasmanan',
      categoryName: 'Paket Kustomisasi Luhur',
      pricePerPax: finalPricePerPax,
      minPax: 35,
      description: `Rangkaian jamuan kustom 7 pilar hidangan kehormatan yang diracik khusus sesuai selera tuan rumah.`,
      ingredients: selectedItemsSummary,
      imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
      halalCertified: true,
      spiceLevel: 'Sedang',
      paxTier: paxCount > 100 ? 'Porsi 100-500+ Pax' : 'Porsi 50-100 Pax',
      dietaryTags: ['Halal MUI 100%', 'Bespoke Curated', 'Kustom Tuan Rumah'],
      servingStyle: 'Prasmanan Meja',
      isFeatured: true,
      badge: 'Bespoke Curated'
    };

    onAddCustomPackageToCart(customDish, paxCount);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF2EC] text-[#3F704D] text-xs font-bold border border-[#3F704D]/20">
          <Sparkles className="w-3.5 h-3.5 text-[#C29B38]" />
          <span>Bespoke Aristocratic Banquet Builder</span>
        </div>
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#1F2421]">
          Kustomisasi 7 Pilar Hidangan Jamuan Resepsi Anda
        </h2>
        <p className="text-sm text-[#6B7A6F]">
          Padukan sajian nasi wangi, olahan daging sapi marapi, unggas keraton, boga bahari segar, dan kudapan manis 
          sesuai selera keluarga dan tema pesta Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 7 Pillars Selection List */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Custom Package Name & Pax Input */}
          <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-[#1F2421] uppercase tracking-wider">
                  Nama Paket Jamuan Khusus
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full mt-1 p-2 rounded bg-[#F3EFE6] text-xs font-serif font-bold text-[#1F2421] border border-transparent focus:border-[#3F704D] focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#1F2421] uppercase tracking-wider">
                  Jumlah Porsi Tamu: <span className="text-[#3F704D] font-bold font-sans">{paxCount} Pax</span>
                </label>
                <input
                  type="range"
                  min={35}
                  max={600}
                  step={25}
                  value={paxCount}
                  onChange={(e) => setPaxCount(Number(e.target.value))}
                  className="w-full mt-2 accent-[#3F704D] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-[#6B7A6F] font-semibold">
                  <span>Min 35 Pax</span>
                  <span>150 Pax</span>
                  <span>300 Pax</span>
                  <span>600+ Pax</span>
                </div>
              </div>
            </div>
          </div>

          {/* 1. Nasi Pokok */}
          <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#3F704D]/10 pb-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3F704D] text-white flex items-center justify-center text-xs font-sans">1</span>
                Pilar 1: Fondasi Nasi Wangi Keraton
              </h3>
              <span className="text-xs text-[#3F704D] font-semibold">Pilih 1 Jenis</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {riceOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedRice(opt.id)}
                  className={`p-3 rounded-lg text-left border transition-all flex flex-col justify-between ${
                    selectedRice === opt.id
                      ? 'border-[#3F704D] bg-[#EAF2EC] shadow-xs'
                      : 'border-[#F3EFE6] bg-[#FFFFFF] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#1F2421]">{opt.name}</span>
                      {selectedRice === opt.id && <Check className="w-3.5 h-3.5 text-[#3F704D]" />}
                    </div>
                    <p className="text-[11px] text-[#6B7A6F] mt-1 leading-snug">{opt.desc}</p>
                  </div>
                  {opt.priceDelta > 0 && (
                    <span className="text-[10px] text-[#3F704D] font-bold mt-2">
                      + {formatRupiah(opt.priceDelta)} /pax
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Daging Sapi / Kambing */}
          <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#3F704D]/10 pb-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3F704D] text-white flex items-center justify-center text-xs font-sans">2</span>
                Pilar 2: Olahan Daging Sapi / Kambing Marapi
              </h3>
              <span className="text-xs text-[#3F704D] font-semibold">Pilih 1 Jenis</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {meatOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedMeat(opt.id)}
                  className={`p-3 rounded-lg text-left border transition-all flex flex-col justify-between ${
                    selectedMeat === opt.id
                      ? 'border-[#3F704D] bg-[#EAF2EC] shadow-xs'
                      : 'border-[#F3EFE6] bg-[#FFFFFF] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#1F2421]">{opt.name}</span>
                      {selectedMeat === opt.id && <Check className="w-3.5 h-3.5 text-[#3F704D]" />}
                    </div>
                    <p className="text-[11px] text-[#6B7A6F] mt-1 leading-snug">{opt.desc}</p>
                  </div>
                  {opt.priceDelta > 0 && (
                    <span className="text-[10px] text-[#3F704D] font-bold mt-2">
                      + {formatRupiah(opt.priceDelta)} /pax
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Ayam & Unggas Keraton */}
          <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#3F704D]/10 pb-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3F704D] text-white flex items-center justify-center text-xs font-sans">3</span>
                Pilar 3: Olahan Unggas & Bebek Keraton
              </h3>
              <span className="text-xs text-[#3F704D] font-semibold">Pilih 1 Jenis</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {poultryOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedPoultry(opt.id)}
                  className={`p-3 rounded-lg text-left border transition-all flex flex-col justify-between ${
                    selectedPoultry === opt.id
                      ? 'border-[#3F704D] bg-[#EAF2EC] shadow-xs'
                      : 'border-[#F3EFE6] bg-[#FFFFFF] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#1F2421]">{opt.name}</span>
                      {selectedPoultry === opt.id && <Check className="w-3.5 h-3.5 text-[#3F704D]" />}
                    </div>
                    <p className="text-[11px] text-[#6B7A6F] mt-1 leading-snug">{opt.desc}</p>
                  </div>
                  {opt.priceDelta > 0 && (
                    <span className="text-[10px] text-[#3F704D] font-bold mt-2">
                      + {formatRupiah(opt.priceDelta)} /pax
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Boga Bahari / Ikan & Seafood */}
          <div className="p-5 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#3F704D]/10 pb-2">
              <h3 className="font-serif font-bold text-sm sm:text-base text-[#1F2421] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#3F704D] text-white flex items-center justify-center text-xs font-sans">4</span>
                Pilar 4: Olahan Boga Bahari Pesisir
              </h3>
              <span className="text-xs text-[#3F704D] font-semibold">Pilih 1 Jenis</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {seafoodOptions.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelectedSeafood(opt.id)}
                  className={`p-3 rounded-lg text-left border transition-all flex flex-col justify-between ${
                    selectedSeafood === opt.id
                      ? 'border-[#3F704D] bg-[#EAF2EC] shadow-xs'
                      : 'border-[#F3EFE6] bg-[#FFFFFF] hover:bg-[#FDFBF7]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-xs text-[#1F2421]">{opt.name}</span>
                      {selectedSeafood === opt.id && <Check className="w-3.5 h-3.5 text-[#3F704D]" />}
                    </div>
                    <p className="text-[11px] text-[#6B7A6F] mt-1 leading-snug">{opt.desc}</p>
                  </div>
                  {opt.priceDelta > 0 && (
                    <span className="text-[10px] text-[#3F704D] font-bold mt-2">
                      + {formatRupiah(opt.priceDelta)} /pax
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* 5, 6, 7. Sayur, Sambal & Penutup in grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sayuran */}
            <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-2.5">
              <h4 className="font-serif font-bold text-xs text-[#1F2421] uppercase tracking-wider">
                5. Sayuran Luhur
              </h4>
              <div className="space-y-1.5">
                {veggieOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedVeggie(opt.id)}
                    className={`w-full p-2 rounded text-left text-xs transition-colors flex items-center justify-between ${
                      selectedVeggie === opt.id ? 'bg-[#3F704D] text-white font-semibold' : 'bg-[#F3EFE6] text-[#1F2421] hover:bg-[#e5e9e4]'
                    }`}
                  >
                    <span className="truncate">{opt.name}</span>
                    {selectedVeggie === opt.id && <Check className="w-3 h-3 shrink-0 ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Sambal */}
            <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-2.5">
              <h4 className="font-serif font-bold text-xs text-[#1F2421] uppercase tracking-wider">
                6. Sambal Khas
              </h4>
              <div className="space-y-1.5">
                {sambalOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedSambal(opt.id)}
                    className={`w-full p-2 rounded text-left text-xs transition-colors flex items-center justify-between ${
                      selectedSambal === opt.id ? 'bg-[#3F704D] text-white font-semibold' : 'bg-[#F3EFE6] text-[#1F2421] hover:bg-[#e5e9e4]'
                    }`}
                  >
                    <span className="truncate">{opt.name}</span>
                    {selectedSambal === opt.id && <Check className="w-3 h-3 shrink-0 ml-1" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Pencuci Mulut / Dessert */}
            <div className="p-4 rounded-lg bg-[#FFFFFF] border border-[#3F704D]/15 shadow-sm space-y-2.5">
              <h4 className="font-serif font-bold text-xs text-[#1F2421] uppercase tracking-wider">
                7. Minuman & Kudapan
              </h4>
              <div className="space-y-1.5">
                {dessertOptions.map(opt => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setSelectedDessert(opt.id)}
                    className={`w-full p-2 rounded text-left text-xs transition-colors flex items-center justify-between ${
                      selectedDessert === opt.id ? 'bg-[#3F704D] text-white font-semibold' : 'bg-[#F3EFE6] text-[#1F2421] hover:bg-[#e5e9e4]'
                    }`}
                  >
                    <span className="truncate">{opt.name}</span>
                    {selectedDessert === opt.id && <Check className="w-3 h-3 shrink-0 ml-1" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right: Live Sticky Summary Card */}
        <div className="lg:col-span-4 sticky top-28 space-y-4">
          <div className="bg-[#FFFFFF] rounded-xl elevation-2 border border-[#3F704D]/20 p-5 space-y-4">
            
            <div className="border-b border-[#3F704D]/15 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C29B38] bg-[#F7F2E7] px-2 py-0.5 rounded">
                Komposisi Terpilih
              </span>
              <h3 className="font-serif text-lg font-bold text-[#1F2421] mt-1">
                {packageName}
              </h3>
              <p className="text-xs text-[#6B7A6F]">
                Jamuan Prasmanan 7 Macam Hidangan Luhur
              </p>
            </div>

            {/* List of 7 picked items */}
            <div className="space-y-2 text-xs">
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Nasi:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {riceOptions.find(o => o.id === selectedRice)?.name}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Daging:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {meatOptions.find(o => o.id === selectedMeat)?.name}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Unggas:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {poultryOptions.find(o => o.id === selectedPoultry)?.name}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Boga Bahari:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {seafoodOptions.find(o => o.id === selectedSeafood)?.name}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Sayuran:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {veggieOptions.find(o => o.id === selectedVeggie)?.name}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Sambal:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {sambalOptions.find(o => o.id === selectedSambal)?.name}
                </span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#6B7A6F]">Pencuci Mulut:</span>
                <span className="font-semibold text-right text-[#1F2421]">
                  {dessertOptions.find(o => o.id === selectedDessert)?.name}
                </span>
              </div>
            </div>

            {/* Live Pricing Calculation */}
            <div className="p-3.5 rounded-lg bg-[#FDFBF7] border border-[#3F704D]/15 space-y-1.5 font-sans">
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7A6F]">Investasi Per Pax:</span>
                <span className="font-bold text-[#1F2421]">{formatRupiah(finalPricePerPax)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-[#6B7A6F]">Jumlah Tamu:</span>
                <span className="font-bold text-[#3F704D]">{paxCount} Pax</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-[#3F704D]/10 pt-2 text-[#1F2421]">
                <span>Total Investasi Menu:</span>
                <span className="text-[#D9532F]">{formatRupiah(totalPackageInvestment)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full py-3 px-4 rounded bg-[#3F704D] text-[#FFFFFF] text-xs font-semibold hover:bg-[#265737] shadow-sm flex items-center justify-center gap-2 active:scale-[0.99] transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Simpan Paket ke Rangkaian Jamuan</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  handleAddToCart();
                  onProceedToBooking();
                }}
                className="w-full py-2.5 px-4 rounded border border-[#3F704D] text-[#3F704D] text-xs font-semibold hover:bg-[#3F704D]/5 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Langsung Jadwalkan Tanggal Acara</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="text-[11px] text-[#6B7A6F] flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-[#3F704D] shrink-0" />
              <span>Termasuk pemanas roll-top kuningan & set piring keramik.</span>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
