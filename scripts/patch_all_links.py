import re
import urllib.parse

file_path = "src/data/competitorIntel.ts"
with open(file_path, "r") as f:
    content = f.read()

# Parse out the brands and update them
# The structure is "brand_key": { ... }
# We can use regex to find each brand block

def replacer(match):
    brand_key = match.group(1)
    block = match.group(2)
    
    # Extract name for search queries
    name_match = re.search(r'"name":\s*"([^"]+)"', block)
    brand_name = name_match.group(1) if name_match else brand_key
    url_encoded_name = urllib.parse.quote_plus(brand_name)
    
    # Extract founder for search query
    founder_match = re.search(r'"founder":\s*"([^"]+)"', block)
    founder = founder_match.group(1) if founder_match else "Unknown"
    
    if founder == "Unknown":
        founder_url = f"https://www.linkedin.com/search/results/all/?keywords={url_encoded_name}"
    else:
        founder_url = f"https://www.linkedin.com/search/results/all/?keywords={urllib.parse.quote_plus(founder)}"
        
    # Insert founderSocialUrl if not present
    if '"founderSocialUrl"' not in block and founder_match:
        block = block.replace(
            f'"founder": "{founder}",', 
            f'"founder": "{founder}",\n    "founderSocialUrl": "{founder_url}",'
        )

    # Marketplace Links
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
        f'"indiamart": "https://www.indiamart.com/proddetail/search?q={url_encoded_name}"', 
        block
    )
    
    # Social Media Links
    # Instagram
    def ig_replacer(m):
        val = m.group(1)
        if val == "Unknown" or val.startswith("http"):
            return f'"instagram": "{val}"'
        val = val.lstrip('@')
        return f'"instagram": "https://instagram.com/{val}"'
    block = re.sub(r'"instagram":\s*"([^"]+)"', ig_replacer, block)
    
    # Facebook
    def fb_replacer(m):
        val = m.group(1)
        if val == "Unknown" or val.startswith("http"):
            return f'"facebook": "{val}"'
        val = val.lstrip('@')
        return f'"facebook": "https://facebook.com/{val}"'
    block = re.sub(r'"facebook":\s*"([^"]+)"', fb_replacer, block)
    
    # LinkedIn
    def li_replacer(m):
        val = m.group(1)
        if val == "Not Publicly Available" or val == "Unknown":
            return f'"linkedin": "https://www.linkedin.com/search/results/all/?keywords={url_encoded_name}"'
        if val.startswith("http"):
            return f'"linkedin": "{val}"'
        return f'"linkedin": "https://www.linkedin.com/search/results/all/?keywords={urllib.parse.quote_plus(val)}"'
    block = re.sub(r'"linkedin":\s*"([^"]+)"', li_replacer, block)

    return f'"{brand_key}": {{{block}}}'

# The regex matches "brand_key": { ... }
# Be careful with nested braces! Since it's a known schema, we can match up to the next brand key or end.
# Actually, it's safer to just split the file by brand blocks or use a simpler regex.
# Let's use a simpler approach: regex that matches from `"brand_key": {` to the next `"idKeys"` and updates globally.
# Actually, replacing line by line is safer if we know the structure.

# Since we have `competitorIntel.ts`, we can just read it, replace what we need.
# Let's apply regex to the whole file because the regexes are specific enough to the keys inside blocks.

# Insert founderSocialUrl
def add_founder_url(match):
    founder = match.group(1)
    if founder == "Unknown":
        # We don't have the brand name easily here, but we can just use the founder string "Unknown" which isn't great.
        pass
    return f'"founder": "{founder}"'

# We can find all brand keys first
brand_keys = re.findall(r'  "([^"]+)": {', content)

for brand in brand_keys:
    # Extract the block for this brand
    pattern = r'(  "' + brand + r'": {.*?)(?=  "[^"]+": {|}\n;|\Z)'
    match = re.search(pattern, content, re.DOTALL)
    if not match:
        continue
    
    block = match.group(1)
    new_block = block
    
    # Extract name
    name_match = re.search(r'"name":\s*"([^"]+)"', block)
    brand_name = name_match.group(1) if name_match else brand
    url_encoded_name = urllib.parse.quote_plus(brand_name)
    
    # Extract founder
    founder_match = re.search(r'"founder":\s*"([^"]+)"', block)
    if founder_match:
        founder = founder_match.group(1)
        if founder == "Unknown":
            founder_url = f"https://www.linkedin.com/search/results/all/?keywords={url_encoded_name}"
        else:
            founder_url = f"https://www.linkedin.com/search/results/all/?keywords={urllib.parse.quote_plus(founder)}"
            
        if '"founderSocialUrl"' not in new_block:
            new_block = new_block.replace(
                f'"founder": "{founder}",', 
                f'"founder": "{founder}",\n    "founderSocialUrl": "{founder_url}",'
            )

    # Marketplaces
    new_block = re.sub(
        r'"amazon":\s*"Active"', 
        f'"amazon": "https://www.amazon.in/s?k={url_encoded_name}"', 
        new_block
    )
    new_block = re.sub(
        r'"flipkart":\s*"Active"', 
        f'"flipkart": "https://www.flipkart.com/search?q={url_encoded_name}"', 
        new_block
    )
    new_block = re.sub(
        r'"indiamart":\s*"Active"', 
        f'"indiamart": "https://www.indiamart.com/search?q={url_encoded_name}"', 
        new_block
    )

    # Socials
    def ig_replacer(m):
        val = m.group(1)
        if val == "Unknown" or val.startswith("http"):
            return f'"instagram": "{val}"'
        val = val.lstrip('@')
        return f'"instagram": "https://instagram.com/{val}"'
    new_block = re.sub(r'"instagram":\s*"([^"]+)"', ig_replacer, new_block)
    
    def fb_replacer(m):
        val = m.group(1)
        if val == "Unknown" or val.startswith("http"):
            return f'"facebook": "{val}"'
        val = val.lstrip('@')
        return f'"facebook": "https://facebook.com/{val}"'
    new_block = re.sub(r'"facebook":\s*"([^"]+)"', fb_replacer, new_block)
    
    def li_replacer(m):
        val = m.group(1)
        if val == "Not Publicly Available" or val == "Unknown":
            return f'"linkedin": "https://www.linkedin.com/search/results/all/?keywords={url_encoded_name}"'
        if val.startswith("http"):
            return f'"linkedin": "{val}"'
        return f'"linkedin": "https://www.linkedin.com/search/results/all/?keywords={urllib.parse.quote_plus(val)}"'
    new_block = re.sub(r'"linkedin":\s*"([^"]+)"', li_replacer, new_block)
    
    content = content.replace(block, new_block)

with open(file_path, "w") as f:
    f.write(content)

print("Updated all brands in competitorIntel.ts")
