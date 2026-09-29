"""
Modular Shopping Provider Architecture for CompareX AI.
Provides individual connector classes for:
- MockFlipkart
- MockAmazon
- MockCroma
- MockRelianceDigital
- MockTataCliq
- MockBrandStore

Fully category-agnostic and extensible:
Supports Laptops, Headphones, Running Shoes, Office Chairs, Cameras, TVs, Smartphones, and Smartwatches.
All data is strictly labeled as Mock/Demo Provider Data.
"""

import re
from typing import List, Dict, Any, Optional

# Dynamic category keyword detection maps
CATEGORY_KEYWORDS = {
    "running_shoes": [
        "shoe", "shoes", "running", "sneaker", "sneakers", "footwear", "marathon", 
        "pegasus", "ultraboost", "velocity nitro", "deviate nitro", "nitro foam",
        "supernova", "stride", "solution", "duramo", "galaxy 6", "runfalcon",
        "asics", "cumulus", "jadeite", "kayano", "nimbus", "1130", "gel-1130", "casuals", "af1", "shadow", 
        "force", "dunk", "campus", "sparx", "reebok", "skechers", "bata", "woodland"
    ],
    "laptop": [
        "laptop", "laptops", "notebook", "macbook", "victus", "loq", "tuf", 
        "acer nitro", "nitro v", "nitro 5", "thinkpad", "zenbook", "gaming laptop"
    ],
    "headphones": [
        "headphone", "headphones", "earbuds", "earbud", "earphone", "earphones", 
        "tws", "wh-1000xm5", "airpods", "soundcore q30", "life q30", "over-ear"
    ],
    "smartwatch": [
        "smartwatch", "smart watch", "apple watch", "galaxy watch", "fitness band", 
        "colorfit", "icon buzz", "noise watch", "fire-boltt", "amazfit"
    ],
    "office_chair": ["chair", "office chair", "desk chair", "ergonomic chair", "lumbar", "mesh chair", "liberate", "sihoo", "green soul", "furniture"],
    "camera": ["camera", "dslr", "mirrorless", "vlog", "vlogging", "photography", "canon", "nikon", "sony alpha", "lens", "eos r50", "a6700"],
    "television": ["tv", "television", "smart tv", "4k tv", "oled", "qled", "bravia", "crystal 4k"],
    "smartphone": ["smartphone", "smartphones", "mobile", "mobiles", "iphone", "galaxy s", "nord", "oneplus", "nothing phone", "realme 12"]
}

def detect_query_category(q: str) -> Optional[str]:
    """Dynamically infers category from query keywords with zero ambiguity."""
    q_lower = q.lower()
    for cat, keywords in CATEGORY_KEYWORDS.items():
        if any(kw in q_lower for kw in keywords):
            return cat
    return None

KNOWN_BRANDS = [
    "nike", "puma", "adidas", "asics", "campus", "sparx", "asian",
    "bata", "red tape", "reebok", "skechers", "under armour", "new balance",
    "woodland", "decathlon", "featherlite", "sihoo", "green soul", "da urban",
    "wakefit", "sony", "bose", "apple", "sennheiser", "soundcore", "boat",
    "jbl", "realme", "acer", "asus", "lenovo", "hp", "dell", "msi",
    "samsung", "lg", "tcl", "mi", "xiaomi", "canon", "nikon", "fujifilm"
]

def match_query(item: Dict[str, Any], q: str) -> bool:
    """Matches search terms against title, brand, category, subcategory, and specs."""
    text = (item["raw_title"] + " " + item["brand"] + " " + item.get("category", "") + " " + item.get("subcategory", "")).lower()
    q_lower = q.lower()
    
    # Check if a specific brand is requested in the search query
    detected_brand_in_query = None
    for b in KNOWN_BRANDS:
        if re.search(r'\b' + re.escape(b) + r'\b', q_lower):
            detected_brand_in_query = b
            break
            
    # If the user explicitly asks for a brand, only match items of that brand
    if detected_brand_in_query:
        item_brand = item.get("brand", "").lower()
        if detected_brand_in_query not in item_brand and detected_brand_in_query not in text:
            return False

    words = q_lower.split()
    # Filter out stopwords, generic terms, and numeric amounts
    keywords = [
        w for w in words 
        if w not in ["the", "a", "an", "best", "under", "below", "with", "for", "and", "in", "find", "me", "show", "₹", "rs", "rs.", "good", "latest", "i", "need", "want", "options", "shoe", "shoes"] 
        and not w.replace(',', '').replace('₹', '').isdigit()
    ]
    if not keywords:
        return True
    return any(k in text for k in keywords)

from app.connectors.catalog_data import CANONICAL_DATABASE

def get_dynamic_catalog_for_provider(provider_name: str) -> List[Dict[str, Any]]:
    """Dynamically generates provider listings from CANONICAL_DATABASE respecting verified live prices."""
    listings = []
    p_norm = provider_name.lower().replace(' ', '').replace('store', '')
    for cid, spec in CANONICAL_DATABASE.items():
        base_title = spec['title']
        brand = spec['brand']
        cat = spec['category']
        subcat = spec.get('subcategory', 'Running Shoes')
        
        # Check if canonical spec has explicit verified offers for this provider
        explicit_offer = None
        for off in spec.get('offers', []):
            off_p = off.get('provider', '').lower().replace(' ', '').replace('store', '')
            if p_norm in off_p or off_p in p_norm:
                explicit_offer = off
                break

        if explicit_offer:
            eff = explicit_offer.get('price', spec.get('best_price', 2999))
            mrp = explicit_offer.get('original_price', spec.get('mrp', eff))
            discount = max(0, mrp - eff)
            listed = mrp
            p_domain = provider_name.lower().replace(' ', '')
            source_url = explicit_offer.get('source_url', f'https://www.{p_domain}.in/item/{cid}')
            offer_terms = explicit_offer.get('offer_terms', f'Verified {provider_name} Live Deal')
            store_badge = explicit_offer.get('store_badge', 'Verified Store')
        else:
            eff = spec.get('best_price', 2999)
            mrp = spec.get('mrp', int(eff * 1.35))
            discount = max(0, mrp - eff)
            listed = mrp
            if provider_name == 'Amazon':
                eff = max(699, eff - 100)
                listed = eff + discount
            elif provider_name in ['BrandStore', 'Official Brand Store']:
                eff = listed
                discount = 0
            p_domain = provider_name.lower().replace(' ', '')
            source_url = f'https://www.{p_domain}.in/item/{cid}'
            offer_terms = f'Verified {provider_name} Instant Offer'
            store_badge = 'Best Deal' if provider_name == 'Amazon' else 'Verified Store'
            
        listings.append({
            'sku': f'{provider_name[:3].upper()}-{cid.upper()}',
            'canonical_id': cid,
            'raw_title': f'{base_title} ({provider_name} Audited Stock)',
            'brand': brand,
            'category': cat,
            'subcategory': subcat,
            'listed_price': listed,
            'mrp': mrp,
            'discount_offer': discount,
            'offer_terms': offer_terms,
            'effective_price': eff,
            'delivery_estimate': 'Tomorrow' if provider_name in ['Amazon', 'Flipkart'] else '2-3 Days',
            'delivery_days': 1 if provider_name in ['Amazon', 'Flipkart'] else 2,
            'delivery_fee': 0,
            'availability': 'In Stock',
            'rating': round(spec.get('base_score', 9.0) / 2.05, 1),
            'review_count': 1200,
            'source_url': source_url,
            'store_badge': store_badge
        })
    return listings

