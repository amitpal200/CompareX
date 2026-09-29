import { Product, TravelOption, HotelOption, PriceAlert, UserProfile } from './types';

export const DEFAULT_USER_PROFILE: UserProfile = {
  name: "Amit Sharma",
  email: "amit.sharma@example.com",
  currency: "INR",
  homeAirport: "DEL (Delhi - Indira Gandhi Intl)",
  preferredStores: ["Amazon", "Flipkart", "Croma", "MakeMyTrip"],
  emailAlerts: true,
  budgetCapNotification: true
};

export const INITIAL_PRODUCTS: Product[] = [
  {
    canonical_id: "laptop-acer-nitro-v",
    title: "Acer Nitro V Gaming Laptop (AMD Ryzen 7 7735HS, RTX 4050 6GB, 16GB DDR5, 512GB SSD, 144Hz)",
    brand: "Acer",
    category: "shopping",
    subcategory: "Gaming Laptops",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "AMD Ryzen 7 7735HS (8 Cores, up to 4.75 GHz)",
      "Graphics": "NVIDIA GeForce RTX 4050 (6GB GDDR6, 75W TGP)",
      "RAM": "16 GB DDR5 4800MHz (Upgradeable to 32GB)",
      "Storage": "512 GB PCIe Gen4 NVMe SSD",
      "Display": "15.6\" FHD 144Hz IPS ComfyView",
      "Weight": "2.1 kg",
      "Battery": "57 Wh Li-ion with 135W Adapter",
      "OS": "Windows 11 Home"
    },
    rating: 4.5,
    review_count: 890,
    best_price: 57990,
    badge: "Best Value",
    score: 9.5,
    score_reasons: [
      "Cheapest RTX 4050 option with 16GB DDR5 memory in India",
      "Superior multi-core performance for streaming & content creation",
      "Meets all user constraints under ₹60,000 threshold"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 57990,
        original_price: 74999,
        currency: "INR",
        shipping: "Free One-Day Prime Delivery",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.5,
        review_count: 890,
        fetched_at: "2 mins ago"
      },
      {
        provider: "Flipkart",
        price: 58490,
        original_price: 74999,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.4,
        review_count: 420,
        fetched_at: "5 mins ago"
      },
      {
        provider: "Croma",
        price: 59990,
        original_price: 76999,
        currency: "INR",
        shipping: "Free Store Pickup Today",
        availability: "Limited Stock (3 units left)",
        source_url: "https://www.croma.com",
        rating: 4.6,
        review_count: 115,
        fetched_at: "15 mins ago"
      }
    ],
    price_history: [
      { date: "Jun 10", price: 64990 },
      { date: "Jul 01", price: 62990 },
      { date: "Jul 20", price: 61490 },
      { date: "Aug 05", price: 59990 },
      { date: "Aug 22", price: 58990 },
      { date: "Current", price: 57990 }
    ],
    sentiment: {
      positivePercentage: 88,
      neutralPercentage: 8,
      negativePercentage: 4,
      totalReviewsAnalyzed: 890,
      topPros: [
        "Flawless 1080p high-framerate gaming with DLSS 3",
        "Very fast DDR5 boot and load times",
        "Dual exhaust fans maintain temperatures under 74°C"
      ],
      topCons: [
        "Screen color gamut is 62% sRGB (not meant for color grading)",
        "Webcam quality is basic 720p"
      ],
      buyerVerdict: "Exceptional bang-for-the-buck machine. Dominates any laptop in the sub-₹60,000 gaming category."
    }
  },
  {
    canonical_id: "laptop-lenovo-loq-15",
    title: "Lenovo LOQ 15 Gaming Laptop (12th Gen Intel Core i5-12450HX, RTX 3050 6GB, 16GB RAM, 512GB SSD)",
    brand: "Lenovo",
    category: "shopping",
    subcategory: "Gaming Laptops",
    image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "Intel Core i5-12450HX (8 Cores, up to 4.4 GHz)",
      "Graphics": "NVIDIA GeForce RTX 3050 (6GB GDDR6, 95W TGP)",
      "RAM": "16 GB DDR5 4800MHz",
      "Storage": "512 GB PCIe 4.0 NVMe SSD",
      "Display": "15.6\" FHD 144Hz 100% sRGB, 300 nits, G-SYNC",
      "Weight": "2.4 kg",
      "Battery": "60 Wh with Super Rapid Charge Pro",
      "OS": "Windows 11 Home + MS Office"
    },
    rating: 4.6,
    review_count: 1450,
    best_price: 56990,
    badge: "Best Overall",
    score: 9.3,
    score_reasons: [
      "Class-leading 100% sRGB screen (best color fidelity for video editing & gaming)",
      "Higher 95W TGP graphics yields solid stability under load",
      "Military-grade MIL-STD-810H chassis reliability"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Lenovo Store",
        price: 56990,
        original_price: 72990,
        currency: "INR",
        shipping: "Free Express Shipping with 3Y Warranty bundle",
        availability: "In Stock",
        source_url: "https://www.lenovo.com/in",
        rating: 4.7,
        review_count: 320,
        fetched_at: "Just now"
      },
      {
        provider: "Amazon",
        price: 57490,
        original_price: 72990,
        currency: "INR",
        shipping: "Free Prime Delivery",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.5,
        review_count: 1130,
        fetched_at: "4 mins ago"
      }
    ],
    price_history: [
      { date: "Jun 10", price: 63990 },
      { date: "Jul 01", price: 61990 },
      { date: "Jul 20", price: 59990 },
      { date: "Aug 05", price: 58490 },
      { date: "Aug 22", price: 57490 },
      { date: "Current", price: 56990 }
    ],
    sentiment: {
      positivePercentage: 91,
      neutralPercentage: 6,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1450,
      topPros: [
        "100% sRGB screen looks visibly richer and vibrant",
        "Super Rapid Charge gets 80% battery in 45 minutes",
        "Comfortable ergonomic keyboard travel"
      ],
      topCons: [
        "Heavier brick power adapter (2.4kg total carrying load)",
        "Battery life drops to 2.5 hours when gaming unplugged"
      ],
      buyerVerdict: "The best all-rounder. Recommended if screen color accuracy and build quality are your top priorities."
    }
  },
  {
    canonical_id: "phone-iphone-16-pro",
    title: "Apple iPhone 16 Pro (128 GB) - Natural Titanium, Camera Control, A18 Pro Chip",
    brand: "Apple",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "Apple A18 Pro Chip with 6-core GPU",
      "Display": "6.3\" Super Retina XDR OLED 120Hz ProMotion",
      "Camera": "48MP Fusion + 48MP Ultra-Wide + 12MP 5x Telephoto",
      "Material": "Grade 5 Titanium with Textured Matte Glass",
      "Battery": "Up to 27 hours video playback, MagSafe wireless",
      "OS": "iOS 18 with Apple Intelligence"
    },
    rating: 4.8,
    review_count: 3200,
    best_price: 119900,
    badge: "Best Overall",
    score: 9.7,
    score_reasons: [
      "Industry-leading 4K 120fps Dolby Vision video recording",
      "Tactile Camera Control button for instant focal length & exposure adjustments",
      "Long-term 7-year software updates and top resale value"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 119900,
        original_price: 129900,
        currency: "INR",
        shipping: "Free Prime Same-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.8,
        review_count: 2400,
        fetched_at: "Just now"
      },
      {
        provider: "Apple Store",
        price: 129900,
        original_price: 129900,
        currency: "INR",
        shipping: "Free Official Delivery + Laser Engraving",
        availability: "In Stock",
        source_url: "https://www.apple.com/in",
        rating: 4.9,
        review_count: 800,
        fetched_at: "10 mins ago"
      },
      {
        provider: "Croma",
        price: 122900,
        original_price: 129900,
        currency: "INR",
        shipping: "Store Pickup in 2 Hours",
        availability: "In Stock",
        source_url: "https://www.croma.com",
        rating: 4.7,
        review_count: 310,
        fetched_at: "5 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 129900 },
      { date: "Sale 1", price: 125900 },
      { date: "Sale 2", price: 122900 },
      { date: "Current", price: 119900 }
    ],
    sentiment: {
      positivePercentage: 94,
      neutralPercentage: 4,
      negativePercentage: 2,
      totalReviewsAnalyzed: 3200,
      topPros: [
        "Cinematic video capture is unrivaled by any competitor",
        "Titanium weight reduction makes it comfortable for single-hand use",
        "Battery easily lasts 1.5 days on mixed usage"
      ],
      topCons: [
        "Base storage starts at 128GB for Pro model",
        "Fast charging peaks at 27W"
      ],
      buyerVerdict: "The undisputed camera and performance champion of 2026."
    }
  },
  {
    canonical_id: "phone-oneplus-nord-ce4",
    title: "OnePlus Nord CE 4 5G (Dark Chrome, 128GB, 8GB RAM, 100W SUPERVOOC)",
    brand: "OnePlus",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "Qualcomm Snapdragon 7 Gen 3 (4nm Architecture)",
      "Display": "6.7\" FHD+ 120Hz Fluid AMOLED (Aqua Touch)",
      "Camera": "50MP Sony LYT-600 OIS Primary + 8MP Ultra-Wide",
      "Battery": "5500 mAh with 100W SUPERVOOC (1-100% in 28 mins)",
      "RAM": "8 GB LPDDR4X",
      "Storage": "128 GB UFS 3.1",
      "OS": "OxygenOS 14"
    },
    rating: 4.6,
    review_count: 8920,
    best_price: 22999,
    badge: "Best Overall",
    score: 9.6,
    score_reasons: [
      "Best all-rounder smartphone under ₹25,000 with flagship 100W charging and 5500mAh battery",
      "Fast Snapdragon 7 Gen 3 chipset delivers flawless day-to-day and gaming performance",
      "Aqua Touch technology allows smooth operation even with wet hands"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Flipkart",
        price: 22999,
        original_price: 26999,
        currency: "INR",
        shipping: "Tomorrow by 11:00 AM",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.6,
        review_count: 8920,
        fetched_at: "Just now"
      },
      {
        provider: "Amazon",
        price: 22999,
        original_price: 26999,
        currency: "INR",
        shipping: "Tomorrow Morning (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 12400,
        fetched_at: "Just now"
      },
      {
        provider: "Croma",
        price: 23999,
        original_price: 26999,
        currency: "INR",
        shipping: "Store Pickup Today",
        availability: "In Stock",
        source_url: "https://www.croma.com",
        rating: 4.5,
        review_count: 1540,
        fetched_at: "5 mins ago"
      },
      {
        provider: "Reliance Digital",
        price: 23499,
        original_price: 26999,
        currency: "INR",
        shipping: "Same Day Dispatch",
        availability: "In Stock",
        source_url: "https://www.reliancedigital.in",
        rating: 4.5,
        review_count: 890,
        fetched_at: "8 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 24999 },
      { date: "Last Month", price: 23999 },
      { date: "Current", price: 22999 }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 8920,
      topPros: ["Blazing fast 100W charging fills battery in 28 mins", "Vibrant 120Hz AMOLED display", "Snappy clean OxygenOS"],
      topCons: ["No 3.5mm audio jack", "Plastic side frame"],
      buyerVerdict: "The undisputed top smartphone recommendation under ₹25,000 for battery, speed, and charging."
    }
  },
  {
    canonical_id: "phone-nothing-2a",
    title: "Nothing Phone (2a) 5G (Black, 128GB, 8GB RAM, Dimensity 7200 Pro)",
    brand: "Nothing",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "MediaTek Dimensity 7200 Pro (4nm 2.8GHz)",
      "Display": "6.7\" Flexible AMOLED 120Hz, 1300 nits Peak",
      "Camera": "50MP Primary OIS + 50MP Ultra-Wide (Dual 50MP)",
      "Battery": "5000 mAh with 45W Fast Charging",
      "RAM": "8 GB RAM",
      "Storage": "128 GB",
      "Special Feature": "Customizable Glyph Interface LED Lighting",
      "OS": "Nothing OS 2.5 (Clean Bloatware-Free)"
    },
    rating: 4.5,
    review_count: 6400,
    best_price: 22499,
    badge: "Best Design",
    score: 9.4,
    score_reasons: [
      "Cleanest bloatware-free Nothing OS experience with unique Glyph lighting",
      "Dual 50MP camera setup captures consistent color tone across sensors",
      "Symmetrical ultra-thin bezels provide an immersive flagship screen look"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Flipkart",
        price: 22499,
        original_price: 25999,
        currency: "INR",
        shipping: "Tomorrow by 1:00 PM",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 6400,
        fetched_at: "Just now"
      },
      {
        provider: "Amazon",
        price: 22999,
        original_price: 25999,
        currency: "INR",
        shipping: "2 Days Delivery",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.5,
        review_count: 4200,
        fetched_at: "3 mins ago"
      },
      {
        provider: "Croma",
        price: 23499,
        original_price: 25999,
        currency: "INR",
        shipping: "Store Pickup Available",
        availability: "In Stock",
        source_url: "https://www.croma.com",
        rating: 4.4,
        review_count: 780,
        fetched_at: "10 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 23999 },
      { date: "Current", price: 22499 }
    ],
    sentiment: {
      positivePercentage: 90,
      neutralPercentage: 7,
      negativePercentage: 3,
      totalReviewsAnalyzed: 6400,
      topPros: ["Minimalist bloatware-free Nothing OS", "Distinctive Glyph LED lighting", "Symmetrical bezel display"],
      topCons: ["Charger not bundled in box", "Plastic rear can collect micro-scratches without case"],
      buyerVerdict: "The best looking and cleanest software smartphone in the ₹20,000-₹25,000 category."
    }
  },
  {
    canonical_id: "phone-realme-12-pro-plus",
    title: "Realme 12 Pro+ 5G (Submarine Blue, 256GB, 8GB RAM, 64MP 3X Periscope)",
    brand: "Realme",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "Qualcomm Snapdragon 7s Gen 2 (4nm)",
      "Display": "6.7\" Curved OLED 120Hz, 2160Hz PWM Dimming",
      "Camera": "64MP 3X Periscope OIS + 50MP Sony IMX890 OIS",
      "Battery": "5000 mAh with 67W SUPERVOOC In-Box Charger",
      "RAM": "8 GB RAM",
      "Storage": "256 GB UFS 3.1",
      "OS": "Realme UI 5.0"
    },
    rating: 4.5,
    review_count: 4820,
    best_price: 25499,
    badge: "Best Camera",
    score: 9.5,
    score_reasons: [
      "Only phone under ₹30,000 equipped with a flagship 64MP 3x periscope telephoto camera",
      "Stunning luxury watch-inspired vegan leather craftsmanship",
      "Generous 256GB base storage at an aggressive sub-₹26,000 price point"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Flipkart",
        price: 25499,
        original_price: 31999,
        currency: "INR",
        shipping: "Tomorrow by 3:00 PM",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 4820,
        fetched_at: "Just now"
      },
      {
        provider: "Amazon",
        price: 25999,
        original_price: 31999,
        currency: "INR",
        shipping: "Tomorrow Prime",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.5,
        review_count: 2900,
        fetched_at: "5 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 29999 },
      { date: "Last Month", price: 26999 },
      { date: "Current", price: 25499 }
    ],
    sentiment: {
      positivePercentage: 91,
      neutralPercentage: 6,
      negativePercentage: 3,
      totalReviewsAnalyzed: 4820,
      topPros: ["Sensational 3x periscope zoom portraits", "Premium curved OLED with vegan leather", "Generous 256GB storage"],
      topCons: ["Snapdragon 7s Gen 2 is good but not top gaming tier", "Some pre-installed apps require uninstallation"],
      buyerVerdict: "The undisputed camera zoom champion under ₹30,000."
    }
  },
  {
    canonical_id: "phone-moto-edge-50-fusion",
    title: "Motorola Edge 50 Fusion 5G (Marshmallow Blue, 128GB, 8GB RAM, IP68)",
    brand: "Motorola",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "Qualcomm Snapdragon 7s Gen 2 (4nm)",
      "Display": "6.67\" 144Hz 3D Curved Endless Edge pOLED, 1600 nits",
      "Camera": "50MP Sony LYT-700C OIS + 13MP Ultra-Wide Macro",
      "Battery": "5000 mAh with 68W TurboPower Charger",
      "Water Resistance": "IP68 Underwater Protection (Up to 1.5m)",
      "Weight": "175 g (Ultra Lightweight)",
      "OS": "Hello UI (Clean Near-Stock Android 14)"
    },
    rating: 4.5,
    review_count: 5120,
    best_price: 21499,
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "Cheapest smartphone with genuine IP68 underwater protection under ₹22,000",
      "Super lightweight and slim profile at only 175 grams with 144Hz curved pOLED display",
      "Clean, ad-free Hello UI with Motorola Ready For wireless desktop mode"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Flipkart",
        price: 21499,
        original_price: 25999,
        currency: "INR",
        shipping: "Tomorrow by 2:00 PM",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 5120,
        fetched_at: "Just now"
      },
      {
        provider: "Amazon",
        price: 21999,
        original_price: 25999,
        currency: "INR",
        shipping: "Tomorrow Morning",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.5,
        review_count: 4900,
        fetched_at: "4 mins ago"
      },
      {
        provider: "Reliance Digital",
        price: 21999,
        original_price: 25999,
        currency: "INR",
        shipping: "Express Delivery",
        availability: "In Stock",
        source_url: "https://www.reliancedigital.in",
        rating: 4.4,
        review_count: 1200,
        fetched_at: "10 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 22999 },
      { date: "Current", price: 21499 }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 5120,
      topPros: ["Genuine IP68 underwater rating in budget category", "Incredible 144Hz curved screen", "Featherlight 175g body"],
      topCons: ["Curved screen requires careful handling or tempered glass", "Monophonic speaker haptics are modest"],
      buyerVerdict: "Unbeatable value for money at ₹21,499 with flagship-grade IP68 water resistance."
    }
  },
  {
    canonical_id: "phone-samsung-a35",
    title: "Samsung Galaxy A35 5G (Awesome Navy, 128GB, 8GB RAM, Super AMOLED)",
    brand: "Samsung",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Processor": "Samsung Exynos 1380 (5nm Octa-Core)",
      "Display": "6.6\" Super AMOLED 120Hz with Vision Booster",
      "Camera": "50MP Main OIS + 8MP Ultra-Wide + 5MP Macro",
      "Battery": "5000 mAh with 25W Fast Charging Support",
      "Security": "Samsung Knox Vault with 4 Years OS Updates",
      "Water Resistance": "IP67 Water & Dust Resistance",
      "OS": "One UI 6.1 with Knox Security"
    },
    rating: 4.4,
    review_count: 3900,
    best_price: 24499,
    badge: "Brand Trust",
    score: 9.2,
    score_reasons: [
      "Highest brand reliability and customer trust with 4 major Android OS upgrades",
      "Gorgeous 120Hz Super AMOLED with Gorilla Glass Victus+ front and back",
      "Hardware-isolated Samsung Knox Vault security for sensitive data"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 24499,
        original_price: 30999,
        currency: "INR",
        shipping: "Tomorrow Morning",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.5,
        review_count: 5600,
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 24999,
        original_price: 30999,
        currency: "INR",
        shipping: "Tomorrow",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.4,
        review_count: 3900,
        fetched_at: "5 mins ago"
      },
      {
        provider: "Croma",
        price: 25499,
        original_price: 30999,
        currency: "INR",
        shipping: "In-Store Pickup Today",
        availability: "In Stock",
        source_url: "https://www.croma.com",
        rating: 4.5,
        review_count: 1400,
        fetched_at: "10 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 27999 },
      { date: "Current", price: 24499 }
    ],
    sentiment: {
      positivePercentage: 89,
      neutralPercentage: 7,
      negativePercentage: 4,
      totalReviewsAnalyzed: 3900,
      topPros: ["Superb Super AMOLED display outdoors", "Guaranteed 4 Android OS updates & 5-year security", "Samsung Knox security"],
      topCons: ["Charger not in box", "25W charging is slower than rivals"],
      buyerVerdict: "The best choice for longevity, display quality, and trusted Samsung brand ecosystem."
    }
  },
  {
    canonical_id: "phone-samsung-s25-256",
    title: "Samsung Galaxy S25 5G (Phantom Black, 256GB Storage, 8GB RAM)",
    brand: "Samsung",
    category: "shopping",
    subcategory: "Smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=60",
    specifications: {
      "Processor": "Snapdragon 8 Elite (3nm Galaxy Edition)",
      "Display": "6.2\" Dynamic AMOLED 2X, 120Hz LTPO, 2600 nits",
      "Camera": "50MP Triple OIS System with 3x Telephoto",
      "Battery": "4000 mAh with 25W Fast Charging",
      "Storage": "256 GB UFS 4.0",
      "RAM": "8 GB LPDDR5X",
      "OS": "One UI 7 (7 Years Android OS Updates)"
    },
    rating: 4.8,
    review_count: 4200,
    best_price: 74999,
    badge: "Flagship Pick",
    score: 9.7,
    score_reasons: [
      "Flagship Snapdragon 8 Elite with 7 years of full OS upgrades",
      "Compact ergonomic design with 2600 nits brightest display",
      "Class-leading Galaxy AI software ecosystem"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Flipkart",
        price: 74999,
        original_price: 84999,
        currency: "INR",
        shipping: "Tomorrow by 10:00 AM",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.8,
        review_count: 4200,
        fetched_at: "Just now"
      },
      {
        provider: "Amazon",
        price: 75999,
        original_price: 84999,
        currency: "INR",
        shipping: "Tomorrow Morning (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.7,
        review_count: 3900,
        fetched_at: "Just now"
      }
    ],
    price_history: [
      { date: "Launch", price: 79999 },
      { date: "Current", price: 74999 }
    ],
    sentiment: {
      positivePercentage: 95,
      neutralPercentage: 3,
      negativePercentage: 2,
      totalReviewsAnalyzed: 4200,
      topPros: ["Mind-blowing Snapdragon 8 Elite benchmark performance", "7 full years of Android OS updates", "Generative Galaxy AI"],
      topCons: ["Premium pricing above ₹70,000", "25W charging"],
      buyerVerdict: "The best compact Android flagship with unmatched 7-year software longevity."
    }
  },
  {
    canonical_id: "audio-sony-wh1000xm5",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones (Auto NC Optimizer, 30Hr Battery, LDAC)",
    brand: "Sony",
    category: "shopping",
    subcategory: "Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Noise Cancellation": "Dual Processors (QN1 + V1) with 8 Microphones",
      "Driver": "30mm Precision Engineered Carbon Fiber Dome",
      "Battery Life": "30 Hours (NC ON), 40 Hours (NC OFF) - 3 Min Charge = 3 Hours",
      "Connectivity": "Bluetooth 5.2, Multipoint Connection (2 devices), LDAC Hi-Res",
      "Weight": "250 grams"
    },
    rating: 4.7,
    review_count: 5100,
    best_price: 26990,
    badge: "Best Overall",
    score: 9.6,
    score_reasons: [
      "Gold-standard active noise cancellation blocks office chatter & airplane drone",
      "Featherlight 250g chassis with pressure-relieving soft-fit leather",
      "Crystal-clear AI beamforming mic for remote work and calls"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 26990,
        original_price: 34990,
        currency: "INR",
        shipping: "Free One-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.7,
        review_count: 3600,
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 27490,
        original_price: 34990,
        currency: "INR",
        shipping: "Free Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.6,
        review_count: 1500,
        fetched_at: "10 mins ago"
      }
    ],
    price_history: [
      { date: "May 01", price: 29990 },
      { date: "Jun 15", price: 28490 },
      { date: "Jul 10", price: 27990 },
      { date: "Current", price: 26990 }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 5100,
      topPros: [
        "Unbeatable noise cancellation in flights & busy cafes",
        "Instant seamless switching between MacBook and phone",
        "Rich deep bass without muddying acoustic vocals"
      ],
      topCons: [
        "Earcups do not fold inward like older XM4",
        "Touch controls can occasionally misfire in rain"
      ],
      buyerVerdict: "The best premium wireless travel & productivity headphone money can buy."
    }
  },
  {
    canonical_id: "hp-soundcore-q30",
    title: "Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Wireless Headphones",
    brand: "Anker",
    category: "shopping",
    subcategory: "Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "ANC": "Hybrid Active Noise Cancelling (Transport, Outdoor, Indoor Modes)",
      "Battery": "40 Hours with ANC On / 60 Hours Standard",
      "Codec": "Hi-Res Audio Certified, Custom App EQ",
      "Microphone": "Dual Microphones with Uplink Noise Reduction",
      "Weight": "265 g Ultra-Soft Protein Leather"
    },
    rating: 4.6,
    review_count: 9200,
    best_price: 4899,
    badge: "Best Value",
    score: 9.5,
    score_reasons: [
      "Definitive best ANC headphone under ₹5,000 in India",
      "Massive 40-hour battery life with active noise cancelling",
      "Feature-rich companion mobile app with 22 EQ presets"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 4899,
        original_price: 7999,
        discount_amount: 400,
        currency: "INR",
        shipping: "Free Prime Delivery Tomorrow",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 9200,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 4999,
        original_price: 7999,
        discount_amount: 500,
        currency: "INR",
        shipping: "Tomorrow by 11:00 AM",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.6,
        review_count: 3400,
        store_badge: "Best Offer",
        fetched_at: "5 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 6999 },
      { date: "Last Month", price: 5499 },
      { date: "Current", price: 4899 }
    ],
    sentiment: {
      positivePercentage: 91,
      neutralPercentage: 6,
      negativePercentage: 3,
      totalReviewsAnalyzed: 9200,
      topPros: ["Exceptional noise cancellation for under ₹5,000", "Battery lasts for weeks of daily commuting", "Comfortable memory foam pads"],
      topCons: ["Microphone is average in very windy environments", "App requires initial account setup"],
      buyerVerdict: "The undisputed top recommendation for ANC headphones under ₹5,000."
    }
  },
  {
    canonical_id: "shoe-puma-velocity-nitro",
    title: "Puma Velocity Nitro 2 Lightweight Road Running Shoes (NITRO Foam, PUMAGRIP)",
    brand: "Puma",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Road Running, 5km to 10km Tempo Training",
      Sole: "NITRO Foam Infused Cushioning + PROFOAM LITE Layer",
      Material: "Plush Engineered Breathable Mesh",
      Weight: "257 g (Ultra Lightweight)",
      Drop: "10 mm Heel-to-Toe Drop",
      Color: "Electro Lime / Puma Black",
      Terrain: "Road, Pavement, Treadmill"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3899,
    badge: "Best For You",
    score: 9.6,
    score_reasons: [
      "Undisputed #1 value daily running trainer under ₹4,000 in India",
      "PUMAGRIP outsole delivers industry-leading traction in wet and dry conditions",
      "Nitrogen-infused foam provides plush bounce while safeguarding joints"
    ],
    trade_offs: [
      "Forefoot fit is slightly snug for wide feet (consider sizing up a half step).",
      "Plush mesh upper runs warm during peak afternoon runs."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3899,
        original_price: 7999,
        discount_amount: 4100,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3999,
        original_price: 7999,
        discount_amount: 4000,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 4366,
        original_price: 7999,
        discount_amount: 3633,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.puma.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 7999
      },
      {
        date: "Last Month",
        price: 4288
      },
      {
        date: "Current",
        price: 3899
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Undisputed #1 value daily running trainer under ₹4,000 in India",
        "PUMAGRIP outsole delivers industry-leading traction in wet and dry conditions"
      ],
      topCons: [
        "Forefoot fit is slightly snug for wide feet (consider sizing up a half step)."
      ],
      buyerVerdict: "Recommended choice for Puma runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-nike-downshifter-12",
    title: "Nike Downshifter 12 Lightweight Road Running Shoes for Men (Midfoot Support Band)",
    brand: "Nike",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 5km Running, Morning Jogging, Gym Training",
      Sole: "Super-Soft Phylon Foam with Full Rubber Outsole",
      Material: "Lightweight Open-Cell Mesh for Active Ventilation",
      Weight: "270 g",
      Drop: "9.5 mm Heel-to-Toe Drop",
      Color: "Black / White / Smoke Grey",
      Terrain: "Road & Track"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3195,
    badge: "Popular Choice",
    score: 9.3,
    score_reasons: [
      "Exceptional entry-level Nike road runner priced comfortably under ₹3,500",
      "Fit band across midfoot works with laces to lock your foot securely",
      "Full-length durable rubber outsole prevents premature tread wear"
    ],
    trade_offs: [
      "Cushioning is firm Phylon rather than soft React/ZoomX foam.",
      "Not optimized for marathon distances above 15km."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3195,
        original_price: 4295,
        discount_amount: 1100,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3295,
        original_price: 4295,
        discount_amount: 1000,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3578,
        original_price: 4295,
        discount_amount: 717,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.nike.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 4295
      },
      {
        date: "Last Month",
        price: 3514
      },
      {
        date: "Current",
        price: 3195
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Exceptional entry-level Nike road runner priced comfortably under ₹3,500",
        "Fit band across midfoot works with laces to lock your foot securely"
      ],
      topCons: [
        "Cushioning is firm Phylon rather than soft React/ZoomX foam."
      ],
      buyerVerdict: "Recommended choice for Nike runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-nike-revolution-7",
    title: "Nike Revolution 7 Road Running Shoes (Soft Foam Midsole, Roomier Forefoot)",
    brand: "Nike",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Running, 3km-8km Sessions, Casual Fitness",
      Sole: "Molded EVA Foam with Generative Rubber Traction",
      Material: "Knit Breathable Textile Upper",
      Weight: "280 g",
      Drop: "10 mm",
      Color: "Midnight Navy / White",
      Terrain: "Tarmac, Sidewalks, Treadmill"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2795,
    badge: "Best Value",
    score: 9.2,
    score_reasons: [
      "Widened forefoot box compared to Revolution 6 allows toes to splay naturally",
      "Puffy heel collar prevents Achilles chafing during long workouts",
      "Reliable everyday workhorse priced well under ₹3,000"
    ],
    trade_offs: [
      "Sole flexibility is moderate rather than race-springy.",
      "Outsole grip can slip on smooth wet tile surfaces."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2795,
        original_price: 3695,
        discount_amount: 900,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2895,
        original_price: 3695,
        discount_amount: 800,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3130,
        original_price: 3695,
        discount_amount: 565,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.nike.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 3695
      },
      {
        date: "Last Month",
        price: 3074
      },
      {
        date: "Current",
        price: 2795
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Widened forefoot box compared to Revolution 6 allows toes to splay naturally",
        "Puffy heel collar prevents Achilles chafing during long workouts"
      ],
      topCons: [
        "Sole flexibility is moderate rather than race-springy."
      ],
      buyerVerdict: "Recommended choice for Nike runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-adidas-duramo-speed",
    title: "Adidas Duramo Speed Running Shoes with LIGHTSTRIKE Cushioning",
    brand: "Adidas",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Tempo Runs, Daily 5k-10k Road Training",
      Sole: "Full-Length Lightstrike EVA Foam with Adiwear Rubber",
      Material: "Engineered Breathable Mesh (50% Recycled Content)",
      Weight: "265 g",
      Drop: "9.5 mm",
      Color: "Lucid Cyan / Core Black / Solar Red",
      Terrain: "Road & Asphalt"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3699,
    badge: "Best Value",
    score: 9.5,
    score_reasons: [
      "Features premium Lightstrike foam typically reserved for ₹8,000+ race models",
      "Snappy energy return makes speed workouts and daily 5km runs effortless",
      "Adiwear heavy-abrasion rubber withstands rough Indian tarmac"
    ],
    trade_offs: [
      "Lightstrike foam has a slightly firmer, responsive ride rather than marshmallow plush.",
      "Tongue is thin and racing-styled, requiring flat lacing."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3699,
        original_price: 6999,
        discount_amount: 3300,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3799,
        original_price: 6999,
        discount_amount: 3200,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 4142,
        original_price: 6999,
        discount_amount: 2857,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.adidas.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 6999
      },
      {
        date: "Last Month",
        price: 4068
      },
      {
        date: "Current",
        price: 3699
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Features premium Lightstrike foam typically reserved for ₹8,000+ race models",
        "Snappy energy return makes speed workouts and daily 5km runs effortless"
      ],
      topCons: [
        "Lightstrike foam has a slightly firmer, responsive ride rather than marshmallow plush."
      ],
      buyerVerdict: "Recommended choice for Adidas runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-adidas-galaxy-6",
    title: "Adidas Galaxy 6 Road Running Shoes (Cloudfoam Midsole, OrthoLite Sockliner)",
    brand: "Adidas",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Easy Runs, Treadmill, All-Day Walking",
      Sole: "Cloudfoam Cushioned Midsole with Non-Marking Rubber",
      Material: "Air Mesh Upper with TPU Eyestay Reinforcements",
      Weight: "290 g",
      Drop: "10 mm",
      Color: "Core Black / Cloud White",
      Terrain: "Road, Gym, Treadmill"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2399,
    badge: "Best Value",
    score: 9.2,
    score_reasons: [
      "Cloudfoam delivers step-in cloud-like softness from day one",
      "OrthoLite antimicrobial sockliner absorbs sweat and prevents foot odor",
      "Incredible value under ₹2,500 after multi-store card discounts"
    ],
    trade_offs: [
      "Heavier weight (290g) than tempo shoes.",
      "Cushioning compresses after 400km of continuous heavy usage."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2399,
        original_price: 4999,
        discount_amount: 2600,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2499,
        original_price: 4999,
        discount_amount: 2500,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 2686,
        original_price: 4999,
        discount_amount: 2313,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.adidas.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 4999
      },
      {
        date: "Last Month",
        price: 2638
      },
      {
        date: "Current",
        price: 2399
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Cloudfoam delivers step-in cloud-like softness from day one",
        "OrthoLite antimicrobial sockliner absorbs sweat and prevents foot odor"
      ],
      topCons: [
        "Heavier weight (290g) than tempo shoes."
      ],
      buyerVerdict: "Recommended choice for Adidas runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-asics-gel-contend-8b",
    title: "ASICS Gel-Contend 8B Running Shoes (Rearfoot GEL Technology, AmpliFoam)",
    brand: "ASICS",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Running, Neutral Foot Striders, Heel-Striker Joint Protection",
      Sole: "Rearfoot GEL Cushioning Unit + AmpliFoam Midsole",
      Material: "Jacquard Breathable Mesh with Internal Heel Counter",
      Weight: "278 g",
      Drop: "10 mm",
      Color: "French Blue / Electric Lime",
      Terrain: "Road, Track, Pavement"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3399,
    badge: "Best Joint Protection",
    score: 9.5,
    score_reasons: [
      "ASICS proprietary Rearfoot GEL absorbs shock and reduces knee impact on pavement",
      "Internal heel counter locks the calcaneus bone firmly to eliminate ankle roll",
      "Solid AmpliFoam compound offers longevity far exceeding basic EVA"
    ],
    trade_offs: [
      "Rearfoot GEL focuses shock protection at the heel; midfoot runners feel less bounce.",
      "Classic ASICS aesthetics may feel traditional to minimalist runners."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3399,
        original_price: 4999,
        discount_amount: 1600,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3499,
        original_price: 4999,
        discount_amount: 1500,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3806,
        original_price: 4999,
        discount_amount: 1193,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.asics.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 4999
      },
      {
        date: "Last Month",
        price: 3738
      },
      {
        date: "Current",
        price: 3399
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "ASICS proprietary Rearfoot GEL absorbs shock and reduces knee impact on pavement",
        "Internal heel counter locks the calcaneus bone firmly to eliminate ankle roll"
      ],
      topCons: [
        "Rearfoot GEL focuses shock protection at the heel; midfoot runners feel less bounce."
      ],
      buyerVerdict: "Recommended choice for ASICS runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-asics-jolt-4",
    title: "ASICS Jolt 4 Daily Road Running Shoes (AmpliFoam Cushioning, Stitched Toe Cap)",
    brand: "ASICS",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 5km Jogging, Fitness Walking, Weekend 10ks",
      Sole: "AmpliFoam Shock Absorber with Solid Rubber Outsole",
      Material: "Engineered Mesh with Stitched Synthetic Overlays",
      Weight: "268 g",
      Drop: "10 mm",
      Color: "Black / White / Hazard Green",
      Terrain: "Road & Paved Paths"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2699,
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "Stitched toe cap reinforcement prevents mesh tearing from toe friction",
      "AmpliFoam cushioning provides balanced durability without bottoming out",
      "Sub-₹3,000 price point makes genuine ASICS engineering accessible"
    ],
    trade_offs: [
      "Does not feature the flagship silicone GEL unit found in the Contend/Nimbus line.",
      "Sole is slightly firm out of the box until 20km break-in."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2699,
        original_price: 3999,
        discount_amount: 1300,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2799,
        original_price: 3999,
        discount_amount: 1200,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3022,
        original_price: 3999,
        discount_amount: 977,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.asics.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 3999
      },
      {
        date: "Last Month",
        price: 2968
      },
      {
        date: "Current",
        price: 2699
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Stitched toe cap reinforcement prevents mesh tearing from toe friction",
        "AmpliFoam cushioning provides balanced durability without bottoming out"
      ],
      topCons: [
        "Does not feature the flagship silicone GEL unit found in the Contend/Nimbus line."
      ],
      buyerVerdict: "Recommended choice for ASICS runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-reebok-energen-run-3",
    title: "Reebok Energen Run 3 Lightweight Road Running Shoes (FuelFoam Midsole)",
    brand: "Reebok",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 5km-10km Running, Treadmill, Aerobic Training",
      Sole: "FuelFoam Density Midsole with Full-Length Rubber",
      Material: "Monogrid Mesh Upper with Padded Foam Tongue",
      Weight: "260 g",
      Drop: "9 mm",
      Color: "Pure Grey / Core Black / Neon Green",
      Terrain: "Road & Asphalt"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2699,
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "FuelFoam delivers an optimal ratio of responsive spring to soft landing",
      "Monogrid upper allows maximum airflow on hot morning runs",
      "Competitively priced at ₹2,699–₹2,999 across major retailers"
    ],
    trade_offs: [
      "Heel collar padding is moderate.",
      "Arch support is standard; flat-footed runners may need custom orthotics."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2699,
        original_price: 4599,
        discount_amount: 1900,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2799,
        original_price: 4599,
        discount_amount: 1800,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3022,
        original_price: 4599,
        discount_amount: 1577,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.reebok.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 4599
      },
      {
        date: "Last Month",
        price: 2968
      },
      {
        date: "Current",
        price: 2699
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "FuelFoam delivers an optimal ratio of responsive spring to soft landing",
        "Monogrid upper allows maximum airflow on hot morning runs"
      ],
      topCons: [
        "Heel collar padding is moderate."
      ],
      buyerVerdict: "Recommended choice for Reebok runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-reebok-stride-runner",
    title: "Reebok Stride Runner Shoes (EVA Foam Cushioning, Breathable Textile)",
    brand: "Reebok",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Morning Jogging, Beginner Running, Daily Steps",
      Sole: "Injection-Molded EVA Midsole with Traction Pods",
      Material: "Breathable Polyester Mesh",
      Weight: "252 g (Extremely Light)",
      Drop: "8.5 mm",
      Color: "Black / Vector Red",
      Terrain: "Road & Park Tracks"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 1699,
    badge: "Budget Pick",
    score: 9.1,
    score_reasons: [
      "Best ultra-budget brand runner in India (sub-₹1,800)",
      "Featherweight 252g build causes zero foot fatigue",
      "Simple, durable design that cleans easily"
    ],
    trade_offs: [
      "EVA foam without rubber covering outsole reduces lifespan to ~400km.",
      "Minimalist stability—purely for casual road runners."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 1699,
        original_price: 2999,
        discount_amount: 1300,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 1799,
        original_price: 2999,
        discount_amount: 1200,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 1902,
        original_price: 2999,
        discount_amount: 1097,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.reebok.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 2999
      },
      {
        date: "Last Month",
        price: 1868
      },
      {
        date: "Current",
        price: 1699
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Best ultra-budget brand runner in India (sub-₹1,800)",
        "Featherweight 252g build causes zero foot fatigue"
      ],
      topCons: [
        "EVA foam without rubber covering outsole reduces lifespan to ~400km."
      ],
      buyerVerdict: "Recommended choice for Reebok runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-skechers-go-run-consistent",
    title: "Skechers GO RUN Consistent Running Shoes (ULTRA LIGHT Midsole, Air-Cooled Goga Mat)",
    brand: "Skechers",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Running, High-Impact Joint Protection, 5k-10k Road Training",
      Sole: "ULTRA LIGHT Resilient Midsole Foam with Parametric Outsole",
      Material: "Smooth Leather & Mesh Fabric Upper",
      Weight: "285 g",
      Drop: "9 mm",
      Color: "Charcoal / Orange",
      Terrain: "Road, Treadmill, Hard Surface"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3599,
    badge: "High Cushion",
    score: 9.4,
    score_reasons: [
      "Air-Cooled Goga Mat high-rebound insole cushions feet against hard pavement",
      "ULTRA LIGHT midsole absorbs heavy shock for knee and back relief",
      "Parametric web outsole offers smooth transitions from heel to toe"
    ],
    trade_offs: [
      "Leather overlays add some weight compared to pure engineered mesh shoes.",
      "Can run slightly wide for runners with very narrow feet."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3599,
        original_price: 5499,
        discount_amount: 1900,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3699,
        original_price: 5499,
        discount_amount: 1800,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 4030,
        original_price: 5499,
        discount_amount: 1469,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.skechers.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 5499
      },
      {
        date: "Last Month",
        price: 3958
      },
      {
        date: "Current",
        price: 3599
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Air-Cooled Goga Mat high-rebound insole cushions feet against hard pavement",
        "ULTRA LIGHT midsole absorbs heavy shock for knee and back relief"
      ],
      topCons: [
        "Leather overlays add some weight compared to pure engineered mesh shoes."
      ],
      buyerVerdict: "Recommended choice for Skechers runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-campus-north-plus",
    title: "Campus North Plus Men's Running Shoes (PilloFoam Cushioning, Anti-Skid Phylon)",
    brand: "Campus",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 3k-5k Running, Morning Walks, High Durability",
      Sole: "PilloFoam Shock Absorption with Anti-Skid Phylon Outsole",
      Material: "High-Density Breathable Knitted Upper",
      Weight: "265 g",
      Drop: "9 mm",
      Color: "Triple Black / Neon Accent",
      Terrain: "Rough Tarmac, Concrete, Dirt Tracks"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 1399,
    badge: "Cheapest",
    score: 9.1,
    score_reasons: [
      "Priced under ₹1,500 making it the most affordable daily road runner",
      "Phylon sole withstands uneven stones and rough Indian roads without puncture",
      "Machine washable with quick-drying breathable knit"
    ],
    trade_offs: [
      "Foam is less bouncy on high-speed sprint workouts.",
      "Insole lacks premium arch contouring for severe over-pronators."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 1399,
        original_price: 2299,
        discount_amount: 900,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 1499,
        original_price: 2299,
        discount_amount: 800,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 1566,
        original_price: 2299,
        discount_amount: 733,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.campus.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 2299
      },
      {
        date: "Last Month",
        price: 1538
      },
      {
        date: "Current",
        price: 1399
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Priced under ₹1,500 making it the most affordable daily road runner",
        "Phylon sole withstands uneven stones and rough Indian roads without puncture"
      ],
      topCons: [
        "Foam is less bouncy on high-speed sprint workouts."
      ],
      buyerVerdict: "Recommended choice for Campus runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-campus-ogs-runner",
    title: "Campus OGS Lightweight Daily Running Shoes (Adaptive Fit, Nitrofly Sole)",
    brand: "Campus",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Road Jogging, Gym, College & Running",
      Sole: "Nitrofly Lightweight EVA Outsole",
      Material: "Knitted Stretch Mesh Upper",
      Weight: "248 g",
      Drop: "8 mm",
      Color: "Slate Grey / Bright Orange",
      Terrain: "Road & Gym Floor"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 1199,
    badge: "Cheapest",
    score: 9,
    score_reasons: [
      "Incredible price point at ₹1,299–₹1,499",
      "Sub-250g construction provides remarkable agility",
      "Sock-like collar fits snugly around ankle with zero hot spots"
    ],
    trade_offs: [
      "Outsole has no rubber pods; sole wear occurs faster on abrasive roads.",
      "Designed for sub-5km distances rather than half marathons."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 1199,
        original_price: 1999,
        discount_amount: 800,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 1299,
        original_price: 1999,
        discount_amount: 700,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 1342,
        original_price: 1999,
        discount_amount: 657,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.campus.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 1999
      },
      {
        date: "Last Month",
        price: 1318
      },
      {
        date: "Current",
        price: 1199
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Incredible price point at ₹1,299–₹1,499",
        "Sub-250g construction provides remarkable agility"
      ],
      topCons: [
        "Outsole has no rubber pods; sole wear occurs faster on abrasive roads."
      ],
      buyerVerdict: "Recommended choice for Campus runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-sparx-sm-678",
    title: "Sparx SM-678 High Durability Road Running Shoes (TPR Traction Outsole)",
    brand: "Sparx",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Outdoor Road Running, Rough Tarmac, Daily Morning Cardio",
      Sole: "Dual-Density EVA Midsole with TPR Rubber Outsole",
      Material: "Reinforced Synthetic Mesh with Toe Guard",
      Weight: "295 g",
      Drop: "10 mm",
      Color: "Navy Blue / Fluorescent Yellow",
      Terrain: "All-Terrain (Road, Gravel, Dirt)"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 1199,
    badge: "Rugged Durability",
    score: 9,
    score_reasons: [
      "Unbeatable rugged durability for Indian conditions (survives gravel and water)",
      "TPR rubber outsole provides firm grip on wet asphalt and dust",
      "Extremely budget friendly at ₹1,199–₹1,399"
    ],
    trade_offs: [
      "Slightly heavier (295g) with firmer ride.",
      "Breathability is moderate compared to open-cell knit uppers."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 1199,
        original_price: 1699,
        discount_amount: 500,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 1299,
        original_price: 1699,
        discount_amount: 400,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 1342,
        original_price: 1699,
        discount_amount: 357,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.sparx.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 1699
      },
      {
        date: "Last Month",
        price: 1318
      },
      {
        date: "Current",
        price: 1199
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Unbeatable rugged durability for Indian conditions (survives gravel and water)",
        "TPR rubber outsole provides firm grip on wet asphalt and dust"
      ],
      topCons: [
        "Slightly heavier (295g) with firmer ride."
      ],
      buyerVerdict: "Recommended choice for Sparx runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-decathlon-kalenji-jogflow",
    title: "Decathlon Kalenji Jogflow 500.1 Men's Road Running Shoes (Joint Protection Flow)",
    brand: "Decathlon",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 5k-10k Road Running, Half Marathon Training, Impact Reduction",
      Sole: "Flow Soft EVA Cushioning with Thick Rubber Tread",
      Material: "Engineered Breathable Mesh (Eco-Designed)",
      Weight: "270 g",
      Drop: "4 mm Low Natural Drop (Promotes Midfoot Stride)",
      Color: "Storm Blue / Orange",
      Terrain: "Road & Paved Paths"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2899,
    badge: "Editor's Choice",
    score: 9.4,
    score_reasons: [
      "Scientifically developed 4mm drop encourages natural midfoot posture to reduce knee torque",
      "Decathlon 2-year warranty ensures dependable craftsmanship",
      "Excellent value at ₹2,999 with plush heel and forefoot padding"
    ],
    trade_offs: [
      "4mm low heel drop requires 1-2 weeks adaptation if transitioning from traditional 10mm shoes.",
      "Sold primarily through Decathlon direct and selected online partners."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2899,
        original_price: 3499,
        discount_amount: 600,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2999,
        original_price: 3499,
        discount_amount: 500,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3246,
        original_price: 3499,
        discount_amount: 253,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.decathlon.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 3499
      },
      {
        date: "Last Month",
        price: 3188
      },
      {
        date: "Current",
        price: 2899
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Scientifically developed 4mm drop encourages natural midfoot posture to reduce knee torque",
        "Decathlon 2-year warranty ensures dependable craftsmanship"
      ],
      topCons: [
        "4mm low heel drop requires 1-2 weeks adaptation if transitioning from traditional 10mm shoes."
      ],
      buyerVerdict: "Recommended choice for Decathlon runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-puma-electrify-nitro-3",
    title: "Puma Electrify Nitro 3 Road Running Shoes (NITRO Heel Pod, PROFOAMLITE)",
    brand: "Puma",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Running, Beginner to Intermediate Road Runners",
      Sole: "Dual Midsole: Nitrogen-Infused NITRO Heel Pod + PROFOAMLITE",
      Material: "Engineered Mesh with Rolled Collar",
      Weight: "260 g",
      Drop: "10 mm",
      Color: "Royal Blue / Lime Sizzle",
      Terrain: "Road & Treadmill"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3399,
    badge: "Best Value",
    score: 9.5,
    score_reasons: [
      "Delivers Puma's elite NITRO cushioning at a budget-friendly ₹3,499 price point",
      "PUMAGRIP outsole ensures you never slip in rainy monsoon morning runs",
      "Rolled heel collar locks the Achilles comfortably with zero blistering"
    ],
    trade_offs: [
      "NITRO foam is positioned in heel rather than full length.",
      "Upper is slightly stiff for the first 10 kilometers."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3399,
        original_price: 6499,
        discount_amount: 3100,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3499,
        original_price: 6499,
        discount_amount: 3000,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 3806,
        original_price: 6499,
        discount_amount: 2693,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.puma.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 6499
      },
      {
        date: "Last Month",
        price: 3738
      },
      {
        date: "Current",
        price: 3399
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Delivers Puma's elite NITRO cushioning at a budget-friendly ₹3,499 price point",
        "PUMAGRIP outsole ensures you never slip in rainy monsoon morning runs"
      ],
      topCons: [
        "NITRO foam is positioned in heel rather than full length."
      ],
      buyerVerdict: "Recommended choice for Puma runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-puma-transport-modern",
    title: "Puma Transport Modern Road Running Shoes (Softride Foam, Full Rubber Outsole)",
    brand: "Puma",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 3k-5k Running, Gym Warmup, Everyday Jogging",
      Sole: "Softride Cushion Foam with Full-Coverage Rubber Outsole",
      Material: "Clean Breathable Mesh with Synthetic Eyestay",
      Weight: "272 g",
      Drop: "9.5 mm",
      Color: "Puma Black / High Risk Red",
      Terrain: "Road, Treadmill, Park Track"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2099,
    badge: "Budget Pick",
    score: 9.2,
    score_reasons: [
      "Sub-₹2,200 entry to genuine Puma running lineage",
      "Full-coverage rubber bottom ensures long-lasting durability on city roads",
      "Softride footbed provides all-day cushioning"
    ],
    trade_offs: [
      "Does not feature the nitrogen-infused foam found in Nitro models.",
      "Standard tongue instead of gusseted wrap."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2099,
        original_price: 3999,
        discount_amount: 1900,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2199,
        original_price: 3999,
        discount_amount: 1800,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 2350,
        original_price: 3999,
        discount_amount: 1649,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.puma.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 3999
      },
      {
        date: "Last Month",
        price: 2308
      },
      {
        date: "Current",
        price: 2099
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Sub-₹2,200 entry to genuine Puma running lineage",
        "Full-coverage rubber bottom ensures long-lasting durability on city roads"
      ],
      topCons: [
        "Does not feature the nitrogen-infused foam found in Nitro models."
      ],
      buyerVerdict: "Recommended choice for Puma runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-adidas-runfalcon-3",
    title: "Adidas Runfalcon 3.0 Road Running Shoes (Cloudfoam Midsole, Textile Lining)",
    brand: "Adidas",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Road Jogging, 5k Training, All-Day Fitness",
      Sole: "Cloudfoam Shock-Absorbing Midsole with Rubber Outsole",
      Material: "Breathable Textile Upper with at least 50% Recycled Material",
      Weight: "275 g",
      Drop: "9 mm",
      Color: "Core Black / Carbon / Lucid Lemon",
      Terrain: "Road & Pavement"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 2599,
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "Among the best-selling running models in India for price-to-performance",
      "Soft Cloudfoam midsole absorbs street vibrations reliably",
      "Durable rubber outsole delivers predictable grip across wet tarmac"
    ],
    trade_offs: [
      "Upper knit is slightly less flexible around wide midfoots.",
      "Not meant for competitive half-marathon pace below 4:30 min/km."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 2599,
        original_price: 4599,
        discount_amount: 2000,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 2699,
        original_price: 4599,
        discount_amount: 1900,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 2910,
        original_price: 4599,
        discount_amount: 1689,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.adidas.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 4599
      },
      {
        date: "Last Month",
        price: 2858
      },
      {
        date: "Current",
        price: 2599
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Among the best-selling running models in India for price-to-performance",
        "Soft Cloudfoam midsole absorbs street vibrations reliably"
      ],
      topCons: [
        "Upper knit is slightly less flexible around wide midfoots."
      ],
      buyerVerdict: "Recommended choice for Adidas runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-nike-pegasus-40",
    title: "Nike Air Zoom Pegasus 40 Daily Road Running Shoes (React Foam, Dual Zoom Air Units)",
    brand: "Nike",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily Road Running, 5km to Full Marathon Training",
      Sole: "Full-Length Nike React Foam with Forefoot & Heel Zoom Air",
      Material: "Single-Layer Engineered Breathable Mesh",
      Weight: "288 g (Men's Size UK 9)",
      Drop: "10 mm Heel-to-Toe Offset",
      Color: "Black / White / University Red",
      Terrain: "Road & Pavement"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 7895,
    badge: "Best Overall",
    score: 9.6,
    score_reasons: [
      "The industry benchmark for daily running durability (easily lasts 800+ km)",
      "Dual Zoom Air pockets provide responsive spring-back energy return",
      "Redesigned midfoot band locks the foot securely without arch pinch"
    ],
    trade_offs: [
      "Costs ₹7,895–₹7,995 (exceeds budget-conscious sub-₹4,000 threshold).",
      "10mm heel drop is tailored for heel/midfoot strikers rather than barefoot forefoot runners."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 7895,
        original_price: 10495,
        discount_amount: 2600,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 7995,
        original_price: 10495,
        discount_amount: 2500,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 8842,
        original_price: 10495,
        discount_amount: 1653,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.nike.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 10495
      },
      {
        date: "Last Month",
        price: 8684
      },
      {
        date: "Current",
        price: 7895
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "The industry benchmark for daily running durability (easily lasts 800+ km)",
        "Dual Zoom Air pockets provide responsive spring-back energy return"
      ],
      topCons: [
        "Costs ₹7,895–₹7,995 (exceeds budget-conscious sub-₹4,000 threshold)."
      ],
      buyerVerdict: "Recommended choice for Nike runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-asics-gel-nimbus-26",
    title: "ASICS Gel-Nimbus 26 Premium Maximum Cushioning Road Running Shoes",
    brand: "ASICS",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Long Recovery Runs, Half/Full Marathon Training, Maximum Joint Protection",
      Sole: "FF BLAST PLUS ECO Cushioning with PureGEL Technology",
      Material: "Engineered Knit Upper with Soft Stretchy Knit Collar",
      Weight: "304 g",
      Drop: "8 mm",
      Color: "Black / Pure Silver",
      Terrain: "Road & Pavement"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 14999,
    badge: "Max Cushion",
    score: 9.7,
    score_reasons: [
      "Unrivaled maximum cushioning cloud feel for long 15km-30km distance training",
      "PureGEL silicone inserts provide 65% softer landings than standard EVA",
      "Engineered knit collar creates a glove-like premium ankle wrap"
    ],
    trade_offs: [
      "Premium price point (₹14,999).",
      "Slightly heavier stack (304g) designed for comfort over tempo racing."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 14999,
        original_price: 16999,
        discount_amount: 2000,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 15099,
        original_price: 16999,
        discount_amount: 1900,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 16798,
        original_price: 16999,
        discount_amount: 201,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.asics.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 16999
      },
      {
        date: "Last Month",
        price: 16498
      },
      {
        date: "Current",
        price: 14999
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Unrivaled maximum cushioning cloud feel for long 15km-30km distance training",
        "PureGEL silicone inserts provide 65% softer landings than standard EVA"
      ],
      topCons: [
        "Premium price point (₹14,999)."
      ],
      buyerVerdict: "Recommended choice for ASICS runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-adidas-ultraboost-light",
    title: "Adidas Ultraboost Light Running Shoes (Light BOOST Foam, Continental Rubber)",
    brand: "Adidas",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Long Distance Road Running, Recovery Jogging, All-Day Comfort",
      Sole: "Light BOOST Foam (30% Lighter) + Continental Rubber Outsole",
      Material: "PRIMEKNIT+ Textile Upper",
      Weight: "295 g",
      Drop: "10 mm",
      Color: "Core Black / Cloud White",
      Terrain: "Road & Pavement"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 11999,
    badge: "Energy Return",
    score: 9.6,
    score_reasons: [
      "Legendary BOOST energy return now 30% lighter with zero joint fatigue",
      "Continental rubber outsole provides the highest wet-weather grip in the industry",
      "PRIMEKNIT upper hugs foot like a tailored sock"
    ],
    trade_offs: [
      "Premium price tier (₹11,999–₹13,999).",
      "Not suited for muddy trail conditions."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 11999,
        original_price: 17999,
        discount_amount: 6000,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 12099,
        original_price: 17999,
        discount_amount: 5900,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 13438,
        original_price: 17999,
        discount_amount: 4561,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.adidas.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 17999
      },
      {
        date: "Last Month",
        price: 13198
      },
      {
        date: "Current",
        price: 11999
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Legendary BOOST energy return now 30% lighter with zero joint fatigue",
        "Continental rubber outsole provides the highest wet-weather grip in the industry"
      ],
      topCons: [
        "Premium price tier (₹11,999–₹13,999)."
      ],
      buyerVerdict: "Recommended choice for Adidas runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-new-balance-411-v3",
    title: "New Balance 411 V3 Road Running Shoes (Ground Contact EVA, Comfort Collar)",
    brand: "New Balance",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 5km Running, Gym, Walking",
      Sole: "Ground Contact EVA Cushioning with Rubber Pods",
      Material: "Sublimated Breathable Mesh Upper",
      Weight: "262 g",
      Drop: "9 mm",
      Color: "Black / Magnet / White",
      Terrain: "Road & Treadmill"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3699,
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "Classic New Balance comfort engineered for Indian road surfaces",
      "Ground Contact EVA delivers lightweight cushioning without bottoming out",
      "Roomy toe box provides natural forefoot freedom"
    ],
    trade_offs: [
      "Rubber pods are placed at high wear areas rather than full-length.",
      "Firm heel counter requires short break-in."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3699,
        original_price: 4999,
        discount_amount: 1300,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3799,
        original_price: 4999,
        discount_amount: 1200,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 4142,
        original_price: 4999,
        discount_amount: 857,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.newbalance.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 4999
      },
      {
        date: "Last Month",
        price: 4068
      },
      {
        date: "Current",
        price: 3699
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Classic New Balance comfort engineered for Indian road surfaces",
        "Ground Contact EVA delivers lightweight cushioning without bottoming out"
      ],
      topCons: [
        "Rubber pods are placed at high wear areas rather than full-length."
      ],
      buyerVerdict: "Recommended choice for New Balance runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-under-armour-surge-3",
    title: "Under Armour Charged Surge 3 Running Shoes (Charged Cushioning Midsole)",
    brand: "Under Armour",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Road Running, Sprint Intervals, Gym Cardio",
      Sole: "Charged Cushioning Compression Molded Foam",
      Material: "Lightweight Breathable Mesh Upper",
      Weight: "255 g",
      Drop: "8.5 mm",
      Color: "Pitch Gray / Black / White",
      Terrain: "Road & Track"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 3899,
    badge: "High Performance",
    score: 9.4,
    score_reasons: [
      "Charged Cushioning is firmer in the heel and softer in the forefoot for balanced transitions",
      "Strategically placed rubber pods enhance durability without added bulk",
      "High ankle collar padding supports Achilles tendon during fast strides"
    ],
    trade_offs: [
      "Snug aerodynamic fit; runners with wide feet should consider sizing up.",
      "Less flex in the midfoot shank."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 3899,
        original_price: 5499,
        discount_amount: 1600,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 3999,
        original_price: 5499,
        discount_amount: 1500,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 4366,
        original_price: 5499,
        discount_amount: 1133,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.underarmour.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 5499
      },
      {
        date: "Last Month",
        price: 4288
      },
      {
        date: "Current",
        price: 3899
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Charged Cushioning is firmer in the heel and softer in the forefoot for balanced transitions",
        "Strategically placed rubber pods enhance durability without added bulk"
      ],
      topCons: [
        "Snug aerodynamic fit; runners with wide feet should consider sizing up."
      ],
      buyerVerdict: "Recommended choice for Under Armour runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-bata-power-xort-run",
    title: "Bata Power XoRise Phantom Lightweight Running Shoes (Memory Foam Insole)",
    brand: "Bata",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Daily 3k-5k Running, Walking, Everyday Wear",
      Sole: "XoRise High-Rebound EVA with Anti-Skid Rubber",
      Material: "Seamless Engineered Knitted Mesh",
      Weight: "245 g",
      Drop: "8 mm",
      Color: "Navy / Orange",
      Terrain: "Road & Concrete"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 1799,
    badge: "Budget Pick",
    score: 9.1,
    score_reasons: [
      "Affordable road runner backed by Bata's extensive retail warranty",
      "High-rebound XoRise sole offers surprisingly plush bounce",
      "Exceptional value under ₹1,800"
    ],
    trade_offs: [
      "EVA compression sets in earlier after ~350km.",
      "Best suited for casual 5km runs rather than fast 10k pace."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 1799,
        original_price: 2799,
        discount_amount: 1000,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 1899,
        original_price: 2799,
        discount_amount: 900,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 2014,
        original_price: 2799,
        discount_amount: 785,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.bata.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 2799
      },
      {
        date: "Last Month",
        price: 1978
      },
      {
        date: "Current",
        price: 1799
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Affordable road runner backed by Bata's extensive retail warranty",
        "High-rebound XoRise sole offers surprisingly plush bounce"
      ],
      topCons: [
        "EVA compression sets in earlier after ~350km."
      ],
      buyerVerdict: "Recommended choice for Bata runners seeking dependable daily performance."
    }
  },
  {
    canonical_id: "shoe-redtape-athleisure-runner",
    title: "Red Tape Men AirFlow Cushion Road Running Shoes (Flow EVA Midsole)",
    brand: "Red Tape",
    category: "shopping",
    subcategory: "Running Shoes",
    image: "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
    specifications: {
      Usage: "Morning Jogging, Gym, Fitness Walks",
      Sole: "Flow EVA Shock Absorber Outsole",
      Material: "Breathable Mesh Upper with Slip-On Collar",
      Weight: "250 g",
      Drop: "9 mm",
      Color: "All Black / Charcoal",
      Terrain: "Road & Treadmill"
    },
    rating: 4.6,
    review_count: 1850,
    best_price: 1399,
    badge: "Cheapest",
    score: 9,
    score_reasons: [
      "Super budget-friendly price point at ₹1,399–₹1,499",
      "Featherlight construction with easy slip-on comfort",
      "Clean all-black aesthetic suitable for running and casual wear"
    ],
    trade_offs: [
      "Lacks heavy-duty rubber outsole; not meant for rough gravel.",
      "Minimalist arch support."
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 1399,
        original_price: 2499,
        discount_amount: 1100,
        currency: "INR",
        shipping: "Tomorrow Delivery (Prime)",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.6,
        review_count: 1850,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 1499,
        original_price: 2499,
        discount_amount: 1000,
        currency: "INR",
        shipping: "Free 2-Day Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.5,
        review_count: 1200,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      },
      {
        provider: "Official Brand Store",
        price: 1566,
        original_price: 2499,
        discount_amount: 933,
        currency: "INR",
        shipping: "Official Manufacturer Delivery",
        availability: "In Stock",
        source_url: "https://www.redtape.com/in",
        rating: 4.8,
        review_count: 640,
        store_badge: "Official Store",
        fetched_at: "12 mins ago"
      }
    ],
    price_history: [
      {
        date: "Launch",
        price: 2499
      },
      {
        date: "Last Month",
        price: 1538
      },
      {
        date: "Current",
        price: 1399
      }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1850,
      topPros: [
        "Super budget-friendly price point at ₹1,399–₹1,499",
        "Featherlight construction with easy slip-on comfort"
      ],
      topCons: [
        "Lacks heavy-duty rubber outsole; not meant for rough gravel."
      ],
      buyerVerdict: "Recommended choice for Red Tape runners seeking dependable daily performance."
    }
  },

  {
    canonical_id: "chair-featherlite-liberate",
    title: "Featherlite Liberate High Back Ergonomic Desk Chair (Dynaflex Spine Support)",
    brand: "Featherlite",
    category: "shopping",
    subcategory: "Office Chairs",
    image: "https://images.unsplash.com/photo-1580481077197-e85d947fceb6?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Lumbar Support": "Dynaflex Dynamic Lumbar flexes with natural spine motion",
      "Mechanism": "Multi-Lock Synchro-Tilt with Tension Control",
      "Material": "Korean High-Tensile Breathable Mesh Back",
      "Adjustability": "Height, Armrests, Multi-Position Recline Lock",
      "Warranty": "3 Years Comprehensive Manufacturer Warranty"
    },
    rating: 4.7,
    review_count: 2150,
    best_price: 13500,
    badge: "Best Ergonomics",
    score: 9.6,
    score_reasons: [
      "Engineered specifically for 8-10 hour continuous coding & desk shifts",
      "Dynaflex dynamic back prevents lower back fatigue and spine slouching",
      "Heavy-duty factory build quality backed by 3-year warranty"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Official Brand Store",
        price: 13500,
        original_price: 16900,
        discount_amount: 1400,
        currency: "INR",
        shipping: "3 Days Free White-Glove Installation",
        availability: "In Stock",
        source_url: "https://featherlitefurniture.com",
        rating: 4.8,
        review_count: 2150,
        store_badge: "Official Store",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 13500,
        original_price: 16900,
        discount_amount: 1000,
        currency: "INR",
        shipping: "3 Days Freight Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.7,
        review_count: 2150,
        store_badge: "Best Deal",
        fetched_at: "5 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 16900 },
      { date: "Last Month", price: 14500 },
      { date: "Current", price: 13500 }
    ],
    sentiment: {
      positivePercentage: 93,
      neutralPercentage: 5,
      negativePercentage: 2,
      totalReviewsAnalyzed: 2150,
      topPros: ["Completely eliminated lower back pain during 10-hour work days", "Dynaflex back bends when reaching for drinks or turning", "Super sturdy metal/nylon structure"],
      topCons: ["2D armrests instead of 4D", "Assembly instructions need careful reading"],
      buyerVerdict: "The best ergonomic office chair investment for long working hours in India."
    }
  },
  {
    canonical_id: "cam-canon-eos-r50",
    title: "Canon EOS R50 Mirrorless Camera Kit (RF-S 18-45mm IS STM, 24.2MP, 4K Uncropped)",
    brand: "Canon",
    category: "shopping",
    subcategory: "Cameras",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Sensor": "24.2 Megapixel APS-C CMOS Sensor",
      "Autofocus": "Dual Pixel CMOS AF II with Deep Learning Subject Detection",
      "Video": "Uncropped 6K Oversampled 4K 30p, Full HD 120p Slow Motion",
      "Lens": "RF-S 18-45mm f/4.5-6.3 IS STM Kit Included",
      "Screen": "3.0\" Vari-Angle Touchscreen LCD (Vlog-Friendly)"
    },
    rating: 4.7,
    review_count: 1940,
    best_price: 54990,
    badge: "Best for Beginners",
    score: 9.6,
    score_reasons: [
      "Top-rated beginner mirrorless camera with intuitive guided touch menus",
      "Unbelievably fast eye-tracking autofocus that keeps subjects sharp",
      "Crisp uncropped 4K video recording with dedicated Close-Up Movie mode"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Amazon",
        price: 54990,
        original_price: 67995,
        discount_amount: 2000,
        currency: "INR",
        shipping: "Tomorrow Morning",
        availability: "In Stock",
        source_url: "https://www.amazon.in",
        rating: 4.7,
        review_count: 1940,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 54990,
        original_price: 67995,
        discount_amount: 3000,
        currency: "INR",
        shipping: "Tomorrow Delivery",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.7,
        review_count: 1820,
        store_badge: "Best Offer",
        fetched_at: "4 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 67995 },
      { date: "Last Month", price: 57990 },
      { date: "Current", price: 54990 }
    ],
    sentiment: {
      positivePercentage: 94,
      neutralPercentage: 4,
      negativePercentage: 2,
      totalReviewsAnalyzed: 1940,
      topPros: ["Takes stunning professional portraits with zero prior photography knowledge", "Flip screen is great for vlogs and selfies", "Extremely lightweight and compact for travel"],
      topCons: ["Battery life is ~350 shots (advisable to buy an extra LP-E17 battery)", "No in-body sensor stabilization"],
      buyerVerdict: "The definitive beginner-friendly mirrorless camera for photography and content creation."
    }
  },
  {
    canonical_id: "tv-samsung-55-crystal",
    title: "Samsung 55 Inch Crystal 4K Dynamic UHD Smart LED TV (Crystal Processor 4K, HDR10+)",
    brand: "Samsung",
    category: "shopping",
    subcategory: "Televisions",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80",
    specifications: {
      "Screen Size": "55 Inch (138 cm)",
      "Resolution": "4K Ultra HD (3840 x 2160)",
      "Panel": "Dynamic Crystal Color 1 Billion True Colors LED",
      "Refresh Rate": "60Hz Motion Xcelerator",
      "HDR": "HDR10+, Mega Contrast",
      "Audio": "20W 2CH with Object Tracking Sound Lite"
    },
    rating: 4.6,
    review_count: 4800,
    best_price: 43990,
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "Best 55-inch 4K living room television under ₹45,000",
      "Crystal Processor 4K delivers vibrant realistic colors and sharp upscaling",
      "Intuitive Tizen OS with Samsung TV Plus free live channels"
    ],
    buy_advice: "Buy Now",
    offers: [
      {
        provider: "Reliance Digital",
        price: 43990,
        original_price: 62990,
        discount_amount: 1500,
        currency: "INR",
        shipping: "Tomorrow Delivery",
        availability: "In Stock",
        source_url: "https://www.reliancedigital.in",
        rating: 4.6,
        review_count: 1200,
        store_badge: "Cheapest",
        fetched_at: "Just now"
      },
      {
        provider: "Flipkart",
        price: 43990,
        original_price: 62990,
        discount_amount: 2000,
        currency: "INR",
        shipping: "Tomorrow",
        availability: "In Stock",
        source_url: "https://www.flipkart.com",
        rating: 4.6,
        review_count: 4800,
        store_badge: "Best Offer",
        fetched_at: "3 mins ago"
      }
    ],
    price_history: [
      { date: "Launch", price: 54990 },
      { date: "Last Month", price: 46990 },
      { date: "Current", price: 43990 }
    ],
    sentiment: {
      positivePercentage: 92,
      neutralPercentage: 5,
      negativePercentage: 3,
      totalReviewsAnalyzed: 4800,
      topPros: ["Rich, dynamic colors that pop in well-lit living rooms", "Super thin bezels look modern and premium", "Smooth smart TV app performance"],
      topCons: ["Audio bass is modest (benefits from a soundbar)", "60Hz refresh rate rather than 120Hz"],
      buyerVerdict: "The best 55-inch 4K smart television for family entertainment under ₹45,000."
    }
  }
];

