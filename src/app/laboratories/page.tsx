import React from 'react';
import { FlaskConical, FileCheck, Clock, MapPin, Mail, Phone, IndianRupee, User, Info, Building2, Globe, Link2, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

import labsData from '../../db/intelligence/laboratories/laboratories.json';

export default function LaboratoriesModule() {
  return (
    <div className="flex flex-col h-full space-y-6">
      <header className="flex justify-between items-end border-b border-[#30363D] pb-4">
        <div>
          <h1 className="text-2xl font-mono text-white flex items-center gap-2 uppercase tracking-tight">
            <FlaskConical className="text-emerald-500" /> Testing Facilities
          </h1>
          <p className="text-[#8B949E] text-xs font-mono mt-1">
            Certified laboratories for Heavy Metal, Microbiology, and Phytochemical testing.
          </p>
        </div>
      </header>

      {labsData.length === 0 ? (
        <div className="text-center py-12 text-[#8B949E] font-mono text-sm border border-dashed border-[#30363D] rounded bg-[#0A0C10] mx-4 lg:mx-0">
          No laboratories have been verified and added to the Knowledge Graph yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 overflow-y-auto pb-20 items-stretch flex-1 min-h-0 pr-2">
          {labsData.map((lab: any) => (
            <div key={lab.id} className="bg-[#1C2128] border border-[#30363D] rounded-lg">
            <div className="p-5 border-b border-[#30363D]">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-bold text-white tracking-tight">{lab.name}</h2>
                {lab.trusted && (
                   <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-wider whitespace-nowrap ml-2">
                     Accredited
                   </span>
                )}
              </div>
              <div className="flex items-start gap-2 text-[#8B949E] text-xs font-mono mb-2">
                <Building2 size={12} className="mt-0.5 flex-shrink-0" /> 
                <span className="leading-relaxed">{lab.address}</span>
              </div>
              <div className="flex items-center gap-2 text-[#8B949E] text-xs font-mono">
                <MapPin size={12} /> {lab.location}
              </div>
            </div>
            
            <div className="p-5 bg-[#0A0C10] rounded-b-lg flex flex-col gap-4">
              <div>
                <h4 className="text-[10px] uppercase font-mono text-[#8B949E] mb-2 flex items-center gap-1">
                  <FileCheck size={12} /> Tests Offered
                </h4>
                <div className="flex flex-wrap gap-2">
                  {lab.tests.map((test: string) => (
                    <span key={test} className="text-[10px] text-[#c9d1d9] bg-[#1C2128] border border-[#30363D] px-2 py-1 rounded">
                      {test}
                    </span>
                  ))}
                </div>
              </div>

              {lab.certifications && lab.certifications.length > 0 && (
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-[#8B949E] mb-2 flex items-center gap-1">
                    <ShieldCheck size={12} /> Certifications & Approvals
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {lab.certifications.map((cert: string) => (
                      <span key={cert} className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-1 rounded">
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 border-t border-[#30363D] pt-4">
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-[#8B949E] mb-1 flex items-center gap-1">
                    <IndianRupee size={12} /> Estimated Cost
                  </h4>
                  <div className="text-xs text-white font-mono">{lab.cost}</div>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase font-mono text-[#8B949E] mb-1 flex items-center gap-1">
                    <Clock size={12} /> Turnaround Time
                  </h4>
                  <div className="text-xs text-white font-mono">{lab.turnaround}</div>
                </div>
              </div>

              <div className="border-t border-[#30363D] pt-4 flex flex-col gap-2">
                 <h4 className="text-[10px] uppercase font-mono text-[#8B949E] flex items-center gap-1 mb-1">
                    <User size={12} /> Contact Information
                 </h4>
                 <div className="text-xs font-mono flex items-center gap-2 text-[#c9d1d9] truncate">
                    <User size={12} className="text-[#8B949E] flex-shrink-0"/> <span className="truncate">{lab.poc}</span>
                 </div>
                 <div className="text-xs font-mono flex items-center gap-2 text-[#c9d1d9] truncate">
                    <Mail size={12} className="text-[#8B949E] flex-shrink-0"/> <span className="truncate">{lab.email}</span>
                 </div>
                 <div className="text-xs font-mono flex items-center gap-2 text-[#c9d1d9] truncate">
                    <Phone size={12} className="text-[#8B949E] flex-shrink-0"/> <span className="truncate">{lab.contact}</span>
                 </div>
                 
                 {(lab.website || lab.linkedin) && (
                   <div className="flex gap-3 pt-2 border-t border-[#30363D]/50 mt-2">
                     {lab.website && (
                       <a href={lab.website} target="_blank" rel="noopener noreferrer" className="text-xs font-mono flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
                         <Globe size={12} /> Website
                       </a>
                     )}
                     {lab.linkedin && (
                       <a href={lab.linkedin} target="_blank" rel="noopener noreferrer" className="text-xs font-mono flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors">
                         <Link2 size={12} /> LinkedIn
                       </a>
                     )}
                   </div>
                 )}
              </div>

              {lab.notes && (
                <div className="border-t border-[#30363D] pt-4">
                  <div className="bg-[#1C2128]/50 border border-[#30363D] rounded p-3 flex gap-2">
                    <Info size={14} className="text-[#8B949E] flex-shrink-0 mt-0.5" />
                    <p className="text-[10px] text-[#8B949E] leading-relaxed font-mono">
                      {lab.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
