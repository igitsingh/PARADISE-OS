const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const dataDir = path.join(__dirname, '..', 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Helpers
function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomSample(arr, size) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, size);
}

// ==========================================
// 1. DATA DICTIONARIES FOR REAL COMPANIES
// ==========================================

const EXPORTER_SECTORS = {
  "Rice": {
    companies: [
      "KRBL Limited", "LT Foods Limited", "Kohinoor Foods Limited", "Chaman Lal Setia Exports Ltd", 
      "GRM Overseas Limited", "Sarveshwar Foods Limited", "Mishtann Foods Limited", "Dunar Foods Limited",
      "Supple Tek Industries Pvt Ltd", "Adani Wilmar Limited", "PK Agri Link Pvt Ltd", "Best Foods Limited",
      "Patanjali Foods Limited", "Shree Krishna Rice Mills", "Aura Grain Exporters", "Dunhar Foods Private Ltd",
      "Sarala Food Products", "Amira Pure Foods", "Sona Cereal Foods Ltd", "Jagat Basmati Rice",
      "Karnal Agricultural Exports", "Haryana Agricultural Exporters", "Hindustan Foods Rice Division",
      "Sagar Agricultural Co", "Ganesh Grains Ltd"
    ],
    cities: [["Karnal", "Haryana"], ["Amritsar", "Punjab"], ["Kakinada", "Andhra Pradesh"], ["Taraori", "Haryana"], ["Delhi", "Delhi"]],
    products: ["Premium 1121 Basmati Rice", "Traditional Raw Basmati Rice", "Organic Pusa Basmati", "Non-Basmati Long Grain Rice", "Sona Masoori Rice"],
    certs: ["APEDA Registration", "FSSAI License", "NPPO Phytosanitary Certificate", "ISO 22000 Food Safety", "Halal Certificate", "Kosher Certificate"],
    moq: ["10 MT", "18 MT (1 FCL)", "20 MT", "50 MT"],
    logo: "🌾"
  },
  "Spices": {
    companies: [
      "Synthite Industries Private Ltd", "Kancor Ingredients Limited", "Plant Lipids Private Ltd", "Everest Food Products Pvt Ltd",
      "MDH Spices (Mahashian Di Hatti Ltd)", "Akay Natural Ingredients Private Ltd", "Guntur Chilli Traders Co",
      "Unjha Seed Cleansing Mills Ltd", "Malabar Spice Traders", "VKL Seasoning Private Ltd", "Eastern Condiments Pvt Ltd",
      "Catch Foods Export House", "Badshah Masala Pvt Ltd", "MTR Foods Spices Division", "Universal Oleoresins",
      "Grover Spices International", "Cochin Spices Ltd", "Rajasthan Seed Corporation", "Kerala Cardamom Growers Association",
      "Spices Board Registered Exporters Group", "Indian Oleoresins Ltd", "Gurcharan & Sons Spices", "Keralan Spices Export House",
      "Nizamabad Turmeric Milling Co", "Unjha Cumin Millers Association"
    ],
    cities: [["Unjha", "Gujarat"], ["Kochi", "Kerala"], ["Guntur", "Andhra Pradesh"], ["Nizamabad", "Telangana"], ["Jodhpur", "Rajasthan"]],
    products: ["Lakadong Turmeric 9% Curcumin", "Guntur Sannam Red Chilli", "Malabar Black Pepper MG1", "Green Cardamom 8mm", "Unjha Cumin Seeds Bold"],
    certs: ["Spices Board Registration", "FSSAI License", "USDA Organic", "EU Organic", "US FDA Facility Reg", "ISO 22000"],
    moq: ["5 MT", "8 MT", "10 MT (1 FCL)", "15 MT"],
    logo: "🌶️"
  },
  "Tea": {
    companies: [
      "Goodricke Group Limited", "Jay Shree Tea & Industries Ltd", "McLeod Russel India Limited", "Tata Consumer Products Limited (Tea)",
      "Rossell India Limited (Tea Division)", "Apeejay Tea Limited", "Warren Tea Limited", "Duncans Industries Limited",
      "Darjeeling Organic Tea Estates Pvt Ltd", "Coonoor Tea Blenders Ltd", "Munnar Tea Plantations Group", "Halmari Tea Estate",
      "Jorhat CTC Blenders", "Dibrugarh Orthodox Tea Corp", "Assam Heritage Tea Ltd", "Glenburn Tea Estate Exports",
      "Makaibari Tea Treasures", "Castlepon Tea Company", "Ambootia Tea Group", "Margarets Hope Tea Exporters",
      "Okayti Tea Co", "Jungpana Tea Estates", "Chamong Tee Group", "Octavius Tea & Industries", "Happy Valley Tea Estate"
    ],
    cities: [["Darjeeling", "West Bengal"], ["Jorhat", "Assam"], ["Dibrugarh", "Assam"], ["Coonoor", "Tamil Nadu"], ["Munnar", "Kerala"]],
    products: ["Darjeeling First Flush Organic Tea", "Assam Orthodox CTC Tea", "Nilgiri Orthodox Leaf Tea", "Green Tea Fannings", "Organic Earl Grey Tea"],
    certs: ["Tea Board of India Reg", "FSSAI License", "Rainforest Alliance Cert", "Fairtrade Certified", "USDA Organic", "ISO 22000"],
    moq: ["1 MT", "2.5 MT", "5 MT", "10 MT"],
    logo: "🍵"
  },
  "Coffee": {
    companies: [
      "Tata Coffee Limited", "CCL Products (India) Limited", "SLN Coffee Private Limited", "Allanasons Private Ltd (Coffee)",
      "Varadarajan Coffee Exports", "Coorg Coffee Growers Cooperative", "Western Ghats Coffee Trading", "Kaapi Royale Coffee Exporters",
      "Malabar Coffee Blenders", "Chikmagalur Plantation Brands", "Madikeri Robusta Processors", "Wayanad Coffee Exporters Association",
      "Sakleshpur Specialty Coffee Ltd", "Arakku Valley Organic Coffee Cooperative", "Bhadra Coffee Estates", "Devon Plantations Coffee",
      "Mudigere Arabica Milling Co", "Karnataka Coffee Federation", "Blue Tokai Coffee Exporters Division", "Indian Robusta Exporters",
      "Hilltop Coffee Plantations", "Nilgiri Hills Coffee Estates", "Varanashi Organic Coffee Farms", "Mysore Coffee Curing Works",
      "Southern Agro Commodities"
    ],
    cities: [["Chikmagalur", "Karnataka"], ["Madikeri", "Karnataka"], ["Wayanad", "Kerala"], ["Visakhapatnam", "Andhra Pradesh"], ["Sakleshpur", "Karnataka"]],
    products: ["Mysore Vijayan Arabica AAA", "Coorg Robusta Cherry AB", "Monsooned Malabar AA", "Organic Coffee Beans Grade A", "Chikmagalur Specialty Robusta"],
    certs: ["Coffee Board of India Reg", "FSSAI License", "UTZ Certified", "Rainforest Alliance", "Fairtrade Certified", "ISO 9001"],
    moq: ["5 MT", "10 MT", "19 MT (1 FCL)", "25 MT"],
    logo: "☕"
  },
  "Textiles": {
    companies: [
      "KPR Mill Limited", "Welspun India Limited", "Arvind Limited", "Page Industries Limited (Textiles)",
      "Raymond Limited", "Shahi Exports Pvt Ltd", "Gokaldas Exports Limited", "Kitex Garments Limited",
      "Vardhman Textiles Limited", "Alok Industries Limited", "Loyal Textile Mills Ltd", "Sangam (India) Limited",
      "Coimbatore Cotton Mills", "Tirupur Knitwear Export House", "Surat Polyester Fabrics Corp", "Ludhiana Woolen Spinners",
      "Erode Woven Fabrics Ltd", "Sutlej Textiles and Industries", "Filatex India Limited", "Indo Count Industries Ltd",
      "Himatsingka Seide Limited", "Trident Limited Textiles", "Birla Century Textiles", "Bombay Dyeing Export Division",
      "Nahar Spinning Mills"
    ],
    cities: [["Tirupur", "Tamil Nadu"], ["Coimbatore", "Tamil Nadu"], ["Surat", "Gujarat"], ["Ludhiana", "Punjab"], ["Ahmedabad", "Gujarat"]],
    products: ["Combed Cotton Knit T-Shirts", "Organic GOTS Cotton Yarn", "Surat Polyester Printed Fabrics", "Woven Denim Fabrics", "Ludhiana Woolen Knitwear"],
    certs: ["GOTS Organic Standard", "OEKO-TEX Standard 100", "Texprocil Membership", "ISO 9001", "SA8000 Social Accountability"],
    moq: ["2,000 Pcs", "5,000 Meters", "10,000 Meters", "10 MT"],
    logo: "🧵"
  },
  "Pharmaceuticals": {
    companies: [
      "Dr. Reddy's Laboratories Ltd", "Sun Pharmaceutical Industries Ltd", "Cipla Limited (Formulations)", "Aurobindo API Division",
      "Lupin Limited", "Biocon Limited (Biologics)", "Divi's Laboratories Limited", "Zydus Lifesciences Limited",
      "Torrent Pharmaceuticals Ltd", "Glenmark Pharmaceuticals Ltd", "Laurus Labs Limited", "Baddi Pharma Formulations Group",
      "Hyderabad API Biotech", "Ahmedabad Formulation Labs", "Mumbai Sterile Injectables", "IPCA Laboratories Ltd",
      "Granules India Limited", "Alembic Pharmaceuticals Ltd", "Wockhardt Limited", "Strides Pharma Science Ltd",
      "Natco Pharma Limited", "Ajanta Pharma Limited", "Alkem Laboratories Limited", "Suven Life Sciences",
      "Hikal Limited API Division"
    ],
    cities: [["Baddi", "Himachal Pradesh"], ["Hyderabad", "Telangana"], ["Ahmedabad", "Gujarat"], ["Mumbai", "Maharashtra"], ["Visakhapatnam", "Andhra Pradesh"]],
    products: ["Paracetamol API IP/BP", "Amoxicillin Trihydrate Caps BP", "Metformin HCl Tablets USP", "Atorvastatin Calcium Tablets USP", "Sterile Empty Capsules"],
    certs: ["WHO-GMP Certificate", "US FDA Approved Facility", "EU-GMP Approved", "Pharmexcil Membership", "ISO 9001", "COPP"],
    moq: ["500,000 Tablets", "1,000,000 Capsules", "1 MT", "5 MT"],
    logo: "💊"
  },
  "Engineering Goods": {
    companies: [
      "Bharat Forge Limited", "Sundram Fasteners Limited", "Larsen & Toubro Heavy Engineering", "Cummins India Limited",
      "Kirloskar Oil Engines Limited", "Thermax Limited Engineering", "Triveni Turbine Limited", "AIA Engineering Limited",
      "Rajkot Castings Pvt Ltd", "Coimbatore Pump Manufacturers", "Ludhiana Machine Tools Group", "Chennai Auto-machining Corp",
      "Jamshedpur Heavy Forgings Ltd", "Texmaco Rail & Engineering", "Action Construction Equipment", "BEML Limited Exports",
      "Escorts Kubota Limited", "Carborundum Universal Limited", "Greaves Cotton Limited", "Elgi Equipments Limited",
      "HEG Limited Engineering", "Graphite India Limited", "V-Guard Industries Industrial Division", "Pennar Industries Ltd",
      "Mahindra Logistics Engineering"
    ],
    cities: [["Ludhiana", "Punjab"], ["Rajkot", "Gujarat"], ["Coimbatore", "Tamil Nadu"], ["Chennai", "Tamil Nadu"], ["Jamshedpur", "Jharkhand"]],
    products: ["Ductile Iron Castings", "Submersible Water Pumps", "High-Precision Threaded Fasteners", "CNC Machine Spindles", "Industrial Valve Castings"],
    certs: ["EEPC Registration", "ISO 9001 Quality System", "CE Mark Compliance", "UL Listed Certificate", "TUV Rheinland Certification"],
    moq: ["5,000 Units", "10,000 Pcs", "10 MT", "20 MT"],
    logo: "⚙️"
  },
  "Chemicals": {
    companies: [
      "UPL Limited", "Aarti Industries Limited", "Atul Limited", "Deepak Nitrite Limited",
      "Bodal Chemicals Limited", "Sudarshan Chemical Industries", "Tata Chemicals Limited", "SRF Limited (Chemicals)",
      "Gujarat Fluorochemicals Ltd", "PI Industries Limited", "Clean Science and Technology", "Ankleshwar Organic Dyes Pvt Ltd",
      "Vapi Pigments Private Ltd", "Vadodara Fine Chemicals Group", "Tarapur Specialty Alkalis", "Gharda Chemicals Limited",
      "Navin Fluorine International", "GACL (Gujarat Alkalies and Chemicals)", "Rallis India Limited", "Meghmani Organics Ltd",
      "Fine Organic Industries", "NOCIL Limited Chemicals", "Neogen Chemicals Limited", "Alkyl Amines Chemicals Ltd",
      "Balaji Amines Limited"
    ],
    cities: [["Ankleshwar", "Gujarat"], ["Vapi", "Gujarat"], ["Vadodara", "Gujarat"], ["Tarapur", "Maharashtra"], ["Panoli", "Gujarat"]],
    products: ["Reactive Blue 19 Dye", "Phthalocyanine Green 7 Pigment", "Refined Liquid Paraffin", "Sorbitol 70% Solution", "Monocrotophos Technical Pesticide"],
    certs: ["REACH Registration (EU)", "Chemexcil Membership", "ISO 14001 Environmental", "ISO 9001 Quality", "OHSAS 18001 Occupational Health"],
    moq: ["5 MT", "10 MT", "16 MT (1 FCL)", "20 MT"],
    logo: "🧪"
  },
  "Handicrafts": {
    companies: [
      "Moradabad Brassware Exporters", "Jodhpur Wooden Art House", "Jaipur Royal Pottery Crafts", "Saharanpur Woodcraft Exports",
      "Cottage Industries Exposition Ltd", "Indian Artwares Exporters Association", "Sanskriti Handicrafts Global", "Desert Artisans Jodhpur",
      "Jaipur Royal Textiles & Prints", "Srinagar Kashmiri Shawl Weavers", "Moradabad Metal Artware Association", "EPCH Member Artisans Group",
      "Artisans Alliance of Rajasthan", "Traditional Woodcarvers of Saharanpur", "Channapatna Lacquerware Cooperative", "Kondapalli Toys Export House",
      "Kashmiri Papier Mache Artisans", "Varanasi Silk Weavers Association", "Bastarcrafts Metallic Art", "Kutch Hand Embroidery Guild",
      "Assam Bamboo Crafts Cooperative", "Santiniketan Leather Artwares", "Bhadohi Carpet Weavers Ltd", "Mirzapur Rugs Exporters",
      "Tanjore Paintings Export Group"
    ],
    cities: [["Moradabad", "Uttar Pradesh"], ["Saharanpur", "Uttar Pradesh"], ["Jodhpur", "Rajasthan"], ["Jaipur", "Rajasthan"], ["Srinagar", "Jammu & Kashmir"]],
    products: ["Brass Decorative Candle Pillars", "Hand-Carved Mango Wood Screens", "Jaipur Handcrafted Blue Pottery Vases", "Wrought Iron Garden Planters", "Embroidered Cotton Cushions"],
    certs: ["EPCH Membership", "FSC Chain of Custody (Wood)", "ISO 9001 Quality", "Sedex SMETA Compliance"],
    moq: ["100 Pcs", "250 Pcs", "500 Pcs", "1 LCL Consignment"],
    logo: "🏺"
  },
  "Auto Components": {
    companies: [
      "Motherson Sumi Systems Ltd", "Bosch Limited (India)", "TVS Holdings Limited (Auto)", "ZF Commercial Vehicle Control Systems India",
      "Endurance Technologies Limited", "Gabriel India Limited", "Rane Holdings Limited", "Uno Minda Limited",
      "Amara Raja Energy & Mobility Ltd", "Exide Industries Limited", "Chennai Auto Components Group", "Pune Forgings & Gears Ltd",
      "Gurugram Automotive Components Association", "Jamshedpur Auto Axles", "Pantnagar Sheet Metal Mills", "Lucas TVS Limited",
      "Sundram Fasteners Auto Division", "Brakes India Private Ltd", "Wheels India Limited", "Rico Auto Industries Ltd",
      "Minda Corporation Limited", "Lumax Industries Limited", "Subros Limited Auto AC", "IP Ring Syndicate",
      "Suprajit Engineering Limited"
    ],
    cities: [["Chennai", "Tamil Nadu"], ["Pune", "Maharashtra"], ["Gurugram", "Haryana"], ["Jamshedpur", "Jharkhand"], ["Pantnagar", "Uttarakhand"]],
    products: ["Forged Steel Transmission Gears", "Brake Linings & Pads", "Auto Suspension Coil Springs", "Lead-Acid Automotive Batteries", "Precision Aluminum Die-Castings"],
    certs: ["IATF 16949 Automotive Quality", "ACMA Membership", "ISO 9001", "ISO 14001 Environmental", "E-Mark Safety Compliance"],
    moq: ["1,000 Pcs", "5,000 Pcs", "10,000 Pcs", "5 MT"],
    logo: "🚗"
  }
};

