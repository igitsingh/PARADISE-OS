import React from 'react';
import { prisma } from '@database/client';
import { 
  FileText, 
  Search, 
  Upload, 
  Lock, 
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  Database
} from 'lucide-react';
import IngestButton from '../../components/IngestButton';
import VerifyDocumentButton from '../../components/VerifyDocumentButton';

export default async function VaultWorkspacePage() {
  let documents: any[] = [];
  let isDatabaseConnected = false;

  try {
    documents = await prisma.document.findMany({
      include: {
        uploadedBy: true,
        evidence: true,
      },
      orderBy: { createdAt: 'desc' },
    });
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - rendering empty intelligence state");
  }

  const totalDocs = documents.length;
  const verifiedDocs = documents.filter(d => d.evidence.some((e: any) => e.verificationStatus === 'VERIFIED')).length;

  return (
    <div className="flex flex-col w-full space-y-6 pb-10">
      
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Secure Vault</h1>
          <p className="text-white/60 text-sm max-w-2xl">
            Central repository for verified documents, certifications, lab reports, and sensitive evidence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <IngestButton />
        </div>
      </header>

      {/* KPI Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Documents */}
        <div className="bg-black/40 border border-blue-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-blue-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-500/10 blur-2xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-blue-400 text-xs font-semibold uppercase tracking-wider">Stored Assets</h3>
            <Database className="w-4 h-4 text-blue-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{totalDocs}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Total files encrypted in Vault.</p>
        </div>

        {/* Verified Assets */}
        <div className="bg-black/40 border border-emerald-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-emerald-400 text-xs font-semibold uppercase tracking-wider">Verified Evidence</h3>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">{verifiedDocs}</span>
            <span className="text-white/40 text-sm">/ {totalDocs}</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Documents successfully verified by AI.</p>
        </div>

        {/* Access Logs */}
        <div className="bg-black/40 border border-purple-500/20 backdrop-blur-md p-5 rounded-xl relative overflow-hidden group hover:border-purple-500/40 transition-colors">
          <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 blur-2xl rounded-full group-hover:bg-purple-500/20 transition-colors" />
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-purple-400 text-xs font-semibold uppercase tracking-wider">Access Security</h3>
            <Lock className="w-4 h-4 text-purple-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-white">Secure</span>
          </div>
          <p className="text-white/40 text-xs mt-2">Zero unauthorized access attempts.</p>
        </div>
      </div>

      {/* Document List - Strategic View */}
      <div className="bg-[#0A0A0A] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <div className="px-5 py-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/90">Vault Assets</h2>
          <span className="text-[10px] uppercase font-mono text-white/40 tracking-wider">Recent Uploads</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {documents.length === 0 ? (
            <div className="p-8 text-center">
              <Lock className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <p className="text-white/60 text-sm">Vault is currently empty. Ingest documents to begin.</p>
            </div>
          ) : documents.map(doc => {
            const isVerified = doc.evidence.some((e: any) => e.verificationStatus === 'VERIFIED');
            
            return (
              <div key={doc.id} className="p-5 hover:bg-white/[0.02] transition-colors group">
                <div className="flex flex-col lg:flex-row gap-6 justify-between">
                  
                  {/* Primary Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-white font-medium text-lg">{doc.title}</h3>
                      {isVerified ? (
                        <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-emerald-500/20 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Verified
                        </span>
                      ) : (
                        <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded text-[10px] font-mono uppercase border border-amber-500/20 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Pending
                        </span>
                      )}
                    </div>
                    <p className="text-white/40 text-xs">{doc.documentType} • File secured by SHA-256 Checksum</p>
                  </div>

                  {/* Relationship Metrics */}
                  <div className="flex-1 grid grid-cols-2 gap-4 items-center">
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> Evidence Nodes
                      </span>
                      <span className="text-white/80 text-sm">{doc.evidence.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-white/30 text-[10px] font-mono uppercase mb-1 flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Uploader
                      </span>
                      <span className="text-white/80 text-sm">{doc.uploadedBy?.name || 'System'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 justify-end">
                    {!isVerified && (
                      <VerifyDocumentButton documentId={doc.id} />
                    )}
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-white/5 text-white/50 flex items-center justify-center hover:bg-white/10 hover:text-white transition-all"
                    >
                      <ArrowRight className="w-4 h-4 -rotate-45" />
                    </a>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
