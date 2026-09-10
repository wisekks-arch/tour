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
$STR_PREPARING = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEC,0x83,0x81,0xED,0x92,0x88,0xEC,0xA4,0x80,0xEB,0xB9,0x84))
$STR_SHIPPING = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0xB0,0xB0,0xEC,0x86,0xA1,0xEC,0xA4,0x91))
$STR_DELIVERED = [System.Text.Encoding]::UTF8.GetString([byte[]]@(0xEB,0xB0,0xB0,0xEC,0x86,0xA1,0xEC,0x99,0x84,0xEB,0xA3,0x8C))
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

function Send-JsonResponse($response, $statusCode, $jsonContent, $isHead = $false) {
    try {
        $response.StatusCode = $statusCode
        $response.ContentType = 'application/json; charset=utf-8'
        $response.AddHeader('Access-Control-Allow-Origin', '*')
        $response.AddHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        $response.AddHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        $response.AddHeader('Cache-Control', 'no-cache, no-store, must-revalidate')

        $jsonStr = ''
        if ($jsonContent -is [string]) {
            $jsonStr = $jsonContent
        } elseif ($jsonContent -is [System.Array] -and $jsonContent.Count -gt 0 -and $jsonContent[0] -is [string]) {
            $jsonStr = $jsonContent -join "`r`n"
        } elseif ($null -ne $jsonContent) {
            $jsonStr = ($jsonContent | ConvertTo-Json -Depth 10 -Compress)
        } else {
            $jsonStr = '{}'
        }

        $bytes = [System.Text.Encoding]::UTF8.GetBytes($jsonStr)
        $response.ContentLength64 = $bytes.Length
        if (-not $isHead) {
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
    } catch {
        Write-Host "Send-JsonResponse error: $_"
    } finally {
        try { $response.OutputStream.Close() } catch {}
    }
}

function Send-HtmlResponse($response, $statusCode, $htmlString, $isHead = $false) {
    try {
        $response.StatusCode = $statusCode
        $response.ContentType = 'text/html; charset=utf-8'
        $response.AddHeader('Access-Control-Allow-Origin', '*')
        $bytes = [System.Text.Encoding]::UTF8.GetBytes($htmlString)
        $response.ContentLength64 = $bytes.Length
        if (-not $isHead) {
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        }
    } catch {
        Write-Host "Send-HtmlResponse error: $_"
    } finally {
        try { $response.OutputStream.Close() } catch {}
    }
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
    Write-Host '  Storefront: http://localhost:4000/' -ForegroundColor Yellow
    Write-Host '  Admin Panel: http://localhost:4000/admin.html' -ForegroundColor Yellow
    Write-Host '===================================================' -ForegroundColor Cyan
} catch {
    Write-Host "Error starting server on port 4000: $_" -ForegroundColor Red
    exit 1
}

while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $req = $context.Request
        $res = $context.Response
        $httpMethod = $req.HttpMethod
        $rawPath = $req.Url.AbsolutePath
        $isHead = ($httpMethod -eq 'HEAD')

        if ($httpMethod -eq 'OPTIONS') {
            $res.StatusCode = 200
            $res.AddHeader('Access-Control-Allow-Origin', '*')
            $res.AddHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
            $res.AddHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
            $res.OutputStream.Close()
            continue
        }

        # -------------------------------------------------------------
        # 1. API: Categories
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/categories') {
            $raw = Read-RawJsonFile 'categories.json' '[]'
            Send-JsonResponse $res 200 $raw $isHead
            continue
        }

        # -------------------------------------------------------------
        # 2. API: Products (CRUD)
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/products') {
            $raw = Read-RawJsonFile 'products.json' '[]'

            if ($httpMethod -eq 'GET' -or $httpMethod -eq 'HEAD') {
                $queryId = $req.QueryString['id']
                if ($queryId) {
                    $items = ConvertFrom-Json $raw
                    $target = $items | Where-Object { $_.id -eq $queryId } | Select-Object -First 1
                    if ($target) {
                        Send-JsonResponse $res 200 ($target | ConvertTo-Json -Depth 10 -Compress) $isHead
                    } else {
                        Send-JsonResponse $res 404 '{"error":"Product Not Found"}' $isHead
                    }
                } else {
                    Send-JsonResponse $res 200 $raw $isHead
                }
                continue
            }

            if ($httpMethod -eq 'POST') {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $newProd = ConvertFrom-Json $body
                if (-not $newProd.id) {
                    $newProd | Add-Member -NotePropertyName 'id' -NotePropertyValue ('prod-' + (Get-Random -Minimum 100 -Maximum 999)) -Force
                }
                $items = @(ConvertFrom-Json $raw)
                $items = @($newProd) + $items
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'products.json' $newJson
                Send-JsonResponse $res 201 '{"success":true,"message":"Product created successfully"}' $isHead
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
                Send-JsonResponse $res 200 '{"success":true,"message":"Product updated successfully"}' $isHead
                continue
            }

            if ($httpMethod -eq 'DELETE') {
                $queryId = $req.QueryString['id']
                $items = @(ConvertFrom-Json $raw)
                $items = $items | Where-Object { $_.id -ne $queryId }
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'products.json' $newJson
                Send-JsonResponse $res 200 '{"success":true,"message":"Product deleted successfully"}' $isHead
                continue
            }
        }

        # -------------------------------------------------------------
        # 3. API: Orders
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/orders') {
            $raw = Read-RawJsonFile 'orders.json' '[]'

            if ($httpMethod -eq 'GET' -or $httpMethod -eq 'HEAD') {
                $queryId = $req.QueryString['orderId']
                if ($queryId) {
                    $items = ConvertFrom-Json $raw
                    $target = $items | Where-Object { $_.orderId -eq $queryId } | Select-Object -First 1
                    if ($target) {
                        Send-JsonResponse $res 200 ($target | ConvertTo-Json -Depth 10 -Compress) $isHead
                    } else {
                        Send-JsonResponse $res 404 '{"error":"Order Not Found"}' $isHead
                    }
                } else {
                    Send-JsonResponse $res 200 $raw $isHead
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
                if (-not $orderData.trackingNumber) {
                    $orderData | Add-Member -NotePropertyName 'trackingNumber' -NotePropertyValue '' -Force
                }

                $items = @(ConvertFrom-Json $raw)
                $items = @($orderData) + $items
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'orders.json' $newJson
                Send-JsonResponse $res 201 ($orderData | ConvertTo-Json -Depth 10 -Compress) $isHead
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
                        if ($null -ne $updateObj.trackingNumber) { $o.trackingNumber = $updateObj.trackingNumber }
                        break
                    }
                }
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'orders.json' $newJson
                Send-JsonResponse $res 200 '{"success":true,"message":"Order updated successfully"}' $isHead
                continue
            }
        }

        # -------------------------------------------------------------
        # 4. API: Inquiries / Q&A
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/inquiries') {
            $raw = Read-RawJsonFile 'inquiries.json' '[]'

            if ($httpMethod -eq 'GET' -or $httpMethod -eq 'HEAD') {
                Send-JsonResponse $res 200 $raw $isHead
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
                Send-JsonResponse $res 201 '{"success":true,"message":"Inquiry submitted"}' $isHead
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
                Send-JsonResponse $res 200 '{"success":true,"message":"Answer saved"}' $isHead
                continue
            }
        }

        # -------------------------------------------------------------
        # 5. API: Dashboard Stats
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/stats') {
            $orders = @()
            try {
                $rawOrders = Read-RawJsonFile 'orders.json' '[]'
                $parsedO = ConvertFrom-Json $rawOrders
                if ($parsedO) { $orders = @($parsedO) }
            } catch {}

            $products = @()
            try {
                $rawProds = Read-RawJsonFile 'products.json' '[]'
                $parsedP = ConvertFrom-Json $rawProds
                if ($parsedP) { $products = @($parsedP) }
            } catch {}

            $inquiries = @()
            try {
                $rawInqs = Read-RawJsonFile 'inquiries.json' '[]'
                $parsedI = ConvertFrom-Json $rawInqs
                if ($parsedI) { $inquiries = @($parsedI) }
            } catch {}
            
            $totalSales = [int64]0
            $pendingOrders = 0
            $completedOrders = 0

            foreach ($o in $orders) {
                if ($null -ne $o) {
                    if ($null -ne $o.totalAmount) {
                        try {
                            $totalSales += [int64]"$($o.totalAmount)"
                        } catch {}
                    }
                    $st = "$($o.status)"
                    if ($st -eq $STR_PAID -or $st -eq $STR_PREPARING -or $st -eq 'PAID') { $pendingOrders++ }
                    if ($st -eq $STR_DELIVERED -or $st -eq 'DELIVERED') { $completedOrders++ }
                }
            }

            $pendingInqs = 0
            foreach ($iq in $inquiries) {
                if ($null -ne $iq) {
                    $st = "$($iq.status)"
                    if ($st -eq $STR_INQ_WAIT -or $st -eq 'WAITING') { $pendingInqs++ }
                }
            }

            $statsObj = @{
                success = $true
                totalSales = $totalSales
                orderCount = $orders.Count
                productCount = $products.Count
                pendingOrders = $pendingOrders
                completedOrders = $completedOrders
                pendingInquiries = $pendingInqs
            }
            Send-JsonResponse $res 200 $statsObj $isHead
            continue
        }

        # -------------------------------------------------------------
        # 6. Static File Serving
        # -------------------------------------------------------------
        $reqPath = $rawPath
        if ($reqPath -eq '/' -or [string]::IsNullOrWhiteSpace($reqPath)) {
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
            try {
                $ext = [System.IO.Path]::GetExtension($localPath).ToLower()
                $ct = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { 'application/octet-stream' }
                $res.ContentType = $ct
                $res.StatusCode = 200
                $res.AddHeader('Access-Control-Allow-Origin', '*')
                $res.AddHeader('Cache-Control', 'no-cache, no-store, must-revalidate')
                
                $fileBytes = [System.IO.File]::ReadAllBytes($localPath)
                $res.ContentLength64 = $fileBytes.Length
                if (-not $isHead) {
                    $res.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
                }
            } catch {
                Write-Host "Static file stream error: $_"
            } finally {
                try { $res.OutputStream.Close() } catch {}
            }
        } else {
            Send-HtmlResponse $res 404 '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;"><h1>404 - Page Not Found</h1><p>The requested page was not found.</p><a href="/" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;">Go to EasyShop Home</a></body></html>' $isHead
        }

    } catch {
        Write-Host "Server loop error: $_"
        try { $context.Response.OutputStream.Close() } catch {}
    }
}
