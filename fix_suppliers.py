import re

with open('src/app/suppliers/SuppliersView.tsx', 'r') as f:
    content = f.read()

# We need to move the SortHeader component outside of the SuppliersView render function
# Look for const SortHeader = ...
pattern = r'  const SortHeader = \(\{ field, label, className = "" \}: \{ field: string, label: string, className\?: string \}\) \=\> \(\n    \<th[\s\S]*?\<\/th\>\n  \);'
match = re.search(pattern, content)
if match:
    sort_header_code = match.group(0)
    # Remove it from inside the function
    content = content.replace(sort_header_code, '')
    
    # Place it above the main export default function
    # Let's find "export default function SuppliersView"
    insert_idx = content.find('export default function SuppliersView')
    if insert_idx != -1:
        # Strip the 2 leading spaces from sort_header_code
        sort_header_code = "\n".join([line[2:] if line.startswith("  ") else line for line in sort_header_code.split("\n")])
        content = content[:insert_idx] + sort_header_code + '\n\n' + content[insert_idx:]

with open('src/app/suppliers/SuppliersView.tsx', 'w') as f:
    f.write(content)
