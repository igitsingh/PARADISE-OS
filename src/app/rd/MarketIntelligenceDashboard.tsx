import React from 'react';
import { TrendingUp, Globe2, Pill, Activity, BarChart3, Building2, TableProperties, Map } from 'lucide-react';

const DonutChart = ({ percentage, color, label, icon: Icon }: { percentage: number, color: string, label: string, icon: any }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white/[0.02] rounded-xl border border-white/5 relative group">
      <div className="relative w-24 h-24 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" className="text-white/10" />
          <circle cx="50" cy="50" r={radius} fill="transparent" stroke="currentColor" strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className={`transition-all duration-1000 ease-out ${color}`} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Icon className={`w-5 h-5 mb-1 ${color}`} />
          <span className="text-sm font-bold text-white">{percentage}%</span>
        </div>
      </div>
      <p className="mt-3 text-xs font-medium text-white/70 text-center uppercase tracking-wider">{label}</p>
    </div>
  );
};

export default function MarketIntelligenceDashboard() {
  const keyCompanies = [
    "WackerChemie AG", "BioMaxLifesciences Ltd.", "Synthite Industries Ltd.", 
    "Hindustan Mint & Agro Products Pvt. Ltd.", "Arjuna Natural Extracts Ltd.", 
    "SV Agrofood", "Star Hi Herbs Pvt. Ltd.", "Herboveda India Pvt. Ltd.", 
    "Helmigs Prima Sehejtera PT", "Javaplant", "Konark Herbals & Healthcare Pvt. Ltd.", 
    "Rosun Natural Products Pvt. Ltd.", "Sabinsa Corporation"
  ];

  const historicalGrowth = [
    { year: 2017, val: 42.1, height: '22%' },
    { year: 2018, val: 47.5, height: '25%' },
    { year: 2019, val: 52.8, height: '28%' },
    { year: 2020, val: 58.2, height: '30%' },
    { year: 2021, val: 65.4, height: '34%' },
    { year: 2022, val: 74.2, height: '39%' },
    { year: 2023, val: 84.5, height: '44%' },
    { year: 2024, val: 98.9, height: '51%' },
    { year: 2025, val: 113.8, height: '59%' },
    { year: 2026, val: 135.2, height: '70%' },
    { year: 2027, val: 162.5, height: '85%' },
    { year: 2028, val: 191.9, height: '100%' }
  ];

  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl mb-6">
      <div className="px-5 py-4 border-b border-white/5 bg-gradient-to-r from-emerald-500/10 to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-emerald-400" />
          <div>
            <h2 className="text-base font-semibold text-white/90">Curcumin Market Size & Trends Analysis</h2>
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono mt-0.5">Grand View Research 2025-2030 Report</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
            <span className="text-xs text-white/50">2025 Est:</span>
            <span className="text-xs font-bold text-white">$113.8M</span>
          </div>
          <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-1.5">
            <span className="text-xs text-white/50">2030 Proj:</span>
            <span className="text-xs font-bold text-white">$199.7M</span>
          </div>
          <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-bold text-emerald-400">11.9% CAGR</span>
          </div>
        </div>
      </div>

      <div className="p-6 flex flex-col gap-8">
        
        {/* Top Section: Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Side: Historical Market Size Bar Chart */}
          <div className="flex flex-col justify-center bg-white/[0.01] border border-white/5 p-5 rounded-xl">
            <h3 className="text-sm font-medium text-white/80 mb-6 flex items-center gap-2">
              <Activity className="w-4 h-4 text-white/50" /> Market Size (USD Billion), 2017 - 2028
            </h3>
            
            <div className="flex items-end justify-between gap-1 h-48 px-1">
              {historicalGrowth.map((data) => (
                <div key={data.year} className="flex flex-col items-center justify-end h-full w-full group">
                  <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400/80 mb-2 transition-colors group-hover:text-emerald-300 opacity-0 group-hover:opacity-100 absolute -top-6">
                    ${data.val}M
                  </span>
                  <div 
                    className={`w-full max-w-[28px] rounded-t-sm transition-all duration-500 ease-in-out relative ${data.year >= 2025 ? 'bg-emerald-500/80 group-hover:bg-emerald-400' : 'bg-white/10 group-hover:bg-white/20'}`} 
                    style={{ height: data.height }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/10 rounded-t-sm"></div>
                  </div>
                  <span className="text-[8px] sm:text-[9px] font-bold text-white/50 mt-2">{data.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Market Dominance Donuts */}
          <div className="flex flex-col justify-center bg-white/[0.01] border border-white/5 p-5 rounded-xl">
            <h3 className="text-sm font-medium text-white/80 mb-6 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-white/50" /> 2024 Market Segments & Regional Share
            </h3>
            
            <div className="grid grid-cols-2 gap-4">
              <DonutChart percentage={50.5} color="text-indigo-400" label="North America" icon={Map} />
              <DonutChart percentage={52.2} color="text-purple-400" label="Pharmaceuticals" icon={Pill} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Key Companies */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-white/50" /> Key Curcumin Companies
            </h3>
            <p className="text-xs text-white/40 mb-4">Leading companies dictating market trends and holding the largest market share.</p>
            <div className="flex flex-wrap gap-2">
              {keyCompanies.map((company, i) => (
                <span key={i} className="text-[10px] px-2.5 py-1 bg-white/5 text-white/70 border border-white/10 rounded-md hover:bg-white/10 hover:text-white transition-colors cursor-default">
                  {company}
                </span>
              ))}
            </div>
          </div>

          {/* Report Scope Table */}
          <div>
            <h3 className="text-sm font-medium text-white/80 mb-4 flex items-center gap-2">
              <TableProperties className="w-4 h-4 text-white/50" /> Report Scope
            </h3>
            <div className="overflow-hidden border border-white/5 rounded-lg text-xs">
              <table className="w-full text-left">
                <tbody className="divide-y divide-white/5">
                  <tr className="bg-white/[0.02]">
                    <td className="p-3 text-white/50 font-medium">Market size value in 2025</td>
                    <td className="p-3 text-white/90">USD 113.8 million</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white/50 font-medium">Revenue forecast in 2030</td>
                    <td className="p-3 text-white/90">USD 199.7 million</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="p-3 text-white/50 font-medium">Growth rate</td>
                    <td className="p-3 text-white/90">CAGR of 11.9% (2025-2030)</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white/50 font-medium">Base year</td>
                    <td className="p-3 text-white/90">2024</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="p-3 text-white/50 font-medium">Historical data</td>
                    <td className="p-3 text-white/90">2018 - 2023</td>
                  </tr>
                  <tr>
                    <td className="p-3 text-white/50 font-medium">Segments covered</td>
                    <td className="p-3 text-white/90">Application, region</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
