#!/usr/bin/env pwsh
<#
.SYNOPSIS
    Automated deployment script for YPI Website to InterServer VPS

.DESCRIPTION
    Deploys the Yellow Power International website (Next.js app) to InterServer VPS
    - Installs required packages (Node.js 20, PM2, Nginx)
    - Transfers code to server
    - Configures environment variables
    - Builds and starts the application with PM2
    - Configures Nginx reverse proxy
    
.PARAMETER ServerIP
    IP address of the InterServer VPS (default: 216.158.230.187)

.PARAMETER ServerUser
    SSH username (default: root)

.PARAMETER ServerPassword
    SSH password for authentication

.PARAMETER DeployPath
    Deployment path on server (default: /var/www/yellowpower-website)

.PARAMETER AppPort
    Port for Next.js app (default: 3002)

.PARAMETER Domain
    Domain name for the site (optional, defaults to IP-based access)

.EXAMPLE
    .\deploy-to-interserver.ps1 -ServerPassword "your_password"

.EXAMPLE
    .\deploy-to-interserver.ps1 -ServerPassword "your_password" -Domain "yellowpowerinternational.com"
#>

param(
    [string]$ServerIP = "216.158.230.187",
    [string]$ServerUser = "root",
    [Parameter(Mandatory=$true)]
    [string]$ServerPassword,
    [string]$DeployPath = "/var/www/yellowpower-website",
    [int]$AppPort = 3002,
    [string]$Domain = "",
    [string]$AdminEmail = "admin@yellowpowerinternational.com",
    [string]$AdminPassword = ""
)

$ErrorActionPreference = "Stop"

# Colors for output
function Write-Step { param($msg) Write-Host "`n==> $msg" -ForegroundColor Cyan }
function Write-Success { param($msg) Write-Host "✓ $msg" -ForegroundColor Green }
function Write-Error { param($msg) Write-Host "✗ $msg" -ForegroundColor Red }
function Write-Warning { param($msg) Write-Host "⚠ $msg" -ForegroundColor Yellow }

# Check prerequisites
Write-Step "Checking prerequisites..."

# Check for SSH tools - prefer PuTTY for password authentication
$plinkPath = Get-Command plink -ErrorAction SilentlyContinue
$sshPath = Get-Command ssh -ErrorAction SilentlyContinue

if ($plinkPath) {
    $useSSH = $false
    Write-Success "Using PuTTY/plink (supports password authentication)"
} elseif ($sshPath) {
    Write-Warning "Using OpenSSH (password authentication requires manual entry)"
    Write-Warning "For automated deployment, install PuTTY: https://www.putty.org/"
    Write-Host "PuTTY installation adds 'plink' command for password-based SSH" -ForegroundColor Gray
    Write-Host ""
    $useSSH = $true
} else {
    Write-Error "Neither plink (PuTTY) nor ssh (OpenSSH) found."
    Write-Host "Install PuTTY from: https://www.putty.org/"
    Write-Host "Or install OpenSSH: Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0"
    exit 1
}

# Check if pscp (PuTTY) or scp is available
if (-not $useSSH) {
    $pscpPath = Get-Command pscp -ErrorAction SilentlyContinue
    if (-not $pscpPath) {
        Write-Error "pscp (PuTTY) not found. Please ensure PuTTY is fully installed."
        Write-Host "Download from: https://www.putty.org/"
        exit 1
    }
    Write-Success "pscp found"
} else {
    $scpPath = Get-Command scp -ErrorAction SilentlyContinue
    if (-not $scpPath) {
        Write-Error "scp not found. Please install OpenSSH."
        exit 1
    }
    Write-Success "scp found"
}

# Verify local project exists
# Script is in ypi-website folder, dev is a subfolder
$projectRoot = $PSScriptRoot
$devPath = Join-Path $projectRoot "dev"

if (-not (Test-Path $devPath)) {
    Write-Error "Project not found at: $devPath"
    Write-Host "Expected structure: ypi-website/dev/"
    Write-Host "Script location: $PSScriptRoot"
    exit 1
}
Write-Success "Project found at: $devPath"

