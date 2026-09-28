const fs = require('fs');
const path = require('path');
const { getAppDir } = require('./paths');

const appDir = getAppDir();
if (!fs.existsSync(appDir)) {
  console.error(`[Error] Antigravity IDE directory not found: ${appDir}`);
  process.exit(1);
}

const targets = [
  {
    original: path.join(appDir, 'out', 'nls.messages.json'),
    backup: path.join(appDir, 'out', 'nls.messages.json.bak')
  },
  {
    original: path.join(appDir, 'extensions', 'antigravity', 'package.json'),
    backup: path.join(appDir, 'extensions', 'antigravity', 'package.json.bak')
  },
  {
    original: path.join(appDir, 'out', 'vs', 'workbench', 'workbench.desktop.main.js'),
    backup: path.join(appDir, 'out', 'vs', 'workbench', 'workbench.desktop.main.js.bak')
  },
  {
    original: path.join(appDir, 'out', 'jetskiAgent', 'main.js'),
    backup: path.join(appDir, 'out', 'jetskiAgent', 'main.js.bak')
  },
  {
    original: path.join(appDir, 'product.json'),
    backup: path.join(appDir, 'product.json.bak')
  }
];

let restoredCount = 0;
for (const t of targets) {
  if (fs.existsSync(t.backup)) {
    fs.copyFileSync(t.backup, t.original);
    console.log(`[Restored] ${t.original}`);
    restoredCount++;
  } else {
    console.log(`[Skip] No backup found for: ${t.original}`);
  }
}

console.log(`\nRestoration completed (${restoredCount} file(s) restored).`);
