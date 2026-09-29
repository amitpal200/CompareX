from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class AirportItem(BaseModel):
    code: str
    city: str
    name: str
    country: str
    terminal_hint: Optional[str] = None

class FlightSearchRequest(BaseModel):
    origin: str = Field(..., description="Origin IATA code, e.g. DEL")
    destination: str = Field(..., description="Destination IATA code, e.g. BOM")
    departure_date: str = Field(..., description="Departure date in YYYY-MM-DD")
    return_date: Optional[str] = Field(None, description="Return date in YYYY-MM-DD for round trips")
    trip_type: str = Field("one_way", description="one_way | round_trip | multi_city")
    passengers: int = Field(1, ge=1, le=9)
    cabin_class: str = Field("economy", description="economy | premium_economy | business | first")

class ProviderSourceOffer(BaseModel):
    source: str = Field(..., description="Platform name, e.g. MakeMyTrip, EaseMyTrip, Cleartrip, Yatra, Airline Direct")
    source_type: str = Field("ota", description="direct | gds | ota | consolidator")
    platform_code: Optional[str] = None
    price: float
    currency: str = "INR"
    base_fare: float
    taxes_fees: float
    convenience_fee: float = 0.0
    promo_discount: float = 0.0
    promo_code: Optional[str] = None
    offer_terms: Optional[str] = None
    baggage: Dict[str, str] = Field(default_factory=lambda: {"cabin": "7 kg", "checkin": "15 kg"})
    fare_type: str = "Economy Saver"
    refundability: str = "Refundable with fee"
    booking_url: Optional[str] = None
    is_lowest: bool = False
    price_diff_vs_lowest: float = 0.0
    fare_conditions_differ: bool = False
    notes: Optional[str] = None
    perks: List[str] = Field(default_factory=list)

class FlightOffer(BaseModel):
    id: str
    airline: str
    airline_code: str
    flight_number: str
    aircraft: Optional[str] = "Airbus A320neo"
    origin_code: str
    origin_name: str
    origin_terminal: Optional[str] = "T2"
    destination_code: str
    destination_name: str
    destination_terminal: Optional[str] = "T1"
    departure_time: str
    arrival_time: str
    duration: str
    duration_minutes: int
    stops: str = "Non-stop"
    stops_count: int = 0
    price: float
    currency: str = "INR"
    taxes_and_fees: float
    base_fare: float
    checked_baggage: str = "15 kg Check-in Included"
    cabin_baggage: str = "7 kg Hand Baggage"
    seat_selection: str = "Standard Seat Selection Available"
    refundability: str = "Non-refundable"
    change_policy: str = "Changeable with standard fee"
    cancellation_policy: str = "Cancellation subject to airline policy"
    fare_type: str = "Economy Saver"
    booking_provider: str = "Airline Direct"
    booking_url: Optional[str] = None
    rating: float = 4.6
    badge: Optional[str] = None  # "BEST OVERALL" | "CHEAPEST" | "FASTEST"
    value_score: float = 9.2
    score_reasons: List[str] = []
    fetched_at: str
    is_live: bool = True
    # Multi-source comparison
    source_offers: List[ProviderSourceOffer] = Field(default_factory=list)
    lowest_source: Optional[str] = None
    lowest_price: Optional[float] = None
    sources_count: int = 1
    # Frontend aliases
    origin: Optional[str] = None
    destination: Optional[str] = None
    origin_city: Optional[str] = None
    destination_city: Optional[str] = None
    total_fare: Optional[float] = None
    taxes_fees: Optional[float] = None
    baggage: Optional[Dict[str, str]] = None
    refundable: bool = False
    badges: List[str] = []
    seats_remaining: int = 5
    score: Optional[float] = None
    provider: Optional[str] = None

class PriceAnalytics(BaseModel):
    lowest_price: float
    average_price: float
    highest_price: float
    potential_savings: float
    lowest: Optional[float] = None
    average: Optional[float] = None
    highest: Optional[float] = None
    savings_vs_avg: Optional[float] = None
    currency: str = "INR"
    price_trend: Optional[str] = "stable"

class FlightAgentStep(BaseModel):
    id: str
    step_name: str
    status: str
    detail: str
    tool_used: Optional[str] = None

class FlightSearchResponse(BaseModel):
    search_id: str
    origin: str
    destination: str
    origin_airport_name: str
    destination_airport_name: str
    departure_date: str
    return_date: Optional[str] = None
    trip_type: str
    passengers: int
    cabin_class: str
    total_offers_found: int
    is_live: bool
    last_updated: str
    provider_status: str
    flights: List[FlightOffer]
    airlines_available: List[str]
    price_analytics: PriceAnalytics
    ai_recommendation: str
    agent_steps: List[FlightAgentStep] = []
    total_results: Optional[int] = None
    is_live_data: Optional[bool] = None
    data_timestamp: Optional[str] = None

class CopilotFlightRequest(BaseModel):
    question: str
    flights: List[FlightOffer]
    search_context: Optional[Dict[str, Any]] = None

class CopilotFlightResponse(BaseModel):
    answer: str
    suggested_questions: List[str] = []
    highlighted_flight_ids: List[str] = []

class FlightPriceWatchRequest(BaseModel):
    origin: str
    destination: str
    departure_date: str
    target_price: float
    currency: str = "INR"
    user_email: Optional[str] = None

class FlightPriceWatchResponse(BaseModel):
    watch_id: str
    status: str
    message: str
    monitoring_active: bool
    current_lowest_price: Optional[float] = None
    created_at: str

class MultiCitySegmentRequest(BaseModel):
    origin: str
    destination: str
    departure_date: str

class MultiCitySearchRequest(BaseModel):
    segments: List[MultiCitySegmentRequest]
    passengers: int = 1
    cabin_class: str = "economy"

class MultiCityItinerary(BaseModel):
    itinerary_id: str
    total_fare: float
    currency: str = "INR"
    carrier_summary: str
    segments: List[FlightOffer]
    booking_url: Optional[str] = None
    source: str = "GDS Route Planner"

class MultiCitySearchResponse(BaseModel):
    search_id: str
    segments_count: int
    total_itineraries: int
    itineraries: List[MultiCityItinerary]
    is_live_data: bool = True
    data_timestamp: str

class FlexibleDateFare(BaseModel):
    date: str
    day_name: str
    lowest_fare: float
    currency: str = "INR"
    is_base_date: bool = False
    is_cheapest: bool = False
    diff_vs_base: float = 0.0

class FlexibleDatesResponse(BaseModel):
    origin: str
    destination: str
    base_date: str
    cheapest_date: str
    max_savings: float
    dates: List[FlexibleDateFare]

class RepriceRequest(BaseModel):
    flight_id: str
    source: str
    expected_price: float
    currency: str = "INR"

class RepriceResponse(BaseModel):
    flight_id: str
    source: str
    status: str  # "confirmed" | "price_updated" | "sold_out"
    confirmed_price: float
    previous_price: float
    price_changed: bool
    price_difference: float
    seats_available: int
    booking_url: str
    message: str
    valid_until: str

