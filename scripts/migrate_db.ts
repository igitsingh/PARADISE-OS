import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Migrating PR Exports from Competitor to Supplier...');
  
  // 1. Find Competitor PR Exports
  const competitors = await prisma.competitor.findMany({
    where: { name: { contains: 'PR Exports', mode: 'insensitive' } }
  });
  
  if (competitors.length > 0) {
    for (const comp of competitors) {
      console.log(`Deleting competitor: ${comp.name} (${comp.id})`);
      await prisma.competitor.delete({ where: { id: comp.id } });
    }
    console.log('Deleted from Competitors.');
  } else {
    console.log('PR Exports not found in Competitors.');
  }
  
  // 2. Check Supplier PR Exports
  const suppliers = await prisma.supplier.findMany({
    where: { name: { contains: 'PR Exports', mode: 'insensitive' } }
  });
  
  if (suppliers.length === 0) {
    console.log('Creating Supplier PR Exports...');
    await prisma.supplier.create({
      data: {
        name: 'PR Exports Ltd.',
        intelligenceScore: 90,
      }
    });
    console.log('Created Supplier PR Exports.');
  } else {
    console.log('Supplier PR Exports already exists.');
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
