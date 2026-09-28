const fs = require('fs');
const path = require('path');
const { getAppDir } = require('../lib/paths');

const appDir = getAppDir();
const pkgPath = path.join(appDir, 'extensions', 'antigravity', 'package.json');
const bakPath = path.join(appDir, 'extensions', 'antigravity', 'package.json.bak');

if (!fs.existsSync(pkgPath)) {
  console.error(`[Error] antigravity package.json not found at: ${pkgPath}`);
  process.exit(1);
}

if (!fs.existsSync(bakPath)) {
  console.log('Backing up antigravity package.json...');
  fs.copyFileSync(pkgPath, bakPath);
}

const pkg = JSON.parse(fs.readFileSync(bakPath, 'utf8'));

pkg.description = "Antigravity의 다양한 AI 기능을 지원하는 확장 프로그램입니다.";

if (pkg.contributes) {
  if (pkg.contributes.customEditors) {
    for (const ed of pkg.contributes.customEditors) {
      if (ed.displayName === 'Workflow Editor') ed.displayName = '워크플로 편집기';
      if (ed.displayName === 'Rule Editor') ed.displayName = '규칙 편집기';
    }
  }

  const cmdMap = {
    "antigravity.login": "IDE 로그인",
    "antigravity.loginWithAuthToken": "인증 토큰 제공 (보조 로그인)",
    "antigravity.importVSCodeSettings": "VS Code 설정 가져오기",
    "antigravity.importVSCodeExtensions": "VS Code 확장 프로그램 가져오기",
    "antigravity.importVSCodeRecentWorkspaces": "VS Code 최근 작업 영역 가져오기",
    "antigravity.importCursorSettings": "Cursor 설정 가져오기",
    "antigravity.importCursorExtensions": "Cursor 확장 프로그램 가져오기",
    "antigravity.importWindsurfSettings": "Windsurf 설정 가져오기",
    "antigravity.importWindsurfExtensions": "Windsurf 확장 프로그램 가져오기",
    "antigravity.generateCommitMessage": "커밋 메시지 생성",
    "antigravity.restartLanguageServer": "언어 서버 다시 시작",
    "antigravity.killLanguageServerAndReloadWindow": "언어 서버 종료 및 창 다시 로드",
    "antigravity.togglePersistentLanguageServer": "영구 언어 서버 전환 및 창 다시 로드",
    "antigravity.openPersistentLanguageServerLog": "영구 언어 서버 로그 열기",
    "antigravity.copyApiKey": "API 키 클립보드에 복사",
    "antigravity.openChangeLog": "변경 기록 열기",
    "antigravity.openBrowser": "브라우저 열기",
    "antigravity.showBrowserAllowlist": "브라우저 허용 목록 표시",
    "antigravity.killRemoteExtensionHost": "원격 서버의 확장 호스트 종료",
    "antigravity.importCiderSettings": "Cider 설정 가져오기",
    "antigravity.startDemoMode": "[베타] 데모 모드 시작",
    "antigravity.endDemoMode": "[베타] 데모 모드 종료"
  };

  if (pkg.contributes.commands) {
    for (const cmd of pkg.contributes.commands) {
      if (cmdMap[cmd.command]) {
        cmd.title = cmdMap[cmd.command];
      }
    }
  }

  if (pkg.contributes.configuration) {
    if (pkg.contributes.configuration.title) {
      pkg.contributes.configuration.title = "Antigravity 편집기";
    }
    const props = pkg.contributes.configuration.properties || {};
    if (props['antigravity.searchMaxWorkspaceFileCount']) {
      props['antigravity.searchMaxWorkspaceFileCount'].description = "작업 영역 파일에 대해 임베딩을 계산할 최대 파일 수입니다. .gitignore 및 바이너리 파일은 제외됩니다.";
    }
    if (props['antigravity.enableCursorImportCursor']) {
      props['antigravity.enableCursorImportCursor'].description = "명령 팔레트에서 Cursor 가져오기 명령 활성화";
    }
    if (props['antigravity.persistentLanguageServer']) {
      props['antigravity.persistentLanguageServer'].description = "편집기가 닫힌 후에도 언어 서버를 계속 실행 상태로 유지합니다.";
    }
  }
}

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf8');
console.log('Successfully updated antigravity package.json with Korean translations!');
