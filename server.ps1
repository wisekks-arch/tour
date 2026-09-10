$ErrorActionPreference = 'Continue'
$port = 3000
$scriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$publicDir = Join-Path $scriptDir 'public'
$dataDir = Join-Path $scriptDir 'data'

if (-not (Test-Path $dataDir)) {
    New-Item -ItemType Directory -Path $dataDir | Out-Null
}

$mimeTypes = @{
    '.html' = 'text/html; charset=utf-8'
    '.htm'  = 'text/html; charset=utf-8'
    '.css'  = 'text/css; charset=utf-8'
    '.js'   = 'application/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'
    '.png'  = 'image/png'
    '.jpg'  = 'image/jpeg'
    '.jpeg' = 'image/jpeg'
    '.gif'  = 'image/gif'
    '.svg'  = 'image/svg+xml'
    '.ico'  = 'image/x-icon'
    '.woff' = 'font/woff'
    '.woff2'= 'font/woff2'
}

$STR_RECEIVED = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEC,0xA0,0x91,0xEC,0x88,0x98,0xEC,0x99,0x84,0xEB,0xA3,0x8C))
$STR_INQ_WAIT = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0x8B,0xB5,0xEB,0xB3,0x80,0xEB,0x8C,0x80,0xEA,0xB8,0xB0))
$STR_CONSULT_BK = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEC,0x83,0x81,0xEB,0x8B,0xB4,0xEC,0xA7,0x84,0xED,0x96,0x89))
$STR_CONSULT_INQ = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEC,0x83,0x81,0xEB,0x8B,0xB4,0xEC,0xA4,0x91))
$STR_DEFAULT_PKG = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0xA7,0x9E,0xEC,0xB6,0xA4,0x20,0xEC,0x97,0xAC,0xED,0x96,0x89,0x20,0xED,0x8C,0xA8,0xED,0x82,0xA4,0xEC,0xA7,0x80))
$STR_PAY_CONSULT = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEC,0x83,0x81,0xEB,0x8B,0xB4,0x20,0xED,0x9B,0x84,0x20,0xEA,0xB2,0xB0,0xEC,0xA0,0x9C))
$STR_OPERATING = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEC,0x9A,0xB4,0xEC,0x98,0x81,0xEC,0xA4,0x91))
$STR_NON_OPERATING = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0xAF,0xB8,0xEC,0x9A,0xB4,0xEC,0x98,0x81))

function Get-ObjectProp($obj, $propName, $defaultVal = $null) {
    if ($null -eq $obj) { return $defaultVal }
    try {
        if ($obj -is [System.Collections.IDictionary]) {
            if ($obj.Contains($propName)) {
                $val = $obj[$propName]
                if ($null -ne $val) { return $val }
            }
            return $defaultVal
        }
        if ($null -ne $obj.PSObject) {
            $prop = $obj.PSObject.Properties[$propName]
            if ($null -ne $prop) {
                $val = $prop.Value
                if ($null -ne $val) { return $val }
            }
        }
    } catch {}
    return $defaultVal
}

function Convert-ToJsonArray($list) {
    if ($null -eq $list) { return '[]' }
    $items = @()
    foreach ($item in $list) {
        if ($null -ne $item) { $items += $item }
    }
    if ($items.Count -eq 0) { return '[]' }
    if ($items.Count -eq 1) {
        $singleJson = $items[0] | ConvertTo-Json -Depth 10
        return ('[' + $singleJson + ']')
    }
    return ($items | ConvertTo-Json -Depth 10)
}

function Read-RawJsonFile($fileName, $defaultContent) {
    $filePath = Join-Path $dataDir $fileName
    if (-not (Test-Path $filePath)) {
        [System.IO.File]::WriteAllText($filePath, $defaultContent, [System.Text.Encoding]::UTF8)
        return $defaultContent
    }
    try {
        $raw = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
        if ([string]::IsNullOrWhiteSpace($raw)) { return $defaultContent }
        return $raw
    } catch {
        return $defaultContent
    }
}

function Write-RawJsonFile($fileName, $jsonString) {
    $filePath = Join-Path $dataDir $fileName
    try {
        [System.IO.File]::WriteAllText($filePath, $jsonString, [System.Text.Encoding]::UTF8)
        return $true
    } catch {
        return $false
    }
}

function Get-InquiriesList {
    $raw = Read-RawJsonFile 'inquiries.json' '[]'
    try {
        $parsed = ConvertFrom-Json $raw
        if ($null -eq $parsed) { return @() }
        if ($parsed.PSObject -and $parsed.PSObject.Properties['value']) {
            return @($parsed.value)
        }
        return @($parsed)
    } catch {
        return @()
    }
}

function Get-BookingsList {
    $raw = Read-RawJsonFile 'bookings.json' '[]'
    try {
        $parsed = ConvertFrom-Json $raw
        if ($null -eq $parsed) { return @() }
        if ($parsed.PSObject -and $parsed.PSObject.Properties['value']) {
            return @($parsed.value)
        }
        return @($parsed)
    } catch {
        return @()
    }
}

function Get-PackagesList {
    $raw = Read-RawJsonFile 'packages.json' '[]'
    try {
        $parsed = ConvertFrom-Json $raw
        if ($null -eq $parsed) { return @() }
        if ($parsed.PSObject -and $parsed.PSObject.Properties['value']) {
            return @($parsed.value)
        }
        if ($parsed.Count -eq 1 -and $parsed[0] -is [System.Array]) {
            return @($parsed[0])
        }
        if ($parsed.Count -eq 1 -and $parsed[0].PSObject -and $parsed[0].PSObject.Properties['value']) {
            return @($parsed[0].value)
        }
        return @($parsed)
    } catch {
        return @()
    }
}

function Get-SmtpConfig {
    $defaultCfg = '{"enabled":false,"provider":"naver","host":"smtp.naver.com","port":587,"enableSsl":true,"user":"","password":"","fromEmail":"","fromName":"투어이지(TourEasy) 맞춤여행팀"}'
    $raw = Read-RawJsonFile 'smtp_config.json' $defaultCfg
    try {
        $parsed = ConvertFrom-Json $raw
        if ($null -eq $parsed) { return @{} }
        return $parsed
    } catch {
        return @{}
    }
}

$global:VerificationCodes = @{}

function Get-UsersList {
    $raw = Read-RawJsonFile 'users.json' '[]'
    try {
        $parsed = ConvertFrom-Json $raw
        if ($null -eq $parsed) { return @() }
        if ($parsed.PSObject -and $parsed.PSObject.Properties['value']) {
            return @($parsed.value)
        }
        if ($parsed.Count -eq 1 -and $parsed[0] -is [System.Array]) {
            return @($parsed[0])
        }
        return @($parsed)
    } catch {
        return @()
    }
}

function Test-PasswordRules($pwd) {
    if ([string]::IsNullOrWhiteSpace($pwd) -or $pwd.Length -lt 8) { return $false }
    $hasLetter = $pwd -match '[a-zA-Z]'
    $hasNumber = $pwd -match '[0-9]'
    $hasSpecial = $pwd -match '[^a-zA-Z0-9\s]'
    return ($hasLetter -and $hasNumber -and $hasSpecial)
}

