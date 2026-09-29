from typing import List, Dict, Any
from datetime import datetime

MOCK_PRODUCTS = [
    {
        "canonical_id": "laptop-acer-nitro-v",
        "title": "Acer Nitro V Gaming Laptop (AMD Ryzen 7 7735HS, RTX 4050 6GB, 16GB DDR5, 512GB SSD, 144Hz)",
        "brand": "Acer",
        "category": "gaming laptop",
        "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&auto=format&fit=crop&q=60",
        "specifications": {
            "Processor": "AMD Ryzen 7 7735HS",
            "Graphics": "NVIDIA GeForce RTX 4050 (6GB GDDR6)",
            "RAM": "16 GB DDR5 4800MHz",
            "Storage": "512 GB PCIe Gen4 SSD",
            "Display": "15.6\" FHD 144Hz IPS",
            "Weight": "2.1 kg"
        },
        "rating": 4.5,
        "best_price": 57990,
        "badge": "Best Value",
        "score": 9.4,
        "score_reasons": [
            "Cheapest RTX 4050 option with 16GB DDR5 memory",
            "Excellent cooling architecture with dual fans",
            "Meets all user constraints under ₹60,000"
        ],
        "offers": [
            {
                "provider": "Amazon",
                "price": 57990,
                "original_price": 74999,
                "currency": "INR",
                "shipping": "Free Prime Delivery by Tomorrow",
                "availability": "In Stock",
                "source_url": "https://amazon.in",
                "rating": 4.5,
                "review_count": 840,
                "fetched_at": "Just now"
            },
            {
                "provider": "Flipkart",
                "price": 58490,
                "original_price": 74999,
                "currency": "INR",
                "shipping": "Free 2-Day Delivery",
                "availability": "In Stock",
                "source_url": "https://flipkart.com",
                "rating": 4.4,
                "review_count": 520,
                "fetched_at": "Just now"
            },
            {
                "provider": "Croma",
                "price": 59990,
                "original_price": 76999,
                "currency": "INR",
                "shipping": "Same-day Store Pickup",
                "availability": "In Stock (3 left)",
                "source_url": "https://croma.com",
                "rating": 4.6,
                "review_count": 130,
                "fetched_at": "5 mins ago"
            }
        ]
    },
    {
        "canonical_id": "laptop-lenovo-loq-15",
        "title": "Lenovo LOQ 15 Gaming Laptop (12th Gen Intel Core i5-12450HX, RTX 3050 6GB, 16GB RAM, 512GB SSD)",
        "brand": "Lenovo",
        "category": "gaming laptop",
        "image": "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=60",
        "specifications": {
            "Processor": "Intel Core i5-12450HX",
            "Graphics": "NVIDIA GeForce RTX 3050 (6GB GDDR6, 95W TGP)",
            "RAM": "16 GB DDR5",
            "Storage": "512 GB NVMe SSD",
            "Display": "15.6\" FHD 144Hz 100% sRGB",
            "Weight": "2.4 kg"
        },
        "rating": 4.6,
        "best_price": 56990,
        "badge": "Best Overall",
        "score": 9.2,
        "score_reasons": [
            "Superior 100% sRGB display color accuracy",
            "High 95W TGP for optimal graphics performance",
            "Military-grade MIL-STD-810H durability"
        ],
        "offers": [
            {
                "provider": "Lenovo Store",
                "price": 56990,
                "original_price": 72990,
                "currency": "INR",
                "shipping": "Free Express Shipping",
                "availability": "In Stock",
                "source_url": "https://lenovo.com",
                "rating": 4.7,
                "review_count": 310,
                "fetched_at": "Just now"
            },
            {
                "provider": "Amazon",
                "price": 57490,
                "original_price": 72990,
                "currency": "INR",
                "shipping": "Free Delivery by Wednesday",
                "availability": "In Stock",
                "source_url": "https://amazon.in",
                "rating": 4.5,
                "review_count": 1150,
                "fetched_at": "Just now"
            }
        ]
    },
    {
        "canonical_id": "laptop-asus-tuf-a15",
        "title": "ASUS TUF Gaming A15 (AMD Ryzen 5 7535HS, RTX 3050 4GB, 16GB RAM, 512GB SSD, 90WHr Battery)",
        "brand": "ASUS",
        "category": "gaming laptop",
        "image": "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=60",
        "specifications": {
            "Processor": "AMD Ryzen 5 7535HS",
            "Graphics": "NVIDIA GeForce RTX 3050 (4GB GDDR6)",
            "RAM": "16 GB DDR5 5600MHz",
            "Storage": "512 GB PCIe 4.0 SSD",
            "Display": "15.6\" FHD 144Hz Adaptive-Sync",
            "Battery": "Huge 90WHr Battery"
        },
        "rating": 4.4,
        "best_price": 54990,
        "badge": "Cheapest",
        "score": 8.9,
        "score_reasons": [
            "Lowest upfront cost with dedicated RTX graphics",
            "Massive 90Wh battery offering up to 7 hours endurance",
            "Sturdy build quality"
        ],
        "offers": [
            {
                "provider": "Flipkart",
                "price": 54990,
                "original_price": 69990,
                "currency": "INR",
                "shipping": "Free Delivery by Tomorrow",
                "availability": "In Stock",
                "source_url": "https://flipkart.com",
                "rating": 4.4,
                "review_count": 2100,
                "fetched_at": "Just now"
            },
            {
                "provider": "Amazon",
                "price": 55990,
                "original_price": 69990,
                "currency": "INR",
                "shipping": "Free Prime Delivery",
                "availability": "In Stock",
                "source_url": "https://amazon.in",
                "rating": 4.4,
                "review_count": 1850,
                "fetched_at": "10 mins ago"
            }
        ]
    },
    {
        "canonical_id": "laptop-hp-victus-15",
        "title": "HP Victus Gaming Laptop (12th Gen Intel Core i5-12450H, RTX 3050 4GB, 16GB RAM, 512GB SSD)",
        "brand": "HP",
        "category": "gaming laptop",
        "image": "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&auto=format&fit=crop&q=60",
        "specifications": {
            "Processor": "Intel Core i5-12450H",
            "Graphics": "NVIDIA GeForce RTX 3050 (4GB GDDR6)",
            "RAM": "16 GB DDR4 3200MHz",
            "Storage": "512 GB Gen4 SSD",
            "Display": "15.6\" FHD 144Hz Anti-Glare",
            "Weight": "2.29 kg"
        },
        "rating": 4.3,
        "best_price": 58990,
        "badge": None,
        "score": 8.6,
        "score_reasons": [
            "Clean understated design suitable for work & gaming",
            "OMEN Gaming Hub optimization suite",
            "Reliable HP service network"
        ],
        "offers": [
            {
                "provider": "Amazon",
                "price": 58990,
                "original_price": 72000,
                "currency": "INR",
                "shipping": "Free Delivery",
                "availability": "In Stock",
                "source_url": "https://amazon.in",
                "rating": 4.3,
                "review_count": 920,
                "fetched_at": "Just now"
            }
        ]
    }
]

