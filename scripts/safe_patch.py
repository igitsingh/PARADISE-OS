import re
import urllib.parse

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    text = f.read()

# We will find each top-level block by matching:
# \n  "brand_key": {\n ... \n  },
# We can do this by finding all indices of `\n  "`

def process_block(block):
    # block is everything from `"brand": {` up to `\n  },`
    name_match = re.search(r'"name":\s*"([^"]+)"', block)
    if name_match:
        brand_name = name_match.group(1)
    else:
        # try to get the key
        key_match = re.search(r'^"([^"]+)": {', block.strip())
        brand_name = key_match.group(1) if key_match else "Unknown"
        
    url_encoded_name = urllib.parse.quote_plus(brand_name)
    
    # 1. ADD/UPDATE FOUNDER URL
    founder_match = re.search(r'"founder":\s*"([^"]+)"', block)
    if founder_match:
        founder = founder_match.group(1)
        if founder == "Unknown":
            founder_url = f"https://www.linkedin.com/search/results/all/?keywords={url_encoded_name}"
        else:
            founder_url = f"https://www.linkedin.com/search/results/all/?keywords={urllib.parse.quote_plus(founder)}"
            
        if '"founderSocialUrl"' not in block:
            block = block.replace(
                f'"founder": "{founder}",', 
                f'"founder": "{founder}",\n    "founderSocialUrl": "{founder_url}",'
            )
            
    # 2. ADD MARKETPLACE
    marketplace_block = f'''    "marketplace": {{
      "amazon": "https://www.amazon.in/s?k={url_encoded_name}",
      "flipkart": "https://www.flipkart.com/search?q={url_encoded_name}",
      "indiamart": "https://www.indiamart.com/search?q={url_encoded_name}"
    }}'''

    if '"marketplace": {' not in block:
        # Find the last key in the block.
        # The block ends right before the closing `  },` or `  }`
        # We can just insert it at the end of the block.
        # To do this safely, we append it right before the final newline of the block content.
        # Ensure we add a comma to the previous line if it doesn't have one.
        # Let's use regex to find the last non-empty line
        lines = block.rstrip().split('\n')
        if not lines[-1].endswith(','):
            lines[-1] += ','
        lines.append(marketplace_block)
        block = '\n'.join(lines) + '\n'
    else:
        # Marketplace exists, replace 'Active' with links
        block = re.sub(
            r'"amazon":\s*"Active"', 
            f'"amazon": "https://www.amazon.in/s?k={url_encoded_name}"', 
            block
        )
        block = re.sub(
            r'"flipkart":\s*"Active"', 
            f'"flipkart": "https://www.flipkart.com/search?q={url_encoded_name}"', 
            block
        )
        block = re.sub(
            r'"indiamart":\s*"Active"', 
            f'"indiamart": "https://www.indiamart.com/search?q={url_encoded_name}"', 
            block
        )
        
    # 3. UPDATE SOCIALS
    def ig_replacer(m):
        val = m.group(1)
        if val == "Unknown" or val.startswith("http"):
            return f'"instagram": "{val}"'
        val = val.lstrip('@')
        return f'"instagram": "https://instagram.com/{val}"'
    block = re.sub(r'"instagram":\s*"([^"]+)"', ig_replacer, block)
    
    def fb_replacer(m):
        val = m.group(1)
        if val == "Unknown" or val.startswith("http"):
            return f'"facebook": "{val}"'
        val = val.lstrip('@')
        return f'"facebook": "https://facebook.com/{val}"'
    block = re.sub(r'"facebook":\s*"([^"]+)"', fb_replacer, block)
    
    def li_replacer(m):
        val = m.group(1)
        if val == "Not Publicly Available" or val == "Unknown":
            return f'"linkedin": "https://www.linkedin.com/search/results/all/?keywords={url_encoded_name}"'
        if val.startswith("http"):
            return f'"linkedin": "{val}"'
        return f'"linkedin": "https://www.linkedin.com/search/results/all/?keywords={urllib.parse.quote_plus(val)}"'
    block = re.sub(r'"linkedin":\s*"([^"]+)"', li_replacer, block)
        
    return block


# Let's split by the top-level keys.
# We know they look like `\n  "someKey": {\n`
# We can find all matches of `\n  "[^"]+": {\n`
parts = re.split(r'(\n  "[^"]+": \{\n)', text)
# parts[0] is the header
# parts[1] is `\n  "brand1": {\n`
# parts[2] is the content up to the next brand, WHICH INCLUDES `\n  },`
# parts[3] is `\n  "brand2": {\n`
# parts[4] is the content ...
# But wait, parts[2] might just be the content of brand1 ending with `\n  },` and parts[3] immediately follows.
# Wait, the last part will end with `\n  }\n};\n`

new_text = parts[0]
for i in range(1, len(parts), 2):
    brand_start = parts[i]
    brand_content = parts[i+1]
    
    # brand_content ends with `\n  },` or `\n  }\n};\n`
    # We need to extract just the inside, process it, and reconstruct.
    # We can split by the final `\n  }` or `\n  },`
    
    # Find the last `\n  }` or `\n  },` in brand_content
    match = re.search(r'(\n  \},?)(?:\n\}|;|\Z)*$', brand_content)
    if not match:
        # Should not happen unless format is weird
        new_text += brand_start + brand_content
        continue
        
    footer_idx = match.start(1)
    inner_block = brand_content[:footer_idx]
    footer_block = brand_content[footer_idx:]
    
    processed_inner = process_block(inner_block)
    
    new_text += brand_start + processed_inner + footer_block
    
with open(file_path, "w") as f:
    f.write(new_text)

print("Safely patched all competitors!")
