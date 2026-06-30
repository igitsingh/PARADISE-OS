'use client';

import React from 'react';
import { Settings, ExternalLink, Cpu, Banknote, MapPin, Navigation } from 'lucide-react';
import Link from 'next/link';

export default function ToolsView({ initialTools = [] }: { initialTools: any[] }) {
  return (
    <div className="h-full bg-[#050505] p-8 overflow-y-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="w-12 h-12 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <Cpu className="w-6 h-6 text-fuchsia-400" />
        </div>
        <div>
          <h1 className="text-3xl font-light tracking-tight text-white/90">Agritech Tools & Equipment</h1>
          <p className="text-white/40 mt-1">Hardware, AI solutions, and instant testing tech for operations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {initialTools.map((tool) => (
          <div key={tool.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-white/20 transition-all group relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/10 rounded-full blur-[50px] pointer-events-none group-hover:bg-fuchsia-500/20 transition-all" />
            
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-wider text-fuchsia-400 mb-1">{tool.category}</span>
                <h3 className="text-xl font-medium text-white/90">{tool.name}</h3>
              </div>
              <div className="bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-medium text-emerald-400">{tool.status}</span>
              </div>
            </div>

            <p className="text-sm text-white/60 mb-6 line-clamp-3 leading-relaxed">
              {tool.description}
            </p>

            <div className="space-y-4 mb-6">
              <div className="flex gap-2">
                <MapPin className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{tool.location}</span>
              </div>
              <div className="flex gap-2">
                <Settings className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                <div className="flex flex-wrap gap-2">
                  {tool.capabilities.map((cap: string, i: number) => (
                    <span key={i} className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-md text-white/60">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <Banknote className="w-4 h-4 text-white/40 shrink-0 mt-0.5" />
                <span className="text-sm text-white/70">{tool.cost}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-white/40 font-mono tracking-wide flex items-center gap-1">
                <Navigation className="w-3 h-3" /> {tool.turnaround}
              </span>
              <div className="flex gap-3">
                {tool.linkedin && (
                  <Link href={tool.linkedin} target="_blank" className="text-white/40 hover:text-white transition-colors">
                    <span className="text-xs underline underline-offset-2">LinkedIn</span>
                  </Link>
                )}
                {tool.website && (
                  <Link href={tool.website} target="_blank" className="text-white/40 hover:text-white transition-colors flex items-center gap-1">
                    <span className="text-xs underline underline-offset-2">Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {initialTools.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 border border-dashed border-white/10 rounded-3xl">
          <Cpu className="w-12 h-12 text-white/20 mb-4" />
          <p className="text-white/50 text-lg">No tools or agritech equipment registered yet.</p>
        </div>
      )}
    </div>
  );
}
