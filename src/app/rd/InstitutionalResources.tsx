import React from 'react';
import { ExternalLink, Landmark, BookOpen, Building, MapPin, Award } from 'lucide-react';
import resources from '../../db/intelligence/resources.json';

export default function InstitutionalResources() {
  const getIcon = (category: string) => {
    switch (category) {
      case 'Training': return <BookOpen className="w-4 h-4 text-blue-400" />;
      case 'Sourcing': return <Building className="w-4 h-4 text-emerald-400" />;
      case 'Updates': return <MapPin className="w-4 h-4 text-amber-400" />;
      case 'Funding': return <Landmark className="w-4 h-4 text-indigo-400" />;
      case 'Certification': return <Award className="w-4 h-4 text-violet-400" />;
      default: return <Landmark className="w-4 h-4 text-white" />;
    }
  };

  return (
    <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl col-span-1 lg:col-span-2 mt-6">
      <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white/90 flex items-center gap-2">
          <Landmark className="w-4 h-4 text-blue-400" />
          Institutional & Government Resources
        </h2>
        <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Public Intelligence</span>
      </div>
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resources.map((res) => (
          <div key={res.id} className="bg-white/[0.02] border border-white/10 rounded-xl p-4 hover:bg-white/[0.04] transition-colors flex flex-col h-full group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href={res.url} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white transition-colors">
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
            <div className="flex items-center gap-2 mb-3">
              {getIcon(res.category)}
              <span className="text-[10px] uppercase font-mono text-white/50 tracking-wider bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {res.category}
              </span>
            </div>
            <h3 className="text-white font-medium text-sm mb-2 pr-6 leading-tight">{res.name}</h3>
            <p className="text-white/50 text-xs mb-4 line-clamp-2">{res.description}</p>
            <div className="mt-auto pt-3 border-t border-white/10">
              <p className="text-indigo-300 text-[10px] uppercase font-semibold tracking-wider mb-1">Business Value</p>
              <p className="text-white/70 text-xs italic">"{res.businessValue}"</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
