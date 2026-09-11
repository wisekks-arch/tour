@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ===================================================
echo   ✈️ [TourEasy] 여행사 웹/API 서버 시작 (Node.js)
echo   📍 메인 웹: http://localhost:3000
echo   📍 관리자: http://localhost:3000/admin.html
echo ===================================================
.\node.exe server.js
pause

