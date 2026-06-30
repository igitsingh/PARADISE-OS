const fs = require('fs');

const path = 'prisma/schema.prisma';
let currentContent = fs.readFileSync(path, 'utf8');

// The new models we want to add:
const newModels = `
// -----------------------------------------------------------------------------
// NEW COMPETITIVE INTELLIGENCE MODELS (SPRINT)
// -----------------------------------------------------------------------------

model CompanyProfile {
  id                    String      @id @default(uuid())
  competitorId          String      @unique
  competitor            Competitor  @relation(fields: [competitorId], references: [id])
  parentCompany         String?
  legalEntity           String?
  founder               String?
  foundingYear          Int?
  headquarters          String?
  country               String?
  manufacturingLocations String[]
  processingLocations   String[]
  exportMarkets         String[]
  countriesSold         String[]
  officialEmail         String?
  officialPhone         String?
  officialWhatsApp      String?
  companyRegistration   String?
  gst                   String?
  fssai                 String?
  createdAt             DateTime    @default(now())
  updatedAt             DateTime    @updatedAt
}

model CurcuminIntelligence {
  id                  String   @id @default(uuid())
  productId           String?  @unique
  product             Product? @relation(fields: [productId], references: [id])
  skuId               String?  @unique
  sku                 SKU?     @relation(fields: [skuId], references: [id])
  curcuminPercent     Float?
  testingMethod       String?
  labName             String?
  certificateAvailable Boolean?
  coaPublished        Boolean?
  heavyMetalsTested   Boolean?
  microbiologyTested  Boolean?
  moisturePercent     Float?
  lead                String?
  arsenic             String?
  cadmium             String?
  mercury             String?
  steamSterilized     Boolean?
  cryogenic           Boolean?
  organic             Boolean?
  giTagged            Boolean?
  singleOrigin        Boolean?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model PackagingIntelligence {
  id                  String   @id @default(uuid())
  productId           String?
  product             Product? @relation(fields: [productId], references: [id])
  skuId               String?  @unique
  sku                 SKU?     @relation(fields: [skuId], references: [id])
  material            String?
  luxuryScore         Float?
  shelfImpact         Float?
  premiumScore        Float?
  ecoScore            Float?
  dimensions          String?
  weight              String?
  labelDesign         String?
  typography          String?
  brandColors         String?
  photographyStyle    String?
  unboxingExperience  String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model PricingIntelligence {
  id                  String   @id @default(uuid())
  skuId               String   @unique
  sku                 SKU      @relation(fields: [skuId], references: [id])
  websitePrice        Float?
  amazonPrice         Float?
  marketplacePrice    Float?
  retailPrice         Float?
  wholesalePrice      Float?
  distributorPrice    Float?
  costPerGram         Float?
  costPer100g         Float?
  costPerCurcuminPct  Float?
  premiumPositioning  String?
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model BrandPositioning {
  id             String     @id @default(uuid())
  competitorId   String     @unique
  competitor     Competitor @relation(fields: [competitorId], references: [id])
  tags           String[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model MarketingClaim {
  id             String     @id @default(uuid())
  competitorId   String?
  competitor     Competitor? @relation(fields: [competitorId], references: [id])
  productId      String?
  product        Product?   @relation(fields: [productId], references: [id])
  claim          String
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model WebsiteIntelligence {
  id             String     @id @default(uuid())
  websiteId      String     @unique
  website        Website    @relation(fields: [websiteId], references: [id])
  technologyStack String[]
  seoScore       Float?
  pageSpeedScore Float?
  uxScore        Float?
  premiumScore   Float?
  trustScore     Float?
  hasLabReports  Boolean?
  hasCertifications Boolean?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model CustomerIntelligence {
  id                      String   @id @default(uuid())
  competitorId            String?  @unique
  competitor              Competitor? @relation(fields: [competitorId], references: [id])
  productId               String?  @unique
  product                 Product? @relation(fields: [productId], references: [id])
  averageRating           Float?
  reviewCount             Int?
  mostLovedFeatures       String[]
  mostCommonComplaints    String[]
  frequentlyRequested     String[]
  customerSentiment       String?
  createdAt               DateTime @default(now())
  updatedAt               DateTime @updatedAt
}

model ExportIntelligence {
  id                  String     @id @default(uuid())
  competitorId        String     @unique
  competitor          Competitor @relation(fields: [competitorId], references: [id])
  countriesExported   String[]
  importers           String[]
  distributors        String[]
  retailPartners      String[]
  moq                 String?
  containerCapability String?
  exportCertifications String[]
  shippingInfo        String?
  createdAt           DateTime   @default(now())
  updatedAt           DateTime   @updatedAt
}

model SWOT {
  id             String     @id @default(uuid())
  competitorId   String     @unique
  competitor     Competitor @relation(fields: [competitorId], references: [id])
  strengths      String[]
  weaknesses     String[]
  opportunities  String[]
  threats        String[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model StrategicAnalysis {
  id                      String     @id @default(uuid())
  competitorId            String     @unique
  competitor              Competitor @relation(fields: [competitorId], references: [id])
  paradiseStronger        String[]
  paradiseWeaker          String[]
  whatToCopy              String[]
  whatToAvoid             String[]
  marketGaps              String[]
  pricingOpportunity      String[]
  packagingOpportunity    String[]
  brandingOpportunity     String[]
  websiteOpportunity      String[]
  researchOpportunity     String[]
  certificationOpportunity String[]
  exportOpportunity       String[]
  immediateActionItems    String[]
  longTermRecommendations String[]
  createdAt               DateTime   @default(now())
  updatedAt               DateTime   @updatedAt
}

model MarketplacePresence {
  id             String     @id @default(uuid())
  competitorId   String     @unique
  competitor     Competitor @relation(fields: [competitorId], references: [id])
  platforms      String[]
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}
`;

