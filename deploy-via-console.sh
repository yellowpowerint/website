#!/bin/bash
#
# Manual Deployment Script for Web Console
# Run this directly on the server via VNC/Web Console
#

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

step() { echo -e "\n${CYAN}==> $1${NC}"; }
success() { echo -e "${GREEN}✓ $1${NC}"; }
error() { echo -e "${RED}✗ $1${NC}"; }

# Configuration
DEPLOY_PATH="/var/www/yellowpower-website"
APP_PORT="3002"
DOMAIN="${1:-}"

echo -e "${CYAN}========================================"
echo "  YPI Website Deployment"
echo -e "========================================${NC}"
echo ""

# Step 1: Install system packages
step "Installing system packages..."

apt update -qq
DEBIAN_FRONTEND=noninteractive apt install -y nginx git curl
success "Nginx and Git installed"

# Install Node.js 20
if ! node -v 2>/dev/null | grep -q "v20"; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    DEBIAN_FRONTEND=noninteractive apt install -y nodejs
    success "Node.js 20 installed"
else
    success "Node.js 20 already installed"
fi

# Install PM2
npm install -g pm2
success "PM2 installed"

# Step 2: Create deployment directory
step "Creating deployment directory..."
mkdir -p "$DEPLOY_PATH"
cd "$DEPLOY_PATH"
success "Directory ready: $DEPLOY_PATH"

# Step 3: Instructions for file upload
step "Upload your website files..."
echo ""
echo "You need to upload the website files to this server."
echo ""
echo "OPTIONS:"
echo ""
echo "1. Use Git (if your code is on GitHub):"
echo "   git clone YOUR_REPO_URL ."
echo ""
echo "2. Use SCP from your PC (in Git Bash):"
echo "   cd /c/Users/Plange/Downloads/Projects/ypi-website/dev"
echo "   tar -czf ypi-website.tar.gz --exclude=node_modules --exclude=.next ."
echo "   scp ypi-website.tar.gz root@216.158.230.187:/tmp/"
echo "   # Then on server:"
echo "   cd $DEPLOY_PATH"
echo "   tar -xzf /tmp/ypi-website.tar.gz"
echo ""
echo "3. Use the web console file manager (if available)"
echo ""
echo -e "${YELLOW}After uploading files, run this script again with --continue${NC}"
echo ""

if [ "$1" != "--continue" ]; then
    exit 0
fi

# Step 4: Create environment file
step "Creating environment file..."

NEXTAUTH_SECRET=$(openssl rand -base64 32)
SITE_URL="${DOMAIN:+https://$DOMAIN}"
SITE_URL="${SITE_URL:-http://216.158.230.187}"

cat > .env.production.local << EOF
# Yellow Power International - Production Environment
# Generated: $(date '+%Y-%m-%d %H:%M:%S')

NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=$SITE_URL

ADMIN_EMAIL=admin@yellowpowerinternational.com
ADMIN_PASSWORD=disabled-change-to-enable

NEXT_PUBLIC_ENABLE_POWERBOT=false
NEXT_PUBLIC_ENABLE_AI_SEARCH=false

EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@yellowpowerinternational.com
EMAIL_TO=info@yellowpowerinternational.com

NEXT_PUBLIC_SITE_URL=$SITE_URL
NEXT_PUBLIC_WHATSAPP_NUMBER=233268066942

NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yellow-power-international
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yellowpowerintl
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yellowpowerintl
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yellowpowerintl
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@yellowpowerintl
EOF

success "Environment file created"

# Step 5: Install and build
step "Installing dependencies..."
npm ci --production=false
success "Dependencies installed"

step "Building application..."
npm run build
success "Build complete"

# Step 6: Start with PM2
step "Starting application..."
pm2 delete ypi-website 2>/dev/null || true
pm2 start npm --name ypi-website -- start -- -p $APP_PORT
pm2 save
pm2 startup systemd -u root --hp /root
success "Application started on port $APP_PORT"

# Step 7: Configure Nginx
step "Configuring Nginx..."

SERVER_NAME="${DOMAIN:+$DOMAIN www.$DOMAIN}"
SERVER_NAME="${SERVER_NAME:-_}"

cat > /etc/nginx/sites-available/ypi-website << EOF
server {
    listen 80;
    server_name $SERVER_NAME;

    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }

    client_max_body_size 10M;
}
EOF

ln -sf /etc/nginx/sites-available/ypi-website /etc/nginx/sites-enabled/ypi-website
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx
success "Nginx configured"

# Step 8: Firewall
step "Configuring firewall..."
if command -v ufw &> /dev/null; then
    ufw allow OpenSSH
    ufw allow 'Nginx Full'
    ufw --force enable
    success "Firewall configured"
fi

# Summary
echo ""
echo -e "${GREEN}========================================"
echo "  DEPLOYMENT COMPLETE"
echo -e "========================================${NC}"
echo ""
echo -e "🌐 Website: ${CYAN}http://216.158.230.187${NC}"
echo ""
echo "Useful commands:"
echo "  pm2 logs ypi-website    # View logs"
echo "  pm2 restart ypi-website # Restart app"
echo "  pm2 status              # Check status"
echo ""
