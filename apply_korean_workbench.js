const fs = require('fs');
const path = require('path');
const { getAppDir } = require('./paths');

const appDir = getAppDir();
const wbPath = path.join(appDir, 'out', 'vs', 'workbench', 'workbench.desktop.main.js');
const bakPath = path.join(appDir, 'out', 'vs', 'workbench', 'workbench.desktop.main.js.bak');

if (!fs.existsSync(wbPath)) {
  console.error(`[Error] workbench.desktop.main.js not found at: ${wbPath}`);
  process.exit(1);
}

if (!fs.existsSync(bakPath)) {
  console.log('Creating backup of workbench.desktop.main.js...');
  fs.copyFileSync(wbPath, bakPath);
}

console.log('Reading workbench file...');
let js = fs.readFileSync(bakPath, 'utf8');

const translations = [
  // Agent & Cascade Panels
  { target: 'children:"Rules help guide the behavior of Agent."', replace: 'children:"규칙(Rules)은 에이전트의 행동 지침을 안내합니다."' },
  { target: 'children:\'Workflows are saved prompts that Agent can follow. To trigger a workflow, type "/" in Agent.\'', replace: 'children:\'워크플로(Workflows)는 에이전트가 따를 수 있는 저장된 프롬프트입니다. 워크플로를 실행하려면 에이전트 대화창에 "/"를 입력하세요.\'' },
  { target: 'children:["Customize Agent to get a better, more personalized experience."', replace: 'children:["에이전트를 맞춤 설정하여 더욱 개인화된 환경을 사용해보세요."' },
  { target: 'children:"Skills are instructions that extend what Agent can do."', replace: 'children:"스킬(Skills)은 에이전트가 수행할 수 있는 작업과 기능을 확장하는 지침입니다."' },
  { target: 'children:"AI may make mistakes. Double-check all generated code."', replace: 'children:"AI는 실수를 할 수 있습니다. 생성된 모든 코드를 반드시 확인하세요."' },
  { target: 'children:"Start fresh or import settings from another IDE"', replace: 'children:"새로 시작하거나 다른 IDE에서 설정을 가져옵니다"' },
  { target: 'children:"Configure your editor settings below."', replace: 'children:"아래에서 편집기 설정을 구성하세요."' },
  { target: 'children:"Configure your keybindings."', replace: 'children:"단축키를 설정하세요."' },
  { target: 'children:"Custom models are only supported on Linux machines."', replace: 'children:"사용자 지정 모델은 Linux 환경에서만 지원됩니다."' },
  { target: 'children:"Review file changes between parallel battle arms and the baseline workspace."', replace: 'children:"기준 작업 영역과 변경 사항을 비교 검토합니다."' },
  { target: 'children:"No active terminals. Click + to create one."', replace: 'children:"활성 터미널이 없습니다. + 를 눌러 새로 만드세요."' },
  { target: 'children:"Install Antigravity IDE to run and edit your workspace scripts."', replace: 'children:"작업 영역 스크립트를 실행하고 편집하려면 Antigravity IDE를 설치하세요."' },
  { target: 'children:"Search and discover customizations to extend your Agent"', replace: 'children:"에이전트를 확장할 커스텀 설정 및 스킬 검색"' },
  { target: 'children:"After reporting the issue, reload your window to resume Agent use."', replace: 'children:"문제를 보고한 후 창을 다시 로드하여 에이전트를 계속 사용하세요."' },
  { target: 'children:"To trigger a workflow, type "', replace: 'children:"워크플로를 실행하려면 다음을 입력하세요: "' },
  { target: 'children:"No matching customizations found."', replace: 'children:"일치하는 사용자 지정 항목이 없습니다."' },
  { target: 'children:"No plugins available."', replace: 'children:"사용 가능한 플러그인이 없습니다."' },
  { target: 'children:"No plugins available"', replace: 'children:"사용 가능한 플러그인이 없습니다"' },
  { target: 'children:"No skills loaded."', replace: 'children:"로드된 스킬이 없습니다."' },
  { target: 'children:"No background tasks"', replace: 'children:"백그라운드 작업 없음"' },
  { target: 'children:"No active terminals"', replace: 'children:"활성 터미널 없음"' },
  { target: 'children:"No file changes"', replace: 'children:"파일 변경 사항 없음"' },
  { target: 'children:"No changes to review"', replace: 'children:"검토할 변경 사항 없음"' },
  { target: 'children:"No subagents"', replace: 'children:"서브에이전트 없음"' },
  { target: 'children:"No models available"', replace: 'children:"사용 가능한 모델 없음"' },
  { target: 'children:"No workspaces found"', replace: 'children:"작업 영역을 찾을 수 없음"' },
  { target: 'children:"No workspaces open."', replace: 'children:"열린 작업 영역이 없습니다."' },
  { target: 'children:"No events recorded."', replace: 'children:"기록된 이벤트가 없습니다."' },
  { target: 'children:"The agent will never request for review."', replace: 'children:"에이전트가 검토를 요청하지 않습니다."' },
  { target: 'children:"The agent will frequently ask for review."', replace: 'children:"에이전트가 자주 검토를 요청합니다."' },

  // Buttons & Labels
  { target: 'children:"Accept all"', replace: 'children:"모두 수락"' },
  { target: 'children:"Reject all"', replace: 'children:"모두 거절"' },
  { target: 'children:"Cancel task"', replace: 'children:"작업 취소"' },
  { target: 'children:"Delete Conversation"', replace: 'children:"대화 삭제"' },
  { target: 'children:"New Conversation"', replace: 'children:"새 대화"' },
  { target: 'children:"New conversation"', replace: 'children:"새 대화"' },
  { target: 'children:"Past Conversations"', replace: 'children:"이전 대화 목록"' },
  { target: 'children:"Conversation History"', replace: 'children:"대화 기록"' },
  { target: 'children:"Refresh workflows"', replace: 'children:"워크플로 새로고침"' },
  { target: 'children:"Refresh rules"', replace: 'children:"규칙 새로고침"' },
  { target: 'children:"Refresh skills"', replace: 'children:"스킬 새로고침"' },
  { target: 'children:"Edit workflow"', replace: 'children:"워크플로 편집"' },
  { target: 'children:"Edit rule"', replace: 'children:"규칙 편집"' },
  { target: 'children:"Customizations"', replace: 'children:"사용자 지정(커스텀)"' },
  { target: 'children:"Workflows"', replace: 'children:"워크플로"' },
  { target: 'children:"Rules"', replace: 'children:"규칙"' },
  { target: 'children:"Skills"', replace: 'children:"스킬"' },
  { target: 'children:"Plugins"', replace: 'children:"플러그인"' },
  { target: 'children:"Add Terminal"', replace: 'children:"터미널 추가"' },
  { target: 'children:"Delete Terminal"', replace: 'children:"터미널 삭제"' },
  { target: 'children:"Add Context"', replace: 'children:"컨텍스트 추가"' },
  { target: 'children:"Send Feedback"', replace: 'children:"피드백 보내기"' },
  { target: 'children:"Report Issue"', replace: 'children:"문제 보고"' },
  { target: 'children:"Reload IDE"', replace: 'children:"IDE 다시 로드"' },
  { target: 'children:"Approve"', replace: 'children:"승인"' },
  { target: 'children:"Deny"', replace: 'children:"거부"' },
  { target: 'children:"Blocked, needs input"', replace: 'children:"차단됨, 입력 필요"' },
  { target: 'children:"Select Model"', replace: 'children:"모델 선택"' },
  { target: 'children:"Edit Model"', replace: 'children:"모델 편집"' },
  { target: 'children:"Add Model"', replace: 'children:"모델 추가"' },
  { target: 'children:"Thinking..."', replace: 'children:"생각하는 중..."' },
  { target: 'children:"Loading skills..."', replace: 'children:"스킬 로드 중..."' },
  { target: 'children:"Loading..."', replace: 'children:"로드 중..."' },
  { target: 'children:"Review Changes"', replace: 'children:"변경 사항 검토"' },
  { target: 'children:"Review policy"', replace: 'children:"검토 정책"' },
  { target: 'children:"Terminal execution policy"', replace: 'children:"터미널 실행 정책"' },
  { target: 'children:"Always Proceed"', replace: 'children:"항상 진행"' },
  { target: 'children:"Request Review"', replace: 'children:"검토 요청"' },
  { target: 'children:"Always Ask"', replace: 'children:"항상 확인"' },
  { target: 'children:"See all"', replace: 'children:"모두 보기"' },
  { target: 'children:"Close Agent View"', replace: 'children:"에이전트 뷰 닫기"' },
  { target: 'children:"Scroll to bottom"', replace: 'children:"맨 아래로 스크롤"' },
  { target: 'children:"View customizations"', replace: 'children:"사용자 지정 보기"' },
  { target: 'children:"View MCP settings"', replace: 'children:"MCP 설정 보기"' },
  { target: 'children:"Manage MCP Servers"', replace: 'children:"MCP 서버 관리"' },
  { target: 'children:"Queued Messages"', replace: 'children:"대기 중인 메시지"' },
  { target: 'children:"Needs Attention"', replace: 'children:"확인 필요"' },
  { target: 'children:"Experimental"', replace: 'children:"실험적 기능"' },
  { target: 'children:"Submit"', replace: 'children:"제출"' },
  { target: 'children:"Proceed"', replace: 'children:"진행하기"' },
  { target: 'children:"Proceed Anyway"', replace: 'children:"계속 진행"' }
];

let replacedTotal = 0;
for (const item of translations) {
  let count = 0;
  while (js.includes(item.target)) {
    js = js.replace(item.target, item.replace);
    count++;
  }
  if (count > 0) {
    replacedTotal += count;
    console.log(`Replaced (${count}x): ${item.target.substring(0, 30)}... -> ${item.replace.substring(0, 30)}...`);
  } else {
    // console.log(`Not found: ${item.target}`);
  }
}

console.log(`Total replacements made: ${replacedTotal}`);
fs.writeFileSync(wbPath, js, 'utf8');
console.log('Successfully updated workbench.desktop.main.js!');
