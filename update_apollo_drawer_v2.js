const fs = require('fs');
const path = 'src/app/competitors/CompetitorsView.tsx';
let content = fs.readFileSync(path, 'utf8');

// The new sleek drawer to replace the old one
const oldDrawerRegex = /\{\/\* Apollo-Style Side Panel Drawer \*\/\}[\s\S]*?\<\/div\>\n\n    \<\/div\>\n  \);\n\}/;

const newDrawer = `{/* Apollo-Style Side Panel Drawer */}
      <div 
        className={\`fixed inset-y-0 right-0 z-50 w-full max-w-[800px] bg-[#111111] border-l border-white/10 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col \${
          selectedId ? 'translate-x-0' : 'translate-x-full'
        }\`}
      >
        {selectedCompetitor && (
          <>
            {/* Header */}
            <div className="flex items-start justify-between p-6 border-b border-white/10 shrink-0 bg-[#1A1A1A]">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded border border-white/10 bg-[#0A0A0A] flex items-center justify-center shrink-0">
                  <span className="text-xl font-bold text-white/50">{selectedCompetitor.name.charAt(0)}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-2xl font-semibold text-white tracking-tight">{selectedCompetitor.name}</h2>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">Verified</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/50">
                    <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5"/> {isDiasporaSelected ? "diasporaco.com" : "website.com"}</span>
                    <span className="flex items-center gap-1">HQ: Oakland, CA</span>
                    <span className="flex items-center gap-1">Founded: 2017</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="px-4 py-2 bg-white text-black text-sm font-medium rounded-md hover:bg-white/90 transition-colors">
                  Save Entity
                </button>
                <button 
                  onClick={() => setSelectedId(null)}
                  className="w-9 h-9 rounded-md bg-white/5 hover:bg-white/10 text-white/50 hover:text-white flex items-center justify-center transition-colors border border-white/10"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="px-6 border-b border-white/10 flex items-center gap-6 bg-[#1A1A1A] shrink-0 overflow-x-auto scrollbar-hide">
              {['Overview', 'Intelligence', 'Products', 'Supply Chain', 'Digital Footprint'].map((tab, idx) => (
                <button 
                  key={tab} 
                  className={\`py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap \${
                    idx === 0 ? 'border-blue-500 text-blue-400' : 'border-transparent text-white/50 hover:text-white'
                  }\`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#111111]">
              
              {/* About Section */}
              <section>
                <h3 className="text-base font-semibold text-white mb-3">About {selectedCompetitor.name}</h3>
                <p className="text-white/70 text-sm leading-relaxed max-w-3xl">
                  {isDiasporaSelected 
                    ? "Founded in 2017 by Sana Javeri Kadri, an Indian-American entrepreneur who sought to disrupt the traditional, colonial-era spice trade. Headquartered in Oakland, California, the company focuses on equity, sustainability, and transparency. They aim to move away from the commodity model, where spices change hands many times and quality is often compromised by mixing crops from various sources."
                    : selectedCompetitor.description || "No company background available."}
                </p>
              </section>

              <div className="grid grid-cols-2 gap-8">
                {/* Products */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-4">Core Products</h3>
                  <div className="space-y-3">
                    {isDiasporaSelected ? (
                      <>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-500"><Box className="w-4 h-4"/></div>
                            <span className="text-sm font-medium text-white/90">Pragati Turmeric</span>
                          </div>
                          <span className="text-xs text-white/40 font-mono">Premium</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500"><Box className="w-4 h-4"/></div>
                            <span className="text-sm font-medium text-white/90">Kashmiri Saffron</span>
                          </div>
                          <span className="text-xs text-white/40 font-mono">Luxury</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/[0.02]">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500"><Box className="w-4 h-4"/></div>
                            <span className="text-sm font-medium text-white/90">Cardamom</span>
                          </div>
                          <span className="text-xs text-white/40 font-mono">Premium</span>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-white/40 italic">No products tracked.</p>
                    )}
                  </div>
                </section>

                {/* Sourcing & Equity */}
                <section>
                  <h3 className="text-base font-semibold text-white mb-4">Sourcing & Supply Chain</h3>
                  <div className="space-y-4">
                    {isDiasporaSelected ? (
                      <>
                        <div className="flex gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"/>
                          <div>
                            <p className="text-sm font-medium text-white/90">Direct Partnership</p>
                            <p className="text-xs text-white/50 mt-0.5">Sources directly from small, multi-generational family farms.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"/>
                          <div>
                            <p className="text-sm font-medium text-white/90">Fair Wages</p>
                            <p className="text-xs text-white/50 mt-0.5">Pays partner farmers an average of 3-5x the commodity price.</p>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5"/>
                          <div>
                            <p className="text-sm font-medium text-white/90">Transparency</p>
                            <p className="text-xs text-white/50 mt-0.5">Every spice is single-origin and tied to a specific harvest.</p>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-white/40 italic">No supply chain data.</p>
                    )}
                  </div>
                </section>
              </div>

            </div>
          </>
        )}
      </div>

    </div>
  );
}
`;

content = content.replace(oldDrawerRegex, newDrawer);

// Also need to add CheckCircle to imports
if(!content.includes('CheckCircle')) {
  content = content.replace('X\n} from \'lucide-react\';', 'X,\n  CheckCircle\n} from \'lucide-react\';');
}

fs.writeFileSync(path, content, 'utf8');
