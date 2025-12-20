# Yellow Power International - AWS S3 Deployment Script
# This script builds the Next.js website and uploads it to S3

param(
    [Parameter(Mandatory=$true)]
    [string]$BucketName,
    
    [Parameter(Mandatory=$false)]
    [string]$CloudFrontDistributionId = ""
)

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "YPI Website - AWS Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if AWS CLI is installed
Write-Host "Checking AWS CLI installation..." -ForegroundColor Yellow
try {
    $awsVersion = aws --version 2>&1
    Write-Host "✓ AWS CLI found: $awsVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ AWS CLI not found!" -ForegroundColor Red
    Write-Host "Please install AWS CLI from: https://aws.amazon.com/cli/" -ForegroundColor Yellow
    exit 1
}

# Check AWS credentials
Write-Host "Checking AWS credentials..." -ForegroundColor Yellow
try {
    $identity = aws sts get-caller-identity 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ AWS credentials configured" -ForegroundColor Green
    } else {
        throw "No credentials"
    }
} catch {
    Write-Host "✗ AWS credentials not configured!" -ForegroundColor Red
    Write-Host "Please run: aws configure" -ForegroundColor Yellow
    exit 1
}

# Navigate to dev folder
Write-Host ""
Write-Host "Navigating to dev folder..." -ForegroundColor Yellow
$devPath = Join-Path $PSScriptRoot "..\dev"
Set-Location $devPath

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Failed to install dependencies" -ForegroundColor Red
        exit 1
    }
}

# Build the website
Write-Host ""
Write-Host "Building Next.js website for production..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Build completed successfully" -ForegroundColor Green

# Check if out directory exists
$outPath = Join-Path $devPath "out"
if (-not (Test-Path $outPath)) {
    Write-Host "✗ Output directory not found at: $outPath" -ForegroundColor Red
    exit 1
}

# Upload to S3
Write-Host ""
Write-Host "Uploading to S3 bucket: $BucketName..." -ForegroundColor Yellow
aws s3 sync $outPath s3://$BucketName --delete --cache-control "public,max-age=31536000,immutable" --exclude "*.html" --exclude "*.json"
aws s3 sync $outPath s3://$BucketName --delete --cache-control "public,max-age=0,must-revalidate" --exclude "*" --include "*.html" --include "*.json"

if ($LASTEXITCODE -ne 0) {
    Write-Host "✗ Upload to S3 failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✓ Upload to S3 completed" -ForegroundColor Green

# Invalidate CloudFront cache if distribution ID provided
if ($CloudFrontDistributionId) {
    Write-Host ""
    Write-Host "Invalidating CloudFront cache..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $CloudFrontDistributionId --paths "/*"
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✓ CloudFront invalidation created" -ForegroundColor Green
    } else {
        Write-Host "⚠ CloudFront invalidation failed (non-critical)" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✓ Deployment completed successfully!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your website should be live at:" -ForegroundColor Cyan
Write-Host "https://yellowpowerinternational.com" -ForegroundColor White
Write-Host ""
