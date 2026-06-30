import re

with open('src/app/competitors/CompetitorsView.tsx', 'r') as f:
    content = f.read()

# Fix the linkedin error
content = content.replace('intel?.linkedin', '((intel as any)?.linkedin)')

# Fix the possible undefined error
content = content.replace('intel.socialMedia.instagram', 'intel.socialMedia?.instagram')
content = content.replace('intel.socialMedia.facebook', 'intel.socialMedia?.facebook')
content = content.replace('intel.socialMedia.linkedin', 'intel.socialMedia?.linkedin')

with open('src/app/competitors/CompetitorsView.tsx', 'w') as f:
    f.write(content)
