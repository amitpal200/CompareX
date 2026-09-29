'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSearch } from '../components/HeroSearch';
import { AgentStatusPanel } from '../components/AgentStatusPanel';
import { ProductCard } from '../components/ProductCard';
import { TravelCard } from '../components/TravelCard';
import { HotelCard } from '../components/HotelCard';
import { ComparisonDrawer } from '../components/ComparisonDrawer';
import { ApprovalModal } from '../components/ApprovalModal';
import { PriceWatchModal } from '../components/PriceWatchModal';
import { PriceWatchDashboard } from '../components/PriceWatchDashboard';
import { UserProfileModal } from '../components/UserProfileModal';
import { SavedHistoryDrawer } from '../components/SavedHistoryDrawer';
import { RefinementChat } from '../components/RefinementChat';
import { ReviewIntelligenceModal } from '../components/ReviewIntelligenceModal';
import { ShoppingDecisionHero } from '../components/ShoppingDecisionHero';
import { BestForYouHeroCard } from '../components/BestForYouHeroCard';
import { CategoryFacetFilters } from '../components/CategoryFacetFilters';
import { PrioritySliders } from '../components/PrioritySliders';
import { PriceBreakdownModal } from '../components/PriceBreakdownModal';
import { ScoreBreakdownModal } from '../components/ScoreBreakdownModal';
import { Toast, ToastMessage } from '../components/Toast';
import { MultimodalSearchModal } from '../components/MultimodalSearchModal';
import { MultimodalResultBanner } from '../components/MultimodalResultBanner';
import { ShoppingMissionView } from '../components/ShoppingMissionView';
import { SmartClarificationBanner } from '../components/SmartClarificationBanner';
import { HeroV2 } from '../components/HeroV2';
import { CategoryIconRow } from '../components/CategoryIconRow';
import { FeatureActionCards } from '../components/FeatureActionCards';
import { WhyChooseSection } from '../components/WhyChooseSection';
import { SocialProofBar } from '../components/SocialProofBar';
import FlightSearchBox from '../components/FlightSearchBox';
import FlightPortalView from '../components/FlightPortalView';
import { executeAgentSearch, executeMultimodalAgentSearch, synthesizeCityHotels, fetchHotelReviewIntelligence, fetchShoppingPriceBreakdown } from '../lib/agent-client';
import { Product, TravelOption, HotelOption, SearchResultState, AgentStep, PriceAlert, UserProfile, SearchHistoryItem, CurrencyCode, ReviewIntelligenceData, PriorityWeights, PriceBreakdownData, MultimodalAnalysis, ShoppingMissionData, ParsedIntentData } from '../lib/types';
import { INITIAL_PRODUCTS, INITIAL_FLIGHTS, INITIAL_HOTELS, INITIAL_PRICE_ALERTS, DEFAULT_USER_PROFILE } from '../lib/mock-data';
import { Sparkles, SlidersHorizontal, MessageSquare, ShieldCheck, Zap, Info, Filter, ArrowRight } from 'lucide-react';