const REAL_IMPORTERS = [
  // UAE
  { name: "Al Ghurair Foods", country: "UAE", city: "Dubai", logo: "🏢" },
  { name: "Lulu Group International", country: "UAE", city: "Abu Dhabi", logo: "🏬" },
  { name: "Olam Agri Gulf", country: "UAE", city: "Dubai", logo: "🌾" },
  { name: "Reesha General Trading LLC", country: "UAE", city: "Dubai", logo: "📦" },
  { name: "Sunrise Edible Foodstuff LLC", country: "UAE", city: "Dubai", logo: "🍚" },
  { name: "Rice King Foodstuff & Beverages Trading", country: "UAE", city: "Dubai", logo: "👑" },
  { name: "Gautam General Trading LLC", country: "UAE", city: "Dubai", logo: "🏬" },
  { name: "Al Maya Group", country: "UAE", city: "Dubai", logo: "🛒" },
  { name: "Choithrams UAE", country: "UAE", city: "Dubai", logo: "🏬" },
  { name: "Spinneys Dubai LLC", country: "UAE", city: "Dubai", logo: "🛒" },
  { name: "Carrefour Middle East (Majid Al Futtaim)", country: "UAE", city: "Dubai", logo: "🏬" },
  { name: "Al Adil Trading Co LLC", country: "UAE", city: "Dubai", logo: "🌶️" },
  { name: "Baqer Mohebi Enterprises", country: "UAE", city: "Dubai", logo: "🏢" },
  { name: "Farzana General Trading", country: "UAE", city: "Dubai", logo: "📦" },
  { name: "Emirates Food Industries", country: "UAE", city: "Abu Dhabi", logo: "🌾" },
  { name: "Federal Foods LLC", country: "UAE", city: "Dubai", logo: "🚛" },
  { name: "Global Food Industries LLC", country: "UAE", city: "Sharjah", logo: "🏭" },
  
  // Germany
  { name: "METRO AG", country: "Germany", city: "Düsseldorf", logo: "🏬" },
  { name: "REWE Group", country: "Germany", city: "Cologne", logo: "🛒" },
  { name: "Edeka Group", country: "Germany", city: "Hamburg", logo: "🏬" },
  { name: "Aldi Nord", country: "Germany", city: "Essen", logo: "🛒" },
  { name: "Aldi Süd", country: "Germany", city: "Mülheim", logo: "🛒" },
  { name: "Lidl Stiftung & Co. KG", country: "Germany", city: "Neckarsulm", logo: "🏬" },
  { name: "Schwarz Group", country: "Germany", city: "Neckarsulm", logo: "🏢" },
  { name: "Genuport Trade GmbH", country: "Germany", city: "Norderstedt", logo: "🌍" },
  { name: "BAT Agrar GmbH", country: "Germany", city: "Ratzeburg", logo: "🌾" },
  { name: "Frutania GmbH", country: "Germany", city: "Grafschaft", logo: "🍎" },
  { name: "KÖLLA Group", country: "Germany", city: "Düsseldorf", logo: "🌍" },
  { name: "Tegut... Gute Lebensmittel", country: "Germany", city: "Fulda", logo: "🛒" },
  { name: "Globus Holding GmbH & Co. KG", country: "Germany", city: "Sankt Wendel", logo: "🏬" },

  // UK
  { name: "Tesco Plc", country: "UK", city: "Welwyn Garden City", logo: "🏬" },
  { name: "J Sainsbury Plc", country: "UK", city: "London", logo: "🛒" },
  { name: "Asda Group Limited", country: "UK", city: "Leeds", logo: "🏬" },
  { name: "Wm Morrison Supermarkets Ltd", country: "UK", city: "Bradford", logo: "🛒" },
  { name: "Marks & Spencer Group Plc", country: "UK", city: "London", logo: "🏬" },
  { name: "Associated British Foods Plc", country: "UK", city: "London", logo: "🏢" },
  { name: "Booker Group", country: "UK", city: "Wellingborough", logo: "📦" },
  { name: "Ocado Group Plc", country: "UK", city: "Hatfield", logo: "🛒" },
  { name: "The Co-operative Group", country: "UK", city: "Manchester", logo: "🛒" },
  { name: "Waitrose & Partners", country: "UK", city: "Bracknell", logo: "🏬" },

  // USA
  { name: "Walmart Inc", country: "USA", city: "Bentonville", logo: "🏬" },
  { name: "Costco Wholesale Corporation", country: "USA", city: "Issaquah", logo: "🏬" },
  { name: "The Kroger Co", country: "USA", city: "Cincinnati", logo: "🛒" },
  { name: "Sysco Corporation", country: "USA", city: "Houston", logo: "🚛" },
  { name: "US Foods Holding Corp", country: "USA", city: "Rosemont", logo: "📦" },
  { name: "Target Corporation", country: "USA", city: "Minneapolis", logo: "🎯" },
  { name: "Whole Foods Market Inc", country: "USA", city: "Austin", logo: "🍎" },
  { name: "H-E-B Grocery Company", country: "USA", city: "San Antonio", logo: "🛒" },
  { name: "Trader Joe's Company", country: "USA", city: "Monrovia", logo: "🌴" },
  { name: "Albertsons Companies Inc", country: "USA", city: "Boise", logo: "🏬" },
  { name: "Publix Super Markets Inc", country: "USA", city: "Lakeland", logo: "🛒" },

  // Saudi Arabia
  { name: "Almarai Company", country: "Saudi Arabia", city: "Riyadh", logo: "🥛" },
  { name: "Savola Group", country: "Saudi Arabia", city: "Jeddah", logo: "🌻" },
  { name: "Panda Retail Company", country: "Saudi Arabia", city: "Jeddah", logo: "🐼" },
  { name: "BinDawood Holding Co", country: "Saudi Arabia", city: "Jeddah", logo: "🏬" },
  { name: "Al Sadhan Group", country: "Saudi Arabia", city: "Riyadh", logo: "🛒" },
  { name: "Tamimi Markets", country: "Saudi Arabia", city: "Khobar", logo: "🏬" },
  { name: "Danube Company Limited", country: "Saudi Arabia", city: "Jeddah", logo: "🛒" },
  { name: "Abdullah Al-Othaim Markets", country: "Saudi Arabia", city: "Riyadh", logo: "🏬" },

  // Japan
  { name: "Seven & i Holdings Co., Ltd.", country: "Japan", city: "Tokyo", logo: "🏬" },
  { name: "AEON Co., Ltd.", country: "Japan", city: "Chiba", logo: "🏬" },
  { name: "Ito-Yokado Co., Ltd.", country: "Japan", city: "Tokyo", logo: "🛒" },
  { name: "Meiji Holdings Co., Ltd.", country: "Japan", city: "Tokyo", logo: "🍫" },
  { name: "Aki Foods Import Corp", country: "Japan", city: "Osaka", logo: "🍚" },

  // Italy
  { name: "Conad Consorzio Nazionale", country: "Italy", city: "Bologna", logo: "🏬" },
  { name: "Coop Italia", country: "Italy", city: "Casalecchio di Reno", logo: "🛒" },
  { name: "Esselunga S.p.A.", country: "Italy", city: "Limito di Pioltello", logo: "🏬" },
  { name: "Eurospin Italia S.p.A.", country: "Italy", city: "San Martino Buon Albergo", logo: "🛒" },

  // Bangladesh
  { name: "City Group Bangladesh", country: "Bangladesh", city: "Dhaka", logo: "🏢" },
  { name: "Meghna Group of Industries", country: "Bangladesh", city: "Dhaka", logo: "🏭" },
  { name: "Akij Group", country: "Bangladesh", city: "Dhaka", logo: "🏢" },

  // Vietnam
  { name: "Vingroup JSC", country: "Vietnam", city: "Hanoi", logo: "🏢" },
  { name: "Masan Group Corporation", country: "Vietnam", city: "Ho Chi Minh City", logo: "🥫" }
];

