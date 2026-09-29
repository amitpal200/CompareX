export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED' | 'SGD';

export interface CurrencyRate {
  symbol: string;
  rateFromINR: number;
}

export const CURRENCY_MAP: Record<CurrencyCode, CurrencyRate> = {
  INR: { symbol: '₹', rateFromINR: 1 },
  USD: { symbol: '$', rateFromINR: 0.012 },
  EUR: { symbol: '€', rateFromINR: 0.011 },
  GBP: { symbol: '£', rateFromINR: 0.0095 },
  AED: { symbol: 'AED ', rateFromINR: 0.044 },
  SGD: { symbol: 'S$', rateFromINR: 0.016 }
};

export interface ProductOffer {
  provider: 'Amazon' | 'Flipkart' | 'Croma' | 'Reliance Digital' | 'Tata CLiQ' | 'Official Brand Store' | string;
  price: number;
  listed_price?: number;
  original_price?: number;
  discount_amount?: number;
  offer_terms?: string;
  currency: string;
  shipping: string;
  delivery_days?: number;
  availability: string;
  source_url: string;
  rating: number;
  review_count: number;
  store_badge?: string;
  badges?: string[];
  effective_price?: number;
  fee_delivery?: number;
  card_discount?: number;
  fetched_at: string;
  seller?: string;
  price_type?: string;
  price_status?: 'VERIFIED' | 'DEMO_PRICE' | 'UNVERIFIED';
}

export interface SentimentAnalysis {
  positivePercentage: number;
  neutralPercentage: number;
  negativePercentage: number;
  totalReviewsAnalyzed: number;
  topPros: string[];
  topCons: string[];
  buyerVerdict: string;
}

export interface PriceHistoryPoint {
  date: string;
  price: number;
}

export interface ScoreBreakdown {
  performance: number;
  price: number;
  reviews: number;
  specs: number;
  delivery: number;
  match: number;
}

export interface PriorityWeights {
  performance: number;
  price: number;
  battery?: number;
  weight?: number;
  gaming?: number;
  camera?: number;
  sound?: number;
  anc?: number;
  comfort?: number;
  durability?: number;
  display?: number;
  gpu?: number;
  [key: string]: number | undefined;
}

export interface ParsedIntentData {
  intent_type: string;
  category: string;
  subcategory?: string;
  detected_goal?: string;
  budget_max?: number | null;
  use_case?: string[];
  hard_constraints?: string[];
  soft_preferences?: string[];
  priorities?: string[];
  clarification_needed?: boolean;
  clarification_question?: string | null;
  clarification_options?: string[];
}

export interface ShoppingMissionTaskData {
  task_id: string;
  category: string;
  title: string;
  allocated_budget: number;
  selected_product?: Product;
  status: string;
}

export interface ShoppingMissionData {
  mission_id: string;
  goal: string;
  total_budget: number;
  allocated_total: number;
  remaining_budget: number;
  tasks: ShoppingMissionTaskData[];
}

export interface PriceBreakdownData {
  provider: string;
  listed_price: number;
  mrp: number;
  delivery_fee: number;
  verified_discount: number;
  effective_price: number;
  savings_vs_mrp: number;
  offer_terms: string;
  delivery_estimate: string;
  availability: string;
  disclaimer: string;
}

