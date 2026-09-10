$ErrorActionPreference = 'Stop'
$targetFile = 'd:\92.SW\shop\server.ps1'

$code = @'
$ErrorActionPreference = 'Continue'
$port = 4000
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

$STR_PAID = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEA,0xB2,0xB0,0xEC,0xA0,0x9C,0xEC,0x99,0x84,0xEB,0xA3,0x8C))
$STR_INQ_WAIT = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0x8B,0xB5,0xEB,0xB3,0x80,0xEB,0x8C,0x80,0xEA,0xB8,0xB0))
$STR_INQ_DONE = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0x8B,0xB5,0xEB,0xB3,0x80,0xEC,0x99,0x84,0xEB,0xA3,0x8C))

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

function Send-JsonObjectResponse($response, $statusCode, $jsonString) {
    try {
        $response.StatusCode = $statusCode
        $response.ContentType = 'application/json; charset=utf-8'
        $response.AddHeader('Access-Control-Allow-Origin', '*')
        $response.AddHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        $response.AddHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonString)
        $response.ContentLength64 = $bytes.Length
        $response.OutputStream.Write($bytes, 0, $bytes.Length)
        $response.OutputStream.Close()
    } catch {}
}

$listener = New-Object System.Net.HttpListener
$prefixLocal = 'http://localhost:4000/'
$prefixIp = 'http://127.0.0.1:4000/'

