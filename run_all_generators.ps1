$ErrorActionPreference = 'Stop'
$tourDir = 'd:\92.SW\tour'

Write-Host "Starting full generation of EasyShop project in d:\92.SW\shop..." -ForegroundColor Cyan

& "$tourDir\gen_data.ps1"
& "$tourDir\gen_static_assets.ps1"
& "$tourDir\gen_html_pages.ps1"
& "$tourDir\gen_html_pages2.ps1"
& "$tourDir\gen_html_pages3.ps1"
& "$tourDir\gen_admin_html.ps1"
& "$tourDir\gen_server_scripts.ps1"

Write-Host "Syncing all files from d:\92.SW\shop\public to d:\92.SW\shop root for GitHub Pages..." -ForegroundColor Cyan
$shopDir = 'd:\92.SW\shop'
$publicDir = Join-Path $shopDir 'public'

if (Test-Path $publicDir) {
    Copy-Item -Path (Join-Path $publicDir '*.html') -Destination $shopDir -Force
    if (Test-Path (Join-Path $publicDir 'css')) {
        Copy-Item -Path (Join-Path $publicDir 'css') -Destination $shopDir -Recurse -Force
    }
    if (Test-Path (Join-Path $publicDir 'js')) {
        Copy-Item -Path (Join-Path $publicDir 'js') -Destination $shopDir -Recurse -Force
    }
}

Write-Host "===================================================" -ForegroundColor Green
Write-Host "  🎉 All EasyShop files successfully generated & synced in d:\92.SW\shop!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
