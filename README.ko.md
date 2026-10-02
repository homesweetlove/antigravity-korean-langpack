[![English](https://img.shields.io/badge/README-English-24292f?style=for-the-badge)](./README.md) [![한국어](https://img.shields.io/badge/README-%ED%95%9C%EA%B5%AD%EC%96%B4-24292f?style=for-the-badge)](./README.ko.md)

<p align="center">
  <h1 align="center">Antigravity IDE 한글 언어팩 패처</h1>
  <p align="center">
    <strong>Google Antigravity IDE (VS Code 기반 코어 및 AI 에이전트 UI) 완전 한글화 도구</strong>
  </p>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Antigravity_IDE-Korean_Patch-blue?style=for-the-badge&logo=visualstudiocode" alt="Antigravity IDE" />
  <img src="https://img.shields.io/badge/플랫폼-Windows-0078D6?style=for-the-badge&logo=windows" alt="Windows" />
  <img src="https://img.shields.io/badge/Node.js-v16+-339933?style=for-the-badge&logo=node.js" alt="Node.js" />
  <img src="https://img.shields.io/badge/라이선스-MIT-green?style=for-the-badge" alt="License" />
</p>

---

## 📖 개요

**Antigravity IDE 한글 언어팩 패처**는 Google의 **Antigravity IDE**를 위한 종합 한국어 번역 패치 도구입니다.

공식 VS Code 한국어 언어팩만으로는 에디터 기본 요소만 번역되고, Antigravity IDE의 핵심인 AI 기능(Jetski Agent, 캐스케이드 사이드바, 에이전트 보안 모드, 커스텀 규칙 및 워크플로 등)은 영문으로 유지됩니다.  
본 도구는 에디터 코어뿐만 아니라 독점 AI 에이전트 UI까지 자연스러운 한국어로 완벽하게 번역해 줍니다.

---

## ✨ 주요 특징

- 🌐 **에디터 코어 전체 한글화**: 공식 VS Code 한국어 언어팩(`ms-ceintl.vscode-language-pack-ko`)과 연동하여 메뉴, 알림, 명령어를 한글화합니다.
- 🤖 **Antigravity AI 에이전트 UI 번역**: Jetski Agent 캔버스, 에이전트 보안 모드(Full access, Strict 등), 터미널 자동 실행 정책, 규칙(Rules), 스킬(Skills), 워크플로(Workflows)까지 한글화합니다.
- 🔒 **체크섬 자동 수정**: 수정된 파일들의 SHA-256 체크섬을 계산하여 `product.json`에 반영하므로, VS Code 기반 특유의 *"설치 파일이 손상되었습니다(Installation is corrupt)"* 경고가 뜨지 않습니다.
- ⚡ **원클릭 설치 및 복구**: 더블 클릭 한 번으로 실행되는 배치 파일(`apply_all.bat`, `restore.bat`)을 제공합니다.
- 🛡️ **개인정보 보호 및 동적 경로**: 특정 사용자 계정명이 하드코딩되지 않고 시스템 환경변수를 통해 경로를 자동 감지합니다.
- 🔄 **안전한 백업**: 파일 수정 전 자동으로 `.bak` 백업본을 생성하므로 언제든 원래 상태로 100% 되돌릴 수 있습니다.

---

## 📋 사전 준비

패치를 적용하기 전에 아래 사항이 준비되어 있어야 합니다:

1. **[Antigravity IDE](https://antigravity.google)**가 설치되어 있어야 합니다.
2. **[Node.js](https://nodejs.org)** (v16.0.0 이상)가 설치되어 있어야 합니다.
3. Antigravity IDE 내부에서 **VS Code 한국어 언어팩**을 먼저 설치해주세요:
   - Antigravity IDE 실행
   - 확장 프로그램 단축키 `Ctrl + Shift + X` 누르기
   - 검색창에 **`Korean Language Pack for Visual Studio Code`** 검색 후 **설치(Install)** 클릭

---

## 🚀 빠른 시작 (Windows)

### 방법 A: 원클릭 배치 파일 실행 (가장 추천)

1. 실행 중인 **Antigravity IDE를 완전히 종료**합니다.
2. 이 저장소를 다운로드하거나 클론합니다:
   ```bash
   git clone https://github.com/homesweetlove/antigravity-korean-langpack.git
   cd antigravity-korean-langpack
   ```
3. **`apply_all.bat`** 파일을 더블 클릭하여 실행합니다.
4. 패치가 완료되면 Antigravity IDE를 다시 실행합니다.

---

### 방법 B: Node.js / NPM으로 실행

```bash
# 전체 패치 일괄 적용
npm run patch

# 또는 각 단계를 순서대로 개별 실행:
node src/patches/core.js
node src/patches/workbench.js
node src/patches/jetski.js
node src/patches/extension.js
node src/fix-checksums.js
```

---

## ⏪ 원본(영어) 복구 방법

원래의 순정 영문 버전으로 되돌리려면:

1. Antigravity IDE를 종료합니다.
2. **`restore.bat`** 파일을 더블 클릭하여 실행합니다. (또는 `npm run restore` / `node src/restore.js` 실행)
3. 생성되어 있던 `.bak` 원본 백업 파일로 자동 복구됩니다.

---

## 📁 프로젝트 구조

```
antigravity-korean-langpack/
├── apply_all.bat          # 원클릭 패치 (Windows)
├── restore.bat            # 원클릭 복구 (Windows)
├── package.json           # npm 스크립트: patch / restore / fix-checksums
└── src/
    ├── apply.js           # 모든 패치 단계를 순서대로 실행
    ├── restore.js         # .bak 백업으로 원본 복구
    ├── fix-checksums.js   # product.json 체크섬 재계산
    ├── lib/
    │   └── paths.js       # IDE 설치 경로 및 한국어 언어팩 탐색
    └── patches/
        ├── core.js        # out/nls.messages.json
        ├── workbench.js   # out/vs/workbench/workbench.desktop.main.js
        ├── jetski.js      # out/jetskiAgent/main.js
        └── extension.js   # extensions/antigravity/package.json
```

---

## 🛠️ 패치 대상 파일 안내

| 대상 컴포넌트 | 파일 경로 | 설명 |
| :--- | :--- | :--- |
| **코어 메시지** | `out/nls.messages.json` | VS Code 기본 명령어, 메뉴, 대화상자 |
| **워크벤치 메인** | `out/vs/workbench/workbench.desktop.main.js` | 에이전트 사이드바, 상태 표시줄, 제어 버튼 |
| **Jetski Agent** | `out/jetskiAgent/main.js` | AI 에이전트 대화창, 보안 모드 및 실행 정책 |
| **확장 프로그램** | `extensions/antigravity/package.json` | 내장 Antigravity 명령 및 환경설정 타이틀 |
| **무결성 체크섬** | `product.json` | 손상 경고창을 방지하기 위한 해시 갱신 |

---

## ❓ 자주 묻는 질문 (FAQ) & 문제 해결

<details>
<summary><strong>Q: "설치 파일이 손상된 것 같습니다 [지원되지 않음]" 알림이 떠요.</strong></summary>

> `node src/fix-checksums.js`를 실행하거나 `apply_all.bat`를 다시 실행하세요. 수정된 파일의 SHA-256 해시를 `product.json`에 동기화하여 경고를 제거합니다.
</details>

<details>
<summary><strong>Q: Antigravity IDE를 업데이트했더니 다시 영어로 바뀌었어요.</strong></summary>

> IDE가 새 버전으로 업데이트되면 코어 파일들이 새로 덮어씌워집니다. 업데이트 후 `apply_all.bat`를 한 번 더 실행해 주시면 다시 한글화가 적용됩니다.
</details>

<details>
<summary><strong>Q: Core 패치 중 언어팩을 찾을 수 없다는 에러가 발생해요.</strong></summary>

> Antigravity IDE 내부의 확장 프로그램 마켓플레이스에서 **Korean Language Pack for Visual Studio Code**를 먼저 설치했는지 확인해 주세요.
</details>

---

## 🤝 기여 (Contributing)

번역 제안, 버그 제보, 추가 UI 번역 요청은 언제든 환영합니다!  
[Issues](https://github.com/homesweetlove/antigravity-korean-langpack/issues)를 등록하거나 Pull Request를 자유롭게 남겨주세요.

---

## 📄 라이선스

이 프로젝트는 [MIT License](LICENSE)에 따라 자유롭게 사용할 수 있습니다.
