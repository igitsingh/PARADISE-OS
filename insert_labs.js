const fs = require('fs');
const path = require('path');

const LABS_FILE = path.join(__dirname, 'src/db/intelligence/laboratories/laboratories.json');

const newLabs = [
  {
    "id": "lab-intertek",
    "name": "Intertek India",
    "location": "Gurgaon, Hyderabad",
    "address": "Various Regional Labs (e.g. Udyog Vihar, Gurgaon)",
    "tests": ["Total Curcuminoids", "Heavy Metals", "Pesticide Residues", "Microbiology"],
    "turnaround": "Custom Quote",
    "trusted": true,
    "cost": "RFQ / Custom Quote",
    "email": "Online Request Portal",
    "contact": "+91 124 6703703 / +91 9990 584870",
    "poc": "Food Services Division",
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
    "contact": "+91 9289351688 / +91 9311241133",
    "poc": "Herbs & Spices Division",
    "notes": "NABL-accredited, recognized by FSSAI, EIC, and APEDA. Strong focus on adulteration detection."
  }
];

let labsData = [];
if (fs.existsSync(LABS_FILE)) {
  labsData = JSON.parse(fs.readFileSync(LABS_FILE, 'utf-8'));
}

newLabs.forEach(newLab => {
  if (!labsData.find(l => l.id === newLab.id)) {
    labsData.push(newLab);
  }
});

fs.writeFileSync(LABS_FILE, JSON.stringify(labsData, null, 2));
console.log("Appended 3 new labs.");
