'use client';

import React, { useState, useRef } from 'react';
import { 
  X, Camera, Link2, Upload, Sparkles, ArrowRight, 
  ExternalLink, CheckCircle2, Store, Eye, Image as ImageIcon, AlertCircle, Loader2
} from 'lucide-react';

interface MultimodalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (params: {
    searchType: 'image' | 'url';
    imageData?: string;
    imageName?: string;
    productUrl?: string;
    userPrompt?: string;
  }) => void;
  isSearching: boolean;
}

const SAMPLE_IMAGES = [
  {
    title: "Apple iPhone 16 Pro (Natural Titanium)",
    brand: "Apple",
    category: "Smartphones",
    filename: "iphone_16_pro_natural_titanium.jpg",
    imageUrl: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&q=80",
    badge: "A18 Pro"
  },
  {
    title: "Samsung Galaxy S24 Ultra (Titanium Black)",
    brand: "Samsung",
    category: "Smartphones",
    filename: "samsung_galaxy_s24_ultra.jpg",
    imageUrl: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&q=80",
    badge: "200MP Zoom"
  },
  {
    title: "OnePlus Nord CE 4 5G (Dark Chrome)",
    brand: "OnePlus",
    category: "Smartphones",
    filename: "oneplus_nord_ce_4.jpg",
    imageUrl: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&q=80",
    badge: "100W Charge"
  },
  {
    title: "Apple MacBook Air 13.6\" M3 Chip",
    brand: "Apple",
    category: "Laptops",
    filename: "macbook_air_m3_space_grey.jpg",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80",
    badge: "Liquid Retina"
  },
  {
    title: "Acer Nitro V Gaming & AI Laptop",
    brand: "Acer",
    category: "Laptops",
    filename: "acer_nitro_v_rtx4050.jpg",
    imageUrl: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&q=80",
    badge: "RTX 4050"
  },
  {
    title: "Sony WH-1000XM5 Wireless Headphones",
    brand: "Sony",
    category: "Audio",
    filename: "sony_wh1000xm5_black.jpg",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&q=80",
    badge: "Flagship ANC"
  },
  {
    title: "Apple Watch Series 9 GPS 45mm",
    brand: "Apple",
    category: "Smartwatches",
    filename: "apple_watch_series_9.jpg",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80",
    badge: "Double Tap"
  },
  {
    title: "Adidas Supernova Solution 3 M Running Shoes",
    brand: "Adidas",
    category: "Running Shoes",
    filename: "adidas_supernova_solution_3.jpg",
    imageUrl: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=400&q=80",
    badge: "Dreamstrike+"
  },
  {
    title: "Puma Velocity Nitro 2 Road Running",
    brand: "Puma",
    category: "Running Shoes",
    filename: "puma_velocity_nitro_2.jpg",
    imageUrl: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&q=80",
    badge: "Nitrogen Foam"
  },
  {
    title: "Nike Air Zoom Pegasus 40",
    brand: "Nike",
    category: "Running Shoes",
    filename: "nike_pegasus_40_blue.jpg",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    badge: "React Cushion"
  },
  {
    title: "ASICS GEL-1130 Casuals / Retro Runners",
    brand: "ASICS",
    category: "Running Shoes",
    filename: "asics_gel_1130_unisex.jpg",
    imageUrl: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&q=80",
    badge: "Retro GEL"
  }
];

const SAMPLE_URLS = [
  {
    store: "Flipkart",
    title: "ASICS GEL-1130 Casuals For Unisex (White / Pure Silver / Black)",
    url: "https://www.flipkart.com/asics-gel-1130-casuals-unisex/p/itmd9fda833cb404",
    tag: "₹5,999 • 33% Off"
  },
  {
    store: "Flipkart",
    title: "Adidas Supernova Solution 3 M Running Shoes For Men",
    url: "https://www.flipkart.com/adidas-supernova-solution-3-m-running-shoes-men/p/itm5606d2c499c85",
    tag: "₹5,999 • 50% Off"
  },
  {
    store: "Flipkart",
    title: "ASICS GEL-CUMULUS 25 Running Shoes For Men (Illusion Blue/Glow Yellow)",
    url: "https://www.flipkart.com/asics-gel-cumulus-25-running-shoes-men/p/itm2a08944e0a7f1?pid=SHOGQGBMRMJYGCB8",
    tag: "₹5,279 • 52% Off"
  },
  {
    store: "Flipkart",
    title: "ASICS GEL-JADEITE 3 Running Shoes For Men",
    url: "https://www.flipkart.com/asics-gel-jadeite-3-running-shoes-men/p/itm8c80b772a64d",
    tag: "GEL Cushioning"
  },
  {
    store: "Flipkart",
    title: "Nike Air Zoom Pegasus 40 (Blue/White)",
    url: "https://www.flipkart.com/nike-air-zoom-pegasus-40-running-shoes/p/itm28491829",
    tag: "Running Shoes"
  },
  {
    store: "Amazon",
    title: "Puma Velocity Nitro 2 Road Running",
    url: "https://www.amazon.in/Puma-Velocity-Nitro-Running-Shoe/dp/B09XYZ1234",
    tag: "High Cushion"
  },
  {
    store: "Nike Store",
    title: "Nike Downshifter 12 Road Shoes",
    url: "https://www.nike.com/in/t/downshifter-12-road-running-shoes-4ZqK90",
    tag: "Daily Runner"
  },
  {
    store: "Croma",
    title: "Acer Nitro V Intel Core i5 13th Gen RTX 4050",
    url: "https://www.croma.com/acer-nitro-v-gaming-laptop-13th-gen/p/300123",
    tag: "Gaming Laptop"
  },
  {
    store: "Amazon",
    title: "Sony WH-1000XM5 Wireless ANC Headphones",
    url: "https://www.amazon.in/Sony-WH-1000XM5-Cancelling-Headphones/dp/B09XS7JWHH",
    tag: "ANC Audio"
  }
];