try {
    $listener.Prefixes.Add($prefixLocal)
    $listener.Prefixes.Add($prefixIp)
    $listener.Start()
    Write-Host '===================================================' -ForegroundColor Cyan
    Write-Host '  [EASYSHOP] Web & REST API Server Started!' -ForegroundColor Green
    Write-Host '  Local URL: http://localhost:4000' -ForegroundColor Yellow
    Write-Host '  Admin URL: http://localhost:4000/admin.html' -ForegroundColor Yellow
    Write-Host '===================================================' -ForegroundColor Cyan
} catch {
    Write-Host ('Error starting server on port 4000: ' + $_) -ForegroundColor Red
    exit 1
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $httpMethod = $req.HttpMethod
        $path = $req.Url.AbsolutePath

        if ($httpMethod -eq 'OPTIONS') {
            $res.StatusCode = 200
            $res.AddHeader('Access-Control-Allow-Origin', '*')
            $res.AddHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            $res.AddHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            $res.OutputStream.Close()
            continue
        }

        if ($path -eq '/api/categories') {
            $raw = Read-RawJsonFile 'categories.json' '[]'
            Send-JsonObjectResponse $res 200 $raw
            continue
        }

        if ($path -eq '/api/products') {
            $raw = Read-RawJsonFile 'products.json' '[]'
            
            if ($httpMethod -eq 'GET') {
                $queryId = $req.QueryString['id']
                if ($queryId) {
                    $items = ConvertFrom-Json $raw
                    $target = $items | Where-Object { $_.id -eq $queryId } | Select-Object -First 1
                    if ($target) {
                        Send-JsonObjectResponse $res 200 ($target | ConvertTo-Json -Depth 10)
                    } else {
                        Send-JsonObjectResponse $res 404 '{"error":"Not Found"}'
                    }
                } else {
                    Send-JsonObjectResponse $res 200 $raw
                }
                continue
            }

            if ($httpMethod -eq 'POST') {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $newProd = ConvertFrom-Json $body
                $items = @(ConvertFrom-Json $raw)
                $items = @($newProd) + $items
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'products.json' $newJson
                Send-JsonObjectResponse $res 201 '{"success":true}'
                continue
            }

            if ($httpMethod -eq 'PUT') {
                $queryId = $req.QueryString['id']
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $updatedData = ConvertFrom-Json $body
                $items = @(ConvertFrom-Json $raw)
                for ($i = 0; $i -lt $items.Count; $i++) {
                    if ($items[$i].id -eq $queryId -or $items[$i].id -eq $updatedData.id) {
                        $items[$i] = $updatedData
                        break
                    }
                }
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'products.json' $newJson
                Send-JsonObjectResponse $res 200 '{"success":true}'
                continue
            }

            if ($httpMethod -eq 'DELETE') {
                $queryId = $req.QueryString['id']
                $items = @(ConvertFrom-Json $raw)
                $items = $items | Where-Object { $_.id -ne $queryId }
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'products.json' $newJson
                Send-JsonObjectResponse $res 200 '{"success":true}'
                continue
            }
        }

        if ($path -eq '/api/orders') {
            $raw = Read-RawJsonFile 'orders.json' '[]'

            if ($httpMethod -eq 'GET') {
                $queryId = $req.QueryString['orderId']
                if ($queryId) {
                    $items = ConvertFrom-Json $raw
                    $target = $items | Where-Object { $_.orderId -eq $queryId } | Select-Object -First 1
                    if ($target) {
                        Send-JsonObjectResponse $res 200 ($target | ConvertTo-Json -Depth 10)
                    } else {
                        Send-JsonObjectResponse $res 404 '{"error":"Not Found"}'
                    }
                } else {
                    Send-JsonObjectResponse $res 200 $raw
                }
                continue
            }

            if ($httpMethod -eq 'POST') {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $orderData = ConvertFrom-Json $body
                $orderId = 'ORD-' + (Get-Date -Format 'yyyyMMdd') + '-' + (Get-Random -Minimum 1000 -Maximum 9999)
                $orderData | Add-Member -NotePropertyName 'orderId' -NotePropertyValue $orderId -Force
                $orderData | Add-Member -NotePropertyName 'orderDate' -NotePropertyValue (Get-Date -Format 'yyyy-MM-dd HH:mm:ss') -Force
                $orderData | Add-Member -NotePropertyName 'status' -NotePropertyValue $STR_PAID -Force
                $orderData | Add-Member -NotePropertyName 'trackingNumber' -NotePropertyValue '' -Force

                $items = @(ConvertFrom-Json $raw)
                $items = @($orderData) + $items
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'orders.json' $newJson
                Send-JsonObjectResponse $res 201 ($orderData | ConvertTo-Json -Depth 10)
                continue
            }

            if ($httpMethod -eq 'PUT') {
                $queryId = $req.QueryString['orderId']
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $updateObj = ConvertFrom-Json $body
                $items = @(ConvertFrom-Json $raw)
                foreach ($o in $items) {
                    if ($o.orderId -eq $queryId) {
                        if ($updateObj.status) { $o.status = $updateObj.status }
                        if ($updateObj.trackingNumber) { $o.trackingNumber = $updateObj.trackingNumber }
                        break
                    }
                }
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'orders.json' $newJson
                Send-JsonObjectResponse $res 200 '{"success":true}'
                continue
            }
        }

        if ($path -eq '/api/inquiries') {
            $raw = Read-RawJsonFile 'inquiries.json' '[]'
            if ($httpMethod -eq 'GET') {
                Send-JsonObjectResponse $res 200 $raw
                continue
            }
            if ($httpMethod -eq 'POST') {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $inqData = ConvertFrom-Json $body
                $inqId = 'inq-' + (Get-Date -Format 'yyyyMMddHHmmss')
                $inqData | Add-Member -NotePropertyName 'id' -NotePropertyValue $inqId -Force
                $inqData | Add-Member -NotePropertyName 'createdAt' -NotePropertyValue (Get-Date -Format 'yyyy-MM-dd HH:mm') -Force
                $inqData | Add-Member -NotePropertyName 'status' -NotePropertyValue $STR_INQ_WAIT -Force
                $items = @(ConvertFrom-Json $raw)
                $items = @($inqData) + $items
                Write-RawJsonFile 'inquiries.json' ($items | ConvertTo-Json -Depth 10)
                Send-JsonObjectResponse $res 201 '{"success":true}'
                continue
            }
            if ($httpMethod -eq 'PUT') {
                $queryId = $req.QueryString['id']
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $ansData = ConvertFrom-Json $body
                $items = @(ConvertFrom-Json $raw)
                foreach ($inq in $items) {
                    if ($inq.id -eq $queryId) {
                        $inq.answer = $ansData.answer
                        $inq.status = $STR_INQ_DONE
                        $inq.answeredAt = (Get-Date -Format 'yyyy-MM-dd HH:mm')
                        break
                    }
                }
                Write-RawJsonFile 'inquiries.json' ($items | ConvertTo-Json -Depth 10)
                Send-JsonObjectResponse $res 200 '{"success":true}'
                continue
            }
        }

        if ($path -eq '/api/stats') {
            $orders = ConvertFrom-Json (Read-RawJsonFile 'orders.json' '[]')
            $products = ConvertFrom-Json (Read-RawJsonFile 'products.json' '[]')
            $totalSales = 0
            foreach ($o in $orders) {
                if ($o.totalAmount) { $totalSales += [int]$o.totalAmount }
            }
            $statsObj = @{
                totalSales = $totalSales
                orderCount = $orders.Count
                productCount = $products.Count
            }
            Send-JsonObjectResponse $res 200 ($statsObj | ConvertTo-Json)
            continue
        }

        # Static File Serving
        $reqPath = $path
        if ($reqPath -eq '/' -or $reqPath -eq '') {
            $reqPath = '/index.html'
        }

        $cleanRel = $reqPath.TrimStart('/').Replace('/', '\')
        $localPath = Join-Path $publicDir $cleanRel
        if (-not (Test-Path $localPath -PathType Leaf)) {
            if (Test-Path ($localPath + '.html') -PathType Leaf) {
                $localPath = $localPath + '.html'
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
            $msg = [System.Text.Encoding]::UTF8.GetBytes('<h1>404 Not Found</h1><p><a href="/">EASYSHOP Home</a></p>')
            $res.ContentLength64 = $msg.Length
            $res.OutputStream.Write($msg, 0, $msg.Length)
            $res.OutputStream.Close()
        }
    } catch {
        Write-Host ('Server loop exception: ' + $_)
    }
}
'@

[System.IO.File]::WriteAllText($targetFile, $code, [System.Text.Encoding]::ASCII)
Write-Host "Wrote fixed pure ASCII server.ps1" -ForegroundColor Green