export interface Product {
  canonical_id: string;
  title: string;
  brand: string;
  category: 'shopping';
  subcategory: 'Gaming Laptops' | 'Smartphones' | 'Headphones' | 'Smartwatches' | string;
  image: string;
  specifications: Record<string, string>;
  rating: number;
  review_count: number;
  best_price: number;
  badge?: 'Best Overall' | 'Best Value' | 'Cheapest' | 'Editor\'s Choice' | 'Best Performance' | 'Best For You' | string;
  score: number;
  score_reasons: string[];
  score_breakdown?: ScoreBreakdown;
  trade_offs?: string[];
  fastest_delivery?: string;
  offers: ProductOffer[];
  price_history: PriceHistoryPoint[];
  sentiment?: SentimentAnalysis;
  buy_advice?: 'Buy Now' | 'Wait for Sale' | 'Fair Price';
  is_demo_mock?: boolean;
  model_number?: string;
  sku?: string;
  variant?: {
    color?: string;
    size?: string;
    storage?: string;
    configuration?: string;
  };
  verification_status?: 'SOURCE_VERIFIED' | 'PARTIALLY_VERIFIED' | 'DEMO_DATA' | 'REJECTED' | string;
  confidence_score?: number;
  confidence_breakdown?: Record<string, boolean>;
  why_trust_data?: Record<string, any>;
  source_timestamp?: string;
}

export interface AirportItem {
  code: string;
  city: string;
  name: string;
  country: string;
  terminal_hint?: string;
}

export interface FlightOffer {
  id: string;
  airline: string;
  airline_code: string;
  airline_logo?: string;
  flight_number: string;
  aircraft?: string;
  origin: string;
  origin_code?: string;
  origin_name?: string;
  origin_city?: string;
  origin_terminal?: string;
  destination: string;
  destination_code?: string;
  destination_name?: string;
  destination_city?: string;
  destination_terminal?: string;
  departure_time: string;
  arrival_time: string;
  departure_date?: string;
  arrival_date?: string;
  duration: string;
  duration_minutes: number;
  stops: number;
  stops_label?: string;
  stops_count?: number;
  stop_cities?: string[];
  cabin_class: string;
  price?: number;
  total_fare: number;
  base_fare: number;
  taxes_fees: number;
  taxes_and_fees?: number;
  currency: string;
  baggage: {
    cabin: string;
    checkin: string;
  };
  checked_baggage?: string;
  cabin_baggage?: string;
  seat_selection?: string;
  refundable: boolean;
  refundability?: string;
  change_policy?: string;
  cancellation_policy?: string;
  fare_type?: string;
  booking_provider?: string;
  booking_url: string;
  provider: string;
  rating?: number;
  badge?: 'BEST OVERALL' | 'CHEAPEST' | 'FASTEST' | string | null;
  badges: string[];
  seats_remaining: number;
  value_score?: number;
  score?: number;
  score_reasons?: string[];
  fetched_at?: string;
  is_live: boolean;
  source_offers?: ProviderSourceOffer[];
  lowest_source?: string;
  lowest_price?: number;
  sources_count?: number;
}

export interface ProviderSourceOffer {
  source: string;
  source_type: 'direct' | 'gds' | 'ota' | 'consolidator' | string;
  platform_code?: 'makemytrip' | 'easemytrip' | 'cleartrip' | 'yatra' | 'airline_direct' | 'goibibo' | string;
  price: number;
  currency: string;
  base_fare: number;
  taxes_fees: number;
  convenience_fee?: number;
  promo_discount?: number;
  promo_code?: string;
  offer_terms?: string;
  baggage: {
    cabin: string;
    checkin: string;
  };
  fare_type: string;
  refundability: string;
  booking_url?: string;
  is_lowest: boolean;
  price_diff_vs_lowest: number;
  fare_conditions_differ: boolean;
  notes?: string;
  perks?: string[];
}

export interface FlexibleDateFare {
  date: string;
  day_name: string;
  lowest_fare: number;
  currency: string;
  is_base_date: boolean;
  is_cheapest: boolean;
  diff_vs_base: number;
}

export interface FlexibleDatesResponse {
  origin: string;
  destination: string;
  base_date: string;
  cheapest_date: string;
  max_savings: number;
  dates: FlexibleDateFare[];
}

export interface MultiCitySegmentRequest {
  origin: string;
  destination: string;
  departure_date: string;
}

export interface MultiCityItinerary {
  itinerary_id: string;
  total_fare: number;
  currency: string;
  carrier_summary: string;
  segments: FlightOffer[];
  booking_url?: string;
  source: string;
}