export const MultimodalSearchModal: React.FC<MultimodalSearchModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isSearching
}) => {
  const [activeTab, setActiveTab] = useState<'image' | 'url'>('image');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string>('');
  const [detectedModelName, setDetectedModelName] = useState<string>('');
  const [productUrl, setProductUrl] = useState<string>('');
  const [userPrompt, setUserPrompt] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Phones' | 'Laptops' | 'Audio' | 'Watches' | 'Shoes'>('All');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const CATEGORY_CHIPS = {
    Phones: [
      "Apple iPhone 16 Pro",
      "Samsung Galaxy S24 Ultra",
      "OnePlus Nord CE 4 5G",
      "Google Pixel 8 5G",
      "Samsung Galaxy A35 5G"
    ],
    Laptops: [
      "Acer Nitro V Gaming",
      "Lenovo LOQ 15 Gaming",
      "Apple MacBook Air M3",
      "ASUS TUF Gaming A15",
      "HP Victus 16"
    ],
    Audio: [
      "Sony WH-1000XM5",
      "Apple AirPods Pro 2",
      "Anker Soundcore Q30",
      "boAt Nirvana Ion",
      "Realme Buds Air 6 Pro"
    ],
    Watches: [
      "Apple Watch Series 9",
      "Samsung Galaxy Watch 6",
      "Noise ColorFit Ultra 3"
    ],
    Shoes: [
      "Adidas Supernova Solution 3",
      "Nike Air Zoom Pegasus 40",
      "Puma Velocity Nitro 2",
      "ASICS GEL-CUMULUS 25",
      "Campus Dragon Runner"
    ]
  };

  const getVisibleChips = () => {
    if (categoryFilter === 'All') {
      return [
        "Apple iPhone 16 Pro",
        "Samsung Galaxy S24 Ultra",
        "Apple MacBook Air M3",
        "Acer Nitro V Gaming",
        "Sony WH-1000XM5",
        "Apple Watch Series 9",
        "Adidas Supernova Solution 3"
      ];
    }
    return CATEGORY_CHIPS[categoryFilter] || [];
  };

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      setDetectedModelName('');
      setUserPrompt('');
      const fnLower = file.name.toLowerCase();

      // Auto-switch category filter based on filename
      if (fnLower.includes('iphone') || fnLower.includes('samsung') || fnLower.includes('galaxy') || fnLower.includes('pixel') || fnLower.includes('oneplus') || fnLower.includes('phone') || fnLower.includes('mobile')) {
        setCategoryFilter('Phones');
      } else if (fnLower.includes('laptop') || fnLower.includes('macbook') || fnLower.includes('nitro') || fnLower.includes('loq') || fnLower.includes('tuf') || fnLower.includes('victus')) {
        setCategoryFilter('Laptops');
      } else if (fnLower.includes('headphone') || fnLower.includes('airpods') || fnLower.includes('sony') || fnLower.includes('soundcore') || fnLower.includes('boat') || fnLower.includes('buds') || fnLower.includes('tws')) {
        setCategoryFilter('Audio');
      } else if (fnLower.includes('watch') || fnLower.includes('smartwatch') || fnLower.includes('colorfit') || fnLower.includes('band')) {
        setCategoryFilter('Watches');
      } else if (
        fnLower.includes('shoe') || fnLower.includes('sneaker') || fnLower.includes('running') || 
        fnLower.includes('pegasus') || fnLower.includes('nitro') || fnLower.includes('supernova') || 
        fnLower.includes('asics') || fnLower.includes('gel') || fnLower.includes('1130') || 
        fnLower.includes('cumulus') || fnLower.includes('jadeite') || fnLower.includes('casual') ||
        fnLower.includes('shog')
      ) {
        setCategoryFilter('Shoes');
      }

      // Auto-extract model name from filename if not generic screenshot or random IDs
      const rawName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[-_]/g, " ")
        .replace(/\b(flipkart|amazon|img|image|screenshot|photo|download|pic|dsc|camera|shog[a-z0-9]*)\b/gi, "")
        .trim();
      if (rawName && rawName.length > 2 && !/^\d+$/.test(rawName) && !/^(screenshot|image|img|photo|download|pic)$/i.test(rawName)) {
        setDetectedModelName(rawName.charAt(0).toUpperCase() + rawName.slice(1));
      }
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const base64 = uploadEvent.target?.result as string;
        setSelectedImage(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectSampleImage = (sample: typeof SAMPLE_IMAGES[0]) => {
    setSelectedImage(sample.imageUrl);
    setImageFileName(sample.filename);
    setDetectedModelName(sample.title);
    setUserPrompt(`Find best price and audit deals for ${sample.title}`);
  };

  const handleSelectSampleUrl = (sample: typeof SAMPLE_URLS[0]) => {
    setProductUrl(sample.url);
    setUserPrompt(`Check if any store beats ${sample.store} for this item.`);
  };

  const isGenericFilename = (name: string) => {
    const n = (name || '').toLowerCase();
    return !n || /^(screenshot|image|img|photo|download|pic|dsc|camera|shog)/i.test(n) || /^\d+$/.test(n);
  };

  const handleRunSearch = () => {
    if (activeTab === 'image') {
      if (!selectedImage && !imageFileName && !detectedModelName) return;
      const cleanImageName = detectedModelName || (!isGenericFilename(imageFileName) ? imageFileName : undefined);
      onSubmit({
        searchType: 'image',
        imageData: selectedImage || undefined,
        imageName: cleanImageName,
        userPrompt: userPrompt.trim() || undefined
      });
    } else {
      if (!productUrl.trim()) return;
      onSubmit({
        searchType: 'url',
        productUrl: productUrl.trim(),
        userPrompt: userPrompt.trim() || undefined
      });
    }
  };

  const detectStoreFromUrl = (url: string) => {
    const u = url.toLowerCase();
    if (u.includes('flipkart')) return { name: 'Flipkart', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' };
    if (u.includes('amazon')) return { name: 'Amazon', color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' };
    if (u.includes('nike')) return { name: 'Nike Official', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30' };
    if (u.includes('croma')) return { name: 'Croma', color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' };
    if (u.includes('puma')) return { name: 'Puma Official', color: 'bg-red-500/20 text-red-400 border-red-500/30' };
    if (u.includes('myntra')) return { name: 'Myntra', color: 'bg-pink-500/20 text-pink-400 border-pink-500/30' };
    return { name: 'Universal Retailer', color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' };
  };

  const detectedStore = productUrl ? detectStoreFromUrl(productUrl) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Multimodal Agentic Search
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Vision + URL
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Upload a product photo or paste any store link to audit prices across 6 verified retailers.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-800 bg-slate-950/30 px-5 pt-3 gap-3">
          <button
            type="button"
            onClick={() => setActiveTab('image')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'image'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Visual Image Search</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex items-center gap-2 pb-3 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 cursor-pointer ${
              activeTab === 'url'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Link2 className="w-4 h-4" />
            <span>Paste Store Link (URL)</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'image' ? (
            <div className="space-y-4">
              {/* File Upload Drop Area */}
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                  selectedImage 
                    ? 'border-indigo-500/60 bg-indigo-950/20' 
                    : 'border-slate-700 hover:border-indigo-500/60 bg-slate-950/40 hover:bg-slate-950/60'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />

                {selectedImage ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
                    <div className="relative w-28 h-28 rounded-xl overflow-hidden border border-indigo-500/40 shadow-lg bg-black">
                      <img 
                        src={selectedImage} 
                        alt="Product preview" 
                        className="w-full h-full object-cover" 
                      />
                      <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/80 text-[10px] text-indigo-300 font-mono">
                        Ready
                      </span>
                    </div>
                    <div className="text-left space-y-1">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Image loaded successfully</span>
                      </div>
                      <p className="text-sm font-medium text-white truncate max-w-xs">
                        {imageFileName || "Uploaded Product Photo"}
                      </p>
                      <p className="text-xs text-slate-400">
                        Click again to change image or choose a sample below.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                      <Upload className="w-6 h-6 animate-bounce" />
                    </div>
                    <p className="text-sm font-bold text-white">
                      Drop product photo here, or <span className="text-indigo-400 underline">browse device</span>
                    </p>
                    <p className="text-xs text-slate-400">
                      Supports JPG, PNG, WEBP (Shoes, Laptops, Gadgets, Clothes)
                    </p>
                  </div>
                )}
              </div>

              {/* Editable Detected Product Name / Model */}
              <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Exact Product / Model Name:</span>
                  </label>
                  <span className="text-[10px] text-indigo-400 font-medium">Auto-matched from file / Vision AI</span>
                </div>
                <input
                  type="text"
                  value={detectedModelName}
                  onChange={(e) => setDetectedModelName(e.target.value)}
                  placeholder="e.g. iPhone 16 Pro, Samsung S24 Ultra, MacBook Air M3, Acer Nitro V, Sony XM5..."
                  className="w-full bg-slate-900 border border-slate-700/80 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
                />

                {/* Category Pills & Quick Match */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px]">
                    <span className="text-slate-400 font-medium shrink-0">Category:</span>
                    {(['All', 'Phones', 'Laptops', 'Audio', 'Watches', 'Shoes'] as const).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setCategoryFilter(cat)}
                        className={`px-2 py-0.5 rounded-full transition-colors font-medium shrink-0 cursor-pointer ${
                          categoryFilter === cat
                            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                            : 'bg-slate-800/60 hover:bg-slate-700 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {cat === 'Phones' ? '📱 Phones' : cat === 'Laptops' ? '💻 Laptops' : cat === 'Audio' ? '🎧 Audio' : cat === 'Watches' ? '⌚ Watches' : cat === 'Shoes' ? '👟 Shoes' : 'All'}
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] text-slate-400">Quick Match:</span>
                    {getVisibleChips().map((chip, cIdx) => (
                      <button
                        key={cIdx}
                        type="button"
                        onClick={() => setDetectedModelName(chip)}
                        className={`text-[10px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                          detectedModelName === chip
                            ? 'bg-indigo-600/30 text-indigo-300 border-indigo-500/50'
                            : 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                        }`}
                      >
                        {chip}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sample Test Images */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Or test with sample product photos:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SAMPLE_IMAGES.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSampleImage(sample)}
                      className={`flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                        imageFileName === sample.filename
                          ? 'border-indigo-500 bg-indigo-950/30'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <img 
                        src={sample.imageUrl} 
                        alt={sample.title} 
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-slate-200 block truncate">
                          {sample.title}
                        </span>
                        <span className="text-[10px] text-slate-400 block truncate">
                          {sample.brand} • {sample.badge}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Product Store URL Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Paste Product Link from Any Store:
                </label>
                <div className="relative flex items-center">
                  <Link2 className="w-5 h-5 text-indigo-400 absolute left-3 pointer-events-none" />
                  <input
                    type="url"
                    value={productUrl}
                    onChange={(e) => setProductUrl(e.target.value)}
                    placeholder="https://www.flipkart.com/nike-air-zoom-pegasus... or amazon.in/..."
                    className="w-full bg-slate-950/80 border border-slate-700 focus:border-indigo-500 rounded-xl pl-10 pr-24 py-3 text-sm text-white placeholder-slate-500 focus:outline-none font-mono"
                  />
                  {detectedStore && (
                    <span className={`absolute right-2.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${detectedStore.color}`}>
                      {detectedStore.name}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                  <Store className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Supports Flipkart, Amazon India, Nike Official, Croma, Reliance Digital, Myntra, etc.</span>
                </p>
              </div>

              {/* Sample Store URLs */}
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Or test with sample store links:
                </label>
                <div className="space-y-1.5">
                  {SAMPLE_URLS.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectSampleUrl(sample)}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        productUrl === sample.url
                          ? 'border-indigo-500 bg-indigo-950/30'
                          : 'border-slate-800 bg-slate-950/50 hover:border-slate-700 hover:bg-slate-800/60'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-indigo-300 border border-slate-700">
                          {sample.store}
                        </span>
                        <span className="text-xs font-semibold text-slate-200 truncate">
                          {sample.title}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">
                        {sample.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Optional Prompt Field */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Specific Instructions for CompareX Agent (Optional):
            </label>
            <input
              type="text"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              placeholder="e.g. 'Audit if any seller has it under ₹4,500 with instant delivery', 'Find best daily runner'"
              className="w-full bg-slate-950/60 border border-slate-800 focus:border-indigo-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          {/* Agent Capability Notice */}
          <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-[11px] text-slate-300 flex items-start gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-indigo-300 font-semibold">Autonomous Multimodal Pipeline:</strong> Vision AI extracts model silhouettes and logos; our Arbitrage Agent checks 6 verified stores to calculate effective prices with bank discounts.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 sm:px-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={isSearching || (activeTab === 'image' ? (!selectedImage && !imageFileName) : !productUrl.trim())}
            onClick={handleRunSearch}
            className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-600/30 transition-all disabled:opacity-50 cursor-pointer"
          >
            {isSearching ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Stores & Vision AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Analyze & Compare with Agentic AI</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
