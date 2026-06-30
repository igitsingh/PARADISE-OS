with open('src/app/competitors/CompetitorDossier.tsx', 'r') as f:
    content = f.read()
print(content.find('value={null}'))