export const INITIAL_FLIGHTS: TravelOption[] = [
  {
    id: "flight-indigo-6e5012",
    type: "flight",
    category: "travel",
    provider: "IndiGo",
    logoText: "IndiGo",
    flight_number: "6E 5012",
    origin: "DEL (Delhi T2)",
    destination: "BOM (Mumbai T1)",
    departure: "18:15",
    arrival: "20:30",
    duration: "2h 15m",
    stops: "Non-stop",
    baggage: "15 kg Check-in Included",
    cabin_baggage: "7 kg Hand Baggage",
    price: 4250,
    currency: "INR",
    rating: 4.5,
    badge: "Best Overall",
    score: 9.6,
    score_reasons: [
      "Optimal evening departure slot (18:15)",
      "Fastest direct route without layover (2h 15m)",
      "Highest airline on-time arrival index (92%)"
    ],
    buy_advice: "Buy Now",
    source_url: "https://www.goindigo.in",
    fetched_at: "Live Feed",
    cabin_class: "Economy (Saver)",
    amenities: ["Seat Selection", "Express Bag", "Snack Add-on"],
    price_history: [
      { date: "7 Days Ago", price: 3950 },
      { date: "3 Days Ago", price: 4100 },
      { date: "Yesterday", price: 4250 },
      { date: "Current", price: 4250 }
    ]
  },
  {
    id: "flight-akasa-qp1104",
    type: "flight",
    category: "travel",
    provider: "Akasa Air",
    logoText: "Akasa Air",
    flight_number: "QP 1104",
    origin: "DEL (Delhi T2)",
    destination: "BOM (Mumbai T2)",
    departure: "19:00",
    arrival: "21:20",
    duration: "2h 20m",
    stops: "Non-stop",
    baggage: "15 kg Check-in Included",
    cabin_baggage: "7 kg Hand Baggage",
    price: 3899,
    currency: "INR",
    rating: 4.6,
    badge: "Cheapest",
    score: 9.4,
    score_reasons: [
      "Lowest price verified across all domestic carriers",
      "Modern Boeing 737 MAX cabin with ergonomic seats & USB charging",
      "Brand new aircraft fleet"
    ],
    buy_advice: "Buy Now",
    source_url: "https://www.akasaair.com",
    fetched_at: "Live Feed",
    cabin_class: "Economy",
    amenities: ["USB Ports", "Cafe Akasa pre-book", "Fast Baggage"],
    price_history: [
      { date: "7 Days Ago", price: 3750 },
      { date: "3 Days Ago", price: 3850 },
      { date: "Yesterday", price: 3899 },
      { date: "Current", price: 3899 }
    ]
  },
  {
    id: "flight-airindia-ai805",
    type: "flight",
    category: "travel",
    provider: "Air India",
    logoText: "Air India",
    flight_number: "AI 805",
    origin: "DEL (Delhi T3)",
    destination: "BOM (Mumbai T2)",
    departure: "17:30",
    arrival: "19:40",
    duration: "2h 10m",
    stops: "Non-stop",
    baggage: "25 kg Heavy Baggage Included",
    cabin_baggage: "8 kg Hand Baggage",
    price: 4850,
    currency: "INR",
    rating: 4.4,
    badge: "Fastest",
    score: 9.1,
    score_reasons: [
      "Shortest flight duration on record (2h 10m)",
      "Complimentary hot meal & beverages served on-board",
      "Huge 25 kg baggage allowance included free (saves ~₹1,500)"
    ],
    buy_advice: "Stable Fare",
    source_url: "https://www.airindia.com",
    fetched_at: "Live Feed",
    cabin_class: "Economy Classic",
    amenities: ["Free Hot Meal", "25kg Baggage", "Terminal 3 Access"],
    price_history: [
      { date: "7 Days Ago", price: 4850 },
      { date: "3 Days Ago", price: 4850 },
      { date: "Yesterday", price: 4850 },
      { date: "Current", price: 4850 }
    ]
  }
];

