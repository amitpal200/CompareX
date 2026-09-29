from pydantic import BaseModel, Field, model_validator
from typing import List, Dict, Any, Optional
from datetime import datetime

class SearchRequest(BaseModel):
    id: Optional[str] = None
    query: str
    category: Optional[str] = "auto" # "shopping", "travel", or "auto"
    constraints: Optional[Dict[str, Any]] = Field(default_factory=dict)

class ProductOffer(BaseModel):
    provider: str
    price: float
    original_price: Optional[float] = None
    currency: str = "INR"
    shipping: str = "Free Delivery"
    availability: str = "In Stock"
    source_url: str = "#"
    rating: float = 4.5
    review_count: int = 120
    fetched_at: str

class Product(BaseModel):
    canonical_id: str
    title: str
    brand: str
    category: str
    image: str
    specifications: Dict[str, str]
    rating: float
    best_price: float
    offers: List[ProductOffer]
    badge: Optional[str] = None
    score: float = 9.2
    score_reasons: List[str] = Field(default_factory=list)

class TravelOption(BaseModel):
    id: str
    type: str
    provider: str
    logo: Optional[str] = None
    origin: str
    destination: str
    departure: str
    arrival: str
    duration: str
    stops: str
    baggage: str
    price: float
    currency: str = "INR"
    rating: float = 4.3
    badge: Optional[str] = None
    source_url: str = "#"
    score: float = 9.0
    score_reasons: List[str] = Field(default_factory=list)
    fetched_at: str

class AgentStep(BaseModel):
    step_name: str
    status: str # "done", "active", "pending"
    detail: str

class SearchResponse(BaseModel):
    request_id: str
    query: str
    detected_type: str
    parsed_intent: Dict[str, Any]
    agent_steps: List[AgentStep]
    products: Optional[List[Product]] = None
    travel_options: Optional[List[TravelOption]] = None
    recommendation_summary: str
    warnings: List[str] = Field(default_factory=list)

class PriceWatchRequest(BaseModel):
    item_id: str
    item_title: str
    target_price: float
    current_price: float
    user_email: Optional[str] = "user@example.com"

# ==========================================
# Hotel Agentic AI Schemas
# ==========================================

class HotelProviderOffer(BaseModel):
    provider: str
    price: int
    room_perks: str
    source_url: str

class CustomerReviewItem(BaseModel):
    id: str
    author: str
    rating: float
    date: str
    title: str
    comment: str
    verified: bool = True
    tripType: Optional[str] = "Family Stay"

class HotelModel(BaseModel):
    id: str
    type: str = "hotel"
    category: str = "hotel"
    name: str
    location: str
    city: str
    star_rating: int
    guest_rating: float
    review_count: int
    image: str
    gallery: List[str] = Field(default_factory=list)
    room_type: str
    price_per_night: int
    original_price: Optional[int] = None
    currency: str = "INR"
    badge: Optional[str] = None
    score: float
    score_reasons: List[str] = Field(default_factory=list)
    amenities: List[str] = Field(default_factory=list)
    distance_to_airport: Optional[str] = None
    distance_to_beach: Optional[str] = None
    cancellation_policy: str
    has_breakfast: bool = False
    has_pool: bool = False
    providers: List[HotelProviderOffer] = Field(default_factory=list)
    customer_reviews: List[CustomerReviewItem] = Field(default_factory=list)

class ReviewIntelligenceResponse(BaseModel):
    hotel_id: str
    hotel_name: str
    cleanliness_score: int
    location_score: int
    staff_score: int
    food_score: int
    value_for_money_score: int
    overall_sentiment_pct: int
    positive_themes: List[str]
    negative_themes: List[str]
    verified_summary: str

class ComparisonVerdictResponse(BaseModel):
    winner_id: str
    winner_name: str
    title: str
    verdict_explanation: str
    pros_by_hotel: Dict[str, List[str]]
    trade_offs: List[str]
    user_persona_matched: str

class HotelComparisonRequest(BaseModel):
    hotel_ids: List[str]
    user_priorities: Optional[List[str]] = None

class HotelComparisonResponse(BaseModel):
    hotels: List[HotelModel]
    verdict: ComparisonVerdictResponse

class HotelAgentRequest(BaseModel):
    query: str
    session_id: Optional[str] = None
    user_priorities: Optional[List[str]] = None
    custom_budget: Optional[int] = None

class HotelAgentResponse(BaseModel):
    session_id: str
    query: str
    detected_location: str
    budget_max: Optional[int] = None
    mandatory_requirements: List[str] = Field(default_factory=list)
    agent_steps: List[AgentStep]
    hotels: List[HotelModel]
    recommendation_summary: str
    review_intelligence: Optional[ReviewIntelligenceResponse] = None
    active_filters: Dict[str, Any] = Field(default_factory=dict)

class PriceRadarWatchRequest(BaseModel):
    hotel_id: str
    hotel_name: str
    target_price: int
    current_price: int
    user_email: str = "traveler@comparex.ai"

class PriceRadarWatchResponse(BaseModel):
    watch_id: str
    hotel_id: str
    hotel_name: str
    target_price: int
    current_price: int
    status: str
    message: str
    next_check: str

class BookingBreakdownRequest(BaseModel):
    hotel_id: str
    nights: int = 1
    dates: Optional[str] = "Upcoming Weekend"

