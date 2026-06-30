import React from 'react';
import fs from 'fs/promises';
import path from 'path';
import ToolsView from './ToolsView';

export default async function ToolsPage() {
  let tools = [];

  try {
    const jsonPath = path.join(process.cwd(), 'src/db/intelligence/tools/tools.json');
    const data = await fs.readFile(jsonPath, 'utf8');
    tools = JSON.parse(data);
  } catch (error) {
    console.error("Failed to load local tools JSON", error);
  }

  return <ToolsView initialTools={tools} />;
}