const REAL_DISTRIBUTORS = [
  // Germany / Europe
  { name: "DACHSER Food Logistics", country: "Germany", city: "Kempten", logo: "🚚" },
  { name: "METRO LOGISTICS Germany GmbH", country: "Germany", city: "Düsseldorf", logo: "⚓" },
  { name: "pfenning lebensmittel logistik", country: "Germany", city: "Heddesheim", logo: "📦" },
  { name: "SEREDA Food Logistics", country: "Germany", city: "Berlin", logo: "🚛" },
  { name: "DHL Global Forwarding", country: "Germany", city: "Bonn", logo: "✈️" },
  { name: "Kühne + Nagel International AG", country: "Switzerland", city: "Schindellegi", logo: "⚓" },
  { name: "DB Schenker", country: "Germany", city: "Essen", logo: "🚊" },
  { name: "Rhenus Logistics", country: "Germany", city: "Holzwickede", logo: "🚚" },
  { name: "Hellmann Worldwide Logistics", country: "Germany", city: "Osnabrück", logo: "✈️" },
  { name: "DSV A/S", country: "Denmark", city: "Hedehusene", logo: "🚛" },
  { name: "Bolloré Logistics", country: "France", city: "Puteaux", logo: "🚢" },
  { name: "Geodis", country: "France", city: "Levallois-Perret", logo: "🚚" },
  { name: "CEVA Logistics", country: "France", city: "Marseille", logo: "✈️" },

  // USA
  { name: "Flexport Inc.", country: "USA", city: "San Francisco", logo: "💻" },
  { name: "C.H. Robinson Worldwide", country: "USA", city: "Eden Prairie", logo: "🚛" },
  { name: "Expeditors International", country: "USA", city: "Seattle", logo: "✈️" },
  { name: "FedEx Trade Networks", country: "USA", city: "Memphis", logo: "✈️" },
  { name: "UPS Supply Chain Solutions", country: "USA", city: "Atlanta", logo: "🚚" },

  // UAE / Middle East
  { name: "DP World", country: "UAE", city: "Dubai", logo: "⚓" },
  { name: "Aramex PJSC", country: "UAE", city: "Dubai", logo: "📦" },
  { name: "Agility Logistics", country: "Kuwait", city: "Sulaibia", logo: "🏢" },
  { name: "GAC Group (Gulf Agency Company)", country: "UAE", city: "Dubai", logo: "🚢" },

  // India Logistics
  { name: "Container Corporation of India (CONCOR)", country: "India", city: "Delhi", logo: "🚊" },
  { name: "Allcargo Logistics Ltd", country: "India", city: "Mumbai", logo: "🚢" },
  { name: "VRL Logistics Ltd", country: "India", city: "Hubli", logo: "🚚" },
  { name: "Mahindra Logistics Ltd", country: "India", city: "Mumbai", logo: "🚛" },
  { name: "TCI Express Ltd", country: "India", city: "Gurugram", logo: "✈️" }
];

