with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

content = content.replace('"heavyMetalsTested": "Unknown"', '"heavyMetalsTested": "No (Unverified)"', 1)
content = content.replace('"organic": "Natural"', '"organic": "Claimed (Uncertified)"', 1)

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
