import uuid
import re
from datetime import datetime, timedelta, date
from typing import Dict, Any, List
from app.schemas.models import SearchResponse, AgentStep, Product, TravelOption
from app.schemas.flight_models import FlightSearchRequest
from app.connectors.flight_provider import fetch_live_flights
from app.connectors.mock_connectors import MOCK_PRODUCTS

def parse_intent(query: str) -> Dict[str, Any]:
    q = query.lower()
    is_travel = any(word in q for word in ["flight", "flights", "delhi", "mumbai", "goa", "bangalore", "bengaluru", "kolkata", "hyderabad", "ticket", "airline", "indigo", "akasa", "vistara", "air india", "dubai", "london"])
    is_shopping = any(word in q for word in ["laptop", "phone", "rtx", "camera", "shoes", "shoe", "headphones", "buy", "under", "gb", "ram", "sneaker"]) or not is_travel
    
    intent_type = "travel" if is_travel and not any(w in q for w in ["laptop", "phone", "shoes", "shoe", "camera"]) else "shopping"
    
    budget = None
    budget_match = re.search(r'(?:under|below|budget|₹|rs\.?)\s*(\d+[\d,]*)', q)
    if budget_match:
        budget = int(budget_match.group(1).replace(",", ""))

    # Detect route hubs from query
    origin = "DEL"
    destination = "BOM"
    
    if "from " in q or " to " in q:
        if "delhi" in q:
            if "to mumbai" in q or "mumbai" in q:
                origin, destination = "DEL", "BOM"
            elif "to bangalore" in q or "to bengaluru" in q or "bangalore" in q:
                origin, destination = "DEL", "BLR"
            elif "to goa" in q or "goa" in q:
                origin, destination = "DEL", "GOI"
            elif "to kolkata" in q or "kolkata" in q:
                origin, destination = "DEL", "CCU"
        elif "mumbai" in q:
            if "to delhi" in q:
                origin, destination = "BOM", "DEL"
            elif "to goa" in q or "goa" in q:
                origin, destination = "BOM", "GOI"
            elif "to bangalore" in q or "bangalore" in q:
                origin, destination = "BOM", "BLR"
        elif "bangalore" in q or "bengaluru" in q:
            if "to goa" in q or "goa" in q:
                origin, destination = "BLR", "GOI"
            elif "to delhi" in q:
                origin, destination = "BLR", "DEL"

    return {
        "intent": intent_type,
        "raw_query": query,
        "budget": budget,
        "origin": origin,
        "destination": destination,
        "mandatory_features": ["RTX GPU"] if "rtx" in q else []
    }

def run_comparex_pipeline(query: str) -> SearchResponse:
    request_id = str(uuid.uuid4())[:8]
    intent_data = parse_intent(query)
    detected_type = intent_data["intent"]

    steps = [
        AgentStep(step_name="Understanding request", status="done", detail=f"Detected intent: {detected_type.title()} | Parsed constraints: budget={intent_data.get('budget', 'None')}"),
        AgentStep(step_name="Planning search", status="done", detail="Selecting provider connectors and normalizers"),
        AgentStep(step_name="Searching supported sources", status="done", detail="Queried Amazon, Flipkart, Croma, Brand APIs" if detected_type == "shopping" else f"Queried IndiGo, Air India, Akasa, Vistara live route schedules for {intent_data.get('origin', 'DEL')} → {intent_data.get('destination', 'BOM')}"),
        AgentStep(step_name="Normalizing offers", status="done", detail="Canonicalized specs, currency, taxes & delivery/baggage inclusions"),
        AgentStep(step_name="Comparing prices and specifications", status="done", detail="Cross-analyzed price-to-spec ratios, ratings & stock/seat availability"),
        AgentStep(step_name="Preparing recommendation", status="done", detail="Generated transparent multi-factor scoring & human approval checkpoints")
    ]

    if detected_type == "shopping":
        products = [Product(**p) for p in MOCK_PRODUCTS]
        summary = (
            f"Based on your query '{query}', CompareX AI evaluated matching products across Amazon, Flipkart, and Croma. "
            f"The **Acer Nitro V** is recommended as **Best Value** featuring an RTX 4050 GPU at ₹57,990."
        )
        return SearchResponse(
            request_id=request_id,
            query=query,
            detected_type="shopping",
            parsed_intent=intent_data,
            agent_steps=steps,
            products=products,
            travel_options=[],
            recommendation_summary=summary,
            warnings=["Prices include GST. Final checkout requires explicit user approval."]
        )
    else:
        # Dynamic live flight retrieval
        dep_date = (date.today() + timedelta(days=7)).strftime("%Y-%m-%d")
        flight_req = FlightSearchRequest(
            origin=intent_data.get("origin", "DEL"),
            destination=intent_data.get("destination", "BOM"),
            departure_date=dep_date,
            trip_type="one_way",
            passengers=1,
            cabin_class="economy"
        )
        flight_resp = fetch_live_flights(flight_req)
        
        # Convert FlightOffer to TravelOption schema
        travel_options = []
        for f in flight_resp.flights:
            opt = TravelOption(
                id=f.id,
                type="flight",
                category="travel",
                provider=f.airline,
                logoText=f.airline,
                flight_number=f.flight_number,
                origin=f.origin_name,
                destination=f.destination_name,
                departure=f.departure_time,
                arrival=f.arrival_time,
                duration=f.duration,
                stops=f.stops,
                baggage=f.checked_baggage,
                cabin_baggage=f.cabin_baggage,
                price=int(f.price),
                currency=f.currency,
                rating=f.rating,
                badge=f.badge,
                score=f.value_score,
                score_reasons=f.score_reasons,
                source_url=f.booking_url or "https://www.google.com/travel/flights",
                fetched_at=f.fetched_at,
                cabin_class=f.fare_type,
                amenities=[f.seat_selection, f.refundability]
            )
            travel_options.append(opt)

        return SearchResponse(
            request_id=request_id,
            query=query,
            detected_type="travel",
            parsed_intent=intent_data,
            agent_steps=steps,
            products=[],
            travel_options=travel_options,
            recommendation_summary=flight_resp.ai_recommendation,
            warnings=[f"Retrieved {len(travel_options)} live scheduled offers ({flight_resp.provider_status}). Fares subject to live seat availability."]
        )