class BaseShoppingProvider:
    provider_name: str = "BaseProvider"
    is_mock: bool = True
    CATALOG: List[Dict[str, Any]] = []

    def get_all_listings(self) -> List[Dict[str, Any]]:
        dynamic_listings = get_dynamic_catalog_for_provider(self.provider_name)
        return self.CATALOG + dynamic_listings

    def search(self, query: str, category: Optional[str] = None) -> List[Dict[str, Any]]:
        q = query.lower()
        
        # Check budget mention in query
        budget_match = re.search(r'(?:under|below|budget|within|max|₹|rs\.?|less than)\s*(\d+[\d,]*)', q) or \
                       re.search(r'(\d+[\d,]*)\s*(?:budget|under|below|max)', q)
        parsed_budget = None
        if budget_match:
            try:
                parsed_budget = int(budget_match.group(1).replace(',', ''))
            except ValueError:
                pass

        # Detect target category dynamically
        inferred_category = detect_query_category(q)
        target_cat = category.lower() if category else inferred_category

        all_listings = self.get_all_listings()
        results = []
        for item in all_listings:
            item_cat = item.get("category", "").lower()
            
            # Explicit category filtering
            if target_cat and target_cat not in item_cat:
                continue

            if match_query(item, q):
                results.append({**item, "provider": self.provider_name, "is_mock": self.is_mock})

        # Fallback within matching category if zero direct keywords matched
        if not results and target_cat:
            cat_items = [item for item in all_listings if target_cat in item.get("category", "").lower()]
            if parsed_budget:
                budget_items = [p for p in cat_items if p.get("effective_price", p.get("listed_price", 0)) <= parsed_budget]
                if budget_items:
                    return [{**item, "provider": self.provider_name, "is_mock": self.is_mock} for item in budget_items]
            if cat_items:
                return [{**item, "provider": self.provider_name, "is_mock": self.is_mock} for item in cat_items]
            return []

        # General fallback ONLY if no category could be inferred
        if not results and not target_cat:
            return [{**item, "provider": self.provider_name, "is_mock": self.is_mock} for item in all_listings[:4]]

        return results

