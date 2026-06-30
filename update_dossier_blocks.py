import sys

with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()

maatru_portfolio_end = """                      </tbody>
                    </table>
                  </div>
                ) : ("""

tb_portfolio = """                      </tbody>
                    </table>
                  </div>
                ) : isTwoBrothers ? (
                  <div className="border border-white/10 rounded-lg overflow-hidden">
                    <table className="w-full text-left text-sm font-mono text-white/70">
                      <thead className="bg-[#0F0F0F] text-[10px] uppercase text-white/40 tracking-widest">
                        <tr>
                          <th className="px-4 py-3">Product Name</th>
                          <th className="px-4 py-3">SKU Variant</th>
                          <th className="px-4 py-3">Weight</th>
                          <th className="px-4 py-3">MRP</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10">
                        <tr>
                          <td className="px-4 py-3 font-medium text-white">Lakadong Turmeric Powder</td>
                          <td className="px-4 py-3">Glass Jar</td>
                          <td className="px-4 py-3">150g</td>
                          <td className="px-4 py-3">₹279</td>
                          <td className="px-4 py-3 text-emerald-400">Active</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : ("""
content = content.replace(maatru_portfolio_end, tb_portfolio, 1)

maatru_packaging_end = """                    <Field label="Brand Colors" value="Yellow, Black" verified />
                    <Field label="Unboxing Experience" value="Premium Artisanal" />
                  </div>
                ) : ("""

tb_packaging = """                    <Field label="Brand Colors" value="Yellow, Black" verified />
                    <Field label="Unboxing Experience" value="Premium Artisanal" />
                  </div>
                ) : isTwoBrothers ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                    <Field label="Primary Material" value="Glass Jar / Tin Box" verified />
                    <Field label="Luxury Score" value="8.0 / 10" verified />
                    <Field label="Shelf Impact" value="High" verified />
                    <Field label="Eco Score" value="8.5 / 10 (Recyclable)" />
                    <Field label="Label Design" value="Clean, Earthy, Detailed Information" />
                    <Field label="Brand Colors" value="Off-white, Deep Yellow, Brown" verified />
                    <Field label="Unboxing Experience" value="Premium" />
                  </div>
                ) : ("""
content = content.replace(maatru_packaging_end, tb_packaging, 1)

maatru_pricing_end = """                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : ("""

tb_pricing = """                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : isTwoBrothers ? (
                  <>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
                      <Field label="Premium Positioning" value="Premium Mass" verified />
                      <Field label="Website Price (Avg)" value="₹246 - ₹279" verified />
                      <Field label="Retail Price" value="₹279" />
                      <Field label="Cost per 100g (Turmeric)" value="₹186" verified />
                    </div>
                    
                    <h4 className="text-white font-bold mt-6 mb-4">SKU Price Breakdown</h4>
                    <div className="border border-white/10 rounded-lg overflow-hidden">
                      <table className="w-full text-left text-sm font-mono text-white/70">
                        <thead className="bg-[#0F0F0F] text-[10px] uppercase text-white/40 tracking-widest">
                          <tr>
                            <th className="px-4 py-3">Product Name</th>
                            <th className="px-4 py-3">Weight</th>
                            <th className="px-4 py-3">Website Price</th>
                            <th className="px-4 py-3">Cost / Gram</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/10">
                          <tr>
                            <td className="px-4 py-3 font-medium text-white">Lakadong Turmeric Powder</td>
                            <td className="px-4 py-3">150g</td>
                            <td className="px-4 py-3">₹279</td>
                            <td className="px-4 py-3">₹1.86 / g</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                ) : ("""
content = content.replace(maatru_pricing_end, tb_pricing, 1)

with open('src/app/competitors/CompetitorDossier.tsx', 'w') as f:
    f.write(content)

