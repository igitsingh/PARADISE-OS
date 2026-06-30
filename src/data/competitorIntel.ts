export interface CompetitorIntel {
  idKeys: string[];
  name: string;
  company: string;
  entityType: string;
  location: string;
  marketTier: string;
  curcuminValue: number;
  websiteDisplay: string;
  websiteUrl: string;
  instagramUrl?: string | null;
  instagramHandle?: string | null;
  facebookUrl?: string | null;
  facebookHandle?: string | null;
  linkedinUrl?: string | null;
  linkedinHandle?: string | null;
  
  parentCompany: string | null;
  legalEntity: string | null;
  founder: string | null;
  foundingYear: string | null;
  headquarters: string | null;
  country: string | null;
  manufacturingLocations: string | null;
  processingLocations: string | null;
  exportMarkets: string | null;
  countriesSold: string | null;
  officialEmail: string | null;
  officialPhone?: string | null;
  companyRegistration?: string | null;
  gst?: string | null;
  fssai?: string | null;
  
  curcuminDisplay: string | null;
  heavyMetalsTested: string | null;
  organic: string | null;
  giTagged: string | null;
  singleOrigin: string | null;
  
  packaging?: {
    primaryMaterial: string;
    luxuryScore: string;
    shelfImpact: string;
    ecoScore: string;
    labelDesign: string;
    brandColors: string;
    unboxingExperience: string;
  };
  
  positioningTags: string[];
  coreNarrative: string | null;
  
  pricing?: {
    premiumPositioning: string;
    websitePrice: string;
    retailPrice: string;
    costPer100g: string;
  };
  
  strategy?: {
    title: string;
    content: string;
  };
  
  portfolio?: {
    name: string;
    variant: string;
    weight: string;
    mrp: string;
    status: string;
  }[];
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    followers?: string;
  };
  websiteIntel?: {
    traffic: string;
    ecommercePlatform: string;
    uxScore: string;
  };
  certifications?: string[];
  labReports?: {
    available: boolean;
    source: string;
  };
  marketplace?: {
    amazon?: string;
    flipkart?: string;
    indiamart?: string;
  };
  swot?: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
}

