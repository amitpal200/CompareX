"""
Product Truth & Data Provenance Schemas for CompareX AI.
Enforces strict relationship between provider listings, product identity,
verified pricing, and transparent auditability.
"""
from enum import Enum
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone

class PriceType(str, Enum):
    LISTED_PRICE = "LISTED_PRICE"
    SALE_PRICE = "SALE_PRICE"
    MRP = "MRP"
    EFFECTIVE_PRICE = "EFFECTIVE_PRICE"
    ESTIMATED_PRICE = "ESTIMATED_PRICE"
    UNKNOWN = "UNKNOWN"

class SourceType(str, Enum):
    PROVIDER_CONFIRMED = "PROVIDER_CONFIRMED"
    AI_INFERRED = "AI_INFERRED"
    SIMULATED_DEMO = "SIMULATED_DEMO"
    UNVERIFIED = "UNVERIFIED"

class ProductVariant(BaseModel):
    color: Optional[str] = None
    size: Optional[str] = None
    storage: Optional[str] = None
    configuration: Optional[str] = None

class FieldProvenance(BaseModel):
    field_name: str
    value: Any
    source: str
    source_type: SourceType = SourceType.PROVIDER_CONFIRMED
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    confidence: float = 1.0

class NormalizedProductListing(BaseModel):
    """
    Immutable normalized provider record. Preserves exact provider data
    and field-level provenance.
    """
    provider: str
    provider_listing_id: str
    product_id: str
    canonical_product_id: str
    brand: str
    product_name: str
    model_number: Optional[str] = None
    sku: Optional[str] = None
    gtin: Optional[str] = None
    category: str
    subcategory: Optional[str] = None
    variant: ProductVariant = Field(default_factory=ProductVariant)
    image_url: str
    product_url: str
    price: float
    original_price: Optional[float] = None
    currency: str = "INR"
    price_type: PriceType = PriceType.SALE_PRICE
    rating: Optional[float] = None
    review_count: Optional[int] = None
    seller: Optional[str] = None
    availability: str = "In Stock"
    delivery: Optional[str] = "Standard Delivery"
    source_timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    is_demo: bool = False
    provenance: Dict[str, FieldProvenance] = Field(default_factory=dict)
    raw_provider_data: Optional[Dict[str, Any]] = None

class ValidationResult(BaseModel):
    is_valid: bool
    status: str # "SOURCE_VERIFIED", "PARTIALLY_VERIFIED", "REJECTED", "DEMO_DATA"
    confidence_score: int # 0 to 100
    errors: List[str] = Field(default_factory=list)
    warnings: List[str] = Field(default_factory=list)
    breakdown: Dict[str, bool] = Field(default_factory=dict)

class PriceOfferRecord(BaseModel):
    provider: str
    provider_listing_id: str
    canonical_product_id: str
    variant: ProductVariant = Field(default_factory=ProductVariant)
    price: float
    original_price: Optional[float] = None
    currency: str = "INR"
    price_type: PriceType = PriceType.SALE_PRICE
    discount_pct: Optional[int] = None
    seller: Optional[str] = None
    shipping: str = "Free Delivery"
    availability: str = "In Stock"
    product_url: str = "#"
    rating: Optional[float] = None
    review_count: Optional[int] = None
    last_updated: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    price_status: str = "VERIFIED" # "VERIFIED", "DEMO_PRICE", "UNVERIFIED"

class VerifiedProduct(BaseModel):
    """
    Downstream recommendation layer strictly operates on VerifiedProduct.
    Never stitches disjoint data from Product A, B, and C.
    """
    canonical_product_id: str
    brand: str
    product_name: str
    model_number: Optional[str] = None
    sku: Optional[str] = None
    category: str
    subcategory: Optional[str] = None
    variant: ProductVariant = Field(default_factory=ProductVariant)
    primary_image_url: str
    rating: float
    review_count: int
    specifications: Dict[str, str] = Field(default_factory=dict)
    best_price: float
    best_provider: str
    offers: List[PriceOfferRecord] = Field(default_factory=list)
    verification_status: str = "SOURCE_VERIFIED"
    confidence_score: int = 95
    confidence_breakdown: Dict[str, bool] = Field(default_factory=dict)
    provenance_summary: Dict[str, Any] = Field(default_factory=dict)
    warnings: List[str] = Field(default_factory=list)
    is_demo: bool = False