export interface MultiCitySearchResponse {
  search_id: string;
  segments_count: number;
  total_itineraries: number;
  itineraries: MultiCityItinerary[];
  is_live_data: boolean;
  data_timestamp: string;
}

export interface RepriceRequest {
  flight_id: string;
  source: string;
  expected_price: number;
  currency: string;
}

export interface RepriceResponse {
  flight_id: string;
  source: string;
  status: 'confirmed' | 'price_updated' | 'sold_out' | string;
  confirmed_price: number;
  previous_price: number;
  price_changed: boolean;
  price_difference: number;
  seats_available: number;
  booking_url: string;
  message: string;
  valid_until: string;
}

export interface PriceAnalytics {
  lowest: number;
  average: number;
  highest: number;
  lowest_price?: number;
  average_price?: number;
  highest_price?: number;
  currency: string;
  savings_vs_avg: number;
  potential_savings?: number;
  price_trend?: 'falling' | 'stable' | 'rising';
  historical_low?: number;
  historical_high?: number;
}

export interface FlightSearchResponse {
  search_id?: string;
  origin: string;
  destination: string;
  origin_airport_name?: string;
  destination_airport_name?: string;
  departure_date: string;
  return_date?: string | null;
  trip_type?: string;
  passengers?: number;
  cabin_class?: string;
  total_results: number;
  total_offers_found?: number;
  is_live_data: boolean;
  is_live?: boolean;
  data_timestamp: string;
  last_updated?: string;
  provider_status?: string;
  flights: FlightOffer[];
  airlines_available?: string[];
  price_analytics: PriceAnalytics;
  ai_recommendation?: string;
  agent_steps?: AgentStep[];
}

export interface FlightFilterState {
  maxPrice: number;
  stops: number[];
  airlines: string[];
  cabinClasses: string[];
  timeOfDay: ('morning' | 'afternoon' | 'evening' | 'night')[];
  refundableOnly: boolean;
  maxDurationMinutes: number;
  departureTimePeriod?: string | null;
  arrivalTimePeriod?: string | null;
  hasCheckedBaggage?: boolean;
  hasCabinBaggage?: boolean;
  isRefundable?: boolean;
}


export interface TravelOption {
  id: string;
  type: 'flight';
  category: 'travel';
  provider: string;
  logoText: string;
  flight_number?: string;
  airline_code?: string;
  aircraft?: string;
  origin: string;
  destination: string;
  departure: string;
  arrival: string;
  duration: string;
  duration_minutes?: number;
  stops: string;
  stops_count?: number;
  baggage: string;
  cabin_baggage?: string;
  checked_baggage?: string;
  seat_selection?: string;
  refundability?: string;
  change_policy?: string;
  cancellation_policy?: string;
  fare_type?: string;
  booking_provider?: string;
  booking_url?: string;
  price: number;
  currency: string;
  taxes_and_fees?: number;
  base_fare?: number;
  rating: number;
  badge?: 'Best Overall' | 'Cheapest' | 'Fastest' | 'BEST OVERALL' | 'CHEAPEST' | 'FASTEST' | string;
  score: number;
  value_score?: number;
  score_reasons: string[];
  source_url: string;
  fetched_at: string;
  is_live?: boolean;
  cabin_class?: string;
  amenities?: string[];
  price_history?: PriceHistoryPoint[];
  buy_advice?: 'Buy Now' | 'Prices Rising Soon' | 'Stable Fare';
  source_offers?: ProviderSourceOffer[];
  lowest_source?: string;
  lowest_price?: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  tripType?: 'Family' | 'Couple' | 'Business' | 'Solo' | 'Family Stay' | 'Couple Vacation' | 'Business Trip' | 'Solo Traveler' | string;
}

