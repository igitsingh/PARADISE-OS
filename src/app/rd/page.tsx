import React from 'react';
import { prisma } from '@database/client';
import { 
  FlaskRound, 
  Search, 
  Microscope, 
  Library,
  Network,
  ArrowRight,
  TestTube,
  Activity,
  LineChart
} from 'lucide-react';
import InstitutionalResources from './InstitutionalResources';
import MarketIntelligenceDashboard from './MarketIntelligenceDashboard';
import { extractionMethodsData, agritechTrialsData, marketTrendsData } from '@/db/intelligence/rd-data';

export default async function RDHubPage() {
  let activeResearchJobs = 0;
  let totalResearchPapers = 0;
  let totalTrials = 0;
  
  let agritechTrials: any[] = [];
  let extractionMethods: any[] = [];
  let marketTrends: any[] = [];

  try {
    const results = await Promise.all([
      prisma.researchJob.count({ where: { status: { in: ['QUEUED', 'RESEARCHING'] } } }),
      prisma.researchPaper.count(),
      Promise.resolve(0), // No ClinicalTrial in schema yet
    ]);
    [
      activeResearchJobs,
      totalResearchPapers,
      totalTrials
    ] = results;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  agritechTrials = agritechTrialsData;
  extractionMethods = extractionMethodsData;
  marketTrends = marketTrendsData;

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">R&D Intelligence Hub</h1>
          <p className="text-white/60 text-sm max-w-2xl">
            Track extraction innovations, agritech tool trials, and macro market trends for the Turmeric supply chain.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-500/30 transition-colors">
            <Search className="w-4 h-4" />
            Launch AI Synthesizer Job
          </button>
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Active Research Jobs */}
        <div className="bg-black/40 border border-indigo-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-indigo-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">Active Agent Jobs</h3>
            <Network className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{activeResearchJobs}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Autonomous AI researchers currently active.</p>
        </div>

        {/* Literature Base */}
        <div className="bg-black/40 border border-cyan-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-cyan-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-cyan-500/10 blur-2xl rounded-full group-hover:bg-cyan-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-cyan-400 text-xs font-semibold uppercase tracking-wider">Scientific Literature</h3>
            <Library className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalResearchPapers}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Ingested peer-reviewed papers.</p>
        </div>

        {/* Clinical Trials */}
        <div className="bg-black/40 border border-violet-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-violet-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-violet-500/10 blur-2xl rounded-full group-hover:bg-violet-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-violet-400 text-xs font-semibold uppercase tracking-wider">Clinical Trials</h3>
            <Microscope className="w-4 h-4 text-violet-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalTrials}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Monitored human and preclinical trials.</p>
        </div>
      </div>
      
      {/* Grand View Research Market Intelligence */}
      <MarketIntelligenceDashboard />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* Extraction Methods */}
        <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full">
          <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2"><TestTube className="w-4 h-4 text-emerald-400"/> Extraction Technologies</h2>
            <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Purity Tracking</span>
          </div>
          <div className="divide-y divide-white/5 flex-1">
            {extractionMethods.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-white/40 text-sm">No extraction methods tracked yet.</p>
              </div>
            ) : extractionMethods.map(method => (
              <div key={method.id} className="p-5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium text-base">
                    {method.url ? <a href={method.url} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-400 hover:underline transition-colors">{method.name}</a> : method.name}
                  </h3>
                  <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20">
                    {method.curcuminYieldPct}% Yield
                  </span>
                </div>
                <p className="text-white/50 text-xs line-clamp-2 mb-4">{method.description}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <p className="text-white/30 text-[10px] uppercase mb-1">Purity</p>
                    <p className="text-white/80 text-sm">{method.purityPct}%</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase mb-1">Scalability</p>
                    <p className="text-white/80 text-sm">{method.scalability}</p>
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] uppercase mb-1">Cost</p>
                    <p className="text-white/80 text-sm">{method.costIntensity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* Agritech Trials */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2"><Activity className="w-4 h-4 text-cyan-400"/> Agritech Pilot Trials</h2>
              <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Hardware & Software</span>
            </div>
            <div className="divide-y divide-white/5">
              {agritechTrials.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-white/40 text-sm">No active trials.</p>
                </div>
              ) : agritechTrials.map(trial => (
                <div key={trial.id} className="p-5 hover:bg-white/[0.02] transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-white font-medium text-base">
                      {trial.url ? <a href={trial.url} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 hover:underline transition-colors">{trial.title}</a> : trial.title}
                    </h3>
                    <span className="bg-cyan-500/10 text-cyan-400 px-2 py-0.5 rounded text-[10px] font-mono border border-cyan-500/20">
                      {trial.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 mb-3">
                    <p className="text-white/40 text-xs">Partner: <span className="text-white/70">{trial.partnerName}</span></p>
                    <p className="text-white/40 text-xs">Hardware: <span className="text-white/70">{trial.hardwareUsed}</span></p>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-white/70 text-xs italic">"{trial.resultsSummary}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends */}
          <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2"><LineChart className="w-4 h-4 text-purple-400"/> Market Intelligence</h2>
            </div>
            <div className="divide-y divide-white/5">
              {marketTrends.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-white/40 text-sm">No trends analyzed.</p>
                </div>
              ) : marketTrends.map(trend => (
                <div key={trend.id} className="p-4 hover:bg-white/[0.02] transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-medium text-sm">
                      {trend.url ? <a href={trend.url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 hover:underline transition-colors">{trend.title}</a> : trend.title}
                    </h3>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono border ${
                      trend.impactLevel === 'HIGH' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 
                      'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {trend.impactLevel} IMPACT
                    </span>
                  </div>
                  <p className="text-white/50 text-xs mb-2">{trend.summary}</p>
                  <p className="text-white/30 text-[10px]">Source: {trend.source}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <InstitutionalResources />
    </div>
  );
}
