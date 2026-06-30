import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

keys = re.findall(r'^\s*"([a-zA-Z0-9_]+)":\s*\{', content, re.MULTILINE)
from collections import Counter
counts = Counter(keys)
for k, v in counts.items():
    if v > 1:
        print(f"Duplicate key: {k} appears {v} times")