const REAL_PROCUREMENT = [
  // Global Food/FMCG Sourcing
  { name: "Unilever Global Sourcing", type: "Procurement Team", country: "Netherlands", city: "Rotterdam", logo: "🤝" },
  { name: "Nestlé Procurement Division", type: "Procurement Team", country: "Switzerland", city: "Vevey", logo: "👥" },
  { name: "Procter & Gamble Global Product Sourcing", type: "Procurement Team", country: "USA", city: "Cincinnati", logo: "👥" },
  { name: "Mondelez International Raw Material Procurement", type: "Procurement Team", country: "USA", city: "Chicago", logo: "🍫" },
  { name: "Kraft Heinz Sourcing LLC", type: "Procurement Team", country: "USA", city: "Pittsburgh", logo: "🍅" },
  { name: "Cargill Trade Services", type: "Buying House", country: "USA", city: "Wayzata", logo: "📈" },
  { name: "ADM Europe Grains Sourcing", type: "Procurement Team", country: "Switzerland", city: "Rolle", logo: "🌾" },
  { name: "Bunge Global Agro-Sourcing", type: "Procurement Team", country: "USA", city: "St. Louis", logo: "🌽" },
  { name: "Louis Dreyfus Company Agricultural Sourcing", type: "Buying House", country: "France", city: "Paris", logo: "🚢" },
  { name: "COFCO International Sourcing Office", type: "Procurement Team", country: "China", city: "Geneva", logo: "🇨🇳" },

  // Retail & Fashion Sourcing
  { name: "Li & Fung Sourcing Agency", type: "Buying House", country: "Hong Kong", city: "Hong Kong", logo: "🤝" },
  { name: "Target Sourcing Services Group", type: "Procurement Team", country: "USA", city: "Minneapolis", logo: "🎯" },
  { name: "Walmart Global Sourcing Hub", type: "Procurement Team", country: "Hong Kong", city: "Hong Kong", logo: "👥" },
  { name: "IKEA Purchasing & Logistics Area South Asia", type: "Procurement Team", country: "Sweden", city: "Älmhult", logo: "🛋️" },
  { name: "H&M Global Production & Sourcing Office", type: "Procurement Team", country: "Sweden", city: "Stockholm", logo: "🧥" },
  { name: "Inditex Global Sourcing (Zara)", type: "Procurement Team", country: "Spain", city: "Arteixo", logo: "👗" },
  { name: "Gap Inc. Global Sourcing Division", type: "Procurement Team", country: "USA", city: "San Francisco", logo: "👖" },
  { name: "Nike Global Sourcing & Manufacturing", type: "Procurement Team", country: "Singapore", city: "Singapore", logo: "👟" },

  // Large Domestic Sourcing Groups
  { name: "ITC Limited Agri-Business Division", type: "Buying House", country: "India", city: "Guntur", logo: "🌾" },
  { name: "Adani Global Sourcing Pte Ltd", type: "Buying House", country: "Singapore", city: "Singapore", logo: "🏢" },
  { name: "Olam International Global Buying Office", type: "Procurement Team", country: "Singapore", city: "Singapore", logo: "🌍" },
  { name: "Wilmar International Procurement", type: "Procurement Team", country: "Singapore", city: "Singapore", logo: "🌴" },

  // Middle East Retail / Construction Sourcing
  { name: "East India Sourcing Agency", type: "Buying House", country: "UK", city: "London", logo: "🤝" },
  { name: "Landmark Group Sourcing & Procurement Office", type: "Procurement Team", country: "UAE", city: "Dubai", logo: "🏢" },
  { name: "Majid Al Futtaim Retail Sourcing Division", type: "Procurement Team", country: "UAE", city: "Dubai", logo: "🏬" },
  { name: "Sobha Realty Group Procurement Division", type: "Procurement Team", country: "UAE", city: "Dubai", logo: "🏗️" },
  { name: "Apparel Group Global Sourcing Division", type: "Procurement Team", country: "UAE", city: "Dubai", logo: "👚" },
  { name: "Tesco Global Sourcing UK & Asia", type: "Buying House", country: "UK", city: "London", logo: "👥" }
];

// ==========================================
// 2. GENERATE 500 DIVERSIFIED NETWORK ENTITIES
// ==========================================

const exporters = [];
let companyIdCounter = 1;

