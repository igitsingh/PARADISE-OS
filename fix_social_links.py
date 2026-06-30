import re

with open('src/app/competitors/CompetitorsView.tsx', 'r') as f:
    content = f.read()

# We need to replace the logic that renders social media
# Find the block starting with:
# {intel?.socialMedia && (intel.socialMedia.instagram !== 'Not Publicly Available' || intel.socialMedia.linkedin !== 'Not Publicly Available' || intel.socialMedia.facebook !== 'Not Publicly Available') ? (
old_logic_start = "{intel?.socialMedia &&"
old_logic_end = ")}                                </div>                              ) : ("

# Actually, I can just replace the whole ternary block.
# Let's find it using regex or just replace the specific string
# The whole social media rendering block starts at:
#                             {intel?.socialMedia && (
# And ends at:
#                             )}

# To be safe, I'll use a python script to find the start and end of the big block.

pattern = r'\{intel\?\.socialMedia && \(\s*intel\.socialMedia\.instagram \!\=\= \'Not Publicly Available\' \|\|[\s\S]*?\[ No social links verified \]\n\s*\<\/div\>\n\s*\)\}'

new_logic = """{(() => {
                              const hasNewSocial = intel?.socialMedia && (
                                (intel.socialMedia.instagram && intel.socialMedia.instagram !== 'Not Publicly Available') || 
                                (intel.socialMedia.facebook && intel.socialMedia.facebook !== 'Not Publicly Available') || 
                                (intel.socialMedia.linkedin && intel.socialMedia.linkedin !== 'Not Publicly Available')
                              );
                              const hasOldSocial = intel?.instagramHandle || intel?.facebookHandle || intel?.linkedin;
                              
                              if (hasNewSocial) {
                                return (
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
                                );
                              } else if (hasOldSocial) {
                                return (
                                  <div className="flex flex-col gap-1 mt-2 text-[10px] text-white/50 font-mono">
                                    {intel.instagramHandle && (
                                      <a href={intel.instagramUrl || `https://instagram.com/${intel.instagramHandle.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                        {intel.instagramHandle}
                                      </a>
                                    )}
                                    {intel.facebookHandle && (
                                      <a href={intel.facebookUrl || `https://facebook.com/${intel.facebookHandle.replace(' ', '')}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                                        {intel.facebookHandle}
                                      </a>
                                    )}
                                  </div>
                                );
                              }
                              
                              return (
                                <div className="flex flex-col gap-1 mt-2 text-[10px] text-white/20 italic font-mono">
                                  [ No social links verified ]
                                </div>
                              );
                            })()}"""

content = re.sub(pattern, new_logic, content)

with open('src/app/competitors/CompetitorsView.tsx', 'w') as f:
    f.write(content)
