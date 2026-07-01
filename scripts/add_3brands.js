import fs from 'fs';

const fuchsData = `,
  "fuchsgroup": {
    "idKeys": ["brand_5agiamwjrrssggaovhktg", "org-fuchs-group"],
    "name": "Fuchs Group",
    "company": "Fuchs Gruppe",
    "entityType": "global spice conglomerate",
    "location": "Dissen, Germany",
    "marketTier": "mass market",
    "curcuminValue": 3.0,
    "websiteDisplay": "fuchs-gruppe.com",
    "websiteUrl": "https://www.fuchs-gruppe.com",
    "instagramUrl": "https://instagram.com/fuchsgruppe",
    "instagramHandle": "@fuchsgruppe",
    "facebookUrl": "https://facebook.com/fuchsgruppe",
    "facebookHandle": "Fuchs Gruppe",
    "parentCompany": "Fuchs Gruppe",
    "legalEntity": "Fuchs Gewürze GmbH",
    "founder": "Dieter Fuchs",
    "founderSocialUrl": "https://www.linkedin.com/search/results/all/?keywords=Dieter+Fuchs",
    "foundingYear": "1952",
    "headquarters": "Dissen, Germany",
    "country": "Germany",
    "manufacturingLocations": "Global (Germany, Brazil, USA, China)",
    "processingLocations": "Global",
    "exportMarkets": "Global",
    "countriesSold": "Worldwide",
    "officialEmail": "info@fuchs.de",
    "curcuminDisplay": "2.0 - 3.5%",
    "heavyMetalsTested": "Standard Compliance",
    "organic": "Conventional (Some Organic SKUs)",
    "giTagged": "No",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Glass and Plastic Jars",
      "luxuryScore": "4.0 / 10",
      "shelfImpact": "High Visibility Mass Market",
      "ecoScore": "3.5 / 10",
      "labelDesign": "Traditional, clear branding",
      "brandColors": "Red, White, Green",
      "unboxingExperience": "Standard retail"
    },
    "positioningTags": ["Global Leader", "Mass Market", "Reliable Quality"],
    "coreNarrative": "Bringing the best spices to the world with German precision and a massive global supply chain.",
    "pricing": {
      "premiumPositioning": "Affordable",
      "websitePrice": "€3.00",
      "retailPrice": "€2.50",
      "costPer100g": "€5.00"
    },
    "portfolio": [
      {
        "name": "Kurkuma Gemahlen (Turmeric Powder)",
        "variant": "Powder",
        "weight": "50g",
        "mrp": "€2.99",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "https://instagram.com/fuchsgruppe",
      "facebook": "https://facebook.com/fuchsgruppe",
      "linkedin": "https://www.linkedin.com/company/fuchs-gruppe/",
      "followers": "10K+"
    },
    "websiteIntel": {
      "traffic": "200K/mo",
      "ecommercePlatform": "Custom/B2B",
      "uxScore": "Good"
    },
    "certifications": ["IFS", "BRC", "ISO 9001"],
    "labReports": {
      "available": false,
      "source": "Internal QC"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "Not Active",
      "indiamart": "Not Active"
    },
    "swot": {
      "strengths": ["Massive supply chain", "Global footprint", "Economies of scale"],
      "weaknesses": ["Low premium perception", "Not single-origin focused"],
      "opportunities": ["Growth in organic segment", "B2B expansion"],
      "threats": ["Rise of artisan/D2C premium brands"]
    }
  },
  "schwartz": {
    "idKeys": ["brand_i4878u974vfypauccriy", "org-schwartz"],
    "name": "Schwartz",
    "company": "Schwartz (McCormick)",
    "entityType": "mass retail brand",
    "location": "Haddenham, UK",
    "marketTier": "mass market",
    "curcuminValue": 2.5,
    "websiteDisplay": "schwartz.co.uk",
    "websiteUrl": "https://www.schwartz.co.uk",
    "instagramUrl": "https://instagram.com/schwartz.uk",
    "instagramHandle": "@schwartz.uk",
    "facebookUrl": "https://facebook.com/SchwartzCooking",
    "facebookHandle": "SchwartzCooking",
    "parentCompany": "McCormick & Company",
    "legalEntity": "Schwartz UK",
    "founder": "William Schwartz",
    "founderSocialUrl": "https://www.linkedin.com/search/results/all/?keywords=William+Schwartz",
    "foundingYear": "1889",
    "headquarters": "Haddenham, UK",
    "country": "UK",
    "manufacturingLocations": "UK",
    "processingLocations": "UK",
    "exportMarkets": "UK, Europe",
    "countriesSold": "UK, Europe",
    "officialEmail": "schwartz.enquiries@mccormick.co.uk",
    "curcuminDisplay": "2.0 - 3.0%",
    "heavyMetalsTested": "Standard Compliance",
    "organic": "Conventional",
    "giTagged": "No",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Glass Jars",
      "luxuryScore": "3.5 / 10",
      "shelfImpact": "High Visibility UK Retail",
      "ecoScore": "4.0 / 10",
      "labelDesign": "Familiar blue and red branding",
      "brandColors": "Blue, Red, White",
      "unboxingExperience": "Standard retail"
    },
    "positioningTags": ["UK Favorite", "Everyday Cooking", "Flavor Blends"],
    "coreNarrative": "The UK's leading herbs and spices brand, bringing flavor to everyday meals.",
    "pricing": {
      "premiumPositioning": "Accessible",
      "websitePrice": "£2.15",
      "retailPrice": "£2.00",
      "costPer100g": "£5.50"
    },
    "portfolio": [
      {
        "name": "Turmeric Ground",
        "variant": "Powder",
        "weight": "38g",
        "mrp": "£2.15",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "https://instagram.com/schwartz.uk",
      "facebook": "https://facebook.com/SchwartzCooking",
      "linkedin": "Unknown",
      "followers": "50K+"
    },
    "websiteIntel": {
      "traffic": "500K/mo",
      "ecommercePlatform": "Custom",
      "uxScore": "Good"
    },
    "certifications": ["BRC", "ISO"],
    "labReports": {
      "available": false,
      "source": "McCormick Internal QC"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "Not Active",
      "indiamart": "Not Active"
    },
    "swot": {
      "strengths": ["Dominant UK market share", "Backed by McCormick"],
      "weaknesses": ["Viewed as generic commodity", "Low transparency on origin"],
      "opportunities": ["Premiumization of product lines"],
      "threats": ["Supermarket private labels"]
    }
  },
  "mccormick": {
    "idKeys": ["brand_6k1kufkcth6u2uog1nyzun", "org-mccormick"],
    "name": "McCormick",
    "company": "McCormick & Company",
    "entityType": "global conglomerate",
    "location": "Hunt Valley, Maryland, USA",
    "marketTier": "mass market",
    "curcuminValue": 2.5,
    "websiteDisplay": "mccormick.com",
    "websiteUrl": "https://www.mccormick.com",
    "instagramUrl": "https://instagram.com/mccormickspice",
    "instagramHandle": "@mccormickspice",
    "facebookUrl": "https://facebook.com/McCormickSpice",
    "facebookHandle": "McCormickSpice",
    "parentCompany": "McCormick & Company",
    "legalEntity": "McCormick & Company, Incorporated",
    "founder": "Willoughby M. McCormick",
    "founderSocialUrl": "https://www.linkedin.com/search/results/all/?keywords=Willoughby+M.+McCormick",
    "foundingYear": "1889",
    "headquarters": "Hunt Valley, Maryland, USA",
    "country": "USA",
    "manufacturingLocations": "Global",
    "processingLocations": "Global",
    "exportMarkets": "Global",
    "countriesSold": "Worldwide",
    "officialEmail": "info@mccormick.com",
    "curcuminDisplay": "2.0 - 3.0%",
    "heavyMetalsTested": "Standard Compliance",
    "organic": "Conventional (Some Organic SKUs)",
    "giTagged": "No",
    "singleOrigin": "No",
    "packaging": {
      "primaryMaterial": "Plastic and Glass Jars",
      "luxuryScore": "3.5 / 10",
      "shelfImpact": "Iconic Red Cap",
      "ecoScore": "3.0 / 10",
      "labelDesign": "Classic McCormick Red/White",
      "brandColors": "Red, White",
      "unboxingExperience": "Standard retail"
    },
    "positioningTags": ["Global Market Leader", "Reliability", "Kitchen Staple"],
    "coreNarrative": "The global flavor leader, providing consistent and quality spices to homes and businesses worldwide.",
    "pricing": {
      "premiumPositioning": "Accessible",
      "websitePrice": "$4.50",
      "retailPrice": "$4.00",
      "costPer100g": "$8.00"
    },
    "portfolio": [
      {
        "name": "Ground Turmeric",
        "variant": "Powder",
        "weight": "0.95 oz",
        "mrp": "$4.49",
        "status": "Active"
      }
    ],
    "socialMedia": {
      "instagram": "https://instagram.com/mccormickspice",
      "facebook": "https://facebook.com/McCormickSpice",
      "linkedin": "https://www.linkedin.com/company/mccormick-&-company/",
      "followers": "300K+"
    },
    "websiteIntel": {
      "traffic": "5M/mo",
      "ecommercePlatform": "Custom",
      "uxScore": "Excellent"
    },
    "certifications": ["Safe Quality Food (SQF)", "ISO"],
    "labReports": {
      "available": false,
      "source": "Internal QC"
    },
    "marketplace": {
      "amazon": "Active",
      "flipkart": "Not Active",
      "indiamart": "Not Active"
    },
    "swot": {
      "strengths": ["Unmatched global distribution", "Huge R&D budget", "Brand recognition"],
      "weaknesses": ["Commoditized perception", "Vulnerable to premium/artisan disruption"],
      "opportunities": ["Acquisition of fast-growing artisan brands"],
      "threats": ["Private label growth", "Shift towards transparent sourcing"]
    }
  }
`;

const filePath = 'src/data/competitorIntel.ts';
let content = fs.readFileSync(filePath, 'utf-8');
content = content.replace('  }\n};\n', '  }' + fuchsData + '\n};\n');
fs.writeFileSync(filePath, content);
console.log("Successfully added Fuchs Group, Schwartz, and McCormick");
