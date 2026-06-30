import re

with open('src/data/competitorIntel.ts', 'r') as f:
    content = f.read()

# We know the keys that are duplicated: neetacha, organicmandya, simplyorganic, tatvahills
# Let's find the FIRST occurrence of each and remove it, or rather, the SECOND occurrence.
# A brand block starts with:
#   "brand_key": {
# and ends right before the next brand key which also starts with:
#   "next_brand_key": {

# Let's write a simple state machine to parse out top level keys in `competitorData = {`
start_idx = content.find('export const competitorData: Record<string, CompetitorIntel> = {') + len('export const competitorData: Record<string, CompetitorIntel> = {')

# The easiest way is just to manually delete the lines we know are duplicate.
# Wait, I'll just write a script that reconstructs the file.
