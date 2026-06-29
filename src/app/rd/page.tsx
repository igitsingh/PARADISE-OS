import { prisma } from '@database/client';
import { FlaskConical, Beaker, CheckCircle2, ArrowRight } from 'lucide-react';

export default async function RDHubPage() {
  const products = await prisma.product.findMany({
    include: { competitor: true, skus: true, certifications: true },
    take: 10,
  });

  const labReports = await prisma.labReport.findMany({
    include: { laboratory: true, supplier: true },
    take: 10,
    orderBy: { dateIssued: 'desc' },
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12 pt-12 pb-32">
      <div>
        <h1 className="text-3xl font-medium text-[#FAFAFA] tracking-tight">Research & Quality</h1>
        <p className="text-[#A1A1AA] text-sm mt-2">
          Tracking product formulation, certifications, and laboratory results.
        </p>
      </div>

      <div className="space-y-8">
        {/* Lab Report Triage */}
        <section>
          <h2 className="text-[#FAFAFA] font-medium mb-4 flex items-center gap-2">
            <Beaker size={16} className="text-[#A1A1AA]" /> Recent Laboratory Reports
          </h2>
          <div className="space-y-3">
            {labReports.map(report => (
              <div key={report.id} className="group border border-[#1C1C1C] hover:border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#111111] rounded-lg p-4 transition-all flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="text-[#FAFAFA] font-mono text-sm">{report.reportNumber}</h3>
                  <div className="text-[#52525B] text-xs mt-1 flex gap-4">
                    <span>Lab: {report.laboratory?.name || 'Unknown'}</span>
                    <span>Supplier: {report.supplier?.name || 'Unknown'}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[#A1A1AA]">
                  <span className="text-xs font-mono">{new Date(report.dateIssued).toLocaleDateString()}</span>
                  <ArrowRight size={14} className="text-[#2A2A2A] group-hover:text-[#FAFAFA] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Product Matrix */}
        <section>
          <h2 className="text-[#FAFAFA] font-medium mb-4 flex items-center gap-2 mt-12">
            <FlaskConical size={16} className="text-[#A1A1AA]" /> Formulations
          </h2>
          <div className="space-y-3">
            {products.map(product => (
              <div key={product.id} className="group border border-[#1C1C1C] hover:border-[#2A2A2A] bg-[#0A0A0A] hover:bg-[#111111] rounded-lg p-4 transition-all flex justify-between items-center cursor-pointer">
                <div>
                  <h3 className="text-[#FAFAFA] text-sm">{product.name}</h3>
                  <div className="text-[#52525B] text-xs mt-1">Brand: {product.competitor?.name || 'Internal'}</div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex gap-2">
                    {product.certifications.length > 0 ? (
                      product.certifications.map(cert => (
                        <span key={cert.id} className="text-[10px] bg-[#1C1C1C] text-[#A1A1AA] border border-[#2A2A2A] px-1.5 py-0.5 rounded font-mono flex items-center gap-1">
                          <CheckCircle2 size={10} className="text-[#10B981]" /> {cert.name}
                        </span>
                      ))
                    ) : (
                      <span className="text-[10px] text-[#52525B] italic font-mono">No Certs</span>
                    )}
                  </div>
                  <ArrowRight size={14} className="text-[#2A2A2A] group-hover:text-[#FAFAFA] transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