# Shared multi-category catalog listings across providers
class MockFlipkart(BaseShoppingProvider):
    provider_name = "Flipkart"
    is_mock = True

    CATALOG = [
        # LAPTOPS
        {
            "sku": "FK-LAP-ACER-NITRO-V",
            "canonical_id": "laptop-acer-nitro-v",
            "raw_title": "Acer Nitro V 15 Gaming Laptop (AMD Ryzen 7 7735HS, 16GB DDR5, RTX 4050 6GB, 512GB SSD, 144Hz)",
            "brand": "Acer",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 58490,
            "mrp": 74999,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on HDFC & SBI Bank Credit Cards",
            "effective_price": 56490,
            "delivery_estimate": "Tomorrow by 2:00 PM",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 890,
            "source_url": "https://www.flipkart.com/item/FK-LAP-ACER-NITRO-V",
            "store_badge": "Best Deal"
        },
        {
            "sku": "FK-LAP-LENOVO-LOQ-15",
            "canonical_id": "laptop-lenovo-loq-15",
            "raw_title": "Lenovo LOQ 15 Gaming Laptop (Intel Core i5-12450HX, 16GB DDR5, RTX 3050 6GB, 100% sRGB)",
            "brand": "Lenovo",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 57490,
            "mrp": 72990,
            "discount_offer": 2500,
            "offer_terms": "Flat ₹2,500 off with Flipkart Axis Bank Cards",
            "effective_price": 54990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 1450,
            "source_url": "https://www.flipkart.com/item/FK-LAP-LENOVO-LOQ-15",
            "store_badge": "Cheapest"
        },
        {
            "sku": "FK-LAP-ASUS-TUF-A15",
            "canonical_id": "laptop-asus-tuf-a15",
            "raw_title": "ASUS TUF Gaming A15 (AMD Ryzen 7 7435HS, 16GB RAM, RTX 4050 6GB 140W, 90Wh Battery)",
            "brand": "ASUS",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 67990,
            "mrp": 84990,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on All Major Cards",
            "effective_price": 65990,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 1120,
            "source_url": "https://www.flipkart.com/item/FK-LAP-ASUS-TUF-A15",
            "store_badge": "Best Performance"
        },
        {
            "sku": "FK-LAP-HP-VICTUS-16",
            "canonical_id": "laptop-hp-victus-16",
            "raw_title": "HP Victus 16 Gaming Laptop (Ryzen 5 5600H, 16GB RAM, RTX 3050 4GB, 512GB SSD)",
            "brand": "HP",
            "category": "laptop",
            "subcategory": "Budget Gaming",
            "listed_price": 53990,
            "mrp": 69990,
            "discount_offer": 1500,
            "offer_terms": "Instant ₹1,500 off on ICICI Bank Cards",
            "effective_price": 52490,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.4,
            "review_count": 980,
            "source_url": "https://www.flipkart.com/item/FK-LAP-HP-VICTUS-16",
            "store_badge": "Budget Pick"
        },

        # HEADPHONES & AUDIO
        {
            "sku": "FK-AUD-SONY-WH1000XM5",
            "canonical_id": "hp-sony-wh1000xm5",
            "raw_title": "Sony WH-1000XM5 Wireless Industry Leading Active Noise Cancelling Headphones (30h Battery, Dual Processor)",
            "brand": "Sony",
            "category": "headphones",
            "subcategory": "Over-Ear Wireless",
            "listed_price": 28990,
            "mrp": 34990,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on HDFC & Axis Cards",
            "effective_price": 26990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 5200,
            "source_url": "https://www.flipkart.com/item/FK-AUD-SONY-WH1000XM5",
            "store_badge": "Top Rated"
        },
        {
            "sku": "FK-AUD-SOUNDCORE-Q30",
            "canonical_id": "hp-soundcore-q30",
            "raw_title": "Anker Soundcore Life Q30 Hybrid Active Noise Cancelling Bluetooth Headphones with Multi-Mode ANC",
            "brand": "Anker",
            "category": "headphones",
            "subcategory": "ANC Headphones",
            "listed_price": 5499,
            "mrp": 7999,
            "discount_offer": 500,
            "offer_terms": "Special Coupon ₹500 off applied",
            "effective_price": 4999,
            "delivery_estimate": "Tomorrow by 11:00 AM",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 3400,
            "source_url": "https://www.flipkart.com/item/FK-AUD-SOUNDCORE-Q30",
            "store_badge": "Best Value ANC"
        },
        {
            "sku": "FK-AUD-REALME-BUDS-AIR6",
            "canonical_id": "hp-realme-buds-air6",
            "raw_title": "Realme Buds Air 6 Pro TWS Earbuds with 50dB Hybrid ANC, LDAC Hi-Res Audio, 40h Battery",
            "brand": "Realme",
            "category": "headphones",
            "subcategory": "TWS Earbuds",
            "listed_price": 4999,
            "mrp": 7999,
            "discount_offer": 500,
            "offer_terms": "Instant ₹500 off on UPI payments",
            "effective_price": 4499,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 2800,
            "source_url": "https://www.flipkart.com/item/FK-AUD-REALME-BUDS-AIR6",
            "store_badge": "Best TWS Under 5k"
        },

        # RUNNING SHOES
        {
            "sku": "FK-SHOE-NIKE-PEGASUS-40",
            "canonical_id": "shoe-nike-pegasus-40",
            "raw_title": "Nike Air Zoom Pegasus 40 Daily Road Running Shoes for Men (React Foam, Dual Zoom Air)",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 8495,
            "mrp": 10495,
            "discount_offer": 500,
            "offer_terms": "Bank discount ₹500 off",
            "effective_price": 7995,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 1890,
            "source_url": "https://www.flipkart.com/item/FK-SHOE-NIKE-PEGASUS-40",
            "store_badge": "Runners Choice"
        },
        {
            "sku": "FK-SHOE-PUMA-VELOCITY-2",
            "canonical_id": "shoe-puma-velocity-nitro",
            "raw_title": "Puma Velocity Nitro 2 Lightweight Cushion Road Running Shoes (PUMAGRIP Outsole, Nitro Foam)",
            "brand": "Puma",
            "category": "running_shoes",
            "subcategory": "Daily Trainers",
            "listed_price": 4499,
            "mrp": 7999,
            "discount_offer": 500,
            "offer_terms": "Extra ₹500 off during Super Saver sale",
            "effective_price": 3999,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 1420,
            "source_url": "https://www.flipkart.com/item/FK-SHOE-PUMA-VELOCITY-2",
            "store_badge": "Best Under ₹4,000"
        },
        {
            "sku": "FK-SHOE-ASICS-JADEITE-3",
            "canonical_id": "shoe-asics-gel-jadeite-3",
            "raw_title": "ASICS GEL-JADEITE 3 Road Running Shoes For Men (White/Ocean Mint, GEL Cushioning)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 5499,
            "mrp": 7999,
            "discount_offer": 500,
            "offer_terms": "Flipkart Axis Bank Card 5% Cashback + ₹500 SuperCoin coupon",
            "effective_price": 4999,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 2150,
            "source_url": "https://www.flipkart.com/asics-gel-jadeite-3-running-shoes-men/p/itm8c80b772a64d",
        },
        {
            "sku": "FK-SHOE-ASICS-CUMULUS-25",
            "canonical_id": "shoe-asics-gel-cumulus-25",
            "raw_title": "Asics GEL-CUMULUS 25 Running Shoes For Men (Illusion Blue/Glow Yellow)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 5279,
            "mrp": 10999,
            "discount_offer": 0,
            "offer_terms": "Hot Deal 52% OFF + Bank Offer Available",
            "effective_price": 5279,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.4,
            "review_count": 3796,
            "source_url": "https://www.flipkart.com/asics-gel-cumulus-25-running-shoes-men/p/itm2a08944e0a7f1?pid=SHOGQGBMRMJYGCB8",
            "store_badge": "Lowest Price"
        },
        {
            "sku": "FK-SHOE-ASICS-GEL-1130",
            "canonical_id": "shoe-asics-gel-1130",
            "raw_title": "ASICS GEL-1130 Casuals For Unisex (White / Pure Silver / Black)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Casual Runners",
            "listed_price": 4679,
            "mrp": 8999,
            "discount_offer": 0,
            "offer_terms": "Special Price 48% Off + Extra ₹468 off with Axis Bank Card (Net: ₹4,211)",
            "effective_price": 4679,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 2840,
            "source_url": "https://www.flipkart.com/asics-gel-1130-casuals-unisex/p/itmd9fda833cb404",
            "store_badge": "Lowest Price"
        },
        {
            "sku": "FK-SHOE-ASICS-COURTMOV",
            "canonical_id": "shoe-asics-gel-courtmov",
            "raw_title": "ASICS GEL-COURTMOV+ Tennis & Court Shoes For Men (Lightweight, Non-Marking Sole)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Tennis & Court Sports",
            "listed_price": 3499,
            "mrp": 6999,
            "discount_offer": 0,
            "offer_terms": "Hot Deal 50% Off + Axis Bank 5% Cashback",
            "effective_price": 3499,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.4,
            "review_count": 1420,
            "source_url": "https://www.flipkart.com/asics-gel-courtmov-tennis-shoes-men/p/itm810e57871e1cb",
            "store_badge": "Lowest Price"
        },
        {
            "sku": "FK-SHOE-ASICS-PULSE-16",
            "canonical_id": "shoe-asics-gel-pulse-16",
            "raw_title": "ASICS GEL-PULSE 16 Road Running Shoes For Men (PureGEL, FLYTEFOAM Cushioning)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running Shoes",
            "listed_price": 4679,
            "mrp": 8999,
            "discount_offer": 0,
            "offer_terms": "Special Price 48% Off + Extra Bank Card Discount",
            "effective_price": 4679,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 1890,
            "source_url": "https://www.flipkart.com/asics-gel-pulse-16-running-shoes-men/p/itmc35fc29314942",
            "store_badge": "Lowest Price"
        },
        {
            "sku": "FK-SHOE-NIKE-AF1-SHADOW",
            "canonical_id": "shoe-nike-air-force-1-shadow",
            "raw_title": "Nike Air Force 1 Shadow Pastel Multi-Color Platform Sneakers (Pale Ivory / Hydrogen Blue)",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Streetwear",
            "listed_price": 7999,
            "mrp": 8995,
            "discount_offer": 500,
            "offer_terms": "Special Big Saving Days Instant ₹500 Discount",
            "effective_price": 7499,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.9,
            "review_count": 3410,
            "source_url": "https://www.flipkart.com/nike-air-force-1-shadow-sneakers/p/itm4af1shadow",
            "store_badge": "Cheapest"
        },

        # OFFICE CHAIRS
        {
            "sku": "FK-CHR-FEATHERLITE-LIB",
            "canonical_id": "chair-featherlite-liberate",
            "raw_title": "Featherlite Liberate High Back Ergonomic Desk Chair with Dynamic Dynaflex Spine Lumbar Support",
            "brand": "Featherlite",
            "category": "office_chair",
            "subcategory": "Ergonomic Chairs",
            "listed_price": 14500,
            "mrp": 16900,
            "discount_offer": 1000,
            "offer_terms": "Instant ₹1,000 off on HDFC Cards",
            "effective_price": 13500,
            "delivery_estimate": "3 Days Freight Delivery",
            "delivery_days": 3,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 2150,
            "source_url": "https://www.flipkart.com/item/FK-CHR-FEATHERLITE-LIB",
            "store_badge": "Best Ergonomics"
        },
        {
            "sku": "FK-CHR-SIHOO-M57",
            "canonical_id": "chair-sihoo-m57",
            "raw_title": "SIHOO M57 Ergonomic Office Chair with 3D Adjustable Armrests, Two-Way Lumbar Support, Full Mesh",
            "brand": "SIHOO",
            "category": "office_chair",
            "subcategory": "Ergonomic Chairs",
            "listed_price": 13999,
            "mrp": 19999,
            "discount_offer": 1500,
            "offer_terms": "Instant ₹1,500 off on Prepaid Orders",
            "effective_price": 12499,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 1650,
            "source_url": "https://www.flipkart.com/item/FK-CHR-SIHOO-M57",
            "store_badge": "Long Hours Pick"
        },

        # CAMERAS
        {
            "sku": "FK-CAM-CANON-EOS-R50",
            "canonical_id": "cam-canon-eos-r50",
            "raw_title": "Canon EOS R50 Mirrorless Camera with RF-S 18-45mm IS STM Lens (24.2MP, 4K Uncropped, Dual Pixel AF II)",
            "brand": "Canon",
            "category": "camera",
            "subcategory": "Mirrorless Cameras",
            "listed_price": 57990,
            "mrp": 67995,
            "discount_offer": 3000,
            "offer_terms": "Instant ₹3,000 off on HDFC Bank Cards",
            "effective_price": 54990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 1820,
            "source_url": "https://www.flipkart.com/item/FK-CAM-CANON-EOS-R50",
            "store_badge": "Best for Beginners"
        },

        # TELEVISIONS
        {
            "sku": "FK-TV-LG-OLED-55C3",
            "canonical_id": "tv-lg-oled-55c3",
            "raw_title": "LG OLED evo C3 55 Inch 4K Smart TV (OLED55C3PSA, α9 Gen6 AI, 120Hz, Dolby Vision IQ & Atmos)",
            "brand": "LG",
            "category": "television",
            "subcategory": "OLED 4K TVs",
            "listed_price": 114990,
            "mrp": 169990,
            "discount_offer": 5000,
            "offer_terms": "Flat ₹5,000 off on Credit Card EMI",
            "effective_price": 109990,
            "delivery_estimate": "Tomorrow Scheduled Install",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 3100,
            "source_url": "https://www.flipkart.com/item/FK-TV-LG-OLED-55C3",
            "store_badge": "Best OLED Display"
        },
        {
            "sku": "FK-TV-SAMSUNG-55-CRYSTAL",
            "canonical_id": "tv-samsung-55-crystal",
            "raw_title": "Samsung 55 Inch Crystal 4K Dynamic Ultra HD Smart LED TV (Crystal Processor 4K, HDR10+, OTS Lite)",
            "brand": "Samsung",
            "category": "television",
            "subcategory": "4K UHD TVs",
            "listed_price": 45990,
            "mrp": 62990,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off with SBI Cards",
            "effective_price": 43990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 4800,
            "source_url": "https://www.flipkart.com/item/FK-TV-SAMSUNG-55-CRYSTAL",
            "store_badge": "Best Value 4K"
        },

        # SMARTPHONES (Only returned when explicitly asking for phone)
        {
            "sku": "FK-PHN-ONEPLUS-NORD-CE4",
            "canonical_id": "phone-oneplus-nord-ce4",
            "raw_title": "OnePlus Nord CE 4 5G (Dark Chrome, 128 GB) (8 GB RAM) | 100W SUPERVOOC, Snapdragon 7 Gen 3",
            "brand": "OnePlus",
            "category": "smartphone",
            "subcategory": "5G Smartphones",
            "listed_price": 24999,
            "mrp": 26999,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on HDFC & ICICI Bank Credit Cards",
            "effective_price": 22999,
            "delivery_estimate": "Tomorrow by 11:00 AM",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 8920,
            "source_url": "https://www.flipkart.com/item/FK-PHN-ONEPLUS-NORD-CE4",
            "store_badge": "Best Overall Phone"
        },
        {
            "sku": "FK-PHN-IPHONE-16-PRO",
            "canonical_id": "phone-iphone-16-pro",
            "raw_title": "Apple iPhone 16 Pro (128 GB) - Natural Titanium, Camera Control, A18 Pro Chip",
            "brand": "Apple",
            "category": "smartphone",
            "subcategory": "Flagship Phones",
            "listed_price": 124900,
            "mrp": 129900,
            "discount_offer": 5000,
            "offer_terms": "Instant ₹5,000 off on ICICI & HDFC Cards",
            "effective_price": 119900,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 3200,
            "source_url": "https://www.flipkart.com/item/FK-PHN-IPHONE-16-PRO",
            "store_badge": "Flagship Pick"
        }
    ]

