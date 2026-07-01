import re

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

# Update the idKeys field for frontier
content = re.sub(
    r'("frontier":\s*{[\s\S]*?"idKeys":\s*\[)([^\]]*)\]', 
    r'\1\2, "brand_w9iokkmdkn9s7mdb8h20"]', 
    content
)

with open(file_path, "w") as f:
    f.write(content)

print("Updated Frontier Co-op idKeys in competitorIntel.ts")
