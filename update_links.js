const fs = require('fs');

const path = 'src/app/competitors/CompetitorsView.tsx';
let content = fs.readFileSync(path, 'utf8');

// Add import Link if not exists
if (!content.includes("import Link")) {
  content = content.replace("import React", "import React\nimport Link from 'next/link';");
}

// Replace the div with Link
content = content.replace(/<div key=\{competitor.id\} className="p-5 hover:bg-white\/\[0.02\] transition-colors group">/g, 
'<Link href={`/competitors/${competitor.id}`} key={competitor.id} className="block p-5 hover:bg-white/[0.04] transition-colors group">');

content = content.replace(/<\/div>\n            \);\n          }\)}\n        <\/div>/g, 
'</Link>\n            );\n          })}\n        </div>');

fs.writeFileSync(path, content, 'utf8');
