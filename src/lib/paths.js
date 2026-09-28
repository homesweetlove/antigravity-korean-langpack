const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Locate the Antigravity IDE 'resources/app' installation directory.
 */
function getAppDir() {
  const platform = process.platform;
  let possiblePaths = [];

  if (platform === 'win32') {
    const localAppData = process.env.LOCALAPPDATA || path.join(process.env.USERPROFILE || '', 'AppData', 'Local');
    const programFiles = process.env.ProgramFiles || 'C:\\Program Files';
    const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';

    possiblePaths = [
      path.join(localAppData, 'Programs', 'Antigravity IDE', 'resources', 'app'),
      path.join(programFiles, 'Antigravity IDE', 'resources', 'app'),
      path.join(programFilesX86, 'Antigravity IDE', 'resources', 'app')
    ];
  } else if (platform === 'darwin') {
    possiblePaths = [
      '/Applications/Antigravity IDE.app/Contents/Resources/app',
      path.join(os.homedir(), 'Applications', 'Antigravity IDE.app', 'Contents', 'Resources', 'app')
    ];
  } else {
    // Linux
    possiblePaths = [
      '/usr/share/antigravity/resources/app',
      '/opt/Antigravity IDE/resources/app',
      path.join(os.homedir(), '.local', 'share', 'antigravity', 'resources', 'app')
    ];
  }

  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      return p;
    }
  }

  // Fallback to first path or throw informative error
  const defaultPath = possiblePaths[0] || '';
  if (!fs.existsSync(defaultPath)) {
    console.error(`[Error] Antigravity IDE installation directory not found.`);
    console.error(`Searched locations:\n  - ${possiblePaths.join('\n  - ')}`);
    console.error(`Please ensure Antigravity IDE is installed.`);
  }
  return defaultPath;
}

/**
 * Find the Korean language pack extension directory and translation file.
 */
function getKoreanPackPath() {
  const homeDir = os.homedir();
  const searchDirs = [
    path.join(homeDir, '.antigravity-ide', 'extensions'),
    path.join(homeDir, '.vscode', 'extensions')
  ];

  for (const extDir of searchDirs) {
    if (!fs.existsSync(extDir)) continue;

    const entries = fs.readdirSync(extDir);
    // Find matching directory: ms-ceintl.vscode-language-pack-ko-*
    const matched = entries
      .filter(name => name.toLowerCase().startsWith('ms-ceintl.vscode-language-pack-ko'))
      .sort()
      .reverse(); // latest version first

    for (const dirName of matched) {
      const candidate = path.join(extDir, dirName, 'translations', 'main.i18n.json');
      if (fs.existsSync(candidate)) {
        return candidate;
      }
    }
  }

  return null;
}

module.exports = {
  getAppDir,
  getKoreanPackPath
};
