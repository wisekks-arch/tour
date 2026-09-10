@echo off
chcp 65001 > nul
title PMP Exam Master Server (Port 5000)
echo ===================================================
echo   [PMP Exam Master] Fullstack Platform Starting...
echo   Portal URL: http://localhost:5000/
echo   Exam URL:   http://localhost:5000/exam.html
echo   Study URL:  http://localhost:5000/study.html
echo ===================================================
start http://localhost:5000/
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