# Function to execute SSH commands
function Invoke-SSHCommand {
    param(
        [string]$Command,
        [switch]$IgnoreError
    )
    
    if ($useSSH) {
        # OpenSSH - will prompt for password interactively
        $result = ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$ServerUser@$ServerIP" "$Command" 2>&1
    } else {
        # PuTTY plink - supports password parameter
        $result = echo y | plink -batch -pw "$ServerPassword" "$ServerUser@$ServerIP" "$Command" 2>&1
    }
    
    if ($LASTEXITCODE -ne 0 -and -not $IgnoreError) {
        Write-Error "Command failed: $Command"
        Write-Host $result
        throw "SSH command execution failed"
    }
    
    return $result
}

# Function to transfer files
function Copy-ToServer {
    param(
        [string]$LocalPath,
        [string]$RemotePath
    )
    
    if ($useSSH) {
        # OpenSSH - will prompt for password interactively
        scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r "$LocalPath" "${ServerUser}@${ServerIP}:${RemotePath}" 2>&1
    } else {
        # PuTTY pscp - supports password parameter
        pscp -batch -pw "$ServerPassword" -r "$LocalPath" "${ServerUser}@${ServerIP}:${RemotePath}" 2>&1
    }
    
    if ($LASTEXITCODE -ne 0) {
        throw "File transfer failed"
    }
}

