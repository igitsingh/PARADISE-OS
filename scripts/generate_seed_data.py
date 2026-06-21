import json
import os
import random

# Ensure output directory exists
os.makedirs('src/data', exist_ok=True)

# ==========================================
# 1. EXPORTER GENERATION SEED DATA
# ==========================================
SECTOR_TEMPLATES = {
    "Rice": {
        "cities": [("Karnal", "Haryana"), ("Amritsar", "Punjab"), ("Kakinada", "Andhra Pradesh"), ("Kolkata", "West Bengal")],
        "products": ["Premium 1121 Basmati Rice", "Traditional Basmati Rice", "Pusa Basmati Rice", "Non-Basmati Long Grain Rice", "Sona Masoori Rice"],
        "markets": ["Saudi Arabia", "UAE", "United Kingdom", "Germany", "USA", "Kuwait", "Iran"],
        "certs": ["APEDA Registration", "FSSAI License", "NPPO Phytosanitary Certificate", "ISO 22000 Food Safety", "Halal Certificate", "Kosher Certificate"],
        "moq_range": ["10 MT", "18 MT (1 FCL)", "20 MT", "50 MT"],
        "companies": [
            "KRBL Export Division", "LT Foods Global", "Kohinoor Grains India", "Chaman Lal Setia Exports Ltd", 
            "GRM Overseas International", "Sarveshwar Foods Export", "Dunhar Foods Private Ltd", 
            "Shri Lal Mahal Exports", "Sona Cereal Foods", "Indo US Bio-Tech Grains"
        ]
    },
    "Spices": {
        "cities": [("Unjha", "Gujarat"), ("Kochi", "Kerala"), ("Guntur", "Andhra Pradesh"), ("Nizamabad", "Telangana")],
        "products": ["Lakadong Turmeric 9% Curcumin", "Guntur Sannam Red Chilli", "Malabar Black Pepper MG1", "Green Cardamom 8mm", "Unjha Cumin Seeds Bold"],
        "markets": ["USA", "Germany", "Netherlands", "Japan", "UAE", "United Kingdom", "Saudi Arabia"],
        "certs": ["Spices Board Registration", "FSSAI License", "USDA Organic", "EU Organic", "US FDA Facility Reg", "ISO 22000"],
        "moq_range": ["5 MT", "8 MT", "10 MT (1 FCL)", "15 MT"],
        "companies": [
            "Kancor Ingredients Ltd", "Synthite Industries Exports", "Plant Lipids Spices", "Akay Flavours & Aromatics", 
            "MTR Foods International", "Everest Spices Global", "MDH Spices Export House", "Guntur Chilli Trading Co", 
            "Unjha Seed Cleansing Mills", "Malabar Spice Traders"
        ]
    },
    "Tea": {
        "cities": [("Darjeeling", "West Bengal"), ("Jorhat", "Assam"), ("Dibrugarh", "Assam"), ("Coonoor", "Tamil Nadu")],
        "products": ["Darjeeling First Flush Organic Tea", "Assam Orthodox CTC Tea", "Nilgiri Orthodox Leaf Tea", "Green Tea Fannings", "Organic Earl Grey Tea"],
        "markets": ["United Kingdom", "Germany", "USA", "Japan", "Russia", "UAE", "Iran"],
        "certs": ["Tea Board of India Reg", "FSSAI License", "Rainforest Alliance Cert", "Fairtrade Certified", "USDA Organic", "ISO 22000"],
        "moq_range": ["1 MT", "2.5 MT", "5 MT", "10 MT"],
        "companies": [
            "Goodricke Group Tea Division", "Jay Shree Tea & Industries", "McLeod Russel India Exports", 
            "Tata Consumer Products Tea Division", "Rossell India Tea Estates", "Apeejay Tea Mills", 
            "Warren Tea Limited", "Duncans Tea Exports", "Darjeeling Organic Tea Estates", "Coonoor Tea Blenders"
        ]
    },
    "Coffee": {
        "cities": [("Chikmagalur", "Karnataka"), ("Madikeri", "Karnataka"), ("Wayanad", "Kerala"), ("Visakhapatnam", "Andhra Pradesh")],
        "products": ["Mysore Vijayan Arabica AAA", "Coorg Robusta Cherry AB", "Monsooned Malabar AA", "Organic Coffee Beans Grade A", "Chikmagalur Specialty Robusta"],
        "markets": ["Italy", "Germany", "Belgium", "Japan", "USA", "Saudi Arabia", "UAE"],
        "certs": ["Coffee Board of India Reg", "FSSAI License", "UTZ Certified", "Rainforest Alliance", "Fairtrade Certified", "ISO 9001"],
        "moq_range": ["5 MT", "10 MT", "19 MT (1 FCL)", "25 MT"],
        "companies": [
            "CCL Products India", "Tata Coffee Export Division", "Allanasons Coffee Division", "SLN Coffee Exports", 
            "Varnam Coffee Estates", "Coorg Coffee Growers Cooperative", "Western Ghats Coffee Trading", 
            "Kaapi Royale Coffee Exporters", "Malabar Coffee Blenders", "Chikmagalur Plantation Brands"
        ]
    },
    "Textiles": {
        "cities": [("Tirupur", "Tamil Nadu"), ("Coimbatore", "Tamil Nadu"), ("Surat", "Gujarat"), ("Ludhiana", "Punjab")],
        "products": ["Combed Cotton Knit T-Shirts", "Organic GOTS Cotton Yarn", "Surat Polyester Printed Fabrics", "Woven Denim Fabrics", "Ludhiana Woolen Knitwear"],
        "markets": ["USA", "Germany", "United Kingdom", "Netherlands", "France", "Bangladesh", "Italy"],
        "certs": ["GOTS Organic Standard", "OEKO-TEX Standard 100", "Texprocil Membership", "ISO 9001", "SA8000 Social Accountability"],
        "moq_range": ["2,000 Pcs", "5,000 Meters", "10,000 Meters", "10 MT (Yarn)"],
        "companies": [
            "KPR Mill Export Division", "Page Industries Textiles", "Welspun Global Trade", "Arvind Mills Export", 
            "Trident Group Textiles", "Raymond Exports Ltd", "Loyal Textile Mills", "Kitex Garments Exports", 
            "Shahi Exports International", "Gokaldas Images Global"
        ]
    },
    "Pharmaceuticals": {
        "cities": [("Baddi", "Himachal Pradesh"), ("Hyderabad", "Telangana"), ("Ahmedabad", "Gujarat"), ("Mumbai", "Maharashtra")],
        "products": ["Paracetamol API IP/BP", "Amoxicillin Trihydrate Caps BP", "Metformin HCl Tablets USP", "Atorvastatin Calcium Tablets USP", "Verified Sterile Empty Capsules"],
        "markets": ["USA", "United Kingdom", "Germany", "Nigeria", "Kenya", "South Africa", "Netherlands"],
        "certs": ["WHO-GMP Certificate", "US FDA Approved Facility", "EU-GMP Approved", "Pharmexcil Membership", "ISO 9001", "Certificate of Pharmaceutical Product (COPP)"],
        "moq_range": ["500,000 Tablets", "1,000,000 Capsules", "1 MT (API)", "5 MT (API)"],
        "companies": [
            "Dr. Reddy's Lab Exports", "Sun Pharma Global Trade", "Cipla Formulations Export", "Aurobindo API Division", 
            "Lupin Pharma International", "Biocon Biologics Exports", "Divi's Lab API Exports", "Zydus Life Exports", 
            "Torrent Pharma Global", "Glenmark Pharma Exports"
        ]
    },
    "Engineering Goods": {
        "cities": [("Ludhiana", "Punjab"), ("Rajkot", "Gujarat"), ("Coimbatore", "Tamil Nadu"), ("Chennai", "Tamil Nadu")],
        "products": ["Ductile Iron Castings", "Submersible Water Pumps", "High-Precision Threaded Fasteners", "CNC Machine Spindles", "Industrial Valve Castings"],
        "markets": ["USA", "Germany", "United Kingdom", "Saudi Arabia", "UAE", "Australia", "Canada"],
        "certs": ["EEPC Registration", "ISO 9001 Quality System", "CE Mark Compliance", "UL Listed Certificate", "TUV Rheinland Certification"],
        "moq_range": ["5,000 Units", "10,000 Pcs", "10 MT (Castings)", "20 MT"],
        "companies": [
            "Sundram Fasteners Exports", "Bharat Forge Casting Division", "L&T Heavy Engineering Exports", 
            "Cummins India Powertech", "Kirloskar Oil Engines Global", "Texmaco Rail Infrastructure", 
            "Rajkot Castings Pvt Ltd", "Ludhiana Machine Tools", "Coimbatore Pump Manufacturers", "Triveni Turbine Global"
        ]
    },
    "Chemicals": {
        "cities": [("Ankleshwar", "Gujarat"), ("Vapi", "Gujarat"), ("Vadodara", "Gujarat"), ("Tarapur", "Maharashtra")],
        "products": ["Reactive Blue 19 Dye", "Phthalocyanine Green 7 Pigment", "Refined Liquid Paraffin", "Sorbitol 70% Solution", "Monocrotophos Technical Pesticide"],
        "markets": ["Germany", "USA", "Netherlands", "Bangladesh", "Turkey", "Italy", "China"],
        "certs": ["REACH Registration (EU)", "Chemexcil Membership", "ISO 14001 Environmental", "ISO 9001 Quality", "OHSAS 18001 Occupational Health"],
        "moq_range": ["5 MT", "10 MT (Liquid)", "16 MT (1 FCL)", "20 MT"],
        "companies": [
            "UPL Limited Agri-Chemicals", "Aarti Industries Fine Chemicals", "Atul Limited Dye Division", 
            "Deepak Nitrite Global", "Pidilite Industries Export Division", "Ankleshwar Organic Dyes", 
            "Vapi Pigments Private Ltd", "Bodal Chemicals Exports", "Sudarshan Chemical Exports", "Gharda Chemicals Ltd"
        ]
    },
    "Handicrafts": {
        "cities": [("Moradabad", "Uttar Pradesh"), ("Saharanpur", "Uttar Pradesh"), ("Jodhpur", "Rajasthan"), ("Jaipur", "Rajasthan")],
        "products": ["Brass Decorative Candle Pillars", "Hand-Carved Mango Wood Screens", "Jaipur Handcrafted Blue Pottery Vases", "Wrought Iron Garden Planters", "Embroidered Cotton Cushions"],
        "markets": ["USA", "United Kingdom", "Germany", "Netherlands", "France", "Canada", "Australia"],
        "certs": ["EPCH Membership", "FSC Chain of Custody (Wood)", "ISO 9001 Quality", "Sedex SMETA Compliance"],
        "moq_range": ["100 Pcs", "250 Pcs", "500 Pcs", "1 LCL Consignment"],
        "companies": [
            "Moradabad Brassware Exporters", "Jodhpur Wooden Art House", "Jaipur Royal Pottery Crafts", 
            "Saharanpur Woodcraft Exports", "Cottage Industries Exposition Ltd", "Indian Artwares Exporters", 
            "Sanskriti Handicrafts Global", "Desert Artisans Jodhpur", "Moradabad Metal Artware", "Jaipur Royal Textiles"
        ]
    },
    "Auto Components": {
        "cities": [("Chennai", "Tamil Nadu"), ("Pune", "Maharashtra"), ("Gurugram", "Haryana"), ("Jamshedpur", "Jharkhand")],
        "products": ["Forged Steel Transmission Gears", "Brake Linings & Pads", "Auto Suspension Coil Springs", "Lead-Acid Automotive Batteries", "Precision Aluminum Die-Castings"],
        "markets": ["USA", "Germany", "United Kingdom", "Japan", "South Korea", "Italy", "Brazil"],
        "certs": ["IATF 16949 Automotive Quality", "ACMA Membership", "ISO 9001", "ISO 14001 Environmental", "E-Mark Safety Compliance"],
        "moq_range": ["1,000 Pcs", "5,000 Pcs", "10,000 Pcs", "5 MT"],
        "companies": [
            "Motherson Sumi Exports", "Bosch India Spark Division", "Endurance Technologies Global", 
            "TVS Motor Components", "WABCO India Brakes", "Tube Investments Auto Division", 
            "Amara Raja Battery Exports", "Gabriel India Shock Absorbers", "Rane Steering Systems", "Minda Auto Components"
        ]
    }
}

