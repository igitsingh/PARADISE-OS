import sys

with open('src/app/competitors/CompetitorsView.tsx', 'r') as f:
    content = f.read()

# 1. Add import
if 'import { getCompetitorIntel }' not in content:
    content = content.replace(
        "import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from \"@/components/ui/table\";",
        "import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from \"@/components/ui/table\";\nimport { getCompetitorIntel } from \"@/data/competitorIntel\";"
    )

# 2. Refactor sorting logic (around line 105)
old_sort_logic = """    const aComp = a.name === 'Diaspora Co.' ? 'diaspora co. llc' : a.name === 'My Pahadi Dukan' ? 'himkart india private limited' : a.name === 'Niraam Superfoods' ? 'navitrade overseas pvt. ltd.' : a.name === 'Maatru Rasah' ? 'prof impetus llp' : a.name === 'Two Brothers Organic Farms' ? 'two brothers organic farms' : a.name === 'Trinay Ayurveda' ? 'trinay ayurveda' : 'unknown';
    const bComp = b.name === 'Diaspora Co.' ? 'diaspora co. llc' : b.name === 'My Pahadi Dukan' ? 'himkart india private limited' : b.name === 'Niraam Superfoods' ? 'navitrade overseas pvt. ltd.' : b.name === 'Maatru Rasah' ? 'prof impetus llp' : b.name === 'Two Brothers Organic Farms' ? 'two brothers organic farms' : b.name === 'Trinay Ayurveda' ? 'trinay ayurveda' : 'unknown';

    const aEntity = a.name === 'Diaspora Co.' ? 'dtc brand / importer' : a.name === 'My Pahadi Dukan' ? 'd2c marketplace' : a.name === 'Niraam Superfoods' ? 'dtc brand' : a.name === 'Maatru Rasah' ? 'artisanal dtc brand' : a.name === 'Two Brothers Organic Farms' ? 'regenerative dtc brand' : a.name === 'Trinay Ayurveda' ? 'ayurvedic wellness brand' : 'unknown';
    const bEntity = b.name === 'Diaspora Co.' ? 'dtc brand / importer' : b.name === 'My Pahadi Dukan' ? 'd2c marketplace' : b.name === 'Niraam Superfoods' ? 'dtc brand' : b.name === 'Maatru Rasah' ? 'artisanal dtc brand' : b.name === 'Two Brothers Organic Farms' ? 'regenerative dtc brand' : b.name === 'Trinay Ayurveda' ? 'ayurvedic wellness brand' : 'unknown';

    const aLoc = a.name === 'Diaspora Co.' ? 'oakland, california' : a.name === 'My Pahadi Dukan' ? 'roorkee, uttarakhand' : a.name === 'Niraam Superfoods' ? 'kolkata, west bengal' : a.name === 'Maatru Rasah' ? 'prayagraj, uttar pradesh' : a.name === 'Two Brothers Organic Farms' ? 'pune, maharashtra' : a.name === 'Trinay Ayurveda' ? 'hyderabad, telangana' : 'unknown';
    const bLoc = b.name === 'Diaspora Co.' ? 'oakland, california' : b.name === 'My Pahadi Dukan' ? 'roorkee, uttarakhand' : b.name === 'Niraam Superfoods' ? 'kolkata, west bengal' : b.name === 'Maatru Rasah' ? 'prayagraj, uttar pradesh' : b.name === 'Two Brothers Organic Farms' ? 'pune, maharashtra' : b.name === 'Trinay Ayurveda' ? 'hyderabad, telangana' : 'unknown';

    const aCurcumin = a.name === 'Diaspora Co.' ? 4.7 : a.name === 'My Pahadi Dukan' ? 8.0 : a.name === 'Niraam Superfoods' ? 7.0 : a.name === 'Maatru Rasah' ? 9.5 : a.name === 'Two Brothers Organic Farms' ? 10.43 : a.name === 'Trinay Ayurveda' ? 0 : -1;
    const bCurcumin = b.name === 'Diaspora Co.' ? 4.7 : b.name === 'My Pahadi Dukan' ? 8.0 : b.name === 'Niraam Superfoods' ? 7.0 : b.name === 'Maatru Rasah' ? 9.5 : b.name === 'Two Brothers Organic Farms' ? 10.43 : b.name === 'Trinay Ayurveda' ? 0 : -1;"""

new_sort_logic = """    const aIntel = getCompetitorIntel(a.id);
    const bIntel = getCompetitorIntel(b.id);

    const aComp = aIntel ? aIntel.company : 'unknown';
    const bComp = bIntel ? bIntel.company : 'unknown';

    const aEntity = aIntel ? aIntel.entityType : 'unknown';
    const bEntity = bIntel ? bIntel.entityType : 'unknown';

    const aLoc = aIntel ? aIntel.location : 'unknown';
    const bLoc = bIntel ? bIntel.location : 'unknown';

    const aCurcumin = aIntel ? aIntel.curcuminValue : -1;
    const bCurcumin = bIntel ? bIntel.curcuminValue : -1;"""

content = content.replace(old_sort_logic, new_sort_logic)

