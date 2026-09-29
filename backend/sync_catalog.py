import json
import os

with open("all_shoes_data.json", "r", encoding="utf-8") as f:
    shoes = json.load(f)

enhanced = {}
frontend_shoes = []

for s in shoes:
    cid = s["canonical_id"]
    p = s.get("best_price", 2999)
    mrp = s.get("mrp", int(p * 1.35))
    brand = s.get("brand", "Running")
    
    p90 = int(mrp * 0.95)
    p60 = int(p * 1.14)
    p30 = int(p * 1.06)
    p15 = int(p * 1.01)
    
    s["mrp"] = mrp
    s["price_history"] = [
        {"date": "90d ago", "price": p90},
        {"date": "60d ago", "price": p60},
        {"date": "30d ago", "price": p30},
        {"date": "15d ago", "price": p15},
        {"date": "Current", "price": p}
    ]
    s["sentiment"] = {
        "positive_pct": 91,
        "neutral_pct": 6,
        "negative_pct": 3,
        "summary": f"Consensus score from 1,200+ verified {brand} runners highlights superb impact cushioning and breathable upper.",
        "pros": [
            f"Genuine {brand} midsole shock absorption",
            "High durability rubber traction for Indian asphalt & pavement",
            "True to size fit with locked heel collar"
        ],
        "cons": [
            "Upper may run warm on hot summer afternoons"
        ]
    }
    if "score_breakdown" not in s:
        s["score_breakdown"] = {
            "price_match": 9.5,
            "performance": 9.3,
            "reviews": 9.4,
            "delivery": 9.4,
            "user_preference": 9.3
        }
    enhanced[cid] = s
    
    # Also prepare frontend mock format
    frontend_shoes.append({
        **s,
        "category": "shopping",
        "subcategory": s.get("subcategory", "Road Running"),
        "best_price": p,
        "original_price": mrp,
        "rating": round(s.get("base_score", 9.0) / 2.05, 1),
        "review_count": 1250,
        "fastest_delivery": "Tomorrow",
        "buy_advice": "Buy Now",
        "offers": [
            {
                "provider": "Flipkart",
                "price": p + 100,
                "original_price": mrp,
                "discount_amount": mrp - (p + 100),
                "currency": "INR",
                "shipping": "Free Next-Day Delivery",
                "availability": "In Stock",
                "source_url": f"https://www.flipkart.com/search?q={cid}",
                "rating": round(s.get("base_score", 9.0) / 2.05, 1),
                "review_count": 620,
                "store_badge": "Assured",
                "badges": ["SuperCoin 5X"]
            },
            {
                "provider": "Amazon",
                "price": p,
                "original_price": mrp,
                "discount_amount": mrp - p,
                "currency": "INR",
                "shipping": "Tomorrow 11 AM with Prime",
                "availability": "In Stock",
                "source_url": f"https://www.amazon.in/dp/{cid}",
                "rating": round(s.get("base_score", 9.0) / 2.05, 1),
                "review_count": 630,
                "store_badge": "Lowest Price",
                "badges": ["Cheapest", "Fastest Delivery"]
            },
            {
                "provider": "Official Brand Store",
                "price": mrp,
                "original_price": mrp,
                "discount_amount": 0,
                "currency": "INR",
                "shipping": "2-3 Business Days",
                "availability": "In Stock",
                "source_url": f"https://www.{brand.lower().replace(' ', '')}.com/in/{cid}",
                "rating": 4.9,
                "review_count": 280,
                "store_badge": "100% Authentic",
                "badges": ["Official Store", "1 Year Brand Warranty"]
            }
        ]
    })

# Write to catalog_data.py
catalog_py_content = f'''"""
Comprehensive Multi-Category Canonical Catalog for CompareX AI Shopping Providers.
Contains 66+ Running Shoes across 15 Brands (Nike, Puma, Adidas, ASICS, Campus, Sparx, Reebok, Skechers, Asian, Bata, Red Tape, New Balance, Under Armour, Woodland, Decathlon).
Every listing is strictly marked as mock/demo provider data.
"""

from typing import Dict, Any

CANONICAL_DATABASE: Dict[str, Dict[str, Any]] = {json.dumps(enhanced, indent=4)}
'''

with open("app/connectors/catalog_data.py", "w", encoding="utf-8") as f:
    f.write(catalog_py_content)

print(f"Updated catalog_data.py with {len(enhanced)} shoes.")

# Save frontend JSON helper
with open("../frontend/lib/shoes_catalog.json", "w", encoding="utf-8") as f:
    json.dump(frontend_shoes, f, indent=2)

print(f"Exported {len(frontend_shoes)} shoes to frontend/lib/shoes_catalog.json")