export default function Home() {
  // Navigation & Category States
  const [activeTab, setActiveTab] = useState<'workspace' | 'shopping' | 'travel' | 'hotels' | 'pricewatch'>('shopping');
  const [activeCategory, setActiveCategory] = useState<'all' | 'shopping' | 'travel' | 'hotel'>('shopping');

  // Search & Agent States
  const [query, setQuery] = useState('Best gaming laptop under ₹60,000 with RTX graphics');
  const [isSearching, setIsSearching] = useState(false);
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>([]);
  const [detectedType, setDetectedType] = useState<'shopping' | 'travel' | 'hotel'>('shopping');
  const [recommendationSummary, setRecommendationSummary] = useState<string>('');
  const [isMultimodalOpen, setIsMultimodalOpen] = useState(false);
  const [multimodalAnalysis, setMultimodalAnalysis] = useState<MultimodalAnalysis | null>(null);
  const [warnings, setWarnings] = useState<string[]>([]);

  // Catalogs
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [travelOptions, setTravelOptions] = useState<TravelOption[]>(INITIAL_FLIGHTS);
  const [hotelOptions, setHotelOptions] = useState<HotelOption[]>(INITIAL_HOTELS);

  // Sorting & Budget Filter controls
  const [sortBy, setSortBy] = useState<'match' | 'cheapest' | 'rating' | 'value'>('value');
  const [minPriceFilter, setMinPriceFilter] = useState<number | null>(null);
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | null>(null);
  const [selectedCopilotProduct, setSelectedCopilotProduct] = useState<Product | null>(null);

  // Comparison Tray
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [comparedTravel, setComparedTravel] = useState<TravelOption[]>([]);
  const [comparedHotels, setComparedHotels] = useState<HotelOption[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // User Profile & Preferences
  const [userProfile, setUserProfile] = useState<UserProfile>(DEFAULT_USER_PROFILE);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Modals & Drawers
  const [approvalItem, setApprovalItem] = useState<{
    type: 'product' | 'travel' | 'hotel';
    product?: Product;
    offerIndex?: number;
    travel?: TravelOption;
    hotel?: HotelOption;
  } | null>(null);

  const [priceWatchItem, setPriceWatchItem] = useState<{
    type: 'product' | 'travel' | 'hotel';
    product?: Product;
    travel?: TravelOption;
    hotel?: HotelOption;
  } | null>(null);

  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(INITIAL_PRICE_ALERTS);

  // Shopping Decision System State
  const [priorityWeights, setPriorityWeights] = useState<PriorityWeights>({
    performance: 1.0,
    price: 1.0,
    battery: 1.0,
    weight: 1.0
  });
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [priceBreakdownData, setPriceBreakdownData] = useState<PriceBreakdownData | null>(null);
  const [priceBreakdownOpen, setPriceBreakdownOpen] = useState(false);
  const [scoreBreakdownProduct, setScoreBreakdownProduct] = useState<Product | null>(null);
  const [scoreBreakdownOpen, setScoreBreakdownOpen] = useState(false);

  // Category Facets & Discovery States
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCushioning, setSelectedCushioning] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [whyChoseThis, setWhyChoseThis] = useState<string>('');
  const [whyNotCheapest, setWhyNotCheapest] = useState<string>('');
  const [shoppingMission, setShoppingMission] = useState<ShoppingMissionData | null>(null);
  const [parsedIntentData, setParsedIntentData] = useState<ParsedIntentData | null>(null);

  // Review Intelligence Modal State
  const [reviewIntelModalOpen, setReviewIntelModalOpen] = useState(false);
  const [selectedReviewHotel, setSelectedReviewHotel] = useState<HotelOption | null>(null);
  const [reviewIntelData, setReviewIntelData] = useState<ReviewIntelligenceData | null>(null);
  const [reviewIntelLoading, setReviewIntelLoading] = useState(false);

  const [isRefinementOpen, setIsRefinementOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([
    {
      id: "h-1",
      query: "Best gaming laptop under ₹60,000 with RTX graphics",
      category: "shopping",
      timestamp: "Today, 10:24 AM",
      resultsCount: 4
    },
    {
      id: "h-2",
      query: "Cheapest flight from Delhi to Mumbai tomorrow evening",
      category: "travel",
      timestamp: "Yesterday, 6:15 PM",
      resultsCount: 4
    }
  ]);

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = (text: string, type: 'success' | 'alert' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}-${Math.floor(Math.random() * 10000)}`;
    setToasts(prev => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  // Run initial search
  useEffect(() => {
    handleSearch('Best gaming laptop under ₹60,000 with RTX graphics');
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    // Detect if input is an e-commerce or product URL (Flipkart, Amazon, Myntra, Nike, etc.)
    const trimmed = searchQuery.trim();
    const isUrl = /^(https?:\/\/|www\.)/i.test(trimmed) || /^[a-zA-Z0-9-]+\.(?:com|in|org|co|net|io|store|app|shop)/i.test(trimmed);
    if (isUrl) {
      const normalizedUrl = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
      handleMultimodalSearch({
        searchType: 'url',
        productUrl: normalizedUrl,
      });
      return;
    }

    setIsSearching(true);
    setAgentSteps([]);

    // Detect if user specified budget in search query (e.g. "under 2000", "under 3000", etc.)
    let parsedBudget: number | null = null;
    const budgetMatch = searchQuery.match(/(?:under|below|budget|₹|rs\.?|less than|max)\s*(\d+[\d,]*)/i) ||
                        searchQuery.match(/(\d+[\d,]*)\s*(?:budget|under|below|max)/i);
    if (budgetMatch) {
      const parsed = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(parsed) && parsed >= 500) {
        parsedBudget = parsed;
        setMaxPriceFilter(parsed);
      }
    } else {
      setMaxPriceFilter(null);
    }

    const result = await executeAgentSearch(searchQuery, (step, index) => {
      setAgentSteps(prev => {
        const next = [...prev];
        next[index] = step;
        return next;
      });
    }, parsedBudget || undefined);

    setDetectedType(result.detected_type);
    setAgentSteps(result.agent_steps);
    setRecommendationSummary(result.recommendation_summary);
    setWhyChoseThis(result.why_chose_this || '');
    setWhyNotCheapest(result.why_not_cheapest || '');
    setShoppingMission(result.shopping_mission || null);
    setParsedIntentData(result.parsed_intent_data || null);
    setMultimodalAnalysis(null);
    setSelectedBrand(null);
    setSelectedCushioning(null);
    setMinPriceFilter(null);
    setSelectedCopilotProduct(null);
    setVisibleCount(12);
    setWarnings(result.warnings);

    // Sync active tab and view directly to the query type
    if (result.detected_type === 'shopping') {
      setProducts(result.products);
      setActiveTab('shopping');
      setActiveCategory('shopping');
    } else if (result.detected_type === 'hotel') {
      setHotelOptions(result.hotel_options);
      setActiveTab('hotels');
      setActiveCategory('hotel');
    } else {
      setTravelOptions(result.travel_options);
      setActiveTab('travel');
      setActiveCategory('travel');
    }

    // Cache to history
    setSearchHistory(prev => [
      {
        id: `h-${Date.now()}`,
        query: searchQuery,
        category: result.detected_type,
        timestamp: "Just now",
        resultsCount: result.detected_type === 'shopping' 
          ? result.products.length 
          : result.detected_type === 'hotel' 
          ? result.hotel_options.length 
          : result.travel_options.length
      },
      ...prev.slice(0, 9)
    ]);

    setIsSearching(false);
  };

  const handleMultimodalSearch = async (params: {
    searchType: 'image' | 'url';
    imageData?: string;
    imageName?: string;
    productUrl?: string;
    userPrompt?: string;
  }) => {
    setIsMultimodalOpen(false);
    setIsSearching(true);
    setAgentSteps([]);
    const actionLabel = params.searchType === 'url' ? 'Auditing product link across 6 stores...' : 'Analyzing product image with Vision AI...';
    addToast(actionLabel, 'info');

    const result = await executeMultimodalAgentSearch(params, (step, index) => {
      setAgentSteps(prev => {
        const next = [...prev];
        next[index] = step;
        return next;
      });
    });

    setDetectedType(result.detected_type);
    setAgentSteps(result.agent_steps);
    setProducts(result.products);
    setRecommendationSummary(result.recommendation_summary);
    setWhyChoseThis(result.why_chose_this || '');
    setWhyNotCheapest(result.why_not_cheapest || '');
    setMultimodalAnalysis(result.multimodal_analysis || null);
    setSelectedBrand(null);
    setSelectedCushioning(null);
    setMinPriceFilter(null);
    setMaxPriceFilter(null);
    setSelectedCopilotProduct(null);
    setVisibleCount(12);
    setActiveTab('shopping');
    setActiveCategory('shopping');
    setIsSearching(false);

    setSearchHistory(prev => [
      {
        id: `h-${Date.now()}`,
        query: result.query,
        category: 'shopping',
        timestamp: "Just now",
        resultsCount: result.products.length
      },
      ...prev.slice(0, 9)
    ]);

    addToast(params.searchType === 'url' ? 'Cross-store link comparison complete!' : 'Vision AI matched product & audited prices!', 'success');

    setTimeout(() => {
      document.getElementById('multimodal-result-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  // Category Switcher Handler
  const handleCategorySwitch = (cat: 'shopping' | 'travel' | 'hotel' | 'all') => {
    if (cat === 'shopping') {
      setActiveTab('shopping');
      setActiveCategory('shopping');
      setDetectedType('shopping');
      setQuery('Best gaming laptop under ₹60,000 with RTX graphics');
      handleSearch('Best gaming laptop under ₹60,000 with RTX graphics');
    } else if (cat === 'travel') {
      setActiveTab('travel');
      setActiveCategory('travel');
      setDetectedType('travel');
      setQuery('Cheapest flight from Delhi to Mumbai tomorrow evening');
      handleSearch('Cheapest flight from Delhi to Mumbai tomorrow evening');
    } else if (cat === 'hotel') {
      setActiveTab('hotels');
      setActiveCategory('hotel');
      setDetectedType('hotel');
      setQuery('Luxury beachfront resort in Goa under ₹15,000');
      handleSearch('Luxury beachfront resort in Goa under ₹15,000');
    } else {
      setActiveCategory('all');
    }
  };

  // Quick Compare with Similar Products Handler
  const handleCompareWithSimilar = (matched: Product) => {
    const alternatives = products.filter(p => p.canonical_id !== matched.canonical_id).slice(0, 3);
    const combined = [matched, ...alternatives];
    setComparedProducts(combined);
    setIsCompareModalOpen(true);
    addToast(`Comparing "${matched.title.split('(')[0].trim()}" with ${alternatives.length} alternatives side-by-side!`, 'success');
  };

  // Compare Toggles
  const handleToggleProductCompare = (product: Product) => {
    setComparedProducts(prev => {
      const exists = prev.some(p => p.canonical_id === product.canonical_id);
      if (exists) {
        addToast(`Removed "${product.title.split('(')[0]}" from compare tray.`, 'info');
        return prev.filter(p => p.canonical_id !== product.canonical_id);
      }
      if (prev.length + comparedTravel.length + comparedHotels.length >= 4) {
        addToast('Maximum 4 items can be compared side-by-side.', 'alert');
        return prev;
      }
      addToast(`Pinned "${product.title.split('(')[0]}" to comparison.`, 'success');
      return [...prev, product];
    });
  };

  const handleToggleTravelCompare = (option: TravelOption) => {
    setComparedTravel(prev => {
      const exists = prev.some(t => t.id === option.id);
      if (exists) {
        addToast(`Removed ${option.provider} flight from compare tray.`, 'info');
        return prev.filter(t => t.id !== option.id);
      }
      if (comparedProducts.length + prev.length + comparedHotels.length >= 4) {
        addToast('Maximum 4 items can be compared side-by-side.', 'alert');
        return prev;
      }
      addToast(`Pinned ${option.provider} flight to comparison.`, 'success');
      return [...prev, option];
    });
  };

  const handleToggleHotelCompare = (hotel: HotelOption) => {
    setComparedHotels(prev => {
      const exists = prev.some(h => h.id === hotel.id);
      if (exists) {
        addToast(`Removed ${hotel.name} from compare tray.`, 'info');
        return prev.filter(h => h.id !== hotel.id);
      }
      if (comparedProducts.length + comparedTravel.length + prev.length >= 4) {
        addToast('Maximum 4 items can be compared side-by-side.', 'alert');
        return prev;
      }
      addToast(`Pinned ${hotel.name} to comparison.`, 'success');
      return [...prev, hotel];
    });
  };

  // Refinement Handler
  const handleApplyRefinement = (instruction: string) => {
    const inst = instruction.toLowerCase().trim();
    addToast(`AI Copilot: "${instruction}"`, 'success');

    if (detectedType === 'shopping') {
      // Check for brands
      const brandsList = ['nike', 'puma', 'adidas', 'asics', 'campus', 'sparx', 'asian', 'bata', 'red tape', 'reebok', 'skechers', 'under armour', 'new balance', 'woodland', 'decathlon'];
      const matchedBrand = brandsList.find(b => inst.includes(b));
      if (matchedBrand) {
        setSelectedBrand(matchedBrand);
        addToast(`Filtered to ${matchedBrand.toUpperCase()} options`, 'info');
      }

      // Check for cheaper alternatives
      if (inst.includes('cheaper') && selectedCopilotProduct) {
        const targetCap = Math.max(999, Math.round((selectedCopilotProduct.best_price * 0.8) / 100) * 100);
        setMaxPriceFilter(targetCap);
        addToast(`Showing cheaper alternatives under ₹${targetCap.toLocaleString('en-IN')}`, 'info');
        return;
      }

      // Check for price constraints
      const budgetMatch = inst.match(/(?:under|below|budget|less than|max|₹|rs\.?)\s*(\d+[\d,]*)/i);
      if (budgetMatch) {
        const num = parseInt(budgetMatch[1].replace(/,/g, ''), 10);
        if (!isNaN(num) && num >= 500) {
          setMaxPriceFilter(num);
          addToast(`Budget ceiling set to ₹${num.toLocaleString('en-IN')}`, 'info');
          return;
        }
      }

      // If user provided a new query or requested all models
      if (inst.startsWith('show all') || inst.startsWith('find') || inst.includes('shoes') || inst.includes('laptop')) {
        handleSearch(instruction);
        return;
      }

      if (inst.includes('56,000') || inst.includes('55,000')) {
        setMaxPriceFilter(56000);
      } else if (inst.includes('srgb')) {
        setProducts(prev => prev.filter(p => p.specifications['Display']?.includes('sRGB')));
      } else if (inst.includes('40-series')) {
        setProducts(prev => prev.filter(p => p.specifications['Graphics']?.includes('4050')));
      }
    } else if (detectedType === 'travel') {
      if (inst.includes('direct') || inst.includes('non-stop')) {
        setTravelOptions(prev => prev.filter(t => t.stops.includes('Non-stop')));
      } else if (inst.includes('25kg')) {
        setTravelOptions(prev => prev.filter(t => t.baggage.includes('25 kg')));
      }
    } else {
      if (inst.includes('breakfast')) {
        setHotelOptions(prev => prev.filter(h => h.amenities.some(a => a.toLowerCase().includes('breakfast')) || h.breakfast_included));
        setRecommendationSummary("LangGraph Master Agent: Filtered to verified properties with complimentary breakfast.");
      } else if (inst.includes('pool')) {
        setHotelOptions(prev => prev.filter(h => h.amenities.some(a => a.toLowerCase().includes('pool'))));
        setRecommendationSummary("LangGraph Master Agent: Filtered to verified properties with swimming pools.");
      } else if (inst.includes('cancellation') || inst.includes('free cancel')) {
        setHotelOptions(prev => prev.filter(h => h.cancellation_policy.toLowerCase().includes('free')));
        setRecommendationSummary("LangGraph Master Agent: Prioritizing listings with 100% Free Cancellation.");
      } else if (inst.includes('beach') || inst.includes('beachfront')) {
        setHotelOptions(prev => prev.filter(h => h.distance_to_beach?.includes('Beachfront') || h.distance_to_beach?.includes('meters')));
      }
    }
  };

  const handleOpenReviewIntelligence = async (hotel: HotelOption) => {
    setSelectedReviewHotel(hotel);
    setReviewIntelModalOpen(true);
    setReviewIntelLoading(true);
    setReviewIntelData(null);
    try {
      const data = await fetchHotelReviewIntelligence(hotel.id, hotel.name);
      setReviewIntelData(data);
    } catch (err) {
      console.error("Failed to load review intelligence", err);
    } finally {
      setReviewIntelLoading(false);
    }
  };

  const handleOpenPriceBreakdown = async (offer: any, product: Product) => {
    try {
      const breakdown = await fetchShoppingPriceBreakdown(product.canonical_id, offer);
      setPriceBreakdownData(breakdown);
      setPriceBreakdownOpen(true);
    } catch (err) {
      console.error("Failed to fetch price breakdown", err);
    }
  };

  const handleOpenScoreBreakdown = (product: Product) => {
    setScoreBreakdownProduct(product);
    setScoreBreakdownOpen(true);
  };

  const handleChangePriorityWeights = (newWeights: PriorityWeights) => {
    setPriorityWeights(newWeights);
    setProducts(prev => {
      const updated = prev.map(p => {
        const b = p.score_breakdown || { performance: 9.0, price: 9.0, reviews: 9.0, specs: 9.0, delivery: 9.0, match: 9.0 };
        const dynamic = ((b.performance * newWeights.performance) + (b.price * newWeights.price)) / (newWeights.performance + newWeights.price);
        return {
          ...p,
          score: parseFloat(dynamic.toFixed(1))
        };
      });
      updated.sort((a, b) => b.score - a.score);
      return updated;
    });
    addToast('Priority weights updated. Products re-ranked.', 'info');
  };

  const handleWhatWouldYouBuy = () => {
    if (products.length === 0) return;
    const top = products[0];
    setRecommendationSummary(`CompareX AI "What Would You Buy?" Recommendation: Based on your constraints, I recommend **${top.title.split('(')[0].trim()}**. It delivers the highest performance and best multi-store value with verified delivery across 6 audited stores.`);
    addToast(`CompareX AI selected "${top.title.split('(')[0].trim()}".`, 'success');
  };

  // Simulate price drop
  const handleSimulatePriceDrop = (alertId: string) => {
    setPriceAlerts(prev => prev.map(a => {
      if (a.id === alertId) {
        return {
          ...a,
          currentPrice: Math.round(a.targetPrice * 0.95),
          status: 'triggered',
          lastChecked: 'Just now'
        };
      }
      return a;
    }));
    addToast('🎉 TARGET REACHED! Simulated price drop alert dispatched to ' + userProfile.email, 'success');
  };

  // Price Filter / Budget Handler
  const handleSetPriceFilter = async (budget: number | null) => {
    setMaxPriceFilter(budget);
    if (detectedType === 'hotel') {
      if (budget) {
        const { hotels } = synthesizeCityHotels(query, budget);
        setHotelOptions(hotels);
        addToast(`Hotels adjusted to your budget under ₹${budget.toLocaleString('en-IN')}`, 'success');
      } else {
        const { hotels } = synthesizeCityHotels(query);
        setHotelOptions(hotels);
        addToast('Showing all available hotel prices', 'info');
      }
    } else {
      if (budget) {
        addToast(`Filtering items under ₹${budget.toLocaleString('en-IN')}`, 'info');
      } else {
        addToast('Showing all price tiers', 'info');
      }
    }
  };

  // Sorting & Price/Facet Filtering
  const filteredProducts = products.filter(p => {
    // Min price filter
    if (minPriceFilter !== null && p.best_price < minPriceFilter) return false;
    // Max price filter
    if (maxPriceFilter !== null && p.best_price > maxPriceFilter) return false;
    // Brand facet
    if (selectedBrand && p.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
    // Cushioning / Technology facet
    if (selectedCushioning) {
      const soleText = ((p.specifications?.Sole || '') + ' ' + (p.specifications?.Usage || '') + ' ' + p.title + ' ' + (p.score_reasons?.join(' ') || '')).toLowerCase();
      const tokens = selectedCushioning.split('|');
      const matches = tokens.some(t => soleText.includes(t));
      if (!matches) return false;
    }
    return true;
  });
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'cheapest') return a.best_price - b.best_price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'value') return b.score - a.score;
    return 0;
  });

  const filteredTravel = maxPriceFilter
    ? travelOptions.filter(t => t.price <= maxPriceFilter)
    : travelOptions;
  const sortedTravel = [...filteredTravel].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price - b.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'value') return b.score - a.score;
    return 0;
  });

  const filteredHotels = maxPriceFilter
    ? hotelOptions.filter(h => h.price_per_night <= maxPriceFilter)
    : hotelOptions;
  const sortedHotels = [...filteredHotels].sort((a, b) => {
    if (sortBy === 'cheapest') return a.price_per_night - b.price_per_night;
    if (sortBy === 'rating') return b.guest_rating - a.guest_rating;
    if (sortBy === 'value') return b.score - a.score;
    return 0;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Toast System */}
      <Toast toasts={toasts} onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))} />

      {/* Navigation Header */}
      <Navbar
        comparisonCount={(comparedProducts?.length || 0) + (comparedTravel?.length || 0) + (comparedHotels?.length || 0)}
        onOpenComparison={() => {}}
        onOpenPriceWatch={() => setActiveTab('pricewatch')}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        priceAlertsCount={priceAlerts.length}
        activeTab={activeTab}
        currency={userProfile.currency}
        setActiveTab={(tab) => {
          if (tab === 'shopping') {
            handleCategorySwitch('shopping');
          } else if (tab === 'travel') {
            handleCategorySwitch('travel');
          } else if (tab === 'hotels') {
            handleCategorySwitch('hotel');
          } else if (tab === 'pricewatch') {
            setActiveTab('pricewatch');
          } else {
            setActiveTab('workspace');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        {activeTab === 'pricewatch' ? (
          /* Dedicated Price Watch Dashboard */
          <PriceWatchDashboard
            alerts={priceAlerts}
            currency={userProfile.currency}
            onSimulateDrop={handleSimulatePriceDrop}
            onDeleteAlert={(id) => {
              setPriceAlerts(prev => prev.filter(a => a.id !== id));
              addToast('Price radar deleted.', 'info');
            }}
            onOpenItem={(alert) => {
              handleSearch(alert.itemTitle);
            }}
          />
        ) : (
          <>
            {/* Front Page Hero V2 (Matching Reference Screenshot) */}
            {activeTab === 'travel' ? (
              <FlightPortalView />
            ) : detectedType === 'shopping' ? (
              <>
                <HeroV2
                  query={query}
                  setQuery={setQuery}
                  onSearch={handleSearch}
                  isSearching={isSearching}
                  onOpenMultimodal={() => setIsMultimodalOpen(true)}
                />
                <CategoryIconRow
                  onSelectCategory={(catQuery) => {
                    setQuery(catQuery);
                    handleSearch(catQuery);
                  }}
                />
                <FeatureActionCards
                  onOpenImageSearch={() => setIsMultimodalOpen(true)}
                  onOpenMission={() => {
                    const missionQuery = 'Build me a gaming setup under ₹1 lakh';
                    setQuery(missionQuery);
                    handleSearch(missionQuery);
                  }}
                  onOpenPriceWatch={() => setActiveTab('pricewatch')}
                />
              </>
            ) : (
              <HeroSearch
                query={query}
                setQuery={setQuery}
                onSearch={handleSearch}
                onSelectCategory={handleCategorySwitch}
                isSearching={isSearching}
                activeCategory={activeCategory}
                onOpenMultimodal={() => setIsMultimodalOpen(true)}
              />
            )}

            {/* Multimodal Analysis Banner (Image & Store URL) */}
            {multimodalAnalysis && (
              <MultimodalResultBanner
                analysis={multimodalAnalysis}
                matchedProduct={multimodalAnalysis.canonical_products?.[0] || sortedProducts[0]}
                currency={userProfile.currency}
                isCompared={comparedProducts.some(p => p.canonical_id === (multimodalAnalysis.canonical_products?.[0]?.canonical_id || sortedProducts[0]?.canonical_id))}
                onToggleCompare={handleToggleProductCompare}
                onOpenPriceBreakdown={handleOpenPriceBreakdown}
                onSelectDeal={(prod, offerIdx) => {
                  setApprovalItem({
                    type: 'product',
                    product: prod,
                    offerIndex: offerIdx || 0
                  });
                }}
                onOpenScoreBreakdown={handleOpenScoreBreakdown}
                onCompareWithSimilar={handleCompareWithSimilar}
                onOpenModal={() => setIsMultimodalOpen(true)}
              />
            )}

            {/* Shopping Dynamic Priority Controls */}
            {detectedType === 'shopping' && (
              <PrioritySliders
                weights={priorityWeights}
                onChangeWeights={handleChangePriorityWeights}
                onWhatWouldYouBuy={handleWhatWouldYouBuy}
                isOpen={isPriorityOpen}
                onToggleOpen={() => setIsPriorityOpen(!isPriorityOpen)}
                category={products[0]?.subcategory || multimodalAnalysis?.detected_category || products[0]?.category || 'Running Shoes'}
              />
            )}

            {/* Animated Agent Execution Panel with Pipeline Telemetry */}
            <AgentStatusPanel
              steps={agentSteps}
              isSearching={isSearching}
              detectedType={detectedType}
              rawListingsCount={detectedType === 'shopping' ? 127 : 45}
              canonicalCount={detectedType === 'shopping' ? products.length : undefined}
            />

            {/* Smart Clarification Banner for Underspecified Queries */}
            {detectedType === 'shopping' && parsedIntentData?.clarification_needed && (
              <SmartClarificationBanner
                intentData={parsedIntentData}
                onSelectOption={(option) => {
                  const refinedQuery = `${query} for ${option}`;
                  setQuery(refinedQuery);
                  handleSearch(refinedQuery);
                }}
              />
            )}

            {/* Shopping Mission Active: Multi-task Ecosystem & Budget Breakdown */}
            {detectedType === 'shopping' && shoppingMission && (
              <ShoppingMissionView
                mission={shoppingMission}
                currency={userProfile.currency}
                onSelectProduct={(product) => setSelectedCopilotProduct(product)}
                onSelectDeal={(prod, offerIdx) => {
                  setApprovalItem({
                    type: 'product',
                    product: prod,
                    offerIndex: offerIdx || 0
                  });
                }}
              />
            )}

            {/* Layer 2: Decision Intelligence Hero Spotlight */}
            {detectedType === 'shopping' && !shoppingMission && sortedProducts.length > 0 && (
              <BestForYouHeroCard
                product={sortedProducts[0]}
                currency={userProfile.currency}
                whyChoseThis={whyChoseThis}
                whyNotCheapest={whyNotCheapest}
                isCompared={comparedProducts.some(p => p.canonical_id === sortedProducts[0].canonical_id)}
                onToggleCompare={handleToggleProductCompare}
                onOpenPriceBreakdown={handleOpenPriceBreakdown}
                onSelectDeal={(prod, offerIdx) => {
                  setApprovalItem({
                    type: 'product',
                    product: prod,
                    offerIndex: offerIdx || 0
                  });
                }}
              />
            )}

            {/* Non-Shopping Recommendation Explanation Banner */}
            {detectedType !== 'shopping' && recommendationSummary && (
              <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-violet-950/40 border border-indigo-500/30 shadow-xl backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                      <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                        <span>CompareX AI Consensus & Recommendation</span>
                        <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-bold">
                          Zero-Bias Evaluation
                        </span>
                      </h3>
                      <button
                        type="button"
                        onClick={() => setIsRefinementOpen(true)}
                        className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/80 hover:bg-indigo-900/80 px-3 py-1.5 rounded-lg border border-indigo-700/60 transition-colors cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Refine with AI Copilot</span>
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                      {recommendationSummary}
                    </p>
                    {warnings.length > 0 && (
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] text-amber-400/90">
                        <Info className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{warnings[0]}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Layer 1: Category-Specific Facets & Price Discovery Toolbar */}
            {detectedType === 'shopping' && (
              <CategoryFacetFilters
                products={products}
                selectedBrand={selectedBrand}
                onSelectBrand={setSelectedBrand}
                minPrice={minPriceFilter}
                maxPrice={maxPriceFilter}
                onSetPriceRange={(min, max) => {
                  setMinPriceFilter(min);
                  setMaxPriceFilter(max);
                }}
                selectedCushioning={selectedCushioning}
                onSelectCushioning={setSelectedCushioning}
                currency={userProfile.currency}
              />
            )}

            {/* Results Controls Header (Sort, Count, Filters) */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-800/80">
              <div className="flex items-center gap-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                  {detectedType === 'shopping'
                    ? (sortedProducts[0]?.subcategory ? `${sortedProducts[0].subcategory} Deals` : 'Evaluated Product Deals')
                    : detectedType === 'hotel'
                    ? 'Audited Hotels & Resorts'
                    : 'Compared Flight Itineraries'}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-400">
                  {detectedType === 'shopping'
                    ? `${sortedProducts.length} Verified Products Found`
                    : detectedType === 'hotel'
                    ? `${sortedHotels.length} Verified Properties`
                    : `${sortedTravel.length} Available Flights`}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Sort Dropdown / Pills */}
                <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs font-medium">
                  <span className="text-slate-500 px-2 text-[11px] hidden sm:inline">Sort:</span>
                  <button
                    type="button"
                    onClick={() => setSortBy('value')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      sortBy === 'value' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Best Value
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('cheapest')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      sortBy === 'cheapest' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Cheapest
                  </button>
                  <button
                    type="button"
                    onClick={() => setSortBy('rating')}
                    className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                      sortBy === 'rating' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Highest Rated
                  </button>
                </div>

                {/* AI Refine Button */}
                <button
                  type="button"
                  onClick={() => setIsRefinementOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-semibold text-slate-300 hover:text-white hover:border-indigo-500/50 transition-colors cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="hidden sm:inline">Copilot</span>
                </button>
              </div>
            </div>


            {/* Hotel-Specific Budget Filter Toolbar */}
            {detectedType === 'hotel' && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800/90 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 mr-1">
                    <Filter className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Hotel Budget Filter:</span>
                  </span>
                  {[
                    { label: 'All Rates', val: null },
                    { label: 'Under ₹1,200', val: 1200 },
                    { label: 'Under ₹2,000', val: 2000 },
                    { label: 'Under ₹3,000', val: 3000 },
                    { label: 'Under ₹5,000', val: 5000 },
                    { label: 'Under ₹8,000', val: 8000 }
                  ].map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSetPriceFilter(chip.val)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        (chip.val === null && maxPriceFilter === null) || maxPriceFilter === chip.val
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                          : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      {chip.label}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                  <span className="text-[11px] text-slate-400 font-medium whitespace-nowrap">
                    Max Budget: <strong className="text-white font-bold">{maxPriceFilter ? `₹${maxPriceFilter.toLocaleString('en-IN')}` : 'Any'}</strong>
                  </span>
                  <input
                    type="range"
                    min={700}
                    max={15000}
                    step={100}
                    value={maxPriceFilter || 15000}
                    onChange={(e) => handleSetPriceFilter(Number(e.target.value))}
                    className="w-32 sm:w-40 accent-indigo-500 cursor-pointer"
                  />
                  {maxPriceFilter !== null && (
                    <button
                      type="button"
                      onClick={() => handleSetPriceFilter(null)}
                      className="text-[11px] text-indigo-400 hover:text-indigo-300 underline font-semibold cursor-pointer"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Results Grid / List - Deterministic and directly tied to detectedType */}
            {detectedType === 'shopping' ? (
              sortedProducts.length === 0 ? (
                <div className="col-span-full py-16 px-6 text-center rounded-3xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
                  <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center mx-auto mb-4">
                    <Filter className="w-8 h-8 text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No Products Match Your Filter Cap</h3>
                  <p className="text-sm text-slate-400 max-w-md mx-auto mb-6">
                    No items currently meet the maximum budget constraint of {maxPriceFilter ? `₹${maxPriceFilter.toLocaleString('en-IN')}` : 'your filter'}. You can reset the filter or browse verified models.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        handleSetPriceFilter(null);
                        setSelectedBrand(null);
                        setSelectedCushioning(null);
                      }}
                      className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.slice(0, visibleCount).map(product => (
                      <ProductCard
                        key={product.canonical_id}
                        product={product}
                        currency={userProfile.currency}
                        isCompared={comparedProducts.some(p => p.canonical_id === product.canonical_id)}
                        onToggleCompare={handleToggleProductCompare}
                        onOpenPriceBreakdown={handleOpenPriceBreakdown}
                        onOpenScoreBreakdown={handleOpenScoreBreakdown}
                        onAskCompareX={(prod) => {
                          setSelectedCopilotProduct(prod);
                          setIsRefinementOpen(true);
                        }}
                        onSelectDeal={(prod, offerIdx) => {
                          setApprovalItem({
                            type: 'product',
                            product: prod,
                            offerIndex: offerIdx || 0
                          });
                        }}
                        onSetPriceWatch={(prod) => {
                          setPriceWatchItem({
                            type: 'product',
                            product: prod
                          });
                        }}
                      />
                  ))}
                  </div>

                  {/* Load More Pagination */}
                  {sortedProducts.length > visibleCount && (
                    <div className="mt-8 flex justify-center">
                      <button
                        type="button"
                        onClick={() => setVisibleCount(prev => prev + 12)}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 hover:border-indigo-500/60 text-white font-bold text-sm shadow-xl shadow-slate-950/60 transition-all cursor-pointer group"
                      >
                        <span>Load More Products ({sortedProducts.length - visibleCount} more)</span>
                        <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  )}

                  {/* Why Choose CompareX AI? & Social Proof (Matching Screenshot) */}
                  <div className="mt-16 space-y-8">
                    <WhyChooseSection />
                    <SocialProofBar />
                  </div>
                </>
              )
            ) : detectedType === 'hotel' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedHotels.map(hotel => (
                  <HotelCard
                    key={hotel.id}
                    hotel={hotel}
                    currency={userProfile.currency}
                    isCompared={comparedHotels.some(h => h.id === hotel.id)}
                    onToggleCompare={handleToggleHotelCompare}
                    onOpenReviewIntelligence={handleOpenReviewIntelligence}
                    onSelectBooking={(h) => {
                      setApprovalItem({
                        type: 'hotel',
                        hotel: h
                      });
                    }}
                    onSetPriceWatch={(h) => {
                      setPriceWatchItem({
                        type: 'hotel',
                        hotel: h
                      });
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {sortedTravel.map(flight => (
                  <TravelCard
                    key={flight.id}
                    option={flight}
                    currency={userProfile.currency}
                    isCompared={comparedTravel.some(t => t.id === flight.id)}
                    onToggleCompare={handleToggleTravelCompare}
                    onSelectBooking={(opt) => {
                      setApprovalItem({
                        type: 'travel',
                        travel: opt
                      });
                    }}
                    onSetPriceWatch={(opt) => {
                      setPriceWatchItem({
                        type: 'travel',
                        travel: opt
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Floating Side-by-Side Comparison Drawer */}
      <ComparisonDrawer
        products={comparedProducts}
        travelOptions={comparedTravel}
        hotels={comparedHotels}
        currency={userProfile.currency}
        isOpenModalExternal={isCompareModalOpen}
        onSetOpenModalExternal={setIsCompareModalOpen}
        onSelectBookingHotel={(h) => setApprovalItem({ type: 'hotel', hotel: h })}
        onRemoveProduct={(id) => setComparedProducts(prev => prev.filter(p => p.canonical_id !== id))}
        onRemoveTravel={(id) => setComparedTravel(prev => prev.filter(t => t.id !== id))}
        onRemoveHotel={(id) => setComparedHotels(prev => prev.filter(h => h.id !== id))}
        onClearAll={() => {
          setComparedProducts([]);
          setComparedTravel([]);
          setComparedHotels([]);
          setIsCompareModalOpen(false);
          addToast('Comparison tray cleared.', 'info');
        }}
        onShareLink={() => {
          navigator.clipboard.writeText(window.location.href);
          addToast('Comparison link copied to clipboard!', 'success');
        }}
        onExportCSV={() => {
          addToast('Comparison matrix exported as CSV report.', 'success');
        }}
      />

      {/* Human Approval Modal (Safety & Redirect Flow) */}
      <ApprovalModal
        isOpen={Boolean(approvalItem)}
        onClose={() => setApprovalItem(null)}
        currency={userProfile.currency}
        selectedItem={approvalItem}
      />

      {/* 5-Category Sentiment AI Review Intelligence Modal */}
      <ReviewIntelligenceModal
        isOpen={reviewIntelModalOpen}
        onClose={() => setReviewIntelModalOpen(false)}
        hotelName={selectedReviewHotel?.name || 'Selected Hotel'}
        data={reviewIntelData}
        isLoading={reviewIntelLoading}
      />

      {/* Itemized Price Breakdown Modal (Phase 1) */}
      <PriceBreakdownModal
        isOpen={priceBreakdownOpen}
        onClose={() => setPriceBreakdownOpen(false)}
        data={priceBreakdownData}
        currency={userProfile.currency}
      />

      {/* Explainable AI Score Breakdown Modal (Phase 1) */}
      <ScoreBreakdownModal
        isOpen={scoreBreakdownOpen}
        onClose={() => setScoreBreakdownOpen(false)}
        productTitle={scoreBreakdownProduct?.title || 'Product'}
        overallScore={scoreBreakdownProduct?.score || 9.2}
        breakdown={scoreBreakdownProduct?.score_breakdown}
        reasons={scoreBreakdownProduct?.score_reasons || []}
      />

      {/* Price Watch Modal */}
      <PriceWatchModal
        isOpen={Boolean(priceWatchItem)}
        onClose={() => setPriceWatchItem(null)}
        currency={userProfile.currency}
        targetItem={priceWatchItem}
        onSaveAlert={(alertData) => {
          const newAlert: PriceAlert = {
            id: `alert-${Date.now()}`,
            itemId: alertData.itemId,
            itemTitle: alertData.title,
            targetPrice: alertData.targetPrice,
            currentPrice: priceWatchItem?.product?.best_price || priceWatchItem?.travel?.price || priceWatchItem?.hotel?.price_per_night || 0,
            createdAt: new Date().toISOString().split('T')[0],
            category: alertData.category,
            status: 'monitoring',
            lastChecked: 'Just now',
            provider: priceWatchItem?.product?.offers[0]?.provider || priceWatchItem?.travel?.provider || priceWatchItem?.hotel?.providers[0]?.provider || 'Verified Store'
          };
          setPriceAlerts(prev => [newAlert, ...prev]);
          addToast(`Price radar activated for "${alertData.title.slice(0, 25)}..."`, 'success');
        }}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        profile={userProfile}
        onSaveProfile={(updated) => {
          setUserProfile(updated);
          addToast(`Preferences updated: Currency set to ${updated.currency}`, 'success');
        }}
      />

      {/* Saved History Drawer */}
      <SavedHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={searchHistory}
        onSelectQuery={(q) => {
          handleSearch(q);
        }}
        onClearHistory={() => {
          setSearchHistory([]);
          addToast('Search history cleared.', 'info');
        }}
      />

      {/* Conversational Refinement Chat Drawer */}
      <RefinementChat
        isOpen={isRefinementOpen}
        onClose={() => {
          setIsRefinementOpen(false);
          setSelectedCopilotProduct(null);
        }}
        detectedType={detectedType}
        targetProduct={selectedCopilotProduct}
        onApplyRefinement={handleApplyRefinement}
      />

      {/* Multimodal Search Modal (Vision & URL) */}
      <MultimodalSearchModal
        isOpen={isMultimodalOpen}
        onClose={() => setIsMultimodalOpen(false)}
        onSubmit={handleMultimodalSearch}
        isSearching={isSearching}
      />
    </div>
  );
}
