import { LifecycleStage, VerificationStatus } from '@prisma/client';
import { prisma } from './client';

async function main() {
  console.log('🌱 Starting Paradise OS Data Ingestion (Evidence-First)...');

  // 1. Seed Countries (Reference Entities)
  const countries = [
    { name: 'United Kingdom', code: 'UK' },
    { name: 'United States', code: 'USA' },
    { name: 'Canada', code: 'CAN' },
    { name: 'Australia', code: 'AUS' },
    { name: 'Germany', code: 'DEU' },
    { name: 'France', code: 'FRA' },
    { name: 'Italy', code: 'ITA' },
    { name: 'Netherlands', code: 'NLD' },
    { name: 'United Arab Emirates', code: 'UAE' },
    { name: 'Saudi Arabia', code: 'SAU' },
    { name: 'Japan', code: 'JPN' },
    { name: 'Singapore', code: 'SGP' },
    { name: 'India', code: 'IND' }
  ];

  for (const c of countries) {
    await prisma.country.upsert({
      where: { code: c.code },
      update: {},
      create: {
        name: c.name,
        code: c.code,
        lifecycleStage: LifecycleStage.APPROVED,
        intelligenceScore: 100.0,
      },
    });
  }
  console.log(`✅ Seeded ${countries.length} Countries`);

  // 2. Seed Certifications (Reference Entities)
  const certs = [
    'USDA Organic', 'India Organic', 'FSSAI', 'ISO', 
    'HACCP', 'Halal', 'Kosher', 'BRCGS', 'APEDA'
  ];

  for (const cert of certs) {
    const existing = await prisma.certification.findFirst({ where: { name: cert } });
    if (!existing) {
      await prisma.certification.create({
        data: {
          name: cert,
          issuingBody: 'Unknown (Pending Verification)',
          dateIssued: new Date(),
          lifecycleStage: LifecycleStage.DISCOVERED,
          intelligenceScore: 25.0,
        }
      });
    }
  }
  console.log(`✅ Seeded ${certs.length} Certifications`);

  // 3. Seed Laboratories (Verified Only)
  const labs = [
    'Eurofins', 'SGS', 'Intertek', 'TÜV' // Removed generic 'Government labs' and 'NABL labs' (NABL is an accreditation, not a lab entity)
  ];

  for (const lab of labs) {
    await prisma.laboratory.upsert({
      where: { name: lab },
      update: {},
      create: {
        name: lab,
        lifecycleStage: LifecycleStage.APPROVED,
        intelligenceScore: 100.0,
      }
    });
  }
  console.log(`✅ Seeded ${labs.length} Laboratories`);

  // 4. Seed Retailers (Reference Entities)
  const retailers = [
    'Harrods', 'Waitrose', 'Lulu', 'Spinneys', 
    'Whole Foods', 'Amazon', "Nature's Basket"
  ];

  for (const r of retailers) {
    await prisma.retailer.upsert({
      where: { name: r },
      update: {},
      create: {
        name: r,
        lifecycleStage: LifecycleStage.APPROVED,
        intelligenceScore: 80.0,
      }
    });
  }
  console.log(`✅ Seeded ${retailers.length} Retailers`);

  // 5. Seed Competitors (Verified Only)
  await prisma.competitor.upsert({
    where: { name: 'Diaspora Co.' },
    update: {},
    create: {
      name: 'Diaspora Co.',
      description: 'Verified Competitor',
      lifecycleStage: LifecycleStage.KNOWLEDGE_GRAPH_UPDATED,
      intelligenceScore: 91.0,
      completenessBreakdown: {
        "companyInfo": 100,
        "products": 100,
        "pricing": 100,
        "packaging": 100,
        "labReports": 0,
        "exportNetwork": 0,
        "retailPresence": 100,
        "socialMedia": 100
      }
    }
  });
  console.log(`✅ Seeded 1 Competitor (Diaspora Co.)`);

  // ---------------------------------------------------------------------------
  // EMPTY PIPELINES (Strict Evidence-First Policy)
  // ---------------------------------------------------------------------------

  // Products
  const products: any[] = []; // No verifiable products provided yet.
  if (products.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Products (Policy: Unverified data prohibited)`);

  // Processors
  const processors: any[] = [];
  if (processors.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Processors (Policy: Unverified data prohibited)`);

  // Manufacturers
  const manufacturers: any[] = [];
  if (manufacturers.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Manufacturers (Policy: Unverified data prohibited)`);

  // Suppliers
  const suppliers: any[] = [];
  if (suppliers.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Suppliers (Policy: Unverified data prohibited)`);

  // Importers
  const importers: any[] = [];
  if (importers.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Importers (Policy: Unverified data prohibited)`);

  // Distributors
  const distributors: any[] = [];
  if (distributors.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Distributors (Policy: Unverified data prohibited)`);

  // Social Accounts
  const socialAccounts: any[] = [];
  if (socialAccounts.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Social Accounts (Policy: Unverified data prohibited)`);

  // Research Papers
  const researchPapers: any[] = [];
  if (researchPapers.length > 0) { /* Ingestion logic */ }
  console.log(`ℹ️ Seeded 0 Research Papers (Policy: Unverified data prohibited)`);

  console.log('✅ Ingestion complete. Paradise Knowledge Graph conforms to the Evidence-First Constitution.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
