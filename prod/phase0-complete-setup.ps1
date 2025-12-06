# Phase 0 - Complete Setup Script
# Run this script when network connectivity is restored to complete Phase 0 setup

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "Yellow Power International - Phase 0 Setup" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Change to dev directory
Set-Location "../dev"

Write-Host "Step 1: Cleaning previous installation..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Remove-Item -Recurse -Force "node_modules" -ErrorAction SilentlyContinue
    Write-Host "  ✓ node_modules removed" -ForegroundColor Green
}
if (Test-Path "package-lock.json") {
    Remove-Item -Force "package-lock.json" -ErrorAction SilentlyContinue
    Write-Host "  ✓ package-lock.json removed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Installing dependencies..." -ForegroundColor Yellow
Write-Host "  This may take several minutes..." -ForegroundColor Gray
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Dependency installation failed!" -ForegroundColor Red
    Write-Host "Please check your network connection and try again." -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Step 3: Running lint check..." -ForegroundColor Yellow
npm run lint

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "⚠️  Lint check failed!" -ForegroundColor Yellow
    Write-Host "This may indicate code quality issues that need to be addressed." -ForegroundColor Yellow
} else {
    Write-Host "  ✓ Lint check passed" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 4: Running build..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ Build failed!" -ForegroundColor Red
    Write-Host "Please review the error messages above." -ForegroundColor Red
    exit 1
} else {
    Write-Host "  ✓ Build successful" -ForegroundColor Green
}

Write-Host ""
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "✅ Phase 0 Setup Complete!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Test the development server: npm run dev" -ForegroundColor White
Write-Host "  2. Visit http://localhost:3000 in your browser" -ForegroundColor White
Write-Host "  3. Commit changes to git:" -ForegroundColor White
Write-Host "     git checkout -b develop" -ForegroundColor Gray
Write-Host "     git add ." -ForegroundColor Gray
Write-Host "     git commit -m 'feat: Phase 0 - Repository setup complete'" -ForegroundColor Gray
Write-Host "  4. Push to remote:" -ForegroundColor White
Write-Host "     git push origin develop" -ForegroundColor Gray
Write-Host "  5. Connect to Vercel (set Root Directory to 'dev')" -ForegroundColor White
Write-Host ""
Write-Host "Ready to begin Phase 1: Design System & Foundation!" -ForegroundColor Green
Write-Host ""