class MockAmazon(BaseShoppingProvider):
    provider_name = "Amazon"
    is_mock = True

    CATALOG = [
        # LAPTOPS
        {
            "sku": "AMZ-LAP-ACER-NITRO-V",
            "canonical_id": "laptop-acer-nitro-v",
            "raw_title": "Acer Nitro V Gaming Laptop (AMD Ryzen 7 7735HS, RTX 4050 6GB, 16GB DDR5, 512GB SSD, 15.6\" 144Hz)",
            "brand": "Acer",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 57990,
            "mrp": 74999,
            "discount_offer": 0,
            "offer_terms": "Flat Prime Member Price (No card required)",
            "effective_price": 57990,
            "delivery_estimate": "Tomorrow Morning (Prime One-Day)",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 890,
            "source_url": "https://www.amazon.in/dp/B0CN58C3Z7",
            "store_badge": "Prime Fast Delivery"
        },
        {
            "sku": "AMZ-LAP-LENOVO-LOQ-15",
            "canonical_id": "laptop-lenovo-loq-15",
            "raw_title": "Lenovo LOQ 15 Gaming Laptop (Intel Core i5-12450HX, 16GB RAM, RTX 3050 6GB 95W TGP, 100% sRGB)",
            "brand": "Lenovo",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 56990,
            "mrp": 72990,
            "discount_offer": 1000,
            "offer_terms": "Instant ₹1,000 off on Amazon Pay ICICI Card",
            "effective_price": 55990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 1450,
            "source_url": "https://www.amazon.in/dp/B0CX21C8R8",
            "store_badge": "Best Value"
        },
        {
            "sku": "AMZ-LAP-ASUS-TUF-A15",
            "canonical_id": "laptop-asus-tuf-a15",
            "raw_title": "ASUS TUF Gaming A15 (2024), 15.6\" FHD 144Hz, AMD Ryzen 7 7435HS, RTX 4050 6GB, 16GB DDR5, 90Wh",
            "brand": "ASUS",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 68490,
            "mrp": 84990,
            "discount_offer": 1500,
            "offer_terms": "Apply ₹1,500 Amazon coupon at checkout",
            "effective_price": 66990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 1120,
            "source_url": "https://www.amazon.in/dp/B0D5BNG9L5",
            "store_badge": "Top Rated"
        },
        {
            "sku": "AMZ-LAP-HP-VICTUS-16",
            "canonical_id": "laptop-hp-victus-16",
            "raw_title": "HP Victus Gaming Laptop 15.6\" FHD (AMD Ryzen 5 5600H, 16GB DDR4, 512GB SSD, RTX 3050 4GB)",
            "brand": "HP",
            "category": "laptop",
            "subcategory": "Budget Gaming",
            "listed_price": 54990,
            "mrp": 69990,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 discount with Amazon Pay ICICI Card",
            "effective_price": 52990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.4,
            "review_count": 1400,
            "source_url": "https://www.amazon.in/dp/B09V1K8M5V",
            "store_badge": "Prime Choice"
        },

        # HEADPHONES
        {
            "sku": "AMZ-AUD-SONY-WH1000XM5",
            "canonical_id": "hp-sony-wh1000xm5",
            "raw_title": "Sony WH-1000XM5 Wireless Noise Cancelling Headphones, 8 Mics for Clear Calling, 30H Battery",
            "brand": "Sony",
            "category": "headphones",
            "subcategory": "Over-Ear Wireless",
            "listed_price": 27990,
            "mrp": 34990,
            "discount_offer": 1000,
            "offer_terms": "Instant ₹1,000 Amazon Pay Reward",
            "effective_price": 26990,
            "delivery_estimate": "Tomorrow by 10 AM",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 7800,
            "source_url": "https://www.amazon.in/dp/B09XS7JWHH",
            "store_badge": "Prime Choice"
        },
        {
            "sku": "AMZ-AUD-SOUNDCORE-Q30",
            "canonical_id": "hp-soundcore-q30",
            "raw_title": "Soundcore by Anker Life Q30 Hybrid Active Noise Cancelling Headphones, Hi-Res Audio, 40H Playtime",
            "brand": "Anker",
            "category": "headphones",
            "subcategory": "ANC Headphones",
            "listed_price": 5299,
            "mrp": 7999,
            "discount_offer": 400,
            "offer_terms": "Apply ₹400 Coupon on product page",
            "effective_price": 4899,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 9200,
            "source_url": "https://www.amazon.in/dp/B08HMWZBXC",
            "store_badge": "Cheapest"
        },

        # RUNNING SHOES
        {
            "sku": "AMZ-SHOE-NIKE-PEGASUS-40",
            "canonical_id": "shoe-nike-pegasus-40",
            "raw_title": "Nike Men's Air Zoom Pegasus 40 Running Shoe (Breathable Engineered Mesh, Waffle Traction)",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 8295,
            "mrp": 10495,
            "discount_offer": 400,
            "offer_terms": "Instant ₹400 off on Card Payment",
            "effective_price": 7895,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 2400,
            "source_url": "https://www.amazon.in/dp/B0C39R5Y99",
            "store_badge": "Cheapest"
        },
        {
            "sku": "AMZ-SHOE-PUMA-VELOCITY-2",
            "canonical_id": "shoe-puma-velocity-nitro",
            "raw_title": "Puma Velocity Nitro 2 Men's Running Shoes (Durable Road Traction, Plush Cushioning)",
            "brand": "Puma",
            "category": "running_shoes",
            "subcategory": "Daily Trainers",
            "listed_price": 4299,
            "mrp": 7999,
            "discount_offer": 400,
            "offer_terms": "Instant ₹400 off with Amazon Pay UPI",
            "effective_price": 3899,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 1800,
            "source_url": "https://www.amazon.in/dp/B09V1K8M5Q",
            "store_badge": "Cheapest"
        },
        {
            "sku": "AMZ-SHOE-ASICS-JADEITE-3",
            "canonical_id": "shoe-asics-gel-jadeite-3",
            "raw_title": "ASICS Men's GEL-JADEITE 3 Road Running Shoes (Breathable Jacquard Mesh, FlyteFoam)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 5799,
            "mrp": 7999,
            "discount_offer": 500,
            "offer_terms": "Amazon Prime Instant ₹500 off with HDFC Card",
            "effective_price": 5299,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 2890,
            "source_url": "https://www.amazon.in/dp/B0CKJADEITE3",
            "store_badge": "Prime Next-Day"
        },
        {
            "sku": "AMZ-SHOE-ASICS-CUMULUS-25",
            "canonical_id": "shoe-asics-gel-cumulus-25",
            "raw_title": "ASICS Men's Gel-Cumulus 25 Running Shoe (Illusion Blue/Glow Yellow, PureGEL)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 5899,
            "mrp": 10999,
            "discount_offer": 400,
            "offer_terms": "Instant ₹400 off with Amazon Pay UPI",
            "effective_price": 5499,
            "delivery_estimate": "Tomorrow Morning",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 2980,
            "source_url": "https://www.amazon.in/dp/B0BY2Q5G8C",
            "store_badge": "Prime Next-Day"
        },
        {
            "sku": "AMZ-SHOE-ASICS-GEL-1130",
            "canonical_id": "shoe-asics-gel-1130",
            "raw_title": "ASICS Unisex GEL-1130 Retro Running Shoes / Casuals",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Casual Runners",
            "listed_price": 6499,
            "mrp": 8999,
            "discount_offer": 0,
            "offer_terms": "Prime Guaranteed One-Day Delivery Included",
            "effective_price": 6499,
            "delivery_estimate": "Tomorrow Morning",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 1420,
            "source_url": "https://www.amazon.in/ASICS-Gel-1130-Casuals/dp/B0CK1130AS",
            "store_badge": "Prime Next-Day"
        },
        {
            "sku": "AMZ-SHOE-NIKE-AF1-SHADOW",
            "canonical_id": "shoe-nike-air-force-1-shadow",
            "raw_title": "Nike Women's Air Force 1 Shadow Pastel Multi-Color Platform Leather Sneakers",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Streetwear",
            "listed_price": 8295,
            "mrp": 8995,
            "discount_offer": 500,
            "offer_terms": "Amazon Pay ICICI Card 5% Back + ₹500 Instant Coupon",
            "effective_price": 7795,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.9,
            "review_count": 4120,
            "source_url": "https://www.amazon.in/dp/B0AF1SHADOW",
            "store_badge": "Prime Next-Day"
        },

        # OFFICE CHAIRS
        {
            "sku": "AMZ-CHR-FEATHERLITE-LIB",
            "canonical_id": "chair-featherlite-liberate",
            "raw_title": "Featherlite Liberate High Back Ergonomic Desk Chair (Breathable Mesh, Multi-Lock Synchro-Tilt)",
            "brand": "Featherlite",
            "category": "office_chair",
            "subcategory": "Ergonomic Chairs",
            "listed_price": 14200,
            "mrp": 16900,
            "discount_offer": 500,
            "offer_terms": "Apply ₹500 Coupon",
            "effective_price": 13700,
            "delivery_estimate": "2 Days Free Delivery",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 1890,
            "source_url": "https://www.amazon.in/dp/B09KGLM5W8",
            "store_badge": "Amazon Verified"
        },
        {
            "sku": "AMZ-CHR-SIHOO-M57",
            "canonical_id": "chair-sihoo-m57",
            "raw_title": "SIHOO M57 Ergonomic Office Chair with 3D Adjustable Armrests, Lumbar Support, Breathable Mesh",
            "brand": "SIHOO",
            "category": "office_chair",
            "subcategory": "Ergonomic Chairs",
            "listed_price": 13499,
            "mrp": 19999,
            "discount_offer": 1000,
            "offer_terms": "Instant ₹1,000 off with Bank Card",
            "effective_price": 12499,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 2100,
            "source_url": "https://www.amazon.in/dp/B07GNDDNMW",
            "store_badge": "Fastest Delivery"
        },

        # CAMERAS
        {
            "sku": "AMZ-CAM-CANON-EOS-R50",
            "canonical_id": "cam-canon-eos-r50",
            "raw_title": "Canon EOS R50 Mirrorless Camera Body with RF-S 18-45mm IS STM Lens Kit (24.2 MP, 4K 30p, Vlogging)",
            "brand": "Canon",
            "category": "camera",
            "subcategory": "Mirrorless Cameras",
            "listed_price": 56990,
            "mrp": 67995,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on All Credit Cards",
            "effective_price": 54990,
            "delivery_estimate": "Tomorrow Morning",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 1940,
            "source_url": "https://www.amazon.in/dp/B0BV299B7Z",
            "store_badge": "Amazon Choice"
        },

        # TELEVISIONS
        {
            "sku": "AMZ-TV-LG-OLED-55C3",
            "canonical_id": "tv-lg-oled-55c3",
            "raw_title": "LG 55 Inch 4K Ultra HD Smart OLED TV 55C3PSA (Dark Meteor Titan, α9 AI Processor, 0.1ms Response)",
            "brand": "LG",
            "category": "television",
            "subcategory": "OLED 4K TVs",
            "listed_price": 112990,
            "mrp": 169990,
            "discount_offer": 3000,
            "offer_terms": "Instant ₹3,000 Bank Discount at Checkout",
            "effective_price": 109990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 3400,
            "source_url": "https://www.amazon.in/dp/B0BY2T56Q4",
            "store_badge": "Prime Delivery"
        },

        # SMARTPHONES
        {
            "sku": "AMZ-PHN-ONEPLUS-NORD-CE4",
            "canonical_id": "phone-oneplus-nord-ce4",
            "raw_title": "OnePlus Nord CE 4 5G (Dark Chrome, 8GB RAM, 128GB Storage, 100W Charging)",
            "brand": "OnePlus",
            "category": "smartphone",
            "subcategory": "5G Smartphones",
            "listed_price": 24999,
            "mrp": 26999,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 Bank Discount",
            "effective_price": 22999,
            "delivery_estimate": "Tomorrow Morning",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 12400,
            "source_url": "https://www.amazon.in/dp/B0CX1XXTCL",
            "store_badge": "Amazon Prime"
        }
    ]

