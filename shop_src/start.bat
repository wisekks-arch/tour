@echo off
chcp 65001 > nul
title EasyShop Server (Port 4000)
echo ===================================================
echo   [EasyShop] E-Commerce Fullstack Server Starting...
echo   Storefront: http://localhost:4000/
echo   Admin Panel: http://localhost:4000/admin.html
echo ===================================================
start http://localhost:4000/
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
