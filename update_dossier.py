import sys
import re

with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()

# 1. hasData and isTwoBrothers
content = content.replace(
    "const isMaatru = competitor.name === 'Maatru Rasah' || competitor.id === 'org-maatru-rasah';",
    "const isMaatru = competitor.name === 'Maatru Rasah' || competitor.id === 'org-maatru-rasah';\n  const isTwoBrothers = competitor.name === 'Two Brothers Organic Farms' || competitor.id === 'brand_vbix0z7r13x968q5j9p2' || competitor.id === 'org-tbo-farms';"
)
content = content.replace(
    "const hasData = isDiaspora || isPahadi || isNiraam || isMaatru;",
    "const hasData = isDiaspora || isPahadi || isNiraam || isMaatru || isTwoBrothers;"
)

# 2. Company Profile
replacements = [
    ('isMaatru ? "Prof Impetus LLP" : null', 'isMaatru ? "Prof Impetus LLP" : isTwoBrothers ? "Two Brothers Organic Farms" : null'),
    ('isMaatru ? "Dr. (CS) Puja Shree Agarwal" : null', 'isMaatru ? "Dr. (CS) Puja Shree Agarwal" : isTwoBrothers ? "Satyajit & Ajinkya Hange" : null'),
    ('isMaatru ? "2013" : null', 'isMaatru ? "2013" : isTwoBrothers ? "2011" : null'),
    ('isMaatru ? "Prayagraj, Uttar Pradesh" : null', 'isMaatru ? "Prayagraj, Uttar Pradesh" : isTwoBrothers ? "Pune, Maharashtra" : null'),
    ('isMaatru ? "India" : null', 'isMaatru ? "India" : isTwoBrothers ? "India" : null'),
    ('isMaatru ? "Prayagraj (Handmade)" : null', 'isMaatru ? "Prayagraj (Handmade)" : isTwoBrothers ? "Bhodani, Maharashtra" : null'),
    ('isMaatru ? "Jaintia Hills, Meghalaya" : null', 'isMaatru ? "Jaintia Hills, Meghalaya" : isTwoBrothers ? "Bhodani, Maharashtra" : null'),
    ('isMaatru ? "India" : null', 'isMaatru ? "India" : isTwoBrothers ? "Global (40+ Countries)" : null'),
    ('isMaatru ? "maatrurasah.com" : null', 'isMaatru ? "maatrurasah.com" : isTwoBrothers ? "twobrothersindiashop.com" : null'),
    ('isMaatru ? "info@maatrurasah.com" : null', 'isMaatru ? "info@maatrurasah.com" : isTwoBrothers ? "info@twobrothersindiashop.com" : null')
]
for old, new in replacements:
    content = content.replace(old, new)

# 3. Curcumin Information
content = content.replace(
    'isMaatru ? "7.0 - 12.0%" : null', 'isMaatru ? "7.0 - 12.0%" : isTwoBrothers ? "10.43%" : null'
)
content = content.replace(
    '(isPahadi || isNiraam || isMaatru) ? "Unknown" : null', '(isPahadi || isNiraam || isMaatru || isTwoBrothers) ? "Unknown" : null'
)
content = content.replace(
    'isMaatru ? "Natural/Traditional" : null', 'isMaatru ? "Natural/Traditional" : isTwoBrothers ? "Regenerative Organic" : null'
)
content = content.replace(
    '(isPahadi || isNiraam || isMaatru) ? "Lakadong" : null', '(isPahadi || isNiraam || isMaatru || isTwoBrothers) ? "Lakadong" : null'
)

# 4. Brand Positioning
content = content.replace(
    "isMaatru ? 'Artisanal' : 'Premium'",
    "isTwoBrothers ? 'Regenerative' : isMaatru ? 'Artisanal' : 'Premium'"
)
content = content.replace(
    "isMaatru ? 'Heritage' : 'Purity-focused'",
    "isTwoBrothers ? 'Farmer-led' : isMaatru ? 'Heritage' : 'Purity-focused'"
)
content = content.replace(
    "isMaatru ? 'Small Batch' : 'Sustainable'",
    "isTwoBrothers ? 'Sustainable' : isMaatru ? 'Small Batch' : 'Sustainable'"
)
content = content.replace(
    'isMaatru ? "A mother\'s essence. Heritage recipes from 1857, stone-ground in small batches without machinery." : null',
    'isMaatru ? "A mother\'s essence. Heritage recipes from 1857, stone-ground in small batches without machinery." : isTwoBrothers ? "Regenerative farming by fourth-generation farmers, bringing chemical-free, natural food from village to global homes." : null'
)

with open('src/app/competitors/CompetitorDossier.tsx', 'w') as f:
    f.write(content)

