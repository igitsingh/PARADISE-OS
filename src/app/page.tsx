"use client";

import React from 'react';
import AiChat from '@/components/AiChat';

export default function CentralCanvasPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center max-w-4xl mx-auto w-full">
      <AiChat />
    </div>
  );
}
