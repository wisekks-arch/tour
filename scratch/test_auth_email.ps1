$ErrorActionPreference = 'Stop'

Write-Host "=== 1. Test Send Email Code ===" -ForegroundColor Cyan
$sendPayload = '{"email":"wisekks@gmail.com","purpose":"PasswordReset"}'
$sendRes = Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/send-email-code' -Method Post -Body $sendPayload -ContentType 'application/json'
Write-Host "Success: $($sendRes.success)"
Write-Host "Message: $($sendRes.message)"
Write-Host "Code: $($sendRes.code)"
Write-Host "IsEmail: $($sendRes.isEmail)"
$code = $sendRes.code

Write-Host "`n=== 2. Test Verify Email Code (Wrong) ===" -ForegroundColor Cyan
try {
    $wrongPayload = '{"email":"wisekks@gmail.com","code":"000000"}'
    Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/verify-email-code' -Method Post -Body $wrongPayload -ContentType 'application/json'
} catch {
    Write-Host "Expected error on wrong code: $($_.Exception.Message)" -ForegroundColor Yellow
}

Write-Host "`n=== 3. Test Verify Email Code (Correct) ===" -ForegroundColor Cyan
$correctPayload = "{`"email`":`"wisekks@gmail.com`",`"code`":`"$code`"}"
$verifyRes = Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/verify-email-code' -Method Post -Body $correctPayload -ContentType 'application/json'
Write-Host "Success: $($verifyRes.success)"
Write-Host "Message: $($verifyRes.message)"

Write-Host "`n=== 4. Test Reset Password ===" -ForegroundColor Cyan
$resetPayload = '{"email":"wisekks@gmail.com","newPassword":"#wises7337"}'
$resetRes = Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/reset-password' -Method Post -Body $resetPayload -ContentType 'application/json'
Write-Host "Success: $($resetRes.success)"
Write-Host "Message: $($resetRes.message)"

Write-Host "`n=== 5. Test Find ID ===" -ForegroundColor Cyan
$findPayload = '{"name":"\uAD00\uB9AC\uC790","email":"wisekks@gmail.com"}'
$findRes = Invoke-RestMethod -Uri 'http://localhost:3000/api/auth/find-id' -Method Post -Body $findPayload -ContentType 'application/json'
Write-Host "Success: $($findRes.success)"
Write-Host "Email: $($findRes.email)"
Write-Host "MaskedEmail: $($findRes.maskedEmail)"
