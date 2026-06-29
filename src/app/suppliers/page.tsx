import { prisma } from '@database/client';
import { MapPin, ArrowRight } from 'lucide-react';

export default async function SupplierCRMPage() {
  const suppliers = await prisma.supplier.findMany({
    include: {
      country: true,
      labReports: true,
      certifications: true,
      shipments: true,
    },
    orderBy: { intelligenceScore: 'desc' },
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pt-12 pb-32">
      <div>
        <h1 className="text-3xl font-medium text-[#FAFAFA] tracking-tight">Suppliers</h1>
        <p className="text-[#A1A1AA] text-sm mt-2">
          {suppliers.length} active suppliers indexed in the Knowledge Graph.
        </p>
      </div>

      <div className="space-y-4">
        {suppliers.map(supplier => (
          <div key={supplier.id} className="group border border-[#1C1C1C] hover:border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#111111] rounded-xl p-6 transition-all cursor-pointer">
            <div className="flex justify-between items-start">
              
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-[#FAFAFA] font-medium text-lg">{supplier.name}</h3>
                  {supplier.intelligenceScore >= 80 ? (
                    <span className="bg-[#10B981]/10 text-[#10B981] px-2 py-0.5 rounded text-[10px] font-mono uppercase">Verified</span>
                  ) : (
                    <span className="bg-[#F59E0B]/10 text-[#F59E0B] px-2 py-0.5 rounded text-[10px] font-mono uppercase">Pending</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-[#52525B] text-xs">
                  <MapPin size={12} />
                  <span>{supplier.country?.name || 'Unknown Location'}</span>
                </div>
              </div>

              <ArrowRight className="text-[#2A2A2A] group-hover:text-[#FAFAFA] transition-colors" size={16} />
            </div>

            <div className="flex items-center gap-6 mt-6 pt-6 border-t border-[#1C1C1C]">
              <div className="flex flex-col">
                <span className="text-[#52525B] text-[10px] font-mono uppercase mb-1">Lab Reports</span>
                <span className="text-[#FAFAFA] text-sm">{supplier.labReports.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#52525B] text-[10px] font-mono uppercase mb-1">Certifications</span>
                <span className="text-[#FAFAFA] text-sm">{supplier.certifications.length}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[#52525B] text-[10px] font-mono uppercase mb-1">Shipments</span>
                <span className="text-[#FAFAFA] text-sm">{supplier.shipments.length}</span>
              </div>
              <div className="ml-auto flex flex-col text-right">
                <span className="text-[#52525B] text-[10px] font-mono uppercase mb-1">Trust Score</span>
                <span className="text-[#FAFAFA] text-sm font-mono">{supplier.intelligenceScore.toFixed(0)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