function Generate-VerificationEmailHtml($toEmail, $code, $purpose = '본인인증') {
    $purposeEncoded = [System.Web.HttpUtility]::HtmlEncode($purpose)
    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append("<!DOCTYPE html><html lang='ko'><head><meta charset='UTF-8'><title>투어이지 본인인증 번호 안내</title></head>")
    [void]$sb.Append("<body style='margin:0;padding:20px 10px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#334155;line-height:1.6;'>")
    [void]$sb.Append("<div style='max-width:520px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #e2e8f0;'>")
    [void]$sb.Append("<div style='background:linear-gradient(135deg,#0f172a 0%,#0284c7 100%);padding:28px 24px;text-align:center;color:#ffffff;'>")
    [void]$sb.Append("<div style='font-size:22px;font-weight:900;margin-bottom:4px;'>✈️ 투어이지 (TourEasy)</div>")
    [void]$sb.Append("<div style='font-size:12.5px;color:#bae6fd;'>프리미엄 여행의 시작 | 이메일 본인인증</div>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='padding:32px 24px;text-align:center;'>")
    [void]$sb.Append("<h2 style='margin:0 0 10px 0;font-size:18px;color:#0f172a;font-weight:800;'>이메일 " + $purposeEncoded + " 번호 안내</h2>")
    [void]$sb.Append("<p style='margin:0 0 24px 0;font-size:13.5px;color:#64748b;line-height:1.6;'>안녕하세요. 투어이지를 이용해 주셔서 감사합니다.<br>아래의 6자리 인증번호를 인증 창에 입력해 주세요.</p>")
    [void]$sb.Append("<div style='background-color:#f8fafc;border:2px dashed #0284c7;border-radius:14px;padding:20px 16px;margin:20px 0;'>")
    [void]$sb.Append("<div style='font-size:11.5px;font-weight:700;color:#0284c7;letter-spacing:1px;margin-bottom:6px;'>AUTHENTICATION CODE</div>")
    [void]$sb.Append("<div style='font-size:36px;font-weight:900;letter-spacing:8px;color:#0f172a;font-family:monospace;'>" + $code + "</div>")
    [void]$sb.Append("<div style='font-size:12px;color:#ef4444;margin-top:8px;font-weight:bold;'>⏱️ 유효시간: 발송 후 3분 이내</div>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='background-color:#fffbeb;border:1px solid #fef3c7;border-radius:10px;padding:12px 16px;margin:20px 0;text-align:left;font-size:12px;color:#92400e;line-height:1.5;'>")
    [void]$sb.Append("• 본인이 요청하지 않은 경우 본 메일을 무시하시기 바랍니다.<br>")
    [void]$sb.Append("• 인증번호를 타인에게 절대 노출하지 마세요.")
    [void]$sb.Append("</div>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:18px 24px;font-size:11px;color:#94a3b8;line-height:1.6;text-align:center;'>")
    [void]$sb.Append("(주)투어이지 여행사 | 대표전화: 1588-0000 | 이메일: help@toureasy.co.kr<br>")
    [void]$sb.Append("서울특별시 중구 세종대로 110 투어타워 12층")
    [void]$sb.Append("</div></div></body></html>")
    return $sb.ToString()
}