class BookingBreakdownResponse(BaseModel):
    hotel_id: str
    hotel_name: str
    room_type: str
    location: str
    dates: str
    nights: int
    base_rate_per_night: int
    subtotal: int
    gst_percentage: int
    gst_amount: int
    service_fee: int
    total_payable: int
    currency: str = "INR"
    cancellation_policy: str
    confirmation_required: bool = True

class ShoppingOfferModel(BaseModel):
    provider: str
    price: int
    listed_price: Optional[int] = None
    original_price: Optional[int] = None
    discount_amount: int = 0
    offer_terms: str = ""
    currency: str = "INR"
    shipping: str
    delivery_days: int = 2
    availability: str
    source_url: str
    rating: float = 4.5
    review_count: int = 500
    store_badge: str = "Verified Store"
    badges: List[str] = Field(default_factory=list)
    fetched_at: str = "Just now"

    @model_validator(mode="before")
    @classmethod
    def set_default_listed_price(cls, values):
        if isinstance(values, dict):
            if "listed_price" not in values or values["listed_price"] is None:
                values["listed_price"] = values.get("price", 0)
        return values

class ShoppingProductModel(BaseModel):
    canonical_id: str
    title: str
    brand: str
    category: str = "shopping"
    subcategory: str
    image: str
    specifications: Dict[str, str] = Field(default_factory=dict)
    best_price: int
    rating: float
    review_count: int
    base_score: float
    score_reasons: List[str] = Field(default_factory=list)
    score_breakdown: Dict[str, float] = Field(default_factory=dict)
    trade_offs: List[str] = Field(default_factory=list)
    fastest_delivery: str
    badge: str = "Verified Deal"
    offers: List[ShoppingOfferModel]
    why_chose_this: Optional[str] = None
    why_not_cheapest: Optional[str] = None
    smart_alternative: Optional[Dict[str, Any]] = None
    price_history: List[Dict[str, Any]] = Field(default_factory=list)
    sentiment: Optional[Dict[str, Any]] = None
    is_demo_mock: bool = True

class ParsedIntentModel(BaseModel):
    intent_type: str = "PRODUCT_SEARCH"
    category: str = "All Categories"
    subcategory: Optional[str] = None
    detected_goal: Optional[str] = None
    budget_max: Optional[int] = None
    use_case: List[str] = Field(default_factory=list)
    hard_constraints: List[str] = Field(default_factory=list)
    soft_preferences: List[str] = Field(default_factory=list)
    priorities: List[str] = Field(default_factory=list)
    clarification_needed: bool = False
    clarification_question: Optional[str] = None
    clarification_options: List[str] = Field(default_factory=list)

class ShoppingMissionTask(BaseModel):
    task_id: str
    category: str
    title: str
    allocated_budget: int
    selected_product: Optional[ShoppingProductModel] = None
    status: str = "completed"

class ShoppingMissionModel(BaseModel):
    mission_id: str
    goal: str
    total_budget: int
    allocated_total: int
    remaining_budget: int
    tasks: List[ShoppingMissionTask] = Field(default_factory=list)

class ShoppingSearchRequest(BaseModel):
    query: str
    category: Optional[str] = None
    budget_max: Optional[int] = None
    min_ram: Optional[int] = None
    require_rtx: bool = False
    priority_weights: Optional[Dict[str, float]] = None

class ShoppingSearchResponse(BaseModel):
    query: str
    detected_category: str
    parsed_budget: Optional[int] = None
    canonical_products: List[ShoppingProductModel]
    total_canonical_count: int
    total_offers_evaluated: int
    active_constraints: Dict[str, Any] = Field(default_factory=dict)
    top_recommendation_id: Optional[str] = None
    top_recommendation_verdict: Optional[str] = None
    why_chose_this: Optional[str] = None
    why_not_cheapest: Optional[str] = None
    intent_data: Optional[ParsedIntentModel] = None
    shopping_mission: Optional[ShoppingMissionModel] = None
    agent_steps: List[AgentStep] = Field(default_factory=list)
    is_mock_provider_data: bool = True

class PriceBreakdownRequest(BaseModel):
    canonical_id: str
    provider: str
    listed_price: int
    mrp: Optional[int] = None
    discount_offer: int = 0
    delivery_fee: int = 0
    offer_terms: Optional[str] = "Bank discount"

class PriceBreakdownResponse(BaseModel):
    provider: str
    listed_price: int
    mrp: int
    delivery_fee: int
    verified_discount: int
    effective_price: int
    savings_vs_mrp: int
    offer_terms: str
    delivery_estimate: str
    availability: str
    disclaimer: str

class MultimodalSearchRequest(BaseModel):
    search_type: str = "image"  # "image" or "url"
    image_data: Optional[str] = None  # Base64 data url or image URL
    image_name: Optional[str] = None
    product_url: Optional[str] = None
    user_prompt: Optional[str] = None

class MultimodalSearchResponse(BaseModel):
    search_type: str
    detected_title: str
    detected_brand: str
    detected_category: str
    confidence_pct: int = 95
    visual_attributes: List[str] = Field(default_factory=list)
    canonical_products: List[ShoppingProductModel] = Field(default_factory=list)
    total_canonical_count: int = 0
    total_offers_evaluated: int = 0
    top_recommendation_id: Optional[str] = None
    top_recommendation_verdict: Optional[str] = None
    source_url_analyzed: Optional[str] = None
    cheapest_store: Optional[str] = None
    effective_savings: Optional[int] = None
    agent_steps: List[AgentStep] = Field(default_factory=list)
    is_mock_provider_data: bool = True