// Exporters: 250 entries
// Loop through sectors and generate exactly 25 entities per sector (25 sectors * 10 = 250)
const sectorNames = Object.keys(EXPORTER_SECTORS);
for (const sector of sectorNames) {
  const template = EXPORTER_SECTORS[sector];
  for (let i = 0; i < 25; i++) {
    const baseName = template.companies[i % template.companies.length];
    
    // De-duplicate name if index loops over
    let companyName = baseName;
    if (i >= template.companies.length) {
      const suffix = ["Group", "Global", "Trade", "Estates", "Processors", "Holdings", "Alliance"][Math.floor((i - template.companies.length) % 7)];
      companyName = `${baseName.replace(" Limited", "").replace(" Ltd", "").replace(" Pvt Ltd", "")} ${suffix}`;
    }

    const [city, state] = template.cities[i % template.cities.length];
    const moq = template.moq[i % template.moq.length];
    const respTime = ["5 mins avg", "10 mins avg", "15 mins avg", "25 mins avg", "30 mins avg"][i % 5];
    const trustScore = getRandomInt(820, 985);
    const volume = `$${getRandomInt(1, 45)}.${getRandomInt(1, 9)}M`;
    const years = getRandomInt(3, 40);

    let rating, readiness;
    if (trustScore >= 930) {
      rating = Number((Math.random() * (5.0 - 4.8) + 4.8).toFixed(2));
      readiness = "AAA";
    } else if (trustScore >= 870) {
      rating = Number((Math.random() * (4.79 - 4.55) + 4.55).toFixed(2));
      readiness = "AA";
    } else {
      rating = Number((Math.random() * (4.54 - 4.25) + 4.25).toFixed(2));
      readiness = "A";
    }

    const selectedCerts = getRandomSample(template.certs, getRandomInt(2, 4));
    const certsList = selectedCerts.map(c => ({
      name: c,
      verified: true,
      authority: `${c.split(' ')[0]} Board Audited`,
      expiry: `2027-0${getRandomInt(1, 9)}`
    }));

    const auditor = ["SGS India", "Bureau Veritas", "Intertek India", "TUV Rheinland"][i % 4];
    const creditScore = getRandomInt(700, 880);
    const targetMarkets = ["UAE", "UK", "USA", "Saudi Arabia", "Germany", "Netherlands", "Japan", "Bangladesh", "Vietnam", "Italy"];
    const exportMarkets = getRandomSample(targetMarkets, getRandomInt(2, 4));

    // Special exact credentials for Karnal Agricultural Exports (Demo Exporter)
    if (companyName === "Karnal Agricultural Exports" || (sector === "Rice" && i === 20)) {
      companyName = "Karnal Agricultural Exports";
      const expProfile = {
        id: `exp-${companyIdCounter}`,
        role: "Exporter",
        name: "Karnal Agricultural Exports",
        logo: "🌾",
        city: "Karnal",
        state: "Haryana",
        country: "India",
        productCategories: ["Rice"],
        productsList: ["Premium 1121 Basmati Rice", "Organic Pusa Basmati"],
        exportMarkets: ["UAE", "Saudi Arabia", "Germany", "USA", "UK"],
        certifications: [
          { name: "APEDA Registration", verified: true, authority: "APEDA Board Audited", expiry: "2028-06" },
          { name: "FSSAI License", verified: true, authority: "FSSAI Board Audited", expiry: "2027-12" },
          { name: "Phytosanitary Certificate", verified: true, authority: "NPPO India Audited", expiry: "2027-08" },
          { name: "ISO 22000 Food Safety", verified: true, authority: "ISO Board Audited", expiry: "2028-03" }
        ],
        moq: "20 MT (1 FCL)",
        responseTime: "10 mins avg",
        trustScore: 958,
        rating: 4.97,
        reviews: 240,
        tradeVolume: "$45.2M",
        escrowSuccessRate: "99.8%",
        disputesActive: 0,
        disputesResolved: 12,
        exportReadiness: "AAA",
        competitivePositioning: "Top 1% basmati quality index with certified grain length >8.2mm.",
        aiSummary: "Verified exporter in Karnal, Haryana. Direct access to high-grade basmati crop, fully compliant with GCC and EU food safety standards.",
        yearsInBusiness: 15,
        factoryVerification: { verified: true, auditor: "SGS India", lastAudit: "2026-03-12", rating: "Grade-A Compliance" },
        bankVerification: { rating: "AAA", swiftVerified: true, creditScore: 875, status: "SWIFT Node Validated Liquidity" },
        moistureLimit: "11.5% max limit",
        leadTime: "16 Days",
        pastTransactions: [
          { id: "TX-9092", date: "2026-05-18", destination: "Jebel Ali, Dubai", amount: "$24,500 USD", status: "RELEASED" },
          { id: "TX-8921", date: "2026-04-12", destination: "Jeddah Islamic Port", amount: "$48,000 USD", status: "RELEASED" },
          { id: "TX-8710", date: "2026-03-05", destination: "Jebel Ali, Dubai", amount: "$36,200 USD", status: "RELEASED" },
          { id: "TX-8501", date: "2026-01-20", destination: "Port of Hamburg", amount: "$118,000 USD", status: "RELEASED" }
        ],
        connections: 118,
        endorsements: 42
      };
      exporters.push(expProfile);
    } else {
      const expProfile = {
        id: `exp-${companyIdCounter}`,
        role: "Exporter",
        name: companyName,
        logo: template.logo,
        city: city,
        state: state,
        country: "India",
        productCategories: [sector],
        productsList: getRandomSample(template.products, 2),
        exportMarkets: exportMarkets,
        certifications: certsList,
        moq: moq,
        responseTime: respTime,
        trustScore: trustScore,
        rating: rating,
        reviews: getRandomInt(10, 180),
        tradeVolume: volume,
        escrowSuccessRate: `${getRandomElement(['97.8', '98.5', '99.2', '100'])}%`,
        disputesActive: getRandomElement([0, 0, 0, 1]),
        disputesResolved: getRandomInt(0, 4),
        exportReadiness: readiness,
        competitivePositioning: `Pricing index is ${getRandomInt(1, 5)}% relative to sector average.`,
        aiSummary: `Verified B2B exporter from ${city}, specializing in ${sector}. Compliant with ${exportMarkets.join(', ')} import guidelines.`,
        yearsInBusiness: years,
        factoryVerification: { verified: true, auditor: auditor, lastAudit: `2025-11-${getRandomInt(10, 28)}`, rating: "A-Grade Compliance" },
        bankVerification: { rating: trustScore >= 920 ? "AAA" : "AA", swiftVerified: true, creditScore: creditScore, status: "SWIFT Node Validated Liquidity" },
        moistureLimit: `${getRandomInt(7, 13)}% max limit`,
        leadTime: `${getRandomInt(12, 35)} Days`,
        pastTransactions: [
          { id: `TX-${getRandomInt(8000, 9999)}`, date: "2026-04-10", destination: `${getRandomElement(exportMarkets)} Port`, amount: `$${getRandomInt(10, 80)}k USD`, status: "RELEASED" },
          { id: `TX-${getRandomInt(8000, 9999)}`, date: "2026-03-02", destination: `${getRandomElement(exportMarkets)} Port`, amount: `$${getRandomInt(10, 80)}k USD`, status: "RELEASED" }
        ],
        connections: getRandomInt(20, 150),
        endorsements: getRandomInt(2, 30)
      };
      exporters.push(expProfile);
    }
    companyIdCounter++;
  }
}

// Importers: 100 entries
const importers = [];
for (let i = 0; i < 100; i++) {
  const baseImporter = REAL_IMPORTERS[i % REAL_IMPORTERS.length];
  let importerName = baseImporter.name;
  if (i >= REAL_IMPORTERS.length) {
    const suffix = ["Distribution", "Imports", "Global Trading", "Wholesale", "Procurement Group"][Math.floor((i - REAL_IMPORTERS.length) % 5)];
    importerName = `${baseImporter.name.replace(" LLC", "").replace(" Inc", "").replace(" Co", "")} ${suffix}`;
  }

  const demandCategories = getRandomSample(["Rice", "Spices", "Tea", "Coffee", "Textiles", "Pharmaceuticals", "Engineering Goods", "Chemicals", "Handicrafts", "Auto Components"], getRandomInt(2, 4));
  const incoterms = getRandomSample(["CIF", "FOB", "CFR", "DDP"], getRandomInt(1, 3));
  const trustScore = getRandomInt(830, 990);
  const rating = Number((Math.random() * (5.0 - 4.4) + 4.4).toFixed(2));
  const sourcingVol = `$${getRandomInt(5, 120)}M`;
  
  // Custom exact Al Ghurair Foods details (Demo Importer)
  if (importerName === "Al Ghurair Foods" || i === 0) {
    importerName = "Al Ghurair Foods";
    importers.push({
      id: `imp-${i + 1}`,
      role: "Importer",
      name: "Al Ghurair Foods",
      logo: "🏢",
      city: "Dubai",
      state: "Dubai Emirate",
      country: "UAE",
      trustScore: 978,
      rating: 4.95,
      reviews: 310,
      creditRating: "AAA",
      activeDemands: ["Premium Basmati Rice", "Traditional Raw Basmati Rice", "Organic Coffee Beans Grade A"],
      preferredIncoterms: ["CIF", "CFR"],
      preferredPorts: ["Jebel Ali Port, Dubai", "Port Rashid"],
      yearsActive: 45,
      annualSourcingVolume: "$180M",
      verificationStatus: "SWIFT Node Verified Liquidity",
      connections: 280,
      endorsements: 76
    });
  } else {
    importers.push({
      id: `imp-${i + 1}`,
      role: "Importer",
      name: importerName,
      logo: baseImporter.logo,
      city: baseImporter.city,
      state: baseImporter.country,
      country: baseImporter.country,
      trustScore: trustScore,
      rating: rating,
      reviews: getRandomInt(5, 120),
      creditRating: trustScore >= 920 ? "AAA" : "AA",
      activeDemands: demandCategories,
      preferredIncoterms: incoterms,
      preferredPorts: [`Port of ${baseImporter.city}`, "Jebel Ali Port, Dubai"],
      yearsActive: getRandomInt(4, 35),
      annualSourcingVolume: sourcingVol,
      verificationStatus: "Bank SWIFT Account Audited",
      connections: getRandomInt(15, 190),
      endorsements: getRandomInt(1, 40)
    });
  }
}

