$b64 = [System.Convert]::ToBase64String([System.Text.Encoding]::UTF8.GetBytes("안녕하세요! 이지샵 정상 동작 테스트입니다."))
$bytes = [System.Convert]::FromBase64String($b64)
[System.IO.File]::WriteAllBytes("d:\92.SW\shop\test_b64.txt", $bytes)
Write-Host "Success write test_b64.txt"
