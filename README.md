# CompareX AI — Enterprise Agentic Shopping, Travel & Hotel Comparison Engine

> **Agentic AI-Powered Universal Shopping & Travel Comparison Assistant**  
> An autonomous multi-agent platform that evaluates real-time retailer inventories, airline GDS systems, and hotel portals using natural language understanding and multi-factor transparent scoring.

---

## 🌟 Key Architecture & Capabilities

### 1. Autonomous Multi-Agent Graph
- **Master Orchestrator Agent**: Deconstructs user queries, resolves category constraints, budgets, and feature criteria.
- **Shopping Specialist Agent**: Connects to verified retailer indexes (Amazon, Flipkart, Croma, Brand stores) and normalizes hardware specifications.
- **Travel Specialist Agent**: Scans live flight itineraries across IndiGo, Akasa Air, and Air India.
- **Hotel Specialist Agent**: Audits luxury resorts & business hotels across Booking.com, Agoda, and MakeMyTrip.
- **Comparison & Scoring Engine**: Calculates value-for-money indices, filters violator items, and awards *Best Overall*, *Best Value*, *Cheapest*, and *Fastest* badges.
- **Customer Sentiment Agent**: Synthesizes verified buyer reviews into quantitative sentiment distributions (% positive, neutral, negative) and extracts top pros & cons.
- **Price Watch Radar Agent**: Background monitor tracking target thresholds with simulated drop triggers.
- **Human-in-the-Loop Safety Gate**: Enforces explicit user confirmation before external redirects or checkout actions.

### 2. Next-Level UI/UX Suite
- **Ultra-Modern Dark AI Aesthetic**: Glassmorphism surfaces, responsive typography, and glowing gradients.
- **Interactive SVG Price Charts**: 30/60/90-day verified feed historical price trends with all-time low markers and buying advice.
- **Side-by-Side Comparison Matrix**: Pin up to 4 items and view full attribute tables with winning highlights.
- **Export & Share**: 1-click Export to CSV and shareable link generator with toast notifications.
- **User Profile & Currency Engine**: Instant live currency switching between **₹ INR**, **$ USD**, and **€ EUR**.
- **Saved Searches & History**: Fast query caching with instant rerun support.
- **Copilot Refinement Drawer**: Conversational query tuning (*"Filter strictly under ₹56,000"*, *"Direct flights only"*).

---

## 📁 Repository Structure

```
CampareX/
├── frontend/                     # Next.js 16 + React + TypeScript + Tailwind CSS
│   ├── app/                      # Next.js App Router (layout, page)
│   ├── components/               # Production UI Components
│   │   ├── Navbar.tsx            # Glass navigation bar with Profile & Currency
│   │   ├── HeroSearch.tsx        # Central AI prompt input & quick chips
│   │   ├── AgentStatusPanel.tsx  # Animated autonomous execution stepper
│   │   ├── ProductCard.tsx       # Shopping card with PriceChart & Sentiment toggles
│   │   ├── TravelCard.tsx        # Flight itinerary timeline card
│   │   ├── HotelCard.tsx         # Luxury hotel card with amenities & room rates
│   │   ├── ComparisonDrawer.tsx  # Floating compare tray & side-by-side modal
│   │   ├── PriceChart.tsx        # Interactive SVG historical trend chart
│   │   ├── SentimentBreakdown.tsx# Buyer reviews sentiment meter & pros/cons
│   │   ├── PriceWatchDashboard.tsx# Full price alerts radar & simulation
│   │   ├── UserProfileModal.tsx  # Currency & preference settings
│   │   ├── SavedHistoryDrawer.tsx# Recent queries drawer
│   │   ├── ApprovalModal.tsx     # Human approval safety gate
│   │   └── Toast.tsx             # Notification toast stack
│   ├── lib/
│   │   ├── types.ts              # Canonical TypeScript schemas
│   │   ├── mock-data.ts          # Comprehensive realistic catalog
│   │   └── agent-client.ts       # Agent execution engine & backend connector
│   ├── Dockerfile                # Production multi-stage Docker build
│   └── vercel.json               # Vercel deployment configuration
│
├── backend/                      # Python FastAPI Multi-Agent Engine
│   ├── app/
│   │   ├── agents/               # Orchestration & intent parsing
│   │   ├── connectors/           # Provider adapters (Amazon, IndiGo, Booking.com)
│   │   ├── schemas/              # Pydantic data models
│   │   └── main.py               # REST API endpoints
│   ├── Dockerfile                # Python container
│   └── requirements.txt          # Python dependencies
│
├── docker-compose.yml            # 1-Click Multi-Container Deployment
└── README.md                     # Documentation
```

---

## 🚀 Quick Start (Local Development)

### 1. Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 2. Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
API Documentation will be live at **[http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)**.

---

## 🐳 Docker Deployment (1-Command)

Run both Frontend and Backend together in isolated containers:
```bash
docker compose up --build
```
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:8000`

---

## ☁️ Cloud Production Deployment Guide

### Deploying Frontend to Vercel
1. Push your repository to GitHub / GitLab.
2. Sign in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `CampareX` repository.
4. Set the **Root Directory** to `frontend`.
5. Environment Variable (Optional):
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g. `https://comparex-api.onrender.com`).
6. Click **Deploy**. Vercel will automatically build and assign a production SSL domain.

### Deploying Backend to Render / Railway / Fly.io
1. Create a new **Web Service** on [Render](https://render.com) or [Railway](https://railway.app).
2. Point to the `backend/` directory.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. Click **Deploy**. Copy the public service URL into the frontend's `NEXT_PUBLIC_API_URL`.

---

## 🔒 Safety & Trust Guarantee
- **No Silent Purchases**: CompareX requires explicit user interaction before redirecting to external merchants.
- **Zero Sponsored Ranking**: Recommendation scores are derived strictly from price-to-performance metrics, verified reviews, and provider reliability.