// Distributors: 80 entries
const distributors = [];
for (let i = 0; i < 80; i++) {
  const baseDist = REAL_DISTRIBUTORS[i % REAL_DISTRIBUTORS.length];
  let distName = baseDist.name;
  if (i >= REAL_DISTRIBUTORS.length) {
    const suffix = ["Logistics Network", "Hubs", "Freight System", "Express Forwarders", "Cargo Services"][Math.floor((i - REAL_DISTRIBUTORS.length) % 5)];
    distName = `${baseDist.name.replace(" LLC", "").replace(" Inc", "").replace(" GmbH", "")} ${suffix}`;
  }

  const shippingLanes = [
    "Mumbai Port (JNPT) -> Jebel Ali Port, Dubai",
    "Chennai Port -> Port of Hamburg",
    "Kochi Port -> Port of Rotterdam",
    "Kandla Port -> Jeddah Islamic Port",
    "Mumbai Port (JNPT) -> Port of Los Angeles",
    "Kolkata Port -> Port of Yokohama",
    "Visakhapatnam Port -> Port of Genoa"
  ];
  
  const modes = getRandomSample(["Ocean Container Freight", "Air Cargo forwarding", "Bonded Warehousing", "Cold Chain Logistics", "LCL Consolidation"], getRandomInt(2, 4));
  const trustScore = getRandomInt(840, 995);
  const rating = Number((Math.random() * (5.0 - 4.5) + 4.5).toFixed(2));

  // Custom exact details for DACHSER (Demo Distributor)
  if (distName === "DACHSER Food Logistics" || i === 0) {
    distName = "DACHSER Food Logistics";
    distributors.push({
      id: `dist-${i + 1}`,
      role: "Distributor",
      name: "DACHSER Food Logistics",
      logo: "🚚",
      city: "Kempten",
      country: "Germany",
      trustScore: 985,
      rating: 4.96,
      reviews: 450,
      hubs: ["Kempten Hub", "Hamburg Warehousing Site", "Rotterdam Logistics Terminal"],
      shippingLanes: ["Mumbai Port (JNPT) -> Port of Hamburg", "Kochi Port -> Port of Rotterdam"],
      modes: ["Ocean Container Freight", "Cold Chain Logistics", "Bonded Warehousing"],
      capacity: "120,000 pallets Cold Storage & Cross-docking",
      customsClearanceRate: "99.8%",
      swiftBonded: true,
      yearsActive: 96,
      connections: 340,
      endorsements: 120
    });
  } else {
    distributors.push({
      id: `dist-${i + 1}`,
      role: "Distributor",
      name: distName,
      logo: baseDist.logo,
      city: baseDist.city,
      country: baseDist.country,
      trustScore: trustScore,
      rating: rating,
      reviews: getRandomInt(10, 200),
      hubs: [`${baseDist.city} Cargo Terminal`, "Secondary Transit Depot"],
      shippingLanes: getRandomSample(shippingLanes, getRandomInt(1, 3)),
      modes: modes,
      capacity: `${getRandomInt(10, 150)}k sq ft ${getRandomElement(["Customs Bonded Warehouse", "Temperature-controlled Food Yard", "Dry Goods Distribution Yard"])}`,
      customsClearanceRate: `${getRandomElement(['98.9', '99.5', '100'])}%`,
      swiftBonded: i % 2 === 0,
      yearsActive: getRandomInt(5, 50),
      connections: getRandomInt(20, 210),
      endorsements: getRandomInt(2, 60)
    });
  }
}

// Procurement & Buying Houses: 70 entries
const procurement = [];
for (let i = 0; i < 70; i++) {
  const baseProc = REAL_PROCUREMENT[i % REAL_PROCUREMENT.length];
  let procName = baseProc.name;
  if (i >= REAL_PROCUREMENT.length) {
    const suffix = ["Agency", "Buying Office", "Sourcing Alliance", "Procurement Desk"][Math.floor((i - REAL_PROCUREMENT.length) % 4)];
    procName = `${baseProc.name.replace(" LLC", "").replace(" Inc", "").replace(" Group", "")} ${suffix}`;
  }

  const trustScore = getRandomInt(820, 980);
  const annualSpend = `$${getRandomInt(15, 600)}M`;

  // Custom details for Unilever Sourcing (Demo Procurement)
  if (procName === "Unilever Global Sourcing" || i === 0) {
    procName = "Unilever Global Sourcing";
    procurement.push({
      id: `proc-${i + 1}`,
      role: "Procurement",
      name: "Unilever Global Sourcing",
      type: "Procurement Team",
      logo: "🤝",
      city: "Rotterdam",
      country: "Netherlands",
      trustScore: 970,
      sourcingMandate: "Global acquisition of food grains, spice oleoresins, organic oils, and packaging textiles.",
      annualSpend: "$840M",
      teamSize: 45,
      partners: ["Synthite Industries Pvt Ltd", "KPR Mill Limited"],
      activeMandates: ["400 MT Lakadong Turmeric", "10,000 kg Combed Cotton Yarns"],
      connections: 520,
      endorsements: 190
    });
  } else {
    procurement.push({
      id: `proc-${i + 1}`,
      role: "Procurement",
      name: procName,
      type: baseProc.type,
      logo: baseProc.logo,
      city: baseProc.city,
      country: baseProc.country,
      trustScore: trustScore,
      sourcingMandate: baseProc.sourcingMandate || `Corporate purchasing agency acquiring goods for international networks.`,
      annualSpend: annualSpend,
      teamSize: getRandomInt(5, 50),
      partners: [`exp-${getRandomInt(1, 50)}`, `exp-${getRandomInt(51, 100)}`],
      activeMandates: baseProc.activeMandates || [`${getRandomInt(50, 500)} MT Foodstuffs`, `${getRandomInt(1, 5)}k units Woven Fabrics`],
      connections: getRandomInt(10, 300),
      endorsements: getRandomInt(1, 90)
    });
  }
}

// Compile all 500 companies into lists for search engines
// 250 exporters + 100 importers + 80 distributors + 70 procurement = 500 total!
console.log(`Entities generated: Exporters: ${exporters.length}, Importers: ${importers.length}, Distributors: ${distributors.length}, Procurement: ${procurement.length}. Total = ${exporters.length + importers.length + distributors.length + procurement.length}`);

// ==========================================
// 3. TRADE OPP FEED DATA (150+ posts)
// ==========================================
const feed = [];
const feedPostTypes = ["opportunity", "rfq", "partnership", "update", "alert"];

// We will write loops to generate 160 realistic LinkedIn posts using names from our 500 entities
const allCompanyList = [
  ...exporters.map(e => ({ id: e.id, name: e.name, logo: e.logo, type: "Exporter", country: e.country })),
  ...importers.map(i => ({ id: i.id, name: i.name, logo: i.logo, type: "Importer", country: i.country })),
  ...distributors.map(d => ({ id: d.id, name: d.name, logo: d.logo, type: "Distributor", country: d.country })),
  ...procurement.map(p => ({ id: p.id, name: p.name, logo: p.logo, type: p.type, country: p.country }))
];

const feedTemplates = [
  {
    type: "opportunity",
    content: (co) => `🚢 ${co.name} has secured container freight allocation from Mumbai to Hamburg for July shipments. Temperature-controlled reefers available. Send direct inquiry for cargo consolidation.`,
    tags: ["Logistics", "OceanFreight", "ColdChain"]
  },
  {
    type: "rfq",
    content: (co) => `🌾 URGENT SOURCING DEMAND: ${co.name} is soliciting quotes for 50 MT Organic Sona Masoori Rice (HS Code 1006.30). Delivery term: CIF Jebel Ali. Quality inspection by SGS mandatory. Submit bids in active workspace.`,
    tags: ["RiceTrade", "AgriSourcing", "GlobalTrade"]
  },
  {
    type: "partnership",
    content: (co) => `🤝 ${co.name} has officially endorsed Karnal Agricultural Exports on the BharatX Network. Verified grain lengths and zero moisture disputes on our recent 20 MT Basmati delivery to Dubai.`,
    tags: ["TrustScore", "Endorsement", "BasmatiRice"]
  },
  {
    type: "update",
    content: (co) => `📈 B2B Milestone: ${co.name} has completed settlement of transaction TX-8921 using the BharatX multi-sig trade escrow. Funds released in 4 hours following customs clearance validation at Hamburg Port.`,
    tags: ["TradeEscrow", "Settlement", "FinTech"]
  },
  {
    type: "alert",
    content: (co) => `⚠️ Regulatory Tariff Warning: The Ministry of Trade in Saudi Arabia has integrated SABER certification ledgers with the BharatX protocol. Exporters must ensure electronic phytosanitary records are hashed prior to stuffing.`,
    tags: ["CustomsCompliance", "SABER", "AgriTrade"]
  },
  {
    type: "opportunity",
    content: (co) => `🌶️ ${co.name} has a fresh batch of Lakadong Turmeric (9% Curcumin content) verified by the Spices Board of India. Moisture level: 8.5%. MOQ: 5 MT. Phytosanitary documents verified. Ready for immediate loading.`,
    tags: ["SpicesExport", "OrganicTurmeric", "QualityTrade"]
  },
  {
    type: "rfq",
    content: (co) => `🧵 Sourcing Request: ${co.name} is looking for certified GOTS Organic Cotton yarn suppliers in Tirupur. Yarn count: 30s comb. Expected volume: 15 MT monthly contract. FOB Chennai terms.`,
    tags: ["TextileTrade", "GOTSOrganic", "YarnSourcing"]
  },
  {
    type: "update",
    content: (co) => `🌟 ${co.name} has successfully upgraded to PLATINUM Trust status on the network. Current score: 955/1000. Verified audit completed by Bureau Veritas with zero non-conformances.`,
    tags: ["QualityStandards", "TrustRating", "AuditedExporters"]
  }
];

// Special Demo post in the front of the feed
feed.push({
  id: "post-demo-1",
  author: "Al Ghurair Foods",
  authorId: "imp-1",
  authorType: "Importer",
  authorLogo: "🏢",
  timestamp: "2 hrs ago",
  content: "🌾 Sourcing Demand Alert: We are importing 20 MT Premium Basmati Rice (1121 Grain length >8.2mm, moisture <11.5%) for our Dubai packing facilities. Preferred delivery terms: CIF Jebel Ali Port. Quality inspections to be managed by SGS India. Exporters with active escrow profiles please broadcast bids now.",
  likes: 42,
  comments: 8,
  shares: 15,
  type: "rfq",
  meta: {
    targetCountry: "UAE",
    product: "Premium Basmati Rice",
    rfqId: "RFQ-1001",
    budget: "$23,800 USD",
    quantity: "20 MT"
  }
});

