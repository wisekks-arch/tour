$git = "C:\Users\wisek\AppData\Local\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe"

Write-Host "Checking git status..."
& $git status -s

Write-Host "Adding modified files..."
& $git add public/js/api.js js/api.js

Write-Host "Committing changes..."
& $git commit -m "fix: resolve password reset error on GitHub Pages and optimize auth fallback"

Write-Host "Pushing to GitHub origin main..."
& $git push origin main

Write-Host "Git operation completed with exit code: $LASTEXITCODE"