# 3. Refactor Table row rendering
old_row_logic = """            const isDiaspora = comp.name === 'Diaspora Co.';
            const isPahadi = comp.name === 'My Pahadi Dukan';
            const isNiraam = comp.name === 'Niraam Superfoods';
            const isMaatru = comp.name === 'Maatru Rasah';
            const isTwoBrothers = comp.name === 'Two Brothers Organic Farms' || comp.id === 'org-tbo-farms';
            const isTrinay = comp.name === 'Trinay Ayurveda';
            
            const company = isDiaspora ? 'Diaspora Co. LLC' : isPahadi ? 'HIMKART INDIA PRIVATE LIMITED' : isNiraam ? 'Navitrade Overseas Pvt. Ltd.' : isMaatru ? 'Prof Impetus LLP' : isTwoBrothers ? 'Two Brothers Organic Farms' : isTrinay ? 'Trinay Ayurveda' : 'Unknown';
            const entityType = isDiaspora ? 'DTC Brand / Importer' : isPahadi ? 'D2C Marketplace' : isNiraam ? 'DTC Brand' : isMaatru ? 'Artisanal DTC Brand' : isTwoBrothers ? 'Regenerative DTC Brand' : isTrinay ? 'Ayurvedic Wellness Brand' : 'Unknown';
            const location = isDiaspora ? 'Oakland, California' : isPahadi ? 'Roorkee, Uttarakhand' : isNiraam ? 'Kolkata, West Bengal' : isMaatru ? 'Prayagraj, Uttar Pradesh' : isTwoBrothers ? 'Pune, Maharashtra' : isTrinay ? 'Hyderabad, Telangana' : 'Unknown';
            const marketTier = isDiaspora ? 'Ultra Premium' : isPahadi ? 'Premium' : isNiraam ? 'Premium' : isMaatru ? 'Premium Artisanal' : isTwoBrothers ? 'Premium Mass' : isTrinay ? 'Standard Mass' : 'Unknown';
            const curcuminDisplay = isDiaspora ? '4.7 - 5.2%' : isPahadi ? '8.0 - 10.0%' : isNiraam ? '7.0%+' : isMaatru ? '7.0 - 12.0%' : isTwoBrothers ? '10.43%' : isTrinay ? '95% (Claim)' : 'Verification Pending';
            const url = isDiaspora ? 'https://diasporaco.com' : isPahadi ? 'https://mypahadidukan.com' : isNiraam ? 'https://niraam.com' : isMaatru ? 'https://maatrurasah.com' : isTwoBrothers ? 'https://twobrothersindiashop.com' : isTrinay ? 'https://trinaya.co.in' : '#';
            const displayUrl = isDiaspora ? 'diasporaco.com' : isPahadi ? 'mypahadidukan.com' : isNiraam ? 'niraam.com' : isMaatru ? 'maatrurasah.com' : isTwoBrothers ? 'twobrothersindiashop.com' : isTrinay ? 'trinaya.co.in' : 'Verification Pending';
            const igUrl = isDiaspora ? 'https://instagram.com/diasporaco' : isPahadi ? 'https://instagram.com/mypahadidukan' : isMaatru ? 'https://instagram.com/maatrurasah' : isTwoBrothers ? 'https://instagram.com/twobrothersorganicfarmsindia' : null;
            const igDisplay = isDiaspora ? '@diasporaco' : isPahadi ? '@mypahadidukan' : isMaatru ? '@maatrurasah' : isTwoBrothers ? '@twobrothersorganicfarmsindia' : null;
            const fbUrl = isDiaspora ? 'https://facebook.com/diasporaco' : isPahadi ? 'https://facebook.com/mypahadidukan' : isMaatru ? 'https://facebook.com/maatrurasah' : isTwoBrothers ? 'https://facebook.com/twobrothersorganicfarms' : null;
            const fbDisplay = isDiaspora ? 'Diaspora Co.' : isPahadi ? 'My Pahadi Dukan' : isMaatru ? 'Maatru Rasah' : isTwoBrothers ? 'Two Brothers Organic Farms' : null;"""

new_row_logic = """            const intel = getCompetitorIntel(comp.id);
            
            const company = intel ? intel.company.toUpperCase() : 'Unknown';
            const entityType = intel ? intel.entityType.replace(/\\b\\w/g, l => l.toUpperCase()) : 'Unknown';
            const location = intel ? intel.location.replace(/\\b\\w/g, l => l.toUpperCase()) : 'Unknown';
            const marketTier = intel ? intel.marketTier.replace(/\\b\\w/g, l => l.toUpperCase()) : 'Unknown';
            const curcuminDisplay = intel ? intel.curcuminDisplay || 'Verification Pending' : 'Verification Pending';
            const url = intel ? intel.websiteUrl : '#';
            const displayUrl = intel ? intel.websiteDisplay : 'Verification Pending';
            const igUrl = intel ? intel.instagramUrl : null;
            const igDisplay = intel ? intel.instagramHandle : null;
            const fbUrl = intel ? intel.facebookUrl : null;
            const fbDisplay = intel ? intel.facebookHandle : null;"""

content = content.replace(old_row_logic, new_row_logic)

with open('src/app/competitors/CompetitorsView.tsx', 'w') as f:
    f.write(content)

