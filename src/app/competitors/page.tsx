import { Shield, AlertTriangle } from 'lucide-react';
import orgsData from '@/db/intelligence/brands/organizations.json';

export default function CompetitorsPage() {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-12 pt-12 pb-32">
      <div>
        <h1 className="text-3xl font-medium text-[#FAFAFA] tracking-tight">Competitor Intelligence</h1>
        <p className="text-[#A1A1AA] text-sm mt-2">
          Tracking {orgsData.length} competitor brands indexed in the Knowledge Graph.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orgsData.map(org => (
          <div 
            key={org.id} 
            className="group border border-[#1C1C1C] hover:border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#111111] rounded-xl p-5 transition-all cursor-pointer flex flex-col"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-[#FAFAFA] font-medium text-base truncate pr-2 group-hover:text-amber-400 transition-colors">{org.name}</h3>
              {org.verificationStatus === 'Verified' ? (
                <Shield size={16} className="text-emerald-500 shrink-0" />
              ) : (
                <AlertTriangle size={16} className="text-amber-500 shrink-0" />
              )}
            </div>
            
            <div className="flex flex-wrap gap-1.5 mb-6 flex-1">
              {org.roles.map(role => (
                <span key={role} className="text-[10px] uppercase font-mono bg-white/5 text-white/60 px-2 py-0.5 rounded border border-white/5">
                  {role}
                </span>
              ))}
            </div>

            <div className="text-[11px] text-[#52525B] font-mono flex justify-between items-center mt-auto border-t border-[#1C1C1C] pt-3">
              <span>Conf: {org.confidenceScore}%</span>
              <span className="truncate">{new Date(org.dateCollected).toLocaleDateString('en-CA')}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
