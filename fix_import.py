import re

with open('src/app/competitors/CompetitorsView.tsx', 'r') as f:
    content = f.read()

# Add the import at the top
import_statement = "import { getCompetitorIntel } from '../../data/competitorIntel';\n"
if "getCompetitorIntel" not in content[:500]: # check if it's already there
    # Insert right after the React import
    insert_idx = content.find('import React')
    if insert_idx != -1:
        end_of_line = content.find('\n', insert_idx) + 1
        content = content[:end_of_line] + import_statement + content[end_of_line:]
    else:
        content = import_statement + content

with open('src/app/competitors/CompetitorsView.tsx', 'w') as f:
    f.write(content)