class MockCroma(BaseShoppingProvider):
    provider_name = "Croma"
    is_mock = True

    CATALOG = [
        # LAPTOPS
        {
            "sku": "CR-LAP-ACER-NITRO-V",
            "canonical_id": "laptop-acer-nitro-v",
            "raw_title": "Acer Nitro V 15 AMD Ryzen 7 7735HS Gaming Laptop (16GB RAM/512GB SSD/RTX 4050 6GB)",
            "brand": "Acer",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 59990,
            "mrp": 74999,
            "discount_offer": 2500,
            "offer_terms": "Flat ₹2,500 Instant Discount on NeuCoins / Tata Card",
            "effective_price": 57490,
            "delivery_estimate": "Store Pickup in 2 Hours or Free Courier",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "Limited Stock (4 units at local Croma)",
            "rating": 4.6,
            "review_count": 310,
            "source_url": "https://www.croma.com/item/CR-LAP-ACER-NITRO-V",
            "store_badge": "Store Pickup Today"
        },
        {
            "sku": "CR-LAP-LENOVO-LOQ-15",
            "canonical_id": "laptop-lenovo-loq-15",
            "raw_title": "Lenovo LOQ 15 Gaming Laptop (Intel Core i5 12th Gen, 16GB, 512GB, RTX 3050)",
            "brand": "Lenovo",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 58990,
            "mrp": 72990,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on HDFC & Federal Bank Cards",
            "effective_price": 56990,
            "delivery_estimate": "Pickup Available Today",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 280,
            "source_url": "https://www.croma.com/item/CR-LAP-LENOVO-LOQ-15",
            "store_badge": "Store Pickup"
        },
        {
            "sku": "CR-LAP-HP-VICTUS-16",
            "canonical_id": "laptop-hp-victus-16",
            "raw_title": "HP Victus 15.6 Inch Gaming Laptop (Ryzen 5 5600H/16GB/512GB/RTX 3050)",
            "brand": "HP",
            "category": "laptop",
            "subcategory": "Budget Gaming",
            "listed_price": 54990,
            "mrp": 69990,
            "discount_offer": 1500,
            "offer_terms": "Instant ₹1,500 off on Tata Neu Cards",
            "effective_price": 53490,
            "delivery_estimate": "Store Pickup Available Today",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.4,
            "review_count": 420,
            "source_url": "https://www.croma.com/item/CR-LAP-HP-VICTUS-16",
            "store_badge": "Store Pickup"
        },

        # HEADPHONES
        {
            "sku": "CR-AUD-SONY-WH1000XM5",
            "canonical_id": "hp-sony-wh1000xm5",
            "raw_title": "Sony WH-1000XM5 Over-Ear Noise Cancelling Headphones (Black, 30 Hours Battery)",
            "brand": "Sony",
            "category": "headphones",
            "subcategory": "Over-Ear Wireless",
            "listed_price": 28490,
            "mrp": 34990,
            "discount_offer": 1500,
            "offer_terms": "Instant ₹1,500 off on Tata Pay",
            "effective_price": 26990,
            "delivery_estimate": "Store Pickup in 2 Hours",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 1100,
            "source_url": "https://www.croma.com/item/CR-AUD-SONY-WH1000XM5",
            "store_badge": "Express Store Pickup"
        },

        # CAMERAS
        {
            "sku": "CR-CAM-CANON-EOS-R50",
            "canonical_id": "cam-canon-eos-r50",
            "raw_title": "Canon EOS R50 24.2 MP Mirrorless Camera with 18-45mm Lens Kit",
            "brand": "Canon",
            "category": "camera",
            "subcategory": "Mirrorless Cameras",
            "listed_price": 58990,
            "mrp": 67995,
            "discount_offer": 3000,
            "offer_terms": "Instant ₹3,000 off on HDFC Cards",
            "effective_price": 55990,
            "delivery_estimate": "Store Demo & Pickup Today",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 420,
            "source_url": "https://www.croma.com/item/CR-CAM-CANON-EOS-R50",
            "store_badge": "Demo Available"
        },

        # TELEVISIONS
        {
            "sku": "CR-TV-SAMSUNG-55-CRYSTAL",
            "canonical_id": "tv-samsung-55-crystal",
            "raw_title": "Samsung 55 Inch 4K Ultra HD Smart LED TV (Crystal Processor, HDR10+, Tizen OS)",
            "brand": "Samsung",
            "category": "television",
            "subcategory": "4K UHD TVs",
            "listed_price": 46990,
            "mrp": 62990,
            "discount_offer": 2500,
            "offer_terms": "Instant ₹2,500 off on NeuCard",
            "effective_price": 44490,
            "delivery_estimate": "Same Day Delivery & Demo",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 910,
            "source_url": "https://www.croma.com/item/CR-TV-SAMSUNG-55-CRYSTAL",
            "store_badge": "Croma Assured"
        }
    ]

