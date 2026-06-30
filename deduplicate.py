import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

# Remove the SECOND instance of tatvahills
# First instance starts at:
idx1 = content.find('  "tatvahills": {')
if idx1 != -1:
    idx2 = content.find('  "tatvahills": {', idx1 + 1)
    if idx2 != -1:
        # Find where the second one ends. It ends at the next `  "tribalfactory": {`
        idx3 = content.find('  "tribalfactory": {', idx2)
        if idx3 != -1:
            content = content[:idx2] + content[idx3:]

with open('src/data/competitorIntel.ts', 'w') as f:
    f.write(content)
