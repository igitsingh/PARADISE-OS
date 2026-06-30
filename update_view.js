const fs = require('fs');
const path = 'src/app/competitors/CompetitorsView.tsx';
let content = fs.readFileSync(path, 'utf8');

// replace the old drawer code with the new component
content = content.replace(/\{\/\* Apollo-Style Side Panel Drawer \*\/\}[\s\S]*?\<\/div\>\n\n    \<\/div\>\n  \);\n\}/, 
`{selectedId && selectedCompetitor && (
        <CompetitorDossier 
          competitor={selectedCompetitor} 
          onClose={() => setSelectedId(null)} 
        />
      )}
    </div>
  );
}`);

// add import
if(!content.includes('import CompetitorDossier')) {
  content = content.replace('import { Competitor, Product, Website, SocialAccount, TradeShow } from \'@prisma/client\';', 
  'import { Competitor, Product, Website, SocialAccount, TradeShow } from \'@prisma/client\';\nimport CompetitorDossier from \'./CompetitorDossier\';');
}

fs.writeFileSync(path, content, 'utf8');