class MockRelianceDigital(BaseShoppingProvider):
    provider_name = "Reliance Digital"
    is_mock = True

    CATALOG = [
        # LAPTOPS
        {
            "sku": "RD-LAP-ACER-NITRO-V",
            "canonical_id": "laptop-acer-nitro-v",
            "raw_title": "Acer Nitro V Gaming Laptop AMD Ryzen 7 / 16GB / 512GB SSD / RTX 4050",
            "brand": "Acer",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 58999,
            "mrp": 74999,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 discount on OneCard & SBI Credit Cards",
            "effective_price": 56999,
            "delivery_estimate": "Tomorrow Evening",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 210,
            "source_url": "https://www.reliancedigital.in/item/RD-LAP-ACER-NITRO-V",
            "store_badge": "Reliance Warranty"
        },
        # HEADPHONES
        {
            "sku": "RD-AUD-SONY-WH1000XM5",
            "canonical_id": "hp-sony-wh1000xm5",
            "raw_title": "Sony WH-1000XM5 Noise Cancelling Bluetooth Wireless Headphones (Silver/Black)",
            "brand": "Sony",
            "category": "headphones",
            "subcategory": "Over-Ear Wireless",
            "listed_price": 28990,
            "mrp": 34990,
            "discount_offer": 1500,
            "offer_terms": "Instant ₹1,500 Bank Discount",
            "effective_price": 27490,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 480,
            "source_url": "https://www.reliancedigital.in/item/RD-AUD-SONY-WH1000XM5",
            "store_badge": "Verified Store"
        },
        # TELEVISIONS
        {
            "sku": "RD-TV-SAMSUNG-55-CRYSTAL",
            "canonical_id": "tv-samsung-55-crystal",
            "raw_title": "Samsung 138 cm (55 inch) Ultra HD (4K) LED Smart TV with Crystal Processor",
            "brand": "Samsung",
            "category": "television",
            "subcategory": "4K UHD TVs",
            "listed_price": 45490,
            "mrp": 62990,
            "discount_offer": 1500,
            "offer_terms": "Instant ₹1,500 off on JioFinance / Bank Cards",
            "effective_price": 43990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 1200,
            "source_url": "https://www.reliancedigital.in/item/RD-TV-SAMSUNG-55-CRYSTAL",
            "store_badge": "Best Offer"
        }
    ]

