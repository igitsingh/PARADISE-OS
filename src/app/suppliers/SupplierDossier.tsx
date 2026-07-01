import React, { useState } from 'react';
import { 
  X, CheckCircle2, AlertTriangle, FileText, Download, 
  MapPin, Globe, Award, ShieldAlert, BookOpen, Clock, BarChart4, Users
} from 'lucide-react';

interface SupplierDossierProps {
  supplier: any;
  onClose: () => void;
}

export default function SupplierDossier({ supplier, onClose }: SupplierDossierProps) {
  const [activeTab, setActiveTab] = useState('overview');
  
  return (
    <div className="fixed inset-y-0 right-0 w-[800px] bg-[#0A0A0A] border-l border-white/10 shadow-2xl flex flex-col z-50 animate-in slide-in-from-right duration-300">
      
      {/* Header */}
      <div className="shrink-0 border-b border-white/10 bg-[#0F0F0F] p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5 text-white/50" />
        </button>

        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-lg bg-black border border-white/10 flex items-center justify-center text-2xl font-bold text-white/50">
            {supplier.name.charAt(0)}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">{supplier.name}</h2>
            <div className="flex items-center gap-3 mt-2 text-sm text-white/60">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {supplier.location || 'Unknown'}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><Globe className="w-4 h-4" /> {supplier.country || 'Unknown'}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs">
                {supplier.entityType}
              </span>
            </div>
          </div>
        </div>

        {/* Intelligence Score */}
        <div className="mt-6 flex items-center justify-between p-4 rounded-lg border border-white/5 bg-white/[0.02]">
          <div>
            <div className="text-xs font-mono uppercase text-white/40 mb-1">Intelligence Score</div>
            <div className="text-2xl font-bold text-white flex items-baseline gap-1">
              {supplier.intelligenceScore}% 
              <span className="text-xs font-normal text-white/40">Confidence</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="text-right">
              <div className="text-xs font-mono uppercase text-white/40 mb-1">Status</div>
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" /> Verified
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex px-6 border-b border-white/10 bg-[#0F0F0F] shrink-0 overflow-x-auto scrollbar-hide">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'lab_reports', label: 'Lab Reports & QC' },
          { id: 'certifications', label: 'Compliance' },
          { id: 'logistics', label: 'Logistics' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab.id 
                ? 'border-blue-500 text-blue-400' 
                : 'border-transparent text-white/50 hover:text-white hover:bg-white/[0.02]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-[#0A0A0A]">
        
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <section>
              <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                <Award className="w-4 h-4 text-blue-400" /> Key Intelligence
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                  <div className="text-xs text-white/40 mb-1">Primary Market Tier</div>
                  <div className="text-sm text-white">{supplier.marketTier}</div>
                </div>
                <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                  <div className="text-xs text-white/40 mb-1">Curcumin Content</div>
                  <div className="text-sm text-emerald-400 font-bold">{supplier.curcuminContent}%</div>
                </div>
                <div className="p-4 rounded border border-white/5 bg-white/[0.02] col-span-2">
                  <div className="text-xs text-white/40 mb-1">Quality Specifications</div>
                  <div className="text-sm text-white">{supplier.qualitySpecs}</div>
                </div>
                <div className="p-4 rounded border border-white/5 bg-white/[0.02] col-span-2">
                  <div className="text-xs text-white/40 mb-1">Contaminants & Heavy Metals</div>
                  <div className="text-sm text-emerald-400">{supplier.heavyMetalsDyes}</div>
                </div>
              </div>
            </section>

            {supplier.socialMedia && (
              <section>
                <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" /> Digital & Social Presence
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(supplier.socialMedia).map(([platform, link]) => (
                    <div key={platform} className="p-4 rounded border border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="capitalize text-sm text-white/70">{platform}</div>
                      {link !== 'Unknown' && link !== 'Not Active' ? (
                        <a href={link as string} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm truncate max-w-[200px]">
                          {link as string}
                        </a>
                      ) : (
                        <span className="text-white/30 text-sm">Not Listed</span>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {supplier.primaryContact && (
              <section>
                <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" /> Primary Contact
                </h3>
                <div className="p-4 rounded border border-white/5 bg-white/[0.02] flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Name</span>
                    <span className="text-sm font-medium text-white">{supplier.primaryContact.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Title</span>
                    <span className="text-sm font-medium text-white">{supplier.primaryContact.title}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Phone</span>
                    <span className="text-sm font-medium text-blue-400">{supplier.primaryContact.phone}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white/70">Email</span>
                    <span className="text-sm font-medium text-blue-400">{supplier.primaryContact.email}</span>
                  </div>
                </div>
              </section>
            )}

            {supplier.pricing && (
              <section>
                <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <BarChart4 className="w-4 h-4 text-blue-400" /> Market Intelligence
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Pricing Positioning</div>
                    <div className="text-sm text-white">{supplier.pricing.premiumPositioning}</div>
                  </div>
                  <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Wholesale / Retail Price</div>
                    <div className="text-sm text-white">{supplier.pricing.websitePrice}</div>
                  </div>
                  <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Cost Per 100g</div>
                    <div className="text-sm text-white">{supplier.pricing.costPer100g}</div>
                  </div>
                </div>
              </section>
            )}

            {supplier.packaging && (
              <section>
                <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-400" /> Packaging & Positioning
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Primary Material</div>
                    <div className="text-sm text-white">{supplier.packaging.primaryMaterial}</div>
                  </div>
                  <div className="p-4 rounded border border-white/5 bg-white/[0.02]">
                    <div className="text-xs text-white/40 mb-1">Label Design</div>
                    <div className="text-sm text-white">{supplier.packaging.labelDesign}</div>
                  </div>
                  <div className="p-4 rounded border border-white/5 bg-white/[0.02] col-span-2">
                    <div className="text-xs text-white/40 mb-1">Core Narrative</div>
                    <div className="text-sm text-white italic">"{supplier.coreNarrative}"</div>
                  </div>
                  {supplier.positioningTags && (
                    <div className="p-4 rounded border border-white/5 bg-white/[0.02] col-span-2">
                      <div className="text-xs text-white/40 mb-2">Positioning Tags</div>
                      <div className="flex flex-wrap gap-2">
                        {supplier.positioningTags.map((tag: string, idx: number) => (
                          <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-white/80">{tag}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </section>
            )}

            {supplier.marketplace && (
              <section>
                <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <Globe className="w-4 h-4 text-blue-400" /> Marketplace Presence
                </h3>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(supplier.marketplace).map(([platform, link]) => (
                    <div key={platform} className="p-3 rounded border border-white/5 bg-white/[0.02] flex items-center justify-between">
                      <div className="capitalize text-sm text-white/70">{platform}</div>
                      <a href={link as string} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 text-sm truncate max-w-[250px]">
                        {link as string}
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {activeTab === 'lab_reports' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" /> Analytical Reports
            </h3>
            
            {supplier.labReports?.length > 0 ? (
              <div className="space-y-4">
                {supplier.labReports.map((report: any, idx: number) => (
                  <div key={idx} className="p-5 border border-white/10 rounded-lg bg-[#0F0F0F]">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-white font-medium">{report.labName} Report</h4>
                        <div className="text-xs text-white/40 mt-1 flex items-center gap-2">
                          <Clock className="w-3 h-3" /> {report.date}
                        </div>
                      </div>
                      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-500/10 text-blue-400 text-xs hover:bg-blue-500/20 transition-colors">
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                      <div>
                        <div className="text-[10px] uppercase text-white/40 font-mono mb-1">Curcumin %</div>
                        <div className="text-lg text-emerald-400 font-bold">{report.curcuminPercentage}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] uppercase text-white/40 font-mono mb-1">Moisture</div>
                        <div className="text-lg text-white/90 font-medium">{report.moisture}%</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 border border-white/5 border-dashed rounded-lg text-center text-white/30">
                No lab reports on file.
              </div>
            )}
          </div>
        )}

        {activeTab === 'certifications' && (
          <div className="space-y-6">
            <h3 className="text-sm font-semibold text-white/90 mb-4 uppercase tracking-wider flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-blue-400" /> Compliance & Certifications
            </h3>
            <div className="flex flex-wrap gap-2">
              {supplier.certifications?.map((cert: string, idx: number) => (
                <span key={idx} className="px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-medium">
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
