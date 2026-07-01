import re

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

# Replace social media
content = content.replace(
    '"instagram": "bonorgano",',
    '"instagram": "https://instagram.com/bonorgano",'
)
content = content.replace(
    '"facebook": "bonorgano",',
    '"facebook": "https://facebook.com/bonorgano",'
)
content = content.replace(
    '"linkedin": "Not Publicly Available",',
    '"linkedin": "https://www.linkedin.com/search/results/all/?keywords=bon+organo",'
)

# Replace marketplace
content = content.replace(
    '"amazon": "Active",',
    '"amazon": "https://www.amazon.in/s?k=bon+organo",'
)
content = content.replace(
    '"flipkart": "Active",',
    '"flipkart": "https://www.flipkart.com/search?q=bon+organo",'
)
content = content.replace(
    '"indiamart": "Active"',
    '"indiamart": "https://www.indiamart.com/proddetail/search?q=bon+organo"'
)

with open(file_path, "w") as f:
    f.write(content)

print("Updated Bon Organo links in competitorIntel.ts")