export interface HotelOption {
  id: string;
  type: 'hotel';
  category: 'hotel';
  name: string;
  location: string;
  city: string;
  star_rating: number;
  guest_rating: number;
  review_count: number;
  image: string;
  gallery?: string[];
  room_type: string;
  price_per_night: number;
  original_price?: number;
  currency: string;
  badge?: 'Best Luxury' | 'Best Value' | 'Top Rated' | 'Budget Pick' | 'Best Overall' | 'Super Saver' | string;
  score: number;
  score_reasons: string[];
  amenities: string[];
  breakfast_included?: boolean;
  check_in?: string;
  check_out?: string;
  distance_to_beach?: string;
  distance_to_airport?: string;
  cancellation_policy: string;
  providers: {
    provider: 'Booking.com' | 'Agoda' | 'MakeMyTrip' | 'Expedia' | string;
    price: number;
    room_perks: string;
    source_url: string;
  }[];
  price_history?: PriceHistoryPoint[];
  sentiment?: SentimentAnalysis;
  customer_reviews?: CustomerReview[];
}

export type ComparisonItem = 
  | { type: 'product'; data: Product }
  | { type: 'travel'; data: TravelOption }
  | { type: 'hotel'; data: HotelOption };

export interface AgentStep {
  id: string;
  step_name: string;
  status: 'done' | 'active' | 'pending';
  detail: string;
  tool_used?: string;
}

export interface MultimodalAnalysis {
  search_type: 'image' | 'url';
  detected_title: string;
  detected_brand: string;
  detected_category: string;
  confidence_pct: number;
  visual_attributes: string[];
  source_url_analyzed?: string;
  cheapest_store?: string;
  effective_savings?: number;
  uploaded_image_preview?: string;
  canonical_products?: Product[];
}

export interface SearchResultState {
  request_id: string;
  query: string;
  detected_type: 'shopping' | 'travel' | 'hotel';
  parsed_intent: {
    intent: string;
    budget?: number;
    category?: string;
    features?: string[];
    origin?: string;
    destination?: string;
    time_window?: string;
  };
  agent_steps: AgentStep[];
  products: Product[];
  travel_options: TravelOption[];
  hotel_options: HotelOption[];
  recommendation_summary: string;
  why_chose_this?: string;
  why_not_cheapest?: string;
  parsed_intent_data?: ParsedIntentData;
  shopping_mission?: ShoppingMissionData;
  multimodal_analysis?: MultimodalAnalysis;
  warnings: string[];
}

export interface PriceAlert {
  id: string;
  itemId: string;
  itemTitle: string;
  targetPrice: number;
  currentPrice: number;
  createdAt: string;
  category: 'shopping' | 'travel' | 'hotel';
  status: 'monitoring' | 'triggered';
  lastChecked: string;
  provider: string;
}

export interface UserProfile {
  name: string;
  email: string;
  currency: CurrencyCode;
  homeAirport: string;
  preferredStores: string[];
  emailAlerts: boolean;
  budgetCapNotification: boolean;
}

export interface SearchHistoryItem {
  id: string;
  query: string;
  category: 'shopping' | 'travel' | 'hotel';
  timestamp: string;
  resultsCount: number;
}

export interface ReviewIntelligenceData {
  hotel_id: string;
  hotel_name: string;
  cleanliness_score: number;
  location_score: number;
  staff_score: number;
  food_score: number;
  value_for_money_score: number;
  overall_sentiment_pct: number;
  positive_themes: string[];
  negative_themes: string[];
  verified_summary: string;
}

export interface ComparisonVerdict {
  winner_id: string;
  winner_name: string;
  title: string;
  verdict_explanation: string;
  pros_by_hotel: Record<string, string[]>;
  trade_offs: string[];
  user_persona_matched: string;
}

export interface BookingCostBreakdown {
  hotel_id: string;
  hotel_name: string;
  room_type: string;
  location: string;
  dates: string;
  nights: number;
  base_rate_per_night: number;
  subtotal: number;
  gst_percentage: number;
  gst_amount: number;
  service_fee: number;
  total_payable: number;
  currency: string;
  cancellation_policy: string;
  confirmation_required: boolean;
}
