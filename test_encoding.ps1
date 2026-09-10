$utf8WithBom = New-Object System.Text.UTF8Encoding($true)
$testText = "테스트: 대한민국 최고의 프리미엄 라이프스타일 쇼핑몰"
[System.IO.File]::WriteAllText("d:\92.SW\shop\test_utf8.txt", $testText, $utf8WithBom)
Write-Host "Wrote test_utf8.txt"
