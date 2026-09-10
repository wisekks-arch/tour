@echo off
chcp 65001 > nul
echo ===================================================
echo   [TourEasy] 여행사 웹사이트 서버를 시작합니다...
echo   주소: http://localhost:3000
echo ===================================================
powershell -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