feed.push({
  id: "post-demo-2",
  author: "Karnal Agricultural Exports",
  authorId: "exp-21",
  authorType: "Exporter",
  authorLogo: "🌾",
  timestamp: "4 hrs ago",
  content: "🌾 Fresh Harvest Alert: Our primary Karnal milling mills have finalized processing of Premium 1121 Basmati Rice. Moisture index is 11.2%, grain length average: 8.35mm. Direct APEDA certified origin. We have container allocations for Middle East trade lanes. Escrow capabilities enabled.",
  likes: 88,
  comments: 12,
  shares: 19,
  type: "opportunity",
  meta: {
    targetCountry: "UAE",
    product: "Premium Basmati Rice",
    moq: "20 MT",
    pricing: "$1,150 / MT"
  }
});

// Generate 158 other realistic posts
for (let i = 1; i <= 158; i++) {
  const company = allCompanyList[getRandomInt(0, allCompanyList.length - 1)];
  const template = feedTemplates[i % feedTemplates.length];
  
  const relativeTimes = [
    "3 hrs ago", "5 hrs ago", "8 hrs ago", "12 hrs ago", "1 day ago", 
    "2 days ago", "3 days ago", "4 days ago", "1 week ago"
  ];
  const timestamp = relativeTimes[getRandomInt(0, relativeTimes.length - 1)];

  feed.push({
    id: `post-${i}`,
    author: company.name,
    authorId: company.id,
    authorType: company.type,
    authorLogo: company.logo,
    timestamp: timestamp,
    content: template.content(company) + ` #${template.tags.join(' #')}`,
    likes: getRandomInt(5, 120),
    comments: getRandomInt(0, 18),
    shares: getRandomInt(0, 22),
    type: template.type,
    meta: {
      targetCountry: company.country,
      product: getRandomElement(["Basmati Rice", "Spices", "Textiles", "Pharma API", "Fasteners", "Dyes"])
    }
  });
}

// ==========================================
// 4. RFQ DATA (100+ entries)
// ==========================================
const BUYER_COUNTRIES = ["UAE", "Saudi Arabia", "UK", "Germany", "Netherlands", "USA", "Canada", "Australia", "Japan", "Italy"];
const INCOTERMS = ["CIF", "FOB", "CFR", "FCA"];
const PRODUCT_RFQS = [
  ["Premium 1121 Basmati Rice", "1006.30", "15 MT", "20 MT", "50 MT", 75000, 120000, "Phytosanitary inspection, Moisture <12.5%, APEDA Cert"],
  ["Sona Masoori Rice", "1006.30", "18 MT", "25 MT", "100 MT", 30000, 85000, "NPPO Phytosanitary, Milling Quality Check"],
  ["Lakadong Cumin Seeds Bold", "0909.31", "5 MT", "10 MT", "20 MT", 25000, 60000, "Spices Board verified Curcumin/Oil ratio, Organic"],
  ["Lakadong Turmeric 9% Curcumin", "0910.30", "2 MT", "5 MT", "8 MT", 12000, 32000, "Laboratory chemical analysis report, Food safe"],
  ["Malabar Black Pepper MG1", "0904.11", "10 MT", "15 MT", "18 MT", 45000, 95000, "Pesticide traces certificate, SGS loading check"],
  ["Darjeeling First Flush Organic Tea", "0902.10", "1 MT", "2.5 MT", "5 MT", 18000, 45000, "Tea Board of India Origin Cert, Rainforest Alliance"],
  ["Assam Orthodox CTC Tea", "0902.20", "5 MT", "10 MT", "20 MT", 20000, 55000, "Bulk food grade packing, FSSAI / ISO 22000"],
  ["Monsooned Malabar AA Coffee", "0901.11", "5 MT", "19 MT", "25 MT", 35000, 98000, "Coffee Board certified origin, moisture limits"],
  ["Organic GOTS Cotton Yarn", "5205.11", "10 MT", "20 MT", "50 MT", 50000, 180000, "GOTS Standard certification, Yarn count verification"],
  ["Combed Cotton Knit T-Shirts", "6109.10", "2,000 Pcs", "5,000 Pcs", "10,000 Pcs", 10000, 45000, "OEKO-TEX Standard 100, custom packaging labels"],
  ["Paracetamol API IP/BP", "3004.90", "1 MT", "5 MT", "10 MT", 20000, 110000, "WHO-GMP Certification, COPP, Chemical Assay"],
  ["Amoxicillin Trihydrate Caps BP", "3004.10", "100,000 Caps", "500,000 Caps", "1,000,000 Caps", 15000, 65000, "EU-GMP compliant, verified manufacturer status"],
  ["Ductile Iron Castings", "7325.99", "10 MT", "20 MT", "100 MT", 35000, 220000, "CE compliance documentation, metallurgical reports"],
  ["Submersible Water Pumps", "8413.70", "1,000 Pcs", "5,000 Pcs", "10,000 Pcs", 25000, 95000, "UL Listed Cert, ISO 9001 certified manufacture"],
  ["Reactive Blue 19 Dye", "3204.16", "5 MT", "16 MT", "20 MT", 18000, 65000, "EU REACH pre-registration, safety data sheets"],
  ["Phthalocyanine Green 7", "3204.17", "2 MT", "5 MT", "10 MT", 15000, 48000, "Chemexcil registration, heavy metal limits check"],
  ["Brass Decorative Candle Pillars", "8306.29", "250 Pcs", "500 Pcs", "1,000 Pcs", 5000, 18000, "EPCH registration, Lead-free plating report"],
  ["Brake Linings & Pads", "8708.30", "5,000 Pcs", "10,000 Pcs", "20,000 Pcs", 15000, 75000, "IATF 16949 Quality Certificate, E-mark compliance"]
];

const rfqs = [];
// Generate 120 RFQs from real importers
for (let i = 1; i <= 120; i++) {
  const importer = importers[i % importers.length];
  const prodData = getRandomElement(PRODUCT_RFQS);
  const [productName, hsCode, q1, q2, q3, bMin, bMax, compliance] = prodData;

  const quantity = getRandomElement([q1, q2, q3]);
  const incoterm = getRandomElement(INCOTERMS);
  const budgetVal = getRandomInt(bMin / 1000, bMax / 1000) * 1000;
  const budget = `$${budgetVal.toLocaleString()} USD`;
  const deadline = `2026-07-${getRandomInt(10, 28)}`;

  rfqs.push({
    rfqId: `RFQ-${1000 + i}`,
    buyerName: importer.name,
    buyerId: importer.id,
    buyerCountry: importer.country,
    product: productName,
    hsCode: hsCode,
    quantity: quantity,
    deliveryTerms: `${incoterm} Port of Destination`,
    budgetRange: budget,
    complianceRequirements: compliance,
    deadline: deadline,
    riskLevel: importer.trustScore >= 920 ? "Low Risk (Verified corporate account)" : "Medium Risk (Auditing account)"
  });
}

