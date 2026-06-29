"use client";

import React, { useState } from 'react';
import { Box, Filter, CheckCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import productsData from '../../db/intelligence/products/products.json';
import skusData from '../../db/intelligence/products/skus.json';
import orgsData from '../../db/intelligence/brands/organizations.json';

export default function ProductsModule() {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Map products to include brand details
  const enrichedProducts = productsData.map(p => {
    const org = orgsData.find(o => o.id === (p as any).brandId || o.id === (p as any).organizationId);
    return { ...p, orgName: org?.name || 'Unknown Brand' };
  });

  return (
    <div className="flex flex-col h-full space-y-6">
      <header className="flex justify-between items-end border-b border-[#30363D] pb-4">
        <div>
          <h1 className="text-2xl font-mono text-white flex items-center gap-2 uppercase tracking-tight">
            <Box className="text-emerald-500" /> Global Product Matrix
          </h1>
          <p className="text-[#8B949E] text-xs font-mono mt-1">
            Tracking {enrichedProducts.length} unique spice SKUs globally.
          </p>
        </div>
        <button className="text-xs font-mono text-[#8B949E] flex items-center gap-2 border border-[#30363D] px-3 py-1.5 rounded hover:bg-[#1C2128]">
          <Filter size={14} /> Filter Matrix
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 overflow-y-auto pb-20">
        {enrichedProducts.map(product => (
          <div 
            key={product.id} 
            className="group cursor-pointer bg-[#1C2128]/40 border border-[#30363D] rounded hover:border-emerald-500/50 transition-all p-4 flex flex-col justify-between min-h-[160px]"
          >
             <div>
               <div className="text-[9px] uppercase font-mono text-emerald-500 mb-1">{product.orgName}</div>
               <h3 className="text-white font-medium text-sm line-clamp-2">{product.name}</h3>
               <div className="text-xs text-[#8B949E] mt-2 font-mono">
                 Curcumin: <span className="text-white">{product.claimedCurcuminPercent || 'N/A'}</span>
               </div>
             </div>
             <div className="mt-4 pt-3 border-t border-[#30363D] flex justify-between items-center text-[10px] font-mono text-[#8B949E]">
               <span>{product.spiceType}</span>
               {product.verificationStatus === 'Verified' ? (
                 <CheckCircle size={12} className="text-emerald-500" />
               ) : (
                 <AlertTriangle size={12} className="text-amber-500" />
               )}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
