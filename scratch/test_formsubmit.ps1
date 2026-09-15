$targetEmail = "wisekks@gmail.com"
$body = @{
    _subject = "[투어이지] 임시 비밀번호가 발급되었습니다."
    _template = "box"
    _captcha = "false"
    name = "투어이지 고객센터"
    email = "support@toureasy.co.kr"
    message = "안녕하세요. 투어이지 임시 비밀번호는 [ Te!839472 ] 입니다."
} | ConvertTo-Json

try {
    $res = Invoke-RestMethod -Uri "https://formsubmit.co/ajax/$targetEmail" -Method Post -Body $body -ContentType 'application/json'
    Write-Host "Response from FormSubmit:"
    $res | ConvertTo-Json
} catch {
    Write-Host "Error: " $_.Exception.Message
}
