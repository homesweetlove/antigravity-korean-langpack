const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const { getAppDir } = require('./lib/paths');

const appDir = getAppDir();
const prodPath = path.join(appDir, 'product.json');
const bakPath = path.join(appDir, 'product.json.bak');

if (!fs.existsSync(prodPath)) {
  console.error(`[Error] product.json not found at: ${prodPath}`);
  process.exit(1);
}

if (!fs.existsSync(bakPath)) {
  fs.copyFileSync(prodPath, bakPath);
  console.log('Backed up product.json');
}

const prod = JSON.parse(fs.readFileSync(prodPath, 'utf8'));

let updated = 0;
for (const relPath of Object.keys(prod.checksums || {})) {
  const fullPath = path.join(appDir, 'out', relPath);
  if (fs.existsSync(fullPath)) {
    const content = fs.readFileSync(fullPath);
    const hash = crypto.createHash('sha256').update(content).digest('base64').replace(/=+$/, '');
    if (prod.checksums[relPath] !== hash) {
      console.log(`[Checksum Fix] ${relPath}`);
      console.log(`  Old: ${prod.checksums[relPath]}`);
      console.log(`  New: ${hash}`);
      prod.checksums[relPath] = hash;
      updated++;
    }
  }
}

if (updated > 0) {
  fs.writeFileSync(prodPath, JSON.stringify(prod, null, '\t'), 'utf8');
  console.log(`Successfully updated product.json with ${updated} new checksum(s)!`);
} else {
  console.log('All checksums in product.json are already up to date.');
}
