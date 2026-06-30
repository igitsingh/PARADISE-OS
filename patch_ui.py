import os
import re

def update_competitor_intel():
    path = 'src/data/competitorIntel.ts'
    with open(path, 'r') as f:
        content = f.read()
    
    # 1. Add fields to interface
    if "officialPhone?: string | null;" not in content:
        content = content.replace("officialEmail: string | null;", 
                                "officialEmail: string | null;\n  officialPhone?: string | null;\n  companyRegistration?: string | null;\n  gst?: string | null;\n  fssai?: string | null;")
    
    # 2. Update NAKI
    if '"officialPhone"' not in content:
        content = content.replace('"officialEmail": "nakistore.in@gmail.com",',
                                '"officialEmail": "nakistore.in@gmail.com",\n    "officialPhone": "Not Publicly Available",\n    "companyRegistration": "Not Publicly Available",\n    "gst": "Not Publicly Available",\n    "fssai": "Available (See Certifications)",')
                                
    with open(path, 'w') as f:
        f.write(content)

def update_dossier():
    path = 'src/app/competitors/CompetitorDossier.tsx'
    with open(path, 'r') as f:
        content = f.read()
    
    # Replace hardcoded nulls in Company Profile
    content = content.replace('<Field label="Official Phone" value={null} />', '<Field label="Official Phone" value={intel?.officialPhone || null} verified={intel?.officialPhone !== "Not Publicly Available" && !!intel?.officialPhone} />')
    content = content.replace('<Field label="Company Registration" value={null} />', '<Field label="Company Registration" value={intel?.companyRegistration || null} verified={intel?.companyRegistration !== "Not Publicly Available" && !!intel?.companyRegistration} />')
    content = content.replace('<Field label="GST / Tax ID" value={null} />', '<Field label="GST / Tax ID" value={intel?.gst || null} verified={intel?.gst !== "Not Publicly Available" && !!intel?.gst} />')
    content = content.replace('<Field label="FSSAI" value={null} />', '<Field label="FSSAI" value={intel?.fssai || null} verified={intel?.fssai !== "Not Publicly Available" && !!intel?.fssai} />')

    with open(path, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    update_competitor_intel()
    update_dossier()
    print("Updates applied.")
