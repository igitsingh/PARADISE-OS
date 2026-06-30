import React from 'react';
import { prisma } from '@database/client';
import fs from 'fs/promises';
import path from 'path';
import CompetitorsView from './CompetitorsView';

export default async function CompetitorsWorkspacePage() {
  let competitors: any[] = [];
  let isDatabaseConnected = false;

  try {
    const dbCompetitors = await prisma.competitor.findMany({
      include: {
        products: true,
        websites: true,
        socialAccounts: true,
        tradeShows: true,
      },
      orderBy: { name: 'asc' },
    });
    competitors = [...dbCompetitors];
    isDatabaseConnected = true;
  } catch (error) {
    console.warn("Database connection unavailable - falling back to local JSON data");
  }

  // Load from local JSON if DB is empty or failed
  if (competitors.length === 0 || !isDatabaseConnected) {
    try {
      const jsonPath = path.join(process.cwd(), 'src/db/intelligence/brands/organizations.json');
      const data = await fs.readFile(jsonPath, 'utf8');
      const organizations = JSON.parse(data);
      
      const uniqueBrands = new Map();
      organizations.forEach((org: any) => {
        if (!uniqueBrands.has(org.name)) {
          uniqueBrands.set(org.name, {
            id: org.id,
            name: org.name,
            description: org.marketPositioning || 'Premium',
            intelligenceScore: org.confidenceScore || 50,
            products: [],
            websites: [],
            socialAccounts: [],
            tradeShows: []
          });
        }
      });
      competitors = Array.from(uniqueBrands.values());
      // Sort alphabetically by name
      competitors.sort((a, b) => a.name.localeCompare(b.name));
    } catch (e) {
      console.error("Failed to load local organizations JSON", e);
    }
  }

  return <CompetitorsView initialCompetitors={competitors} />;
}
