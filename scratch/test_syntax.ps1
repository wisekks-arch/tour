$errs = $null
$toks = $null
$ast = [System.Management.Automation.Language.Parser]::ParseFile((Resolve-Path '.\server.ps1'), [ref]$toks, [ref]$errs)
if ($errs.Count -gt 0) {
    Write-Host "server.ps1 Parse Errors:" -ForegroundColor Red
    $errs | ForEach-Object { Write-Host $_.Message }
    exit 1
} else {
    Write-Host "✓ server.ps1 syntax is 100% valid." -ForegroundColor Green
    exit 0
}
