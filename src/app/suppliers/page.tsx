import React from 'react';
import { prisma } from '@database/client';
import fs from 'fs/promises';
import path from 'path';
import SuppliersView from './SuppliersView';

export default async function SuppliersWorkspacePage() {
  let suppliers: any[] = [];
  let isDatabaseConnected = false;

  try {
    const dbSuppliers = await prisma.supplier.findMany({
      include: {
        country: true,
        labReports: true,
        certifications: true,
        shipments: true,
        importers: true,
      },
      orderBy: { intelligenceScore: 'desc' },
    });
    suppliers = [...dbSuppliers];
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - falling back to local JSON data");
  }

  // Load from local JSON if DB is empty or failed
  if (suppliers.length === 0 || !isDatabaseConnected) {
    try {
      const jsonPath = path.join(process.cwd(), 'src/db/intelligence/suppliers/suppliers.json');
      const data = await fs.readFile(jsonPath, 'utf8');
      suppliers = JSON.parse(data);
    } catch (e) {
      console.error("Failed to load local suppliers JSON", e);
    }
  }

  return <SuppliersView initialSuppliers={suppliers} />;
}