export const INITIAL_HOTELS: HotelOption[] = [
  {
    id: "hotel-taj-exotica-goa",
    type: "hotel",
    category: "hotel",
    name: "Taj Exotica Resort & Spa, Goa",
    location: "Benaulim Beach, South Goa",
    city: "Goa",
    star_rating: 5,
    guest_rating: 4.9,
    review_count: 2150,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    room_type: "Deluxe Sea View Villa with Balcony",
    price_per_night: 14500,
    original_price: 19000,
    currency: "INR",
    badge: "Best Luxury",
    score: 9.8,
    score_reasons: [
      "Direct private beachfront access on pristine Benaulim sands",
      "Complimentary luxury breakfast buffet & sunset high-tea",
      "Jiva Spa holistic wellness programs included"
    ],
    amenities: ["Private Beach", "Infinity Pool", "Free Gourmet Breakfast", "Luxury Spa", "Tennis Court", "Free High-Speed Wi-Fi"],
    distance_to_beach: "Direct Beachfront (0 meters)",
    distance_to_airport: "28 km (Dabolim Airport)",
    cancellation_policy: "Free cancellation up to 48 hours before check-in",
    providers: [
      {
        provider: "Booking.com",
        price: 14500,
        room_perks: "Free Breakfast + Room Upgrade upon availability",
        source_url: "https://www.booking.com"
      },
      {
        provider: "Agoda",
        price: 14890,
        room_perks: "Instant Confirmation + AgodaVIP Cash Back",
        source_url: "https://www.agoda.com"
      },
      {
        provider: "MakeMyTrip",
        price: 15200,
        room_perks: "HDFC Credit Card ₹1,500 Instant Discount",
        source_url: "https://www.makemytrip.com"
      }
    ],
    price_history: [
      { date: "Last Month", price: 17500 },
      { date: "2 Weeks Ago", price: 16000 },
      { date: "Last Week", price: 15000 },
      { date: "Current", price: 14500 }
    ],
    sentiment: {
      positivePercentage: 96,
      neutralPercentage: 3,
      negativePercentage: 1,
      totalReviewsAnalyzed: 2150,
      topPros: [
        "Unparalleled hospitality & attentive concierge",
        "Villa rooms are massive, immaculate, and smell divine",
        "Stunning landscaped 56-acre Mediterranean grounds"
      ],
      topCons: [
        "Food menu is on the pricier luxury scale"
      ],
      buyerVerdict: "The benchmark of luxury hospitality in Goa. Guaranteed memorable vacation."
    }
  },
  {
    id: "hotel-marriott-mumbai",
    type: "hotel",
    category: "hotel",
    name: "JW Marriott Mumbai Sahar",
    location: "Chhatrapati Shivaji Intl Airport Area, Andheri East",
    city: "Mumbai",
    star_rating: 5,
    guest_rating: 4.8,
    review_count: 3800,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
    room_type: "Executive King Room with Airport Lounge Access",
    price_per_night: 9800,
    original_price: 13500,
    currency: "INR",
    badge: "Top Rated",
    score: 9.5,
    score_reasons: [
      "Only 5 minutes from Mumbai International Airport Terminal 2",
      "Expansive 24-hour fitness center & outdoor resort pool",
      "Executive Lounge offering complimentary evening cocktails"
    ],
    amenities: ["Airport Shuttle", "Outdoor Pool", "Executive Lounge", "24/7 Gym", "Spa by JW", "Soundproof Windows"],
    distance_to_beach: "10 km (Juhu Beach)",
    distance_to_airport: "1 km (Terminal 2)",
    cancellation_policy: "Free cancellation until 6 PM on day of arrival",
    providers: [
      {
        provider: "Agoda",
        price: 9800,
        room_perks: "Special Member Rate with Late Checkout (2 PM)",
        source_url: "https://www.agoda.com"
      },
      {
        provider: "Booking.com",
        price: 10100,
        room_perks: "Breakfast Included + Free Airport Transfer",
        source_url: "https://www.booking.com"
      }
    ],
    price_history: [
      { date: "Last Month", price: 11500 },
      { date: "2 Weeks Ago", price: 10800 },
      { date: "Last Week", price: 10200 },
      { date: "Current", price: 9800 }
    ],
    sentiment: {
      positivePercentage: 93,
      neutralPercentage: 5,
      negativePercentage: 2,
      totalReviewsAnalyzed: 3800,
      topPros: [
        "Perfect location for layovers & business travelers",
        "Exceptional soundproofing; zero aircraft noise in rooms",
        "Diverse international breakfast spread"
      ],
      topCons: [
        "Rush hour traffic in Andheri East area"
      ],
      buyerVerdict: "Premium business and transit stay with world-class amenities."
    }
  },
  {
    id: "hotel-zostel-goa",
    type: "hotel",
    category: "hotel",
    name: "Zostel Plus Morjim (Beachfront Pods & Private Cottages)",
    location: "Morjim Beach Road, North Goa",
    city: "Goa",
    star_rating: 3,
    guest_rating: 4.6,
    review_count: 1420,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
    room_type: "Private Deluxe Cottage with Ocean Deck",
    price_per_night: 3200,
    original_price: 4500,
    currency: "INR",
    badge: "Best Value",
    score: 9.3,
    score_reasons: [
      "Best vibe and community for remote workers & solo travelers",
      "High-speed 300 Mbps mesh Wi-Fi with dedicated co-working zone",
      "Steps away from famous Morjim turtle beach"
    ],
    amenities: ["Co-Working Space", "Beachside Cafe", "Infinity Plunge Pool", "Free 300Mbps WiFi", "Daily Social Events"],
    distance_to_beach: "50 meters (1 min walk to Morjim Beach)",
    distance_to_airport: "55 km (MOPA Goa Airport)",
    cancellation_policy: "Cancel up to 72 hours before arrival for full refund",
    providers: [
      {
        provider: "MakeMyTrip",
        price: 3200,
        room_perks: "Best Rate Guarantee + Free Coffee Vouchers",
        source_url: "https://www.makemytrip.com"
      },
      {
        provider: "Booking.com",
        price: 3450,
        room_perks: "Standard Cottage Rate",
        source_url: "https://www.booking.com"
      }
    ],
    price_history: [
      { date: "Last Month", price: 3800 },
      { date: "2 Weeks Ago", price: 3500 },
      { date: "Current", price: 3200 }
    ],
    sentiment: {
      positivePercentage: 90,
      neutralPercentage: 7,
      negativePercentage: 3,
      totalReviewsAnalyzed: 1420,
      topPros: [
        "Fantastic vibrant community and cafe atmosphere",
        "Rock-solid internet for Zoom calls & coding",
        "Morjim beach is calm and peaceful"
      ],
      topCons: [
        "Rooms are compact; not meant for large families"
      ],
      buyerVerdict: "Ideal pick for digital nomads, couples, and budget-conscious travelers wanting beach access."
    }
  }
];

export const INITIAL_PRICE_ALERTS: PriceAlert[] = [
  {
    id: "alert-1",
    itemId: "laptop-acer-nitro-v",
    itemTitle: "Acer Nitro V Gaming Laptop (RTX 4050)",
    targetPrice: 55000,
    currentPrice: 57990,
    createdAt: "2026-09-02",
    category: "shopping",
    status: "monitoring",
    lastChecked: "10 mins ago",
    provider: "Amazon"
  },
  {
    id: "alert-2",
    itemId: "flight-indigo-6e5012",
    itemTitle: "IndiGo 6E-5012 (DEL ➔ BOM)",
    targetPrice: 3800,
    currentPrice: 4250,
    createdAt: "2026-09-04",
    category: "travel",
    status: "monitoring",
    lastChecked: "25 mins ago",
    provider: "IndiGo Direct"
  }
];
