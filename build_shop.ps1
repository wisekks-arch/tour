$ErrorActionPreference = 'Stop'
$baseDir = 'd:\92.SW\shop'

Write-Host "Creating Shop directory structure at $baseDir..." -ForegroundColor Cyan

$dirs = @(
    $baseDir,
    (Join-Path $baseDir 'data'),
    (Join-Path $baseDir 'public'),
    (Join-Path $baseDir 'public\css'),
    (Join-Path $baseDir 'public\js'),
    (Join-Path $baseDir 'public\images')
)

foreach ($d in $dirs) {
    if (-not (Test-Path $d)) {
        New-Item -ItemType Directory -Path $d -Force | Out-Null
        Write-Host "Created: $d" -ForegroundColor Green
    }
}
