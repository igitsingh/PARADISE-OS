import React from 'react';
import { prisma } from '@database/client';
import { 
  Beaker, 
  Search, 
  FlaskConical, 
  CheckCircle, 
  Microscope,
  ArrowRight,
  TestTube
} from 'lucide-react';

export default async function LaboratoriesWorkspacePage() {
  let laboratories: any[] = [];
  let isDatabaseConnected = false;

  try {
    laboratories = await prisma.laboratory.findMany({
      include: {
        labReports: {
          include: { supplier: true }
        },
      },
      orderBy: { intelligenceScore: 'desc' },
    });
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  const totalLabs = laboratories.length;
  const verifiedLabs = laboratories.filter(l => l.credibilityScore >= 85).length;

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Laboratory Intelligence</h1>
          <p className="text-white/60 text-sm max-w-2xl">
            Assess third-party testing facility credibility, audit history, and report validity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-black/50 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/10 transition-colors">
            <Search className="w-4 h-4" />
            Audit Laboratory
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Laboratories */}
        <div className="bg-black/40 border border-teal-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-teal-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-teal-500/10 blur-2xl rounded-full group-hover:bg-teal-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-teal-400 text-xs font-semibold uppercase tracking-wider">Tracked Labs</h3>
            <Microscope className="w-4 h-4 text-teal-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalLabs}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Third-party facilities monitored globally.</p>
        </div>

        {/* High Credibility Labs */}
        <div className="bg-black/40 border border-emerald-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">High Credibility</h3>
            <CheckCircle className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{verifiedLabs}</span>
            <span className="text-white/40 text-sm">/ {totalLabs}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Facilities exceeding 85% credibility score.</p>
        </div>

        {/* Processed Reports */}
        <div className="bg-black/40 border border-orange-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-orange-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-500/10 blur-2xl rounded-full group-hover:bg-orange-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-orange-400 text-xs font-semibold uppercase tracking-wider">Analyzed Reports</h3>
            <TestTube className="w-4 h-4 text-orange-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">
              {laboratories.reduce((acc, lab) => acc + lab.labReports.length, 0)}
            </span>
          </div>
          <p className="text-white/40 text-xs mt-2">Total lab reports analyzed for compliance.</p>
        </div>
      </div>

      {/* Laboratory List - Strategic View */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/90">Laboratory Network</h2>
          <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Ranked by Credibility</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {laboratories.length === 0 ? (
            <div className="p-8 text-center">
              <FlaskConical className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-white/60 text-sm">No laboratory intelligence data available.</p>
            </div>
          ) : laboratories.map(lab => {
            return (
              <div key={lab.id} className="p-5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  
                  {/* Primary Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium text-lg">{lab.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase border flex items-center gap-1 ${
                        lab.credibilityScore >= 85 ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {lab.credibilityScore >= 85 ? 'VERIFIED' : 'PENDING REVIEW'}
                      </span>
                    </div>
                    <p className="text-white/40 text-xs">Based in {lab.countryCode} • Contact: {lab.contactEmail}</p>
                  </div>

                  {/* Relationship Metrics */}
                  <div className="flex-1 grid grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <TestTube className="w-3 h-3" /> Processed Reports
                      </span>
                      <span className="text-white/80 text-sm">{lab.labReports.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" /> Known Suppliers
                      </span>
                      <span className="text-white/80 text-sm">
                        {new Set(lab.labReports.map((r: any) => r.supplierId)).size} Connected
                      </span>
                    </div>
                  </div>

                  {/* Actions & Score */}
                  <div className="flex items-center gap-6 justify-end">
                    <div className="flex flex-col items-end">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1">Credibility Score</span>
                      <span className={`text-xl font-bold ${lab.credibilityScore >= 85 ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {lab.credibilityScore.toFixed(0)}%
                      </span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
