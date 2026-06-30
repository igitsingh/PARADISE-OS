import re

with open('src/app/suppliers/SuppliersView.tsx', 'r') as f:
    content = f.read()

# I need to put SortHeader back inside SuppliersView, but change how it's used
# Or just rename it to renderSortHeader and call it as a function.

# Let's restore the original file first, or just rewrite it
# I previously moved SortHeader to the top.
# Let's find SortHeader at the top and remove it.

pattern_top = r'const SortHeader = \(\{ field, label, className = "" \}: \{ field: string, label: string, className\?: string \}\) \=\> \(\n  \<th[\s\S]*?\<\/th\>\n\);\n\n'
content = re.sub(pattern_top, '', content)

# Now insert it back inside SuppliersView, but as renderSortHeader
insert_pattern = r'export default function SuppliersView\(\{ initialSuppliers \}: SuppliersViewProps\) \{\n  const \[suppliers, setSuppliers\] = useState\(initialSuppliers\);\n  const \[selectedId, setSelectedId\] = useState\<string \| null\>\(null\);\n  const \[activeTab, setActiveTab\] = useState\<\'total\' \| \'net_new\' \| \'saved\'\>\(\'total\'\);\n  const \[sortField, setSortField\] = useState\<string\>\(\'score\'\);\n  const \[sortDirection, setSortDirection\] = useState\<\'asc\' \| \'desc\'\>\(\'desc\'\);'

render_func = """  const renderSortHeader = (field: string, label: string, className: string = "") => (
    <th 
      className={`px-4 py-3 cursor-pointer select-none hover:bg-white/5 transition-colors group ${className}`}
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2">
        <span className="font-semibold text-white/50 group-hover:text-white/70 transition-colors">{label}</span>
        <div className="flex flex-col">
          <ArrowUp className={`w-2.5 h-2.5 -mb-1 ${sortField === field && sortDirection === 'asc' ? 'text-blue-400' : 'text-white/20'}`} />
          <ArrowDown className={`w-2.5 h-2.5 ${sortField === field && sortDirection === 'desc' ? 'text-blue-400' : 'text-white/20'}`} />
        </div>
      </div>
    </th>
  );"""

# wait, I don't need regex, I can just find the place.
idx = content.find("const handleSort = (field: string) => {")
if idx != -1:
    content = content[:idx] + render_func + '\n\n  ' + content[idx:]

# Now replace <SortHeader field="xyz" label="xyz" /> with {renderSortHeader("xyz", "xyz")}
content = re.sub(r'<SortHeader field="([^"]+)" label="([^"]+)" className="([^"]+)" />', r'{renderSortHeader("\1", "\2", "\3")}', content)
content = re.sub(r'<SortHeader field="([^"]+)" label="([^"]+)" />', r'{renderSortHeader("\1", "\2")}', content)

with open('src/app/suppliers/SuppliersView.tsx', 'w') as f:
    f.write(content)
