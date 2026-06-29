const fs = require('fs');
const path = require('path');

const LABS_FILE = path.join(__dirname, 'src/db/intelligence/laboratories/laboratories.json');

const certUpdates = {
  "lab-eurofins": {
    cost: "₹2,500 - ₹5,000 / sample (Est.)",
    certifications: ["ISO/IEC 17025:2017", "FSSAI Notified", "APEDA", "NABL"]
  },
  "lab-sgs": {
    cost: "₹3,000 - ₹5,500 / sample (Est.)",
    certifications: ["ISO/IEC 17025:2017", "FSSAI Notified", "APEDA", "NABL"]
  },
  "lab-vimta": {
    cost: "₹2,000 - ₹4,500 / sample (Est.)",
    certifications: ["ISO/IEC 17025:2017", "FSSAI Notified", "NABL"]
  },
  "lab-spicesboard": {
    cost: "₹500 - ₹600 / sample",
    certifications: ["NABL", "Spices Board Approved"]
  },
  "lab-intertek": {
    cost: "₹2,500 - ₹5,000 / sample (Est.)",
    certifications: ["ISO/IEC 17025", "FSSAI Notified", "NABL"]
  },
  "lab-tuvsud": {
    cost: "₹3,000 - ₹5,000 / sample (Est.)",
    certifications: ["ISO/IEC 17025", "FSSAI Notified", "NABL"]
  },
  "lab-farelabs": {
    cost: "₹1,500 - ₹4,000 / sample (Est.)",
    certifications: ["ISO/IEC 17025:2017", "FSSAI Notified", "APEDA", "NABL", "EIC"]
  }
};

let labsData = [];
if (fs.existsSync(LABS_FILE)) {
  labsData = JSON.parse(fs.readFileSync(LABS_FILE, 'utf-8'));
}

labsData = labsData.map(lab => {
  const update = certUpdates[lab.id];
  if (update) {
    return { ...lab, ...update };
  }
  return lab;
});

fs.writeFileSync(LABS_FILE, JSON.stringify(labsData, null, 2));
console.log("Updated laboratories.json with certifications and specific pricing.");
