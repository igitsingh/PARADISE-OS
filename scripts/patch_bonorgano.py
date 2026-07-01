import re

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

# Update the founder field for bonorgano
content = re.sub(
    r'("bonorgano":\s*{[\s\S]*?"founder":\s*)"Unknown"', 
    r'\1"A team of food and wellness entrepreneurs"', 
    content
)

with open(file_path, "w") as f:
    f.write(content)

print("Updated Bon Organo founder in competitorIntel.ts")
