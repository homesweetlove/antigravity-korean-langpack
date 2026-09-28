<p align="center">
  <h1 align="center">Antigravity IDE Korean Language Pack Patcher</h1>
  <p align="center">
    <strong>Complete Korean localization tool for Google Antigravity IDE (VS Code & AI Agent UI)</strong>
  </p>
  <p align="center">
    <a href="README.md"><strong>English</strong></a> | 
    <a href="README.ko.md"><strong>한국어</strong></a>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Antigravity_IDE-Korean_Patch-blue?style=for-the-badge&logo=visualstudiocode" alt="Antigravity IDE" />
  <img src="https://img.shields.io/badge/Platform-Windows-0078D6?style=for-the-badge&logo=windows" alt="Windows" />
  <img src="https://img.shields.io/badge/Node.js-v16+-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📖 Overview

**Antigravity IDE Korean Language Pack Patcher** provides complete Korean translation for Google's **Antigravity IDE**.

While official VS Code language packs translate basic editor components, Antigravity IDE contains proprietary AI agent modules (Jetski Agent, Cascade, Customizations, Rules, and Workflows) that remain in English. This tool bridges the gap by translating both the core editor and the Antigravity-specific AI features into natural, high-quality Korean.

---

## ✨ Features

- 🌐 **Full Core UI Translation**: Automatically integrates with the official VS Code Korean language pack (`ms-ceintl.vscode-language-pack-ko`).
- 🤖 **Antigravity Agent UI Localization**: Translates Jetski Agent panels, Security Modes, Auto-execution settings, Rules, Skills, and Workflows.
- 🔒 **Automatic Checksum Fix**: Automatically recalculates SHA-256 hashes in `product.json` to prevent the *"Your installation is corrupt"* warning dialog.
- ⚡ **One-Click Installation & Rollback**: Simple `.bat` batch scripts for seamless install and instant uninstallation.
- 🛡️ **Zero Hardcoding**: Dynamically resolves OS paths and user profile directories without exposing personal credentials.
- 🔄 **Safe Backup**: Automatically creates `.bak` files before applying modifications, allowing one-click restore anytime.

---

## 📋 Prerequisites

Before running the patcher, ensure you have:

1. **[Antigravity IDE](https://antigravity.google)** installed.
2. **[Node.js](https://nodejs.org)** (v16.0.0 or higher) installed.
3. **Korean Language Pack for VS Code** installed inside Antigravity IDE:
   - Open Antigravity IDE.
   - Press `Ctrl + Shift + X` (Extensions).
   - Search for **`Korean Language Pack for Visual Studio Code`** and click **Install**.

---

## 🚀 Quick Start (Windows)

### Option A: One-Click Batch Script (Recommended)

1. **Close** Antigravity IDE completely.
2. Clone or download this repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/antigravity-korean-langpack.git
   cd antigravity-korean-langpack
   ```
3. Double-click **`apply_all.bat`** (or run it in Command Prompt / PowerShell).
4. Launch Antigravity IDE. Enjoy full Korean support!

---

### Option B: Using Node.js / NPM

```bash
# Run the patcher
npm run patch

# Or run the scripts manually:
node apply_korean_core.js
node apply_korean_workbench.js
node apply_korean_jetski.js
node apply_korean_extension.js
node fix_checksums.js
```

---

## ⏪ How to Restore (Uninstall)

If you ever wish to revert all changes back to original English:

1. Close Antigravity IDE.
2. Double-click **`restore.bat`** (or run `npm run restore` / `node restore.js`).
3. All original files will be restored from `.bak` backups.

---

## 🛠️ What Gets Patched?

| Target Component | File Path | Description |
| :--- | :--- | :--- |
| **Core Messages** | `out/nls.messages.json` | VS Code base commands, menus, dialogs |
| **Workbench Main** | `out/vs/workbench/workbench.desktop.main.js` | Agent sidebar, status bar, action buttons |
| **Jetski Agent** | `out/jetskiAgent/main.js` | AI Agent chat canvas, security settings, tools |
| **Extension Manifest** | `extensions/antigravity/package.json` | Antigravity built-in commands & configuration titles |
| **Integrity Checksums** | `product.json` | Updated hashes to suppress corrupt installation alerts |

---

## ❓ Troubleshooting & FAQ

<details>
<summary><strong>Q: "The installation appears to be corrupt [Unsupported]" banner appears.</strong></summary>

> Run `node fix_checksums.js` (or re-run `apply_all.bat`). It recalculates and writes correct SHA-256 hashes into `product.json` to silence the warning.
</details>

<details>
<summary><strong>Q: An update for Antigravity IDE reverted the translations.</strong></summary>

> IDE updates overwrite modified core files. Simply run `apply_all.bat` again after updating the IDE.
</details>

<details>
<summary><strong>Q: Language pack not found error during core patch.</strong></summary>

> Make sure you have installed the **Korean Language Pack for Visual Studio Code** extension from the Extension Marketplace inside Antigravity IDE first.
</details>

---

## 🤝 Contributing

Contributions, bug reports, and translation suggestions are warmly welcome!
Feel free to open an [Issue](https://github.com/YOUR_USERNAME/antigravity-korean-langpack/issues) or submit a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
