'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Shield, ShieldCheck, ArrowRight, ArrowUpRight, TrendingUp,
  FileText, CreditCard, Plus, AlertCircle, Globe, Lock, Sliders, CheckCircle,
  Clock, Info, Star, ChevronRight, Scale, Check, User, MapPin, Building,
  TrendingDown, Eye, Share2, Clipboard, ExternalLink, HelpCircle, FileCheck,
  Briefcase, Activity, Landmark, Ship, Compass, Anchor, Sparkles, BookOpen,
  Map, DollarSign, Award, AlertTriangle, Play, RefreshCw, Send, CheckSquare,
  Navigation, ThumbsUp, MessageSquare, PlusCircle, Globe2, Link2, LogIn, LockKeyhole
} from 'lucide-react';

import { 
  BButton, 
  BTrustScoreRing, 
  BSupplierCard, 
  BImporterCard, 
  BDistributorCard, 
  BProcurementCard,
  BPartnerDiscoveryCard
} from '@/components/ui/bharatx-components';

// Import JSON databases
import SEED_EXPORTERS_RAW from '@/data/exporters.json';
import SEED_IMPORTERS_RAW from '@/data/importers.json';
import SEED_DISTRIBUTORS_RAW from '@/data/distributors.json';
import SEED_PROCUREMENT_RAW from '@/data/procurement.json';
import SEED_FEED_RAW from '@/data/feed.json';
import SEED_RFQS_RAW from '@/data/rfqs.json';
import SEED_PRODUCTS_RAW from '@/data/products.json';
import SEED_COUNTRIES_RAW from '@/data/countries.json';

// Interfaces
export interface Exporter {
  id: string;
  role: 'Exporter';
  name: string;
  logo: string;
  city: string;
  state: string;
  country: string;
  productCategories: string[];
  productsList: string[];
  exportMarkets: string[];
  certifications: { name: string; verified: boolean; authority: string; expiry: string }[];
  moq: string;
  responseTime: string;
  trustScore: number;
  rating: number;
  reviews: number;
  tradeVolume: string;
  escrowSuccessRate: string;
  disputesActive: number;
  disputesResolved: number;
  exportReadiness: 'AAA' | 'AA' | 'A';
  competitivePositioning: string;
  aiSummary: string;
  yearsInBusiness: number;
  factoryVerification: { verified: boolean; auditor: string; lastAudit: string; rating: string };
  bankVerification: { rating: string; swiftVerified: boolean; creditScore: number; status: string };
  moistureLimit: string;
  leadTime: string;
  pastTransactions: { id: string; date: string; destination: string; amount: string; status: 'RELEASED' | 'REFUNDED' }[];
  connections: number;
  endorsements: number;
}

export interface Importer {
  id: string;
  role: 'Importer';
  name: string;
  logo: string;
  city: string;
  state: string;
  country: string;
  trustScore: number;
  rating: number;
  reviews: number;
  creditRating: string;
  activeDemands: string[];
  preferredIncoterms: string[];
  preferredPorts: string[];
  yearsActive: number;
  annualSourcingVolume: string;
  verificationStatus: string;
  connections: number;
  endorsements: number;
}

export interface Distributor {
  id: string;
  role: 'Distributor';
  name: string;
  logo: string;
  city: string;
  country: string;
  trustScore: number;
  rating: number;
  reviews: number;
  hubs: string[];
  shippingLanes: string[];
  modes: string[];
  capacity: string;
  customsClearanceRate: string;
  swiftBonded: boolean;
  yearsActive: number;
  connections: number;
  endorsements: number;
}

export interface Procurement {
  id: string;
  role: 'Procurement';
  name: string;
  type: string;
  logo: string;
  city: string;
  country: string;
  trustScore: number;
  sourcingMandate: string;
  annualSpend: string;
  teamSize: number;
  partners: string[];
  activeMandates: string[];
  connections: number;
  endorsements: number;
}

export interface FeedPost {
  id: string;
  author: string;
  authorId: string;
  authorType: string;
  authorLogo: string;
  timestamp: string;
  content: string;
  likes: number;
  comments: number;
  shares: number;
  type: 'opportunity' | 'rfq' | 'partnership' | 'update' | 'alert';
  meta?: {
    targetCountry?: string;
    product?: string;
    rfqId?: string;
    budget?: string;
    quantity?: string;
    moq?: string;
    pricing?: string;
  };
}

export interface RFQ {
  rfqId: string;
  buyerName: string;
  buyerId: string;
  buyerCountry: string;
  product: string;
  hsCode: string;
  quantity: string;
  deliveryTerms: string;
  budgetRange: string;
  complianceRequirements: string;
  deadline: string;
  riskLevel: string;
}

export interface Product {
  product: string;
  hsCode: string;
  category: string;
  exportMarkets: string[];
  typicalMOQ: string;
  typicalPricing: string;
  requiredCertifications: string[];
}

export interface Country {
  country: string;
  topImportsFromIndia: string[];
  requiredCertifications: string[];
  customsNotes: string;
  popularPorts: string[];
}

// Format loaded data
const SEED_EXPORTERS = SEED_EXPORTERS_RAW as Exporter[];
const SEED_IMPORTERS = SEED_IMPORTERS_RAW as Importer[];
const SEED_DISTRIBUTORS = SEED_DISTRIBUTORS_RAW as Distributor[];
const SEED_PROCUREMENT = SEED_PROCUREMENT_RAW as Procurement[];
const SEED_FEED = SEED_FEED_RAW as FeedPost[];
const SEED_RFQS = SEED_RFQS_RAW as RFQ[];
const SEED_PRODUCTS = SEED_PRODUCTS_RAW as Product[];
const SEED_COUNTRIES = SEED_COUNTRIES_RAW as Country[];

const PITCH_CONTENT = {
  1: {
    title: "Scene 1: Sourcing Discovery",
    desc: "An importer in Dubai (Al Ghurair Foods) lands on the Discovery Directory. They search for 'Premium Basmati Rice' to source 20 MT, sorting by Trust Rating and active UAE trade lane histories.",
    investor: "BharatX merges static trade lists into a dynamic, query-able directory of 500 real companies. Buyers search by region, certification compliance (APEDA), and trust tier instantly, eliminating traditional middle-man brokerage fees.",
    importer: "Discover verified partners in seconds instead of weeks. View real exporters holding active shipping routes and official compliance board certificates in India, complete with authenticated dispute records.",
    exporter: "Unlock premium positioning. Top exporters with higher trust tiers (e.g. Karnal Exports at 958 Trust Score) appear first, attracting organic high-intent buying requirements without marketing budgets."
  },
  2: {
    title: "Scene 2: Network Profile Dossier Audit",
    desc: "The buyer opens Karnal Agricultural Exports' Profile Dossier. They audit their verified certifications, bank SWIFT credit liquidity certificates, past transaction histories, and network endorsements.",
    investor: "Verifiable Trade Ledger. We pool and cryptographically register third-party audits (SGS), banking channels (SWIFT codes), and customs clearance filings. This completely removes the risk of foreign counterparty defaults.",
    importer: "No blind trusts. Confirm that the supplier has successfully processed 99.8% of previous transactions through multi-sig escrow, and inspect their actual grain length and moisture limit audits online.",
    exporter: "Emailing credentials is a thing of the past. Share your unified, authenticated trade ledger with a single link, housing all tax records, factory ratings, and customs logs in one secure spot."
  },
  3: {
    title: "Scene 3: AI RFQ Sourcing Broadcast",
    desc: "The buyer starts the Sourcing Wizard. The AI engine auto-resolves HS Code 1006.30, flags the 0% India-UAE CEPA tariff duty, quotes shipping routes, and broadcasts the RFQ to the live Network Feed.",
    investor: "BharatX digitizes unstructured trade intent. Every broadcasted RFQ matches qualified network suppliers instantly, capturing high-intent data that drives our down-stream escrow finance and freight commissions.",
    importer: "Skip the regulatory research. The AI engine extracts HS Codes, verifies that UAE CEPA customs duties are nil, schedules inspections, and matches the top 5 exporters in one click.",
    exporter: "Review structured bids. Exporters receive complete compliance packages matching their exact harvest capabilities, eliminating back-and-forth negotiations."
  },
  4: {
    title: "Scene 4: Side-by-Side Quote Comparison",
    desc: "Exporters submit bids to the RFQ. The buyer reviews quotes side-by-side in the cooperative comparison deck, examining price, lead time, and trust index before selecting the winning bid.",
    investor: "Transaction acceleration. By comparison-mapping the exact freight costs, inspections, and escrow variables side-by-side, we collapse trade negotiations from 21 days to under 4 hours.",
    importer: "Total pricing transparency. Compare Karnal's $23,800 quote against competitors. Standardized line items break down origin inspection fees (SGS) and ocean shipping lines (Maersk) clearly.",
    exporter: "Win deals based on quality and trust. Submit competitive bids securely to global buyers and prove your supply credentials in real-time."
  },
  5: {
    title: "Scene 5: Multi-Sig Escrow Stepper",
    desc: "The contract is signed, and $23,800 USD is locked in a multi-sig vault. The active tracker monitors phytosanitary audits at origin, customs clearances, and live ocean vessel telemetry.",
    investor: "Operating System for global trade. We lock importer funds in secure vaults, eliminating transaction defaults. Disbursements are released automatically via digital data triggers (SGS logs, customs releases).",
    importer: "Zero delivery risk. Funds are released to the exporter only when destination port scanners and inspectors verify the basmati moisture levels (<11.5%) and grain metrics.",
    exporter: "Guaranteed cash flow. Verify that the buyer's payment is fully locked and secured in the vault before harvesting, milling, or loading containers onto vessels."
  },
  6: {
    title: "Scene 6: Settlement & Network Effects",
    desc: "Cargo arrives safely at Jebel Ali. Importer releases funds, and writes a verified network endorsement. Karnal's Trust Score ticks up from 958 to 962, triggering a viral network loop.",
    investor: "High customer retention. Every successful trade builds an exporter's network reputation, increasing their Trust Score. This hooks them to our platform, creating a massive data network moat.",
    importer: "Reputation feedback loops. Importers reward high-quality deliveries with verified reviews and endorsements, helping other network buyers make safe, rapid sourcing choices.",
    exporter: "Reputation equals cheaper finance. Upgrading to a 962 Trust Score unlocks lower interest rates on shipping and raw material invoice financing on our platform."
  }
};

