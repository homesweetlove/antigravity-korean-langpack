@echo off
chcp 65001 > nul
echo [Antigravity IDE 한글 언어팩 원본 복구 중...]
node "%~dp0src\restore.js"
echo.
echo ========================================================
echo [완료] 원본 영어 버전으로 복구되었습니다.
echo IDE를 다시 로드하거나 껐다 켜주세요.
echo ========================================================
pause
