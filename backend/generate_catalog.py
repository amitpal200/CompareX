import json

SHOES = [
    # --- NIKE (7) ---
    {
        "canonical_id": "shoe-nike-downshifter-12",
        "title": "Nike Downshifter 12 Lightweight Road Running Shoes (Midfoot Support Band)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Running, Morning Jogging, Gym Training",
            "Sole": "Super-Soft Phylon Foam with Full Rubber Outsole",
            "Material": "Lightweight Open-Cell Mesh for Active Ventilation",
            "Weight": "270 g",
            "Drop": "9.5 mm Heel-to-Toe Drop",
            "Color": "Black / White / Smoke Grey",
            "Terrain": "Road & Track"
        },
        "base_score": 9.3,
        "best_price": 3195,
        "mrp": 4295,
        "badge": "Popular Choice",
        "score_reasons": [
            "Exceptional entry-level Nike road runner priced comfortably under ₹3,500",
            "Fit band across midfoot works with laces to lock your foot securely",
            "Full-length durable rubber outsole prevents premature tread wear"
        ],
        "trade_offs": [
            "Cushioning is firm Phylon rather than soft React/ZoomX foam.",
            "Not optimized for marathon distances above 15km."
        ]
    },
    {
        "canonical_id": "shoe-nike-revolution-7",
        "title": "Nike Revolution 7 Road Running Shoes (Soft Foam Midsole, Roomier Forefoot)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, 3km-8km Sessions, Casual Fitness",
            "Sole": "Molded EVA Foam with Generative Rubber Traction",
            "Material": "Knit Breathable Textile Upper",
            "Weight": "280 g",
            "Drop": "10 mm",
            "Color": "Midnight Navy / White",
            "Terrain": "Tarmac, Sidewalks, Treadmill"
        },
        "base_score": 9.2,
        "best_price": 2795,
        "mrp": 3695,
        "badge": "Best Value",
        "score_reasons": [
            "Widened forefoot box allows toes to splay naturally",
            "Puffy heel collar prevents Achilles chafing during long workouts",
            "Reliable everyday workhorse priced well under ₹3,000"
        ],
        "trade_offs": [
            "Sole flexibility is moderate rather than race-springy.",
            "Outsole grip can slip on smooth wet tile surfaces."
        ]
    },
    {
        "canonical_id": "shoe-nike-pegasus-40",
        "title": "Nike Air Zoom Pegasus 40 Daily Road Running Shoes (React Foam, Dual Zoom Air)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Workhorse Road Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Road Running, 5km to Full Marathon Training",
            "Sole": "Full-Length Nike React Foam with Forefoot & Heel Zoom Air Units",
            "Material": "Single-Layer Engineered Breathable Mesh",
            "Weight": "288 g",
            "Drop": "10 mm",
            "Color": "Black / White / University Red",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.7,
        "best_price": 7895,
        "mrp": 10495,
        "badge": "Best Overall",
        "score_reasons": [
            "The industry benchmark for road running durability (800+ km lifespan)",
            "Dual Zoom Air pockets deliver snappy energetic bounce",
            "Exceptional comfort across all types of foot arches"
        ],
        "trade_offs": [
            "Higher price tag compared to entry level trainers.",
            "Runs slightly warm in hot summer afternoons."
        ]
    },
    {
        "canonical_id": "shoe-nike-winflo-10",
        "title": "Nike Winflo 10 Neutral Road Running Shoes (Cushlon Foam + Full-Length Air)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Cushioned Daily Running",
        "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k-15k Road Training, High Arch Support",
            "Sole": "Cushlon Foam with Full-Length Nike Air Unit",
            "Material": "Engineered Breathable Jacquard Mesh",
            "Weight": "285 g",
            "Drop": "10 mm",
            "Color": "White / Light Smoke Grey / Laser Orange",
            "Terrain": "Road & Track"
        },
        "base_score": 9.4,
        "best_price": 5495,
        "mrp": 7495,
        "badge": "High Cushion",
        "score_reasons": [
            "Full-length Air unit provides cloud-like landings on hard pavement",
            "More toe room than previous generation for natural toe splay",
            "Cushlon foam midsole softens impact on knees"
        ],
        "trade_offs": [
            "Stack height feels plush, less ground feel for sprinting.",
            "Weight is slightly higher at 285 grams."
        ]
    },
    {
        "canonical_id": "shoe-nike-quest-5",
        "title": "Nike Quest 5 Road Running Shoes (Supersoft Foam, Neutral Ride)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, Fitness Jogging, 5km Sessions",
            "Sole": "Elevated Soft Foam Midsole with Waffle Rubber Tread",
            "Material": "Translucent Engineered Mesh across Forefoot",
            "Weight": "265 g",
            "Drop": "9 mm",
            "Color": "Black / Metallic Silver",
            "Terrain": "Road & Asphalt"
        },
        "base_score": 9.3,
        "best_price": 3895,
        "mrp": 5295,
        "badge": "Best Value",
        "score_reasons": [
            "Supersoft foam through the midsole provides a smooth step-in feel",
            "Translucent mesh windows deliver targeted cooling on hot runs",
            "Priced under ₹4,000 for genuine Nike performance"
        ],
        "trade_offs": [
            "Outsole rubber is thinner at the midfoot arch.",
            "Midfoot band is snug for wide feet."
        ]
    },
    {
        "canonical_id": "shoe-nike-air-max-alpha",
        "title": "Nike Air Max Alpha Trainer 5 (Max Air Heel Unit, Flat Wide Base)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Cross-Training & Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Gym Workouts, Treadmill Cardio, Short Road Runs",
            "Sole": "Max Air Heel Cushioning Unit with Broad Stable Rubber Base",
            "Material": "Durable Mesh with Rubber Lateral Wrap",
            "Weight": "310 g",
            "Drop": "8 mm",
            "Color": "Iron Grey / Bright Crimson / Black",
            "Terrain": "Gym Floor, Track & Road"
        },
        "base_score": 9.4,
        "best_price": 4995,
        "mrp": 6495,
        "badge": "Gym & Road",
        "score_reasons": [
            "Visible Max Air bubble provides firm heel stabilization under load",
            "Broad flat base prevents ankle rolling during fast side cuts",
            "Rugged rubber wrap resists abrasion from gym equipment"
        ],
        "trade_offs": [
            "Firmer sole designed for gym stability over soft marathon jogging.",
            "Weighs 310g."
        ]
    },
    {
        "canonical_id": "shoe-nike-react-infinity-3",
        "title": "Nike React Infinity Run Flyknit 3 (Injury Prevention Rocker, React Foam)",
        "brand": "Nike",
        "category": "running_shoes",
        "subcategory": "Injury Prevention",
        "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "High-Mileage Marathon Prep, Knee Impact Reduction",
            "Sole": "High-Stack Nike React Foam with Wide Base Rocker Geometry",
            "Material": "Flyknit Breathable Stretchy Upper with Flywire",
            "Weight": "290 g",
            "Drop": "9 mm",
            "Color": "Racer Blue / White / Chile Red",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.6,
        "best_price": 9495,
        "mrp": 13995,
        "badge": "Joint Protection",
        "score_reasons": [
            "Rocker shaped React foam propels stride effortlessly while protecting knees",
            "Wide base geometry reduces excessive foot pronation",
            "Flyknit upper holds foot seamlessly with zero pressure points"
        ],
        "trade_offs": [
            "Premium price point (₹9,495).",
            "Firm plastic heel clip can feel stiff if sizing isn't exact."
        ]
    },

    # --- PUMA (7) ---
    {
        "canonical_id": "shoe-puma-velocity-nitro",
        "title": "Puma Velocity Nitro 2 Lightweight Road Running Shoes (NITRO Foam, PUMAGRIP)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Road Running, 5km to 10km Tempo Training",
            "Sole": "NITRO Foam Infused Cushioning + PROFOAM LITE Layer",
            "Material": "Plush Engineered Breathable Mesh",
            "Weight": "257 g",
            "Drop": "10 mm Heel-to-Toe Drop",
            "Color": "Electro Lime / Puma Black",
            "Terrain": "Road, Pavement, Treadmill"
        },
        "base_score": 9.6,
        "best_price": 3899,
        "mrp": 7999,
        "badge": "Best For You",
        "score_reasons": [
            "Undisputed #1 value daily running trainer under ₹4,000 in India",
            "PUMAGRIP outsole delivers industry-leading traction in wet and dry conditions",
            "Nitrogen-infused foam provides plush bounce while safeguarding joints"
        ],
        "trade_offs": [
            "Forefoot fit is slightly snug for wide feet (consider sizing up a half step).",
            "Plush mesh upper runs warm during peak afternoon runs."
        ]
    },
    {
        "canonical_id": "shoe-puma-electrify-nitro-3",
        "title": "Puma Electrify Nitro 3 Road Running Shoes (NITRO Heel Pod, PROFOAMLITE)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, Beginner to Intermediate Road Runners",
            "Sole": "Dual Midsole: Nitrogen-Infused NITRO Heel Pod + PROFOAMLITE",
            "Material": "Engineered Mesh with Rolled Collar",
            "Weight": "260 g",
            "Drop": "10 mm",
            "Color": "Royal Blue / Lime Sizzle",
            "Terrain": "Road & Treadmill"
        },
        "base_score": 9.5,
        "best_price": 3399,
        "mrp": 6499,
        "badge": "Best Value",
        "score_reasons": [
            "Delivers Puma's elite NITRO cushioning at a budget-friendly ₹3,399 price point",
            "PUMAGRIP outsole ensures you never slip in rainy monsoon morning runs",
            "Rolled heel collar locks the Achilles comfortably with zero blistering"
        ],
        "trade_offs": [
            "NITRO foam is positioned in heel rather than full length.",
            "Upper is slightly stiff for the first 10 kilometers."
        ]
    },
    {
        "canonical_id": "shoe-puma-transport-modern",
        "title": "Puma Transport Modern Road Running Shoes (Softride Foam, Full Rubber Outsole)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 3k-5k Running, Gym Warmup, Everyday Jogging",
            "Sole": "Softride Cushion Foam with Full-Coverage Rubber Outsole",
            "Material": "Clean Breathable Mesh with Synthetic Eyestay",
            "Weight": "272 g",
            "Drop": "9.5 mm",
            "Color": "Puma Black / High Risk Red",
            "Terrain": "Road, Treadmill, Park Track"
        },
        "base_score": 9.2,
        "best_price": 2099,
        "mrp": 3999,
        "badge": "Budget Pick",
        "score_reasons": [
            "Sub-₹2,100 entry to genuine Puma running lineage",
            "Full-coverage rubber bottom ensures long-lasting durability on city roads",
            "Softride footbed provides all-day cushioning"
        ],
        "trade_offs": [
            "Does not feature the nitrogen-infused foam found in Nitro models.",
            "Standard tongue instead of gusseted wrap."
        ]
    },
    {
        "canonical_id": "shoe-puma-softride-rift",
        "title": "Puma Softride Rift Slip-On Running Shoes (SoftFoam+ Comfort Sockliner)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Slip-On Running",
        "image": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Jogging, Walking, Easy 5k Running",
            "Sole": "Softride Ultra-Plush EVA Midsole with Zonal Rubber Pods",
            "Material": "Breathable Slip-On Bootie Knit",
            "Weight": "245 g",
            "Drop": "9 mm",
            "Color": "Castlerock / High Risk Red",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.3,
        "best_price": 2499,
        "mrp": 4999,
        "badge": "Easy Slip-On",
        "score_reasons": [
            "Laceless slip-on bootie design allows 3-second step-in convenience",
            "SoftFoam+ dual-density insole cushions heel and arch effortlessly",
            "Sub-250g weight feels like wearing a feather"
        ],
        "trade_offs": [
            "Slip-on collar provides less lateral lockdown for fast cornering.",
            "Zonal rubber pads rather than full-length rubber bottom."
        ]
    },
    {
        "canonical_id": "shoe-puma-scend-pro",
        "title": "Puma Scend Pro Road Running Shoes (PROFOAM LITE, Protread Rubber)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k-10k Running, Treadmill Training",
            "Sole": "PROFOAM LITE High-Rebound EVA with Protread Rubber",
            "Material": "Ventilated Engineered Mesh Upper",
            "Weight": "268 g",
            "Drop": "10 mm",
            "Color": "Puma Navy / Fizzy Lime",
            "Terrain": "Road & Track"
        },
        "base_score": 9.3,
        "best_price": 2899,
        "mrp": 5499,
        "badge": "Best Value",
        "score_reasons": [
            "ProFoam Lite provides responsive spring back on every push-off",
            "Protread zoned rubber handles wet asphalt reliably",
            "Priced under ₹3,000 for serious everyday training"
        ],
        "trade_offs": [
            "Sole is slightly firm out of the box.",
            "Arch support is standard."
        ]
    },
    {
        "canonical_id": "shoe-puma-flyer-runner",
        "title": "Puma Flyer Runner Mesh Daily Running Shoes (SoftFoam+ Optimal Comfort)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Morning Jogging, Daily Steps, Fitness Walking",
            "Sole": "Smooth EVA Midsole with Heel and Toe Rubber Pods",
            "Material": "Custom Mesh Fabric with Clean Puma Formstrip",
            "Weight": "250 g",
            "Drop": "8.5 mm",
            "Color": "Puma Black / Puma White",
            "Terrain": "Road & Park Tracks"
        },
        "base_score": 9.1,
        "best_price": 1899,
        "mrp": 3499,
        "badge": "Budget Pick",
        "score_reasons": [
            "Best-selling Puma entry shoe in India with 20,000+ verified ratings",
            "Featherlight 250g chassis prevents foot tiredness",
            "Clean silhouette transitions from morning runs to casual wear"
        ],
        "trade_offs": [
            "EVA midsole compresses after ~450km.",
            "Not meant for competitive speed training."
        ]
    },
    {
        "canonical_id": "shoe-puma-deviate-nitro-2",
        "title": "Puma Deviate Nitro 2 Carbon-Plated Marathon Racer (INNOPLATE, NITRO Elite)",
        "brand": "Puma",
        "category": "running_shoes",
        "subcategory": "Carbon-Plated Racer",
        "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Marathon Racing, Fast Tempo Runs, Race Day PB",
            "Sole": "Dual NITRO Elite Supercritical Foam + Carbon Composite INNOPLATE",
            "Material": "Ultra-Breathable Racing Monomesh with PWRTAPE Support",
            "Weight": "258 g",
            "Drop": "8 mm",
            "Color": "Sun Stream / Sunset Glow",
            "Terrain": "Road Racing & Track"
        },
        "base_score": 9.8,
        "best_price": 9999,
        "mrp": 15999,
        "badge": "Carbon Plated PB",
        "score_reasons": [
            "Carbon composite INNOPLATE acts as a springboard for maximum forward propulsion",
            "Supercritical NITRO Elite foam provides world-record caliber energy return",
            "PUMAGRIP outsole ensures perfect cornering in wet road race conditions"
        ],
        "trade_offs": [
            "High performance race pricing (~₹9,999).",
            "Stiff carbon plate requires good running form and cadence."
        ]
    },

    # --- ADIDAS (7) ---
    {
        "canonical_id": "shoe-adidas-duramo-speed",
        "title": "Adidas Duramo Speed Running Shoes with LIGHTSTRIKE Cushioning",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Speed & Daily Training",
        "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Tempo Runs, Daily 5k-10k Road Training",
            "Sole": "Full-Length Lightstrike EVA Foam with Adiwear Rubber",
            "Material": "Engineered Breathable Mesh (50% Recycled Content)",
            "Weight": "265 g",
            "Drop": "9.5 mm",
            "Color": "Lucid Cyan / Core Black / Solar Red",
            "Terrain": "Road & Asphalt"
        },
        "base_score": 9.5,
        "best_price": 3699,
        "mrp": 6999,
        "badge": "Best Value",
        "score_reasons": [
            "Features premium Lightstrike foam typically reserved for ₹8,000+ race models",
            "Snappy energy return makes speed workouts and daily 5km runs effortless",
            "Adiwear heavy-abrasion rubber withstands rough Indian tarmac"
        ],
        "trade_offs": [
            "Lightstrike foam has a slightly firmer, responsive ride rather than marshmallow plush.",
            "Tongue is thin and racing-styled, requiring flat lacing."
        ]
    },
    {
        "canonical_id": "shoe-adidas-galaxy-6",
        "title": "Adidas Galaxy 6 Road Running Shoes (Cloudfoam Midsole, OrthoLite Sockliner)",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Easy Runs, Treadmill, All-Day Walking",
            "Sole": "Cloudfoam Cushioned Midsole with Non-Marking Rubber",
            "Material": "Air Mesh Upper with TPU Eyestay Reinforcements",
            "Weight": "290 g",
            "Drop": "10 mm",
            "Color": "Core Black / Cloud White",
            "Terrain": "Road, Gym, Treadmill"
        },
        "base_score": 9.2,
        "best_price": 2399,
        "mrp": 4999,
        "badge": "Best Value",
        "score_reasons": [
            "Cloudfoam delivers step-in cloud-like softness from day one",
            "OrthoLite antimicrobial sockliner absorbs sweat and prevents foot odor",
            "Incredible value under ₹2,500 after multi-store card discounts"
        ],
        "trade_offs": [
            "Heavier weight (290g) than tempo shoes.",
            "Cushioning compresses after 400km of continuous heavy usage."
        ]
    },
    {
        "canonical_id": "shoe-adidas-runfalcon-3",
        "title": "Adidas Runfalcon 3.0 Road Running Shoes (Cloudfoam Midsole, Textile Lining)",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Road Jogging, 5k Training, All-Day Fitness",
            "Sole": "Cloudfoam Shock-Absorbing Midsole with Rubber Outsole",
            "Material": "Breathable Textile Upper with Recycled Material",
            "Weight": "275 g",
            "Drop": "9 mm",
            "Color": "Core Black / Carbon / Lucid Lemon",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.3,
        "best_price": 2599,
        "mrp": 4599,
        "badge": "Best Value",
        "score_reasons": [
            "Among the best-selling running models in India for price-to-performance",
            "Soft Cloudfoam midsole absorbs street vibrations reliably",
            "Durable rubber outsole delivers predictable grip across wet tarmac"
        ],
        "trade_offs": [
            "Upper knit is slightly less flexible around wide midfoots.",
            "Not meant for competitive half-marathon pace below 4:30 min/km."
        ]
    },
    {
        "canonical_id": "shoe-adidas-ultraboost-light",
        "title": "Adidas Ultraboost Light Running Shoes (Light BOOST Foam, Continental Rubber)",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Premium Energy Return",
        "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Long Distance Road Running, Recovery Jogging, All-Day Comfort",
            "Sole": "Light BOOST Foam (30% Lighter) + Continental Rubber Outsole",
            "Material": "PRIMEKNIT+ Textile Upper",
            "Weight": "295 g",
            "Drop": "10 mm",
            "Color": "Core Black / Cloud White",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.6,
        "best_price": 11899,
        "mrp": 17999,
        "badge": "Energy Return",
        "score_reasons": [
            "Legendary BOOST energy return now 30% lighter with zero joint fatigue",
            "Continental rubber outsole provides the highest wet-weather grip in the industry",
            "PRIMEKNIT upper hugs foot like a tailored sock"
        ],
        "trade_offs": [
            "Premium price tier (₹11,899).",
            "Not suited for muddy trail conditions."
        ]
    },
    {
        "canonical_id": "shoe-adidas-fluidflow-2",
        "title": "Adidas Fluidflow 2.0 Road Running Shoes (Bounce Midsole, Circular Knit)",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km-10km Running, Gym, Walking",
            "Sole": "Bounce Springy Midsole with Synthetic Outsole",
            "Material": "Breathable Circular-Knit Textile",
            "Weight": "270 g",
            "Drop": "9.5 mm",
            "Color": "Core Black / Solar Red",
            "Terrain": "Road & Treadmill"
        },
        "base_score": 9.3,
        "best_price": 3199,
        "mrp": 5999,
        "badge": "Bounce Cushion",
        "score_reasons": [
            "Adidas Bounce cushioning provides springy toe-off acceleration",
            "Adaptive circular knit upper expands naturally with your foot heat",
            "Solid balance of aesthetics and running performance under ₹3,200"
        ],
        "trade_offs": [
            "Outsole has rubber inserts rather than full rubber sheet.",
            "Arch contouring is medium."
        ]
    },
    {
        "canonical_id": "shoe-adidas-supernova-stride",
        "title": "Adidas Supernova Stride Daily Running Shoes (Dreamstrike+ Super Foam, Adiwear)",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Max Comfort Daily",
        "image": "https://images.unsplash.com/photo-1512374382149-233c42b6a83b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k to Half Marathon Training, Impact Reduction",
            "Sole": "Dreamstrike+ Super Foam Forefoot Cushioning + Carrier EVA",
            "Material": "Sandwich Engineered Mesh with Padded Heel",
            "Weight": "270 g",
            "Drop": "10 mm",
            "Color": "Preloved Blue / Lucid Lemon",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.5,
        "best_price": 5999,
        "mrp": 9999,
        "badge": "Top Rated",
        "score_reasons": [
            "Dreamstrike+ PEBA-based super foam softens forefoot landing pressure",
            "Heel pillow wrap cradles the Achilles tendon securely",
            "Durable Adiwear rubber prevents wear on abrasive city roads"
        ],
        "trade_offs": [
            "Moderate price tier (~₹5,999).",
            "Cushioning is tuned for daily pace rather than sprint intervals."
        ]
    },
    {
        "canonical_id": "shoe-adidas-response-runner",
        "title": "Adidas Response Runner Shoes (Lightweight EVA Cushioning, Mesh Upper)",
        "brand": "Adidas",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Morning Walks, Casual 3km Jogging, Everyday Steps",
            "Sole": "Full EVA Midsole with Rubber Traction Outsole",
            "Material": "Lightweight Mesh with Heat-Pressed 3-Stripes",
            "Weight": "260 g",
            "Drop": "9 mm",
            "Color": "Cloud White / Core Black",
            "Terrain": "Road & Gym"
        },
        "base_score": 9.1,
        "best_price": 1999,
        "mrp": 3599,
        "badge": "Budget Pick",
        "score_reasons": [
            "Authentic Adidas heritage priced under ₹2,000",
            "Featherlight 260g build keeps legs fresh throughout the day",
            "Durable full-length rubber tread for daily walking"
        ],
        "trade_offs": [
            "Basic EVA foam without premium energy return compounds.",
            "Heel collar padding is standard."
        ]
    },

    # --- ASICS (6) ---
    {
        "canonical_id": "shoe-asics-gel-contend-8b",
        "title": "ASICS Gel-Contend 8B Running Shoes (Rearfoot GEL Technology, AmpliFoam)",
        "brand": "ASICS",
        "category": "running_shoes",
        "subcategory": "Neutral Road Running",
        "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, Neutral Foot Striders, Heel-Striker Joint Protection",
            "Sole": "Rearfoot GEL Cushioning Unit + AmpliFoam Midsole",
            "Material": "Jacquard Breathable Mesh with Internal Heel Counter",
            "Weight": "278 g",
            "Drop": "10 mm",
            "Color": "French Blue / Electric Lime",
            "Terrain": "Road, Track, Pavement"
        },
        "base_score": 9.5,
        "best_price": 3399,
        "mrp": 4999,
        "badge": "Best Joint Protection",
        "score_reasons": [
            "ASICS proprietary Rearfoot GEL absorbs shock and reduces knee impact on pavement",
            "Internal heel counter locks the calcaneus bone firmly to eliminate ankle roll",
            "Solid AmpliFoam compound offers longevity far exceeding basic EVA"
        ],
        "trade_offs": [
            "Rearfoot GEL focuses shock protection at the heel; midfoot runners feel less bounce.",
            "Classic ASICS aesthetics may feel traditional to minimalist runners."
        ]
    },
    {
        "canonical_id": "shoe-asics-jolt-4",
        "title": "ASICS Jolt 4 Daily Road Running Shoes (AmpliFoam Cushioning, Stitched Toe Cap)",
        "brand": "ASICS",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Jogging, Fitness Walking, Weekend 10ks",
            "Sole": "AmpliFoam Shock Absorber with Solid Rubber Outsole",
            "Material": "Engineered Mesh with Stitched Synthetic Overlays",
            "Weight": "268 g",
            "Drop": "10 mm",
            "Color": "Black / White / Hazard Green",
            "Terrain": "Road & Paved Paths"
        },
        "base_score": 9.3,
        "best_price": 2699,
        "mrp": 3999,
        "badge": "Best Value",
        "score_reasons": [
            "Stitched toe cap reinforcement prevents mesh tearing from toe friction",
            "AmpliFoam cushioning provides balanced durability without bottoming out",
            "Sub-₹3,000 price point makes genuine ASICS engineering accessible"
        ],
        "trade_offs": [
            "Does not feature the flagship silicone GEL unit found in the Contend/Nimbus line.",
            "Sole is slightly firm out of the box until 20km break-in."
        ]
    },
    {
        "canonical_id": "shoe-asics-gel-nimbus-26",
        "title": "ASICS Gel-Nimbus 26 Premium Maximum Cushioning Road Running Shoes",
        "brand": "ASICS",
        "category": "running_shoes",
        "subcategory": "Max Cushion Daily Trainer",
        "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Long Recovery Runs, Half/Full Marathon Training, Maximum Joint Protection",
            "Sole": "FF BLAST PLUS ECO Cushioning with PureGEL Technology",
            "Material": "Engineered Knit Upper with Soft Stretchy Knit Collar",
            "Weight": "304 g",
            "Drop": "8 mm",
            "Color": "Black / Pure Silver",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.7,
        "best_price": 13899,
        "mrp": 16999,
        "badge": "Max Cushion",
        "score_reasons": [
            "Unrivaled maximum cushioning cloud feel for long 15km-30km distance training",
            "PureGEL silicone inserts provide 65% softer landings than standard EVA",
            "Engineered knit collar creates a glove-like premium ankle wrap"
        ],
        "trade_offs": [
            "Premium price point (₹13,899).",
            "Slightly heavier stack (304g) designed for comfort over tempo racing."
        ]
    },
    {
        "canonical_id": "shoe-asics-gt-1000-12",
        "title": "ASICS GT-1000 12 Pronation Stability Running Shoes (LITETRUSS, FlyteFoam)",
        "brand": "ASICS",
        "category": "running_shoes",
        "subcategory": "Stability & Joint Support",
        "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running for Over-Pronators, Flat Feet, Ankle Joint Support",
            "Sole": "LITETRUSS Medial Support + Rearfoot GEL + FlyteFoam",
            "Material": "Engineered Mesh with External Heel Clutch",
            "Weight": "270 g",
            "Drop": "8 mm",
            "Color": "Sheet Rock / Pure Silver",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.5,
        "best_price": 5999,
        "mrp": 8999,
        "badge": "Over-Pronation Fix",
        "score_reasons": [
            "LITETRUSS system prevents inward foot rolling and knee strain",
            "FlyteFoam compound stays resilient and lightweight",
            "Recommended by physical therapists for runners with flat arches"
        ],
        "trade_offs": [
            "Slightly firmer medial arch side to prevent collapse.",
            "Not needed for runners with neutral or high arches."
        ]
    },
    {
        "canonical_id": "shoe-asics-gel-kayano-30",
        "title": "ASICS Gel-Kayano 30 Flagship Stability Marathon Shoes (4D Guidance System)",
        "brand": "ASICS",
        "category": "running_shoes",
        "subcategory": "Flagship Stability",
        "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Full Marathon Distance, Maximum Stability, Extreme Joint Relief",
            "Sole": "4D Guidance System + PureGEL + FF BLAST PLUS ECO (40mm Stack)",
            "Material": "Stretch Engineered Knit with Padded Tongue",
            "Weight": "303 g",
            "Drop": "10 mm",
            "Color": "Black / Glow Yellow",
            "Terrain": "Road & Asphalt"
        },
        "base_score": 9.8,
        "best_price": 12499,
        "mrp": 15999,
        "badge": "Flagship Stability",
        "score_reasons": [
            "Revolutionary 4D Guidance System dynamically corrects stride as leg fatigue sets in",
            "Deep FF BLAST PLUS ECO stack absorbs 70% of road vibration",
            "The undisputed king of long-distance stability running in the world"
        ],
        "trade_offs": [
            "Flagship price investment (₹12,499).",
            "High stack is built for protection, not sprint track spikes."
        ]
    },
    {
        "canonical_id": "shoe-asics-patriot-13",
        "title": "ASICS Patriot 13 Road Running Shoes (EVA Cushioning, Mesh Upper)",
        "brand": "ASICS",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 3k-5k Running, Morning Jogging, Treadmill",
            "Sole": "Bouncy EVA Midsole with Full Molded Rubber Outsole",
            "Material": "Breathable Mesh Upper with Reinforced Eyelets",
            "Weight": "260 g",
            "Drop": "10 mm",
            "Color": "Directoire Blue / White",
            "Terrain": "Road & Park Track"
        },
        "base_score": 9.2,
        "best_price": 2299,
        "mrp": 3499,
        "badge": "Budget Pick",
        "score_reasons": [
            "Entry ASICS road shoe priced at an accessible ₹2,299",
            "Reinforced stitching on toe seams prevents mesh splitting",
            "Full rubber outsole delivers predictable traction in dust and moisture"
        ],
        "trade_offs": [
            "Does not have silicone GEL pads.",
            "Cushioning is firmer out of the box."
        ]
    },

    # --- CAMPUS (6) ---
    {
        "canonical_id": "shoe-campus-north-plus",
        "title": "Campus North Plus Men's Running Shoes (PilloFoam Cushioning, Anti-Skid Phylon)",
        "brand": "Campus",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 3k-5k Running, Morning Walks, High Durability",
            "Sole": "PilloFoam Shock Absorption with Anti-Skid Phylon Outsole",
            "Material": "High-Density Breathable Knitted Upper",
            "Weight": "265 g",
            "Drop": "9 mm",
            "Color": "Triple Black / Neon Accent",
            "Terrain": "Rough Tarmac, Concrete, Dirt Tracks"
        },
        "base_score": 9.1,
        "best_price": 1399,
        "mrp": 2299,
        "badge": "Cheapest",
        "score_reasons": [
            "Priced under ₹1,500 making it the most affordable daily road runner",
            "Phylon sole withstands uneven stones and rough Indian roads without puncture",
            "Machine washable with quick-drying breathable knit"
        ],
        "trade_offs": [
            "Foam is less bouncy on high-speed sprint workouts.",
            "Insole lacks premium arch contouring for severe over-pronators."
        ]
    },
    {
        "canonical_id": "shoe-campus-ogs-runner",
        "title": "Campus OGS Lightweight Daily Running Shoes (Adaptive Fit, Nitrofly Sole)",
        "brand": "Campus",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Road Jogging, Gym, College & Running",
            "Sole": "Nitrofly Lightweight EVA Outsole",
            "Material": "Knitted Stretch Mesh Upper",
            "Weight": "248 g",
            "Drop": "8 mm",
            "Color": "Slate Grey / Bright Orange",
            "Terrain": "Road & Gym Floor"
        },
        "base_score": 9.0,
        "best_price": 1199,
        "mrp": 1999,
        "badge": "Cheapest",
        "score_reasons": [
            "Incredible price point at ₹1,199",
            "Sub-250g construction provides remarkable agility",
            "Sock-like collar fits snugly around ankle with zero hot spots"
        ],
        "trade_offs": [
            "Outsole has no rubber pods; sole wear occurs faster on abrasive roads.",
            "Designed for sub-5km distances rather than half marathons."
        ]
    },
    {
        "canonical_id": "shoe-campus-first-running",
        "title": "Campus First Men's Road Running Shoes (Springy Phylon Cushion, Mesh Upper)",
        "brand": "Campus",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Cardio, Morning Jogging, Fitness",
            "Sole": "High-Density Springy Phylon Sole with Grip Pods",
            "Material": "Mesh Upper with Moulded TPU Heel Counter",
            "Weight": "270 g",
            "Drop": "9 mm",
            "Color": "Navy Blue / Sky Blue",
            "Terrain": "Road & Concrete"
        },
        "base_score": 9.1,
        "best_price": 1499,
        "mrp": 2499,
        "badge": "Best Value",
        "score_reasons": [
            "Moulded TPU heel cage keeps foot locked in place during runs",
            "Resilient Phylon foam absorbs heavy heel strikes without flattening",
            "Great looks and rugged reliability under ₹1,500"
        ],
        "trade_offs": [
            "Slightly firm ride for runners wanting cloud-like bounce.",
            "Heavier than minimalist shoes."
        ]
    },
    {
        "canonical_id": "shoe-campus-dragon-sneaker",
        "title": "Campus Dragon Running Shoes with Air Capsule Tech (Bounce Bubble, Mesh)",
        "brand": "Campus",
        "category": "running_shoes",
        "subcategory": "Air Cushion Running",
        "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, Gym, Casual Athleisure",
            "Sole": "Translucent Air Capsule in Heel with Anti-Skid Rubber",
            "Material": "Sublimated Knitted Mesh Upper",
            "Weight": "285 g",
            "Drop": "10 mm",
            "Color": "Black / Metallic Gold / Red",
            "Terrain": "Road & Gym"
        },
        "base_score": 9.2,
        "best_price": 1699,
        "mrp": 2799,
        "badge": "Air Capsule",
        "score_reasons": [
            "Visible air cushion pod in the heel provides noticeable shock absorption",
            "Attractive sporty design with metallic accents",
            "Sub-₹1,700 pricing makes air-sole technology affordable"
        ],
        "trade_offs": [
            "Air capsule is tuned for moderate jogging, not 20km long runs.",
            "Weight is 285g."
        ]
    },
    {
        "canonical_id": "shoe-campus-rodeo-pro",
        "title": "Campus Rodeo Pro Lightweight Jogging Shoes (Memory Tech Insole)",
        "brand": "Campus",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 3km Runs, Morning Walks, High Reps",
            "Sole": "Lightweight Injection EVA Sole",
            "Material": "Breathable Polyester Mesh",
            "Weight": "240 g",
            "Drop": "8 mm",
            "Color": "Dark Grey / Orange",
            "Terrain": "Road & Park Tracks"
        },
        "base_score": 9.0,
        "best_price": 1099,
        "mrp": 1799,
        "badge": "Cheapest",
        "score_reasons": [
            "Ultra-budget option priced near ₹1,000",
            "Featherweight 240g build allows nimble movement",
            "Breathable mesh keeps feet cool in hot weather"
        ],
        "trade_offs": [
            "Sole life is ~350km on rough tarmac.",
            "Minimalist arch support."
        ]
    },
    {
        "canonical_id": "shoe-campus-hurricane",
        "title": "Campus Hurricane Running Shoes (Tubular Cushioning, Phylon Outsole)",
        "brand": "Campus",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Jogging, Fitness Walks",
            "Sole": "Tubular Hollow-Sole Cushioning Phylon",
            "Material": "Jacquard Weave Mesh Upper",
            "Weight": "260 g",
            "Drop": "9 mm",
            "Color": "All Black / Lime",
            "Terrain": "Road & Tarmac"
        },
        "base_score": 9.1,
        "best_price": 1299,
        "mrp": 2199,
        "badge": "Cheapest",
        "score_reasons": [
            "Hollow tubular sole compresses and springs back on impact",
            "Durable tread withstands abrasive pavements",
            "Great styling and comfort at ₹1,299"
        ],
        "trade_offs": [
            "Sole cavity can catch small pebbles on dirt roads.",
            "Moderate flexibility."
        ]
    },

    # --- SPARX (5) ---
    {
        "canonical_id": "shoe-sparx-sm-678",
        "title": "Sparx SM-678 High Durability Road Running Shoes (TPR Traction Outsole)",
        "brand": "Sparx",
        "category": "running_shoes",
        "subcategory": "Rugged Road Running",
        "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Outdoor Road Running, Rough Tarmac, Daily Morning Cardio",
            "Sole": "Dual-Density EVA Midsole with TPR Rubber Outsole",
            "Material": "Reinforced Synthetic Mesh with Toe Guard",
            "Weight": "295 g",
            "Drop": "10 mm",
            "Color": "Navy Blue / Fluorescent Yellow",
            "Terrain": "All-Terrain (Road, Gravel, Dirt)"
        },
        "base_score": 9.0,
        "best_price": 1199,
        "mrp": 1699,
        "badge": "Rugged Durability",
        "score_reasons": [
            "Unbeatable rugged durability for Indian conditions (survives gravel and water)",
            "TPR rubber outsole provides firm grip on wet asphalt and dust",
            "Extremely budget friendly at ₹1,199"
        ],
        "trade_offs": [
            "Slightly heavier (295g) with firmer ride.",
            "Breathability is moderate compared to open-cell knit uppers."
        ]
    },
    {
        "canonical_id": "shoe-sparx-sm-734",
        "title": "Sparx SM-734 High-Grip Road Running Shoes (Phylon Midsole, Slip-Resistant)",
        "brand": "Sparx",
        "category": "running_shoes",
        "subcategory": "Rugged Road Running",
        "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Running, Rough Surfaces, Concrete Walks",
            "Sole": "Cushioned Phylon Midsole with Rubber Outsole Lugs",
            "Material": "Mesh with Synthetic Leather Support Straps",
            "Weight": "290 g",
            "Drop": "9.5 mm",
            "Color": "Black / Electric Blue",
            "Terrain": "Road & Dirt Track"
        },
        "base_score": 9.1,
        "best_price": 1399,
        "mrp": 1899,
        "badge": "Rugged Value",
        "score_reasons": [
            "Phylon sole absorbs shocks on uneven village and city pavements",
            "Stitched synthetic leather overlays provide superior lateral hold",
            "Extremely durable under ₹1,400"
        ],
        "trade_offs": [
            "Runs slightly firm until 2 weeks of use.",
            "Weight is around 290g."
        ]
    },
    {
        "canonical_id": "shoe-sparx-sm-648",
        "title": "Sparx SM-648 Lightweight Running Shoes (Soft EVA Sole, Mesh Upper)",
        "brand": "Sparx",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Morning Jogging, Walking, Fitness",
            "Sole": "Injection EVA Lightweight Sole",
            "Material": "Breathable Fabric Knit",
            "Weight": "250 g",
            "Drop": "8.5 mm",
            "Color": "Grey / Orange",
            "Terrain": "Road & Park Tracks"
        },
        "base_score": 9.0,
        "best_price": 999,
        "mrp": 1499,
        "badge": "Sub-₹1,000 Pick",
        "score_reasons": [
            "Best runner under ₹1,000 from a trusted Indian brand",
            "Featherweight 250g build with good breathability",
            "Easy to clean and maintain"
        ],
        "trade_offs": [
            "EVA sole without rubber pods wears faster on gravel.",
            "Thin insole."
        ]
    },
    {
        "canonical_id": "shoe-sparx-sm-800",
        "title": "Sparx SM-800 Performance Road Running Shoes (Dual-Density Phylon, TPU Shank)",
        "brand": "Sparx",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k-10k Running, Treadmill, Road",
            "Sole": "Dual-Density Phylon Foam with Arch TPU Stabilizer",
            "Material": "Jacquard Breathable Mesh",
            "Weight": "280 g",
            "Drop": "9 mm",
            "Color": "Triple Black / Neon Green",
            "Terrain": "Road & Tarmac"
        },
        "base_score": 9.2,
        "best_price": 1599,
        "mrp": 2199,
        "badge": "Best Value",
        "score_reasons": [
            "TPU shank under midfoot arch prevents twisting on uneven ground",
            "Dual-density sole provides softer heel landing and firmer toe push",
            "Priced under ₹1,600 for high durability"
        ],
        "trade_offs": [
            "Aesthetic is traditional running rather than casual sneaker.",
            "Moderate flex."
        ]
    },
    {
        "canonical_id": "shoe-sparx-sx0171g",
        "title": "Sparx SX0171G Responsive Cushioning Road Running Shoes",
        "brand": "Sparx",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, Gym Workout, Outdoor Steps",
            "Sole": "Moulded EVA Midsole with Full Length Rubber Pods",
            "Material": "Engineered Knit Mesh Upper",
            "Weight": "270 g",
            "Drop": "9 mm",
            "Color": "Navy / Red",
            "Terrain": "Road & Track"
        },
        "base_score": 9.1,
        "best_price": 1299,
        "mrp": 1799,
        "badge": "Cheapest",
        "score_reasons": [
            "Rubber pods on high-wear heel and forefoot zones prolong lifespan",
            "Engineered knit upper flexes with foot motion",
            "Excellent value at ₹1,299"
        ],
        "trade_offs": [
            "Standard foam bounce.",
            "Insole requires 10km break-in."
        ]
    },

    # --- REEBOK (5) ---
    {
        "canonical_id": "shoe-reebok-energen-run-3",
        "title": "Reebok Energen Run 3 Lightweight Road Running Shoes (FuelFoam Midsole)",
        "brand": "Reebok",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km-10km Running, Treadmill, Aerobic Training",
            "Sole": "FuelFoam Density Midsole with Full-Length Rubber",
            "Material": "Monogrid Mesh Upper with Padded Foam Tongue",
            "Weight": "260 g",
            "Drop": "9 mm",
            "Color": "Pure Grey / Core Black / Neon Green",
            "Terrain": "Road & Asphalt"
        },
        "base_score": 9.3,
        "best_price": 2699,
        "mrp": 4599,
        "badge": "Best Value",
        "score_reasons": [
            "FuelFoam delivers an optimal ratio of responsive spring to soft landing",
            "Monogrid upper allows maximum airflow on hot morning runs",
            "Competitively priced at ₹2,699 across major retailers"
        ],
        "trade_offs": [
            "Heel collar padding is moderate.",
            "Arch support is standard; flat-footed runners may need custom orthotics."
        ]
    },
    {
        "canonical_id": "shoe-reebok-stride-runner",
        "title": "Reebok Stride Runner Shoes (EVA Foam Cushioning, Breathable Textile)",
        "brand": "Reebok",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Morning Jogging, Beginner Running, Daily Steps",
            "Sole": "Injection-Molded EVA Midsole with Traction Pods",
            "Material": "Breathable Polyester Mesh",
            "Weight": "252 g",
            "Drop": "8.5 mm",
            "Color": "Black / Vector Red",
            "Terrain": "Road & Park Tracks"
        },
        "base_score": 9.1,
        "best_price": 1699,
        "mrp": 2999,
        "badge": "Budget Pick",
        "score_reasons": [
            "Best ultra-budget brand runner in India (sub-₹1,800)",
            "Featherweight 252g build causes zero foot fatigue",
            "Simple, durable design that cleans easily"
        ],
        "trade_offs": [
            "EVA foam without rubber covering outsole reduces lifespan to ~400km.",
            "Minimalist stability purely for casual road runners."
        ]
    },
    {
        "canonical_id": "shoe-reebok-floatride-energy-5",
        "title": "Reebok Floatride Energy 5 (Floatride TPU Foam, Torsion Plate)",
        "brand": "Reebok",
        "category": "running_shoes",
        "subcategory": "Performance Marathon Daily",
        "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Long Runs, Marathon Prep, High Rebound Road Sessions",
            "Sole": "Floatride Energy Bead TPU Foam + Midfoot X-Plate",
            "Material": "Recycled Engineered Mesh Upper with Cordura Trim",
            "Weight": "266 g",
            "Drop": "8 mm",
            "Color": "White / Vector Navy / Vector Red",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.6,
        "best_price": 5999,
        "mrp": 9999,
        "badge": "Top Rated",
        "score_reasons": [
            "Floatride TPU bead foam outperforms standard EVA by 3x in rebound longevity",
            "Midfoot X-plate stabilizes arch transitions over 20km distances",
            "Awarded best daily trainer value by international running media"
        ],
        "trade_offs": [
            "Mid-range pricing (~₹5,999).",
            "Slightly firm road feel during first few kilometers."
        ]
    },
    {
        "canonical_id": "shoe-reebok-flashfilm-train",
        "title": "Reebok Flashfilm Train 2.0 (Flashfilm Polyurethane Cushioning, Flex Outsole)",
        "brand": "Reebok",
        "category": "running_shoes",
        "subcategory": "Gym & Road Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Cross Training, Sprint Intervals, 5km Road Cardio",
            "Sole": "Flashfilm Encapsulated PU Midsole with Rubber Pods",
            "Material": "Monofilament Breathable Mesh Upper",
            "Weight": "260 g",
            "Drop": "9 mm",
            "Color": "Black / Cold Grey / Pure Silver",
            "Terrain": "Road & Gym"
        },
        "base_score": 9.3,
        "best_price": 3499,
        "mrp": 5999,
        "badge": "Best Value",
        "score_reasons": [
            "Flashfilm polyurethane layer provides consistent bounce without pack-out",
            "Ultra-breathable monomesh upper keeps feet dry in humid conditions",
            "Grippy rubber outsole holds well on gym floors and city roads"
        ],
        "trade_offs": [
            "Upper is thin; not insulated for cold winter conditions.",
            "Moderate heel stack height."
        ]
    },
    {
        "canonical_id": "shoe-reebok-quick-motion-3",
        "title": "Reebok Quick Motion 3 Road Running Shoes (Comfort Footbed, Moulded EVA)",
        "brand": "Reebok",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Jogging, Morning Cardio, Fitness Walks",
            "Sole": "Full EVA Midsole with Forefoot Flex Grooves",
            "Material": "Layered Breathable Mesh with Synthetic Eyestay",
            "Weight": "258 g",
            "Drop": "9 mm",
            "Color": "Vector Navy / Cloud White",
            "Terrain": "Road & Treadmill"
        },
        "base_score": 9.2,
        "best_price": 2299,
        "mrp": 3999,
        "badge": "Best Value",
        "score_reasons": [
            "Forefoot flex grooves facilitate natural foot bend during strides",
            "Comfort memory sockliner provides plush step-in sensation",
            "Great price point under ₹2,300"
        ],
        "trade_offs": [
            "Zonal rubber pads at heel/toe rather than full outsole.",
            "Standard tongue construction."
        ]
    },

    # --- SKECHERS (4) ---
    {
        "canonical_id": "shoe-skechers-go-run-consistent",
        "title": "Skechers GO RUN Consistent Running Shoes (ULTRA LIGHT Midsole, Air-Cooled Goga Mat)",
        "brand": "Skechers",
        "category": "running_shoes",
        "subcategory": "Cushioned Road Running",
        "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running, High-Impact Joint Protection, 5k-10k Road Training",
            "Sole": "ULTRA LIGHT Resilient Midsole Foam with Parametric Outsole",
            "Material": "Smooth Leather & Mesh Fabric Upper",
            "Weight": "285 g",
            "Drop": "9 mm",
            "Color": "Charcoal / Orange",
            "Terrain": "Road, Treadmill, Hard Surface"
        },
        "base_score": 9.4,
        "best_price": 3599,
        "mrp": 5499,
        "badge": "High Cushion",
        "score_reasons": [
            "Air-Cooled Goga Mat high-rebound insole cushions feet against hard pavement",
            "ULTRA LIGHT midsole absorbs heavy shock for knee and back relief",
            "Parametric web outsole offers smooth transitions from heel to toe"
        ],
        "trade_offs": [
            "Leather overlays add some weight compared to pure engineered mesh shoes.",
            "Can run slightly wide for runners with very narrow feet."
        ]
    },
    {
        "canonical_id": "shoe-skechers-max-cushioning",
        "title": "Skechers Max Cushioning Premier (ULTRA GO 2-Inch Stack, Natural Rocker)",
        "brand": "Skechers",
        "category": "running_shoes",
        "subcategory": "Max Cushion Cloud",
        "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Recovery Jogging, Long Road Walks, Plantar Fasciitis Relief",
            "Sole": "ULTRA GO Extra-Thick 2-Inch Stack with Natural Rocker Technology",
            "Material": "Seamless Engineered Mesh Upper",
            "Weight": "305 g",
            "Drop": "6 mm",
            "Color": "Black / White / Red",
            "Terrain": "Hard Concrete & Pavement"
        },
        "base_score": 9.6,
        "best_price": 6999,
        "mrp": 9999,
        "badge": "Max Cushion",
        "score_reasons": [
            "Massive 2-inch ULTRA GO stack delivers near zero impact on knees and ankles",
            "Rocker sole geometry effortlessly rolls foot forward to reduce heel strain",
            "Podiatrist-recommended for standing work and recovery runs"
        ],
        "trade_offs": [
            "High stack reduces road feel (not intended for track racing).",
            "Weighs 305g."
        ]
    },
    {
        "canonical_id": "shoe-skechers-arch-fit-wave",
        "title": "Skechers Arch Fit Road Running Shoes (Podiatrist-Certified Arch Support)",
        "brand": "Skechers",
        "category": "running_shoes",
        "subcategory": "Orthopedic & Arch Support",
        "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Running with Flat Feet, Severe Pronation Relief",
            "Sole": "Patented Skechers Arch Fit Insole System + Resilient Midsole",
            "Material": "Engineered Knit Mesh Upper with Lace-Up Front",
            "Weight": "285 g",
            "Drop": "10 mm",
            "Color": "Navy / Light Blue",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.5,
        "best_price": 4499,
        "mrp": 6999,
        "badge": "Arch Fit Certified",
        "score_reasons": [
            "Developed with 20 years of podiatrist data to distribute weight evenly",
            "Removable supportive cushioning insole system",
            "Completely eliminates arch and plantar foot ache on long runs"
        ],
        "trade_offs": [
            "Prominent arch support takes 2-3 runs to adjust to.",
            "Upper is snug around midfoot."
        ]
    },
    {
        "canonical_id": "shoe-skechers-dlites-ultra",
        "title": "Skechers D'Lites Ultra Running Shoes (Air-Cooled Memory Foam, Chunky Midsole)",
        "brand": "Skechers",
        "category": "running_shoes",
        "subcategory": "Chunky Road Running",
        "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Cardio, Jogging, All-Day Street Wear",
            "Sole": "Thick Shock-Absorbing Midsole with Rubber Traction",
            "Material": "Trubuck Leather and Mesh Fabric",
            "Weight": "310 g",
            "Drop": "10 mm",
            "Color": "White / Navy / Silver",
            "Terrain": "Road & Concrete"
        },
        "base_score": 9.3,
        "best_price": 3899,
        "mrp": 5999,
        "badge": "Chunky Comfort",
        "score_reasons": [
            "Iconic D'Lites chunky sole provides substantial impact cushioning",
            "Air-Cooled Memory Foam insole molds to individual foot shape",
            "Durable leather construction lasts for years"
        ],
        "trade_offs": [
            "Chunky silhouette is heavier (310g).",
            "Less flexible than modern knit running shoes."
        ]
    },

    # --- ASIAN (4) ---
    {
        "canonical_id": "shoe-asian-tarzan-11",
        "title": "Asian Tarzan-11 Memory Foam Road Running Shoes (Air Capsule Sole)",
        "brand": "Asian",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Morning Jogging, Walking, Gym Warmup",
            "Sole": "High Elastic EVA Midsole with Air Cushion Bubble",
            "Material": "Knitted Breathable Upper with Elastic Collar",
            "Weight": "250 g",
            "Drop": "8.5 mm",
            "Color": "Grey / Orange",
            "Terrain": "Road & Park Tracks"
        },
        "base_score": 9.1,
        "best_price": 999,
        "mrp": 1599,
        "badge": "Sub-₹1,000 Pick",
        "score_reasons": [
            "Best value running shoe under ₹1,000 with 50,000+ ratings online",
            "Air capsule sole offers noticeable heel cushioning on morning runs",
            "Featherweight 250g weight with snug collar fit"
        ],
        "trade_offs": [
            "Sole longevity is ~350km on coarse tarmac.",
            "Simple arch support."
        ]
    },
    {
        "canonical_id": "shoe-asian-future-01",
        "title": "Asian Future-01 High-Bounce Running Shoes (Phylon Midsole, Knitted Upper)",
        "brand": "Asian",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 3k-5k Running, Gym, Casual",
            "Sole": "Phylon Shock Absorber with Anti-Skid Rubber Pods",
            "Material": "Seamless 3D Knitted Upper",
            "Weight": "255 g",
            "Drop": "9 mm",
            "Color": "Black / White",
            "Terrain": "Road & Concrete"
        },
        "base_score": 9.1,
        "best_price": 1199,
        "mrp": 1899,
        "badge": "Cheapest",
        "score_reasons": [
            "Seamless knitted upper prevents blisters during extended workouts",
            "Phylon midsole absorbs street impacts reliably",
            "Exceptional price-to-comfort ratio under ₹1,200"
        ],
        "trade_offs": [
            "Insole lacks deep contouring.",
            "Soft upper requires tight lacing for high speeds."
        ]
    },
    {
        "canonical_id": "shoe-asian-jasper-02",
        "title": "Asian Jasper-02 Men's Running Shoes (TPR Sole, Stitched Overlays)",
        "brand": "Asian",
        "category": "running_shoes",
        "subcategory": "Rugged Road Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Rough Road Running, Morning Walks, High Durability",
            "Sole": "Dual-Layer EVA + TPR Rubber Compound Outsole",
            "Material": "Mesh with Synthetic Toe Cap & Heel Counter",
            "Weight": "285 g",
            "Drop": "10 mm",
            "Color": "Navy / Green",
            "Terrain": "All-Terrain (Road, Gravel, Dust)"
        },
        "base_score": 9.0,
        "best_price": 1299,
        "mrp": 1999,
        "badge": "Rugged Value",
        "score_reasons": [
            "TPR rubber bottom resists tearing on stony paths and rough tarmac",
            "Synthetic overlays reinforce midfoot against ankle strain",
            "Affordable workhorse for Indian road conditions at ₹1,299"
        ],
        "trade_offs": [
            "Slightly heavier at 285g.",
            "Firmer step feel."
        ]
    },
    {
        "canonical_id": "shoe-asian-bouncer-01",
        "title": "Asian Bouncer-01 Ultra-Light Jogging Shoes (Slip-On Air-Cooled Mesh)",
        "brand": "Asian",
        "category": "running_shoes",
        "subcategory": "Ultra-Light Slip-On",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Light Morning Jogging, Daily Walking, House & Park",
            "Sole": "Ultra-Lightweight Moulded EVA Outsole",
            "Material": "Air-Cooled Mesh Fabric with Elastic Gusset",
            "Weight": "230 g",
            "Drop": "8 mm",
            "Color": "Black / Red",
            "Terrain": "Road & Pavement"
        },
        "base_score": 8.9,
        "best_price": 899,
        "mrp": 1399,
        "badge": "Sub-₹1,000 Pick",
        "score_reasons": [
            "Ultra-economical price under ₹900",
            "Featherweight 230g build causes zero drag",
            "Breathable open weave prevents foot sweating"
        ],
        "trade_offs": [
            "Minimalist sole without rubber tread.",
            "Not for intense running above 5km."
        ]
    },

    # --- NEW BALANCE (3) ---
    {
        "canonical_id": "shoe-new-balance-411-v3",
        "title": "New Balance 411 V3 Road Running Shoes (Ground Contact EVA, Comfort Collar)",
        "brand": "New Balance",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Running, Gym, Walking",
            "Sole": "Ground Contact EVA Cushioning with Rubber Pods",
            "Material": "Sublimated Breathable Mesh Upper",
            "Weight": "262 g",
            "Drop": "9 mm",
            "Color": "Black / Magnet / White",
            "Terrain": "Road & Treadmill"
        },
        "base_score": 9.3,
        "best_price": 3699,
        "mrp": 4999,
        "badge": "Best Value",
        "score_reasons": [
            "Classic New Balance comfort engineered for Indian road surfaces",
            "Ground Contact EVA delivers lightweight cushioning without bottoming out",
            "Roomy toe box provides natural forefoot freedom"
        ],
        "trade_offs": [
            "Rubber pods are placed at high wear areas rather than full-length.",
            "Firm heel counter requires short break-in."
        ]
    },
    {
        "canonical_id": "shoe-new-balance-fresh-foam-arishi",
        "title": "New Balance Fresh Foam Arishi V4 (Fresh Foam Midsole, No-Sew Overlays)",
        "brand": "New Balance",
        "category": "running_shoes",
        "subcategory": "Plush Daily Road",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k-15k Road Running, High Comfort All-Day",
            "Sole": "Precision-Engineered Fresh Foam Midsole with Blown Rubber",
            "Material": "Engineered Mesh with Seamless No-Sew Overlays",
            "Weight": "260 g",
            "Drop": "8 mm",
            "Color": "Thunder Grey / Cyber Jade",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.5,
        "best_price": 5499,
        "mrp": 7999,
        "badge": "Fresh Foam Plush",
        "score_reasons": [
            "Fresh Foam compound delivers an ultra-cushioned, lightweight cloud feel",
            "Precision laser engraving in the midsole relieves pressure on landing",
            "Sleek textured mesh looks sophisticated for both running and travel"
        ],
        "trade_offs": [
            "Mid-range pricing (~₹5,499).",
            "Foam is plush rather than firm racing spring."
        ]
    },
    {
        "canonical_id": "shoe-new-balance-520-v8",
        "title": "New Balance 520 V8 Daily Running Shoes (Soft Comfort EVA, Rubber Outsole)",
        "brand": "New Balance",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Jogging, Walking, Fitness",
            "Sole": "Moulded EVA Foam Midsole with Full Rubber Outsole",
            "Material": "Textured Engineered Mesh with Synthetic Saddle",
            "Weight": "270 g",
            "Drop": "10 mm",
            "Color": "Eclipse Navy / Vibrant Spring Glow",
            "Terrain": "Road & Treadmill"
        },
        "base_score": 9.3,
        "best_price": 4299,
        "mrp": 5999,
        "badge": "Best Value",
        "score_reasons": [
            "Full rubber outsole provides outstanding durability on city streets",
            "Synthetic saddle holds midfoot securely under hard accelerations",
            "Dependable workhorse runner from New Balance under ₹4,500"
        ],
        "trade_offs": [
            "Standard EVA sole compound rather than Fresh Foam.",
            "Weight is around 270g."
        ]
    },

    # --- UNDER ARMOUR (3) ---
    {
        "canonical_id": "shoe-under-armour-surge-3",
        "title": "Under Armour Charged Surge 3 Running Shoes (Charged Cushioning Midsole)",
        "brand": "Under Armour",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Road Running, Sprint Intervals, Gym Cardio",
            "Sole": "Charged Cushioning Compression Molded Foam",
            "Material": "Lightweight Breathable Mesh Upper",
            "Weight": "255 g",
            "Drop": "8.5 mm",
            "Color": "Pitch Gray / Black / White",
            "Terrain": "Road & Track"
        },
        "base_score": 9.4,
        "best_price": 2699,
        "mrp": 5499,
        "badge": "High Performance",
        "score_reasons": [
            "Charged Cushioning is firmer in the heel and softer in the forefoot for balanced transitions",
            "Strategically placed rubber pods enhance durability without added bulk",
            "High ankle collar padding supports Achilles tendon during fast strides"
        ],
        "trade_offs": [
            "Snug aerodynamic fit; runners with wide feet should consider sizing up.",
            "Less flex in the midfoot shank."
        ]
    },
    {
        "canonical_id": "shoe-under-armour-assert-9",
        "title": "Under Armour Charged Assert 9 (Leather Overlays, Charged Cushioning)",
        "brand": "Under Armour",
        "category": "running_shoes",
        "subcategory": "Durable Road Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Road Running, Weight Training, All-Terrain Jogging",
            "Sole": "Charged Cushioning Foam with Solid Rubber Outsole",
            "Material": "Durable Mesh with Stitched Leather Overlays",
            "Weight": "298 g",
            "Drop": "10 mm",
            "Color": "Black / White / Mod Gray",
            "Terrain": "Road, Track & Gym"
        },
        "base_score": 9.4,
        "best_price": 3999,
        "mrp": 6499,
        "badge": "Heavy Duty",
        "score_reasons": [
            "Durable leather overlays lock down midfoot and prevent mesh blowout",
            "Solid rubber outsole covers high impact zones for long-term wear",
            "Excellent stability during heavy gym lifts and road runs"
        ],
        "trade_offs": [
            "Leather overlays add weight (298g).",
            "Runs slightly warm in high heat."
        ]
    },
    {
        "canonical_id": "shoe-under-armour-rogue-3",
        "title": "Under Armour Charged Rogue 3 (Dual Charged Midsole, Deluxe Comfort Sockliner)",
        "brand": "Under Armour",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k-10k Road Runs, Tempo Workouts",
            "Sole": "Dual Density Charged Cushioning Midsole",
            "Material": "2-Tone Engineered Mesh Upper",
            "Weight": "260 g",
            "Drop": "8 mm",
            "Color": "Academy Blue / Beta Red",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.5,
        "best_price": 4799,
        "mrp": 7499,
        "badge": "Top Rated",
        "score_reasons": [
            "Dual-density Charged foam pairs plush impact cushioning with responsive push-off",
            "Removable deluxe foam sockliner conforms to foot contours",
            "Solid rubber outsole with deep flex grooves for natural stride"
        ],
        "trade_offs": [
            "Price is in the mid-range (₹4,799).",
            "Tongue padding is average."
        ]
    },

    # --- BATA / POWER (3) ---
    {
        "canonical_id": "shoe-bata-power-xort-run",
        "title": "Bata Power XoRise Phantom Lightweight Running Shoes (Memory Foam Insole)",
        "brand": "Bata",
        "category": "running_shoes",
        "subcategory": "Budget Road Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 3k-5k Running, Walking, Everyday Wear",
            "Sole": "XoRise High-Rebound EVA with Anti-Skid Rubber",
            "Material": "Seamless Engineered Knitted Mesh",
            "Weight": "245 g",
            "Drop": "8 mm",
            "Color": "Navy / Orange",
            "Terrain": "Road & Concrete"
        },
        "base_score": 9.1,
        "best_price": 1799,
        "mrp": 2799,
        "badge": "Budget Pick",
        "score_reasons": [
            "Affordable road runner backed by Bata's extensive retail warranty",
            "High-rebound XoRise sole offers surprisingly plush bounce",
            "Exceptional value under ₹1,800"
        ],
        "trade_offs": [
            "EVA compression sets in earlier after ~350km.",
            "Best suited for casual 5km runs rather than fast 10k pace."
        ]
    },
    {
        "canonical_id": "shoe-bata-power-plazma",
        "title": "Bata Power Plazma 2.0 High Energy Return Running Shoes (Tunnel Cushion Sole)",
        "brand": "Bata",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Jogging, Fitness Cardio, Walking",
            "Sole": "Plazma Tunnel Shock Absorption Sole with Rubber Grip",
            "Material": "Breathable 3D Mesh Upper with TPU Support",
            "Weight": "270 g",
            "Drop": "9 mm",
            "Color": "All Black / Electric Lime",
            "Terrain": "Road & Concrete"
        },
        "base_score": 9.2,
        "best_price": 2199,
        "mrp": 3499,
        "badge": "Best Value",
        "score_reasons": [
            "Tunnel cushion chambers deform on impact to absorb road vibrations",
            "Moulded TPU quarter cage provides lateral support",
            "Reliable Bata craftsmanship under ₹2,200"
        ],
        "trade_offs": [
            "Sole voids require occasional cleaning if running on wet mud.",
            "Moderate flexibility."
        ]
    },
    {
        "canonical_id": "shoe-bata-power-engage",
        "title": "Bata Power Engage Road Running Shoes (Comfort EVA, Lightweight)",
        "brand": "Bata",
        "category": "running_shoes",
        "subcategory": "Budget Road Running",
        "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Morning Walks, Daily Jogging, Everyday Use",
            "Sole": "Engage Moulded EVA Cushioning",
            "Material": "Knit Mesh Upper with Padded Collar",
            "Weight": "248 g",
            "Drop": "8 mm",
            "Color": "Dark Grey / Orange",
            "Terrain": "Road & Park Tracks"
        },
        "base_score": 9.0,
        "best_price": 1399,
        "mrp": 2199,
        "badge": "Cheapest",
        "score_reasons": [
            "Sub-₹1,400 entry into Bata's athletic Power series",
            "Ultra-lightweight 248g construction",
            "Padded collar prevents heel chafing"
        ],
        "trade_offs": [
            "Basic EVA without rubber coverage.",
            "Standard arch support."
        ]
    },

    # --- RED TAPE (3) ---
    {
        "canonical_id": "shoe-redtape-athleisure-runner",
        "title": "Red Tape Men AirFlow Cushion Road Running Shoes (Flow EVA Midsole)",
        "brand": "Red Tape",
        "category": "running_shoes",
        "subcategory": "Budget Daily Running",
        "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Morning Jogging, Gym, Fitness Walks",
            "Sole": "Flow EVA Shock Absorber Outsole",
            "Material": "Breathable Mesh Upper with Slip-On Collar",
            "Weight": "250 g",
            "Drop": "9 mm",
            "Color": "All Black / Charcoal",
            "Terrain": "Road & Treadmill"
        },
        "base_score": 9.0,
        "best_price": 1399,
        "mrp": 2499,
        "badge": "Cheapest",
        "score_reasons": [
            "Super budget-friendly price point at ₹1,399",
            "Featherlight construction with easy slip-on comfort",
            "Clean all-black aesthetic suitable for running and casual wear"
        ],
        "trade_offs": [
            "Lacks heavy-duty rubber outsole; not meant for rough gravel.",
            "Minimalist arch support."
        ]
    },
    {
        "canonical_id": "shoe-redtape-airflow-pro",
        "title": "Red Tape AirFlow Pro Performance Running Shoes (Memory Tech Insole)",
        "brand": "Red Tape",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5km Jogging, Gym Cardio, College Running",
            "Sole": "Flow EVA Midsole with Rubber Traction Pads",
            "Material": "Engineered Breathable Jacquard Knit",
            "Weight": "260 g",
            "Drop": "9 mm",
            "Color": "White / Navy Blue / Fluorescent Green",
            "Terrain": "Road & Concrete"
        },
        "base_score": 9.1,
        "best_price": 1599,
        "mrp": 2999,
        "badge": "Best Value",
        "score_reasons": [
            "Memory Tech insole provides instant step-in softness",
            "Rubber traction pads on outsole protect high-wear zones",
            "Crisp sporty white/navy styling under ₹1,600"
        ],
        "trade_offs": [
            "White knit requires frequent washing.",
            "Midsole is tuned for recreational pace."
        ]
    },
    {
        "canonical_id": "shoe-redtape-slipon-stride",
        "title": "Red Tape Slip-On Stride Running Shoes (Elastic Collar, Flexible EVA)",
        "brand": "Red Tape",
        "category": "running_shoes",
        "subcategory": "Slip-On Running",
        "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily Walks, 3km Easy Jogging, Casual Daily Steps",
            "Sole": "Ultra-Flexible Grooved EVA Outsole",
            "Material": "Knitted Sock-Like Elastic Upper",
            "Weight": "235 g",
            "Drop": "8 mm",
            "Color": "Grey / Black",
            "Terrain": "Road & Pavement"
        },
        "base_score": 9.0,
        "best_price": 1199,
        "mrp": 2199,
        "badge": "Cheapest",
        "score_reasons": [
            "Easy slip-on convenience with zero lacing hassle",
            "Featherlight 235g weight feels weightless on foot",
            "Great price point at ₹1,199"
        ],
        "trade_offs": [
            "Sock collar does not lock down for fast sprint intervals.",
            "No rubber outsole."
        ]
    },

    # --- WOODLAND (2) ---
    {
        "canonical_id": "shoe-woodland-woods-trail",
        "title": "Woodland Woods Trail Running & Trekking Shoes (Lugged Rubber Sole)",
        "brand": "Woodland",
        "category": "running_shoes",
        "subcategory": "Trail & Rough Terrain",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Trail Running, Gravel Roads, Monsoon Jogging, Dirt Tracks",
            "Sole": "Deep Lugged Carbon Rubber Outsole with EVA Shock Absorption",
            "Material": "Heavy-Duty Ballistic Nylon Mesh with Suede Overlays",
            "Weight": "340 g",
            "Drop": "10 mm",
            "Color": "Olive Green / Camel Brown",
            "Terrain": "Trail, Gravel, Mud & Dirt"
        },
        "base_score": 9.4,
        "best_price": 3495,
        "mrp": 5495,
        "badge": "All-Terrain Tough",
        "score_reasons": [
            "Legendary Woodland outdoor toughness withstands rocks, thorns and water",
            "Deep multi-directional rubber lugs prevent slips on loose gravel and mud",
            "Reinforced toe cap protects toes against stone stubs"
        ],
        "trade_offs": [
            "Heavier build (340g) designed for rugged durability over road sprint speed.",
            "Firmer ride than plush road shoes."
        ]
    },
    {
        "canonical_id": "shoe-woodland-grippro-active",
        "title": "Woodland GripPro Active Road & Trail Running Shoes (High-Traction Rubber)",
        "brand": "Woodland",
        "category": "running_shoes",
        "subcategory": "Trail & Rough Terrain",
        "image": "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Outdoor Running, Rough Tarmac, Park Dirt Loops",
            "Sole": "GripPro High-Traction Rubber Outsole + Phylon Midsole",
            "Material": "Hydrophobic Coated Mesh Upper",
            "Weight": "315 g",
            "Drop": "9 mm",
            "Color": "Khaki / Black",
            "Terrain": "Road, Trail & Mixed Ground"
        },
        "base_score": 9.3,
        "best_price": 2995,
        "mrp": 4995,
        "badge": "All-Weather Grip",
        "score_reasons": [
            "Hydrophobic mesh upper sheds morning dew and light rain",
            "GripPro rubber pattern maintains traction on wet city bitumen",
            "Woodland rugged reliability under ₹3,000"
        ],
        "trade_offs": [
            "Firmer sole than foam-only city road runners.",
            "Weight is around 315g."
        ]
    },

    # --- DECATHLON / KALENJI (1) ---
    {
        "canonical_id": "shoe-decathlon-kalenji-jogflow",
        "title": "Decathlon Kalenji Jogflow 500.1 Men's Road Running Shoes (Joint Protection Flow)",
        "brand": "Decathlon",
        "category": "running_shoes",
        "subcategory": "Daily Road Running",
        "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80",
        "specifications": {
            "Usage": "Daily 5k-10k Road Running, Half Marathon Training, Impact Reduction",
            "Sole": "Flow Soft EVA Cushioning with Thick Rubber Tread",
            "Material": "Engineered Breathable Mesh (Eco-Designed)",
            "Weight": "270 g",
            "Drop": "4 mm Low Natural Drop (Promotes Midfoot Stride)",
            "Color": "Storm Blue / Orange",
            "Terrain": "Road & Paved Paths"
        },
        "base_score": 9.4,
        "best_price": 2899,
        "mrp": 3499,
        "badge": "Editor's Choice",
        "score_reasons": [
            "Scientifically developed 4mm drop encourages natural midfoot posture to reduce knee torque",
            "Decathlon 2-year warranty ensures dependable craftsmanship",
            "Excellent value at ₹2,899 with plush heel and forefoot padding"
        ],
        "trade_offs": [
            "4mm low heel drop requires 1-2 weeks adaptation if transitioning from traditional 10mm shoes.",
            "Sold primarily through Decathlon direct and selected online partners."
        ]
    }
]

print(f"Total shoes prepared: {len(SHOES)}")
brands = set(s['brand'] for s in SHOES)
print(f"Brands count: {len(brands)} -> {sorted(brands)}")
for b in sorted(brands):
    count = len([s for s in SHOES if s['brand'] == b])
    min_p = min(s['best_price'] for s in SHOES if s['brand'] == b)
    max_p = max(s['best_price'] for s in SHOES if s['brand'] == b)
    print(f"  - {b}: {count} models (Rs. {min_p:,} - Rs. {max_p:,})")

# Write out as JSON for export
with open(r'd:/project/CampareX/backend/all_shoes_data.json', 'w', encoding='utf-8') as f:
    json.dump(SHOES, f, indent=2)
print("Wrote all_shoes_data.json successfully")
