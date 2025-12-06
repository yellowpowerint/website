# Network Diagnostics for npm Installation Issues

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "npm Network Diagnostics" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "1. Testing npm registry connectivity..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://registry.npmjs.org" -TimeoutSec 10 -UseBasicParsing
    Write-Host "  ✓ Can reach registry.npmjs.org" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Cannot reach registry.npmjs.org" -ForegroundColor Red
    Write-Host "    Error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

Write-Host "2. Testing Cloudflare npm mirror..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://registry.npmjs.cf" -TimeoutSec 10 -UseBasicParsing
    Write-Host "  ✓ Can reach registry.npmjs.cf" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Cannot reach registry.npmjs.cf" -ForegroundColor Red
}
Write-Host ""

Write-Host "3. Testing npm mirror..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "https://registry.npmmirror.com" -TimeoutSec 10 -UseBasicParsing
    Write-Host "  ✓ Can reach registry.npmmirror.com" -ForegroundColor Green
} catch {
    Write-Host "  ✗ Cannot reach registry.npmmirror.com" -ForegroundColor Red
}
Write-Host ""

Write-Host "4. Checking DNS resolution..." -ForegroundColor Yellow
try {
    $dns = Resolve-DnsName registry.npmjs.org -ErrorAction Stop
    Write-Host "  ✓ DNS resolution working" -ForegroundColor Green
    Write-Host "    IP: $($dns[0].IPAddress)" -ForegroundColor Gray
} catch {
    Write-Host "  ✗ DNS resolution failing" -ForegroundColor Red
}
Write-Host ""

Write-Host "5. Current npm configuration..." -ForegroundColor Yellow
Set-Location "../dev"
Write-Host "  Registry: " -NoNewline
npm config get registry
Write-Host "  Cache: " -NoNewline
npm config get cache
Write-Host "  Proxy: " -NoNewline
npm config get proxy
Write-Host "  HTTPS Proxy: " -NoNewline
npm config get https-proxy
Write-Host ""

Write-Host "6. Network adapter status..." -ForegroundColor Yellow
$adapters = Get-NetAdapter | Where-Object {$_.Status -eq "Up"} | Select-Object Name, Status, LinkSpeed
$adapters | Format-Table -AutoSize

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Recommendations:" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "If all registries are unreachable:" -ForegroundColor Yellow
Write-Host "  • Check your firewall settings" -ForegroundColor White
Write-Host "  • Temporarily disable antivirus" -ForegroundColor White
Write-Host "  • Check if you're behind a corporate proxy" -ForegroundColor White
Write-Host "  • Try a different network (mobile hotspot)" -ForegroundColor White
Write-Host ""

Write-Host "If only some registries work:" -ForegroundColor Yellow
Write-Host "  • Use the working registry for installation" -ForegroundColor White
Write-Host "  • Example: npm config set registry https://registry.npmmirror.com" -ForegroundColor White
Write-Host ""

Write-Host "If DNS fails:" -ForegroundColor Yellow
Write-Host "  • Change DNS to Google DNS: 8.8.8.8, 8.8.4.4" -ForegroundColor White
Write-Host "  • Or Cloudflare DNS: 1.1.1.1, 1.0.0.1" -ForegroundColor White
Write-Host ""