exporters = []
global_counter = 1

for sector, data in SECTOR_TEMPLATES.items():
    for index, company in enumerate(data["companies"]):
        city, state = random.choice(data["cities"])
        # Seed random details but keep them realistic
        moq = random.choice(data["moq_range"])
        resp_time = random.choice(["8 mins avg", "12 mins avg", "25 mins avg", "45 mins avg", "1.5 hours avg", "2 hours avg"])
        trust_score = random.randint(810, 985)
        volume = f"${random.randint(2, 28)}.{random.choice(['0', '2', '5', '8'])}M"
        years = random.randint(4, 42)
        
        # Rating based on trust score
        if trust_score >= 940:
            rating = round(random.uniform(4.90, 5.0), 2)
            readiness = "AAA"
        elif trust_score >= 880:
            rating = round(random.uniform(4.70, 4.89), 2)
            readiness = "AA"
        else:
            rating = round(random.uniform(4.50, 4.69), 2)
            readiness = "A"

        # Unique certifications list
        certs_count = random.randint(2, 4)
        selected_certs = random.sample(data["certs"], certs_count)
        certs_list = []
        for c in selected_certs:
            certs_list.append({
                "name": c,
                "verified": True,
                "authority": f"{c.split(' ')[0]} Board Audited",
                "expiry": f"2027-0{random.randint(1,9)}"
            })

        # Factory & Bank Audits
        last_audit = f"2025-1{random.randint(0,2)}-{random.randint(10,28)}"
        auditor = random.choice(["SGS India", "Bureau Veritas", "Intertek India", "TUV Rheinland"])
        credit_score = random.randint(700, 850)

        # Markets
        markets_count = random.randint(2, 4)
        selected_markets = random.sample(data["markets"], markets_count)

        exporter_profile = {
            "id": f"exp-{global_counter}",
            "name": company,
            "city": city,
            "state": state,
            "productCategories": [sector],
            "productsList": random.sample(data["products"], 2),
            "exportMarkets": selected_markets,
            "certifications": certs_list,
            "moq": moq,
            "responseTime": resp_time,
            "trustScore": trust_score,
            "rating": rating,
            "reviews": random.randint(15, 300),
            "tradeVolume": volume,
            "escrowSuccessRate": f"{random.choice(['98.2', '99.1', '99.8', '100'])}%",
            "disputesActive": random.choice([0, 0, 0, 1]),
            "disputesResolved": random.randint(0, 5),
            "exportReadiness": readiness,
            "competitivePositioning": f"Pricing index is {random.randint(1, 4)}% relative to sector average.",
            "aiSummary": f"Verified exporter in {city}, specializing in {sector} trading. SWIFT transaction compliant and certified by national boards.",
            "yearsInBusiness": years,
            "factoryVerification": {
                "verified": True,
                "auditor": auditor,
                "lastAudit": last_audit,
                "rating": "A-Grade Compliance"
            },
            "bankVerification": {
                "rating": "AAA" if trust_score >= 930 else "AA+",
                "swiftVerified": True,
                "creditScore": credit_score,
                "status": "SWIFT Node Validated Liquidity"
            },
            "moistureLimit": f"{random.randint(6, 12)}% max limit",
            "leadTime": f"{random.randint(10, 35)} Days"
        }
        exporters.append(exporter_profile)
        global_counter += 1

