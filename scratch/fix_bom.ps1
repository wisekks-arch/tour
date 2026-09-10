$filePath = 'd:\92.SW\tour\server.ps1'
$bytes = [System.IO.File]::ReadAllBytes($filePath)
$text = [System.Text.Encoding]::UTF8.GetString($bytes)
$utf8Bom = New-Object System.Text.UTF8Encoding($true)
[System.IO.File]::WriteAllText($filePath, $text, $utf8Bom)
Write-Host "server.ps1 successfully saved with UTF-8 with BOM"
