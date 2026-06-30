import re

def update_dossier():
    path = 'src/app/competitors/CompetitorDossier.tsx'
    with open(path, 'r') as f:
        content = f.read()

    # The block we want to replace starts with "{/* Empty States for other sections */}"
    # and ends with ")}". Let's use a simpler replacement strategy.
    
    # We will locate the line where "{/* Empty States for other sections */}" starts
    idx = content.find('{/* Empty States for other sections */}')
    if idx == -1:
        print("Could not find Empty States block.")
        return

    # Just inject the real UI domains before the Empty States block!
    replacement = """
            {/* DOMAIN 8: Social Media */}
            {activeSection.includes("Social Media") && (
              <div>
                {intel?.socialMedia ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Instagram" value={intel.socialMedia.instagram} verified={intel.socialMedia.instagram !== "Unknown"} />
                    <Field label="Facebook" value={intel.socialMedia.facebook} verified={intel.socialMedia.facebook !== "Unknown"} />
                    <Field label="LinkedIn" value={intel.socialMedia.linkedin} verified={intel.socialMedia.linkedin !== "Not Publicly Available" && intel.socialMedia.linkedin !== "Unknown"} />
                    <Field label="Followers" value={intel.socialMedia.followers} verified={intel.socialMedia.followers !== "Unknown"} />
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Social Media data pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 9: Website Intelligence */}
            {activeSection.includes("Website Intelligence") && (
              <div>
                {intel?.websiteIntel ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Traffic Estimate" value={intel.websiteIntel.traffic} verified />
                    <Field label="E-Commerce Platform" value={intel.websiteIntel.ecommercePlatform} verified />
                    <Field label="UX Score" value={intel.websiteIntel.uxScore} />
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Website intelligence pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 10: Certifications */}
            {activeSection.includes("Certifications") && (
              <div>
                {intel?.certifications && intel.certifications.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {intel.certifications.map((cert: any, idx: number) => (
                      <span key={idx} className="px-3 py-1 bg-green-500/10 border border-green-500/20 text-green-400 rounded text-xs font-mono flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        {cert}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">No certifications verified</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 11: Lab Reports */}
            {activeSection.includes("Lab Reports") && (
              <div>
                {intel?.labReports ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Lab Reports Available?" value={intel.labReports.available ? "Yes" : "No"} verified />
                    <Field label="Source" value={intel.labReports.source} />
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Lab Reports data pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 12: Marketplace Presence */}
            {activeSection.includes("Marketplace Presence") && (
              <div>
                {intel?.marketplace ? (
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                    <Field label="Amazon" value={intel.marketplace.amazon} verified />
                    <Field label="Flipkart" value={intel.marketplace.flipkart} verified />
                    <Field label="IndiaMart" value={intel.marketplace.indiamart} verified />
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">Marketplace data pending</div>
                  </div>
                )}
              </div>
            )}

            {/* DOMAIN 15: SWOT */}
            {activeSection.includes("SWOT") && (
              <div>
                {intel?.swot ? (
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-green-500/5 border border-green-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-green-400 tracking-widest mb-3 flex items-center gap-2"><ArrowUpRight className="w-3 h-3" /> Strengths</div>
                      <ul className="space-y-2">
                        {intel.swot.strengths.map((s: string, idx: number) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-red-400 tracking-widest mb-3 flex items-center gap-2"><ArrowDownRight className="w-3 h-3" /> Weaknesses</div>
                      <ul className="space-y-2">
                        {intel.swot.weaknesses.map((s: string, idx: number) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-blue-400 tracking-widest mb-3 flex items-center gap-2"><Crosshair className="w-3 h-3" /> Opportunities</div>
                      <ul className="space-y-2">
                        {intel.swot.opportunities.map((s: string, idx: number) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-orange-400 tracking-widest mb-3 flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Threats</div>
                      <ul className="space-y-2">
                        {intel.swot.threats.map((s: string, idx: number) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-orange-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                    <Search className="w-8 h-8 text-white/20 mb-3" />
                    <div className="text-white/60 font-mono text-sm">SWOT analysis pending</div>
                  </div>
                )}
              </div>
            )}

            {/* Empty States for other sections */}\n"""
    
    if "{/* DOMAIN 8: Social Media */}" not in content:
        content = content[:idx] + replacement + content[idx+39:]
        
    # We also need to remove those sections from the empty states array!
    empty_array_find = '''[
              "Marketing Claims", "Social Media", "Website Intelligence", 
              "Certifications", "Lab Reports", "Marketplace Presence", 
              "Customer Intel", "Export Intel", "SWOT"
            ]'''
    empty_array_replace = '''[
              "Marketing Claims", "Customer Intel", "Export Intel"
            ]'''
            
    content = content.replace(empty_array_find, empty_array_replace)
    
    # Imports
    if "CheckCircle2" not in content:
        content = content.replace('import { ', 'import { CheckCircle2, ArrowUpRight, ArrowDownRight, ', 1)

    with open(path, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    update_dossier()
    print("Dossier UI Domains Patched.")
