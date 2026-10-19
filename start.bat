@echo off
chcp 65001 > nul
cd /d "%~dp0"
echo ========================================================
echo   ✈️ [TourEasy] 투어이지 웹 & 네이버 SMTP 실시간 메일 서버
echo   📍 메인 웹: http://localhost:3000
echo   📍 관리자: http://localhost:3000/admin.html
echo   ✉️ 네이버 SMTP(kmagick@naver.com) 실시간 발송 엔진 가동
echo ========================================================
echo.
echo [1/2] 로컬 Node.js 웹 & API 서버 시작 중...
start "TourEasy Node Server" .
ode.exe server.js
echo [2/2] 서버가 성공적으로 시작되었습니다.
echo 브라우저에서 http://localhost:3000 으로 접속하시거나,
echo 배포된 웹사이트(https://wisekks-arch.github.io/tour/)에서 테스트하십시오.
echo.
pause