# ==========================================
# 2. RFQ GENERATION
# ==========================================
BUYER_COUNTRIES = ["UAE", "Saudi Arabia", "UK", "Germany", "Netherlands", "USA", "Canada", "Australia"]

INCOTERMS = ["CIF", "FOB", "CFR", "FCA"]

PRODUCT_RFQS = [
    # Rice
    ("Premium 1121 Basmati Rice", "1006.30", "15 MT", "20 MT", "50 MT", 75000, 120000, "Phytosanitary inspection, Moisture <12.5%, APEDA Cert"),
    ("Sona Masoori Rice", "1006.30", "18 MT", "25 MT", "100 MT", 30000, 85000, "NPPO Phytosanitary, Milling Quality Check"),
    # Spices
    ("Lakadong Cumin Seeds Bold", "0909.31", "5 MT", "10 MT", "20 MT", 25000, 60000, "Spices Board verified Curcumin/Oil ratio, Organic"),
    ("Lakadong Turmeric 9% Curcumin", "0910.30", "2 MT", "5 MT", "8 MT", 12000, 32000, "Laboratory chemical analysis report, Food safe"),
    ("Malabar Black Pepper MG1", "0904.11", "10 MT", "15 MT", "18 MT", 45000, 95000, "Pesticide traces certificate, SGS loading check"),
    # Tea
    ("Darjeeling First Flush Organic Tea", "0902.10", "1 MT", "2.5 MT", "5 MT", 18000, 45000, "Tea Board of India Origin Cert, Rainforest Alliance"),
    ("Assam Orthodox CTC Tea", "0902.20", "5 MT", "10 MT", "20 MT", 20000, 55000, "Bulk food grade packing, FSSAI / ISO 22000"),
    # Coffee
    ("Monsooned Malabar AA Coffee", "0901.11", "5 MT", "19 MT", "25 MT", 35000, 98000, "Coffee Board certified origin, moisture limits"),
    # Textiles
    ("Organic GOTS Cotton Yarn", "5205.11", "10 MT", "20 MT", "50 MT", 50000, 180000, "GOTS Standard certification, Yarn count verification"),
    ("Combed Cotton Knit T-Shirts", "6109.10", "2,000 Pcs", "5,000 Pcs", "10,000 Pcs", 10000, 45000, "OEKO-TEX Standard 100, custom packaging labels"),
    # Pharma
    ("Paracetamol API IP/BP", "3004.90", "1 MT", "5 MT", "10 MT", 20000, 110000, "WHO-GMP Certification, COPP, Chemical Assay"),
    ("Amoxicillin Trihydrate Caps BP", "3004.10", "100,000 Caps", "500,000 Caps", "1,000,000 Caps", 15000, 65000, "EU-GMP compliant, verified manufacturer status"),
    # Engineering
    ("Ductile Iron Castings", "7325.99", "10 MT", "20 MT", "100 MT", 35000, 220000, "CE compliance documentation, metallurgical reports"),
    ("Submersible Water Pumps", "8413.70", "1,000 Pcs", "5,000 Pcs", "10,000 Pcs", 25000, 95000, "UL Listed Cert, ISO 9001 certified manufacture"),
    # Chemicals
    ("Reactive Blue 19 Dye", "3204.16", "5 MT", "16 MT", "20 MT", 18000, 65000, "EU REACH pre-registration, safety data sheets"),
    ("Phthalocyanine Green 7", "3204.17", "2 MT", "5 MT", "10 MT", 15000, 48000, "Chemexcil registration, heavy metal limits check"),
    # Handicrafts
    ("Brass Decorative Candle Pillars", "8306.29", "250 Pcs", "500 Pcs", "1,000 Pcs", 5000, 18000, "EPCH registration, Lead-free plating report"),
    # Auto Components
    ("Brake Linings & Pads", "8708.30", "5,000 Pcs", "10,000 Pcs", "20,000 Pcs", 15000, 75000, "IATF 16949 Quality Certificate, E-mark compliance")
]

