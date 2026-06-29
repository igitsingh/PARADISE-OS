import { prisma } from '@database/client';
import { FileText, UploadCloud, Search, CheckCircle2, AlertTriangle, Fingerprint, Eye } from 'lucide-react';

export default async function VaultPage() {
  const documents = await prisma.document.findMany({
    include: {
      uploadedBy: true,
      evidence: true,
    },
    orderBy: { createdAt: 'desc' },
    take: 15,
  });

  const queuedDocs = documents.filter(d => d.lifecycleStage === 'DISCOVERED' || d.lifecycleStage === 'QUEUED' || d.lifecycleStage === 'VERIFICATION');
  const verifiedDocs = documents.filter(d => d.lifecycleStage === 'APPROVED' || d.lifecycleStage === 'KNOWLEDGE_GRAPH_UPDATED');

  return (
    <div className="max-w-[1600px] mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-mono text-white flex items-center gap-2 uppercase tracking-tight">
            Document Vault & Evidence Engine
          </h1>
          <p className="text-[#8B949E] text-xs font-mono mt-1">
            Secure storage for {documents.length} verified and unverified intelligence sources.
          </p>
        </div>
        <button className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded text-xs font-mono uppercase transition-colors flex items-center gap-2">
          <UploadCloud size={14} /> Ingest File
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Col: Ingestion Queue */}
        <div className="xl:col-span-2 space-y-4">
          <h2 className="text-[#8B949E] text-xs font-mono uppercase border-b border-[#30363D] pb-2 flex items-center gap-2">
            <AlertTriangle size={14} /> PKAE Ingestion Queue (Needs Verification)
          </h2>
          
          <div className="space-y-3">
            {queuedDocs.length === 0 && (
              <div className="text-center py-8 text-[#8B949E] text-xs font-mono italic border border-dashed border-[#30363D] rounded">
                Ingestion queue is empty.
              </div>
            )}
            {queuedDocs.map(doc => (
              <div key={doc.id} className="bg-[#1C2128]/40 border border-[#30363D] rounded-lg p-4 flex items-center justify-between hover:border-amber-500/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                    <FileText size={18} className="text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-white text-sm font-medium">{doc.title}</h3>
                    <div className="text-[10px] text-[#8B949E] font-mono flex items-center gap-3 mt-1">
                      <span>Type: {doc.documentType}</span>
                      <span className="flex items-center gap-1"><Fingerprint size={10}/> {doc.checksum.substring(0,8)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-[10px] text-amber-500 font-mono uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 inline-block mb-1">
                      {doc.lifecycleStage}
                    </div>
                    <div className="text-[10px] text-[#8B949E] font-mono">
                      {new Date(doc.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <button className="bg-[#30363D] hover:bg-[#8B949E]/20 text-white p-2 rounded transition-colors">
                    <Eye size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Verified Archive */}
        <div className="space-y-4">
          <h2 className="text-[#8B949E] text-xs font-mono uppercase border-b border-[#30363D] pb-2 flex items-center gap-2">
            <CheckCircle2 size={14} /> Verified Archive
          </h2>
          
          <div className="flex flex-col gap-3">
            {verifiedDocs.length === 0 && (
              <div className="text-center py-8 text-[#8B949E] text-xs font-mono italic border border-dashed border-[#30363D] rounded">
                No verified documents.
              </div>
            )}
            {verifiedDocs.map(doc => (
              <div key={doc.id} className="bg-[#1C2128]/40 border border-[#30363D] rounded p-3">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-white font-medium text-xs truncate max-w-[200px]">{doc.title}</h3>
                  <div className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    {doc.evidence.length} Claims
                  </div>
                </div>
                <div className="flex justify-between items-center text-[10px] text-[#8B949E] font-mono border-t border-[#30363D] pt-2 mt-2">
                  <span>Score: {doc.intelligenceScore.toFixed(0)}%</span>
                  <span className="flex items-center gap-1"><Fingerprint size={10}/> {doc.checksum.substring(0,8)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