export const competitorData: Record<string, CompetitorIntel> = {

  "org-getfitsquad": {
    "idKeys": ["org-getfitsquad", "brand_ecxy104a2yi253wmhd43n1"],
    "name": "GetFitSquad",
    "company": "GetFitSquad",
    "entityType": "Fitness App / Ecosystem",
    "location": "India",
    "marketTier": "Niche Premium",
    "curcuminValue": 0,
    "websiteDisplay": "getfitsquad.life",
    "websiteUrl": "https://getfitsquad.life",
    "instagramUrl": "https://instagram.com/getfitsquad.life",
    "instagramHandle": "@getfitsquad.life",
    "facebookUrl": null,
    "facebookHandle": null,
    "linkedinUrl": "https://linkedin.com/company/getfitsquad",
    "linkedinHandle": "GetFitSquad",
    "parentCompany": "Unknown",
    "legalEntity": "Unknown",
    "founder": "Unknown",
    "foundingYear": "Unknown",
    "headquarters": "Unknown",
    "country": "India",
    "manufacturingLocations": "Unknown",
    "processingLocations": "Unknown",
    "exportMarkets": "Unknown",
    "countriesSold": "Unknown",
    "officialEmail": "Not Publicly Available",
    "officialPhone": "Not Publicly Available",
    "companyRegistration": "Not Publicly Available",
    "gst": "Not Publicly Available",
    "fssai": "Not Publicly Available",
    "curcuminDisplay": "N/A",
    "heavyMetalsTested": "Unknown",
    "organic": "Unknown",
    "giTagged": "Unknown",
    "singleOrigin": "Unknown",
    "packaging": {
      "primaryMaterial": "N/A",
      "luxuryScore": "N/A",
      "shelfImpact": "N/A",
      "ecoScore": "N/A",
      "labelDesign": "N/A",
      "brandColors": "N/A",
      "unboxingExperience": "N/A"
    },
    "positioningTags": ["Holistic fitness approach"],
    "coreNarrative": "A fitness ecosystem focusing on overall health and coaching.",
    "pricing": {
      "premiumPositioning": "Not Publicly Available",
      "websitePrice": "Not Publicly Available",
      "retailPrice": "Not Publicly Available",
      "costPer100g": "Not Publicly Available"
    },
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Low",
      "ecommercePlatform": "N/A",
      "uxScore": "N/A"
    },
    "certifications": ["Not Publicly Available"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "No",
      "flipkart": "No",
      "indiamart": "No"
    },
    "swot": {
      "strengths": ["Holistic fitness approach"],
      "weaknesses": ["Not a CPG product brand"],
      "opportunities": ["Health coaching partnerships"],
      "threats": ["Traditional apps"]
    },
    "strategy": {
      "title": "How to beat GetFitSquad?",
      "content": "GetFitSquad is not a direct product competitor but an ecosystem. Paradise OS can partner with fitness influencers or focus on pure premium supplement delivery."
    }
  },
  "diaspora": {
    "idKeys": ["brand-diaspora", "org-diaspora"],
    "name": "Diaspora Co.",
    "company": "diaspora co. llc",
    "entityType": "dtc brand / importer",
    "location": "oakland, california",
    "marketTier": "ultra premium",
    "curcuminValue": 4.7,
    "websiteDisplay": "diasporaco.com",
    "websiteUrl": "https://diasporaco.com",
    "instagramUrl": "https://instagram.com/diasporaco",
    "instagramHandle": "@diasporaco",
    "facebookUrl": "https://facebook.com/diasporaco",
    "facebookHandle": "Diaspora Co.",
    "parentCompany": "Diaspora Co.",
    "legalEntity": "Diaspora Co. LLC",
    "founder": "Sana Javeri Kadri",
    "foundingYear": "2017",
    "headquarters": "Oakland, California",
    "country": "USA",
    "manufacturingLocations": "Unknown",
    "processingLocations": "Unknown",
    "exportMarkets": "USA, Canada",
    "countriesSold": "USA, Canada",
    "officialEmail": "hello@diasporaco.com",
    "curcuminDisplay": "4.7 - 5.2%",
    "heavyMetalsTested": "Yes (Claimed)",
    "organic": "Regenerative (Not Certified Organic)",
    "giTagged": "No",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar / Tin Box",
      "luxuryScore": "9.2 / 10",
      "shelfImpact": "High (Vibrant Colors)",
      "ecoScore": "8.5 / 10 (Recyclable)",
      "labelDesign": "Minimalist, bold typography",
      "brandColors": "Deep Yellow, Red, Green",
      "unboxingExperience": "Ultra Premium"
    },
    "positioningTags": ["Farmer-first", "Sustainable"],
    "coreNarrative": "De-colonizing the spice trade through direct partnerships, paying living wages, and prioritizing flavor and freshness over commodity bulk.",
    "pricing": {
      "premiumPositioning": "Ultra Premium",
      "websitePrice": "$12.00 (approx. \u20b91000)",
      "retailPrice": "$14.00",
      "costPer100g": "\u20b91,886 (Highest)"
    },
    "strategy": {
      "title": "How to beat Diaspora Co?",
      "content": "Diaspora Co. relies entirely on their brand narrative (de-colonization, living wages). Their actual product specs (4.7% curcumin) are vastly inferior to Meghalaya Lakadong turmeric. Paradise OS can destroy their value proposition by highlighting the massive gap in Curcumin % while maintaining an equally ethical (if not better) direct-to-farmer model. They sell a story; Paradise sells empirical superiority wrapped in a story."
    },
    "portfolio": [
      {
        "name": "Pragati Turmeric",
        "variant": "Glass Jar",
        "weight": "53g (1.87 oz)",
        "mrp": "$12.00",
        "status": "Active"
      },
      {
        "name": "Pragati Turmeric",
        "variant": "Tin Refill",
        "weight": "100g",
        "mrp": "$18.00",
        "status": "Active"
      }
    ]
  },
  "pahadi": {
    "idKeys": ["brand_8dk94cfjq53q7ht21hx6l", "org-my-pahadi-dukan"],
    "name": "My Pahadi Dukan",
    "company": "himkart india private limited",
    "entityType": "d2c marketplace",
    "location": "roorkee, uttarakhand",
    "marketTier": "premium",
    "curcuminValue": 8.0,
    "websiteDisplay": "mypahadidukan.com",
    "websiteUrl": "https://mypahadidukan.com",
    "instagramUrl": "https://instagram.com/mypahadidukan",
    "instagramHandle": "@mypahadidukan",
    "facebookUrl": "https://facebook.com/mypahadidukan",
    "facebookHandle": "My Pahadi Dukan",
    "parentCompany": "HIMKART INDIA PRIVATE LIMITED",
    "legalEntity": "HIMKART INDIA PRIVATE LIMITED",
    "founder": "Himanshu Dua, Shubham Tandon",
    "foundingYear": "2021",
    "headquarters": "Roorkee, Uttarakhand",
    "country": "India",
    "manufacturingLocations": "Unknown",
    "processingLocations": "Unknown",
    "exportMarkets": "Global",
    "countriesSold": "India, USA",
    "officialEmail": "support@mypahadidukan.com",
    "curcuminDisplay": "8.0 - 10.0%",
    "heavyMetalsTested": "No (Unverified)",
    "organic": "Organic",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Kraft Pouch / Glass Jar",
      "luxuryScore": "7.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "8.0 / 10",
      "labelDesign": "Earthy, Rustic",
      "brandColors": "Brown, Green",
      "unboxingExperience": "Premium"
    },
    "positioningTags": ["Premium", "Purity-focused"],
    "coreNarrative": "Sourcing authentic, high-quality wellness products from Himalayan farmers to the global market.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "\u20b9450",
      "retailPrice": "\u20b9499",
      "costPer100g": "\u20b9180"
    },
    "strategy": {
      "title": "How to beat My Pahadi Dukan?",
      "content": "My Pahadi Dukan is an aggregator/marketplace, not a single-brand entity. Their weakness is brand dilution. They sell multiple brands, meaning they cannot guarantee single-origin consistency across their entire catalog. Paradise OS can win by being a vertically integrated, hyper-focused brand with superior clinical aesthetics."
    },
    "portfolio": [
      {
        "name": "Meghalaya Lakadong Turmeric",
        "variant": "Kraft Pouch",
        "weight": "250g",
        "mrp": "\u20b9450",
        "status": "Active"
      }
    ]
  },
  "niraam": {
    "idKeys": ["brand-niraam", "org-niraam"],
    "name": "Niraam Superfoods",
    "company": "navitrade overseas pvt. ltd.",
    "entityType": "dtc brand",
    "location": "kolkata, west bengal",
    "marketTier": "premium",
    "curcuminValue": 7.0,
    "websiteDisplay": "niraam.com",
    "websiteUrl": "https://niraam.com",
    "instagramUrl": "https://instagram.com/niraam.official",
    "instagramHandle": "niraam.official",
    "facebookUrl": "https://www.facebook.com/share/1E52CYUi9z/?mibextid=wwXIfr",
    "facebookHandle": "Niraam Superfoods",
    "socialMedia": {
      "instagram": "niraam.official",
      "facebook": "Niraam Superfoods",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "Navitrade Overseas Pvt. Ltd.",
    "legalEntity": "Navitrade Overseas Pvt. Ltd.",
    "founder": "Nishtha",
    "foundingYear": "Unknown",
    "headquarters": "Kolkata, West Bengal",
    "country": "India",
    "manufacturingLocations": "Unknown",
    "processingLocations": "Unknown",
    "exportMarkets": "Global",
    "countriesSold": "India",
    "officialEmail": "contact@niraam.com",
    "curcuminDisplay": "7.0%+",
    "heavyMetalsTested": "Unknown",
    "organic": "Claimed (Uncertified)",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Kraft Pouch / Plastic Jar",
      "luxuryScore": "6.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "7.0 / 10",
      "labelDesign": "Clean, Modern",
      "brandColors": "Yellow, White",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Premium", "Purity-focused"],
    "coreNarrative": "Providing clean, honest superfoods without impurities for daily use, straight from the source.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "\u20b9399",
      "retailPrice": "\u20b9450",
      "costPer100g": "\u20b9159"
    },
    "strategy": {
      "title": "How to beat Niraam Superfoods?",
      "content": "Niraam is a generic 'clean superfood' brand. Their branding lacks the deep heritage or the extreme scientific rigor needed for ultra-premium positioning. Paradise can outperform them by offering complete supply chain transparency (COAs on blockchain) and a much higher luxury brand appeal."
    },
    "portfolio": [
      {
        "name": "Lakadong Turmeric",
        "variant": "Jar",
        "weight": "250g",
        "mrp": "\u20b9399",
        "status": "Active"
      }
    ]
  },
  "maatru": {
    "idKeys": ["brand_vbi45fkyzibqpdp21m5h", "org-maatru-rasah"],
    "name": "Maatru Rasah",
    "company": "prof impetus llp",
    "entityType": "artisanal dtc brand",
    "location": "prayagraj, uttar pradesh",
    "marketTier": "premium artisanal",
    "curcuminValue": 9.5,
    "websiteDisplay": "maatrurasah.com",
    "websiteUrl": "https://maatrurasah.com",
    "instagramUrl": "https://instagram.com/maatrurasah",
    "instagramHandle": "@maatrurasah",
    "facebookUrl": "https://facebook.com/maatrurasah",
    "facebookHandle": "Maatru Rasah",
    "parentCompany": "Prof Impetus LLP",
    "legalEntity": "Prof Impetus LLP",
    "founder": "Dr. (CS) Puja Shree Agarwal",
    "foundingYear": "2013",
    "headquarters": "Prayagraj, Uttar Pradesh",
    "country": "India",
    "manufacturingLocations": "Prayagraj (Handmade)",
    "processingLocations": "Jaintia Hills, Meghalaya",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "info@maatrurasah.com",
    "curcuminDisplay": "7.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural/Traditional",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar / Tin",
      "luxuryScore": "8.0 / 10",
      "shelfImpact": "High (Traditional)",
      "ecoScore": "8.5 / 10",
      "labelDesign": "Traditional, Heritage",
      "brandColors": "Gold, Deep Red",
      "unboxingExperience": "Premium Heritage"
    },
    "positioningTags": ["Artisanal", "Heritage", "Small Batch"],
    "coreNarrative": "A mother's essence. Heritage recipes from 1857, stone-ground in small batches without machinery.",
    "pricing": {
      "premiumPositioning": "Premium Artisanal",
      "websitePrice": "\u20b9550",
      "retailPrice": "\u20b9599",
      "costPer100g": "\u20b9220"
    },
    "strategy": {
      "title": "How to beat Maatru Rasah?",
      "content": "Maatru Rasah focuses entirely on nostalgia and 'handmade' heritage. They are extremely strong in the 'traditional purity' segment but lack modern clinical validation. Paradise OS can beat them by combining traditional sourcing with modern clinical validation (lab tests, precise curcumin profiling, heavy metal testing) to capture the modern, science-driven consumer."
    },
    "portfolio": [
      {
        "name": "Stone-ground Lakadong Turmeric",
        "variant": "Glass Jar",
        "weight": "250g",
        "mrp": "\u20b9550",
        "status": "Active"
      }
    ]
  },
  "twobrothers": {
    "idKeys": ["brand_sgmm851kbl6cewm406l2b", "org-two-brothers-organic-farms", "brand_vbix0z7r13x968q5j9p2", "org-tbo-farms"],
    "name": "Two Brothers Organic Farms",
    "company": "two brothers organic farms",
    "entityType": "regenerative dtc brand",
    "location": "pune, maharashtra",
    "marketTier": "premium mass",
    "curcuminValue": 10.43,
    "websiteDisplay": "twobrothersindiashop.com",
    "websiteUrl": "https://twobrothersindiashop.com",
    "instagramUrl": "https://instagram.com/twobrothersorganicfarmsindia",
    "instagramHandle": "@twobrothersorganicfarmsindia",
    "facebookUrl": "https://facebook.com/twobrothersorganicfarms",
    "facebookHandle": "Two Brothers Organic Farms",
    "parentCompany": "Two Brothers Organic Farms",
    "legalEntity": "Two Brothers Organic Farms",
    "founder": "Satyajit & Ajinkya Hange",
    "foundingYear": "2011",
    "headquarters": "Pune, Maharashtra",
    "country": "India",
    "manufacturingLocations": "Bhodani, Maharashtra",
    "processingLocations": "Bhodani, Maharashtra",
    "exportMarkets": "Global (40+ Countries)",
    "countriesSold": "India",
    "officialEmail": "info@twobrothersindiashop.com",
    "curcuminDisplay": "10.43%",
    "heavyMetalsTested": "Unknown",
    "organic": "Regenerative Organic",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Glass Jar",
      "luxuryScore": "8.5 / 10",
      "shelfImpact": "High (Clean, Earthy)",
      "ecoScore": "9.0 / 10 (Recyclable)",
      "labelDesign": "Modern, Trustworthy",
      "brandColors": "Off-white, Deep Yellow, Brown",
      "unboxingExperience": "Premium"
    },
    "positioningTags": ["Regenerative", "Farmer-led", "Sustainable"],
    "coreNarrative": "Regenerative farming by fourth-generation farmers, bringing chemical-free, natural food from village to global homes.",
    "pricing": {
      "premiumPositioning": "Premium Mass",
      "websitePrice": "\u20b9650",
      "retailPrice": "\u20b9650",
      "costPer100g": "\u20b9260"
    },
    "strategy": {
      "title": "How to beat Two Brothers Organic Farms?",
      "content": "Two Brothers dominates the regenerative/organic mass-premium market in India. Their strength is their massive distribution and authentic farmer story. However, their branding is still highly 'farm-centric'. To beat them, Paradise must pivot away from 'farm aesthetics' and lean entirely into 'Clinical Luxury'. We don't compete as farmers; we compete as an elite, science-backed neutraceutical brand."
    },
    "portfolio": [
      {
        "name": "Lakadong Turmeric",
        "variant": "Glass Jar",
        "weight": "250g",
        "mrp": "\u20b9650",
        "status": "Active"
      }
    ]
  },
  "trinay": {
    "idKeys": ["brand_ubgq8665djjkxzqbjp2k", "org-trinay-ayurveda"],
    "name": "Trinay Ayurveda",
    "company": "trinay ayurveda",
    "entityType": "ayurvedic wellness brand",
    "location": "hyderabad, telangana",
    "marketTier": "unknown",
    "curcuminValue": 0.0,
    "websiteDisplay": "trinaya.co.in",
    "websiteUrl": "https://trinaya.co.in",
    "instagramUrl": "https://www.instagram.com/trinaya_by_kottakkal?igsh=N3N6ZmhnYm95aGF5",
    "facebookUrl": "https://www.facebook.com/people/Trinaya-by-Kottakkal/61581656956006/",
    "socialMedia": {
      "instagram": "trinaya_by_kottakkal",
      "facebook": "Trinaya by Kottakkal",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "Trinay Ayurveda",
    "legalEntity": "Trinay Ayurveda",
    "founder": "Atul & Charu",
    "foundingYear": "2020",
    "headquarters": "Hyderabad, Telangana",
    "country": "India",
    "manufacturingLocations": "Hyderabad",
    "processingLocations": "Hyderabad",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "contact@trinaya.co.in",
    "curcuminDisplay": "95% Curcuminoids (Stated)",
    "heavyMetalsTested": "Unknown",
    "organic": "Ayurvedic/Herbal",
    "giTagged": "Unknown",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Unknown",
      "luxuryScore": "N/A",
      "shelfImpact": "N/A",
      "ecoScore": "Unknown",
      "labelDesign": "Standard Ayurvedic",
      "brandColors": "Unknown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Ayurvedic", "Clinical/Wellness", "Traditional"],
    "coreNarrative": "Ayurvedic wellness and clean, conscious herbal products focused on traditional medicinal purity.",
    "pricing": {
      "premiumPositioning": "Standard Mass",
      "websitePrice": "~ \u20b980",
      "retailPrice": "Unknown",
      "costPer100g": "\u20b980"
    },
    "strategy": {
      "title": "How to beat Trinay Ayurveda?",
      "content": "Trinay competes in the standard Ayurvedic supplement market. They do not have the high-end luxury appeal or the verifiable Lakadong GI story. Paradise can out-position them purely on brand aesthetics, modern science, and absolute premium quality, treating turmeric as an advanced nutraceutical rather than a basic herbal powder."
    },
    "portfolio": [
      {
        "name": "Turmeric / Haldi Powder",
        "variant": "Pouch / Box",
        "weight": "100g - 250g",
        "mrp": "~ \u20b980",
        "status": "Active"
      }
    ]
  },
  "jaintiagold": {
    "idKeys": ["brand-jaintiagold"],
    "name": "Jaintia Gold",
    "company": "jaintia gold (cooperative/brand)",
    "entityType": "wholesale / b2b brand",
    "location": "jaintia hills, meghalaya",
    "marketTier": "premium regional",
    "curcuminValue": 7.5,
    "websiteDisplay": "unknown",
    "websiteUrl": "#",
    "parentCompany": "Unknown",
    "legalEntity": "Unknown",
    "founder": "Atul & Charu",
    "foundingYear": "2020",
    "headquarters": "Jaintia Hills, Meghalaya",
    "country": "India",
    "manufacturingLocations": "Meghalaya",
    "processingLocations": "Meghalaya",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "7.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Pending Verification",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Bulk / Wholesale Sacks",
      "luxuryScore": "2.0 / 10",
      "shelfImpact": "Low",
      "ecoScore": "Unknown",
      "labelDesign": "Basic Wholesale",
      "brandColors": "Yellow",
      "unboxingExperience": "None"
    },
    "positioningTags": ["Authentic", "GI Tagged", "Regional", "Wholesale"],
    "coreNarrative": "Authentic Lakadong turmeric sourced directly from the GI-tagged Jaintia Hills region.",
    "pricing": {
      "premiumPositioning": "Wholesale Premium",
      "websitePrice": "N/A",
      "retailPrice": "₹150 - ₹300 (per 100g via third-party)",
      "costPer100g": "₹150"
    },
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "0"
    },
    "websiteIntel": {
      "traffic": "N/A",
      "ecommercePlatform": "Third-Party (IndiaMART / Amazon)",
      "uxScore": "N/A"
    },
    "certifications": ["Geographical Indication (GI) - Claimed"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Active via Resellers",
      "flipkart": "Active via Resellers",
      "indiamart": "Active (Wholesale)"
    },
    "swot": {
      "strengths": ["Geographic Authenticity", "High Curcumin Content"],
      "weaknesses": ["No DTC Brand Equity", "No Quality Control Transparency", "Poor Packaging"],
      "opportunities": ["B2B Supply", "White-labeling"],
      "threats": ["Adulteration by resellers", "Rise of premium DTC brands"]
    },
    "strategy": {
      "title": "How to beat Jaintia Gold?",
      "content": "Jaintia Gold acts more as a regional identifier/cooperative brand for Lakadong. They have immense authenticity but lack national D2C brand equity and modern premium packaging. Paradise OS can leverage the same geographic authenticity but wrap it in an ultra-premium, trusted, clinically-tested brand."
    }
  },
  "naki": {
    "idKeys": ["brand_t7cx2ibe8hn0jnsc4xve1n7", "org-naki"],
    "name": "NAKI",
    "company": "naki store",
    "entityType": "d2c brand",
    "location": "jaintia hills, meghalaya",
    "marketTier": "premium",
    "curcuminValue": 8.0,
    "websiteDisplay": "nakistore.in",
    "websiteUrl": "https://nakistore.in",
    "parentCompany": "Naki Store",
    "legalEntity": "Naki",
    "founder": "Dawhoi Dhar",
    "foundingYear": "2022",
    "headquarters": "Jaintia Hills, Meghalaya",
    "country": "India",
    "manufacturingLocations": "Meghalaya",
    "processingLocations": "Meghalaya",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "nakistore.in@gmail.com",
    "officialPhone": "Not Publicly Available",
    "companyRegistration": "Not Publicly Available",
    "gst": "Not Publicly Available",
    "fssai": "Available (See Certifications)",
    "curcuminDisplay": "8.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "portfolio": [
      { "name": "NAKI Premium Lakadong Turmeric", "variant": "Powder", "weight": "100g", "mrp": "₹250", "status": "Active" }
    ],
    "packaging": {
      "primaryMaterial": "Eco-friendly Pouches",
      "luxuryScore": "5.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "High",
      "labelDesign": "Minimalist Earthy",
      "brandColors": "Yellow & Kraft Brown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Authentic", "Founder Led", "Regional Pride"],
    "coreNarrative": "Sharing the authentic flavors and essence of Meghalaya with a global audience.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "₹250 (100g)",
      "retailPrice": "₹250",
      "costPer100g": "₹250"
    },
    "socialMedia": {
      "instagram": "@nakistore.in",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "3,400+"
    },
    "websiteIntel": {
      "traffic": "Low",
      "ecommercePlatform": "Shopify/WooCommerce",
      "uxScore": "Medium"
    },
    "certifications": ["FSSAI"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "Not Active",
      "indiamart": "Active"
    },
    "swot": {
      "strengths": ["Authentic Founder Story", "Direct Sourcing"],
      "weaknesses": ["Low Brand Awareness Outside Meghalaya", "Basic Packaging"],
      "opportunities": ["B2B Export", "Premium Retail Placement"],
      "threats": ["Larger heavily funded D2C brands"]
    },
    "strategy": {
      "title": "How to beat NAKI?",
      "content": "NAKI has a strong authentic founder story (Dawhoi Dhar) directly from the region. Paradise OS can beat them by out-branding them on luxury appeal, scientific formulation (piperine pairing), and clinical transparency, taking Lakadong from a 'regional specialty' to an 'elite bio-hacking supplement'."
    }
  },
  "neetacha": {
    "idKeys": ["brand_pps6m92ib1ozn5oa4u39z", "org-neetacha-spices"],
    "name": "Neetacha Spices",
    "company": "neetacha spices",
    "entityType": "d2c brand",
    "location": "India",
    "marketTier": "premium",
    "curcuminValue": 9.0,
    "websiteDisplay": "neetacha.com",
    "websiteUrl": "https://neetacha.com",
    "parentCompany": "Neetacha Spices",
    "legalEntity": "Neetacha Spices",
    "founder": "Atul & Charu",
    "foundingYear": "2020",
    "headquarters": "Unknown",
    "country": "India",
    "manufacturingLocations": "Unknown",
    "processingLocations": "Unknown",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "3x Standard (Approx 9%)",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural",
    "giTagged": "Unknown (Himalayan)",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Pouch / Box",
      "luxuryScore": "6.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "Unknown",
      "labelDesign": "Standard Commercial",
      "brandColors": "Unknown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Cryogenic Grinding", "High Potency", "Aromatic"],
    "coreNarrative": "Cryogenically ground Himalayan turmeric (-196\u00b0C) to preserve essential oils, delivering 3x higher curcumin and 4x stronger aroma.",
    "pricing": {
      "premiumPositioning": "Premium Mass",
      "websitePrice": "\u20b9106",
      "retailPrice": "\u20b9125",
      "costPer100g": "\u20b9106"
    },
    "strategy": {
      "title": "How to beat Neetacha Spices?",
      "content": "Neetacha wins on processing tech (cryogenic grinding). Paradise OS can counter this by emphasizing the actual raw material superiority (Lakadong GI vs generic Himalayan) and matching their processing claims, while offering a vastly superior luxury brand experience."
    },
    "socialMedia": {
      "instagram": "neetachaspices",
      "facebook": "Neetacha Spices",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Low",
      "ecommercePlatform": "Shopify",
      "uxScore": "Medium"
    },
    "certifications": ["Not Publicly Available"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "Yes",
      "flipkart": "Yes",
      "indiamart": "No"
    },
    "swot": {
      "strengths": ["Cryogenic Grinding Tech", "High Potency Claims"],
      "weaknesses": ["Generic Source Material", "Standard Packaging"],
      "opportunities": ["B2B bulk sales"],
      "threats": ["Premium Single-Origin brands"]
    },
    "companyRegistration": "Not Publicly Available",
    "gst": "Not Publicly Available",
    "fssai": "Not Publicly Available",
    "officialPhone": "Not Publicly Available"
  },
  "organicmandya": {
    "idKeys": ["brand_2t82dvd5g1oj4xqygrj96s", "org-organic-mandya"],
    "name": "Organic Mandya",
    "company": "organic mandya",
    "entityType": "farmer cooperative / d2c",
    "location": "mandya, karnataka",
    "marketTier": "premium mass",
    "curcuminValue": 7.0,
    "websiteDisplay": "organicmandya.com",
    "websiteUrl": "https://organicmandya.com",
    "instagramUrl": "https://www.instagram.com/organicmandya/",
    "facebookUrl": "https://www.facebook.com/organicmandya/",
    "socialMedia": {
      "instagram": "organicmandya",
      "facebook": "organicmandya",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "Organic Mandya",
    "legalEntity": "Organic Mandya",
    "founder": "Madhu Chandan",
    "foundingYear": "Unknown",
    "headquarters": "Mandya, Karnataka",
    "country": "India",
    "manufacturingLocations": "Mandya",
    "processingLocations": "Mandya",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "High (Specific % Unknown)",
    "heavyMetalsTested": "Unknown",
    "organic": "Organic",
    "giTagged": "Lakadong (for specific SKUs)",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Kraft Pouch",
      "luxuryScore": "6.5 / 10",
      "shelfImpact": "Medium (Rustic)",
      "ecoScore": "8.0 / 10",
      "labelDesign": "Earthy, Authentic",
      "brandColors": "Brown, Green",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Organic", "Farmer Cooperative", "Chemical-free"],
    "coreNarrative": "Supporting local farmers through an organic cooperative, delivering chemical-free, traditionally harvested crops.",
    "pricing": {
      "premiumPositioning": "Premium Mass",
      "websitePrice": "Unknown",
      "retailPrice": "Unknown",
      "costPer100g": "Unknown"
    },
    "strategy": {
      "title": "How to beat Organic Mandya?",
      "content": "Organic Mandya has strong grassroots authenticity but operates heavily in the regional mass-premium space. Paradise OS should differentiate by positioning as an elite, science-backed global brand, appealing to the top 1% of health-conscious consumers."
    }
  },
  "prexports": {
    "idKeys": ["brand_qai8yjncj1ppyipggjd819", "org-pr-exports-ltd-"],
    "name": "PR Exports Ltd.",
    "company": "pr exports ltd.",
    "entityType": "b2b supplier / exporter",
    "location": "kolkata, west bengal",
    "marketTier": "bulk commodity",
    "curcuminValue": 8.0,
    "websiteDisplay": "prel.in",
    "websiteUrl": "https://prel.in",
    "socialMedia": {
      "instagram": "masala_mundi",
      "facebook": "PRExportsLtd",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "PR Exports Ltd.",
    "legalEntity": "PR Exports Ltd.",
    "founder": "Atul & Charu",
    "foundingYear": "2020",
    "headquarters": "Kolkata, West Bengal",
    "country": "India",
    "manufacturingLocations": "Kalyani, West Bengal",
    "processingLocations": "Kalyani, West Bengal",
    "exportMarkets": "Global",
    "countriesSold": "Global",
    "officialEmail": "Unknown",
    "curcuminDisplay": "7.0 - 9.0%",
    "heavyMetalsTested": "Batch-wise (Claimed)",
    "organic": "Conventional / Natural",
    "giTagged": "Lakadong (Sourced)",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Bulk Packaging",
      "luxuryScore": "N/A",
      "shelfImpact": "N/A",
      "ecoScore": "N/A",
      "labelDesign": "B2B Standard",
      "brandColors": "Unknown",
      "unboxingExperience": "N/A"
    },
    "positioningTags": ["B2B Supplier", "Bulk", "Export Quality"],
    "coreNarrative": "Reliable bulk supplier and manufacturer of processed spices including high-curcumin Lakadong and Assam Black Turmeric.",
    "pricing": {
      "premiumPositioning": "Wholesale",
      "websitePrice": "Bulk Pricing",
      "retailPrice": "Bulk Pricing",
      "costPer100g": "Bulk Pricing"
    },
    "strategy": {
      "title": "How to beat PR Exports Ltd?",
      "content": "PR Exports is a B2B supplier, not a direct D2C competitor. Paradise OS could potentially use them (or companies like them) as a supply chain partner, but as a brand, Paradise OS operates in a completely different, consumer-facing luxury tier."
    }
  },
  "simplyorganic": {
    "idKeys": ["brand_iuduruqnmkpnh6b1uv6jxg", "org-simply-organic"],
    "name": "Simply Organic",
    "company": "frontier co-op",
    "entityType": "retail spice brand",
    "location": "norway, iowa (usa)",
    "marketTier": "premium mass",
    "curcuminValue": 4.0,
    "websiteDisplay": "simplyorganic.com",
    "websiteUrl": "https://simplyorganic.com",
    "socialMedia": {
      "instagram": "simplyorganicfoods",
      "facebook": "SimplyOrganic",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "Frontier Co-op",
    "legalEntity": "Frontier Co-op",
    "founder": "Unknown",
    "foundingYear": "2001",
    "headquarters": "Norway, Iowa (USA)",
    "country": "USA",
    "manufacturingLocations": "USA",
    "processingLocations": "USA",
    "exportMarkets": "Global",
    "countriesSold": "Global",
    "officialEmail": "Unknown",
    "curcuminDisplay": "Approx 4.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Certified Organic",
    "giTagged": "No",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Glass Jar",
      "luxuryScore": "7.5 / 10",
      "shelfImpact": "High (Clean, Uniform)",
      "ecoScore": "8.0 / 10",
      "labelDesign": "Clean, Corporate",
      "brandColors": "Green, White",
      "unboxingExperience": "Standard Retail"
    },
    "positioningTags": ["Certified Organic", "Culinary Spice", "Non-GMO"],
    "coreNarrative": "Providing certified organic, non-GMO, and kosher culinary spices and seasonings for everyday cooking.",
    "pricing": {
      "premiumPositioning": "Premium Mass",
      "websitePrice": "$6.00 - $8.00",
      "retailPrice": "$8.00",
      "costPer100g": "Unknown"
    },
    "strategy": {
      "title": "How to beat Simply Organic?",
      "content": "Simply Organic is a culinary spice brand with low curcumin content (~4%), not a clinical supplement. Paradise OS targets a different market (health/wellness/supplements). Paradise OS wins by educating the consumer that culinary turmeric is insufficient for clinical health benefits, upselling them to a 10%+ curcumin Lakadong product."
    }
  },
  "tatvahills": {
    "idKeys": ["brand_07zpldbrwnb8geu3woul7vp", "org-tatvahills-superfoods"],
    "name": "TatvaHills Superfoods",
    "company": "tatvahills superfoods",
    "entityType": "d2c brand",
    "location": "uttarakhand, india",
    "marketTier": "premium",
    "curcuminValue": 7.0,
    "websiteDisplay": "tatvahills-superfoods.com",
    "websiteUrl": "https://tatvahills-superfoods.com",
    "socialMedia": {
      "instagram": "tatvahills",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "TatvaHills Superfoods",
    "legalEntity": "TatvaHills Superfoods",
    "founder": "Atul & Charu",
    "foundingYear": "2020",
    "headquarters": "Uttarakhand, India",
    "country": "India",
    "manufacturingLocations": "India",
    "processingLocations": "India",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "Up to 7.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Jar",
      "luxuryScore": "6.5 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "Unknown",
      "labelDesign": "Modern Wellness",
      "brandColors": "Unknown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Bioavailable", "Blended", "Himalayan Roots"],
    "coreNarrative": "Premium Lakadong turmeric blended with Tellicherry black pepper for maximum curcumin bioavailability and immune support.",
    "pricing": {
      "premiumPositioning": "Premium",
      "websitePrice": "Unknown",
      "retailPrice": "Unknown",
      "costPer100g": "Unknown"
    },
    "strategy": {
      "title": "How to beat TatvaHills Superfoods?",
      "content": "TatvaHills correctly incorporates black pepper (piperine) for bioavailability. Paradise OS MUST include a piperine/lipid absorption matrix in its formulation to compete functionally, while vastly outperforming TatvaHills in brand aesthetics, luxury perception, and clinical transparency."
    }
  },
  "tribalfactory": {
    "idKeys": ["brand-tribalfactory", "org-tribalfactory"],
    "name": "Tribal Factory",
    "company": "trifac agro private limited",
    "entityType": "social enterprise / d2c",
    "location": "india",
    "marketTier": "premium",
    "curcuminValue": 9.5,
    "websiteDisplay": "tribalfactory.in",
    "websiteUrl": "https://tribalfactory.in",
    "instagramUrl": "https://www.instagram.com/tri_balfactory",
    "facebookUrl": "https://www.facebook.com/share/YBVQwMqQHiKVTp6G/?mibextid=qi2Omg",
    "socialMedia": {
      "instagram": "tri_balfactory",
      "facebook": "Tribal Factory",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "parentCompany": "Trifac Agro Private Limited",
    "legalEntity": "Trifac Agro Private Limited",
    "founder": "K. Das",
    "foundingYear": "Unknown",
    "headquarters": "Barkhopa, Nalbari, Assam",
    "country": "India",
    "manufacturingLocations": "Assam, India",
    "processingLocations": "Meghalaya / Assam",
    "exportMarkets": "India",
    "countriesSold": "India",
    "officialEmail": "Unknown",
    "curcuminDisplay": "7.0 - 12.0%",
    "heavyMetalsTested": "Unknown",
    "organic": "Natural",
    "giTagged": "Lakadong",
    "singleOrigin": "Yes",
    "packaging": {
      "primaryMaterial": "Pouch",
      "luxuryScore": "6.0 / 10",
      "shelfImpact": "Medium",
      "ecoScore": "Unknown",
      "labelDesign": "Earthy",
      "brandColors": "Unknown",
      "unboxingExperience": "Standard"
    },
    "positioningTags": ["Direct to Farmer", "Tribal Empowerment", "Sustainable"],
    "coreNarrative": "Sourcing indigenous agricultural products directly from tribal communities to promote sustainable agriculture and high-quality indigenous spices.",
    "pricing": {
      "premiumPositioning": "Premium Mass",
      "websitePrice": "Unknown",
      "retailPrice": "Unknown",
      "costPer100g": "Unknown"
    },
    "strategy": {
      "title": "How to beat Tribal Factory?",
      "content": "Tribal Factory has a phenomenal social impact story. Paradise OS cannot simply 'beat' them on ethics; Paradise must differentiate on *target audience*. Tribal Factory targets the conscious, ethical consumer. Paradise OS targets the bio-hacker, the luxury health fanatic, and the clinical purist, offering an elite product that happens to be ethically sourced."
    }
  },
  "leesmumi": {
    "idKeys": ["brand_y0httvartq56lwe1ybimy", "org-lee-s-mumi-botanical-extracts"],
    "name": "Lee's Mumi Botanical Extracts",
    "company": "Lee's Mum (Shanghai) Industry Development Co., Ltd.",
    "entityType": "Botanical Extracts Supplier",
    "location": "Shanghai, China",
    "marketTier": "B2B / Industrial",
    "curcuminValue": 0,
    "websiteDisplay": "leesmum.com",
    "websiteUrl": "https://www.leesmum.com",
    "instagramUrl": null,
    "instagramHandle": null,
    "facebookUrl": null,
    "facebookHandle": null,
    "parentCompany": "Lee's Mum",
    "legalEntity": "Lee's Mum (Shanghai) Industry Development Co., Ltd.",
    "founder": "Unknown",
    "foundingYear": "2009",
    "headquarters": "Shanghai, China",
    "country": "China",
    "manufacturingLocations": "Shanghai, China",
    "processingLocations": "Shanghai, China",
    "exportMarkets": "Global",
    "countriesSold": "Global",
    "officialEmail": "Not Publicly Available",
    "officialPhone": "Not Publicly Available",
    "companyRegistration": "Not Publicly Available",
    "gst": "Not Publicly Available",
    "fssai": "Not Publicly Available",
    "curcuminDisplay": "N/A",
    "heavyMetalsTested": "Yes (Claimed)",
    "organic": "Conventional / Certified Organic Options",
    "giTagged": "No",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Bulk Drums / Bags",
      "luxuryScore": "N/A",
      "shelfImpact": "N/A",
      "ecoScore": "Unknown",
      "labelDesign": "Industrial",
      "brandColors": "Unknown",
      "unboxingExperience": "Industrial"
    },
    "positioningTags": ["B2B Supplier", "Botanical Extracts", "Standardized Ingredients"],
    "coreNarrative": "B2B manufacturer of functional herbal powders and extracts for global supply chains.",
    "pricing": {
      "premiumPositioning": "B2B Wholesale",
      "websitePrice": "N/A",
      "retailPrice": "N/A",
      "costPer100g": "N/A"
    },
    "portfolio": [
      {
        "name": "Botanical Extracts",
        "variant": "Various",
        "weight": "Bulk",
        "mrp": "N/A",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "Not Publicly Available",
      "facebook": "Not Publicly Available",
      "linkedin": "Not Publicly Available",
      "followers": "Unknown"
    },
    "websiteIntel": {
      "traffic": "Unknown",
      "ecommercePlatform": "N/A",
      "uxScore": "N/A"
    },
    "certifications": ["FDA", "FSSC22000", "BRC", "USDA Organic", "EU Organic", "Kosher", "Halal"],
    "labReports": {
      "available": false,
      "source": "None"
    },
    "marketplace": {
      "amazon": "No",
      "flipkart": "No",
      "indiamart": "No"
    },
    "swot": {
      "strengths": ["Global certifications", "B2B scale", "Standardized HPLC extracts"],
      "weaknesses": ["No consumer brand presence"],
      "opportunities": ["White-label manufacturing"],
      "threats": ["Global botanical extract competitors"]
    },
    "strategy": {
      "title": "How to beat Lee's Mumi?",
      "content": "Not applicable as they are primarily an extracts supplier, but Paradise OS can distinguish itself through higher consumer-facing transparency and a luxury brand narrative."
    }
  }
};

export const getCompetitorIntel = (id: string): CompetitorIntel | null => {
  for (const key in competitorData) {
    if (competitorData[key].idKeys.includes(id)) return competitorData[key];
  }
  return null;
};