rfqs = []
for i in range(1, 101):
    country = random.choice(BUYER_COUNTRIES)
    prod_data = random.choice(PRODUCT_RFQS)
    product_name, hs_code, q1, q2, q3, b_min, b_max, compliance = prod_data
    
    quantity = random.choice([q1, q2, q3])
    incoterm = random.choice(INCOTERMS)
    budget = f"${random.randint(b_min // 1000, b_max // 1000) * 1000:,} USD"
    deadline = f"2026-07-{random.randint(10, 28)}"
    
    rfq_entry = {
        "rfqId": f"RFQ-{1000 + i}",
        "buyerCountry": country,
        "product": product_name,
        "hsCode": hs_code,
        "quantity": quantity,
        "deliveryTerms": f"{incoterm} Port of Destination",
        "budgetRange": budget,
        "complianceRequirements": compliance,
        "deadline": deadline,
        "riskLevel": "Low Risk (Verified Corporate Account)"
    }
    rfqs.append(rfq_entry)

# ==========================================
# 3. PRODUCTS DATA
# ==========================================
products_seed = [
    {
        "product": "Premium 1121 Basmati Rice",
        "hsCode": "1006.30",
        "category": "Rice",
        "exportMarkets": ["UAE", "Saudi Arabia", "UK", "Germany", "USA"],
        "typicalMOQ": "10 MT (Metric Tons)",
        "typicalPricing": "$850 - $1,150 / MT",
        "requiredCertifications": ["APEDA", "FSSAI", "Phytosanitary Cert", "ISO 22000"]
    },
    {
        "product": "Traditional Raw Basmati Rice",
        "hsCode": "1006.30",
        "category": "Rice",
        "exportMarkets": ["Saudi Arabia", "Kuwait", "UK", "Germany", "USA"],
        "typicalMOQ": "18 MT (1 FCL)",
        "typicalPricing": "$950 - $1,300 / MT",
        "requiredCertifications": ["APEDA", "FSSAI", "Phytosanitary Cert"]
    },
    {
        "product": "Lakadong Turmeric 9% Curcumin",
        "hsCode": "0910.30",
        "category": "Spices",
        "exportMarkets": ["Germany", "Netherlands", "USA", "Japan", "UK"],
        "typicalMOQ": "5 MT",
        "typicalPricing": "$2,200 - $3,000 / MT",
        "requiredCertifications": ["Spices Board Reg", "USDA Organic", "Laboratory HPLC Assay"]
    },
    {
        "product": "Malabar Black Pepper MG1",
        "hsCode": "0904.11",
        "category": "Spices",
        "exportMarkets": ["USA", "Germany", "Japan", "UAE", "UK"],
        "typicalMOQ": "8 MT",
        "typicalPricing": "$4,500 - $5,200 / MT",
        "requiredCertifications": ["Spices Board Reg", "FSSAI", "Pesticide Trace Audit"]
    },
    {
        "product": "Darjeeling First Flush Organic Tea",
        "hsCode": "0902.10",
        "category": "Tea",
        "exportMarkets": ["Germany", "UK", "Japan", "USA", "France"],
        "typicalMOQ": "1 MT",
        "typicalPricing": "$8,000 - $15,000 / MT",
        "requiredCertifications": ["Tea Board GI Tag", "USDA Organic", "Rainforest Alliance"]
    },
    {
        "product": "Monsooned Malabar AA Coffee",
        "hsCode": "0901.11",
        "category": "Coffee",
        "exportMarkets": ["Italy", "Germany", "Belgium", "Japan", "USA"],
        "typicalMOQ": "5 MT",
        "typicalPricing": "$3,800 - $4,600 / MT",
        "requiredCertifications": ["Coffee Board Cert", "FSSAI", "Phytosanitary Cert"]
    },
    {
        "product": "Organic GOTS Cotton Yarn",
        "hsCode": "5205.11",
        "category": "Textiles",
        "exportMarkets": ["Germany", "Italy", "Bangladesh", "Vietnam", "USA"],
        "typicalMOQ": "10 MT",
        "typicalPricing": "$3.10 - $3.80 / kg",
        "requiredCertifications": ["GOTS Standard", "Texprocil Certificate"]
    },
    {
        "product": "Paracetamol API IP/BP",
        "hsCode": "3004.90",
        "category": "Pharmaceuticals",
        "exportMarkets": ["USA", "UK", "Germany", "Nigeria", "South Africa"],
        "typicalMOQ": "1 MT",
        "typicalPricing": "$5.80 - $7.20 / kg",
        "requiredCertifications": ["WHO-GMP", "EU-GMP / US FDA", "COPP", "Pharmexcil"]
    },
    {
        "product": "Ductile Iron Castings",
        "hsCode": "7325.99",
        "category": "Engineering Goods",
        "exportMarkets": ["USA", "Germany", "UK", "Australia", "Canada"],
        "typicalMOQ": "10 MT",
        "typicalPricing": "$1,400 - $1,800 / MT",
        "requiredCertifications": ["EEPC", "ISO 9001", "CE Mark Compliance"]
    },
    {
        "product": "Reactive Blue 19 Dye",
        "hsCode": "3204.16",
        "category": "Chemicals",
        "exportMarkets": ["Germany", "USA", "Netherlands", "Bangladesh", "Turkey"],
        "typicalMOQ": "5 MT",
        "typicalPricing": "$4,200 - $5,500 / MT",
        "requiredCertifications": ["Chemexcil", "EU REACH Pre-Reg", "ISO 14001"]
    }
]

