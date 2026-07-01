import re
import urllib.parse

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    lines = f.readlines()

out_lines = []
in_brand_block = False
current_brand_name = ""
has_marketplace = False
marketplace_start_idx = -1
marketplace_end_idx = -1
nested_braces = 0

brand_name_pattern = re.compile(r'"name":\s*"([^"]+)"')
brand_key_pattern = re.compile(r'^  "([^"]+)": {$')

def get_marketplace_block(name):
    encoded = urllib.parse.quote_plus(name)
    return [
        f'    "marketplace": {{\n',
        f'      "amazon": "https://www.amazon.in/s?k={encoded}",\n',
        f'      "flipkart": "https://www.flipkart.com/search?q={encoded}",\n',
        f'      "indiamart": "https://www.indiamart.com/search?q={encoded}"\n',
        f'    }},\n'
    ]

i = 0
while i < len(lines):
    line = lines[i]
    
    # Check if we are starting a brand block
    match = brand_key_pattern.match(line)
    if match:
        in_brand_block = True
        current_brand_name = match.group(1) # Default to key
        has_marketplace = False
        nested_braces = 1
        out_lines.append(line)
        i += 1
        continue
        
    if in_brand_block:
        if '{' in line:
            nested_braces += line.count('{')
        if '}' in line:
            nested_braces -= line.count('}')
            
        name_match = brand_name_pattern.search(line)
        if name_match:
            current_brand_name = name_match.group(1)
            
        if '"marketplace": {' in line:
            has_marketplace = True
            # We want to replace this existing marketplace block with search links.
            # So we will skip appending lines until this block closes.
            # First, append our new marketplace block.
            out_lines.extend(get_marketplace_block(current_brand_name))
            
            # Now skip lines until this block is closed
            mb_braces = 1
            i += 1
            while mb_braces > 0 and i < len(lines):
                if '{' in lines[i]: mb_braces += lines[i].count('{')
                if '}' in lines[i]: mb_braces -= lines[i].count('}')
                i += 1
            # We skipped the marketplace block.
            # We don't append the closing brace line, because our get_marketplace_block already has `    },\n`
            
            # Since we just consumed the closing brace of the marketplace block, we must also update nested_braces of the brand block
            # Actually, we tracked nested_braces above, but since we skipped lines, we need to adjust it or just rely on the main loop.
            # Let's just do a simpler approach: process line by line, but if we are in marketplace, skip it.
            # It's easier to process the whole block as a string.
            continue
            
        # Check if the brand block is ending
        if nested_braces == 0 and line.strip() in ['},', '}']:
            # End of brand block
            if not has_marketplace:
                # Insert marketplace block before the closing brace
                out_lines.extend(get_marketplace_block(current_brand_name))
            in_brand_block = False
            
    out_lines.append(line)
    i += 1

with open(file_path, "w") as f:
    f.writelines(out_lines)

print("Marketplaces successfully overwritten/added for all brands!")
