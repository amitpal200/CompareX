import { createClient } from '@supabase/supabase-js';
import { Product, TravelOption, HotelOption, PriceAlert } from './types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zbklrlwktrzzqkhqrbng.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpia2xybHdrdHJ6enFraHFyYm5nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg2OTk3NjUsImV4cCI6MjEwNDI3NTc2NX0.lBARCX0rwKva1LdyrKGOlcozM8ZiETArm0QFEysUjzE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch products from Supabase
 */
export async function getProductsFromSupabase(): Promise<Product[] | null> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('score', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map(item => ({
      canonical_id: item.canonical_id,
      title: item.title,
      brand: item.brand,
      category: item.category as 'shopping',
      subcategory: item.subcategory,
      image: item.image,
      specifications: item.specifications || {},
      rating: Number(item.rating),
      review_count: item.review_count,
      best_price: Number(item.best_price),
      badge: item.badge,
      score: Number(item.score),
      score_reasons: item.score_reasons || [],
      offers: item.offers || [],
      price_history: item.price_history || [],
      sentiment: item.sentiment,
      buy_advice: item.buy_advice
    }));
  } catch (err) {
    console.warn('Supabase fetch failed, using local feed:', err);
    return null;
  }
}

/**
 * Fetch flights from Supabase
 */
export async function getFlightsFromSupabase(): Promise<TravelOption[] | null> {
  try {
    const { data, error } = await supabase
      .from('travel_options')
      .select('*')
      .order('score', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map(item => ({
      id: item.id,
      type: 'flight',
      category: 'travel',
      provider: item.provider,
      logoText: item.logo_text || item.provider,
      flight_number: item.flight_number,
      origin: item.origin,
      destination: item.destination,
      departure: item.departure,
      arrival: item.arrival,
      duration: item.duration,
      stops: item.stops,
      baggage: item.baggage,
      cabin_baggage: item.cabin_baggage,
      price: Number(item.price),
      currency: item.currency,
      rating: Number(item.rating),
      badge: item.badge,
      score: Number(item.score),
      score_reasons: item.score_reasons || [],
      source_url: item.source_url || '#',
      fetched_at: item.fetched_at || 'Live Feed',
      amenities: item.amenities || [],
      price_history: item.price_history || [],
      buy_advice: item.buy_advice
    }));
  } catch (err) {
    console.warn('Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Fetch hotels from Supabase
 */
export async function getHotelsFromSupabase(): Promise<HotelOption[] | null> {
  try {
    const { data, error } = await supabase
      .from('hotel_options')
      .select('*')
      .order('score', { ascending: false });

    if (error || !data || data.length === 0) {
      return null;
    }

    return data.map(item => ({
      id: item.id,
      type: 'hotel',
      category: 'hotel',
      name: item.name,
      location: item.location,
      city: item.city,
      star_rating: item.star_rating,
      guest_rating: Number(item.guest_rating),
      review_count: item.review_count,
      image: item.image,
      room_type: item.room_type,
      price_per_night: Number(item.price_per_night),
      currency: item.currency,
      badge: item.badge,
      score: Number(item.score),
      score_reasons: item.score_reasons || [],
      amenities: item.amenities || [],
      distance_to_beach: item.distance_to_beach,
      distance_to_airport: item.distance_to_airport,
      cancellation_policy: item.cancellation_policy,
      providers: item.providers || [],
      price_history: item.price_history || [],
      sentiment: item.sentiment
    }));
  } catch (err) {
    console.warn('Supabase fetch failed:', err);
    return null;
  }
}

/**
 * Save a Price Watch alert to Supabase
 */
export async function savePriceAlertToSupabase(alert: PriceAlert): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('price_alerts')
      .insert({
        id: alert.id,
        item_id: alert.itemId,
        item_title: alert.itemTitle,
        target_price: alert.targetPrice,
        current_price: alert.currentPrice,
        category: alert.category,
        status: alert.status,
        provider: alert.provider,
        last_checked: alert.lastChecked
      });

    return !error;
  } catch (err) {
    console.warn('Failed saving alert to Supabase:', err);
    return false;
  }
}