# Generate secure secrets
function New-SecureSecret {
    $bytes = New-Object byte[] 32
    [Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($bytes)
    return [Convert]::ToBase64String($bytes)
}

Write-Step "Starting deployment to $ServerIP..."

# Step 1: Install system packages
Write-Step "Installing system packages (Nginx, Node.js 20, PM2)..."

try {
    Invoke-SSHCommand "apt update -qq" -IgnoreError
    Invoke-SSHCommand "DEBIAN_FRONTEND=noninteractive apt install -y nginx git curl"
    Write-Success "Nginx and Git installed"
    
    # Check if Node.js 20 is already installed
    $nodeVersion = Invoke-SSHCommand "node -v 2>/dev/null || echo 'not-installed'" -IgnoreError
    if ($nodeVersion -notmatch "v20") {
        Write-Host "Installing Node.js 20 LTS..."
        Invoke-SSHCommand "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -"
        Invoke-SSHCommand "DEBIAN_FRONTEND=noninteractive apt install -y nodejs"
        Write-Success "Node.js 20 installed"
    } else {
        Write-Success "Node.js 20 already installed"
    }
    
    # Install PM2
    Invoke-SSHCommand "npm install -g pm2" -IgnoreError
    Write-Success "PM2 installed"
    
} catch {
    Write-Error "Failed to install system packages: $_"
    exit 1
}

# Step 2: Create deployment directory
Write-Step "Creating deployment directory..."

try {
    Invoke-SSHCommand "mkdir -p $DeployPath"
    Write-Success "Directory created: $DeployPath"
} catch {
    Write-Error "Failed to create directory: $_"
    exit 1
}

# Step 3: Transfer project files
Write-Step "Transferring project files to server..."

try {
    # Create temporary archive
    $tempArchive = Join-Path $env:TEMP "ypi-website-deploy.tar.gz"
    Write-Host "Creating archive..."
    
    Push-Location $devPath
    
    # Use tar if available (Windows 10+), otherwise use 7zip or warn
    $tarCmd = Get-Command tar -ErrorAction SilentlyContinue
    if ($tarCmd) {
        tar -czf $tempArchive --exclude=node_modules --exclude=.next --exclude=.git * 2>&1 | Out-Null
    } else {
        Write-Warning "tar not found. Copying files directly (slower)..."
        # Fallback: copy files directly
        Copy-ToServer "$devPath\*" "$DeployPath/"
        Pop-Location
        Write-Success "Files transferred"
        continue
    }
    
    Pop-Location
    
    if (Test-Path $tempArchive) {
        Write-Host "Uploading archive to server..."
        Copy-ToServer $tempArchive "/tmp/ypi-website-deploy.tar.gz"
        
        Write-Host "Extracting on server..."
        Invoke-SSHCommand "cd $DeployPath && tar -xzf /tmp/ypi-website-deploy.tar.gz"
        Invoke-SSHCommand "rm /tmp/ypi-website-deploy.tar.gz"
        
        Remove-Item $tempArchive -Force
        Write-Success "Files transferred and extracted"
    }
} catch {
    Write-Error "Failed to transfer files: $_"
    exit 1
}

# Step 4: Create production environment file
Write-Step "Creating production environment file..."

try {
    $nextAuthSecret = New-SecureSecret
    $siteUrl = if ($Domain) { "https://$Domain" } else { "http://$ServerIP" }
    
    # Prompt for admin password if not provided
    if (-not $AdminPassword) {
        $securePassword = Read-Host "Enter admin password for dashboard" -AsSecureString
        $AdminPassword = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
            [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
        )
    }
    
    $envContent = @"
# Yellow Power International - Production Environment
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")

# NextAuth Configuration
NEXTAUTH_SECRET=$nextAuthSecret
NEXTAUTH_URL=$siteUrl

# Admin Authentication
ADMIN_EMAIL=$AdminEmail
ADMIN_PASSWORD=$AdminPassword

# AI Features (disabled by default - add API keys to enable)
NEXT_PUBLIC_ENABLE_POWERBOT=false
NEXT_PUBLIC_ENABLE_AI_SEARCH=false

# Email Configuration (add API key to enable)
EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@yellowpowerinternational.com
EMAIL_TO=info@yellowpowerinternational.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=$siteUrl
NEXT_PUBLIC_WHATSAPP_NUMBER=233268066942

# Social Media
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yellow-power-international
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yellowpowerintl
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yellowpowerintl
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yellowpowerintl
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@yellowpowerintl
"@

    # Write env file to temp location and upload
    $tempEnvFile = Join-Path $env:TEMP ".env.production.local"
    $envContent | Out-File -FilePath $tempEnvFile -Encoding UTF8 -NoNewline
    
    Copy-ToServer $tempEnvFile "$DeployPath/.env.production.local"
    Remove-Item $tempEnvFile -Force
    
    Write-Success "Environment file created"
    Write-Host "  Admin Email: $AdminEmail"
    Write-Host "  Site URL: $siteUrl"
} catch {
    Write-Error "Failed to create environment file: $_"
    exit 1
}

# Step 5: Install dependencies and build
Write-Step "Installing dependencies and building application..."

try {
    Invoke-SSHCommand "cd $DeployPath && npm ci --production=false"
    Write-Success "Dependencies installed"
    
    Invoke-SSHCommand "cd $DeployPath && npm run build"
    Write-Success "Application built"
} catch {
    Write-Error "Failed to build application: $_"
    exit 1
}

# Step 6: Start application with PM2
Write-Step "Starting application with PM2..."

try {
    # Stop existing instance if running
    Invoke-SSHCommand "pm2 delete ypi-website" -IgnoreError
    
    # Start new instance
    Invoke-SSHCommand "cd $DeployPath && pm2 start npm --name ypi-website -- start -- -p $AppPort"
    Invoke-SSHCommand "pm2 save"
    Invoke-SSHCommand "pm2 startup systemd -u root --hp /root" -IgnoreError
    
    Write-Success "Application started on port $AppPort"
    
    # Wait a moment for app to start
    Start-Sleep -Seconds 3
    
    # Check if app is running
    $pmStatus = Invoke-SSHCommand "pm2 status ypi-website"
    Write-Host $pmStatus
} catch {
    Write-Error "Failed to start application: $_"
    exit 1
}

# Step 7: Configure Nginx
Write-Step "Configuring Nginx reverse proxy..."

try {
    $serverName = if ($Domain) { "$Domain www.$Domain" } else { "_" }
    
    $nginxConfig = @"
server {
    listen 80;
    server_name $serverName;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://127.0.0.1:$AppPort;
        proxy_http_version 1.1;
        proxy_set_header Upgrade `$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host `$host;
        proxy_set_header X-Real-IP `$remote_addr;
        proxy_set_header X-Forwarded-For `$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto `$scheme;
        proxy_cache_bypass `$http_upgrade;
    }

    # Increase body size for file uploads
    client_max_body_size 10M;
}
"@

    # Write nginx config to temp and upload
    $tempNginxFile = Join-Path $env:TEMP "ypi-website-nginx"
    $nginxConfig | Out-File -FilePath $tempNginxFile -Encoding UTF8 -NoNewline
    
    Copy-ToServer $tempNginxFile "/etc/nginx/sites-available/ypi-website"
    Remove-Item $tempNginxFile -Force
    
    # Enable site and reload Nginx
    Invoke-SSHCommand "ln -sf /etc/nginx/sites-available/ypi-website /etc/nginx/sites-enabled/ypi-website"
    Invoke-SSHCommand "rm -f /etc/nginx/sites-enabled/default" -IgnoreError
    Invoke-SSHCommand "nginx -t"
    Invoke-SSHCommand "systemctl reload nginx"
    
    Write-Success "Nginx configured and reloaded"
} catch {
    Write-Error "Failed to configure Nginx: $_"
    exit 1
}