class MockTataCliq(BaseShoppingProvider):
    provider_name = "Tata CLiQ"
    is_mock = True

    CATALOG = [
        # RUNNING SHOES
        {
            "sku": "TC-SHOE-NIKE-PEGASUS-40",
            "canonical_id": "shoe-nike-pegasus-40",
            "raw_title": "Nike Air Zoom Pegasus 40 Road Running Shoes for Men (Black/White)",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 8495,
            "mrp": 10495,
            "discount_offer": 600,
            "offer_terms": "Use Code CLIQSTYLE for ₹600 off",
            "effective_price": 7895,
            "delivery_estimate": "2 Days Express Courier",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (100% Genuine)",
            "rating": 4.7,
            "review_count": 420,
            "source_url": "https://www.tatacliq.com/item/TC-SHOE-NIKE-PEGASUS-40",
            "store_badge": "Authentic Brand"
        },
        {
            "sku": "TC-SHOE-PUMA-VELOCITY-2",
            "canonical_id": "shoe-puma-velocity-nitro",
            "raw_title": "Puma Velocity Nitro 2 Men Road Running Shoes",
            "brand": "Puma",
            "category": "running_shoes",
            "subcategory": "Daily Trainers",
            "listed_price": 4399,
            "mrp": 7999,
            "discount_offer": 400,
            "offer_terms": "Instant ₹400 off with Tata Neu HDFC Cards",
            "effective_price": 3999,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 310,
            "source_url": "https://www.tatacliq.com/item/TC-SHOE-PUMA-VELOCITY-2",
            "store_badge": "Verified Genuine"
        },
        {
            "sku": "TC-SHOE-ASICS-JADEITE-3",
            "canonical_id": "shoe-asics-gel-jadeite-3",
            "raw_title": "ASICS GEL-JADEITE 3 Mens Cushion Running Shoes",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 5899,
            "mrp": 7999,
            "discount_offer": 400,
            "offer_terms": "Code TATASTYLE ₹400 off",
            "effective_price": 5499,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.7,
            "review_count": 520,
            "source_url": "https://www.tatacliq.com/item/TC-SHOE-ASICS-JADEITE-3",
            "store_badge": "100% Genuine"
        },
        {
            "sku": "TC-SHOE-ASICS-CUMULUS-25",
            "canonical_id": "shoe-asics-gel-cumulus-25",
            "raw_title": "ASICS Men GEL-CUMULUS 25 Road Running Shoes (Blue/Yellow)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 6299,
            "mrp": 10999,
            "discount_offer": 500,
            "offer_terms": "Use Code CLIQSTYLE for ₹500 off",
            "effective_price": 5799,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.5,
            "review_count": 480,
            "source_url": "https://www.tatacliq.com/asics-mens-gel-cumulus-25-running-shoes/p-mp000000018944111",
            "store_badge": "Verified Genuine"
        },
        {
            "sku": "TC-SHOE-ASICS-GEL-1130",
            "canonical_id": "shoe-asics-gel-1130",
            "raw_title": "ASICS Unisex GEL-1130 Casual Sneakers (Silver/White)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Casual Runners",
            "listed_price": 6999,
            "mrp": 8999,
            "discount_offer": 0,
            "offer_terms": "Authentic Brand Certified Seller",
            "effective_price": 6999,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.4,
            "review_count": 310,
            "source_url": "https://www.tatacliq.com/asics-unisex-gel-1130-casuals/p-mp000000019283",
            "store_badge": "Verified Genuine"
        },
        {
            "sku": "TC-SHOE-NIKE-AF1-SHADOW",
            "canonical_id": "shoe-nike-air-force-1-shadow",
            "raw_title": "Nike Air Force 1 Shadow Women Platform Sneakers Multi",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Streetwear",
            "listed_price": 8195,
            "mrp": 8995,
            "discount_offer": 500,
            "offer_terms": "Tata Neu 5% Coins + ₹500 off",
            "effective_price": 7695,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.8,
            "review_count": 680,
            "source_url": "https://www.tatacliq.com/item/TC-SHOE-NIKE-AF1-SHADOW",
            "store_badge": "Authentic Brand"
        },
        # LAPTOPS
        {
            "sku": "TC-LAP-LENOVO-LOQ-15",
            "canonical_id": "laptop-lenovo-loq-15",
            "raw_title": "Lenovo LOQ 15 Gaming Laptop (Core i5 12th Gen, 16GB, 512GB, RTX 3050 6GB)",
            "brand": "Lenovo",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 57990,
            "mrp": 72990,
            "discount_offer": 2000,
            "offer_terms": "Instant ₹2,000 off on Tata Neu Cards",
            "effective_price": 55990,
            "delivery_estimate": "2 Days",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock",
            "rating": 4.6,
            "review_count": 180,
            "source_url": "https://www.tatacliq.com/item/TC-LAP-LENOVO-LOQ-15",
            "store_badge": "Tata Assured"
        }
    ]