export default function AppWorkspace() {
  // Tab Routing: 'feed' | 'discovery' | 'workspace' | 'demand-maps' | 'profile'
  const [activeTab, setActiveTab] = useState<'feed' | 'discovery' | 'workspace' | 'demand-maps' | 'profile'>('feed');

  // Search Engine States
  const [searchVal, setSearchVal] = useState('');
  const [directoryType, setDirectoryType] = useState<'all' | 'exporter' | 'importer' | 'distributor' | 'procurement'>('all');
  const [filterSector, setFilterSector] = useState('All');
  const [filterRegion, setFilterRegion] = useState('All');
  const [sortBy, setSortBy] = useState('trustScore');
  
  // Data lists
  const [exporters, setExporters] = useState<Exporter[]>(SEED_EXPORTERS);
  const [importers, setImporters] = useState<Importer[]>(SEED_IMPORTERS);
  const [distributors, setDistributors] = useState<Distributor[]>(SEED_DISTRIBUTORS);
  const [procurement, setProcurement] = useState<Procurement[]>(SEED_PROCUREMENT);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(SEED_FEED);
  
  // Profile Viewer States
  const [activeProfile, setActiveProfile] = useState<any>(SEED_EXPORTERS.find(e => e.name === "Karnal Agricultural Exports") || SEED_EXPORTERS[0]);

  // Sourcing Workspace States
  const [workspaceRole, setWorkspaceRole] = useState<'buyer' | 'exporter'>('buyer');
  const [wizardStep, setWizardStep] = useState<number>(1);
  const [rfqProduct, setRfqProduct] = useState('Premium 1121 Basmati Rice');
  const [rfqQty, setRfqQty] = useState('20');
  const [rfqUnit, setRfqUnit] = useState('Metric Tons (MT)');
  const [rfqDest, setRfqDest] = useState('UAE');
  const [rfqIncoterm, setRfqIncoterm] = useState('CIF (Cost, Insurance & Freight)');
  const [rfqBudget, setRfqBudget] = useState('23800');
  const [rfqDeadline, setRfqDeadline] = useState('2026-07-28');
  const [rfqCompliance, setRfqCompliance] = useState('Moisture limit < 11.5%, Grain length > 8.2mm, pesticide traces < 0.01mg/kg');

  // AI RFQ predictions
  const [aiExtracting, setAiExtracting] = useState(false);
  const [aiHsCode, setAiHsCode] = useState('1006.30.20');
  const [aiTariff, setAiTariff] = useState('0% (CEPA Advantage)');
  const [aiFreightEst, setAiFreightEst] = useState('$1,850 USD (Maersk quote)');
  const [aiRiskRating, setAiRiskRating] = useState('Low Sourcing Risk (99.8% Lane Confidence)');
  const [aiCertsRequired, setAiCertsRequired] = useState<string[]>(['APEDA Registration', 'FSSAI License', 'Phytosanitary Certificate', 'ISO 22000']);

  // Match / Bid details
  const [selectedExportersForRfq, setSelectedExportersForRfq] = useState<string[]>([]);
  const [activeBids, setActiveBids] = useState<any[]>([]);
  const [selectedBid, setSelectedBid] = useState<any | null>(null);
  
  // Checkout & active escrow
  const [carrierSelected, setCarrierSelected] = useState('Maersk Line');
  const [inspectorSelected, setInspectorSelected] = useState('SGS India');
  const [activeEscrowAgreement, setActiveEscrowAgreement] = useState<any | null>(null);
  const [escrowStep, setEscrowStep] = useState(1);
  const [escrowFundsLocked, setEscrowFundsLocked] = useState(false);

  // New post feed mock state
  const [newPostText, setNewPostText] = useState('');

  // YC Demo Scene presentation controls
  const [demoScene, setDemoScene] = useState<number>(1);
  const [demoRole, setDemoRole] = useState<'investor' | 'importer' | 'exporter'>('investor');
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const [demoExportersList, setDemoExportersList] = useState<Exporter[]>([]);
  const [demoTickingTrust, setDemoTickingTrust] = useState<number>(958);
  const [demoEndorsementAdded, setDemoEndorsementAdded] = useState(false);

  // Unified directory search handler
  const handleDirectorySearch = (val: string, type: typeof directoryType, sector: string, region: string) => {
    let q = val.toLowerCase().trim();
    
    // Filter exporters
    let filteredExporters = SEED_EXPORTERS.filter(e => {
      const matchQuery = !q || e.name.toLowerCase().includes(q) || e.productsList.some(p => p.toLowerCase().includes(q)) || e.city.toLowerCase().includes(q) || e.exportMarkets.some(m => m.toLowerCase().includes(q));
      const matchSector = sector === 'All' || e.productCategories.includes(sector);
      const matchRegion = region === 'All' || e.exportMarkets.includes(region);
      return matchQuery && matchSector && matchRegion;
    });

    // Filter importers
    let filteredImporters = SEED_IMPORTERS.filter(i => {
      const matchQuery = !q || i.name.toLowerCase().includes(q) || i.city.toLowerCase().includes(q) || i.activeDemands.some(d => d.toLowerCase().includes(q));
      const matchRegion = region === 'All' || i.country === region;
      const matchSector = sector === 'All' || i.activeDemands.some(d => d.includes(sector));
      return matchQuery && matchRegion && matchSector;
    });

    // Filter distributors
    let filteredDistributors = SEED_DISTRIBUTORS.filter(d => {
      const matchQuery = !q || d.name.toLowerCase().includes(q) || d.city.toLowerCase().includes(q) || d.shippingLanes.some(l => l.toLowerCase().includes(q));
      const matchRegion = region === 'All' || d.country === region;
      return matchQuery && matchRegion;
    });

    // Filter procurement
    let filteredProcurement = SEED_PROCUREMENT.filter(p => {
      const matchQuery = !q || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.sourcingMandate.toLowerCase().includes(q);
      const matchRegion = region === 'All' || p.country === region;
      return matchQuery && matchRegion;
    });

    // Sort outputs
    const sortFn = (a: any, b: any) => {
      if (sortBy === 'trustScore') return b.trustScore - a.trustScore;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      return 0;
    };

    filteredExporters.sort(sortFn);
    filteredImporters.sort(sortFn);
    filteredDistributors.sort(sortFn);
    filteredProcurement.sort(sortFn);

    setExporters(filteredExporters);
    setImporters(filteredImporters);
    setDistributors(filteredDistributors);
    setProcurement(filteredProcurement);
  };

  useEffect(() => {
    handleDirectorySearch(searchVal, directoryType, filterSector, filterRegion);
  }, [searchVal, directoryType, filterSector, filterRegion, sortBy]);

  // Demo auto-play timing
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isDemoPlaying) {
      timer = setInterval(() => {
        setDemoScene(prev => {
          if (prev < 6) {
            triggerSceneChange(prev + 1);
            return prev + 1;
          } else {
            setIsDemoPlaying(false);
            return prev;
          }
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isDemoPlaying]);

  // Trust Score Ticking Effect for Scene 6
  useEffect(() => {
    let ticker: NodeJS.Timeout;
    if (demoScene === 6) {
      ticker = setInterval(() => {
        setDemoTickingTrust(prev => {
          if (prev < 962) {
            return prev + 1;
          } else {
            clearInterval(ticker);
            return prev;
          }
        });
      }, 300);
    } else {
      setDemoTickingTrust(958);
    }
    return () => clearInterval(ticker);
  }, [demoScene]);

  // Demo Scene Orchestrator
  const triggerSceneChange = (sceneNum: number) => {
    setDemoScene(sceneNum);
    switch (sceneNum) {
      case 1:
        setActiveTab('discovery');
        setDirectoryType('exporter');
        setSearchVal('Premium Basmati Rice');
        setFilterSector('Rice');
        setFilterRegion('UAE');
        break;
      case 2:
        setActiveTab('profile');
        const supplier = SEED_EXPORTERS.find(e => e.name === "Karnal Agricultural Exports") || SEED_EXPORTERS[0];
        setActiveProfile(supplier);
        break;
      case 3:
        setActiveTab('workspace');
        setWorkspaceRole('buyer');
        setWizardStep(2);
        setRfqProduct('Premium 1121 Basmati Rice');
        setRfqQty('20');
        setRfqUnit('Metric Tons (MT)');
        setRfqDest('UAE');
        setRfqIncoterm('CIF (Cost, Insurance & Freight)');
        setRfqBudget('23800');
        setRfqCompliance('Moisture limit < 11.5%, Grain length > 8.2mm, pesticide traces < 0.01mg/kg');
        
        // Simulate AI extraction transition
        setAiExtracting(true);
        setTimeout(() => {
          setAiExtracting(false);
          setWizardStep(3);
        }, 1500);
        break;
      case 4:
        setActiveTab('workspace');
        setWorkspaceRole('buyer');
        
        // Populate standard comparison bids
        const matchedKarnal = SEED_EXPORTERS.find(e => e.name === "Karnal Agricultural Exports") || SEED_EXPORTERS[0];
        const secondaryExporter = SEED_EXPORTERS.find(e => e.name === "LT Foods Limited") || SEED_EXPORTERS[1];
        
        const generatedBids = [
          {
            id: 'bid-karnal',
            exporter: matchedKarnal,
            price: '$23,800 USD',
            priceVal: 23800,
            leadTime: '16 Days',
            moq: '20 MT',
            trustScore: 958,
            escrow: 'ELIGIBLE (SWIFT Node Validated)',
            specs: '1121 Grain length average: 8.35mm, moisture guaranteed < 11.5%.'
          },
          {
            id: 'bid-competitor',
            exporter: secondaryExporter,
            price: '$24,500 USD',
            priceVal: 24500,
            leadTime: '22 Days',
            moq: '18 MT',
            trustScore: 922,
            escrow: 'ELIGIBLE (Bank Audited)',
            specs: 'Standard 1121 basmati crop, moisture 12.0%, inspection at origin.'
          }
        ];
        setActiveBids(generatedBids);
        setWizardStep(6);
        break;
      case 5:
        setActiveTab('workspace');
        setWorkspaceRole('buyer');
        const chosenKarnal = SEED_EXPORTERS.find(e => e.name === "Karnal Agricultural Exports") || SEED_EXPORTERS[0];
        const agreement = {
          id: 'BX-9092',
          exporter: chosenKarnal,
          product: 'Premium 1121 Basmati Rice',
          quantity: '20 Metric Tons (MT)',
          totalValue: '$23,800 USD',
          incoterm: 'CIF Jebel Ali',
          inspectionAgency: 'SGS India',
          carrier: 'Maersk Line',
          contractHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'
        };
        setActiveEscrowAgreement(agreement);
        setEscrowFundsLocked(true);
        setEscrowStep(4); // Shipping in transit step
        setWizardStep(8);
        break;
      case 6:
        setActiveTab('feed');
        setEscrowStep(6); // Final settlement step
        
        // Add Al Ghurair verified endorsement to top of feed
        if (!demoEndorsementAdded) {
          const endorsementPost: FeedPost = {
            id: 'post-endorsement-demo',
            author: "Al Ghurair Foods",
            authorId: "imp-1",
            authorType: "Importer",
            authorLogo: "🏢",
            timestamp: "Just now",
            content: "🤝 VERIFIED TRADE COMPLIANCE ENDORSEMENT: We have officially released contract funds ($23,800 USD) via the BharatX multi-sig vault to Karnal Agricultural Exports. Grain length verified at 8.35mm, moisture 11.2%, ocean transit cleared at Jebel Ali without disputes. Exporter Trust score increased.",
            likes: 12,
            comments: 1,
            shares: 2,
            type: "partnership",
            meta: {
              targetCountry: "UAE",
              product: "Premium Basmati Rice"
            }
          };
          setFeedPosts(prev => [endorsementPost, ...prev]);
          setDemoEndorsementAdded(true);
        }
        break;
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const customPost: FeedPost = {
      id: `post-custom-${Date.now()}`,
      author: "Majid Al Futtaim Procurement",
      authorId: "proc-25",
      authorType: "Procurement",
      authorLogo: "🏬",
      timestamp: "Just now",
      content: newPostText,
      likes: 0,
      comments: 0,
      shares: 0,
      type: "opportunity"
    };

    setFeedPosts(prev => [customPost, ...prev]);
    setNewPostText('');
  };

  const startManualRfqWizard = () => {
    setRfqProduct('Lakadong Turmeric 9% Curcumin');
    setRfqQty('10');
    setRfqUnit('Metric Tons (MT)');
    setRfqDest('Germany');
    setRfqIncoterm('CIF (Cost, Insurance & Freight)');
    setRfqBudget('28000');
    setRfqCompliance('USDA Organic Certified, Spices Board inspected Curcumin > 9.0%');
    setActiveTab('workspace');
    setWorkspaceRole('buyer');
    setWizardStep(2);
  };

  const runAiExtractionManual = (e: React.FormEvent) => {
    e.preventDefault();
    setAiExtracting(true);
    setWizardStep(3);
    setTimeout(() => {
      setAiHsCode('0910.30.00');
      setAiTariff('0% (Bilateral Trade Advantage)');
      setAiFreightEst('$3,120 USD (Dachser Logistics)');
      setAiRiskRating('Negligible Sourcing Risk (AAA Lane Rating)');
      setAiCertsRequired(['Spices Board Certificate', 'USDA Organic Seal', 'Phytosanitary Log']);
      setAiExtracting(false);
    }, 1500);
  };

  const broadcastRfqManual = () => {
    // Select exporters matching the sector
    setWizardStep(4);
    setSelectedExportersForRfq(['exp-26', 'exp-27']);
  };

  const submitBroadcastManual = () => {
    const matchedSpices = SEED_EXPORTERS.filter(e => e.productCategories.includes('Spices'));
    const exp1 = matchedSpices[0] || SEED_EXPORTERS[0];
    const exp2 = matchedSpices[1] || SEED_EXPORTERS[1];

    const manualBids = [
      {
        id: 'bid-manual-1',
        exporter: exp1,
        price: '$27,500 USD',
        priceVal: 27500,
        leadTime: '20 Days',
        moq: '5 MT',
        trustScore: exp1.trustScore,
        escrow: 'ELIGIBLE (SWIFT Verified)',
        specs: 'Certified USDA Organic Turmeric, Curcumin 9.12%, moisture 8.4%.'
      },
      {
        id: 'bid-manual-2',
        exporter: exp2,
        price: '$28,200 USD',
        priceVal: 28200,
        leadTime: '15 Days',
        moq: '5 MT',
        trustScore: exp2.trustScore,
        escrow: 'ELIGIBLE (SWIFT Verified)',
        specs: 'Lakadong Bold crop, Curcumin 9.0%, fast-track ocean forwarding.'
      }
    ];

    setActiveBids(manualBids);
    setWizardStep(5); // Simulate exporter response
    setTimeout(() => {
      setWizardStep(6); // Compare quotes
    }, 1000);
  };

  const selectBidManual = (bid: any) => {
    setSelectedBid(bid);
    setCarrierSelected('DACHSER Food Logistics');
    setInspectorSelected('SGS India');
    setWizardStep(7);
  };

  const signEscrowManual = () => {
    const agreement = {
      id: 'BX-4482',
      exporter: selectedBid?.exporter || SEED_EXPORTERS[15],
      product: rfqProduct,
      quantity: `${rfqQty} ${rfqUnit}`,
      totalValue: selectedBid?.price || '$27,500 USD',
      incoterm: 'CIF Hamburg',
      inspectionAgency: inspectorSelected,
      carrier: carrierSelected,
      contractHash: '0f53139369be374fbc1121cbe3b3d2b270a6c0b93ca2d2f447cf0dbb752b820a'
    };
    setActiveEscrowAgreement(agreement);
    setEscrowFundsLocked(true);
    setEscrowStep(2); // Quality inspection pending
    setWizardStep(8);
  };

  const handleEscrowDisburse = () => {
    setEscrowStep(6); // RELEASED
    
    // Add custom post to top of feed
    const settledPost: FeedPost = {
      id: `post-settle-${Date.now()}`,
      author: activeEscrowAgreement?.buyerName || "Al Ghurair Foods",
      authorId: "imp-1",
      authorType: "Importer",
      authorLogo: "🏢",
      timestamp: "Just now",
      content: `🤝 Smart Escrow Release: Completed trade transaction for ${activeEscrowAgreement?.quantity} of ${activeEscrowAgreement?.product} with ${activeEscrowAgreement?.exporter?.name}. Quality reports validated, funds released instantly to SWIFT ledger.`,
      likes: 4,
      comments: 0,
      shares: 1,
      type: "update"
    };

    setFeedPosts(prev => [settledPost, ...prev]);
  };

  const triggerProfileViewer = (entity: any) => {
    setActiveProfile(entity);
    setActiveTab('profile');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#020204] text-white selection:bg-brand-primary/30 selection:text-white flex flex-col font-sans relative pb-52 overflow-hidden">
      
      {/* Decorative Ambient Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-orange-600/8 blur-[120px] pointer-events-none -z-10 animate-float-slow" />
      <div className="absolute bottom-[20%] right-[-10%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-emerald-500/8 blur-[120px] pointer-events-none -z-10 animate-float-slower" />
      <div className="absolute top-[40%] left-[25%] w-[55vw] h-[55vw] max-w-[700px] max-h-[700px] rounded-full bg-rose-600/4 blur-[150px] pointer-events-none -z-10 animate-float-fast" />

      {/* Top Header Navbar */}
      <header className="sticky top-0 z-45 w-full border-b border-white/[0.05] bg-[#030307]/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => triggerSceneChange(1)}>
              <div className="h-7 w-7 rounded bg-white text-black font-extrabold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                BX
              </div>
              <span className="font-extrabold text-sm tracking-tight text-white flex items-center gap-1.5 uppercase font-mono">
                BharatX <span className="text-[9px] bg-orange-500/10 border border-orange-500/20 text-orange-400 font-bold px-1.5 py-0.5 rounded tracking-wide">Global Trade Network</span>
              </span>
            </div>

            {/* Main Tab Navigation */}
            <nav className="hidden md:flex items-center bg-white/[0.01] border border-white/[0.05] rounded-full p-1 font-mono text-[10px]">
              {[
                { id: 'feed', label: '1. TRADE FEED', icon: Globe2 },
                { id: 'discovery', label: '2. DIRECTORY ENGINE', icon: Search },
                { id: 'workspace', label: '3. SOURCING WORKSPACE', icon: Briefcase },
                { id: 'demand-maps', label: '4. COUNTRY DEMAND MAPS', icon: Map },
                { id: 'profile', label: '5. PROFILE DOSSIER', icon: User }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-4 py-2 rounded-full font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer uppercase ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-orange-500/15 to-amber-500/15 border border-orange-500/25 shadow-[0_0_15px_rgba(255,94,0,0.18)]' 
                        : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Icon size={11} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <BButton variant="primary" size="sm" className="h-8 text-[10px] uppercase font-bold" onClick={startManualRfqWizard}>
              Launch Sourcing RFQ
            </BButton>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-8">
        <AnimatePresence mode="wait">

          {/* ==========================================
             TAB 1: TRADE NETWORK FEED
             ========================================== */}
          {activeTab === 'feed' && (
            <motion.div
              key="feed-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="grid md:grid-cols-12 gap-8 pb-20"
            >
              {/* Left Widget: Current Identity */}
              <div className="md:col-span-3 space-y-6">
                <div className="card p-5 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded bg-white text-black font-extrabold flex items-center justify-center text-sm shrink-0">🏢</div>
                    <div>
                      <h3 className="font-bold text-xs text-white">Al Ghurair Foods</h3>
                      <span className="text-[10px] text-zinc-500 block">Importer &bull; Dubai, UAE</span>
                    </div>
                  </div>
                  <div className="border-t border-white/[0.05] pt-3 space-y-2 text-[10px] font-mono text-zinc-400">
                    <div className="flex justify-between">
                      <span>Trust Rating:</span>
                      <strong className="text-emerald-400">978 / 1000</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Connections:</span>
                      <strong className="text-white">280</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Managed Sourcing:</span>
                      <strong className="text-white">$180M/year</strong>
                    </div>
                  </div>
                  <BButton variant="secondary" size="sm" className="w-full text-[10px]" onClick={() => triggerProfileViewer(importers[0])}>
                    My Network Dossier
                  </BButton>
                </div>

                {/* Network Statistics Card */}
                <div className="card p-5 space-y-4">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block">Bilateral Network Traffic</span>
                  <div className="space-y-3 font-mono">
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span>Active Exporters</span>
                        <span>250 verified</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full w-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span>Active Importers</span>
                        <span>100 verified</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full w-[85%]" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                        <span>Freight/Distributor Hubs</span>
                        <span>80 verified</span>
                      </div>
                      <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-500 rounded-full w-[60%]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle Feed Stream */}
              <div className="md:col-span-6 space-y-6">
                {/* Share Box */}
                <form onSubmit={handlePostSubmit} className="card p-4 flex gap-4 items-start">
                  <div className="h-8 w-8 rounded bg-white text-zinc-900 font-extrabold flex items-center justify-center text-xs shrink-0">🏢</div>
                  <div className="flex-1 space-y-3">
                    <textarea
                      value={newPostText}
                      onChange={(e) => setNewPostText(e.target.value)}
                      placeholder="Share a trade opportunity, logistics space, or sourcing requirement..."
                      className="w-full bg-transparent text-xs text-white placeholder-zinc-500 outline-none resize-none border-b border-white/[0.04] pb-2 min-h-[44px]"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <button type="button" onClick={() => setNewPostText("Looking to export/import immediately...")} className="px-2.5 py-1 rounded bg-white/5 border border-white/[0.05] text-zinc-400 hover:text-white text-[9px] font-mono cursor-pointer transition-colors">
                          #Sourcing
                        </button>
                        <button type="button" onClick={() => setNewPostText("Cargo container logistics slots open...")} className="px-2.5 py-1 rounded bg-white/5 border border-white/[0.05] text-zinc-400 hover:text-white text-[9px] font-mono cursor-pointer transition-colors">
                          #Logistics
                        </button>
                      </div>
                      <BButton type="submit" variant="primary" size="sm" className="h-8 px-3 text-[10px] font-bold">
                        Broadcast Feed
                      </BButton>
                    </div>
                  </div>
                </form>

                {/* Feed Timeline */}
                <div className="space-y-4">
                  {feedPosts.map((post) => (
                    <div key={post.id} className="card p-5 space-y-4">
                      {/* Author Header */}
                      <div className="flex justify-between items-start">
                        <div className="flex gap-3 items-center">
                          <div className="h-9 w-9 rounded-lg flex items-center justify-center text-lg bg-zinc-900 border border-white/[0.04] shrink-0">
                            {post.authorLogo}
                          </div>
                          <div>
                            <h4 className="font-semibold text-xs text-white flex items-center gap-1.5">
                              {post.author}
                              <span className="text-[8px] tracking-wider uppercase bg-white/[0.06] border border-white/[0.08] text-zinc-400 px-1.5 py-0.5 rounded font-mono font-medium">
                                {post.authorType}
                              </span>
                            </h4>
                            <span className="text-[10px] text-zinc-500">{post.timestamp} &bull; Verified Connection</span>
                          </div>
                        </div>
                        <span className={`text-[8px] font-extrabold uppercase font-mono px-2 py-0.5 rounded tracking-widest border ${
                          post.type === 'rfq' 
                            ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                            : post.type === 'opportunity'
                            ? 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                            : 'bg-zinc-800 border-white/[0.08] text-zinc-400'
                        }`}>
                          {post.type}
                        </span>
                      </div>

                      {/* Content */}
                      <p className="text-xs text-zinc-300 leading-relaxed font-sans">{post.content}</p>

                      {/* Meta Card context links */}
                      {post.meta && (
                        <div className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-lg font-mono text-[10px] flex justify-between items-center flex-wrap gap-2">
                          <div className="space-y-1">
                            <span className="text-zinc-500 block">PRODUCT PARAMETERS</span>
                            <span className="text-white font-semibold">{post.meta.product} {post.meta.quantity ? `(${post.meta.quantity})` : ''}</span>
                          </div>
                          {post.meta.rfqId ? (
                            <BButton variant="primary" size="sm" className="h-7 text-[9px] px-3 font-bold" onClick={() => triggerSceneChange(4)}>
                              View Broadcast Bids
                            </BButton>
                          ) : post.meta.pricing ? (
                            <BButton variant="secondary" size="sm" className="h-7 text-[9px] px-3" onClick={() => triggerProfileViewer(SEED_EXPORTERS.find(e => e.name === "Karnal Agricultural Exports"))}>
                              Audit Dossier
                            </BButton>
                          ) : null}
                        </div>
                      )}

                      {/* Feed Actions */}
                      <div className="flex gap-4 pt-2 border-t border-white/[0.04] text-[10px] text-zinc-500 font-mono">
                        <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                          <ThumbsUp size={12} /> Like ({post.likes})
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                          <MessageSquare size={12} /> Comment ({post.comments})
                        </button>
                        <button className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer">
                          <Share2 size={12} /> Share ({post.shares})
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Widget: Verification & CEPA Alerts */}
              <div className="md:col-span-3 space-y-6">
                <div className="card p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="text-orange-400" size={14} />
                    <span className="text-[10px] font-bold text-zinc-300 font-mono uppercase tracking-wider">CEPA Tariff Alerts</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs">
                    <div className="p-3 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                      <span className="text-[9px] font-bold text-orange-400 block font-mono">INDIA-UAE CORRIDOR</span>
                      <p className="text-[10px] text-zinc-400 mt-1 leading-snug">0% import tariff duty activated on premium basmati rice (1006.30) cargo under bilateral trade treaty limits.</p>
                    </div>
                    <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-lg">
                      <span className="text-[9px] font-bold text-amber-400 block font-mono">INDIA-UK CORRIDOR</span>
                      <p className="text-[10px] text-zinc-400 mt-1 leading-snug">Tariff concessions on organic clothing & GOTS yarn pending validation under round 15 of FTA talks.</p>
                    </div>
                  </div>
                </div>

                <div className="card p-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="text-emerald-400" size={14} />
                    <span className="text-[10px] font-bold text-zinc-300 font-mono uppercase tracking-wider">Secured Smart Escrow</span>
                  </div>
                  <div className="space-y-2 text-[10px] text-zinc-400 font-mono">
                    <p className="text-zinc-500 leading-normal font-sans text-[11px]">BharatX locks buyer liquidity in audited multi-sig vaults, disbursing capital only upon digital verification of transport data (SGS audits, port checks).</p>
                    <div className="flex items-center gap-2 text-white text-[10px] pt-1">
                      <CheckCircle size={10} className="text-emerald-400" />
                      <span>$45M locked escrow volume</span>
                    </div>
                    <div className="flex items-center gap-2 text-white text-[10px]">
                      <CheckCircle size={10} className="text-emerald-400" />
                      <span>0.02% dispute rating index</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ==========================================
             TAB 2: NETWORK DIRECTORY ENGINE
             ========================================== */}
          {activeTab === 'discovery' && (
            <motion.div
              key="directory-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 pb-20"
            >
              {/* Centered Header (TutorMate Style) */}
              <div className="max-w-3xl mx-auto text-center space-y-4 py-6">
                <span className="text-[10px] font-bold text-brand-primary tracking-widest block uppercase font-mono">
                  Verified B2B Global Trade Index
                </span>
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-none">
                  Find the Right Partner. <span className="text-zinc-500">Instantly.</span>
                </h1>
                <p className="text-xs text-zinc-500 font-mono">
                  500 authenticated global trade entities at your fingertips &bull; Real-time network credit ratings &bull; Active trade lanes
                </p>
              </div>

              {/* Capsule Search Input & Pills Panel */}
              <div className="max-w-2xl mx-auto space-y-6">
                {/* Search Bar - TutorMate style capsule */}
                <div className="relative w-full">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                  <input
                    type="text"
                    value={searchVal}
                    onChange={(e) => setSearchVal(e.target.value)}
                    placeholder="Search 500 companies by name, commodities, ports, HS codes..."
                    className="w-full bg-[#0A0A0C] border border-white/10 text-white rounded-full px-6 py-4 pl-14 pr-16 text-xs placeholder-zinc-500 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-[0_0_20px_rgba(255,94,0,0.03)]"
                  />
                  {/* Explore Arrow Button */}
                  <button
                    type="button"
                    onClick={() => handleDirectorySearch(searchVal, directoryType, filterSector, filterRegion)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-primary hover:bg-brand-primary/95 text-white rounded-full p-2.5 transition-all shadow-[0_0_15px_rgba(255,94,0,0.3)] flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 border-none outline-none"
                  >
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Filters & Sorting */}
                <div className="space-y-4 pt-2">
                  {/* 1. Entity Role Pills (TutorMate Category Tags) */}
                  <div className="flex flex-wrap gap-2 justify-center font-sans text-xs">
                    {[
                      { id: 'all', label: 'All Roles' },
                      { id: 'exporter', label: 'Suppliers & Exporters' },
                      { id: 'importer', label: 'Buyers & Importers' },
                      { id: 'distributor', label: 'Logistics & Forwarding' },
                      { id: 'procurement', label: 'Procurement Mandates' }
                    ].map((roleFilter) => {
                      const isActive = directoryType === roleFilter.id;
                      return (
                        <button
                          key={roleFilter.id}
                          onClick={() => setDirectoryType(roleFilter.id as any)}
                          className={`px-5 py-2.5 rounded-full transition-all cursor-pointer font-semibold border text-[11px] ${
                            isActive 
                              ? 'bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] font-bold' 
                              : 'bg-[#0A0A0C]/40 border-white/[0.08] text-zinc-400 hover:text-white hover:border-white/20'
                          }`}
                        >
                          {roleFilter.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* 2. Commodity Sector Pills */}
                  {(directoryType === 'all' || directoryType === 'exporter' || directoryType === 'importer') && (
                    <div className="flex flex-wrap gap-2 justify-center font-sans text-xs border-t border-white/[0.04] pt-4">
                      {['All', 'Rice', 'Spices', 'Tea', 'Coffee', 'Textiles', 'Pharmaceuticals', 'Chemicals', 'Handicrafts', 'Auto Components'].map((sec) => {
                        const isActive = filterSector === sec;
                        return (
                          <button
                            key={sec}
                            onClick={() => setFilterSector(sec)}
                            className={`px-4 py-2 rounded-full transition-all cursor-pointer text-[10px] border ${
                              isActive 
                                ? 'bg-white border-white text-black font-semibold shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                                : 'bg-transparent border-white/[0.05] text-zinc-500 hover:text-zinc-300 hover:border-white/10'
                            }`}
                          >
                            {sec}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Sorting & Stats Footer */}
                  <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 border-t border-white/[0.04] pt-4 px-2">
                    <span>
                      {exporters.length + importers.length + distributors.length + procurement.length} Verified Entries Found
                    </span>
                    
                    <div className="flex items-center gap-2">
                      <span className="uppercase">Sort By:</span>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="bg-[#0A0A0C] border border-white/[0.08] text-zinc-300 rounded-md px-2.5 py-1 outline-none text-[10px] cursor-pointer hover:border-zinc-500"
                      >
                        <option value="trustScore">Trust Rating</option>
                        <option value="rating">Review Stars</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Grid Result list */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
                {/* Render Exporters */}
                {(directoryType === 'all' || directoryType === 'exporter') && 
                  exporters.map(exp => (
                    <BPartnerDiscoveryCard 
                      key={exp.id} 
                      partner={exp} 
                      onViewProfile={() => triggerProfileViewer(exp)}
                      onAction={() => {
                        setRfqProduct(exp.productsList[0] || 'Premium Basmati Rice');
                        setRfqQty(exp.moq ? exp.moq.split(' ')[0] : '20');
                        setRfqDest(exp.exportMarkets[0] || 'UAE');
                        setActiveTab('workspace');
                        setWizardStep(2);
                      }}
                    />
                  ))
                }

                {/* Render Importers */}
                {(directoryType === 'all' || directoryType === 'importer') && 
                  importers.map(imp => (
                    <BPartnerDiscoveryCard 
                      key={imp.id} 
                      partner={imp} 
                      onViewProfile={() => triggerProfileViewer(imp)}
                      onAction={() => {}}
                    />
                  ))
                }

                {/* Render Distributors */}
                {(directoryType === 'all' || directoryType === 'distributor') && 
                  distributors.map(dist => (
                    <BPartnerDiscoveryCard 
                      key={dist.id} 
                      partner={dist} 
                      onViewProfile={() => triggerProfileViewer(dist)}
                      onAction={() => {}}
                    />
                  ))
                }

                {/* Render Procurement */}
                {(directoryType === 'all' || directoryType === 'procurement') && 
                  procurement.map(proc => (
                    <BPartnerDiscoveryCard 
                      key={proc.id} 
                      partner={proc} 
                      onViewProfile={() => triggerProfileViewer(proc)}
                      onAction={() => {}}
                    />
                  ))
                }
              </div>

              {/* Zero state handling */}
              {exporters.length === 0 && importers.length === 0 && distributors.length === 0 && procurement.length === 0 && (
                <div className="card p-12 text-center text-zinc-500 font-mono rounded-2xl">
                  <AlertCircle className="mx-auto text-zinc-600 mb-4" size={24} />
                  <p>Zero matches found in directory for search query "{searchVal}"</p>
                  <button onClick={() => { setSearchVal(''); setFilterSector('All'); setFilterRegion('All'); }} className="text-brand-primary underline mt-2 text-xs font-semibold cursor-pointer">
                    Clear Search Filters
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* ==========================================
             TAB 3: COOPERATIVE WORKSPACE
             ========================================== */}
          {activeTab === 'workspace' && (
            <motion.div
              key="workspace-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 pb-20"
            >
              {/* Workspace header & role switcher */}
              <div className="flex justify-between items-start flex-wrap gap-4 border-b border-white/[0.06] pb-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-brand-primary tracking-widest block uppercase font-mono">Bilateral Workspace Sourcing Terminal</span>
                  <h1 className="text-3xl font-extrabold tracking-tighter text-gradient leading-none">BharatX Trade Workspace</h1>
                </div>

                <div className="flex bg-white/[0.03] border border-white/[0.08] p-0.5 rounded-lg font-mono text-[10px]">
                  <button 
                    onClick={() => setWorkspaceRole('buyer')}
                    className={`px-3 py-1.5 rounded font-bold cursor-pointer uppercase ${workspaceRole === 'buyer' ? 'bg-white text-black font-semibold' : 'text-zinc-500'}`}
                  >
                    Buyer Workspace
                  </button>
                  <button 
                    onClick={() => setWorkspaceRole('exporter')}
                    className={`px-3 py-1.5 rounded font-bold cursor-pointer uppercase ${workspaceRole === 'exporter' ? 'bg-white text-black font-semibold' : 'text-zinc-500'}`}
                  >
                    Exporter Workspace
                  </button>
                </div>
              </div>

              {/* ==================== BUYER WORKSPACE ==================== */}
              {workspaceRole === 'buyer' && (
                <div className="grid md:grid-cols-12 gap-8">
                  {/* Left Column: Sourcing Checklist */}
                  <div className="md:col-span-4 space-y-6">
                    <div className="card p-5 space-y-4">
                      <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block font-mono">Sourcing checklist</span>
                      <div className="space-y-3 font-mono text-xs">
                        {[
                          { step: 1, label: "Identify commodity target" },
                          { step: 2, label: "Parameters & compliance standards" },
                          { step: 3, label: "AI regulation extraction checks" },
                          { step: 4, label: "Match exporters list" },
                          { step: 5, label: "Broadcast RFQ to feed" },
                          { step: 6, label: "Quote comparison board" },
                          { step: 7, label: "Multi-sig lock checkout" },
                          { step: 8, label: "Track active escrow" }
                        ].map((s) => (
                          <div 
                            key={s.step} 
                            onClick={() => setWizardStep(s.step)}
                            className={`flex items-center gap-3 p-2 rounded cursor-pointer transition-colors ${
                              wizardStep === s.step 
                                ? 'bg-brand-primary/10 border border-brand-primary/20 text-white font-semibold'
                                : wizardStep > s.step
                                ? 'text-zinc-400 hover:text-white'
                                : 'text-zinc-600 hover:text-zinc-400'
                            }`}
                          >
                            <span className="h-4 w-4 rounded-full bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-[9px]">
                              {wizardStep > s.step ? <Check size={8} className="text-emerald-400" /> : s.step}
                            </span>
                            <span>{s.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Active Sourcing Step Console */}
                  <div className="md:col-span-8 space-y-6">
                    
                    {/* STEP 1: Sourcing Initiation */}
                    {wizardStep === 1 && (
                      <div className="card p-6 space-y-5 text-center">
                        <PlusCircle size={32} className="mx-auto text-orange-400" />
                        <div className="space-y-2">
                          <h3 className="font-bold text-sm text-white">Create New Sourcing Mandate</h3>
                          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-sans">Assemble specifications, HS Codes, country regulations, and staging details in a standardized smart RFQ package.</p>
                        </div>
                        <BButton variant="primary" size="md" className="font-bold uppercase font-mono" onClick={() => setWizardStep(2)}>
                          Configure Parameters
                        </BButton>
                      </div>
                    )}

                    {/* STEP 2: Configure Parameters Form */}
                    {wizardStep === 2 && (
                      <form onSubmit={runAiExtractionManual} className="card p-6 space-y-5">
                        <h3 className="font-bold text-sm text-orange-400 border-b border-white/[0.04] pb-2 font-mono uppercase tracking-wider">Configure Trade Parameters</h3>
                        
                        <div className="grid md:grid-cols-2 gap-4 text-xs font-mono">
                          <div className="space-y-1">
                            <label className="text-zinc-500 uppercase text-[9px] block">Target Product Name</label>
                            <input
                              type="text"
                              value={rfqProduct}
                              onChange={(e) => setRfqProduct(e.target.value)}
                              className="input p-2 rounded w-full"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-zinc-500 uppercase text-[9px] block">Quantity & Units</label>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={rfqQty}
                                onChange={(e) => setRfqQty(e.target.value)}
                                className="input p-2 rounded w-20 text-center"
                                required
                              />
                              <input
                                type="text"
                                value={rfqUnit}
                                onChange={(e) => setRfqUnit(e.target.value)}
                                className="input p-2 rounded flex-1"
                                required
                              />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <label className="text-zinc-500 uppercase text-[9px] block">Destination Country</label>
                            <input
                              type="text"
                              value={rfqDest}
                              onChange={(e) => setRfqDest(e.target.value)}
                              className="input p-2 rounded w-full"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-zinc-500 uppercase text-[9px] block">Incoterm Rule</label>
                            <input
                              type="text"
                              value={rfqIncoterm}
                              onChange={(e) => setRfqIncoterm(e.target.value)}
                              className="input p-2 rounded w-full"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-zinc-500 uppercase text-[9px] block">Escrow Budget ($ USD)</label>
                            <input
                              type="number"
                              value={rfqBudget}
                              onChange={(e) => setRfqBudget(e.target.value)}
                              className="input p-2 rounded w-full"
                              required
                            />
                          </div>
                          <div className="space-y-1">
                            <label className="text-zinc-500 uppercase text-[9px] block">Bidding Deadline</label>
                            <input
                              type="date"
                              value={rfqDeadline}
                              onChange={(e) => setRfqDeadline(e.target.value)}
                              className="input p-2 rounded w-full"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-1 text-xs font-mono">
                          <label className="text-zinc-500 uppercase text-[9px] block">Quality Compliance Requirements</label>
                          <textarea
                            value={rfqCompliance}
                            onChange={(e) => setRfqCompliance(e.target.value)}
                            className="input p-2 rounded w-full min-h-[50px]"
                            required
                          />
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.04]">
                          <BButton type="button" variant="ghost" size="sm" onClick={() => setWizardStep(1)}>Reset</BButton>
                          <BButton type="submit" variant="primary" size="sm" className="font-bold font-mono">Run AI Compliance Sourcing</BButton>
                        </div>
                      </form>
                    )}

                    {/* STEP 3: AI compliance extraction */}
                    {wizardStep === 3 && (
                      <div className="card p-6 space-y-5">
                        <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                          <h3 className="font-bold text-sm text-orange-400 font-mono uppercase tracking-wider">AI Compliance Sourcing Analysis</h3>
                          {aiExtracting && <RefreshCw size={14} className="animate-spin text-zinc-500" />}
                        </div>

                        <div className="space-y-3 font-mono text-xs">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg">
                              <span className="text-[8px] text-zinc-500 block uppercase">HS Code Resolved</span>
                              <strong className="text-white text-xs">{aiHsCode}</strong>
                            </div>
                            <div className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg">
                              <span className="text-[8px] text-zinc-500 block uppercase">Customs Duties (Tariff)</span>
                              <strong className="text-emerald-400 text-xs">{aiTariff}</strong>
                            </div>
                            <div className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg">
                              <span className="text-[8px] text-zinc-500 block uppercase">Transit & Port Freight Estimates</span>
                              <strong className="text-white text-xs">{aiFreightEst}</strong>
                            </div>
                            <div className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg">
                              <span className="text-[8px] text-zinc-500 block uppercase">Lane Security Risk</span>
                              <strong className="text-emerald-400 text-xs">{aiRiskRating}</strong>
                            </div>
                          </div>

                          <div className="p-4 bg-white/[0.01] border border-white/[0.05] rounded-lg space-y-2">
                            <span className="text-[8px] text-zinc-500 block uppercase">APEDA/Board Required Certificates</span>
                            <div className="flex flex-wrap gap-2">
                              {aiCertsRequired.map((c) => (
                                <span key={c} className="px-2.5 py-1 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px]">
                                  {c}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.04]">
                          <BButton variant="ghost" size="sm" onClick={() => setWizardStep(2)}>Back</BButton>
                          <BButton variant="primary" size="sm" className="font-bold font-mono" onClick={broadcastRfqManual}>
                            Identify Suppliers List
                          </BButton>
                        </div>
                      </div>
                    )}

                    {/* STEP 4: Match exporter list */}
                    {wizardStep === 4 && (
                      <div className="card p-6 space-y-5 font-mono text-xs">
                        <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                          <h3 className="font-bold text-sm text-orange-400 uppercase tracking-wider">Matched Network Suppliers</h3>
                          <span className="text-[10px] text-zinc-500">2 matching found</span>
                        </div>

                        <div className="space-y-3">
                          {[
                            { id: 'exp-21', name: 'Karnal Agricultural Exports', city: 'Karnal', trust: 958, match: '99%' },
                            { id: 'exp-1', name: 'KRBL Limited', city: 'Delhi', trust: 940, match: '95%' }
                          ].map((exp) => (
                            <div key={exp.id} className="p-4 bg-[#0A0A0C] border border-white/[0.08] rounded-xl flex justify-between items-center flex-wrap gap-4">
                              <div className="flex gap-3 items-center">
                                <span className="text-xl">🌾</span>
                                <div>
                                  <h4 className="font-bold text-xs text-white">{exp.name}</h4>
                                  <span className="text-[10px] text-zinc-500 block">{exp.city}, India &bull; Trust Rating: {exp.trust}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-emerald-400 text-xs font-bold">{exp.match} Match</span>
                                <input
                                  type="checkbox"
                                  checked={selectedExportersForRfq.includes(exp.id)}
                                  onChange={() => {
                                    setSelectedExportersForRfq(prev => 
                                      prev.includes(exp.id) ? prev.filter(id => id !== exp.id) : [...prev, exp.id]
                                    );
                                  }}
                                  className="h-4 w-4 rounded bg-zinc-900 border-white/20"
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.04]">
                          <BButton variant="ghost" size="sm" onClick={() => setWizardStep(3)}>Back</BButton>
                          <BButton variant="primary" size="sm" className="font-bold font-mono" onClick={submitBroadcastManual}>
                            Broadcast RFQ to Network Feed
                          </BButton>
                        </div>
                      </div>
                    )}

                    {/* STEP 5: Waiting Exporter Bids */}
                    {wizardStep === 5 && (
                      <div className="card p-6 space-y-5 text-center font-mono">
                        <RefreshCw className="animate-spin mx-auto text-orange-400" size={28} />
                        <div className="space-y-2">
                          <h3 className="font-bold text-xs text-white uppercase tracking-wider">Broadcasting Sourcing Mandate</h3>
                          <p className="text-xs text-zinc-500 font-sans leading-relaxed">RFQ has been registered under smart contract hashing ledger, matching notifications dispatched to verified exporters...</p>
                        </div>
                      </div>
                    )}

                    {/* STEP 6: Quote Comparison board */}
                    {wizardStep === 6 && (
                      <div className="card p-6 space-y-5 font-mono text-xs">
                        <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                          <h3 className="font-bold text-sm text-orange-400 uppercase tracking-wider">Line-by-Line Quote Comparison</h3>
                          <span className="text-[10px] text-zinc-500">2 bids submitted</span>
                        </div>

                        <div className="overflow-x-auto border border-white/[0.06] rounded-lg">
                          <table className="w-full text-left border-collapse text-[10px]">
                            <thead>
                              <tr className="bg-white/[0.02] border-b border-white/[0.06] text-zinc-500">
                                <th className="p-3">Specification Item</th>
                                {activeBids.map(bid => (
                                  <th key={bid.id} className="p-3 text-white">
                                    <span className="text-sm mr-1">{bid.exporter.logo}</span>
                                    {bid.exporter.name}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/[0.06] text-zinc-300">
                              <tr>
                                <td className="p-3 text-zinc-500 font-semibold">Total Escrow Bid Price</td>
                                {activeBids.map(bid => (
                                  <td key={bid.id} className="p-3 text-emerald-400 font-bold">{bid.price}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="p-3 text-zinc-500 font-semibold">Lead Time (Ex-works)</td>
                                {activeBids.map(bid => (
                                  <td key={bid.id} className="p-3 text-white font-medium">{bid.leadTime}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="p-3 text-zinc-500 font-semibold">Trust Score Index</td>
                                {activeBids.map(bid => (
                                  <td key={bid.id} className="p-3 text-orange-400 font-bold">{bid.trustScore} / 1000</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="p-3 text-zinc-500 font-semibold">Escrow Eligibility Status</td>
                                {activeBids.map(bid => (
                                  <td key={bid.id} className="p-3 text-emerald-400 font-medium">{bid.escrow}</td>
                                ))}
                              </tr>
                              <tr>
                                <td className="p-3 text-zinc-500 font-semibold">Compliance Details</td>
                                {activeBids.map(bid => (
                                  <td key={bid.id} className="p-3 text-zinc-400 leading-normal max-w-[200px]">{bid.specs}</td>
                                ))}
                              </tr>
                              <tr className="bg-white/[0.01]">
                                <td className="p-3"></td>
                                {activeBids.map(bid => (
                                  <td key={bid.id} className="p-3">
                                    <BButton variant="primary" size="sm" className="h-8 text-[9px] font-bold" onClick={() => selectBidManual(bid)}>
                                      Select Exporter
                                    </BButton>
                                  </td>
                                ))}
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* STEP 7: Escrow lock checkout details */}
                    {wizardStep === 7 && (
                      <div className="card p-6 space-y-5 font-mono text-xs">
                        <h3 className="font-bold text-sm text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Configure Escrow & Cargo Transit</h3>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div className="p-4 bg-zinc-900/50 border border-white/[0.05] rounded-xl space-y-2">
                              <span className="text-[8px] text-zinc-500 block uppercase">Exporter Sourced</span>
                              <strong className="text-white text-xs">{selectedBid?.exporter?.name}</strong>
                              <span className="text-[10px] text-zinc-400 block">Karnal, Haryana &bull; Rating: {selectedBid?.trustScore}</span>
                            </div>

                            <div className="space-y-1">
                              <label className="text-zinc-500 uppercase text-[9px] block">Third-Party Origin Auditor</label>
                              <select 
                                value={inspectorSelected} 
                                onChange={(e) => setInspectorSelected(e.target.value)}
                                className="bg-zinc-900 border border-white/[0.08] text-white rounded p-2 outline-none w-full"
                              >
                                <option value="SGS India">SGS India ($350)</option>
                                <option value="Bureau Veritas">Bureau Veritas ($400)</option>
                                <option value="Intertek India">Intertek ($380)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="p-4 bg-zinc-900/50 border border-white/[0.05] rounded-xl space-y-1">
                              <div className="flex justify-between text-zinc-500 text-[9px]">
                                <span>COMMODITY VALUE:</span>
                                <span className="text-white font-mono">{selectedBid?.price}</span>
                              </div>
                              <div className="flex justify-between text-zinc-500 text-[9px]">
                                <span>INSPECTION RESERVE:</span>
                                <span className="text-white font-mono">$350 USD</span>
                              </div>
                              <div className="flex justify-between text-zinc-500 text-[9px]">
                                <span>EST FREIGHT COST:</span>
                                <span className="text-white font-mono">$1,850 USD</span>
                              </div>
                              <div className="flex justify-between text-zinc-300 text-[10px] pt-1.5 border-t border-white/[0.05] font-bold">
                                <span>ESCROW LOCKED SUM:</span>
                                <span className="text-emerald-400 font-mono">$26,000 USD</span>
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-zinc-500 uppercase text-[9px] block">Preferred Carrier Forwarder</label>
                              <select 
                                value={carrierSelected} 
                                onChange={(e) => setCarrierSelected(e.target.value)}
                                className="bg-zinc-900 border border-white/[0.08] text-white rounded p-2 outline-none w-full"
                              >
                                <option value="Maersk Line">Maersk Line ($1,850)</option>
                                <option value="DACHSER Food Logistics">DACHSER Food Logistics ($1,950)</option>
                                <option value="Flexport Logistics">Flexport ($2,100)</option>
                              </select>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-2 border-t border-white/[0.04]">
                          <BButton variant="ghost" size="sm" onClick={() => setWizardStep(6)}>Back</BButton>
                          <BButton variant="primary" size="md" className="font-bold text-xs uppercase" onClick={signEscrowManual}>
                            Sign & Lock Escrow Funds
                          </BButton>
                        </div>
                      </div>
                    )}

                    {/* STEP 8: Active Escrow stepper */}
                    {wizardStep === 8 && (
                      <div className="card p-6 space-y-5 font-mono text-xs">
                        <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                          <h3 className="font-bold text-sm text-orange-400 uppercase tracking-wider">Secured Sourcing Escrow Terminal</h3>
                          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider font-mono">FUNDS LOCKED IN VAULT</span>
                        </div>

                        {/* Staging summary */}
                        <div className="p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl flex justify-between items-center flex-wrap gap-4 text-[10px]">
                          <div>
                            <span className="text-zinc-500 block">ESCROW CONTRACT HASH</span>
                            <span className="text-zinc-400 break-all max-w-[280px] font-mono text-[9px] block">{activeEscrowAgreement?.contractHash}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-zinc-500 block">ESCROW RESERVE LOCK</span>
                            <strong className="text-emerald-400 text-xs font-mono">{activeEscrowAgreement?.totalValue}</strong>
                          </div>
                        </div>

                        {/* Escrow Stepper Timeline */}
                        <div className="relative pl-6 space-y-6 border-l border-white/[0.08] ml-2 mt-4 text-[11px] font-sans">
                          {[
                            { step: 1, label: "Escrow Locked", desc: "Buyer deposit verified. Funds staged in multi-sig vault." },
                            { step: 2, label: "Origin Inspection Verification", desc: "SGS India performs moisture checks and stuffing audits." },
                            { step: 3, label: "Port Customs Cleared", desc: "APEDA Phytosanitary certificate hashed, exporter customs cleared." },
                            { step: 4, label: "Shipping Ocean Transit", desc: "Cargo loaded onto Maersk Line. Tracking container vessel." },
                            { step: 5, label: "Port of Destination Arrival", desc: "Arrival at Jebel Ali Port, customs clearance confirmation." },
                            { step: 6, label: "Disbursement Settlement", desc: "Cargo released, funds disbursed to exporter Swift node." }
                          ].map((s) => {
                            const isDone = escrowStep >= s.step;
                            const isCurrent = escrowStep === s.step;
                            return (
                              <div key={s.step} className="relative">
                                {/* Bullet indicator */}
                                <span className={`absolute -left-[30px] top-0.5 h-4.5 w-4.5 rounded-full flex items-center justify-center border font-mono text-[9px] ${
                                  isDone 
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-extrabold shadow-[0_0_10px_rgba(5,196,107,0.3)]' 
                                    : 'bg-zinc-950 border-white/[0.08] text-zinc-600'
                                }`}>
                                  {isDone ? <Check size={10} /> : s.step}
                                </span>
                                <div>
                                  <h4 className={`font-bold text-xs ${isDone ? 'text-white' : 'text-zinc-500'} flex items-center gap-2`}>
                                    {s.label}
                                    {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-ping inline-block" />}
                                  </h4>
                                  <p className="text-[10px] text-zinc-500 mt-1 leading-normal font-mono font-normal">{s.desc}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Escrow actions */}
                        <div className="flex justify-between items-center pt-3 border-t border-white/[0.04]">
                          {escrowStep < 6 ? (
                            <>
                              <span className="text-[9px] text-zinc-500 font-mono">Current telemetry step: {escrowStep} of 6</span>
                              <div className="flex gap-2">
                                <BButton variant="secondary" size="sm" className="h-8 text-[10px]" onClick={() => setEscrowStep(prev => Math.min(prev + 1, 6))}>
                                  Simulate Cargo Progress
                                </BButton>
                                {escrowStep === 5 && (
                                  <BButton variant="primary" size="sm" className="h-8 text-[10px] font-bold" onClick={handleEscrowDisburse}>
                                    Confirm Receipt & Disburse
                                  </BButton>
                                )}
                              </div>
                            </>
                          ) : (
                            <div className="w-full flex justify-between items-center text-emerald-400">
                              <span className="text-[10px] font-bold flex items-center gap-1.5">
                                <CheckSquare size={12} /> ESCROW SETTLED SUCCESSFULLY
                              </span>
                              <BButton variant="secondary" size="sm" className="h-8 text-[10px]" onClick={() => { setWizardStep(1); setEscrowStep(1); }}>
                                Sourcing Workspace Completed
                              </BButton>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ==================== EXPORTER WORKSPACE ==================== */}
              {workspaceRole === 'exporter' && (
                <div className="card p-8 text-center font-mono text-xs space-y-4 max-w-xl mx-auto">
                  <Landmark size={32} className="mx-auto text-orange-400" />
                  <h3 className="font-bold text-sm text-white uppercase tracking-wider">Exporter Sourcing Terminal</h3>
                  <p className="text-zinc-400 font-sans leading-relaxed">Logged in as: **Karnal Agricultural Exports**. Your profile category is **Rice Sourcing**. Below are matching buyer RFQs broadcasted on the network.</p>
                  
                  <div className="space-y-3 text-left pt-4 border-t border-white/[0.05]">
                    <div className="p-4 bg-white/[0.01] border border-white/[0.05] rounded-lg space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-white font-bold text-xs">Al Ghurair Foods (RFQ-1001)</strong>
                          <span className="text-[10px] text-zinc-500 block">Jebel Ali Port, UAE &bull; Deadline: July 28</span>
                        </div>
                        <span className="text-[9px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20">ACTIVE RFQ</span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-sans">Sourcing 20 MT Premium Basmati Rice (1121 Grain length &gt; 8.2mm, moisture &lt; 11.5%). CIF Jebel Ali.</p>
                      <div className="flex justify-end gap-2 pt-2">
                        <BButton variant="secondary" size="sm" className="h-7 text-[9px] px-2" onClick={() => triggerProfileViewer(importers[0])}>
                          Inspect Importer Dossier
                        </BButton>
                        <BButton variant="primary" size="sm" className="h-7 text-[9px] px-2 font-bold" onClick={() => triggerSceneChange(4)}>
                          Submit Sourcing Quote
                        </BButton>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ==========================================
             TAB 4: COUNTRY DEMAND MAPS
             ========================================== */}
          {activeTab === 'demand-maps' && (
            <motion.div
              key="maps-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 pb-20 font-mono text-xs"
            >
              <div className="max-w-4xl space-y-2">
                <span className="text-[10px] font-bold text-brand-primary tracking-widest block uppercase font-mono">Bilateral Customs & Sourcing Matrices</span>
                <h1 className="text-3xl font-extrabold tracking-tighter text-gradient leading-none">Bilateral Trade Corridors</h1>
                <p className="text-xs text-zinc-500 font-medium font-mono">Select target destination to review import volume indexes, tariffs, and customs clearance procedures.</p>
              </div>

              <div className="grid md:grid-cols-12 gap-8">
                {/* Left panel: Country selector */}
                <div className="md:col-span-4 space-y-3">
                  <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block">Target Export Markets</span>
                  {SEED_COUNTRIES.map((cnt) => (
                    <div 
                      key={cnt.country}
                      onClick={() => setFilterRegion(cnt.country)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${
                        filterRegion === cnt.country 
                          ? 'bg-brand-primary/10 border-brand-primary text-white font-bold shadow-[0_0_15px_rgba(255,94,0,0.2)]'
                          : 'bg-[#0A0A0C] border-white/[0.06] text-zinc-500 hover:text-zinc-300'
                      }`}
                    >
                      <span>{cnt.country} Corridor</span>
                      <ChevronRight size={12} />
                    </div>
                  ))}
                </div>

                {/* Right panel: Sourcing regulations */}
                <div className="md:col-span-8 space-y-6">
                  {(() => {
                    const countryData = SEED_COUNTRIES.find(c => c.country === filterRegion) || SEED_COUNTRIES[0];
                    return (
                      <div className="card p-6 space-y-5">
                        <div className="flex justify-between items-center border-b border-white/[0.04] pb-2">
                          <h3 className="font-bold text-sm text-orange-400 uppercase tracking-wider">{countryData.country} Sourcing Rules</h3>
                          <Globe size={16} className="text-zinc-500" />
                        </div>

                        <div className="space-y-4">
                          {/* Top commodities */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] text-zinc-500 uppercase font-bold">Top Sourced Commodities from India</span>
                            <div className="flex flex-wrap gap-2">
                              {countryData.topImportsFromIndia.map((item) => (
                                <span key={item} className="px-2.5 py-1 rounded bg-white/5 border border-white/[0.06] text-zinc-300 text-[10px]">
                                  {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Customs documentation */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] text-zinc-500 uppercase font-bold">Mandatory Customs Certifications</span>
                            <div className="flex flex-wrap gap-2">
                              {countryData.requiredCertifications.map((cert) => (
                                <span key={cert} className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px]">
                                  {cert}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Customs note */}
                          <div className="space-y-1.5 p-4 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                            <span className="text-[9px] text-zinc-500 uppercase font-bold">Bilateral Regulatory Guidelines</span>
                            <p className="text-zinc-400 mt-1 font-sans leading-normal text-[11px] font-normal">{countryData.customsNotes}</p>
                          </div>

                          {/* Ports */}
                          <div className="space-y-1.5">
                            <span className="text-[9px] text-zinc-500 uppercase font-bold">Major Destination Shipping Ports</span>
                            <div className="grid md:grid-cols-2 gap-3 pt-1">
                              {countryData.popularPorts.map((port) => (
                                <div key={port} className="flex items-center gap-2 text-zinc-300 font-sans text-xs">
                                  <Anchor size={12} className="text-zinc-600 shrink-0" />
                                  <span>{port}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-white/[0.04] flex justify-end">
                          <BButton variant="primary" size="sm" className="font-bold font-mono" onClick={() => { setActiveTab('discovery'); setSearchVal(''); setDirectoryType('all'); }}>
                            Explore {countryData.country} Directory
                          </BButton>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              </div>
            </motion.div>
          )}

          {/* ==========================================
             TAB 5: PROFILE DOSSIER VIEWER
             ========================================== */}
          {activeTab === 'profile' && (
            <motion.div
              key="profile-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8 pb-20 font-mono text-xs"
            >
              {/* Back to directory */}
              <button 
                onClick={() => setActiveTab('discovery')}
                className="text-zinc-500 hover:text-white flex items-center gap-1 cursor-pointer font-bold text-[10px] uppercase"
              >
                &larr; Back to Network Directory
              </button>

              <div className="grid md:grid-cols-12 gap-8">
                {/* Left Dossier Panel: Summary */}
                <div className="md:col-span-4 space-y-6">
                  <div className="card p-6 flex flex-col items-center gap-4 text-center">
                    <div className="h-16 w-16 rounded-2xl bg-zinc-900 border border-white/[0.08] flex items-center justify-center text-3xl">
                      {activeProfile.logo || '🏢'}
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="font-extrabold text-sm text-white tracking-tight leading-snug">{activeProfile.name}</h2>
                      <span className="text-[10px] text-zinc-500 block">{activeProfile.city}, {activeProfile.country}</span>
                    </div>

                    <div className="w-full border-t border-white/[0.05] pt-4">
                      {activeProfile.role === 'Exporter' ? (
                        <BTrustScoreRing score={activeProfile.trustScore} />
                      ) : (
                        <div className="flex flex-col items-center gap-2 p-3 bg-white/[0.01] border border-white/[0.05] rounded-xl">
                          <span className="text-[8px] text-zinc-500 uppercase tracking-wider block">Network rating</span>
                          <div className="text-xl font-bold text-emerald-400 font-mono">
                            {activeProfile.creditRating || activeProfile.trustScore || '950'}
                          </div>
                          <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded uppercase font-bold tracking-wider font-mono">
                            {activeProfile.role === 'Importer' ? 'SWIFT VERIFIED' : 'BONDED MEMBER'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Core parameters */}
                  <div className="card p-5 space-y-3 text-[10px] text-zinc-400">
                    <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block font-mono">Network Activity Summary</span>
                    <div className="flex justify-between">
                      <span>Role status:</span>
                      <strong className="text-white uppercase">{activeProfile.role}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Connections:</span>
                      <strong className="text-white">{activeProfile.connections || 150} connected</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Trust Endorsements:</span>
                      <strong className="text-orange-400">{activeProfile.endorsements || 32} endorsed</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Years in Business:</span>
                      <strong className="text-white">{activeProfile.yearsActive || activeProfile.yearsInBusiness || 10} Years</strong>
                    </div>
                  </div>
                </div>

                {/* Right Dossier Panel: Modular details */}
                <div className="md:col-span-8 space-y-6">
                  
                  {/* EXPORTER PROFILE VIEWER */}
                  {activeProfile.role === 'Exporter' && (
                    <div className="space-y-6">
                      {/* Audited specifications */}
                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Milling & Sourcing Capabilities</h3>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="p-3.5 bg-[#0A0A0C] border border-white/[0.08] rounded-xl space-y-1">
                            <span className="text-[8px] text-zinc-500 uppercase block">Grain Length Index</span>
                            <strong className="text-white text-xs font-mono">8.35 mm (Premium Grade)</strong>
                          </div>
                          <div className="p-3.5 bg-[#0A0A0C] border border-white/[0.08] rounded-xl space-y-1">
                            <span className="text-[8px] text-zinc-500 uppercase block">Moisture Limit Guarantee</span>
                            <strong className="text-white text-xs font-mono">{activeProfile.moistureLimit || '11.5% max'}</strong>
                          </div>
                          <div className="p-3.5 bg-[#0A0A0C] border border-white/[0.08] rounded-xl space-y-1">
                            <span className="text-[8px] text-zinc-500 uppercase block">Typical Delivery Lead Time</span>
                            <strong className="text-white text-xs font-mono">{activeProfile.leadTime || '16 Days'}</strong>
                          </div>
                          <div className="p-3.5 bg-[#0A0A0C] border border-white/[0.08] rounded-xl space-y-1">
                            <span className="text-[8px] text-zinc-500 uppercase block">Commodity MOQ</span>
                            <strong className="text-white text-xs font-mono">{activeProfile.moq}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Certifications and audits */}
                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Bilateral Audit Registry</h3>
                        <div className="space-y-3">
                          {activeProfile.certifications.map((c: any) => (
                            <div key={c.name} className="p-3.5 bg-white/[0.01] border border-white/[0.05] rounded-xl flex justify-between items-center flex-wrap gap-2 text-[10px]">
                              <div className="flex gap-2.5 items-center">
                                <ShieldCheck size={14} className="text-emerald-400" />
                                <div>
                                  <strong className="text-white block font-bold">{c.name}</strong>
                                  <span className="text-zinc-500 block">Audited by: {c.authority}</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <span className="text-emerald-400 font-bold block uppercase text-[9px] tracking-wide">VERIFIED</span>
                                <span className="text-zinc-500 block text-[9px]">Expires: {c.expiry}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Past transactions ledger */}
                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Bilateral Transaction History</h3>
                        <div className="space-y-2 text-[10px]">
                          {(activeProfile.pastTransactions || []).map((tx: any) => (
                            <div key={tx.id} className="p-3 bg-white/[0.01] border border-white/[0.05] rounded-lg flex justify-between items-center text-zinc-300">
                              <div className="flex items-center gap-2">
                                <Ship size={12} className="text-zinc-500" />
                                <span>{tx.id} &bull; Destination: {tx.destination} &bull; {tx.date}</span>
                              </div>
                              <span className="text-emerald-400 font-bold font-mono">{tx.amount} &bull; {tx.status}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* IMPORTER PROFILE VIEWER */}
                  {activeProfile.role === 'Importer' && (
                    <div className="space-y-6">
                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Active Sourcing demands</h3>
                        <div className="flex flex-wrap gap-2">
                          {activeProfile.activeDemands.map((d: string) => (
                            <span key={d} className="px-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Logistics parameters</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Destination Ports:</span>
                            <span className="text-white font-semibold">{activeProfile.preferredPorts.join(', ')}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Incoterms Preferred:</span>
                            <span className="text-white font-semibold">{activeProfile.preferredIncoterms.join(', ')}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Annual Sourcing Volume:</span>
                            <span className="text-emerald-400 font-bold font-mono">{activeProfile.annualSourcingVolume}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">SWIFT Node Validation:</span>
                            <span className="text-emerald-400 font-semibold">{activeProfile.verificationStatus}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* DISTRIBUTOR PROFILE VIEWER */}
                  {activeProfile.role === 'Distributor' && (
                    <div className="space-y-6">
                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Logistics reach</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Active Shipping Lanes:</span>
                            <span className="text-white font-semibold">{activeProfile.shippingLanes.join(', ')}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Logistics Modes:</span>
                            <span className="text-white font-semibold">{activeProfile.modes.join(', ')}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Warehouse Capacities:</span>
                            <span className="text-white font-semibold">{activeProfile.capacity}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Customs Clearance Success Rate:</span>
                            <span className="text-orange-400 font-bold font-mono">{activeProfile.customsClearanceRate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROCUREMENT PROFILE VIEWER */}
                  {activeProfile.role === 'Procurement' && (
                    <div className="space-y-6">
                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Corporate mandate</h3>
                        <p className="text-zinc-300 font-normal leading-relaxed font-sans">{activeProfile.sourcingMandate}</p>
                      </div>

                      <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-xs text-orange-400 border-b border-white/[0.04] pb-2 uppercase tracking-wider">Sourcing guidelines</h3>
                        <div className="space-y-3">
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Active Mandates:</span>
                            <span className="text-white font-semibold">{activeProfile.activeMandates.join(', ')}</span>
                          </div>
                          <div className="flex justify-between pb-2 border-b border-white/[0.04]">
                            <span className="text-zinc-500">Annual Spend Managed:</span>
                            <span className="text-amber-400 font-bold font-mono">{activeProfile.annualSpend}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-zinc-500">Procurement Team Size:</span>
                            <span className="text-white font-semibold">{activeProfile.teamSize} Officers</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ==========================================================
         FLOATING YC DEMO PRESENTATION CONSOLE
         ========================================================== */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl z-50 bg-zinc-950/85 backdrop-blur-xl border border-orange-500/25 rounded-2xl p-5 shadow-[0_15px_50px_rgba(255,94,0,0.15)] text-xs font-mono">
        
        {/* Timeline progress line and dots */}
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
            </span>
            <span className="font-extrabold text-[10px] text-orange-400 tracking-wider uppercase font-mono">YC DEMO COMPANION</span>
          </div>
          
          {/* Scene indicators */}
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <button
                key={s}
                onClick={() => triggerSceneChange(s)}
                className={`px-2.5 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                  demoScene === s 
                    ? 'bg-orange-500 text-white shadow-[0_0_15px_rgba(255,94,0,0.4)] border border-orange-400' 
                    : 'text-zinc-500 hover:text-zinc-300 border border-transparent hover:border-white/5'
                }`}
              >
                Scene {s}
              </button>
            ))}
          </div>
          
          {/* Controls */}
          <div className="flex items-center gap-2">
            <BButton
              variant="secondary"
              size="sm"
              onClick={() => {
                if (demoScene > 1) triggerSceneChange(demoScene - 1);
              }}
              className="h-7 text-[10px] px-2.5"
            >
              Prev
            </BButton>
            <BButton
              variant={isDemoPlaying ? 'ghost' : 'primary'}
              size="sm"
              onClick={() => setIsDemoPlaying(!isDemoPlaying)}
              className="h-7 text-[10px] px-3 font-bold flex items-center gap-1"
            >
              {isDemoPlaying ? 'Pause Auto' : 'Auto-Play Story'}
            </BButton>
            <BButton
              variant="secondary"
              size="sm"
              onClick={() => {
                if (demoScene < 6) triggerSceneChange(demoScene + 1);
              }}
              className="h-7 text-[10px] px-2.5"
            >
              Next
            </BButton>
            <button 
              onClick={() => {
                triggerSceneChange(1);
                setIsDemoPlaying(false);
              }} 
              className="text-zinc-600 hover:text-zinc-400 text-[10px] ml-2 underline cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Pitch deck details */}
        <div className="grid md:grid-cols-12 gap-5">
          {/* Stakeholder Perspective Tabs */}
          <div className="md:col-span-8 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-white/[0.04] pb-1.5">
              <span className="text-[10px] text-zinc-500 font-bold uppercase">Pitch Insight For:</span>
              <div className="flex gap-2">
                {['investor', 'importer', 'exporter'].map((role) => (
                  <button
                    key={role}
                    onClick={() => setDemoRole(role as any)}
                    className={`px-2.5 py-0.5 rounded text-[9px] font-bold uppercase transition-all cursor-pointer ${
                      demoRole === role 
                        ? 'bg-zinc-800 text-white border border-white/10' 
                        : 'text-zinc-500 hover:text-zinc-400 border border-transparent'
                    }`}
                  >
                    {role}s
                  </button>
                ))}
              </div>
            </div>
            
            {/* Pitch bullet points */}
            <div className="min-h-[85px] font-sans text-xs text-zinc-300 leading-relaxed space-y-1">
              <div className="font-mono text-[10px] font-bold text-orange-400 uppercase tracking-wide mb-1">
                {demoRole === 'investor' && '📈 Venture Thesis'}
                {demoRole === 'importer' && '🚢 Buyer Protection'}
                {demoRole === 'exporter' && '🌾 Exporter Payout'}
              </div>
              <p className="text-[11px] text-zinc-300">
                {demoRole === 'investor' && PITCH_CONTENT[demoScene as 1 | 2 | 3 | 4 | 5 | 6].investor}
                {demoRole === 'importer' && PITCH_CONTENT[demoScene as 1 | 2 | 3 | 4 | 5 | 6].importer}
                {demoRole === 'exporter' && PITCH_CONTENT[demoScene as 1 | 2 | 3 | 4 | 5 | 6].exporter}
              </p>
            </div>
          </div>
          
          {/* Narrative commentary */}
          <div className="md:col-span-4 bg-white/[0.02] border border-white/[0.06] rounded-xl p-3 flex flex-col justify-between gap-3">
            <div>
              <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-wider block">{PITCH_CONTENT[demoScene as 1 | 2 | 3 | 4 | 5 | 6].title}</span>
              <p className="text-[10px] text-zinc-400 mt-1 leading-snug font-sans">
                {PITCH_CONTENT[demoScene as 1 | 2 | 3 | 4 | 5 | 6].desc}
              </p>
            </div>
            <div className="flex justify-between items-center text-[9px] border-t border-white/[0.04] pt-2 text-zinc-600 font-mono">
              <span>Trade lane: India &rarr; UAE</span>
              <span>Sourcing: 20 MT Basmati</span>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-white/[0.06] bg-[#050507] py-8 text-zinc-500 mt-auto text-center text-xs font-mono">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-white text-black font-extrabold flex items-center justify-center text-[10px]">BX</div>
            <span className="font-extrabold text-[10px] text-white">BHARATX GLOBAL TRUST</span>
          </div>
          <span>Bilateral Sourcing Protocol &bull; &copy; 2026 BharatX Inc.</span>
        </div>
      </footer>

    </div>
  );
}
