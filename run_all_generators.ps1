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

Write-Host "===================================================" -ForegroundColor Green
Write-Host "  🎉 All EasyShop files successfully generated in d:\92.SW\shop!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