# ==========================================
# 4. COUNTRIES DATA
# ==========================================
countries_seed = [
    {
        "country": "UAE",
        "topImportsFromIndia": ["Basmati Rice", "Refined Petroleum", "Jewellery", "Spices", "Textiles"],
        "requiredCertifications": ["Halal Certification", "Phytosanitary Certificate", "Certificate of Origin", "MOCCAE Import Permit"],
        "customsNotes": "Zero customs duty on most essential commodities under India-UAE CEPA. Requires invoice legalization at UAE Embassy.",
        "popularPorts": ["Jebel Ali Port, Dubai", "Khalifa Port, Abu Dhabi", "Port Rashid"]
    },
    {
        "country": "Saudi Arabia",
        "topImportsFromIndia": ["Basmati Rice", "Meat Products", "Organic Chemicals", "Steel Alloys", "Machinery"],
        "requiredCertifications": ["SABER Certificate of Conformity", "SFDA Food Registration", "Halal Cert", "Phytosanitary Cert"],
        "customsNotes": "Strict compliance with SASO standards. Shipments must match electronic SABER ledger declaration before port clearance.",
        "popularPorts": ["Jeddah Islamic Port", "King Abdulaziz Port, Dammam", "King Abdullah Port"]
    },
    {
        "country": "UK",
        "topImportsFromIndia": ["Apparel & Garments", "Pharmaceutical Formulations", "Spices", "Organic Tea", "Marine Engineering Products"],
        "requiredCertifications": ["EU-GMP (Pharma)", "Phytosanitary Certificate", "Certificate of Origin", "UKCA Compliance (Machinery)"],
        "customsNotes": "Enforces strict chemical limits under UK REACH. Prefers GOTS certified textile yarns.",
        "popularPorts": ["Port of Felixstowe", "Port of Southampton", "London Gateway"]
    },
    {
        "country": "Germany",
        "topImportsFromIndia": ["Textile Yarns", "API Chemicals", "Specialty Spices", "Engineering Castings", "Organic Tea"],
        "requiredCertifications": ["EU REACH Registration", "GOTS Certification (Textiles)", "EU Food Safety Standards", "Phytosanitary Certificate"],
        "customsNotes": "Strict limits on pesticide residue (must be under 0.01 mg/kg for grains). Enforces supply chain compliance laws.",
        "popularPorts": ["Port of Hamburg", "Port of Bremen", "Wilhelmshaven"]
    },
    {
        "country": "Netherlands",
        "topImportsFromIndia": ["Industrial Chemicals", "Basmati Grains", "Knitwear Garments", "Automotive Components", "Medicaments"],
        "requiredCertifications": ["EU Food Import Inspection", "EU REACH Registration", "WHO-GMP (Pharma)", "Phytosanitary Cert"],
        "customsNotes": "Rotterdam Port serves as the gateway to the EU. Random moisture testing conducted on all spice/grain imports.",
        "popularPorts": ["Port of Rotterdam", "Port of Amsterdam"]
    },
    {
        "country": "USA",
        "topImportsFromIndia": ["Generic Pharmaceutical APIs", "Knitwear & Apparel", "Black Pepper & Spices", "Automotive Parts", "Handicrafts"],
        "requiredCertifications": ["US FDA Facility Registration", "USDA Organic Certification", "EPA Compliance (Chemicals)", "Phytosanitary Cert"],
        "customsNotes": "Subject to sudden FDA Import Alerts on agricultural goods. Strict Lacey Act requirements on wooden handicrafts.",
        "popularPorts": ["Port of Los Angeles", "Port of New York & New Jersey", "Port of Savannah"]
    }
]

# Write everything to files
with open('src/data/exporters.json', 'w') as f:
    json.dump(exporters, f, indent=2)

with open('src/data/rfqs.json', 'w') as f:
    json.dump(rfqs, f, indent=2)

with open('src/data/products.json', 'w') as f:
    json.dump(products_seed, f, indent=2)

with open('src/data/countries.json', 'w') as f:
    json.dump(countries_seed, f, indent=2)

print("Programmatic Trade Databases compiled successfully under src/data/.")
