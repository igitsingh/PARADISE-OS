const fs = require('fs');
const path = require('path');

const LABS_FILE = path.join(__dirname, 'src/db/intelligence/laboratories/laboratories.json');

const fullLabsData = [
  {
    "id": "lab-eurofins",
    "name": "Eurofins Analytical Services India",
    "location": "Bangalore, Gurgaon, Mumbai",
    "address": "#540/1, Doddanakundi Industrial Area 2, Graphite India Road, Hoodi, Whitefield, Bangalore - 560048",
    "tests": ["Curcuminoids (HPLC-UV, LC-MS/MS)", "Heavy Metals", "Pesticides", "Microbiology"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "RFQ / Custom Quote",
    "email": "infoindia@xoin.eurofinsasia.com",
    "contact": "+91 80 67222222",
    "poc": "Dr. Pankaj Jaiminy (Managing Director) / Mubeen Rehman (Sales)",
    "website": "https://www.eurofins.in/food-and-feed-testing/",
    "linkedin": "https://www.linkedin.com/company/eurofins-analytical-services-india-pvt-ltd",
    "notes": "Global leader in food testing. Specific pricing requires RFQ based on export vs domestic FSSAI compliance."
  },
  {
    "id": "lab-sgs",
    "name": "SGS India",
    "location": "Mumbai, Chennai, Kolkata",
    "address": "Various Regional Labs (e.g. Kolkata Regional Office)",
    "tests": ["Curcumin Content", "Heavy Metals", "Pesticide Residues", "Microbiology"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "RFQ / Custom Quote",
    "email": "Soumik.Mondal@sgs.com",
    "contact": "+91 33 66266118 / +91 9903839874",
    "poc": "Mr. Soumik Mondal (Kolkata Region)",
    "website": "https://www.sgsgroup.in/en-in",
    "linkedin": "https://www.linkedin.com/company/sgs",
    "notes": "Provide sample specifics (whole vs powder) via online inquiry portal for precise quotes."
  },
  {
    "id": "lab-vimta",
    "name": "Vimta Labs",
    "location": "Hyderabad",
    "address": "142, IDA, Phase-II, Cherlapally, Hyderabad - 500051",
    "tests": ["Nutritional Analysis", "Pesticide Residues", "Heavy Metals", "Adulteration"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "Approx. ₹600 - ₹2000+ per sample (RFQ req.)",
    "email": "helpline@vimta.com",
    "contact": "+91 868 882 9427 / +91-040-27264141",
    "poc": "Jagadeesh Kodali (Vice President, Food Division)",
    "website": "https://www.vimta.com/food/",
    "linkedin": "https://www.linkedin.com/company/vimta-labs-ltd",
    "notes": "NABL-accredited and FSSAI-approved National Reference Lab."
  },
  {
    "id": "lab-spicesboard",
    "name": "Spices Board of India (QEL)",
    "location": "Kochi, Chennai, Mumbai, Guntur",
    "address": "Quality Evaluation Laboratories (Multiple Locations)",
    "tests": ["Curcumin (ASTA Method)"],
    "turnaround": "~3 Working Days",
    "trusted": true,
    "cost": "₹500 - ₹600 per sample (+ 18% GST)",
    "email": "sbis-hq@sbis.gov.in (General HQ)",
    "contact": "+91 484 2333610",
    "poc": "Director of Research & QEL",
    "website": "http://www.indianspices.com/quality/quality-evaluation-laboratory.html",
    "linkedin": "",
    "notes": "Requires ~100g sample. Payments via NEFT or DD to 'Spices Board'."
  },
  {
    "id": "lab-intertek",
    "name": "Intertek India",
    "location": "Gurgaon, Hyderabad",
    "address": "Various Regional Labs (e.g. Udyog Vihar, Gurgaon)",
    "tests": ["Total Curcuminoids", "Heavy Metals", "Pesticide Residues", "Microbiology"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "RFQ / Custom Quote",
    "email": "india.enquiries@intertek.com",
    "contact": "+91 124 6703703 / +91 9990 584870",
    "poc": "Food Services Division Sales Lead",
    "website": "https://www.intertek.com/food/",
    "linkedin": "https://www.linkedin.com/company/intertek",
    "notes": "Testing methods via HPLC-UV or LC-MS/MS. Must specify if testing is for raw powder vs extracts."
  },
  {
    "id": "lab-tuvsud",
    "name": "TÜV SÜD South Asia",
    "location": "Bengaluru, Gurugram, Visakhapatnam",
    "address": "No. A-1 51, 2nd Stage, Peenya Industrial Estate, Bengaluru – 560058",
    "tests": ["Pesticide Residues", "Heavy Metals", "Microbial Testing", "Nutritional Analysis"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "RFQ / Custom Quote",
    "email": "info.in@tuvsud.com",
    "contact": "1800-212-2000",
    "poc": "Food Testing Department",
    "website": "https://www.tuvsud.com/en-in",
    "linkedin": "https://www.linkedin.com/company/tuvsud",
    "notes": "Major lab for domestic (FSSAI) and international export compliance."
  },
  {
    "id": "lab-farelabs",
    "name": "FARE Labs Pvt. Ltd.",
    "location": "Gurugram",
    "address": "D-18, Infocity Phase-II, Sector-33, Gurugram – 122001",
    "tests": ["Heavy Metals", "Pesticides", "Mycotoxins", "Adulteration (Sudan Dyes)"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "RFQ / Custom Quote",
    "email": "enquiry@farelabs.com",
    "contact": "+91 9289351688 / +91 9312664533",
    "poc": "Mr. Dwijendra Mathur (Director)",
    "website": "https://www.farelabs.co.in/",
    "linkedin": "https://www.linkedin.com/company/fare-labs-pvt-ltd",
    "notes": "NABL-accredited, recognized by FSSAI, EIC, and APEDA. Strong focus on adulteration detection."
  }
];

fs.writeFileSync(LABS_FILE, JSON.stringify(fullLabsData, null, 2));
console.log("Rewrote laboratories.json with full contact, POC, website, and social media data.");
