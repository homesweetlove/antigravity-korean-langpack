const fs = require('fs');
const path = require('path');
const { getAppDir, getKoreanPackPath } = require('../lib/paths');

const appDir = getAppDir();
if (!fs.existsSync(appDir)) {
  console.error(`[Error] Antigravity IDE directory not found: ${appDir}`);
  process.exit(1);
}

const nlsMetadataPath = path.join(appDir, 'out');
const messagesFile = path.join(nlsMetadataPath, 'nls.messages.json');
const keysFile = path.join(nlsMetadataPath, 'nls.keys.json');
const backupFile = path.join(nlsMetadataPath, 'nls.messages.json.bak');

const koTranslationsPath = getKoreanPackPath();
if (!koTranslationsPath || !fs.existsSync(koTranslationsPath)) {
  console.error('[Error] Korean language pack extension (ms-ceintl.vscode-language-pack-ko) not found.');
  console.error('Please install "Korean Language Pack for Visual Studio Code" in Antigravity IDE first.');
  process.exit(1);
}

console.log(`[Core] Found Korean translation file: ${koTranslationsPath}`);

if (!fs.existsSync(backupFile)) {
  console.log('Creating backup of nls.messages.json...');
  fs.copyFileSync(messagesFile, backupFile);
}

console.log('Loading metadata and translations...');
const V = JSON.parse(fs.readFileSync(keysFile, 'utf8'));
const C = JSON.parse(fs.readFileSync(backupFile, 'utf8'));
const N = JSON.parse(fs.readFileSync(koTranslationsPath, 'utf8'));

const I = [];
let T = 0;
let translatedCount = 0;

for (const [B, _] of V) {
  const Z = N.contents ? N.contents[B] : undefined;
  for (const U of _) {
    if (Z && Z[U]) {
      I.push(Z[U]);
      translatedCount++;
    } else {
      I.push(C[T]);
    }
    T++;
  }
}

console.log(`Writing ${I.length} messages (${translatedCount} Korean translations)...`);
fs.writeFileSync(messagesFile, JSON.stringify(I), 'utf8');
console.log('[OK] Successfully updated out/nls.messages.json with Korean translations!');
