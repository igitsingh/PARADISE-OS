const fs = require('fs');

const path = 'src/app/competitors/CompetitorsView.tsx';

const content = `"use client";

import React, { useState } from "react";
import { 
  Crosshair, 
  Search, 
  Globe, 
  Activity,
  ShieldAlert,
  Box
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

  const filteredCompetitors = initialCompetitors.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (c.description && c.description.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (threatFilter === "ALL") return matchesSearch;
    
    const threatLevel = c.intelligenceScore >= 80 ? 'HIGH' : c.intelligenceScore >= 50 ? 'MEDIUM' : 'LOW';
    return matchesSearch && threatLevel === threatFilter;
  });

  const highThreat = initialCompetitors.filter(c => c.intelligenceScore >= 80).length;
  const totalCompetitors = initialCompetitors.length;

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

      {/* Apollo-Style Data Table */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl shadow-2xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider w-[25%]">Company</th>
              <th className="px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider w-[15%]">Threat Level</th>
              <th className="px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider w-[25%]">Products</th>
              <th className="px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider w-[20%]">Digital Footprint</th>
              <th className="px-5 py-3 text-xs font-semibold text-white/50 uppercase tracking-wider w-[15%] text-right">Penetration</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCompetitors.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center">
                  <Crosshair className="w-8 h-8 text-white/20 mx-auto mb-3" />
                  <p className="text-white/60 text-sm">No competitor intelligence data available.</p>
                </td>
              </tr>
            ) : filteredCompetitors.map(competitor => {
              const threatLevel = competitor.intelligenceScore >= 80 ? 'HIGH' : competitor.intelligenceScore >= 50 ? 'MEDIUM' : 'LOW';
              const isDiaspora = competitor.id === 'brand-diaspora';
              
              return (
                <tr key={competitor.id} className="hover:bg-white/[0.02] transition-colors group">
                  
                  {/* Company Column */}
                  <td className="px-5 py-4 align-top">
                    <div className="font-medium text-white mb-1">{competitor.name}</div>
                    <div className="text-white/40 text-xs leading-relaxed line-clamp-2">
                      {isDiaspora ? "Founded in 2017 to disrupt colonial spice trade via single-origin, direct, regenerative sourcing." : (competitor.description || 'No description available.')}
                    </div>
                  </td>

                  {/* Threat Level Column */}
                  <td className="px-5 py-4 align-top">
                    <span className={\`px-2 py-0.5 rounded text-[10px] font-mono uppercase border inline-flex items-center gap-1 \${
                      threatLevel === 'HIGH' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      threatLevel === 'MEDIUM' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 
                      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }\`}>
                      {threatLevel}
                    </span>
                  </td>

                  {/* Products Column */}
                  <td className="px-5 py-4 align-top">
                    <div className="text-white/70 text-sm mb-2 font-mono">Count: {isDiaspora ? '5+' : (competitor.products?.length || 0)}</div>
                    {isDiaspora && (
                      <div className="flex flex-wrap gap-1.5">
                        <span className="px-1.5 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded text-[10px] font-medium">Pragati Turmeric</span>
                        <span className="px-1.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-medium">Kashmiri Saffron</span>
                        <span className="px-1.5 py-0.5 bg-green-500/10 text-green-400 border border-green-500/20 rounded text-[10px] font-medium">Cardamom</span>
                        <span className="px-1.5 py-0.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded text-[10px] font-medium">Garam Masala</span>
                        <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded text-[10px] font-medium">Chai Masala</span>
                      </div>
                    )}
                  </td>

                  {/* Digital Footprint Column */}
                  <td className="px-5 py-4 align-top">
                    <div className="text-white/70 text-sm mb-2 font-mono">Links: {isDiaspora ? '3' : (competitor.websites?.length || 0) + (competitor.socialAccounts?.length || 0)}</div>
                    {isDiaspora && (
                      <div className="flex flex-col gap-1.5">
                        <a href="https://www.diasporaco.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 text-[11px] transition-colors">
                          <Globe className="w-3 h-3" /> diasporaco.com
                        </a>
                        <a href="https://www.instagram.com/diasporaco" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-fuchsia-400 hover:text-fuchsia-300 text-[11px] transition-colors">
                          <Activity className="w-3 h-3" /> @diasporaco
                        </a>
                      </div>
                    )}
                  </td>

                  {/* Penetration / Score Column */}
                  <td className="px-5 py-4 align-top text-right">
                    <div className={\`text-lg font-bold \${threatLevel === 'HIGH' ? 'text-red-400' : 'text-white'}\`}>
                      {competitor.intelligenceScore.toFixed(0)}%
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
`;

fs.writeFileSync(path, content, 'utf8');
