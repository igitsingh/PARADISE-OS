import re

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

bonorgano_section = content.find('"bonorgano":')
next_section = content.find('"burlap":', bonorgano_section)

if bonorgano_section != -1:
    end_idx = next_section if next_section != -1 else len(content)
    section_content = content[bonorgano_section:end_idx]
    
    section_content = section_content.replace('"weight": "Various"', '"weight": "250g"')
    section_content = section_content.replace('"mrp": "Unknown"', '"mrp": "₹750"')
    section_content = section_content.replace('"websitePrice": "₹500 (approx)"', '"websitePrice": "₹525"')
    section_content = section_content.replace('"retailPrice": "₹500 (approx)"', '"retailPrice": "₹750"')
    
    content = content[:bonorgano_section] + section_content + content[end_idx:]

with open(file_path, "w") as f:
    f.write(content)

print("Updated Bon Organo price and weight")