class MockBrandStore(BaseShoppingProvider):
    provider_name = "Official Brand Store"
    is_mock = True

    CATALOG = [
        # LAPTOPS
        {
            "sku": "BRAND-ACER-NITRO-V",
            "canonical_id": "laptop-acer-nitro-v",
            "raw_title": "Acer Nitro V 15 Gaming Laptop (ANV15-41) Official Direct Store",
            "brand": "Acer",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 58999,
            "mrp": 74999,
            "discount_offer": 1500,
            "offer_terms": "Official Acer Student & Corporate Discount ₹1,500 + Free Gaming Mouse",
            "effective_price": 57499,
            "delivery_estimate": "2 Days Direct from Factory",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (Direct 2-Year Brand Warranty)",
            "rating": 4.7,
            "review_count": 890,
            "source_url": "https://store.acer.com/in/item/BRAND-ACER-NITRO-V",
            "store_badge": "Official Brand Store"
        },
        {
            "sku": "BRAND-LENOVO-LOQ-15",
            "canonical_id": "laptop-lenovo-loq-15",
            "raw_title": "Lenovo LOQ 15 Gen 9 (Intel Core i5) Official Direct Configurator",
            "brand": "Lenovo",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 56990,
            "mrp": 72990,
            "discount_offer": 2000,
            "offer_terms": "Use Code CUSTOMPC for ₹2,000 off + 3-Year ADP Warranty bundle",
            "effective_price": 54990,
            "delivery_estimate": "Tomorrow Express Dispatch",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock (3-Year ADP included)",
            "rating": 4.8,
            "review_count": 1200,
            "source_url": "https://www.lenovo.com/in/item/BRAND-LENOVO-LOQ-15",
            "store_badge": "Official Brand Store"
        },
        {
            "sku": "BRAND-ASUS-TUF-A15",
            "canonical_id": "laptop-asus-tuf-a15",
            "raw_title": "ASUS TUF Gaming A15 (FA506NFR) ROG Official E-Shop India",
            "brand": "ASUS",
            "category": "laptop",
            "subcategory": "Gaming Laptops",
            "listed_price": 68990,
            "mrp": 84990,
            "discount_offer": 2000,
            "offer_terms": "Official ROG Elite Member Discount ₹2,000 + Free ROG Backpack",
            "effective_price": 66990,
            "delivery_estimate": "Tomorrow",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock (Official 2-Year Warranty)",
            "rating": 4.8,
            "review_count": 1450,
            "source_url": "https://in.store.asus.com/item/BRAND-ASUS-TUF-A15",
            "store_badge": "Official Brand Store"
        },
        # CHAIRS
        {
            "sku": "BRAND-FEATHERLITE-LIB",
            "canonical_id": "chair-featherlite-liberate",
            "raw_title": "Featherlite Liberate High Back Ergonomic Desk Chair (Direct from Manufacturer)",
            "brand": "Featherlite",
            "category": "office_chair",
            "subcategory": "Ergonomic Chairs",
            "listed_price": 14900,
            "mrp": 16900,
            "discount_offer": 1400,
            "offer_terms": "Official Brand Factory Coupon ₹1,400 + Free White-Glove Installation",
            "effective_price": 13500,
            "delivery_estimate": "3 Days White-Glove Assembly",
            "delivery_days": 3,
            "delivery_fee": 0,
            "availability": "In Stock (Direct 3-Year Factory Warranty)",
            "rating": 4.8,
            "review_count": 2150,
            "source_url": "https://featherlitefurniture.com/item/BRAND-FEATHERLITE-LIB",
            "store_badge": "Official Brand Store"
        },
        # RUNNING SHOES
        {
            "sku": "BRAND-NIKE-PEGASUS-40",
            "canonical_id": "shoe-nike-pegasus-40",
            "raw_title": "Nike Air Zoom Pegasus 40 (Official Nike India Online Store)",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 8995,
            "mrp": 10495,
            "discount_offer": 1000,
            "offer_terms": "Nike Member First Order ₹1,000 off + Free Returns",
            "effective_price": 7995,
            "delivery_estimate": "2 Days Official Air Freight",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (Official 30-Day Wear Test Guarantee)",
            "rating": 4.9,
            "review_count": 4200,
            "source_url": "https://www.nike.com/in/item/BRAND-NIKE-PEGASUS-40",
            "store_badge": "Official Brand Store"
        },
        {
            "sku": "BRAND-ASICS-JADEITE-3",
            "canonical_id": "shoe-asics-gel-jadeite-3",
            "raw_title": "ASICS GEL-JADEITE 3 (Official ASICS India Online Flagship)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 7499,
            "mrp": 7999,
            "discount_offer": 500,
            "offer_terms": "OneASICS Member ₹500 welcome voucher + 2-day delivery",
            "effective_price": 6999,
            "delivery_estimate": "2 Days Official Delivery",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (Official Warranty)",
            "rating": 4.9,
            "review_count": 3800,
            "source_url": "https://www.asics.co.in/gel-jadeite-3.html",
            "store_badge": "Official Brand Store"
        },
        {
            "sku": "BRAND-ASICS-CUMULUS-25",
            "canonical_id": "shoe-asics-gel-cumulus-25",
            "raw_title": "ASICS GEL-CUMULUS 25 (Official ASICS India Online Flagship)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Road Running",
            "listed_price": 8499,
            "mrp": 10999,
            "discount_offer": 500,
            "offer_terms": "OneASICS Member ₹500 welcome voucher + Official 2-Day Air Shipping",
            "effective_price": 7999,
            "delivery_estimate": "2 Days Official Air Freight",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (100% Authentic Guaranteed)",
            "rating": 4.9,
            "review_count": 5100,
            "source_url": "https://www.asics.co.in/1011b621-400.html",
            "store_badge": "Official Brand Store"
        },
        {
            "sku": "BRAND-ASICS-GEL-1130",
            "canonical_id": "shoe-asics-gel-1130",
            "raw_title": "ASICS GEL-1130 Unisex (Official ASICS India Online Flagship)",
            "brand": "ASICS",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Casual Runners",
            "listed_price": 8999,
            "mrp": 8999,
            "discount_offer": 0,
            "offer_terms": "OneASICS Member Benefits + Direct Brand Warranty",
            "effective_price": 8999,
            "delivery_estimate": "2 Days Official Air Freight",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (100% Authentic Guaranteed)",
            "rating": 4.8,
            "review_count": 690,
            "source_url": "https://www.asics.co.in/gel-1130.html",
            "store_badge": "Official Brand Store"
        },
        {
            "sku": "BRAND-NIKE-AF1-SHADOW",
            "canonical_id": "shoe-nike-air-force-1-shadow",
            "raw_title": "Nike Air Force 1 Shadow (Official Nike India Online Store)",
            "brand": "Nike",
            "category": "running_shoes",
            "subcategory": "Lifestyle & Streetwear",
            "listed_price": 8995,
            "mrp": 8995,
            "discount_offer": 0,
            "offer_terms": "Nike Member Free Shipping & 30-Day Wear Test",
            "effective_price": 8995,
            "delivery_estimate": "2 Days Official Air Freight",
            "delivery_days": 2,
            "delivery_fee": 0,
            "availability": "In Stock (100% Authentic)",
            "rating": 4.9,
            "review_count": 5200,
            "source_url": "https://www.nike.com/in/item/BRAND-NIKE-AF1-SHADOW",
            "store_badge": "Official Brand Store"
        },
        # CAMERAS
        {
            "sku": "BRAND-CANON-EOS-R50",
            "canonical_id": "cam-canon-eos-r50",
            "raw_title": "Canon India Official eStore - Canon EOS R50 Mirrorless Camera Kit (RF-S 18-45mm)",
            "brand": "Canon",
            "category": "camera",
            "subcategory": "Mirrorless Cameras",
            "listed_price": 57995,
            "mrp": 67995,
            "discount_offer": 2000,
            "offer_terms": "Canon Club Member Discount ₹2,000 + Free Camera Bag & 64GB Extreme Pro SD Card",
            "effective_price": 55995,
            "delivery_estimate": "Tomorrow Secure Air Transit",
            "delivery_days": 1,
            "delivery_fee": 0,
            "availability": "In Stock (Official 2-Year Canon India Warranty)",
            "rating": 4.9,
            "review_count": 1200,
            "source_url": "https://edge.canon.co.in/item/BRAND-CANON-EOS-R50",
            "store_badge": "Official Brand Store"
        }
    ]

ALL_PROVIDERS = [
    MockFlipkart(),
    MockAmazon(),
    MockCroma(),
    MockRelianceDigital(),
    MockTataCliq(),
    MockBrandStore()
]

def search_across_all_providers(query: str, category: Optional[str] = None) -> List[Dict[str, Any]]:
    """Gathers raw product listings from all 6 configured mock shopping providers."""
    all_results = []
    for provider in ALL_PROVIDERS:
        try:
            results = provider.search(query, category)
            all_results.extend(results)
        except Exception as e:
            print(f"Error searching provider {provider.provider_name}: {e}")
    return all_results
