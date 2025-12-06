# Alternative Installation Methods for Network Issues
# Run this from the prod/ directory

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Alternative npm Installation Methods" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Change to dev directory
Set-Location "../dev"

Write-Host "Option 1: Using Cloudflare npm Registry" -ForegroundColor Yellow
Write-Host "This often works better with network issues" -ForegroundColor Gray
Write-Host ""
Write-Host "Run these commands:" -ForegroundColor Green
Write-Host "  npm config set registry https://registry.npmjs.cf" -ForegroundColor White
Write-Host "  npm install --legacy-peer-deps" -ForegroundColor White
Write-Host "  npm config set registry https://registry.npmjs.org" -ForegroundColor White
Write-Host ""

Write-Host "Option 2: Using npm Mirror (China)" -ForegroundColor Yellow
Write-Host "Very fast and reliable alternative" -ForegroundColor Gray
Write-Host ""
Write-Host "Run these commands:" -ForegroundColor Green
Write-Host "  npm config set registry https://registry.npmmirror.com" -ForegroundColor White
Write-Host "  npm install --legacy-peer-deps" -ForegroundColor White
Write-Host "  npm config set registry https://registry.npmjs.org" -ForegroundColor White
Write-Host ""

Write-Host "Option 3: Install with Increased Timeout" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run this command:" -ForegroundColor Green
Write-Host "  npm install --legacy-peer-deps --fetch-timeout=300000 --fetch-retry-mintimeout=20000 --fetch-retry-maxtimeout=120000" -ForegroundColor White
Write-Host ""

Write-Host "Option 4: Clear Cache and Retry" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run these commands:" -ForegroundColor Green
Write-Host "  npm cache clean --force" -ForegroundColor White
Write-Host "  npm cache verify" -ForegroundColor White
Write-Host "  Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue" -ForegroundColor White
Write-Host "  npm install --legacy-peer-deps" -ForegroundColor White
Write-Host ""

Write-Host "Option 5: Use Yarn Instead (Recommended if npm keeps failing)" -ForegroundColor Yellow
Write-Host ""
Write-Host "Run these commands:" -ForegroundColor Green
Write-Host "  npm install -g yarn" -ForegroundColor White
Write-Host "  Remove-Item package-lock.json -ErrorAction SilentlyContinue" -ForegroundColor White
Write-Host "  yarn install" -ForegroundColor White
Write-Host ""

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "After successful installation, verify with:" -ForegroundColor Cyan
Write-Host "  npm run lint" -ForegroundColor White
Write-Host "  npm run build" -ForegroundColor White
Write-Host "  npm run dev" -ForegroundColor White
Write-Host "==================================================" -ForegroundColor Cyan
