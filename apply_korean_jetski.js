const fs = require('fs');
const path = require('path');
const { getAppDir } = require('./paths');

const appDir = getAppDir();
const jsPath = path.join(appDir, 'out', 'jetskiAgent', 'main.js');
const bakPath = path.join(appDir, 'out', 'jetskiAgent', 'main.js.bak');

if (!fs.existsSync(jsPath)) {
  console.error(`[Error] jetskiAgent/main.js not found at: ${jsPath}`);
  process.exit(1);
}

if (!fs.existsSync(bakPath)) {
  console.log('Backing up jetskiAgent/main.js...');
  fs.copyFileSync(jsPath, bakPath);
}

let js = fs.readFileSync(bakPath, 'utf8');

const translations = [
  // Descriptions & settings
  { target: 'children:"Agents have full access to your machine and external resources."', replace: 'children:"에이전트가 로컬 머신 및 외부 리소스에 전체 접근 권한을 갖습니다."' },
  { target: 'children:"Controls whether terminal commands require your approval before running."', replace: 'children:"터미널 명령을 실행하기 전에 사용자의 승인이 필요한지 제어합니다."' },
  { target: 'children:"Allows the agent to access files outside of your current workspace."', replace: 'children:"에이전트가 현재 작업 영역 외부 파일에 접근하도록 허용합니다."' },
  { target: 'children:"No plugins installed. Go to the Marketplace to discover and install plugins."', replace: 'children:"설치된 플러그인이 없습니다. 마켓플레이스에서 플러그인을 찾아 설치하세요."' },
  { target: 'children:"No customizations found outside of plugins."', replace: 'children:"플러그인 외에 설정된 사용자 지정 항목이 없습니다."' },
  { target: 'children:"Agent will always ask to review in strict mode."', replace: 'children:"엄격 모드에서는 에이전트가 항상 검토를 요청합니다."' },
  { target: 'children:"Agent cannot modify files outside of the workspace in strict mode."', replace: 'children:"엄격 모드에서는 에이전트가 작업 영역 외부 파일을 수정할 수 없습니다."' },
  { target: 'children:"There are no customizations enabled."', replace: 'children:"활성화된 사용자 지정 항목이 없습니다."' },
  { target: 'children:"Setup script ran successfully."', replace: 'children:"설치 스크립트가 성공적으로 실행되었습니다."' },
  { target: 'children:"Setup script failed."', replace: 'children:"설치 스크립트 실행에 실패했습니다."' },
  { target: 'children:"Path copied!"', replace: 'children:"경로가 복사되었습니다!"' },
  { target: 'children:"No MCP Servers"', replace: 'children:"MCP 서버 없음"' },
  { target: 'children:"Loading MCP servers..."', replace: 'children:"MCP 서버 로드 중..."' },
  { target: 'children:"Loading hooks..."', replace: 'children:"훅 로드 중..."' },
  { target: 'children:"Loading customizations..."', replace: 'children:"사용자 지정 항목 로드 중..."' },
  { target: 'children:"Search for MCP servers to add to your configuration"', replace: 'children:"구성할 MCP 서버를 검색하세요"' },

  // Buttons & Labels
  { target: 'children:"Sign In"', replace: 'children:"로그인"' },
  { target: 'children:"Sign Out"', replace: 'children:"로그아웃"' },
  { target: 'children:"Sign out"', replace: 'children:"로그아웃"' },
  { target: 'children:"Keyboard shortcuts"', replace: 'children:"단축키"' },
  { target: 'children:"Agent security mode"', replace: 'children:"에이전트 보안 모드"' },
  { target: 'children:"Full access"', replace: 'children:"전체 권한 허용"' },
  { target: 'children:"Sandboxed"', replace: 'children:"샌드박스"' },
  { target: 'children:"Strict"', replace: 'children:"엄격 모드"' },
  { target: 'children:"Terminal Command Auto Execution"', replace: 'children:"터미널 명령 자동 실행"' },
  { target: 'children:"File Access"', replace: 'children:"파일 접근 권한"' },
  { target: 'children:"Agent Non-Workspace File Access"', replace: 'children:"작업 영역 외부 파일 접근"' },
  { target: 'children:"Planning"', replace: 'children:"계획(Planning)"' },
  { target: 'children:"Automation"', replace: 'children:"자동화"' },
  { target: 'children:"General"', replace: 'children:"일반"' },
  { target: 'children:"Advanced"', replace: 'children:"고급"' },
  { target: 'children:"Notification Settings"', replace: 'children:"알림 설정"' },
  { target: 'children:"Open System Preferences"', replace: 'children:"시스템 환경설정 열기"' },
  { target: 'children:"Copy path"', replace: 'children:"경로 복사"' },
  { target: 'children:"Manage Skills"', replace: 'children:"스킬 관리"' },
  { target: 'children:"Add MCP Servers"', replace: 'children:"MCP 서버 추가"' },
  { target: 'children:"Manage Hooks"', replace: 'children:"훅 관리"' },
  { target: 'children:"Customize"', replace: 'children:"사용자 지정"' },
  { target: 'children:"Installed"', replace: 'children:"설치됨"' },
  { target: 'children:"Open Editor Settings"', replace: 'children:"편집기 설정 열기"' },
  { target: 'children:"Open MCP Config"', replace: 'children:"MCP 설정 파일 열기"' },
  { target: 'children:"Workspaces"', replace: 'children:"작업 영역"' },
  { target: 'children:"Projects"', replace: 'children:"프로젝트"' },
  { target: 'children:"Delete Project"', replace: 'children:"프로젝트 삭제"' },
  { target: 'children:"Add Folder"', replace: 'children:"폴더 추가"' },
  { target: 'children:"Default Branch"', replace: 'children:"기본 브랜치"' },
  { target: 'children:"All Workspaces"', replace: 'children:"모든 작업 영역"' },
  { target: 'children:"Marketplace"', replace: 'children:"마켓플레이스"' },
  { target: 'children:"My Stuff"', replace: 'children:"내 항목 및 보관함"' },
  { target: 'children:"Sort Conversations"', replace: 'children:"대화 정렬"' },
  { target: 'children:"Last Updated"', replace: 'children:"최근 수정순"' }
];

let replacedCount = 0;
for (const item of translations) {
  let count = 0;
  while (js.includes(item.target)) {
    js = js.replace(item.target, item.replace);
    count++;
  }
  if (count > 0) {
    replacedCount += count;
    console.log(`Replaced (${count}x): ${item.target} -> ${item.replace}`);
  }
}

console.log(`Total replacements in jetskiAgent: ${replacedCount}`);
fs.writeFileSync(jsPath, js, 'utf8');
console.log('Successfully updated jetskiAgent/main.js!');
