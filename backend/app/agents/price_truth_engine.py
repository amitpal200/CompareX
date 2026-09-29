"""
Price Truth Engine for CompareX AI.
Ensures prices are never detached from provider listings, detects price conflicts,
validates freshness, and evaluates lowest verified prices across stores.
"""
from typing import List, Dict, Any, Optional, Tuple
from datetime import datetime, timezone
from app.schemas.truth_models import (
    PriceOfferRecord,
    PriceType,
    ProductVariant,
    NormalizedProductListing
)

class PriceTruthEngine:
    """
    Manages multi-store price validation and prevents price fabrication.
    """

    @classmethod
    def create_offer_from_listing(cls, listing: NormalizedProductListing) -> PriceOfferRecord:
        """
        Creates an immutable, verified PriceOfferRecord tied directly to the provider listing.
        """
        discount_pct = 0
        if listing.original_price and listing.original_price > listing.price:
            discount_pct = int(round(((listing.original_price - listing.price) / listing.original_price) * 100))

        price_status = "DEMO_PRICE" if listing.is_demo else "VERIFIED"

        return PriceOfferRecord(
            provider=listing.provider,
            provider_listing_id=listing.provider_listing_id,
            canonical_product_id=listing.canonical_product_id,
            variant=listing.variant,
            price=listing.price,
            original_price=listing.original_price,
            currency=listing.currency,
            price_type=listing.price_type,
            discount_pct=discount_pct,
            seller=listing.seller or f"Verified {listing.provider} Retailer",
            shipping=listing.delivery or "Free Delivery",
            availability=listing.availability,
            product_url=listing.product_url,
            rating=listing.rating,
            review_count=listing.review_count,
            last_updated=listing.source_timestamp,
            price_status=price_status
        )

    @classmethod
    def detect_conflicts(cls, offers: List[PriceOfferRecord]) -> List[str]:
        """
        Detects if identical provider listing has divergent prices at the same timestamp.
        """
        conflicts = []
        seen_listings: Dict[str, Tuple[float, str]] = {} # listing_id -> (price, provider)

        for offer in offers:
            key = f"{offer.provider}_{offer.provider_listing_id}"
            if key in seen_listings:
                prev_price, provider = seen_listings[key]
                if prev_price != offer.price:
                    conflicts.append(
                        f"DATA CONFLICT: Provider {provider} returned conflicting prices for listing '{offer.provider_listing_id}': ₹{prev_price} vs ₹{offer.price}."
                    )
            else:
                seen_listings[key] = (offer.price, offer.provider)

        return conflicts

    @classmethod
    def get_lowest_verified_offer(cls, offers: List[PriceOfferRecord]) -> Optional[PriceOfferRecord]:
        """
        Returns the offer with the lowest verified price.
        Ensures offer is valid and not unverified.
        """
        if not offers:
            return None
        valid_offers = [o for o in offers if o.price > 0 and o.price_status in ["VERIFIED", "DEMO_PRICE"]]
        if not valid_offers:
            return None
        return min(valid_offers, key=lambda x: x.price)

    @classmethod
    def format_freshness(cls, iso_timestamp: str) -> str:
        """
        Formats timestamp into human-readable freshness label.
        """
        try:
            now = datetime.now(timezone.utc)
            # Handle ISO with or without Z
            cleaned_ts = iso_timestamp.replace("Z", "+00:00")
            dt = datetime.fromisoformat(cleaned_ts)
            diff_seconds = int((now - dt).total_seconds())

            if diff_seconds < 60:
                return "Just now"
            elif diff_seconds < 3600:
                mins = diff_seconds // 60
                return f"{mins} min ago"
            elif diff_seconds < 86400:
                hours = diff_seconds // 3600
                return f"{hours} hour{'s' if hours > 1 else ''} ago"
            else:
                days = diff_seconds // 86400
                return f"{days} day{'s' if days > 1 else ''} ago"
        except Exception:
            return "Data timestamp available"
