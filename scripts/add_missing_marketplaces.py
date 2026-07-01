import re
import urllib.parse

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

brand_keys = re.findall(r'  "([^"]+)": {', content)

for brand in brand_keys:
    # Find the block for the brand
    pattern = r'(  "' + brand + r'": {.*?)(?=  "[^"]+": {|}\n;|\Z)'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        continue
    
    block = match.group(1)
    
    # Check if marketplace exists
    if '"marketplace": {' not in block:
        # Extract name
        name_match = re.search(r'"name":\s*"([^"]+)"', block)
        brand_name = name_match.group(1) if name_match else brand
        url_encoded_name = urllib.parse.quote_plus(brand_name)
        
        # Create marketplace block
        marketplace_block = f'''
    "marketplace": {{
      "amazon": "https://www.amazon.in/s?k={url_encoded_name}",
      "flipkart": "https://www.flipkart.com/search?q={url_encoded_name}",
      "indiamart": "https://www.indiamart.com/search?q={url_encoded_name}"
    }},'''
        
        # We need to insert this right before "socialMedia": { or at the end of the block
        if '"socialMedia": {' in block:
            new_block = block.replace('"socialMedia": {', f'{marketplace_block.lstrip()}\n    "socialMedia": {{')
        else:
            # Just append to the end of the block (before the last `}`)
            # This is tricky because the block might end with a comma or not.
            # Let's insert before `"websiteIntel"` if possible
            if '"websiteIntel": {' in block:
                new_block = block.replace('"websiteIntel": {', f'{marketplace_block.lstrip()}\n    "websiteIntel": {{')
            else:
                # Find the last key and append
                # Let's just find the last closing brace of a major section
                new_block = block + marketplace_block
        
        content = content.replace(block, new_block)

with open(file_path, "w") as f:
    f.write(content)

print("Added missing marketplace links for all brands.")