MOCK_FLIGHTS = [
    {
        "id": "flight-indigo-6e5012",
        "type": "flight",
        "provider": "IndiGo",
        "logo": "✈️ IndiGo",
        "origin": "DEL (Delhi T2)",
        "destination": "BOM (Mumbai T1)",
        "departure": "18:15",
        "arrival": "20:30",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "baggage": "Cabin: 7kg | Check-in: 15kg",
        "price": 4250,
        "currency": "INR",
        "rating": 4.5,
        "badge": "Best Overall",
        "score": 9.6,
        "score_reasons": [
            "Perfect evening departure time (18:15)",
            "Direct Non-stop flight (2h 15m)",
            "Highest on-time arrival performance (91%)"
        ],
        "source_url": "https://goindigo.in",
        "fetched_at": "Live API"
    },
    {
        "id": "flight-akasa-qp1104",
        "type": "flight",
        "provider": "Akasa Air",
        "logo": "✈️ Akasa",
        "origin": "DEL (Delhi T2)",
        "destination": "BOM (Mumbai T2)",
        "departure": "19:00",
        "arrival": "21:20",
        "duration": "2h 20m",
        "stops": "Non-stop",
        "baggage": "Cabin: 7kg | Check-in: 15kg",
        "price": 3899,
        "currency": "INR",
        "rating": 4.6,
        "badge": "Cheapest",
        "score": 9.5,
        "score_reasons": [
            "Lowest verified fare in your selected time window",
            "Modern Boeing 737 MAX aircraft with USB-C ports",
            "Free cafe booking perks"
        ],
        "source_url": "https://akasaair.com",
        "fetched_at": "Live API"
    },
    {
        "id": "flight-airindia-ai805",
        "type": "flight",
        "provider": "Air India",
        "logo": "✈️ Air India",
        "origin": "DEL (Delhi T3)",
        "destination": "BOM (Mumbai T2)",
        "departure": "17:30",
        "arrival": "19:40",
        "duration": "2h 10m",
        "stops": "Non-stop",
        "baggage": "Cabin: 8kg | Check-in: 25kg (Included)",
        "price": 4850,
        "currency": "INR",
        "rating": 4.4,
        "badge": "Fastest",
        "score": 9.1,
        "score_reasons": [
            "Shortest flight duration (2h 10m)",
            "Generous 25kg check-in baggage included for free",
            "Complimentary hot meal on board"
        ],
        "source_url": "https://airindia.com",
        "fetched_at": "Live API"
    },
    {
        "id": "flight-vistara-uk995",
        "type": "flight",
        "provider": "Vistara",
        "logo": "✈️ Vistara",
        "origin": "DEL (Delhi T3)",
        "destination": "BOM (Mumbai T2)",
        "departure": "20:00",
        "arrival": "22:15",
        "duration": "2h 15m",
        "stops": "Non-stop",
        "baggage": "Cabin: 7kg | Check-in: 15kg",
        "price": 4650,
        "currency": "INR",
        "rating": 4.7,
        "badge": None,
        "score": 9.0,
        "score_reasons": [
            "Full service experience with premium in-flight dining",
            "Departure from flagship Terminal 3"
        ],
        "source_url": "https://airvistara.com",
        "fetched_at": "Live API"
    }
]
