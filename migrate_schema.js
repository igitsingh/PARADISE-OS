const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(__dirname, 'src/db/intelligence');
const BRANDS_FILE = path.join(DB_DIR, 'brands', 'brands.json');
const ORGS_FILE = path.join(DB_DIR, 'brands', 'organizations.json');

if (fs.existsSync(BRANDS_FILE)) {
  const brandsData = JSON.parse(fs.readFileSync(BRANDS_FILE, 'utf-8'));
  
  const orgsData = brandsData.map(brand => {
    return {
      ...brand,
      roles: ["Competitor Brand"]
    };
  });
  
  fs.writeFileSync(ORGS_FILE, JSON.stringify(orgsData, null, 2));
  fs.unlinkSync(BRANDS_FILE); // Delete the old file
  console.log('Migrated brands.json to organizations.json');
} else {
  console.log('brands.json not found, skipping migration.');
}

// Create empty directories for new entities
const dirs = ['certifications', 'documents', 'lab-reports', 'market-trends', 'scientific-papers', 'events', 'internal-samples', 'pricing'];
dirs.forEach(dir => {
  const dirPath = path.join(DB_DIR, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    fs.writeFileSync(path.join(dirPath, `${dir.replace('-', '_')}.json`), '[]');
  }
});
console.log('Created knowledge graph directories and empty arrays.');
