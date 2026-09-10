$ErrorActionPreference = 'Continue'
$port = 5000
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
$prefixLocal = 'http://localhost:5000/'
$prefixIp = 'http://127.0.0.1:5000/'

try {
    $listener.Prefixes.Add($prefixLocal)
    $listener.Prefixes.Add($prefixIp)
    $listener.Start()
    Write-Host '===================================================' -ForegroundColor Cyan
    Write-Host '  [PMP EXAM MASTER] Learning Platform Started!' -ForegroundColor Green
    Write-Host '  Portal URL: http://localhost:5000/' -ForegroundColor Yellow
    Write-Host '  Exam URL:   http://localhost:5000/exam.html' -ForegroundColor Yellow
    Write-Host '  Study URL:  http://localhost:5000/study.html' -ForegroundColor Yellow
    Write-Host '===================================================' -ForegroundColor Cyan
} catch {
    Write-Host "Error starting PMP server on port 5000: $_" -ForegroundColor Red
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
        # 1. API: Questions (CRUD)
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/questions') {
            $raw = Read-RawJsonFile 'questions.json' '[]'

            if ($httpMethod -eq 'GET' -or $httpMethod -eq 'HEAD') {
                $queryId = $req.QueryString['id']
                $domFilter = $req.QueryString['domain']
                $methFilter = $req.QueryString['methodology']

                $items = @(ConvertFrom-Json $raw)

                if ($queryId) {
                    $target = $items | Where-Object { $_.id -eq $queryId } | Select-Object -First 1
                    if ($target) {
                        Send-JsonResponse $res 200 ($target | ConvertTo-Json -Depth 10 -Compress) $isHead
                    } else {
                        Send-JsonResponse $res 404 '{"error":"Question not found"}' $isHead
                    }
                    continue
                }

                if ($domFilter) {
                    $items = $items | Where-Object { $_.domain -eq $domFilter }
                }
                if ($methFilter) {
                    $items = $items | Where-Object { $_.methodology -eq $methFilter }
                }

                Send-JsonResponse $res 200 ($items | ConvertTo-Json -Depth 10 -Compress) $isHead
                continue
            }

            if ($httpMethod -eq 'POST') {
                $reader = New-Object System.IO.StreamReader($req.InputStream, [System.Text.Encoding]::UTF8)
                $body = $reader.ReadToEnd()
                $newQ = ConvertFrom-Json $body
                if (-not $newQ.id) {
                    $newQ | Add-Member -NotePropertyName 'id' -NotePropertyValue ('q-' + (Get-Random -Minimum 100 -Maximum 999)) -Force
                }
                $items = @(ConvertFrom-Json $raw)
                $items = @($newQ) + $items
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'questions.json' $newJson
                Send-JsonResponse $res 201 '{"success":true,"message":"Question added"}' $isHead
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
                Write-RawJsonFile 'questions.json' $newJson
                Send-JsonResponse $res 200 '{"success":true,"message":"Question updated"}' $isHead
                continue
            }

            if ($httpMethod -eq 'DELETE') {
                $queryId = $req.QueryString['id']
                $items = @(ConvertFrom-Json $raw)
                $items = $items | Where-Object { $_.id -ne $queryId }
                $newJson = $items | ConvertTo-Json -Depth 10
                Write-RawJsonFile 'questions.json' $newJson
                Send-JsonResponse $res 200 '{"success":true,"message":"Question deleted"}' $isHead
                continue
            }
        }

        # -------------------------------------------------------------
        # 2. API: Formulas
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/formulas') {
            $raw = Read-RawJsonFile 'formulas.json' '[]'
            Send-JsonResponse $res 200 $raw $isHead
            continue
        }

        # -------------------------------------------------------------
        # 3. API: Glossary
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/glossary') {
            $raw = Read-RawJsonFile 'glossary.json' '[]'
            Send-JsonResponse $res 200 $raw $isHead
            continue
        }

        # -------------------------------------------------------------
        # 4. API: Stats
        # -------------------------------------------------------------
        if ($rawPath -eq '/api/stats') {
            $questions = @(ConvertFrom-Json (Read-RawJsonFile 'questions.json' '[]'))
            $peopleCount = 0
            $processCount = 0
            $businessCount = 0
            $agileCount = 0

            foreach ($q in $questions) {
                if ($q.domain -eq 'people') { $peopleCount++ }
                if ($q.domain -eq 'process') { $processCount++ }
                if ($q.domain -eq 'business') { $businessCount++ }
                if ($q.methodology -eq 'agile' -or $q.methodology -eq 'hybrid') { $agileCount++ }
            }

            $statsObj = @{
                success = $true
                totalQuestions = $questions.Count
                peopleCount = $peopleCount
                processCount = $processCount
                businessCount = $businessCount
                agileCount = $agileCount
            }
            Send-JsonResponse $res 200 $statsObj $isHead
            continue
        }

        # -------------------------------------------------------------
        # 5. Static File Serving
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
            Send-HtmlResponse $res 404 '<!DOCTYPE html><html><head><meta charset="UTF-8"><title>404 Not Found</title></head><body style="font-family:sans-serif;text-align:center;padding:50px;background:#0f172a;color:#fff;"><h1>404 - Page Not Found</h1><p>The requested PMP page was not found.</p><a href="/" style="display:inline-block;margin-top:20px;padding:10px 20px;background:#0284c7;color:#fff;text-decoration:none;border-radius:8px;">PMP Portal Home</a></body></html>' $isHead
        }

    } catch {
        Write-Host "Server loop error: $_"
        try { $context.Response.OutputStream.Close() } catch {}
    }
}
