import json
import re

def update_competitor_intel():
    path = 'src/data/competitorIntel.ts'
    with open(path, 'r') as f:
        content = f.read()

    new_obj = """
  "org-getfitsquad": {
    "id": "org-getfitsquad",
    "name": "GetFitSquad",
    "marketTier": "Niche Premium",
    "origin": "India",
    "productCategories": ["Fitness App / Ecosystem"],
    "curcuminInfo": {
      "claimedPercentage": "N/A",
      "verifiedPercentage": "N/A",
      "testingMethod": "N/A"
    },
    "packaging": ["N/A"],
    "certifications": ["Not Publicly Available"],
    "pricing": {
      "averagePrice": "Not Publicly Available",
      "currency": "INR"
    },
    "foundingYear": "Unknown",
    "founder": "Unknown",
    "companyRegistration": "Not Publicly Available",
    "gst": "Not Publicly Available",
    "fssai": "Not Publicly Available",
    "officialEmail": "Not Publicly Available",
    "officialPhone": "Not Publicly Available",
    "websiteUrl": "https://getfitsquad.life",
    "websiteDisplay": "getfitsquad.life",
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
    }
  },"""

    idx = content.find('export const competitorData: Record<string, CompetitorIntel> = {')
    if idx != -1:
        insert_idx = content.find('{', idx) + 1
        new_content = content[:insert_idx] + "\n" + new_obj + content[insert_idx:]
        with open(path, 'w') as f:
            f.write(new_content)
        print("Successfully added getfitsquad")
    else:
        print("Failed to find injection point")

if __name__ == "__main__":
    update_competitor_intel()
