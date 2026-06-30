import sys

with open('src/app/competitors/CompetitorsView.tsx', 'r') as f:
    content = f.read()

# Add isTrinay
content = content.replace(
    "const isTwoBrothers = comp.name === 'Two Brothers Organic Farms' || comp.id === 'brand_vbix0z7r13x968q5j9p2' || comp.id === 'org-tbo-farms';",
    "const isTwoBrothers = comp.name === 'Two Brothers Organic Farms' || comp.id === 'brand_vbix0z7r13x968q5j9p2' || comp.id === 'org-tbo-farms';\n      const isTrinay = comp.name === 'Trinay Ayurveda' || comp.id === 'brand_ubgq8665djjkxzqbjp2k' || comp.id === 'org-trinay-ayurveda';"
)

content = content.replace(
    "isTwoBrothers ? 'two brothers organic farms' :",
    "isTrinay ? 'trinay ayurveda' : isTwoBrothers ? 'two brothers organic farms' :"
)

content = content.replace(
    "isTwoBrothers ? 'regenerative dtc brand' :",
    "isTrinay ? 'ayurvedic wellness brand' : isTwoBrothers ? 'regenerative dtc brand' :"
)

content = content.replace(
    "isTwoBrothers ? 'pune, maharashtra' :",
    "isTrinay ? 'hyderabad, telangana' : isTwoBrothers ? 'pune, maharashtra' :"
)

content = content.replace(
    "isTwoBrothers ? 'premium mass' :",
    "isTrinay ? 'unknown' : isTwoBrothers ? 'premium mass' :"
)

content = content.replace(
    "isTwoBrothers ? 10.43 :",
    "isTrinay ? 0 : isTwoBrothers ? 10.43 :"
)

content = content.replace(
    "isTwoBrothers ? 'Two Brothers Organic Farms' : comp.name}",
    "isTrinay ? 'Trinay Ayurveda' : isTwoBrothers ? 'Two Brothers Organic Farms' : comp.name}"
)

content = content.replace(
    "isTwoBrothers ? 'twobrothersindiashop.com' : 'website.com'}",
    "isTrinay ? 'trinaya.co.in' : isTwoBrothers ? 'twobrothersindiashop.com' : 'website.com'}"
)

content = content.replace(
    "isTwoBrothers ? 'Regenerative DTC Brand' : 'Unknown'}",
    "isTrinay ? 'Ayurvedic Wellness Brand' : isTwoBrothers ? 'Regenerative DTC Brand' : 'Unknown'}"
)

content = content.replace(
    "isTwoBrothers ? 'Pune, Maharashtra' : 'Unknown'}",
    "isTrinay ? 'Hyderabad, Telangana' : isTwoBrothers ? 'Pune, Maharashtra' : 'Unknown'}"
)

content = content.replace(
    "isTwoBrothers ? 'Premium Mass' : comp.marketTier || 'Unknown'}",
    "isTrinay ? 'Unknown' : isTwoBrothers ? 'Premium Mass' : comp.marketTier || 'Unknown'}"
)

content = content.replace(
    "isTwoBrothers ? '10.43%' : 'Unknown'}",
    "isTrinay ? 'Verification Pending' : isTwoBrothers ? '10.43%' : 'Unknown'}"
)

# And the Social Media icons block
tb_social = """                            ) : isTwoBrothers ? (
                              <div className="flex gap-2 text-white/40">
                                <a href="https://instagram.com/twobrothersorganicfarms" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://facebook.com/twobrothersorganicfarms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Facebook className="w-4 h-4" />
                                </a>
                                <a href="https://youtube.com/c/twobrothersorganicfarms" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Youtube className="w-4 h-4" />
                                </a>
                              </div>
                            ) : ("""

trinay_social = """                            ) : isTwoBrothers ? (
                              <div className="flex gap-2 text-white/40">
                                <a href="https://instagram.com/twobrothersorganicfarms" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Instagram className="w-4 h-4" />
                                </a>
                                <a href="https://facebook.com/twobrothersorganicfarms" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Facebook className="w-4 h-4" />
                                </a>
                                <a href="https://youtube.com/c/twobrothersorganicfarms" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors" onClick={(e) => e.stopPropagation()}>
                                  <Youtube className="w-4 h-4" />
                                </a>
                              </div>
                            ) : isTrinay ? (
                               <div className="flex gap-2 text-white/40">
                                <span className="text-[10px] text-white/20 uppercase tracking-widest px-2 py-0.5 border border-white/10 rounded-full">Pending</span>
                              </div>
                            ) : ("""
content = content.replace(tb_social, trinay_social, 1)

with open('src/app/competitors/CompetitorsView.tsx', 'w') as f:
    f.write(content)

