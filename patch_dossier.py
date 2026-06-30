import re

with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()

# We need to replace the big Empty States block with actual implementations for the domains that have data
# First, let's find the empty states block
empty_states_pattern = r'\{\/\* Empty States for other sections \*\/.*?\}\)\}'
match = re.search(empty_states_pattern, content, re.DOTALL)
if not match:
    print("Could not find empty states block")
    exit(1)

empty_states_code = match.group(0)

replacement = """{/* DOMAIN 8: Social Media */}
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
                    {intel.certifications.map((cert, idx) => (
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
                        {intel.swot.strengths.map((s, idx) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-red-400 tracking-widest mb-3 flex items-center gap-2"><ArrowDownRight className="w-3 h-3" /> Weaknesses</div>
                      <ul className="space-y-2">
                        {intel.swot.weaknesses.map((s, idx) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-blue-400 tracking-widest mb-3 flex items-center gap-2"><Crosshair className="w-3 h-3" /> Opportunities</div>
                      <ul className="space-y-2">
                        {intel.swot.opportunities.map((s, idx) => (
                          <li key={idx} className="text-sm text-white/70 flex items-start gap-2">
                            <span className="text-blue-500 mt-1">•</span> {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 bg-orange-500/5 border border-orange-500/10 rounded-lg">
                      <div className="text-[10px] uppercase font-mono text-orange-400 tracking-widest mb-3 flex items-center gap-2"><ShieldAlert className="w-3 h-3" /> Threats</div>
                      <ul className="space-y-2">
                        {intel.swot.threats.map((s, idx) => (
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

            {/* Empty States for other sections */}
            {[
              "Marketing Claims", "Customer Intel", "Export Intel"
            ].some(s => activeSection.includes(s)) && (
              <div className="p-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center">
                <Search className="w-8 h-8 text-white/20 mb-3" />
                <div className="text-white/60 font-mono text-sm">Data extraction pending</div>
                <div className="text-white/30 font-mono text-xs mt-1">Run OS scraper to populate this domain</div>
              </div>
            )}"""

new_content = content.replace(empty_states_code, replacement)

# Now we need to add the lucide-react imports for CheckCircle2, ArrowUpRight, ArrowDownRight
if "CheckCircle2" not in new_content:
    new_content = new_content.replace('import { ', 'import { CheckCircle2, ArrowUpRight, ArrowDownRight, ', 1)

with open('src/app/competitors/CompetitorDossier.tsx', 'w') as f:
    f.write(new_content)

print("Successfully patched CompetitorDossier.tsx")
