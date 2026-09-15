$body = @{
    access_key = '5561a35e-beec-4ea8-b3d2-c288ca7dc36f'
    subject = 'Test Mail'
    from_name = 'TourEasy'
    email = 'wisekks@gmail.com'
    message = 'Test temporary password mail'
} | ConvertTo-Json

try {
    $res = Invoke-RestMethod -Uri 'https://api.web3forms.com/submit' -Method Post -Body $body -ContentType 'application/json'
    Write-Host "Response from Web3Forms:"
    $res | ConvertTo-Json
} catch {
    Write-Host "Error: " $_.Exception.Message
}
