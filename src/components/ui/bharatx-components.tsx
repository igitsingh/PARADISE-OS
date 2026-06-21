'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Shield, Star, Clock, MapPin, Package, ShieldCheck,
  ChevronRight, Calendar, User, Settings, ArrowUpRight, TrendingUp,
  TrendingDown, FileText, Bell, CreditCard, Sparkles, Plus, AlertCircle,
  LayoutDashboard, Building, Ship, Anchor, Users, Check
} from 'lucide-react';

// ==========================================
// 1. BUTTONS (Apple / Jony Ive style)
// ==========================================
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export function BButton({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyle = "inline-flex items-center justify-center gap-2 font-semibold transition-all cursor-pointer user-select-none";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FF5E00] to-[#FF8C00] hover:from-[#E05300] hover:to-[#E07B00] text-white border border-[#FFA500]/30 active:scale-98 shadow-[0_4px_16px_rgba(255,94,0,0.25)] hover:shadow-[0_4px_24px_rgba(255,94,0,0.45)] transition-all",
    secondary: "bg-white/[0.04] text-white hover:bg-white/[0.08] border border-white/[0.08] active:scale-98 backdrop-blur-md hover:border-white/20 transition-all",
    ghost: "bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.04] active:scale-98 transition-all",
    danger: "bg-gradient-to-r from-rose-600 to-red-500 text-white hover:from-rose-500 hover:to-red-400 active:scale-98 shadow-[0_4px_12px_rgba(239,68,68,0.25)] transition-all",
  };

  const sizes = {
    sm: "h-8 px-4 text-[10px] rounded-full",
    md: "h-10 px-5 text-xs rounded-full",
    lg: "h-12 px-6 text-sm rounded-full",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.015, y: -0.5 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}

// ==========================================
// 2. SEARCH COMPONENTS (Airbnb Style)
// ==========================================
export function BSearchBar({ onSearch }: { onSearch?: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const SUGGESTIONS = ['Organic Basmati Rice 1121', 'Turmeric Fingers', 'Generic Paracetamol APIs', 'Cotton Fabric Grey'];

  return (
    <div className="relative w-full max-w-lg z-30">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
        <input
          id="ds-search"
          type="text"
          value={query}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products, verified exporters, HS codes..."
          className="input pl-11 pr-24 h-11 text-xs w-full bg-white/[0.02] border-white/[0.06] rounded-md focus:border-brand-primary"
        />
        <BButton
          variant="primary"
          size="sm"
          className="absolute right-1.5 top-1.5 h-8 text-[10px]"
          onClick={() => onSearch?.(query)}
        >
          Explore
        </BButton>
      </div>

      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 w-full mt-2 p-4 bg-zinc-950/95 border border-white/[0.08] rounded-lg shadow-2xl backdrop-blur-md"
          >
            <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider block mb-2">Suggested Commodities</span>
            <div className="space-y-1">
              {SUGGESTIONS.map((tag) => (
                <div
                  key={tag}
                  onClick={() => { setQuery(tag); onSearch?.(tag); }}
                  className="flex items-center justify-between py-2 px-3 rounded hover:bg-white/5 cursor-pointer transition-colors text-xs text-zinc-300 hover:text-white"
                >
                  <span>{tag}</span>
                  <ArrowUpRight size={12} className="text-zinc-600" />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ==========================================
// 3. TRUST SCORE RING
// ==========================================
export function BTrustScoreRing({ score }: { score: number }) {
  const r = 50;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 1000) * circ;
  
  // Tiers logic
  const getTier = (s: number) => {
    if (s >= 900) return { label: 'PLATINUM', color: '#FF3300', style: 'trust-badge-platinum' };
    if (s >= 800) return { label: 'ELITE', color: '#FF7F00', style: 'trust-badge-elite' };
    return { label: 'TRUSTED', color: '#EAB308', style: 'trust-badge-trusted' };
  };
  
  const tier = getTier(score);

  return (
    <div className="flex flex-col items-center gap-3 p-4 bg-white/[0.01] border border-white/[0.05] rounded-2xl max-w-44 text-center backdrop-blur-md">
      <div className="relative inline-flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="rotate-[-90deg]">
          <defs>
            <filter id={`ring-glow-${score}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          <circle cx="60" cy="60" r={r} stroke="rgba(255,255,255,0.04)" strokeWidth="6" fill="none" />
          <motion.circle
            cx="60" cy="60" r={r}
            stroke={tier.color}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circ}
            filter={`url(#ring-glow-${score})`}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="text-2xl font-bold text-white font-mono">{score}</span>
          <span className="text-[10px] text-zinc-500 font-medium">/ 1000</span>
        </div>
      </div>
      <span className={tier.style}>{tier.label}</span>
    </div>
  );
}

// ==========================================
// 4. NETWORK ENTITY CARDS (Premium Glassmorphism)
// ==========================================
export function BSupplierCard({ 
  supplier, 
  onViewProfile, 
  onQuote 
}: { 
  supplier: any; 
  onViewProfile?: () => void; 
  onQuote?: () => void; 
}) {
  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card card-border-glow p-5 flex flex-col gap-4 min-w-[280px]"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-xl bg-zinc-900 border border-white/[0.04] shrink-0">
            {supplier.logo || '🌾'}
          </div>
          <div>
            <h4 className="font-semibold text-xs text-white leading-tight truncate max-w-[150px]">{supplier.name}</h4>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
              <MapPin size={10} /> {supplier.city}, {supplier.state || 'India'}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 tracking-wider font-mono uppercase">
          {supplier.trustScore}
        </span>
      </div>

      <div className="flex flex-wrap gap-1">
        {(supplier.productCategories || []).map((c: string) => (
          <span key={c} className="text-[9px] px-2 py-0.5 rounded border border-white/[0.05] bg-white/[0.02] text-zinc-400 font-semibold uppercase tracking-wider font-mono">
            {c}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 text-center text-[10px] py-2 border-t border-white/[0.04] text-zinc-500 font-normal">
        <div>
          <span>Min Order</span>
          <strong className="text-white block mt-0.5 font-semibold font-mono">{supplier.moq || '10 MT'}</strong>
        </div>
        <div>
          <span>Rating</span>
          <div className="flex items-center justify-center gap-0.5 mt-0.5 font-semibold text-white">
            <Star size={10} className="text-yellow-400 fill-yellow-400" /> {supplier.rating || '4.8'}
          </div>
        </div>
        <div>
          <span>Response</span>
          <strong className="text-white block mt-0.5 font-semibold">{supplier.responseTime || '15 min'}</strong>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <BButton variant="secondary" size="sm" className="flex-1 text-[10px]" onClick={onViewProfile}>
          Profile
        </BButton>
        <BButton variant="primary" size="sm" className="flex-1 text-[10px]" onClick={onQuote}>
          Quote
        </BButton>
      </div>
    </motion.div>
  );
}

export function BImporterCard({ 
  importer, 
  onViewProfile, 
  onConnect 
}: { 
  importer: any; 
  onViewProfile?: () => void; 
  onConnect?: () => void; 
}) {
  const [connected, setConnected] = useState(false);
  
  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card card-border-glow p-5 flex flex-col gap-4 min-w-[280px]"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-xl bg-zinc-900 border border-white/[0.04] shrink-0">
            {importer.logo || '🏢'}
          </div>
          <div>
            <h4 className="font-semibold text-xs text-white leading-tight truncate max-w-[150px]">{importer.name}</h4>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
              <MapPin size={10} /> {importer.city}, {importer.country}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 tracking-wider font-mono uppercase">
          {importer.creditRating || 'AA'}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Active Demands</span>
        <div className="flex flex-wrap gap-1">
          {(importer.activeDemands || []).slice(0, 2).map((d: string) => (
            <span key={d} className="text-[9px] px-2 py-0.5 rounded border border-emerald-500/10 bg-emerald-500/5 text-emerald-400 font-medium font-sans">
              {d}
            </span>
          ))}
          {(importer.activeDemands || []).length > 2 && (
            <span className="text-[9px] px-1.5 py-0.5 rounded border border-white/[0.05] bg-white/[0.02] text-zinc-500">
              +{importer.activeDemands.length - 2} more
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-[10px] py-2 border-t border-white/[0.04] text-zinc-500 font-normal">
        <div className="text-left">
          <span>Preferred Port</span>
          <strong className="text-white block mt-0.5 font-semibold truncate">{importer.preferredPorts?.[0] || 'Any Hub'}</strong>
        </div>
        <div className="text-right">
          <span>Annual Vol</span>
          <strong className="text-emerald-400 block mt-0.5 font-semibold font-mono">{importer.annualSourcingVolume || '$10M+'}</strong>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <BButton variant="secondary" size="sm" className="flex-1 text-[10px]" onClick={onViewProfile}>
          Dossier
        </BButton>
        <BButton 
          variant={connected ? 'ghost' : 'primary'} 
          size="sm" 
          className="flex-1 text-[10px]" 
          onClick={() => {
            setConnected(!connected);
            onConnect?.();
          }}
        >
          {connected ? 'Connected' : 'Connect'}
        </BButton>
      </div>
    </motion.div>
  );
}

export function BDistributorCard({ 
  distributor, 
  onViewProfile, 
  onInquire 
}: { 
  distributor: any; 
  onViewProfile?: () => void; 
  onInquire?: () => void; 
}) {
  const [inquired, setInquired] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card card-border-glow p-5 flex flex-col gap-4 min-w-[280px]"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-xl bg-zinc-900 border border-white/[0.04] shrink-0">
            {distributor.logo || '🚚'}
          </div>
          <div>
            <h4 className="font-semibold text-xs text-white leading-tight truncate max-w-[150px]">{distributor.name}</h4>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
              <Ship size={10} /> {distributor.city}, {distributor.country}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-bold text-orange-400 px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 tracking-wider font-mono uppercase">
          {distributor.trustScore || '950'}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Freight Lanes</span>
        <div className="text-[10px] text-zinc-300 font-medium truncate flex items-center gap-1">
          <Anchor size={9} className="text-zinc-500" />
          {distributor.shippingLanes?.[0] || 'Global freight corridors'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-[10px] py-2 border-t border-white/[0.04] text-zinc-500 font-normal">
        <div className="text-left">
          <span>Capacity</span>
          <strong className="text-white block mt-0.5 font-semibold truncate">{distributor.capacity?.split(' ')[0] || '10k+'} sq ft</strong>
        </div>
        <div className="text-right">
          <span>Customs Clear</span>
          <strong className="text-orange-400 block mt-0.5 font-semibold font-mono">{distributor.customsClearanceRate || '99.5%'}</strong>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <BButton variant="secondary" size="sm" className="flex-1 text-[10px]" onClick={onViewProfile}>
          Network Hub
        </BButton>
        <BButton 
          variant={inquired ? 'ghost' : 'primary'} 
          size="sm" 
          className="flex-1 text-[10px]" 
          onClick={() => {
            setInquired(true);
            onInquire?.();
          }}
        >
          {inquired ? 'Pending Quote' : 'Inquire freight'}
        </BButton>
      </div>
    </motion.div>
  );
}

export function BProcurementCard({ 
  procurement, 
  onViewProfile, 
  onPitch 
}: { 
  procurement: any; 
  onViewProfile?: () => void; 
  onPitch?: () => void; 
}) {
  const [pitched, setPitched] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="card card-border-glow p-5 flex flex-col gap-4 min-w-[280px]"
    >
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <div className="h-10 w-10 rounded-lg flex items-center justify-center text-xl bg-zinc-900 border border-white/[0.04] shrink-0">
            {procurement.logo || '🤝'}
          </div>
          <div>
            <h4 className="font-semibold text-xs text-white leading-tight truncate max-w-[150px]">{procurement.name}</h4>
            <span className="text-[10px] text-zinc-500 flex items-center gap-1 mt-1">
              <Users size={10} /> {procurement.city}, {procurement.country}
            </span>
          </div>
        </div>
        <span className="text-[9px] font-bold text-amber-400 px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/20 tracking-wider font-mono uppercase">
          {procurement.type || 'Buying House'}
        </span>
      </div>

      <div className="space-y-1">
        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider font-mono">Sourcing Mandate</span>
        <p className="text-[10px] text-zinc-400 font-normal leading-tight line-clamp-2 min-h-[30px] font-sans">
          {procurement.sourcingMandate || 'Sourcing raw goods and materials for global commercial pipelines.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 text-center text-[10px] py-2 border-t border-white/[0.04] text-zinc-500 font-normal">
        <div className="text-left">
          <span>Active Requirements</span>
          <strong className="text-white block mt-0.5 font-semibold truncate">{procurement.activeMandates?.[0] || 'General items'}</strong>
        </div>
        <div className="text-right">
          <span>Managed Spend</span>
          <strong className="text-amber-400 block mt-0.5 font-semibold font-mono">{procurement.annualSpend || '$50M+'}</strong>
        </div>
      </div>

      <div className="flex gap-2 pt-1">
        <BButton variant="secondary" size="sm" className="flex-1 text-[10px]" onClick={onViewProfile}>
          Mandates
        </BButton>
        <BButton 
          variant={pitched ? 'ghost' : 'primary'} 
          size="sm" 
          className="flex-1 text-[10px]" 
          onClick={() => {
            setPitched(true);
            onPitch?.();
          }}
        >
          {pitched ? 'Pitched' : 'Pitch supplier'}
        </BButton>
      </div>
    </motion.div>
  );
}

// ==========================================
// 5. NAVIGATION SIDEBAR
// ==========================================
export function BNavigationSidebar({
  collapsed,
  onToggle,
  activeItem = 'Dashboard'
}: {
  collapsed: boolean;
  onToggle: () => void;
  activeItem?: string;
}) {
  return (
    <aside
      className="h-[500px] flex flex-col border border-white/[0.06] transition-all duration-300 shrink-0 select-none rounded-xl"
      style={{
        width: collapsed ? '68px' : '220px',
        background: '#09090B',
      }}
    >
      {/* Brand Header */}
      <div className="flex items-center h-14 px-4 border-b border-white/[0.05] shrink-0 justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="h-6 w-6 rounded-md flex items-center justify-center font-bold text-black text-xs shrink-0 bg-white">
            BX
          </div>
          {!collapsed && (
            <span className="font-semibold text-xs text-white tracking-tight truncate">BharatX v1</span>
          )}
        </div>
        <button onClick={onToggle} className="text-zinc-500 hover:text-white transition-colors shrink-0">
          <ChevronRight size={14} className={`transform transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </div>

      {/* Nav list */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {[
          { icon: LayoutDashboard, label: 'Dashboard' },
          { icon: Search, label: 'Suppliers' },
          { icon: FileText, label: 'Quotes', badge: '3' },
          { icon: CreditCard, label: 'Payments' }
        ].map((item) => {
          const Icon = item.icon;
          const isActive = item.label === activeItem;
          return (
            <div
              key={item.label}
              className={`nav-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`}
            >
              <Icon size={14} className="shrink-0" />
              {!collapsed && <span className="flex-1 text-xs">{item.label}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto h-4 w-4 rounded bg-zinc-800 border border-white/[0.08] text-[8px] font-mono text-zinc-400 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

// ==========================================
// 6. DASHBOARD COMPONENTS
// ==========================================
export function BMetricCard({
  label,
  value,
  change,
  isUp = true,
  desc
}: {
  label: string;
  value: string;
  change: string;
  isUp?: boolean;
  desc?: string;
}) {
  return (
    <div className="metric-card">
      <div className="flex items-start justify-between">
        <span className="text-[9px] uppercase font-bold text-zinc-500 tracking-wider">{label}</span>
        <span className={`metric-change ${isUp ? 'metric-change-up' : 'metric-change-down'}`}>
          {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {change}
        </span>
      </div>
      <div>
        <div className="metric-value">{value}</div>
        {desc && <span className="text-[10px] text-zinc-500 block mt-1">{desc}</span>}
      </div>
    </div>
  );
}

export function BEscrowTracker({
  stage,
  amount,
  percent,
  status
}: {
  stage: string;
  amount: string;
  percent: number;
  status: string;
}) {
  return (
    <div className="card p-5 space-y-4 max-w-sm">
      <div className="flex justify-between items-center pb-3 border-b border-white/[0.05]">
        <div className="flex gap-2 items-center">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span className="text-xs font-semibold text-zinc-300">{stage}</span>
        </div>
        <span className="text-[9px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 uppercase">
          {status}
        </span>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs">
          <span className="text-zinc-500">Staged Escrow Balance</span>
          <strong className="text-white font-mono">{amount}</strong>
        </div>
        <div className="flex justify-between text-[10px] text-zinc-500">
          <span>Escrow Compliance Audit</span>
          <span>{percent}% cleared</span>
        </div>
        <div className="w-full h-1 bg-zinc-900 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 7. PARTNER IMAGES HELPER & PARTNER CARD
// ==========================================

export function getPartnerImage(partner: any) {
  const categories = partner.productCategories || [];
  const role = partner.role;
  
  if (categories.includes('Rice')) {
    return 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80'; // Green rice field
  }
  if (categories.includes('Spices')) {
    return 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80'; // Colorful spices market
  }
  if (categories.includes('Tea') || categories.includes('Coffee')) {
    return 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=600&q=80'; // Tea plantation
  }
  if (categories.includes('Textiles')) {
    return 'https://images.unsplash.com/photo-1524295988346-04879017f753?auto=format&fit=crop&w=600&q=80'; // Fabric roll textile texture
  }
  if (categories.includes('Pharmaceuticals') || categories.includes('Chemicals')) {
    return 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80'; // Science laboratory capsule
  }
  if (role === 'Distributor') {
    return 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=600&q=80'; // Port container vessel
  }
  if (role === 'Procurement') {
    return 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80'; // Corporate office board room
  }
  return 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80'; // Containers cargo
}

export function BPartnerDiscoveryCard({
  partner,
  onViewProfile,
  onAction
}: {
  partner: any;
  onViewProfile?: () => void;
  onAction?: () => void;
}) {
  const imageUrl = getPartnerImage(partner);
  
  // Custom button label based on role
  const getActionLabel = () => {
    if (partner.role === 'Exporter') return 'Request Quote';
    if (partner.role === 'Importer') return 'Connect';
    if (partner.role === 'Distributor') return 'Inquire Freight';
    if (partner.role === 'Procurement') return 'Pitch Mandate';
    return 'Connect';
  };

  // Custom subtitle descriptive info
  const getSubInfo = () => {
    if (partner.role === 'Exporter') {
      return `MOQ: ${partner.moq || '10 MT'}`;
    }
    if (partner.role === 'Importer') {
      return `Annual Sourcing: ${partner.annualSourcingVolume || '$10M+'}`;
    }
    if (partner.role === 'Distributor') {
      return `Clearance: ${partner.customsClearanceRate || '99%'}`;
    }
    if (partner.role === 'Procurement') {
      return `Spend Managed: ${partner.annualSpend || '$50M+'}`;
    }
    return '';
  };

  // Convert trustScore to a 5-star rating scale for display, or use rating directly
  const displayRating = partner.rating || (partner.trustScore ? (partner.trustScore / 200).toFixed(1) : '4.8');

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015, transition: { duration: 0.25, ease: 'easeOut' } }}
      className="bg-[#0A0A0C] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full group"
    >
      {/* Cover Image Header */}
      <div className="relative h-44 w-full overflow-hidden shrink-0">
        <img
          src={imageUrl}
          alt={partner.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Dark overlay gradient inside the image */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/40 to-transparent" />
        
        {/* Verified overlay badge (Top Right) - Glassmorphism pill shape */}
        <div className="absolute top-4 right-4 bg-zinc-950/60 backdrop-blur-md border border-white/10 text-white rounded-full px-2.5 py-0.5 text-[9px] font-semibold flex items-center gap-1">
          <ShieldCheck size={11} className="text-emerald-400" />
          <span>VERIFIED</span>
        </div>
        
        {/* Category floating pill (Top Left) */}
        <div className="absolute top-4 left-4 bg-orange-600/80 backdrop-blur-sm text-white rounded-md px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider font-mono">
          {partner.role}
        </div>

        {/* Emoji Logo Floating Circle */}
        <div className="absolute bottom-3 left-4 h-9 w-9 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-xl shadow-lg z-10">
          {partner.logo || '🏢'}
        </div>
      </div>

      {/* Card Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          {/* Title line */}
          <div className="flex justify-between items-start gap-2">
            <h4 className="font-extrabold text-sm text-white leading-snug truncate group-hover:text-orange-400 transition-colors" title={partner.name}>
              {partner.name}
            </h4>
            <div className="flex items-center gap-0.5 text-yellow-400 font-bold font-mono text-[10px] shrink-0">
              <Star size={11} className="fill-yellow-400 text-yellow-400" />
              <span>{displayRating}</span>
            </div>
          </div>

          {/* Subtitle / Location */}
          <div className="text-[10px] text-zinc-500 font-mono font-medium flex items-center gap-1 uppercase tracking-wider">
            <MapPin size={9} className="text-zinc-600" />
            <span>{partner.city}, {partner.country || 'India'}</span>
          </div>

          {/* Descriptive capabilities / tag values */}
          <p className="text-[11px] text-zinc-400 font-sans leading-normal line-clamp-2 min-h-[33px]">
            {partner.aiSummary || partner.sourcingMandate || `${partner.name} is an active, verified network participant in the global bilateral trade pipeline.`}
          </p>

          {/* Specifications row (MOQ, markets etc.) */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.04] text-[9px] font-mono text-zinc-500">
            {getSubInfo() && (
              <span className="px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.06] text-white">
                {getSubInfo()}
              </span>
            )}
            {partner.trustScore && (
              <span className="px-2 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400 font-semibold">
                TRUST: {partner.trustScore}
              </span>
            )}
          </div>
        </div>

        {/* Buttons Action Area (TutorMate style rounded-full) */}
        <div className="flex gap-2 mt-4 pt-3 border-t border-white/[0.04]">
          <BButton
            variant="secondary"
            size="sm"
            className="flex-1 text-[9px] uppercase font-bold rounded-full h-8 cursor-pointer"
            onClick={onViewProfile}
          >
            Dossier
          </BButton>
          <BButton
            variant="primary"
            size="sm"
            className="flex-1 text-[9px] uppercase font-bold rounded-full h-8 cursor-pointer"
            onClick={onAction}
          >
            {getActionLabel()}
          </BButton>
        </div>
      </div>
    </motion.div>
  );
}