// ==========================================
// 5. PRODUCTS & COUNTRIES (Unchanged templates but complete)
// ==========================================
const products = [
  {
    product: "Premium 1121 Basmati Rice",
    hsCode: "1006.30",
    category: "Rice",
    exportMarkets: ["UAE", "Saudi Arabia", "UK", "Germany", "USA"],
    typicalMOQ: "10 MT (Metric Tons)",
    typicalPricing: "$850 - $1,150 / MT",
    requiredCertifications: ["APEDA", "FSSAI", "Phytosanitary Cert", "ISO 22000"]
  },
  {
    product: "Traditional Raw Basmati Rice",
    hsCode: "1006.30",
    category: "Rice",
    exportMarkets: ["Saudi Arabia", "Kuwait", "UK", "Germany", "USA"],
    typicalMOQ: "18 MT (1 FCL)",
    typicalPricing: "$950 - $1,300 / MT",
    requiredCertifications: ["APEDA", "FSSAI", "Phytosanitary Cert"]
  },
  {
    product: "Lakadong Turmeric 9% Curcumin",
    hsCode: "0910.30",
    category: "Spices",
    exportMarkets: ["Germany", "Netherlands", "USA", "Japan", "UK"],
    typicalMOQ: "5 MT",
    typicalPricing: "$2,200 - $3,000 / MT",
    requiredCertifications: ["Spices Board Reg", "USDA Organic", "Laboratory HPLC Assay"]
  },
  {
    product: "Malabar Black Pepper MG1",
    hsCode: "0904.11",
    category: "Spices",
    exportMarkets: ["USA", "Germany", "Japan", "UAE", "UK"],
    typicalMOQ: "8 MT",
    typicalPricing: "$4,500 - $5,200 / MT",
    requiredCertifications: ["Spices Board Reg", "FSSAI", "Pesticide Trace Audit"]
  },
  {
    product: "Darjeeling First Flush Organic Tea",
    hsCode: "0902.10",
    category: "Tea",
    exportMarkets: ["Germany", "UK", "Japan", "USA", "France"],
    typicalMOQ: "1 MT",
    typicalPricing: "$8,000 - $15,000 / MT",
    requiredCertifications: ["Tea Board GI Tag", "USDA Organic", "Rainforest Alliance"]
  },
  {
    product: "Monsooned Malabar AA Coffee",
    hsCode: "0901.11",
    category: "Coffee",
    exportMarkets: ["Italy", "Germany", "Belgium", "Japan", "USA"],
    typicalMOQ: "5 MT",
    typicalPricing: "$3,800 - $4,600 / MT",
    requiredCertifications: ["Coffee Board Cert", "FSSAI", "Phytosanitary Cert"]
  },
  {
    product: "Organic GOTS Cotton Yarn",
    hsCode: "5205.11",
    category: "Textiles",
    exportMarkets: ["Germany", "Italy", "Bangladesh", "Vietnam", "USA"],
    typicalMOQ: "10 MT",
    typicalPricing: "$3.10 - $3.80 / kg",
    requiredCertifications: ["GOTS Standard", "Texprocil Certificate"]
  },
  {
    product: "Paracetamol API IP/BP",
    hsCode: "3004.90",
    category: "Pharmaceuticals",
    exportMarkets: ["USA", "UK", "Germany", "Nigeria", "South Africa"],
    typicalMOQ: "1 MT",
    typicalPricing: "$5.80 - $7.20 / kg",
    requiredCertifications: ["WHO-GMP", "EU-GMP / US FDA", "COPP", "Pharmexcil"]
  },
  {
    product: "Ductile Iron Castings",
    hsCode: "7325.99",
    category: "Engineering Goods",
    exportMarkets: ["USA", "Germany", "UK", "Australia", "Canada"],
    typicalMOQ: "10 MT",
    typicalPricing: "$1,400 - $1,800 / MT",
    requiredCertifications: ["EEPC", "ISO 9001", "CE Mark Compliance"]
  },
  {
    product: "Reactive Blue 19 Dye",
    hsCode: "3204.16",
    category: "Chemicals",
    exportMarkets: ["Germany", "USA", "Netherlands", "Bangladesh", "Turkey"],
    typicalMOQ: "5 MT",
    typicalPricing: "$4,200 - $5,500 / MT",
    requiredCertifications: ["Chemexcil", "EU REACH Pre-Reg", "ISO 14001"]
  }
];

const countries = [
  {
    country: "UAE",
    topImportsFromIndia: ["Basmati Rice", "Refined Petroleum", "Jewellery", "Spices", "Textiles"],
    requiredCertifications: ["Halal Certification", "Phytosanitary Certificate", "Certificate of Origin", "MOCCAE Import Permit"],
    customsNotes: "Zero customs duty on most essential commodities under India-UAE CEPA. Requires invoice legalization at UAE Embassy.",
    popularPorts: ["Jebel Ali Port, Dubai", "Khalifa Port, Abu Dhabi", "Port Rashid"]
  },
  {
    country: "Saudi Arabia",
    topImportsFromIndia: ["Basmati Rice", "Meat Products", "Organic Chemicals", "Steel Alloys", "Machinery"],
    requiredCertifications: ["SABER Certificate of Conformity", "SFDA Food Registration", "Halal Cert", "Phytosanitary Cert"],
    customsNotes: "Strict compliance with SASO standards. Shipments must match electronic SABER ledger declaration before port clearance.",
    popularPorts: ["Jeddah Islamic Port", "King Abdulaziz Port, Dammam", "King Abdullah Port"]
  },
  {
    country: "UK",
    topImportsFromIndia: ["Apparel & Garments", "Pharmaceutical Formulations", "Spices", "Organic Tea", "Marine Engineering Products"],
    requiredCertifications: ["EU-GMP (Pharma)", "Phytosanitary Certificate", "Certificate of Origin", "UKCA Compliance (Machinery)"],
    customsNotes: "Enforces strict chemical limits under UK REACH. Prefers GOTS certified textile yarns.",
    popularPorts: ["Port of Felixstowe", "Port of Southampton", "London Gateway"]
  },
  {
    country: "Germany",
    topImportsFromIndia: ["Textile Yarns", "API Chemicals", "Specialty Spices", "Engineering Castings", "Organic Tea"],
    requiredCertifications: ["EU REACH Registration", "GOTS Certification (Textiles)", "EU Food Safety Standards", "Phytosanitary Certificate"],
    customsNotes: "Strict limits on pesticide residue (must be under 0.01 mg/kg for grains). Enforces supply chain compliance laws.",
    popularPorts: ["Port of Hamburg", "Port of Bremen", "Wilhelmshaven"]
  },
  {
    country: "Netherlands",
    topImportsFromIndia: ["Industrial Chemicals", "Basmati Grains", "Knitwear Garments", "Automotive Components", "Medicaments"],
    requiredCertifications: ["EU Food Import Inspection", "EU REACH Registration", "WHO-GMP (Pharma)", "Phytosanitary Cert"],
    customsNotes: "Rotterdam Port serves as the gateway to the EU. Random moisture testing conducted on all spice/grain imports.",
    popularPorts: ["Port of Rotterdam", "Port of Amsterdam"]
  },
  {
    country: "USA",
    topImportsFromIndia: ["Generic Pharmaceutical APIs", "Knitwear & Apparel", "Black Pepper & Spices", "Automotive Parts", "Handicrafts"],
    requiredCertifications: ["US FDA Facility Registration", "USDA Organic Certification", "EPA Compliance (Chemicals)", "Phytosanitary Cert"],
    customsNotes: "Subject to sudden FDA Import Alerts on agricultural goods. Strict Lacey Act requirements on wooden handicrafts.",
    popularPorts: ["Port of Los Angeles", "Port of New York & New Jersey", "Port of Savannah"]
  },
  {
    country: "Japan",
    topImportsFromIndia: ["Petroleum Products", "Organic Chemicals", "Marine Products", "Tea", "Textiles"],
    requiredCertifications: ["Certificate of Origin", "Japan Food Sanitation Law Check", "Phytosanitary Certificate"],
    customsNotes: "Enforces zero tolerances on certain post-harvest chemical limits. Prefers organic teas.",
    popularPorts: ["Port of Yokohama", "Port of Tokyo", "Port of Kobe"]
  },
  {
    country: "Bangladesh",
    topImportsFromIndia: ["Cotton Yarn", "Electricity", "Refined Petroleum", "Wheat & Rice", "Chemicals"],
    requiredCertifications: ["BSTI Quality Standard Certificate", "Phytosanitary Certificate", "Certificate of Origin"],
    customsNotes: "Heavy border traffic through Petrapole land port. Letters of Credit must be verified through state banks.",
    popularPorts: ["Chittagong Port", "Port of Mongla", "Benapole Land Port"]
  },
  {
    country: "Vietnam",
    topImportsFromIndia: ["Meat Products", "Steel Castings", "Cotton Yarn", "Synthetic Chemicals", "Pharmaceutical APIs"],
    requiredCertifications: ["Certificate of Origin Form AI", "WHO-GMP Formulations Check", "Animal Quarantine Certificate"],
    customsNotes: "Enforces strict quarantine checks on agro-imports. Gained import duty reductions under India-ASEAN FTA.",
    popularPorts: ["Haiphong Port", "Saigon Port, Ho Chi Minh City", "Da Nang Port"]
  },
  {
    country: "Italy",
    topImportsFromIndia: ["Steel Alloys", "Organic Chemicals", "Knitwear Yarns", "API Chemicals", "Specialty Coffee"],
    requiredCertifications: ["EU REACH (Chemicals)", "EU-GMP (Pharma)", "GOTS Standard (Textiles)", "Phytosanitary Cert"],
    customsNotes: "Trieste port serves as key gateway to Central Europe. Strict customs checks on heavy metal castings.",
    popularPorts: ["Port of Genoa", "Port of Trieste", "Port of Naples"]
  }
];

// Write JS files
fs.writeFileSync(path.join(dataDir, 'exporters.json'), JSON.stringify(exporters, null, 2));
fs.writeFileSync(path.join(dataDir, 'importers.json'), JSON.stringify(importers, null, 2));
fs.writeFileSync(path.join(dataDir, 'distributors.json'), JSON.stringify(distributors, null, 2));
fs.writeFileSync(path.join(dataDir, 'procurement.json'), JSON.stringify(procurement, null, 2));
fs.writeFileSync(path.join(dataDir, 'feed.json'), JSON.stringify(feed, null, 2));
fs.writeFileSync(path.join(dataDir, 'rfqs.json'), JSON.stringify(rfqs, null, 2));
fs.writeFileSync(path.join(dataDir, 'products.json'), JSON.stringify(products, null, 2));
fs.writeFileSync(path.join(dataDir, 'countries.json'), JSON.stringify(countries, null, 2));

console.log("Seed JSON Databases written successfully under src/data/ by Node.js!");
