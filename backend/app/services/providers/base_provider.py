from abc import ABC, abstractmethod
from typing import List, Optional, Dict, Any
from app.schemas.flight_models import FlightSearchRequest, FlightOffer, RepriceRequest, RepriceResponse

class FlightProvider(ABC):
    """
    Abstract Provider Interface for all flight sources.
    Enables plug-and-play addition of GDS and direct airline integrations (Duffel, Amadeus, Travelport, Scheduled GDS).
    """

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Name of the provider, e.g. Duffel, Amadeus, Travelport, ScheduledGDS"""
        pass

    @property
    @abstractmethod
    def is_configured(self) -> bool:
        """Returns True if provider has valid credentials / active runtime access"""
        pass

    @abstractmethod
    async def search_flights(self, req: FlightSearchRequest) -> List[FlightOffer]:
        """Search flight offers from this provider"""
        pass

    @abstractmethod
    async def reprice_flight(self, req: RepriceRequest) -> RepriceResponse:
        """Re-check real-time price and seat availability before checkout"""
        pass