function Generate-InquiryEmailHtml($inq, $reply) {
    $custName = [System.Web.HttpUtility]::HtmlEncode((Get-ObjectProp $inq 'name' '고객'))
    $destination = [System.Web.HttpUtility]::HtmlEncode((Get-ObjectProp $inq 'destination' '맞춤 여행'))
    $expectedDate = [System.Web.HttpUtility]::HtmlEncode((Get-ObjectProp $inq 'expectedDate' '일정 협의'))
    $groupSize = Get-ObjectProp $inq 'groupSize' '1'
    $adminName = [System.Web.HttpUtility]::HtmlEncode((Get-ObjectProp $reply 'adminName' '김투어 수석 여행플래너'))
    $quotedPrice = [System.Web.HttpUtility]::HtmlEncode((Get-ObjectProp $reply 'quotedPrice' ''))
    $pkgTitle = [System.Web.HttpUtility]::HtmlEncode((Get-ObjectProp $reply 'recommendedPackageTitle' ''))
    $content = Get-ObjectProp $reply 'content' ''
    $contentEncoded = [System.Web.HttpUtility]::HtmlEncode($content)
    $contentHtml = $contentEncoded.Replace("`r`n", "<br>").Replace("`n", "<br>")

    $priceHtml = ''
    if (-not [string]::IsNullOrWhiteSpace($quotedPrice)) {
        $priceHtml = "<div style='background-color:#f0f9ff;border-left:4px solid #0284c7;padding:14px 18px;margin:16px 0;border-radius:8px;'><div style='color:#0369a1;font-size:13px;font-weight:bold;'>제안 맞춤 견적 금액</div><div style='font-size:17px;font-weight:800;color:#0f172a;margin-top:4px;'>" + $quotedPrice + "</div></div>"
    }

    $pkgHtml = ''
    if (-not [string]::IsNullOrWhiteSpace($pkgTitle)) {
        $pkgHtml = "<div style='background-color:#fffbeb;border-left:4px solid #d97706;padding:14px 18px;margin:16px 0;border-radius:8px;'><div style='color:#b45309;font-size:13px;font-weight:bold;'>추천 연계 여행 상품</div><div style='font-size:15px;font-weight:700;color:#1e293b;margin-top:4px;'>" + $pkgTitle + "</div></div>"
    }

    $sb = New-Object System.Text.StringBuilder
    [void]$sb.Append("<!DOCTYPE html><html lang='ko'><head><meta charset='UTF-8'><title>투어이지 맞춤 여행 상담 답변</title></head>")
    [void]$sb.Append("<body style='margin:0;padding:20px 10px;background-color:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;color:#334155;line-height:1.6;'>")
    [void]$sb.Append("<div style='max-width:640px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);border:1px solid #e2e8f0;'>")
    [void]$sb.Append("<div style='background:linear-gradient(135deg,#0f172a 0%,#0369a1 100%);padding:32px 24px;text-align:center;color:#ffffff;'>")
    [void]$sb.Append("<div style='font-size:24px;font-weight:900;margin-bottom:6px;'>투어이지 (TourEasy)</div>")
    [void]$sb.Append("<div style='font-size:13px;color:#bae6fd;'>프리미엄 1:1 맞춤 여행 컨설팅 & 안심 케어</div>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='padding:32px 24px;'>")
    [void]$sb.Append("<h2 style='margin:0 0 14px 0;font-size:18px;color:#0f172a;font-weight:800;'>안녕하세요, <span style='color:#0284c7;'>" + $custName + "</span> 고객님!</h2>")
    [void]$sb.Append("<p style='margin:0 0 20px 0;font-size:14px;color:#475569;'>투어이지에 보내주신 <strong>[" + $destination + " / " + $expectedDate + " / " + $groupSize + "인]</strong> 맞춤 여행 상담에 대해 전담 플래너의 맞춤 일정 및 견적 답변을 안내해 드립니다.</p>")
    [void]$sb.Append($priceHtml)
    [void]$sb.Append($pkgHtml)
    [void]$sb.Append("<div style='background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:20px;margin:20px 0;'>")
    [void]$sb.Append("<div style='font-weight:bold;font-size:13px;color:#0f172a;margin-bottom:12px;padding-bottom:8px;border-bottom:1px dashed #cbd5e1;'>담당 플래너 (" + $adminName + ") 상담 및 견적 안내:</div>")
    [void]$sb.Append("<div style='font-size:13.5px;color:#1e293b;line-height:1.8;'>" + $contentHtml + "</div>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='background-color:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px;margin:24px 0;font-size:12.5px;color:#166534;line-height:1.7;'>")
    [void]$sb.Append("<strong style='color:#14532d;font-size:13px;'>투어이지 4대 안심 약속</strong><br>")
    [void]$sb.Append("• 전 일정 4~5성급 프리미엄 숙소 엄선 및 단독 전용 차량 제공<br>")
    [void]$sb.Append("• 불필요한 의무 쇼핑/옵션 강요 없는 100% 순수 맞춤 일정<br>")
    [void]$sb.Append("• 현지 24시간 한국인 베테랑 매니저 긴급 안심 케어 지원<br>")
    [void]$sb.Append("• 최고 5억원 영업배상 및 여행자 안심 공제보험 가입")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='text-align:center;margin:30px 0 10px 0;'>")
    [void]$sb.Append("<a href='http://localhost:3000' style='display:inline-block;background-color:#0284c7;color:#ffffff;font-weight:bold;font-size:14px;text-decoration:none;padding:13px 30px;border-radius:12px;'>투어이지 웹사이트 방문하기</a>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("</div>")
    [void]$sb.Append("<div style='background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:22px 24px;font-size:11.5px;color:#94a3b8;line-height:1.7;text-align:center;'>")
    [void]$sb.Append("(주)투어이지 여행사 | 대표전화: 1588-0000 | 이메일: help@toureasy.co.kr<br>")
    [void]$sb.Append("서울특별시 중구 세종대로 110 투어타워 12층 | 통신판매업신고: 제2026-서울중구-0123호<br>")
    [void]$sb.Append("본 메일은 투어이지 온라인 맞춤 상담에 등록해주신 고객님의 이메일 주소로 발송되었습니다.")
    [void]$sb.Append("</div></div></body></html>")

    return $sb.ToString()
}

function Send-RealSmtpEmail($toEmail, $toName, $subject, $bodyText, $bodyHtml = $null, $customCfg = $null) {
    if ([string]::IsNullOrWhiteSpace($toEmail)) {
        return @{ success = $false; error = '수신자 이메일 주소가 지정되지 않았습니다.' }
    }

    $cfg = if ($null -ne $customCfg) { $customCfg } else { Get-SmtpConfig }

    $hostName = (Get-ObjectProp $cfg 'host' '').Trim()
    $rawUser = (Get-ObjectProp $cfg 'user' '').Trim()
    $password = Get-ObjectProp $cfg 'password' ''
    $rawFromEmail = (Get-ObjectProp $cfg 'fromEmail' '').Trim()
    $fromName = Get-ObjectProp $cfg 'fromName' '투어이지(TourEasy)'

    # Smart sanitization: handle cases where user inputs "kmagick@naver.com/kmagick" or similar
    $user = $rawUser
    $fromEmail = $rawFromEmail

    if ($user.Contains('/')) {
        $parts = $user.Split('/')
        $foundMail = $null
        $foundId = $null
        foreach ($p in $parts) {
            $pt = $p.Trim()
            if ($pt.Contains('@') -and $pt.Contains('.')) {
                $foundMail = $pt
            } elseif (-not [string]::IsNullOrWhiteSpace($pt)) {
                $foundId = $pt
            }
        }
        if ($foundMail) {
            if ([string]::IsNullOrWhiteSpace($fromEmail)) { $fromEmail = $foundMail }
        }
        if ($foundId) {
            $user = $foundId
        } elseif ($foundMail) {
            $user = $foundMail
        }
    }

    # If fromEmail is still blank or lacks '@', derive a valid RFC-5321 email
    if ([string]::IsNullOrWhiteSpace($fromEmail) -or (-not $fromEmail.Contains('@'))) {
        if ($user.Contains('@') -and $user.Contains('.')) {
            $fromEmail = $user
        } elseif ($hostName.ToLower().Contains('naver')) {
            $fromEmail = "$user@naver.com"
        } elseif ($hostName.ToLower().Contains('daum') -or $hostName.ToLower().Contains('kakao')) {
            $fromEmail = "$user@daum.net"
        } elseif ($hostName.ToLower().Contains('gmail')) {
            $fromEmail = "$user@gmail.com"
        } else {
            $fromEmail = $user
        }
    }

    # Ensure fromEmail has no slash
    if ($fromEmail.Contains('/')) {
        $fromParts = $fromEmail.Split('/')
        foreach ($fp in $fromParts) {
            if ($fp.Contains('@')) { $fromEmail = $fp.Trim(); break }
        }
    }
    
    $port = 587
    $rawPort = Get-ObjectProp $cfg 'port' 587
    if ($rawPort) { [int]::TryParse($rawPort.ToString(), [ref]$port) | Out-Null }
    
    $enableSsl = $true
    $rawSsl = Get-ObjectProp $cfg 'enableSsl' $true
    if ($null -ne $rawSsl) {
        if ($rawSsl -is [bool]) { $enableSsl = $rawSsl }
        else { [bool]::TryParse($rawSsl.ToString(), [ref]$enableSsl) | Out-Null }
    }

    if ([string]::IsNullOrWhiteSpace($hostName) -or [string]::IsNullOrWhiteSpace($user) -or [string]::IsNullOrWhiteSpace($password)) {
        return @{ 
            success = $false
            error = 'SMTP 메일 서버 설정(호스트/계정/비밀번호)이 완료되지 않았습니다. 관리자 페이지의 [이메일(SMTP) 설정]에서 발송 계정을 등록해주세요.'
            needsConfig = $true
        }
    }

    try {
        [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12 -bor [System.Net.SecurityProtocolType]::Tls11 -bor [System.Net.SecurityProtocolType]::Tls

        $smtp = New-Object System.Net.Mail.SmtpClient($hostName, $port)
        $smtp.EnableSsl = $enableSsl
        $smtp.Timeout = 15000
        $smtp.UseDefaultCredentials = $false
        $smtp.Credentials = New-Object System.Net.NetworkCredential($user, $password)
        $smtp.DeliveryMethod = [System.Net.Mail.SmtpDeliveryMethod]::Network

        $mail = New-Object System.Net.Mail.MailMessage
        $mail.From = New-Object System.Net.Mail.MailAddress($fromEmail, $fromName, [System.Text.Encoding]::UTF8)
        $displayName = if ([string]::IsNullOrWhiteSpace($toName)) { $toEmail } else { $toName }
        $mail.To.Add((New-Object System.Net.Mail.MailAddress($toEmail, $displayName, [System.Text.Encoding]::UTF8)))
        $mail.Subject = $subject
        $mail.SubjectEncoding = [System.Text.Encoding]::UTF8

        if (-not [string]::IsNullOrWhiteSpace($bodyHtml)) {
            $mail.IsBodyHtml = $true
            $mail.Body = $bodyHtml
        } else {
            $mail.IsBodyHtml = $false
            $mail.Body = $bodyText
        }
        $mail.BodyEncoding = [System.Text.Encoding]::UTF8

        $smtp.Send($mail)
        $mail.Dispose()
        $smtp.Dispose()

        Write-Host ("[SMTP SUCCESS] Real email dispatched to " + $toEmail + " (" + $subject + ")") -ForegroundColor Green
        return @{ 
            success = $true
            message = ('[' + $toEmail + '] 고객님께 실제 이메일이 성공적으로 발송되었습니다.') 
        }
    } catch {
        $errMsg = $_.Exception.Message
        if ($_.Exception.InnerException) {
            $errMsg = $errMsg + ' (' + $_.Exception.InnerException.Message + ')'
        }
        
        # Friendly troubleshooting guidance
        if ($errMsg -match '5\.5\.1' -or $errMsg -match '5\.7\.1' -or $errMsg -match 'Authentication' -or $errMsg -match 'not accepted') {
            $errMsg = "네이버 SMTP 로그인 인증 실패 (535 / 5.5.1 Authentication Required)`n" +
                      "▶ [해결 1] 네이버 웹메일(mail.naver.com) 좌측 하단 톱니바퀴 [환경설정] > [POP3/IMAP 설정] > [IMAP/SMTP 설정] 탭에서 [사용함]으로 체크 후 저장해주세요.`n" +
                      "▶ [해결 2] 네이버 계정에 2단계 인증이 켜져 있는 경우, 일반 비밀번호가 아닌 네이버 [내정보 > 보안설정 > 2단계 인증 관리 > 애플리케이션 비밀번호(종류: 메일)]에서 생성된 전용 비밀번호를 입력하셔야 합니다.`n" +
                      "▶ [해결 3] 계정 아이디(kmagick) 및 비밀번호 대소문자/특수문자 오타 여부를 확인해주세요."
        } elseif ($errMsg -match '5\.1\.2' -or $errMsg -match 'RFC-5321') {
            $errMsg = "발신자 주소 형식 오류입니다. 발송 계정에 슬래시(/) 없이 올바른 이메일(예: kmagick@naver.com)만 입력해주세요."
        }

        Write-Host ('[SMTP ERROR] Failed to send email to ' + $toEmail + ': ' + $errMsg) -ForegroundColor Red
        return @{ 
            success = $false
            error = $errMsg
        }
    }
}

function Send-JsonResponseString($response, $statusCode, $jsonString) {
    $response.StatusCode = $statusCode
    $response.ContentType = 'application/json; charset=utf-8'
    $response.AddHeader('Access-Control-Allow-Origin', '*')
    $response.AddHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
    $response.AddHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    
    $buffer = [System.Text.Encoding]::UTF8.GetBytes($jsonString)
    $response.ContentLength64 = $buffer.Length
    $response.OutputStream.Write($buffer, 0, $buffer.Length)
    $response.OutputStream.Close()
}

function Send-JsonObjectResponse($response, $statusCode, $obj) {
    $json = $obj | ConvertTo-Json -Depth 10 -Compress
    Send-JsonResponseString $response $statusCode $json
}

function Read-RequestBodyString($request) {
    if (-not $request.HasEntityBody) { return '' }
    $reader = New-Object System.IO.StreamReader($request.InputStream, [System.Text.Encoding]::UTF8)
    $body = $reader.ReadToEnd()
    $reader.Close()
    return $body
}

# Start HTTP Listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://*:$port/")
$listener.Prefixes.Add("http://localhost:$port/")

try {
    $listener.Start()
} catch {
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("http://localhost:$port/")
    $listener.Start()
}

Write-Host "TourEasy Web Server Started at http://localhost:$port" -ForegroundColor Green

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $method = $req.HttpMethod
        $rawUrl = $req.RawUrl
        $path = $req.Url.AbsolutePath

        # Handle CORS OPTIONS
        if ($method -eq 'OPTIONS') {
            $res.StatusCode = 204
            $res.AddHeader('Access-Control-Allow-Origin', '*')
            $res.AddHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
            $res.AddHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            $res.OutputStream.Close()
            continue
        }

        # REST API Routes
        if ($path.StartsWith('/api/')) {

            # 0-1. POST /api/auth/send-code & /api/auth/send-email-code (이메일/휴대폰 본인인증 6자리 발송)
            if (($path -eq '/api/auth/send-code' -or $path -eq '/api/auth/send-email-code') -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $email = (Get-ObjectProp $body 'email' '').Trim().ToLower()
                $phone = (Get-ObjectProp $body 'phone' '').Trim().Replace('-', '')
                $purpose = (Get-ObjectProp $body 'purpose' '본인인증')

                if (-not [string]::IsNullOrWhiteSpace($email)) {
                    if (-not ($email.Contains('@') -and $email.Contains('.'))) {
                        Send-JsonObjectResponse $res 400 @{ success = $false; message = '올바른 이메일 주소를 입력해주세요.' }
                        continue
                    }
                    $code = (Get-Random -Minimum 100000 -Maximum 999999).ToString()
                    $global:VerificationCodes[$email] = @{
                        code = $code
                        expiresAt = (Get-Date).AddMinutes(3)
                    }

                    # Send actual email via SMTP
                    $emailHtml = Generate-VerificationEmailHtml $email $code $purpose
                    $emailSubject = "[투어이지] 이메일 $purpose 인증번호 [$code]"
                    $emailText = "[투어이지] $purpose 인증번호: [$code] (3분 이내 입력)"
                    $mailRes = Send-RealSmtpEmail -toEmail $email -toName '고객' -subject $emailSubject -bodyText $emailText -bodyHtml $emailHtml

                    Send-JsonObjectResponse $res 200 @{
                        success = $true
                        message = "[$email] 으로 인증번호가 발송되었습니다. 메일함을 확인해주세요. (3분 이내 입력)"
                        code = $code
                        expiresIn = 180
                        isEmail = $true
                        mailSent = $mailRes.success
                    }
                    continue
                } elseif (-not [string]::IsNullOrWhiteSpace($phone)) {
                    $code = (Get-Random -Minimum 100000 -Maximum 999999).ToString()
                    $global:VerificationCodes[$phone] = @{
                        code = $code
                        expiresAt = (Get-Date).AddMinutes(3)
                    }
                    Send-JsonObjectResponse $res 200 @{
                        success = $true
                        message = "[투어이지 본인인증] 인증번호 [$code] 가 발송되었습니다. (3분 이내 입력)"
                        code = $code
                        expiresIn = 180
                    }
                    continue
                } else {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '인증번호를 수신할 이메일 주소를 입력해주세요.' }
                    continue
                }
            }

            # 0-2. POST /api/auth/verify-code & /api/auth/verify-email-code (인증번호 검증)
            if (($path -eq '/api/auth/verify-code' -or $path -eq '/api/auth/verify-email-code') -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $email = (Get-ObjectProp $body 'email' '').Trim().ToLower()
                $phone = (Get-ObjectProp $body 'phone' '').Trim().Replace('-', '')
                $code = (Get-ObjectProp $body 'code' '').Trim()

                $targetKey = if (-not [string]::IsNullOrWhiteSpace($email)) { $email } else { $phone }
                if ([string]::IsNullOrWhiteSpace($targetKey)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '인증 대상 이메일 또는 연락처가 누락되었습니다.' }
                    continue
                }

                if (-not $global:VerificationCodes.ContainsKey($targetKey)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '인증번호를 먼저 발송해주세요.' }
                    continue
                }
                $stored = $global:VerificationCodes[$targetKey]
                if ((Get-Date) -gt $stored.expiresAt) {
                    $global:VerificationCodes.Remove($targetKey)
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '인증번호 유효시간(3분)이 만료되었습니다. 다시 요청해주세요.' }
                    continue
                }
                if ($stored.code -ne $code) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '인증번호가 일치하지 않습니다. 다시 확인해주세요.' }
                    continue
                }
                Send-JsonObjectResponse $res 200 @{ success = $true; message = '이메일 본인인증이 성공적으로 완료되었습니다.' }
                continue
            }

            # 0-3. POST /api/auth/register (회원가입)
            if ($path -eq '/api/auth/register' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $email = (Get-ObjectProp $body 'email' '').Trim().ToLower()
                $password = Get-ObjectProp $body 'password' ''
                $name = (Get-ObjectProp $body 'name' '').Trim()
                $phone = (Get-ObjectProp $body 'phone' '').Trim()

                if ([string]::IsNullOrWhiteSpace($email) -or (-not ($email.Contains('@') -and $email.Contains('.')))) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '올바른 이메일 주소를 입력해주세요.' }
                    continue
                }
                if ([string]::IsNullOrWhiteSpace($name)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '성명을 입력해주세요.' }
                    continue
                }
                if (-not (Test-PasswordRules $password)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' }
                    continue
                }

                $users = Get-UsersList
                $exists = $false
                foreach ($u in $users) {
                    if ((Get-ObjectProp $u 'email' '').ToLower() -eq $email) {
                        $exists = $true
                        break
                    }
                }
                if ($exists) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '이미 등록된 이메일(아이디)입니다. 다른 이메일을 사용하거나 로그인해주세요.' }
                    continue
                }

                $newUser = [ordered]@{
                    id = "usr-" + [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
                    email = $email
                    password = $password
                    name = $name
                    phone = if ([string]::IsNullOrWhiteSpace($phone)) { '' } else { $phone }
                    role = "MEMBER"
                    createdAt = (Get-Date).ToString("s")
                }
                $updatedUsers = @($users) + $newUser
                $newJson = Convert-ToJsonArray $updatedUsers
                Write-RawJsonFile 'users.json' $newJson | Out-Null

                Send-JsonObjectResponse $res 200 @{
                    success = $true
                    message = '회원가입이 정상적으로 완료되었습니다! 가입하신 계정으로 로그인해 주세요.'
                    user = @{
                        id = $newUser.id
                        email = $newUser.email
                        name = $newUser.name
                        phone = $newUser.phone
                        role = $newUser.role
                    }
                }
                continue
            }

            # 0-4. POST /api/auth/login (로그인)
            if ($path -eq '/api/auth/login' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $email = (Get-ObjectProp $body 'email' '').Trim().ToLower()
                $password = Get-ObjectProp $body 'password' ''

                $users = Get-UsersList
                $found = $null
                foreach ($u in $users) {
                    if ((Get-ObjectProp $u 'email' '').ToLower() -eq $email -and (Get-ObjectProp $u 'password' '') -eq $password) {
                        $found = $u
                        break
                    }
                }
                if ($null -ne $found) {
                    Send-JsonObjectResponse $res 200 @{
                        success = $true
                        message = "$($found.name) 회원님, 환영합니다!"
                        user = @{
                            id = $found.id
                            email = $found.email
                            name = $found.name
                            phone = (Get-ObjectProp $found 'phone' '')
                            role = (Get-ObjectProp $found 'role' 'MEMBER')
                        }
                    }
                } else {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '이메일(아이디) 또는 비밀번호가 일치하지 않습니다.' }
                }
                continue
            }

            # 0-5. POST /api/auth/find-id (아이디 찾기)
            if ($path -eq '/api/auth/find-id' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $name = (Get-ObjectProp $body 'name' '').Trim()
                $phone = (Get-ObjectProp $body 'phone' '').Trim().Replace('-', '')
                $email = (Get-ObjectProp $body 'email' '').Trim().ToLower()

                $users = Get-UsersList
                $found = $null
                foreach ($u in $users) {
                    $uName = (Get-ObjectProp $u 'name' '').Trim()
                    $uPhone = (Get-ObjectProp $u 'phone' '').Trim().Replace('-', '')
                    $uEmail = (Get-ObjectProp $u 'email' '').ToLower().Trim()
                    
                    if ($uName -eq $name -and ((-not [string]::IsNullOrWhiteSpace($phone) -and $uPhone -eq $phone) -or (-not [string]::IsNullOrWhiteSpace($email) -and $uEmail -eq $email))) {
                        $found = $u
                        break
                    }
                }
                if ($null -ne $found) {
                    $emailParts = $found.email.Split('@')
                    $userPart = $emailParts[0]
                    $domainPart = if ($emailParts.Length -gt 1) { $emailParts[1] } else { '' }
                    $maskedUser = if ($userPart.Length -gt 3) { $userPart.Substring(0, 3) + ('*' * ($userPart.Length - 3)) } else { $userPart + '***' }
                    $masked = "$maskedUser@$domainPart"

                    Send-JsonObjectResponse $res 200 @{
                        success = $true
                        message = '회원님의 아이디(이메일)를 성공적으로 찾았습니다.'
                        email = $found.email
                        maskedEmail = $masked
                        name = $found.name
                    }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = '입력하신 정보와 일치하는 회원 정보를 찾을 수 없습니다.' }
                }
                continue
            }

            # 0-6. POST /api/auth/reset-password (비밀번호 재설정)
            if ($path -eq '/api/auth/reset-password' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $email = (Get-ObjectProp $body 'email' '').Trim().ToLower()
                $newPassword = Get-ObjectProp $body 'newPassword' ''

                if ([string]::IsNullOrWhiteSpace($email)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '이메일 주소를 입력해주세요.' }
                    continue
                }
                if (-not (Test-PasswordRules $newPassword)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '새 비밀번호는 특수문자, 영문, 숫자를 모두 포함하여 8자 이상이어야 합니다.' }
                    continue
                }

                $users = Get-UsersList
                $found = $null
                foreach ($u in $users) {
                    $uEmail = (Get-ObjectProp $u 'email' '').ToLower()
                    if ($uEmail -eq $email) {
                        $u | Add-Member -NotePropertyName 'password' -NotePropertyValue $newPassword -Force
                        $found = $u
                        break
                    }
                }

                if ($null -ne $found) {
                    $newJson = Convert-ToJsonArray $users
                    Write-RawJsonFile 'users.json' $newJson | Out-Null
                    Send-JsonObjectResponse $res 200 @{
                        success = $true
                        message = '비밀번호가 안전하게 재설정되었습니다! 새로운 비밀번호로 로그인해 주세요.'
                    }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = '입력하신 가입 이메일(아이디)과 일치하는 계정을 찾을 수 없습니다.' }
                }
                continue
            }

            # 0-7. GET /api/auth/users (회원 목록 - 관리자용)
            if ($path -eq '/api/auth/users' -and $method -eq 'GET') {
                $users = Get-UsersList
                $safeUsers = @()
                foreach ($u in $users) {
                    $safeUsers += @{
                        id = $u.id
                        email = $u.email
                        name = $u.name
                        phone = $u.phone
                        role = (Get-ObjectProp $u 'role' 'MEMBER')
                        createdAt = (Get-ObjectProp $u 'createdAt' '')
                    }
                }
                Send-JsonObjectResponse $res 200 @{ success = $true; count = $safeUsers.Count; data = $safeUsers }
                continue
            }

            # 1. GET /api/packages
            if ($path -eq '/api/packages' -and $method -eq 'GET') {
                $raw = Read-RawJsonFile 'packages.json' '[]'
                Send-JsonResponseString $res 200 ('{"success":true,"data":' + $raw + '}')
                continue
            }

            # 2. GET /api/packages/:id
            if ($path.StartsWith('/api/packages/') -and $method -eq 'GET') {
                $id = $path.Substring('/api/packages/'.Length)
                $packages = Get-PackagesList
                $found = $null
                foreach ($p in $packages) {
                    if ($p.id -eq $id -or $p.slug -eq $id) {
                        $found = $p
                        break
                    }
                }
                if ($found) {
                    Send-JsonObjectResponse $res 200 @{ success = $true; data = $found }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = 'Package not found' }
                }
                continue
            }

            # 2-1. PATCH /api/packages/:id (운영상태 및 상품 정보 업데이트)
            if ($path.StartsWith('/api/packages/') -and $method -eq 'PATCH') {
                $id = $path.Substring('/api/packages/'.Length)
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $packagesList = Get-PackagesList
                $found = $null
                $newStatus = Get-ObjectProp $body 'status' ''
                $newIsActive = Get-ObjectProp $body 'isActive' $null

                foreach ($p in $packagesList) {
                    if ($p.id -eq $id -or $p.slug -eq $id) {
                        if ($null -ne $newStatus -and "$newStatus" -ne '') {
                            $p | Add-Member -NotePropertyName 'status' -NotePropertyValue $newStatus -Force
                        }
                        if ($null -ne $newIsActive) {
                            $p | Add-Member -NotePropertyName 'isActive' -NotePropertyValue $newIsActive -Force
                        }
                        $found = $p
                        break
                    }
                }

                if ($found) {
                    $newJson = Convert-ToJsonArray $packagesList
                    Write-RawJsonFile 'packages.json' $newJson | Out-Null
                    Send-JsonObjectResponse $res 200 @{ 
                        success = $true
                        message = '상품 운영 상태가 성공적으로 변경되었습니다.'
                        data = $found 
                    }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = 'Package not found' }
                }
                continue
            }

            # 2-2. POST /api/packages (신규 상품 등록)
            if ($path -eq '/api/packages' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}
                $packagesList = Get-PackagesList
                $newId = "pkg-" + (Get-Date).ToString('yyyyMMddHHmmss')
                $body | Add-Member -NotePropertyName 'id' -NotePropertyValue $newId -Force
                $body | Add-Member -NotePropertyName 'status' -NotePropertyValue '운영중' -Force
                $body | Add-Member -NotePropertyName 'isActive' -NotePropertyValue $true -Force
                $body | Add-Member -NotePropertyName 'createdAt' -NotePropertyValue ((Get-Date).ToString('s')) -Force
                $combined = @($body) + $packagesList
                $newJson = Convert-ToJsonArray $combined
                Write-RawJsonFile 'packages.json' $newJson | Out-Null
                Send-JsonObjectResponse $res 201 @{ success = $true; message = 'Package created'; data = $body }
                continue
            }

            # 2-3. DELETE /api/packages/:id (상품 삭제)
            if ($path.StartsWith('/api/packages/') -and $method -eq 'DELETE') {
                $id = $path.Substring('/api/packages/'.Length)
                $packagesList = Get-PackagesList
                $filtered = @()
                $deleted = $false
                foreach ($p in $packagesList) {
                    if ($p.id -eq $id -or $p.slug -eq $id) {
                        $deleted = $true
                    } else {
                        $filtered += $p
                    }
                }
                if ($deleted) {
                    $newJson = Convert-ToJsonArray $filtered
                    Write-RawJsonFile 'packages.json' $newJson | Out-Null
                    Send-JsonObjectResponse $res 200 @{ success = $true; message = 'Package deleted' }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = 'Package not found' }
                }
                continue
            }

            # 3. GET /api/bookings
            if ($path -eq '/api/bookings' -and $method -eq 'GET') {
                $raw = Read-RawJsonFile 'bookings.json' '[]'
                Send-JsonResponseString $res 200 ('{"success":true,"data":' + $raw + '}')
                continue
            }

            # 4. POST /api/bookings
            if ($path -eq '/api/bookings' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $bookingsList = Get-BookingsList

                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $todayStr = (Get-Date).ToString('yyyyMMdd')
                $randCode = Get-Random -Minimum 100 -Maximum 999
                $newId = "BK-$todayStr-$randCode"

                $adults = 1
                $rawAdults = Get-ObjectProp $body 'adults' 1
                if ($rawAdults) { [int]::TryParse($rawAdults.ToString(), [ref]$adults) | Out-Null }

                $children = 0
                $rawChildren = Get-ObjectProp $body 'children' 0
                if ($rawChildren) { [int]::TryParse($rawChildren.ToString(), [ref]$children) | Out-Null }

                $totalPrice = 0
                $rawPrice = Get-ObjectProp $body 'totalPrice' 0
                if ($rawPrice) { [long]::TryParse($rawPrice.ToString(), [ref]$totalPrice) | Out-Null }

                $newBooking = [ordered]@{
                    id = $newId
                    packageId = Get-ObjectProp $body 'packageId' ''
                    packageTitle = Get-ObjectProp $body 'packageTitle' $STR_DEFAULT_PKG
                    departureDate = Get-ObjectProp $body 'departureDate' ((Get-Date).ToString('yyyy-MM-dd'))
                    travelerName = Get-ObjectProp $body 'travelerName' ''
                    phone = Get-ObjectProp $body 'phone' ''
                    email = Get-ObjectProp $body 'email' ''
                    adults = $adults
                    children = $children
                    totalPrice = $totalPrice
                    options = Get-ObjectProp $body 'options' @{}
                    requests = Get-ObjectProp $body 'requests' ''
                    paymentMethod = Get-ObjectProp $body 'paymentMethod' $STR_PAY_CONSULT
                    status = Get-ObjectProp $body 'status' $STR_RECEIVED
                    createdAt = (Get-Date).ToString('s')
                }

                $combined = @($newBooking) + $bookingsList
                $newJson = Convert-ToJsonArray $combined
                Write-RawJsonFile 'bookings.json' $newJson | Out-Null

                Send-JsonObjectResponse $res 201 @{
                    success = $true
                    message = 'Booking created'
                    data = $newBooking
                }
                continue
            }

            # 5. PATCH /api/bookings/:id
            if ($path.StartsWith('/api/bookings/') -and $method -eq 'PATCH') {
                $id = $path.Substring('/api/bookings/'.Length)
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $bookingsList = Get-BookingsList
                $found = $null
                $newStatus = Get-ObjectProp $body 'status' ''
                foreach ($b in $bookingsList) {
                    if ($b.id -eq $id) {
                        if ($null -ne $newStatus -and "$newStatus" -ne '') {
                            $b | Add-Member -NotePropertyName 'status' -NotePropertyValue $newStatus -Force
                        }
                        $found = $b
                        break
                    }
                }

                if ($found) {
                    $newJson = Convert-ToJsonArray $bookingsList
                    Write-RawJsonFile 'bookings.json' $newJson | Out-Null
                    Send-JsonObjectResponse $res 200 @{ success = $true; data = $found }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = 'Booking not found' }
                }
                continue
            }

            # 6. GET /api/inquiries
            if ($path -eq '/api/inquiries' -and $method -eq 'GET') {
                $raw = Read-RawJsonFile 'inquiries.json' '[]'
                Send-JsonResponseString $res 200 ('{"success":true,"data":' + $raw + '}')
                continue
            }

            # 7. POST /api/inquiries
            if ($path -eq '/api/inquiries' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $inquiriesList = Get-InquiriesList

                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $todayStr = (Get-Date).ToString('yyyyMMdd')
                $randCode = Get-Random -Minimum 100 -Maximum 999
                $newId = "INQ-$todayStr-$randCode"

                $gSize = 1
                $rawGSize = Get-ObjectProp $body 'groupSize' 1
                if ($rawGSize) { [int]::TryParse($rawGSize.ToString(), [ref]$gSize) | Out-Null }

                $newInquiry = [ordered]@{
                    id = $newId
                    name = Get-ObjectProp $body 'name' ''
                    phone = Get-ObjectProp $body 'phone' ''
                    email = Get-ObjectProp $body 'email' ''
                    category = Get-ObjectProp $body 'category' 'Consulting'
                    destination = Get-ObjectProp $body 'destination' 'TBD'
                    expectedDate = Get-ObjectProp $body 'expectedDate' 'TBD'
                    groupSize = $gSize
                    message = Get-ObjectProp $body 'message' ''
                    status = Get-ObjectProp $body 'status' $STR_INQ_WAIT
                    createdAt = (Get-Date).ToString('s')
                    replies = @()
                }

                $combined = @($newInquiry) + $inquiriesList
                $newJson = Convert-ToJsonArray $combined
                Write-RawJsonFile 'inquiries.json' $newJson | Out-Null

                Send-JsonObjectResponse $res 201 @{
                    success = $true
                    message = 'Inquiry created'
                    data = $newInquiry
                }
                continue
            }

            # 8. PATCH /api/inquiries/:id
            if ($path.StartsWith('/api/inquiries/') -and $method -eq 'PATCH') {
                $id = $path.Substring('/api/inquiries/'.Length)
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $inquiriesList = Get-InquiriesList
                $found = $null
                $newStatus = Get-ObjectProp $body 'status' ''
                $newReply = Get-ObjectProp $body 'reply' $null
                $allReplies = Get-ObjectProp $body 'replies' $null
                $emailSent = $false
                $emailError = ''
                $emailMessage = ''
                $customerEmail = ''
                $customerName = ''

                foreach ($i in $inquiriesList) {
                    if ($i.id -eq $id) {
                        $customerEmail = Get-ObjectProp $i 'email' ''
                        $customerName = Get-ObjectProp $i 'name' '고객'

                        if ($null -ne $newStatus -and "$newStatus" -ne '') {
                            $i | Add-Member -NotePropertyName 'status' -NotePropertyValue $newStatus -Force
                        }
                        if ($null -ne $newReply) {
                            $curReplies = @()
                            $rawReplies = Get-ObjectProp $i 'replies' $null
                            if ($null -ne $rawReplies) { $curReplies = @($rawReplies) }

                            $shouldSendEmail = $true
                            $reqSendEmail = Get-ObjectProp $newReply 'emailSent' $true
                            if ($reqSendEmail -eq $false -or (Get-ObjectProp $body 'sendEmail' $true) -eq $false) {
                                $shouldSendEmail = $false
                            }

                            $targetRecipient = Get-ObjectProp $newReply 'recipientEmail' $customerEmail
                            if ([string]::IsNullOrWhiteSpace($targetRecipient)) { $targetRecipient = $customerEmail }

                            if ($shouldSendEmail -and (-not [string]::IsNullOrWhiteSpace($targetRecipient))) {
                                $dest = Get-ObjectProp $i 'destination' '맞춤 여행'
                                $mailSubject = "[투어이지] $dest 맞춤 여행 상담 및 견적 안내드립니다 ($customerName 고객님)"
                                $mailText = Get-ObjectProp $newReply 'content' ''
                                $mailHtml = Generate-InquiryEmailHtml $i $newReply

                                $sendRes = Send-RealSmtpEmail $targetRecipient $customerName $mailSubject $mailText $mailHtml
                                if ($sendRes.success) {
                                    $emailSent = $true
                                    $emailMessage = $sendRes.message
                                    $newReply | Add-Member -NotePropertyName 'emailSent' -NotePropertyValue $true -Force
                                    $newReply | Add-Member -NotePropertyName 'emailStatus' -NotePropertyValue 'SUCCESS' -Force
                                    $newReply | Add-Member -NotePropertyName 'sentAt' -NotePropertyValue ((Get-Date).ToString('s')) -Force
                                } else {
                                    $emailSent = $false
                                    $emailError = $sendRes.error
                                    $newReply | Add-Member -NotePropertyName 'emailSent' -NotePropertyValue $false -Force
                                    $newReply | Add-Member -NotePropertyName 'emailStatus' -NotePropertyValue 'FAILED' -Force
                                    $newReply | Add-Member -NotePropertyName 'emailError' -NotePropertyValue $emailError -Force
                                }
                            } else {
                                $newReply | Add-Member -NotePropertyName 'emailSent' -NotePropertyValue $false -Force
                                $newReply | Add-Member -NotePropertyName 'emailStatus' -NotePropertyValue 'NOT_REQUESTED' -Force
                            }

                            $updatedReplies = @($curReplies) + $newReply
                            $i | Add-Member -NotePropertyName 'replies' -NotePropertyValue $updatedReplies -Force
                        }
                        if ($null -ne $allReplies) {
                            $i | Add-Member -NotePropertyName 'replies' -NotePropertyValue $allReplies -Force
                        }
                        $found = $i
                        break
                    }
                }

                if ($found) {
                    $newJson = Convert-ToJsonArray $inquiriesList
                    Write-RawJsonFile 'inquiries.json' $newJson | Out-Null
                    $retMsg = if ($emailSent) { "답변이 등록되었으며, [$customerEmail] 고객님께 실제 이메일이 발송되었습니다." } else { if ($emailError) { "답변은 등록되었으나, 이메일 발송에 실패했습니다: $emailError" } else { "답변이 등록되었습니다." } }
                    Send-JsonObjectResponse $res 200 @{ 
                        success = $true
                        message = $retMsg
                        emailSent = $emailSent
                        emailError = $emailError
                        emailMessage = $emailMessage
                        recipientEmail = $customerEmail
                        data = $found 
                    }
                } else {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = 'Inquiry not found' }
                }
                continue
            }

            # 8-1. POST /api/inquiries/:id/send-email
            if ($path.StartsWith('/api/inquiries/') -and $path.EndsWith('/send-email') -and $method -eq 'POST') {
                $id = $path.Substring('/api/inquiries/'.Length)
                $id = $id.Substring(0, $id.Length - '/send-email'.Length)
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $inquiriesList = Get-InquiriesList
                $found = $null
                foreach ($i in $inquiriesList) {
                    if ($i.id -eq $id) { $found = $i; break }
                }

                if (-not $found) {
                    Send-JsonObjectResponse $res 404 @{ success = $false; message = 'Inquiry not found' }
                    continue
                }

                $customerEmail = Get-ObjectProp $body 'recipientEmail' (Get-ObjectProp $found 'email' '')
                $customerName = Get-ObjectProp $found 'name' '고객'
                $dest = Get-ObjectProp $found 'destination' '맞춤 여행'
                $content = Get-ObjectProp $body 'content' ''

                if ([string]::IsNullOrWhiteSpace($customerEmail)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '고객 이메일 주소가 없습니다.' }
                    continue
                }

                $dummyReply = [ordered]@{
                    adminName = Get-ObjectProp $body 'adminName' '김투어 수석 여행플래너'
                    quotedPrice = Get-ObjectProp $body 'quotedPrice' ''
                    recommendedPackageTitle = Get-ObjectProp $body 'recommendedPackageTitle' ''
                    content = $content
                }

                $mailSubject = Get-ObjectProp $body 'subject' "[투어이지] $dest 맞춤 여행 상담 및 견적 안내드립니다 ($customerName 고객님)"
                $mailHtml = Generate-InquiryEmailHtml $found $dummyReply

                $sendRes = Send-RealSmtpEmail $customerEmail $customerName $mailSubject $content $mailHtml
                if ($sendRes.success) {
                    Send-JsonObjectResponse $res 200 @{ 
                        success = $true
                        message = "[$customerEmail] 고객님께 이메일이 실제 발송되었습니다."
                        recipientEmail = $customerEmail 
                    }
                } else {
                    Send-JsonObjectResponse $res 400 @{ 
                        success = $false
                        message = ('이메일 발송 실패: ' + $sendRes.error)
                        error = $sendRes.error
                        needsConfig = (Get-ObjectProp $sendRes 'needsConfig' $false)
                    }
                }
                continue
            }

            # 8-2. GET /api/smtp-config
            if ($path -eq '/api/smtp-config' -and $method -eq 'GET') {
                $cfg = Get-SmtpConfig
                $hasPwd = -not [string]::IsNullOrWhiteSpace((Get-ObjectProp $cfg 'password' ''))
                $safeCfg = [ordered]@{
                    enabled = Get-ObjectProp $cfg 'enabled' $false
                    provider = Get-ObjectProp $cfg 'provider' 'naver'
                    host = Get-ObjectProp $cfg 'host' 'smtp.naver.com'
                    port = Get-ObjectProp $cfg 'port' 587
                    enableSsl = Get-ObjectProp $cfg 'enableSsl' $true
                    user = Get-ObjectProp $cfg 'user' ''
                    fromEmail = Get-ObjectProp $cfg 'fromEmail' ''
                    fromName = Get-ObjectProp $cfg 'fromName' '투어이지(TourEasy) 맞춤여행팀'
                    hasPassword = $hasPwd
                    isConfigured = ($hasPwd -and (-not [string]::IsNullOrWhiteSpace((Get-ObjectProp $cfg 'user' ''))))
                }
                Send-JsonObjectResponse $res 200 @{ success = $true; data = $safeCfg }
                continue
            }

            # 8-3. POST /api/smtp-config
            if ($path -eq '/api/smtp-config' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $existing = Get-SmtpConfig
                $newPwd = Get-ObjectProp $body 'password' ''
                if ([string]::IsNullOrWhiteSpace($newPwd) -or $newPwd -eq '******') {
                    $newPwd = Get-ObjectProp $existing 'password' ''
                }

                $rawU = (Get-ObjectProp $body 'user' '').Trim()
                $rawF = (Get-ObjectProp $body 'fromEmail' '').Trim()
                $h = Get-ObjectProp $body 'host' 'smtp.naver.com'
                if ($rawU.Contains('/')) {
                    $parts = $rawU.Split('/')
                    foreach ($p in $parts) {
                        $pt = $p.Trim()
                        if ($pt.Contains('@') -and $pt.Contains('.')) {
                            if ([string]::IsNullOrWhiteSpace($rawF)) { $rawF = $pt }
                        } elseif (-not [string]::IsNullOrWhiteSpace($pt)) {
                            $rawU = $pt
                        }
                    }
                }
                if ([string]::IsNullOrWhiteSpace($rawF)) {
                    if ($rawU.Contains('@')) { $rawF = $rawU }
                    elseif ($h.ToLower().Contains('naver')) { $rawF = "$rawU@naver.com" }
                }

                $newCfg = [ordered]@{
                    enabled = Get-ObjectProp $body 'enabled' $true
                    provider = Get-ObjectProp $body 'provider' 'naver'
                    host = $h
                    port = Get-ObjectProp $body 'port' 587
                    enableSsl = Get-ObjectProp $body 'enableSsl' $true
                    user = $rawU
                    password = $newPwd
                    fromEmail = $rawF
                    fromName = Get-ObjectProp $body 'fromName' '투어이지(TourEasy) 맞춤여행팀'
                    updatedAt = (Get-Date).ToString('s')
                }

                $savedJson = $newCfg | ConvertTo-Json -Depth 5
                Write-RawJsonFile 'smtp_config.json' $savedJson | Out-Null

                Send-JsonObjectResponse $res 200 @{ 
                    success = $true
                    message = 'SMTP 발송 설정이 안전하게 저장되었습니다.'
                    isConfigured = (-not [string]::IsNullOrWhiteSpace($newPwd) -and (-not [string]::IsNullOrWhiteSpace($newCfg.user)))
                }
                continue
            }

            # 8-4. POST /api/smtp-test
            if ($path -eq '/api/smtp-test' -and $method -eq 'POST') {
                $bodyStr = Read-RequestBodyString $req
                $body = @{}
                try { $body = ConvertFrom-Json $bodyStr } catch {}

                $targetEmail = Get-ObjectProp $body 'recipientEmail' 'kks@do-best.co.kr'
                if ([string]::IsNullOrWhiteSpace($targetEmail)) {
                    Send-JsonObjectResponse $res 400 @{ success = $false; message = '테스트 수신자 이메일 주소를 입력해주세요.' }
                    continue
                }

                $testCfg = $null
                if (Get-ObjectProp $body 'host' $null) {
                    $existing = Get-SmtpConfig
                    $pwd = Get-ObjectProp $body 'password' ''
                    if ([string]::IsNullOrWhiteSpace($pwd) -or $pwd -eq '******') {
                        $pwd = Get-ObjectProp $existing 'password' ''
                    }
                    $testCfg = [ordered]@{
                        host = Get-ObjectProp $body 'host' ''
                        port = Get-ObjectProp $body 'port' 587
                        enableSsl = Get-ObjectProp $body 'enableSsl' $true
                        user = Get-ObjectProp $body 'user' ''
                        password = $pwd
                        fromEmail = Get-ObjectProp $body 'fromEmail' ''
                        fromName = Get-ObjectProp $body 'fromName' '투어이지(TourEasy)'
                    }
                }

                $testSubject = '[투어이지] SMTP 이메일 발송 연동 테스트 성공 안내'
                $testText = '투어이지(TourEasy) 관리자 시스템에서 발송된 SMTP 연동 테스트 메일입니다. 본 메일이 정상 수신되었다면 고객 맞춤 견적 및 상담 답변 메일이 정상적으로 발송됩니다.'
                $dummyInq = @{ name = '관리자/테스트 수신자'; destination = 'SMTP 연동 테스트'; expectedDate = '즉시'; groupSize = 1 }
                $dummyReply = @{ adminName = '투어이지 시스템 관리자'; quotedPrice = '테스트 연동 정상'; recommendedPackageTitle = '투어이지 전용 안심 메일 서비스'; content = $testText }
                $testHtml = Generate-InquiryEmailHtml $dummyInq $dummyReply

                $sendRes = Send-RealSmtpEmail $targetEmail '테스트 수신자' $testSubject $testText $testHtml $testCfg
                if ($sendRes.success) {
                    Send-JsonObjectResponse $res 200 @{ 
                        success = $true
                        message = "[$targetEmail]로 테스트 메일이 성공적으로 발송되었습니다! 메일함을 확인해주세요." 
                    }
                } else {
                    Send-JsonObjectResponse $res 400 @{ 
                        success = $false
                        message = ('테스트 발송 실패: ' + $sendRes.error)
                        error = $sendRes.error
                        needsConfig = (Get-ObjectProp $sendRes 'needsConfig' $false)
                    }
                }
                continue
            }

            # 9. GET /api/stats
            if ($path -eq '/api/stats' -and $method -eq 'GET') {
                $bookings = Get-BookingsList
                $inquiries = Get-InquiriesList
                $packages = Get-PackagesList

                $totalPkgs = $packages.Count
                if ($totalPkgs -eq 0) { $totalPkgs = 75 }
                $activePkgs = 0
                $inactivePkgs = 0
                foreach ($p in $packages) {
                    $st = Get-ObjectProp $p 'status' $STR_OPERATING
                    $act = Get-ObjectProp $p 'isActive' $true
                    if ($st -eq $STR_NON_OPERATING -or $st -eq 'INACTIVE' -or $act -eq $false) {
                        $inactivePkgs++
                    } else {
                        $activePkgs++
                    }
                }
                if ($activePkgs -eq 0 -and $inactivePkgs -eq 0) {
                    $activePkgs = $totalPkgs
                }

                $totalRev = 0
                foreach ($b in $bookings) {
                    $tp = Get-ObjectProp $b 'totalPrice' 0
                    if ($tp) {
                        $parsedPrice = 0
                        if ([long]::TryParse($tp.ToString(), [ref]$parsedPrice)) {
                            $totalRev += $parsedPrice
                        }
                    }
                }

                $pendingB = 0
                foreach ($b in $bookings) {
                    $st = Get-ObjectProp $b 'status' ''
                    if ($st -eq $STR_RECEIVED -or $st -eq $STR_CONSULT_BK -or $st -eq "RECEIVED") {
                        $pendingB++
                    }
                }

                $pendingI = 0
                foreach ($i in $inquiries) {
                    $st = Get-ObjectProp $i 'status' ''
                    if ($st -eq $STR_INQ_WAIT -or $st -eq $STR_CONSULT_INQ -or $st -eq "RECEIVED") {
                        $pendingI++
                    }
                }

                $stats = @{
                    success = $true
                    data = @{
                        packageCount = $totalPkgs
                        activePackageCount = $activePkgs
                        inactivePackageCount = $inactivePkgs
                        bookingCount = $bookings.Count
                        pendingBookings = $pendingB
                        inquiryCount = $inquiries.Count
                        pendingInquiries = $pendingI
                        totalRevenue = $totalRev
                    }
                }
                Send-JsonObjectResponse $res 200 $stats
                continue
            }
        }

        # Static File Serving
        $reqPath = $path
        if ($reqPath -eq '/' -or $reqPath -eq '') {
            $reqPath = '/index.html'
        }

        $cleanRel = $reqPath.TrimStart('/').Replace('/', '\')
        $localPath = Join-Path $publicDir $cleanRel
        if (-not (Test-Path $localPath -PathType Leaf)) {
            if (Test-Path "$localPath.html" -PathType Leaf) {
                $localPath = "$localPath.html"
            }
        }

        if (Test-Path $localPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
            $ct = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
            $res.ContentType = $ct
            $res.StatusCode = 200
            $res.AddHeader('Cache-Control', 'no-cache')
            $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
            $res.ContentLength64 = $fileBytes.Length
            $res.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
            $res.OutputStream.Close()
        } else {
            $res.StatusCode = 404
            $res.ContentType = 'text/html; charset=utf-8'
            $msg = [System.Text.Encoding]::UTF8.GetBytes('<h1>404 Not Found</h1><p><a href="/">Home</a></p>')
            $res.ContentLength64 = $msg.Length
            $res.OutputStream.Write($msg, 0, $msg.Length)
            $res.OutputStream.Close()
        }
    } catch {
        Write-Host "Server loop error: $_"
    }
}
