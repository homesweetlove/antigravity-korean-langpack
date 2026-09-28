@echo off
chcp 65001 > nul
setlocal
cd /d "%~dp0"

echo ========================================================
echo  Antigravity IDE Korean Language Pack Patcher
echo ========================================================
echo.

node apply_korean_core.js
if %errorlevel% neq 0 goto error

node apply_korean_workbench.js
if %errorlevel% neq 0 goto error

node apply_korean_jetski.js
if %errorlevel% neq 0 goto error

node apply_korean_extension.js
if %errorlevel% neq 0 goto error

node fix_checksums.js
if %errorlevel% neq 0 goto error

echo.
echo ========================================================
echo  [OK] Patch completed successfully!
echo.
echo  Please restart Antigravity IDE or press
echo  Ctrl+Shift+P and run "Developer: Reload Window".
echo ========================================================
goto end

:error
echo.
echo ========================================================
echo  [Error] Patch encountered an error.
echo  Please check the log above or install prerequisites.
echo ========================================================

:end
pause