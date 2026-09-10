$wc = New-Object System.Net.WebClient
$wc.Encoding = [System.Text.Encoding]::UTF8

$urls = @(
    'http://localhost:4000/',
    'http://localhost:4000/products.html',
    'http://localhost:4000/product-detail.html?id=prod-1',
    'http://localhost:4000/cart.html',
    'http://localhost:4000/checkout.html',
    'http://localhost:4000/order-lookup.html',
    'http://localhost:4000/admin.html',
    'http://localhost:4000/api/categories',
    'http://localhost:4000/api/products',
    'http://localhost:4000/api/orders',
    'http://localhost:4000/api/inquiries',
    'http://localhost:4000/api/stats'
)

foreach ($u in $urls) {
    try {
        $str = $wc.DownloadString($u)
        Write-Host "OK ($($str.Length)b): $u"
    } catch {
        Write-Host "FAIL: $u -> $($_.Exception.Message)"
    }
}
