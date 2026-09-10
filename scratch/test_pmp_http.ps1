$wc = New-Object System.Net.WebClient
$wc.Encoding = [System.Text.Encoding]::UTF8

$urls = @(
    'http://localhost:5000/',
    'http://localhost:5000/exam.html',
    'http://localhost:5000/study.html',
    'http://localhost:5000/formulas.html',
    'http://localhost:5000/flashcards.html',
    'http://localhost:5000/review.html',
    'http://localhost:5000/admin.html',
    'http://localhost:5000/api/questions',
    'http://localhost:5000/api/formulas',
    'http://localhost:5000/api/glossary',
    'http://localhost:5000/api/stats'
)

foreach ($u in $urls) {
    try {
        $str = $wc.DownloadString($u)
        Write-Host "OK ($($str.Length)b): $u"
    } catch {
        Write-Host "FAIL: $u -> $($_.Exception.Message)"
    }
}
