import { prisma } from '@database/client';
import { Anchor, ArrowRight, PackageOpen, CheckCircle2, AlertTriangle, Truck } from 'lucide-react';

export default async function OperationsHubPage() {
  const shipments = await prisma.shipment.findMany({
    include: {
      supplier: true,
      importer: true,
    },
    orderBy: { arrivalDate: 'desc' },
    take: 10,
  });

  const importers = await prisma.importer.findMany({
    include: {
      country: true,
    },
    take: 5,
  });

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-mono text-white flex items-center gap-2 uppercase tracking-tight">
          Operations & Supply Chain
        </h1>
        <p className="text-[#8B949E] text-xs font-mono mt-1">
          Global Shipments, Bills of Lading, and Importer Tracking
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Shipments Tracking */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-[#8B949E] text-xs font-mono uppercase border-b border-[#30363D] pb-2 flex items-center gap-2">
            <Anchor size={14} /> Active Shipments
          </h2>
          
          <div className="space-y-3">
            {shipments.map(shipment => (
              <div key={shipment.id} className="bg-[#1C2128]/40 border border-[#30363D] rounded-lg p-4 flex items-center justify-between">
                
                <div className="flex items-center gap-6">
                  {/* Icon */}
                  <div className="w-10 h-10 rounded bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <PackageOpen size={18} className="text-blue-500" />
                  </div>
                  
                  {/* Route */}
                  <div className="flex items-center gap-4 w-64">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8B949E] font-mono uppercase">Origin</span>
                      <span className="text-white text-sm font-medium truncate max-w-[100px]">{shipment.supplier?.name || 'Unknown'}</span>
                    </div>
                    <ArrowRight size={14} className="text-[#30363D]" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-[#8B949E] font-mono uppercase">Destination</span>
                      <span className="text-white text-sm font-medium truncate max-w-[100px]">{shipment.importer?.name || 'Unknown'}</span>
                    </div>
                  </div>
                  
                  {/* BOL */}
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#8B949E] font-mono uppercase">BOL Number</span>
                    <span className="text-white font-mono text-xs">{shipment.billOfLading}</span>
                  </div>
                </div>

                {/* Status */}
                <div className="flex flex-col items-end gap-1">
                  {shipment.arrivalDate && new Date(shipment.arrivalDate) < new Date() ? (
                    <div className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-mono border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 size={10} /> Arrived
                    </div>
                  ) : (
                    <div className="bg-amber-500/10 text-amber-500 px-2 py-0.5 rounded text-[10px] font-mono border border-amber-500/20 flex items-center gap-1">
                      <AlertTriangle size={10} /> In Transit
                    </div>
                  )}
                  {shipment.arrivalDate && (
                    <span className="text-[10px] text-[#8B949E] font-mono">
                      ETA: {new Date(shipment.arrivalDate).toLocaleDateString()}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Verified Importers */}
        <div className="space-y-4">
          <h2 className="text-[#8B949E] text-xs font-mono uppercase border-b border-[#30363D] pb-2 flex items-center gap-2">
            <Truck size={14} /> Intelligence: Key Importers
          </h2>
          
          <div className="flex flex-col gap-3">
            {importers.map(importer => (
              <div key={importer.id} className="bg-[#1C2128]/40 border border-[#30363D] rounded p-3 relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium text-sm">{importer.name}</h3>
                  <div className="text-[10px] font-mono text-[#8B949E] bg-[#30363D]/50 px-1.5 py-0.5 rounded border border-[#30363D]">
                    {importer.country?.code || 'GLB'}
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#8B949E] font-mono border-t border-[#30363D] pt-2 mt-2">
                  <span>Score: {importer.intelligenceScore.toFixed(0)}%</span>
                  <span>ID: {importer.id.split('-')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
