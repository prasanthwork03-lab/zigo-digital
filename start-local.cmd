@echo off
setlocal

cd /d "%~dp0"

if exist ".env.local" (
  for /f "usebackq eol=# tokens=1,* delims==" %%A in (".env.local") do (
    if not "%%A"=="" set "%%A=%%B"
  )
)

set "NODE_EXE=%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe"

where node >nul 2>nul
if %errorlevel%==0 (
  set "NODE_EXE=node"
)

if not exist "%USERPROFILE%\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" (
  where node >nul 2>nul
  if not %errorlevel%==0 (
    echo Node.js was not found.
    echo Install Node.js LTS from https://nodejs.org/ or open this project inside Codex and run again.
    pause
    exit /b 1
  )
)

echo Starting Zigo Digital at http://localhost:3000
echo Keep this window open while viewing the website.
"%NODE_EXE%" node_modules\next\dist\bin\next dev --webpack --port 3000

endlocal
