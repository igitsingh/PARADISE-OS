import sys

with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()

# 1. hasData and isTrinay
content = content.replace(
    "const isTwoBrothers = competitor.name === 'Two Brothers Organic Farms' || competitor.id === 'brand_vbix0z7r13x968q5j9p2' || competitor.id === 'org-tbo-farms';",
    "const isTwoBrothers = competitor.name === 'Two Brothers Organic Farms' || competitor.id === 'brand_vbix0z7r13x968q5j9p2' || competitor.id === 'org-tbo-farms';\n  const isTrinay = competitor.name === 'Trinay Ayurveda' || competitor.id === 'brand_ubgq8665djjkxzqbjp2k' || competitor.id === 'org-trinay-ayurveda';"
)
content = content.replace(
    "const hasData = isDiaspora || isPahadi || isNiraam || isMaatru || isTwoBrothers;",
    "const hasData = isDiaspora || isPahadi || isNiraam || isMaatru || isTwoBrothers || isTrinay;"
)

# 2. Company Profile
replacements = [
    ('isTwoBrothers ? "Two Brothers Organic Farms" : null', 'isTwoBrothers ? "Two Brothers Organic Farms" : isTrinay ? "Trinay Ayurveda" : null'),
    ('isTwoBrothers ? "Two Brothers Organic Farms" : null', 'isTwoBrothers ? "Two Brothers Organic Farms" : isTrinay ? "Trinay Ayurveda" : null'),
    ('isTwoBrothers ? "Satyajit & Ajinkya Hange" : null', 'isTwoBrothers ? "Satyajit & Ajinkya Hange" : isTrinay ? "Unknown" : null'),
    ('isTwoBrothers ? "2011" : null', 'isTwoBrothers ? "2011" : isTrinay ? "Unknown" : null'),
    ('isTwoBrothers ? "Pune, Maharashtra" : null', 'isTwoBrothers ? "Pune, Maharashtra" : isTrinay ? "Hyderabad, Telangana" : null'),
    ('isTwoBrothers ? "India" : null', 'isTwoBrothers ? "India" : isTrinay ? "India" : null'),
    ('isTwoBrothers ? "Bhodani, Maharashtra" : null', 'isTwoBrothers ? "Bhodani, Maharashtra" : isTrinay ? "Hyderabad" : null'),
    ('isTwoBrothers ? "Bhodani, Maharashtra" : null', 'isTwoBrothers ? "Bhodani, Maharashtra" : isTrinay ? "Hyderabad" : null'),
    ('isTwoBrothers ? "Global (40+ Countries)" : null', 'isTwoBrothers ? "Global (40+ Countries)" : isTrinay ? "India" : null'),
    ('isTwoBrothers ? "India" : null', 'isTwoBrothers ? "India" : isTrinay ? "India" : null'),
    ('isTwoBrothers ? "twobrothersindiashop.com" : null', 'isTwoBrothers ? "twobrothersindiashop.com" : isTrinay ? "trinaya.co.in" : null'),
    ('isTwoBrothers ? "info@twobrothersindiashop.com" : null', 'isTwoBrothers ? "info@twobrothersindiashop.com" : isTrinay ? "contact@trinaya.co.in" : null')
]
for old, new in replacements:
    content = content.replace(old, new)

# 3. Curcumin Information
content = content.replace(
    'isTwoBrothers ? "10.43%" : null', 'isTwoBrothers ? "10.43%" : isTrinay ? "95% Curcuminoids (Stated)" : null'
)
content = content.replace(
    '(isPahadi || isNiraam || isMaatru || isTwoBrothers) ? "Unknown" : null', '(isPahadi || isNiraam || isMaatru || isTwoBrothers || isTrinay) ? "Unknown" : null'
)
content = content.replace(
    'isTwoBrothers ? "Regenerative Organic" : null', 'isTwoBrothers ? "Regenerative Organic" : isTrinay ? "Ayurvedic/Herbal" : null'
)
content = content.replace(
    '(isPahadi || isNiraam || isMaatru || isTwoBrothers) ? "Lakadong" : null', '(isPahadi || isNiraam || isMaatru || isTwoBrothers) ? "Lakadong" : isTrinay ? "Unknown" : null'
)

# 4. Brand Positioning
content = content.replace(
    "isTwoBrothers ? 'Regenerative' : isMaatru",
    "isTrinay ? 'Ayurvedic' : isTwoBrothers ? 'Regenerative' : isMaatru"
)
content = content.replace(
    "isTwoBrothers ? 'Farmer-led' : isMaatru",
    "isTrinay ? 'Clinical/Wellness' : isTwoBrothers ? 'Farmer-led' : isMaatru"
)
content = content.replace(
    "isTwoBrothers ? 'Sustainable' : isMaatru",
    "isTrinay ? 'Traditional' : isTwoBrothers ? 'Sustainable' : isMaatru"
)
content = content.replace(
    'isTwoBrothers ? "Regenerative farming by fourth-generation farmers, bringing chemical-free, natural food from village to global homes." : null',
    'isTwoBrothers ? "Regenerative farming by fourth-generation farmers, bringing chemical-free, natural food from village to global homes." : isTrinay ? "Ayurvedic wellness and clean, conscious herbal products focused on traditional medicinal purity." : null'
)

with open('src/app/competitors/CompetitorDossier.tsx', 'w') as f:
    f.write(content)