// Append models if they don't exist
if (!currentContent.includes("model CompanyProfile")) {
  currentContent += newModels;
}

// Now we need to update Competitor, Product, and SKU to have the new relations
// We'll just replace the models completely.
currentContent = currentContent.replace(/model Competitor \{[\s\S]*?\n\}/, `model Competitor {
  id          String  @id @default(uuid())
  name        String  @unique
  description String?

  products       Product[]
  meetings       Meeting[]
  websites       Website[]
  socialAccounts SocialAccount[]
  tradeShows     TradeShow[]

  // New Intelligence Domains
  companyProfile      CompanyProfile?
  brandPositioning    BrandPositioning?
  marketingClaims     MarketingClaim[]
  customerIntelligence CustomerIntelligence?
  exportIntelligence  ExportIntelligence?
  swot                SWOT?
  strategicAnalysis   StrategicAnalysis?
  marketplacePresence MarketplacePresence?

  lifecycleStage        LifecycleStage @default(DISCOVERED)
  intelligenceScore     Float          @default(0.0)
  completenessBreakdown Json?
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
}`);

currentContent = currentContent.replace(/model Product \{[\s\S]*?\n\}/, `model Product {
  id           String      @id @default(uuid())
  name         String
  competitorId String?
  competitor   Competitor? @relation(fields: [competitorId], references: [id])

  skus            SKU[]
  certifications  Certification[]
  researchPapers  ResearchPaper[]
  marketingAssets MarketingAsset[]
  reviews         Review[]

  // New Intelligence Domains
  curcuminIntelligence  CurcuminIntelligence?
  packagingIntelligence PackagingIntelligence[]
  marketingClaims       MarketingClaim[]
  customerIntelligence  CustomerIntelligence?

  lifecycleStage        LifecycleStage @default(DISCOVERED)
  intelligenceScore     Float          @default(0.0)
  completenessBreakdown Json?
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
}`);

currentContent = currentContent.replace(/model SKU \{[\s\S]*?\n\}/, `model SKU {
  id        String  @id @default(uuid())
  productId String
  product   Product @relation(fields: [productId], references: [id])
  code      String  @unique
  name      String

  // SKU specific fields
  weight        String?
  packagingType String?
  variant       String?
  mrp           Float?
  sellingPrice  Float?
  discount      Float?
  availability  String?
  launchDate    DateTime?
  discontinued  Boolean   @default(false)

  priceRecords    PriceRecord[]
  researchPapers  ResearchPaper[]
  marketingAssets MarketingAsset[]
  reviews         Review[]

  // New Intelligence Domains
  curcuminIntelligence  CurcuminIntelligence?
  packagingIntelligence PackagingIntelligence?
  pricingIntelligence   PricingIntelligence?

  lifecycleStage        LifecycleStage @default(DISCOVERED)
  intelligenceScore     Float          @default(0.0)
  completenessBreakdown Json?
  createdAt             DateTime       @default(now())
  updatedAt             DateTime       @updatedAt
}`);

currentContent = currentContent.replace(/model Website \{[\s\S]*?\n\}/, `model Website {
  id  String @id @default(uuid())
  url String @unique

  competitorId String?
  competitor   Competitor? @relation(fields: [competitorId], references: [id])
  supplierId   String?
  supplier     Supplier?   @relation(fields: [supplierId], references: [id])
  importerId   String?
  importer     Importer?   @relation(fields: [importerId], references: [id])
  retailerId   String?
  retailer     Retailer?   @relation(fields: [retailerId], references: [id])

  websiteIntelligence WebsiteIntelligence?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`);

fs.writeFileSync(path, currentContent, 'utf8');
