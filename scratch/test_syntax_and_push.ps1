$git = "C:\Users\wisek\AppData\Local\GitHubDesktop\app-3.6.5\resources\app\git\cmd\git.exe"

Write-Host "1. Testing HTML Inline Scripts & JavaScript Syntax..."
& .\node.exe scratch/validate_html_scripts.js
if ($LASTEXITCODE -ne 0) {
  Write-Host "❌ HTML script validation failed!" -ForegroundColor Red
  exit 1
}

$files = @(
  "server.js",
  "public/js/api.js",
  "js/api.js"
)

$hasError = $false
foreach ($f in $files) {
  & .\node.exe -c $f
  if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Syntax ERROR in $f" -ForegroundColor Red
    $hasError = $true
  } else {
    Write-Host "✅ Syntax OK: $f" -ForegroundColor Green
  }
}

if ($hasError) {
  Write-Host "Aborting commit due to syntax errors!" -ForegroundColor Red
  exit 1
}

Write-Host "`n2. Checking git status..."
& $git status -s

Write-Host "`n3. Staging modified files..."
& $git add server.js public/js/api.js js/api.js admin.html public/admin.html data/smtp_config.json

Write-Host "`n4. Committing changes..."
& $git commit -m "feat: enable 100% real email dispatch on GitHub Pages via smart multi-router and web engine"

Write-Host "`n5. Pushing to GitHub origin main..."
& $git push origin main

Write-Host "`nDeployment completed with exit code: $LASTEXITCODE"

