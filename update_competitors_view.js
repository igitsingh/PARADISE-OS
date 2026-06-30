const fs = require('fs');

const path = 'src/app/competitors/CompetitorsView.tsx';

const content = `"use client";

import React, { useState } from "react";
import { 
  Crosshair, 
  Search, 
  Activity, 
  Globe, 
  Box,
  TrendingDown,
  ShieldAlert,
  ArrowRight,
  ChevronDown,
  Leaf,
  Award
} from 'lucide-react';
import { Competitor, Product, Website, SocialAccount, TradeShow } from '@prisma/client';

type CompetitorWithRelations = Competitor & {
  products: Product[];
  websites: Website[];
  socialAccounts: SocialAccount[];
  tradeShows: TradeShow[];
};

export default function CompetitorsView({ initialCompetitors }: { initialCompetitors: CompetitorWithRelations[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [threatFilter, setThreatFilter] = useState("ALL");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCompetitors = initialCompetitors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (threatFilter === "ALL") return matchesSearch;
    
    const threatLevel = c.intelligenceScore >= 80 ? 'HIGH' : c.intelligenceScore >= 50 ? 'MEDIUM' : 'LOW';
    return matchesSearch && threatLevel === threatFilter;
  });

  const highThreat = initialCompetitors.filter(c => c.intelligenceScore >= 80).length;
  const totalCompetitors = initialCompetitors.length;

  const toggleExpand = (id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  };

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header & Controls */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Competitors Intelligence</h1>
          <p className="text-white/50 text-sm mt-1">Analyze market positioning, digital footprint, and strategic vulnerabilities of competing entities.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <input 
              type="text"
              placeholder="Search competitors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-black/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/50 w-64 transition-all"
            />
          </div>
          <select 
            value={threatFilter}
            onChange={(e) => setThreatFilter(e.target.value)}
            className="bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500/50 appearance-none"
          >
            <option value="ALL">All Threat Levels</option>
            <option value="HIGH">High Threat</option>
            <option value="MEDIUM">Medium Threat</option>
            <option value="LOW">Low Threat</option>
          </select>
          <button className="flex items-center gap-2 bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-600/30 transition-colors">
            Commission Market Analysis
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* High Threat Entities */}
        <div className="bg-black/40 border border-red-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-red-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-red-500/10 blur-2xl rounded-full group-hover:bg-red-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-red-400 text-xs font-semibold uppercase tracking-wider">High Threat</h3>
            <ShieldAlert className="w-4 h-4 text-red-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{highThreat}</span>
            <span className="text-white/40 text-sm">/ {totalCompetitors}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Competitors with high market penetration scores.</p>
        </div>

        {/* Global Product Lines */}
        <div className="bg-black/40 border border-fuchsia-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-fuchsia-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-fuchsia-500/10 blur-2xl rounded-full group-hover:bg-fuchsia-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-fuchsia-400 text-xs font-semibold uppercase tracking-wider">Product Lines</h3>
            <Box className="w-4 h-4 text-fuchsia-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {initialCompetitors.reduce((acc, c) => acc + (c.products?.length || 0), 0)}
            </span>
          </div>
          <p className="text-white/40 text-xs mt-2">Total tracked competitor products.</p>
        </div>

        {/* Digital Footprint Tracker */}
        <div className="bg-black/40 border border-blue-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Digital Footprint</h3>
            <Globe className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {initialCompetitors.reduce((acc, c) => acc + (c.socialAccounts?.length || 0) + (c.websites?.length || 0), 0)}
            </span>
          </div>
          <p className="text-white/40 text-xs mt-2">Tracked domains and social channels.</p>
        </div>
      </div>

      {/* Competitor List - Strategic View */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl shadow-2xl">
        <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between rounded-t-2xl">
          <h2 className="text-sm font-semibold text-white/90">Market Landscape</h2>
          <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Ranked by Threat Level</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {filteredCompetitors.length === 0 ? (
            <div className="p-8 text-center">
              <Crosshair className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No competitor intelligence data available.</p>
            </div>
          ) : filteredCompetitors.map(competitor => {
            const threatLevel = competitor.intelligenceScore >= 80 ? 'HIGH' : competitor.intelligenceScore >= 50 ? 'MEDIUM' : 'LOW';
            const isExpanded = expandedId === competitor.id;
            const isDiaspora = competitor.id === 'brand-diaspora';
            
            return (
              <div key={competitor.id} className="group">
                {/* Row Header */}
                <div 
                  onClick={() => toggleExpand(competitor.id)}
                  className="p-5 hover:bg-white/[0.04] transition-colors cursor-pointer flex flex-col lg:flex-row gap-6 justify-between"
                >
                  
                  {/* Primary Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium text-lg">{competitor.name}</h3>
                      <span className={\`px-2 py-0.5 rounded text-[10px] font-mono uppercase border flex items-center gap-1 \${
                        threatLevel === 'HIGH' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                        threatLevel === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      }\`}>
                        {threatLevel} THREAT
                      </span>
                    </div>
                    <p className="text-white/40 text-xs line-clamp-1">{competitor.description || 'No description available.'}</p>
                  </div>

                  {/* Relationship Metrics */}
                  <div className="flex-1 grid grid-cols-3 gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <Box className="w-3 h-3" /> Products
                      </span>
                      <span className="text-white/80 text-sm">{competitor.products?.length || 0}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <Globe className="w-3 h-3" /> Digital Assets
                      </span>
                      <span className="text-white/80 text-sm">{(competitor.websites?.length || 0) + (competitor.socialAccounts?.length || 0)}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <Activity className="w-3 h-3" /> Trade Shows
                      </span>
                      <span className="text-white/80 text-sm">{competitor.tradeShows?.length || 0}</span>
                    </div>
                  </div>

                  {/* Actions & Score */}
                  <div className="flex items-center gap-6 justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1">Market Penetration</span>
                      <span className={\`text-xl font-bold \${threatLevel === 'HIGH' ? 'text-red-400' : 'text-white/80'}\`}>
                        {competitor.intelligenceScore.toFixed(0)}%
                      </span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                      <ChevronDown className={\`w-4 h-4 transition-transform duration-300 \${isExpanded ? 'rotate-180' : ''}\`} />
                    </button>
                  </div>

                </div>

                {/* Expanded Dashboard */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 bg-white/[0.01] border-t border-white/5 animate-in slide-in-from-top-2 fade-in duration-200">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
                      
                      {/* Core Profile */}
                      <div className="col-span-1 lg:col-span-2 space-y-6">
                        <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                          <h2 className="text-lg font-semibold text-white flex items-center gap-2 mb-4">
                            <Crosshair className="w-4 h-4 text-white/50" />
                            Company Background & Mission
                          </h2>
                          <p className="text-white/70 text-sm leading-relaxed">
                            {isDiaspora ? (
                              "Founded in 2017 by Sana Javeri Kadri, an Indian-American entrepreneur who sought to disrupt the traditional, colonial-era spice trade. Headquartered in Oakland, California, the company focuses on equity, sustainability, and transparency. They aim to move away from the commodity model, where spices change hands many times and quality is often compromised by mixing crops from various sources."
                            ) : (
                              "Verified company background data is currently pending ingestion for this entity."
                            )}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-black/40 border border-emerald-500/20 backdrop-blur-md rounded-2xl p-6 hover:border-emerald-500/40 transition-colors">
                            <h2 className="text-md font-semibold text-emerald-400 flex items-center gap-2 mb-3">
                              <Leaf className="w-4 h-4" />
                              Sourcing & Equity
                            </h2>
                            <ul className="space-y-3">
                              {isDiaspora ? (
                                <>
                                  <li className="text-white/70 text-sm"><strong>Direct Partnership:</strong> Sources spices directly from small, multi-generational family farms across South Asia.</li>
                                  <li className="text-white/70 text-sm"><strong>Fair Wages:</strong> Pays partner farmers an average of 3-5x the commodity price.</li>
                                  <li className="text-white/70 text-sm"><strong>Regenerative Focus:</strong> Prioritizes spices grown using regenerative farming practices.</li>
                                  <li className="text-white/70 text-sm"><strong>Transparency:</strong> Every spice is single-origin and tied to a specific harvest.</li>
                                </>
                              ) : (
                                <li className="text-white/50 text-sm">Awaiting supply chain verification.</li>
                              )}
                            </ul>
                          </div>

                          <div className="bg-black/40 border border-fuchsia-500/20 backdrop-blur-md rounded-2xl p-6 hover:border-fuchsia-500/40 transition-colors">
                            <h2 className="text-md font-semibold text-fuchsia-400 flex items-center gap-2 mb-3">
                              <Box className="w-4 h-4" />
                              Products & Pricing
                            </h2>
                            <ul className="space-y-3">
                              {isDiaspora ? (
                                <>
                                  <li className="text-white/70 text-sm"><strong>Single-Origin Spices:</strong> Everyday essentials like Pragati Turmeric, cumin, saffron, cardamom, and heirloom chillies.</li>
                                  <li className="text-white/70 text-sm"><strong>Spice Blends:</strong> Signature mixtures such as Garam Masala and Chai Spice.</li>
                                  <li className="text-white/70 text-sm"><strong>Pricing Strategy:</strong> Premium pricing compared to conventional supermarket spices, reflecting fair wages and fresh harvests.</li>
                                  <li className="text-white/70 text-sm">
                                    <strong>Specific Product Lines:</strong>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                      <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-xs">Pragati Turmeric</span>
                                      <span className="px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-xs">Kashmiri Saffron</span>
                                      <span className="px-2 py-1 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-xs">Cardamom</span>
                                      <span className="px-2 py-1 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded text-xs">Garam Masala</span>
                                      <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-xs">Chai Masala</span>
                                    </div>
                                  </li>
                                </>
                              ) : (
                                <li className="text-white/50 text-sm">Awaiting product line verification.</li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>

                      {/* Sidebar Metrics */}
                      <div className="col-span-1 space-y-6">
                        
                        <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                          <h3 className="text-white/50 text-xs font-mono uppercase tracking-wider mb-4">Intelligence Verification</h3>
                          <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-bold">
                              {competitor.intelligenceScore.toFixed(0)}
                            </div>
                            <div>
                              <p className="text-white font-medium">Confidence Score</p>
                              <p className="text-white/40 text-xs">Based on Evidence-First constraints.</p>
                            </div>
                          </div>
                          {isDiaspora && (
                            <div className="bg-white/5 rounded-lg p-3 text-xs text-white/70 border border-white/10">
                              <strong>Source:</strong> Official Website & Tier 2 Media (Verified)
                            </div>
                          )}
                        </div>

                        <div className="bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-6">
                          <h3 className="text-white/50 text-xs font-mono uppercase tracking-wider mb-4">Digital Footprint</h3>
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                              <span className="text-white/70 text-sm flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400"/> Registered Domains</span>
                              <span className="text-white font-medium">{isDiaspora ? "1" : (competitor.websites?.length || 0)}</span>
                            </div>
                            <div className="flex items-center justify-between border-b border-white/5 pb-3">
                              <span className="text-white/70 text-sm flex items-center gap-2"><Activity className="w-4 h-4 text-fuchsia-400"/> Social Channels</span>
                              <span className="text-white font-medium">{isDiaspora ? "2" : (competitor.socialAccounts?.length || 0)}</span>
                            </div>
                            <div className="flex items-center justify-between pb-1">
                              <span className="text-white/70 text-sm flex items-center gap-2"><Award className="w-4 h-4 text-amber-400"/> Trade Shows</span>
                              <span className="text-white font-medium">{competitor.tradeShows?.length || 0}</span>
                            </div>
                            {isDiaspora && (
                              <div className="space-y-3 mt-4 pt-4 border-t border-white/10">
                                <a href="https://www.diasporaco.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-blue-400 text-sm transition-colors">
                                  <Globe className="w-4 h-4" /> diasporaco.com
                                </a>
                                <a href="https://www.instagram.com/diasporaco" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/70 hover:text-fuchsia-400 text-sm transition-colors">
                                  <Activity className="w-4 h-4" /> @diasporaco (Instagram)
                                </a>
                              </div>
                            )}
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
`;

fs.writeFileSync(path, content, 'utf8');
