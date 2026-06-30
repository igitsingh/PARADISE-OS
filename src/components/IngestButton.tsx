'use client';

import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import IngestDocumentModal from './IngestDocumentModal';
import { useRouter } from 'next/navigation';

export default function IngestButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleSuccess = () => {
    // Refresh the current route to fetch the new documents from the database
    router.refresh();
  };

  return (
    <>
      <button 
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-500/30 transition-colors shadow-lg shadow-emerald-500/10"
      >
        <Upload className="w-4 h-4" />
        Ingest Document
      </button>

      <IngestDocumentModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleSuccess}
      />
    </>
  );
}