# Step 8: Configure firewall (if UFW is available)
Write-Step "Configuring firewall..."

try {
    $ufwStatus = Invoke-SSHCommand "which ufw" -IgnoreError
    if ($ufwStatus) {
        Invoke-SSHCommand "ufw allow OpenSSH" -IgnoreError
        Invoke-SSHCommand "ufw allow 'Nginx Full'" -IgnoreError
        Invoke-SSHCommand "ufw --force enable" -IgnoreError
        Write-Success "Firewall configured"
    } else {
        Write-Warning "UFW not found, skipping firewall configuration"
    }
} catch {
    Write-Warning "Failed to configure firewall (non-critical): $_"
}

# Final verification
Write-Step "Verifying deployment..."

try {
    $curlTest = Invoke-SSHCommand "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$AppPort"
    if ($curlTest -match "200") {
        Write-Success "Application is responding correctly"
    } else {
        Write-Warning "Application returned status: $curlTest"
    }
} catch {
    Write-Warning "Could not verify application status"
}

# Summary
Write-Host "`n" -NoNewline
Write-Host "========================================" -ForegroundColor Green
Write-Host "  DEPLOYMENT COMPLETED SUCCESSFULLY" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Website URL: " -NoNewline
if ($Domain) {
    Write-Host "http://$Domain" -ForegroundColor Cyan
} else {
    Write-Host "http://$ServerIP" -ForegroundColor Cyan
}
Write-Host ""
Write-Host "🔐 Admin Dashboard: " -NoNewline
if ($Domain) {
    Write-Host "http://$Domain/admin" -ForegroundColor Cyan
} else {
    Write-Host "http://$ServerIP/admin" -ForegroundColor Cyan
}
Write-Host "   Email: $AdminEmail" -ForegroundColor Gray
Write-Host "   Password: [as configured]" -ForegroundColor Gray
Write-Host ""

if (-not $Domain) {
    Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
    Write-Host "   1. Test the site at http://$ServerIP"
    Write-Host "   2. Configure DNS A record: yellowpowerinternational.com -> $ServerIP"
    Write-Host "   3. Re-run deployment with -Domain parameter:"
    Write-Host "      .\deploy-to-interserver.ps1 -ServerPassword 'pwd' -Domain 'yellowpowerinternational.com'"
    Write-Host "   4. Install SSL certificate:"
    Write-Host "      ssh root@$ServerIP"
    Write-Host "      apt install -y certbot python3-certbot-nginx"
    Write-Host "      certbot --nginx -d yellowpowerinternational.com -d www.yellowpowerinternational.com"
    Write-Host ""
} else {
    Write-Host "📋 NEXT STEPS:" -ForegroundColor Yellow
    Write-Host "   1. Ensure DNS is configured: $Domain -> $ServerIP"
    Write-Host "   2. Install SSL certificate:"
    Write-Host "      ssh root@$ServerIP"
    Write-Host "      apt install -y certbot python3-certbot-nginx"
    Write-Host "      certbot --nginx -d $Domain -d www.$Domain"
    Write-Host ""
}

Write-Host "🔧 USEFUL COMMANDS:" -ForegroundColor Cyan
Write-Host "   View logs:    ssh root@$ServerIP 'pm2 logs ypi-website'"
Write-Host "   Restart app:  ssh root@$ServerIP 'pm2 restart ypi-website'"
Write-Host "   App status:   ssh root@$ServerIP 'pm2 status'"
Write-Host ""
