import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

new_type = """export type CompetitorIntel = {
  idKeys: string[];
  name: string;
  company: string;
  entityType: string;
  location: string;
  marketTier: string;
  curcuminValue: number;
  websiteDisplay: string;
  websiteUrl: string;
  parentCompany?: string;
  legalEntity?: string;
  founder?: string;
  foundingYear?: string;
  headquarters?: string;
  country?: string;
  manufacturingLocations?: string;
  processingLocations?: string;
  exportMarkets?: string;
  countriesSold?: string;
  officialEmail?: string;
  curcuminDisplay?: string;
  heavyMetalsTested?: string;
  organic?: string;
  giTagged?: string;
  singleOrigin?: string;
  portfolio?: { name: string; variant: string; weight: string; mrp: string; status: string }[];
  packaging?: { primaryMaterial: string; luxuryScore: string; shelfImpact: string; ecoScore: string; labelDesign: string; brandColors: string; unboxingExperience: string };
  positioningTags?: string[];
  coreNarrative?: string;
  pricing?: { premiumPositioning: string; websitePrice: string; retailPrice: string; costPer100g: string };
  strategy?: { title: string; content: string };
  marketingClaims?: string[];
  socialMedia?: { instagram: string; facebook: string; linkedin: string; followers: string };
  websiteIntel?: { traffic: string; ecommercePlatform: string; uxScore: string };
  certifications?: string[];
  labReports?: { available: boolean; source: string };
  marketplace?: { amazon: string; flipkart: string; indiamart: string };
  swot?: { strengths: string[]; weaknesses: string[]; opportunities: string[]; threats: string[] };
};"""

pattern = r'export type CompetitorIntel = \{.*?\};'
content = re.sub(pattern, new_type, content, flags=re.DOTALL)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
