import re

with open('src/app/competitors/CompetitorsView.tsx', 'r') as f:
    content = f.read()

# Replace the giant hardcoded rendering block in the table body.
# We need to find where the `isDiaspora` etc variables are defined (line 244-250) 
# and replace the `<tr>` block with a dynamic one.

# Let's find the start of the `map` function
pattern = r'\{sortedCompetitors\.map\(\(comp\) \=\> \{.*?(?=\<tbody className="divide-y divide-white\/5"\>)'
# Actually, let's just replace the body of sortedCompetitors.map
start_marker = "{sortedCompetitors.map((comp) => {"
end_marker = "                })}"

new_map_body = """{sortedCompetitors.map((comp) => {
                  const intel = getCompetitorIntel(comp.id);
                  const company = intel?.company?.toUpperCase() || 'UNKNOWN';
                  const entityType = intel?.entityType?.replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';
                  const location = intel?.location?.replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';
                  const marketTier = intel?.marketTier?.replace(/\b\w/g, l => l.toUpperCase()) || 'Unknown';
                  const curcuminDisplay = intel?.curcuminDisplay || 'Unknown';
                  const websiteDisplay = intel?.websiteDisplay && intel.websiteDisplay !== "unknown" ? intel.websiteDisplay : 'website.com';
                  const websiteUrl = intel?.websiteUrl && intel.websiteUrl !== "#" ? intel.websiteUrl : 'https://website.com';
                  
                  return (
                    <tr key={comp.id} className="hover:bg-white/[0.02] group transition-colors">
                      <td className="px-4 py-3 w-10 text-center text-white/20 group-hover:text-white/40">
                        <Square className="w-4 h-4 mx-auto cursor-pointer" />
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setSelectedId(comp.id)}
                          className="text-blue-400 hover:text-blue-300 font-medium transition-colors text-sm"
                        >
                          {comp.name}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <button 
                          onClick={() => setSelectedId(comp.id)}
                          className="px-3 py-1.5 rounded text-xs font-medium border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-colors"
                        >
                          View Dossier
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded border border-white/10 bg-black flex items-center justify-center font-bold text-white/50 text-xs shrink-0">
                            {comp.name.charAt(0)}
                          </div>
                          <div>
                            <div className="text-white/90 text-sm font-medium">{company}</div>
                            <a href={websiteUrl} target="_blank" rel="noopener noreferrer" className={`text-[11px] ${websiteDisplay !== 'website.com' ? 'text-blue-400/80 hover:text-blue-400' : 'text-white/30 cursor-not-allowed pointer-events-none'} flex items-center gap-1 mt-0.5`} onClick={(e) => { e.stopPropagation(); if (websiteDisplay === 'website.com') e.preventDefault(); }}>
                              <Globe className="w-3 h-3" /> 
                              {websiteDisplay}
                            </a>
                            
                            {intel?.socialMedia && (intel.socialMedia.instagram !== 'Not Publicly Available' || intel.socialMedia.linkedin !== 'Not Publicly Available' || intel.socialMedia.facebook !== 'Not Publicly Available') ? (
                              <div className="flex flex-col gap-1 mt-2 text-[10px] text-white/50 font-mono">
                                {intel.socialMedia.instagram && intel.socialMedia.instagram !== 'Not Publicly Available' && (
                                  <a href={`https://instagram.com/${intel.socialMedia.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    {intel.socialMedia.instagram}
                                  </a>
                                )}
                                {intel.socialMedia.facebook && intel.socialMedia.facebook !== 'Not Publicly Available' && (
                                  <a href={`https://facebook.com/${intel.socialMedia.facebook.replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                    {intel.socialMedia.facebook}
                                  </a>
                                )}
                              </div>
                            ) : (
                              <div className="flex flex-col gap-1 mt-2 text-[10px] text-white/20 italic font-mono">
                                [ No social links verified ]
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-white/70 font-medium">{entityType}</td>
                      <td className="px-4 py-3 text-sm text-white/50">{location}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded text-xs font-medium border border-blue-500/20 bg-blue-500/10 text-blue-400">
                          {marketTier}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-mono text-emerald-400">
                        {curcuminDisplay}
                      </td>
                    </tr>
                  );
                })}"""

start_idx = content.find(start_marker)
end_idx = content.find(end_marker) + len(end_marker)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_map_body + content[end_idx:]

with open('src/app/competitors/CompetitorsView.tsx', 'w') as f:
    f.write(content)
