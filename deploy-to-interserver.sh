#!/bin/bash
#
# Automated deployment script for YPI Website to InterServer VPS
# Compatible with Git Bash, Linux, macOS
#
# Usage:
#   ./deploy-to-interserver.sh
#   ./deploy-to-interserver.sh --domain yellowpowerinternational.com
#

set -e

# Configuration
SERVER_IP="${SERVER_IP:-216.158.230.187}"
SERVER_USER="${SERVER_USER:-root}"
SERVER_PASSWORD="${SERVER_PASSWORD:-}"
DEPLOY_PATH="${DEPLOY_PATH:-/var/www/yellowpower-website}"
APP_PORT="${APP_PORT:-3002}"
DOMAIN="${DOMAIN:-}"
ADMIN_EMAIL="${ADMIN_EMAIL:-admin@yellowpowerinternational.com}"
ADMIN_PASSWORD="${ADMIN_PASSWORD:-}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
GRAY='\033[0;37m'
NC='\033[0m'

# Helper functions
step() { echo -e "\n${CYAN}==> $1${NC}"; }
success() { echo -e "${GREEN}✓ $1${NC}"; }
error() { echo -e "${RED}✗ $1${NC}"; }
warning() { echo -e "${YELLOW}⚠ $1${NC}"; }

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --domain)
            DOMAIN="$2"
            shift 2
            ;;
        --password)
            SERVER_PASSWORD="$2"
            shift 2
            ;;
        --admin-password)
            ADMIN_PASSWORD="$2"
            shift 2
            ;;
        --help)
            echo "Usage: $0 [OPTIONS]"
            echo ""
            echo "Options:"
            echo "  --domain DOMAIN          Domain name (e.g., yellowpowerinternational.com)"
            echo "  --password PASSWORD      SSH password for server"
            echo "  --admin-password PASS    Admin dashboard password"
            echo "  --help                   Show this help message"
            echo ""
            echo "Environment variables:"
            echo "  SERVER_IP                Server IP (default: 216.158.230.187)"
            echo "  SERVER_USER              SSH username (default: root)"
            echo "  DEPLOY_PATH              Deployment path (default: /var/www/yellowpower-website)"
            echo "  APP_PORT                 Application port (default: 3002)"
            echo ""
            exit 0
            ;;
        *)
            error "Unknown option: $1"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Prompt for passwords if not provided
if [ -z "$SERVER_PASSWORD" ]; then
    echo -n "Enter SSH password for $SERVER_USER@$SERVER_IP: "
    read -s SERVER_PASSWORD
    echo
fi

if [ -z "$ADMIN_PASSWORD" ]; then
    echo -n "Enter admin dashboard password (press Enter to skip): "
    read -s ADMIN_PASSWORD
    echo
    if [ -z "$ADMIN_PASSWORD" ]; then
        warning "Admin dashboard disabled (no password set)"
        ADMIN_PASSWORD="disabled-change-to-enable-admin"
    fi
fi

# Check prerequisites
step "Checking prerequisites..."

# Check for sshpass (for password authentication)
if ! command -v sshpass &> /dev/null; then
    warning "sshpass not found - will use SSH key or interactive password entry"
    warning "To install sshpass on Git Bash: Download from https://sourceforge.net/projects/sshpass/"
    USE_SSHPASS=false
else
    success "sshpass found (automated password authentication)"
    USE_SSHPASS=true
fi

# Check for ssh and scp
if ! command -v ssh &> /dev/null; then
    error "ssh not found. Please install OpenSSH."
    exit 1
fi
success "ssh found"

if ! command -v scp &> /dev/null; then
    error "scp not found. Please install OpenSSH."
    exit 1
fi
success "scp found"

# Verify local project exists
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DEV_PATH="$SCRIPT_DIR/dev"

if [ ! -d "$DEV_PATH" ]; then
    error "Project not found at: $DEV_PATH"
    echo "Expected structure: ypi-website/dev/"
    exit 1
fi
success "Project found at: $DEV_PATH"

# SSH command wrapper
ssh_exec() {
    local cmd="$1"
    if [ "$USE_SSHPASS" = true ]; then
        sshpass -p "$SERVER_PASSWORD" ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SERVER_USER@$SERVER_IP" "$cmd"
    else
        ssh -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null "$SERVER_USER@$SERVER_IP" "$cmd"
    fi
}

# SCP command wrapper
scp_exec() {
    local src="$1"
    local dst="$2"
    if [ "$USE_SSHPASS" = true ]; then
        sshpass -p "$SERVER_PASSWORD" scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r "$src" "$SERVER_USER@$SERVER_IP:$dst"
    else
        scp -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null -r "$src" "$SERVER_USER@$SERVER_IP:$dst"
    fi
}

# Generate secure secret
generate_secret() {
    openssl rand -base64 32
}

step "Starting deployment to $SERVER_IP..."

# Step 1: Install system packages
step "Installing system packages (Nginx, Node.js 20, PM2)..."

ssh_exec "apt update -qq" || true
ssh_exec "DEBIAN_FRONTEND=noninteractive apt install -y nginx git curl"
success "Nginx and Git installed"

# Check if Node.js 20 is already installed
NODE_VERSION=$(ssh_exec "node -v 2>/dev/null || echo 'not-installed'")
if [[ ! "$NODE_VERSION" =~ v20 ]]; then
    echo "Installing Node.js 20 LTS..."
    ssh_exec "curl -fsSL https://deb.nodesource.com/setup_20.x | bash -"
    ssh_exec "DEBIAN_FRONTEND=noninteractive apt install -y nodejs"
    success "Node.js 20 installed"
else
    success "Node.js 20 already installed"
fi

# Install PM2
ssh_exec "npm install -g pm2" || true
success "PM2 installed"

# Step 2: Create deployment directory
step "Creating deployment directory..."
ssh_exec "mkdir -p $DEPLOY_PATH"
success "Directory created: $DEPLOY_PATH"

# Step 3: Transfer project files
step "Transferring project files to server..."

# Create temporary archive
TEMP_ARCHIVE="/tmp/ypi-website-deploy-$$.tar.gz"
echo "Creating archive..."

cd "$DEV_PATH"
tar -czf "$TEMP_ARCHIVE" \
    --exclude=node_modules \
    --exclude=.next \
    --exclude=.git \
    --exclude=.vercel \
    .

echo "Uploading archive to server..."
scp_exec "$TEMP_ARCHIVE" "/tmp/ypi-website-deploy.tar.gz"

echo "Extracting on server..."
ssh_exec "cd $DEPLOY_PATH && tar -xzf /tmp/ypi-website-deploy.tar.gz"
ssh_exec "rm /tmp/ypi-website-deploy.tar.gz"

rm -f "$TEMP_ARCHIVE"
success "Files transferred and extracted"

# Step 4: Create production environment file
step "Creating production environment file..."

NEXTAUTH_SECRET=$(generate_secret)
SITE_URL="${DOMAIN:+https://$DOMAIN}"
SITE_URL="${SITE_URL:-http://$SERVER_IP}"

cat > /tmp/ypi-env-$$ << EOF
# Yellow Power International - Production Environment
# Generated: $(date '+%Y-%m-%d %H:%M:%S')

# NextAuth Configuration
NEXTAUTH_SECRET=$NEXTAUTH_SECRET
NEXTAUTH_URL=$SITE_URL

# Admin Authentication
ADMIN_EMAIL=$ADMIN_EMAIL
ADMIN_PASSWORD=$ADMIN_PASSWORD

# AI Features (disabled by default - add API keys to enable)
NEXT_PUBLIC_ENABLE_POWERBOT=false
NEXT_PUBLIC_ENABLE_AI_SEARCH=false

# Email Configuration (add API key to enable)
EMAIL_PROVIDER=resend
EMAIL_FROM=noreply@yellowpowerinternational.com
EMAIL_TO=info@yellowpowerinternational.com

# Site Configuration
NEXT_PUBLIC_SITE_URL=$SITE_URL
NEXT_PUBLIC_WHATSAPP_NUMBER=233268066942

# Social Media
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/company/yellow-power-international
NEXT_PUBLIC_TWITTER_URL=https://twitter.com/yellowpowerintl
NEXT_PUBLIC_FACEBOOK_URL=https://facebook.com/yellowpowerintl
NEXT_PUBLIC_INSTAGRAM_URL=https://instagram.com/yellowpowerintl
NEXT_PUBLIC_YOUTUBE_URL=https://youtube.com/@yellowpowerintl
EOF

scp_exec "/tmp/ypi-env-$$" "$DEPLOY_PATH/.env.production.local"
rm -f "/tmp/ypi-env-$$"

success "Environment file created"
echo "  Admin Email: $ADMIN_EMAIL"
echo "  Site URL: $SITE_URL"

# Step 5: Install dependencies and build
step "Installing dependencies and building application..."

ssh_exec "cd $DEPLOY_PATH && npm ci --production=false"
success "Dependencies installed"

ssh_exec "cd $DEPLOY_PATH && npm run build"
success "Application built"

# Step 6: Start application with PM2
step "Starting application with PM2..."

ssh_exec "pm2 delete ypi-website" || true
ssh_exec "cd $DEPLOY_PATH && pm2 start npm --name ypi-website -- start -- -p $APP_PORT"
ssh_exec "pm2 save"
ssh_exec "pm2 startup systemd -u root --hp /root" || true

success "Application started on port $APP_PORT"

# Wait for app to start
sleep 3

# Check if app is running
echo "Checking application status..."
ssh_exec "pm2 status ypi-website"

# Step 7: Configure Nginx
step "Configuring Nginx reverse proxy..."

SERVER_NAME="${DOMAIN:+$DOMAIN www.$DOMAIN}"
SERVER_NAME="${SERVER_NAME:-_}"

cat > /tmp/ypi-nginx-$$ << 'NGINX_EOF'
server {
    listen 80;
    server_name SERVER_NAME_PLACEHOLDER;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Proxy to Next.js app
    location / {
        proxy_pass http://127.0.0.1:APP_PORT_PLACEHOLDER;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase body size for file uploads
    client_max_body_size 10M;
}
NGINX_EOF

# Replace placeholders
sed -i "s/SERVER_NAME_PLACEHOLDER/$SERVER_NAME/g" /tmp/ypi-nginx-$$
sed -i "s/APP_PORT_PLACEHOLDER/$APP_PORT/g" /tmp/ypi-nginx-$$

scp_exec "/tmp/ypi-nginx-$$" "/etc/nginx/sites-available/ypi-website"
rm -f "/tmp/ypi-nginx-$$"

ssh_exec "ln -sf /etc/nginx/sites-available/ypi-website /etc/nginx/sites-enabled/ypi-website"
ssh_exec "rm -f /etc/nginx/sites-enabled/default" || true
ssh_exec "nginx -t"
ssh_exec "systemctl reload nginx"

success "Nginx configured and reloaded"

# Step 8: Configure firewall
step "Configuring firewall..."

if ssh_exec "which ufw" &> /dev/null; then
    ssh_exec "ufw allow OpenSSH" || true
    ssh_exec "ufw allow 'Nginx Full'" || true
    ssh_exec "ufw --force enable" || true
    success "Firewall configured"
else
    warning "UFW not found, skipping firewall configuration"
fi

# Final verification
step "Verifying deployment..."

HTTP_CODE=$(ssh_exec "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:$APP_PORT")
if [ "$HTTP_CODE" = "200" ]; then
    success "Application is responding correctly"
else
    warning "Application returned status: $HTTP_CODE"
fi

# Summary
echo ""
echo -e "${GREEN}========================================"
echo "  DEPLOYMENT COMPLETED SUCCESSFULLY"
echo -e "========================================${NC}"
echo ""
echo -e "🌐 Website URL: ${CYAN}${SITE_URL}${NC}"
echo ""
echo -e "🔐 Admin Dashboard: ${CYAN}${SITE_URL}/admin${NC}"
echo -e "   Email: ${GRAY}$ADMIN_EMAIL${NC}"
echo -e "   Password: ${GRAY}[as configured]${NC}"
echo ""

if [ -z "$DOMAIN" ]; then
    echo -e "${YELLOW}📋 NEXT STEPS:${NC}"
    echo "   1. Test the site at http://$SERVER_IP"
    echo "   2. Configure DNS A record: yellowpowerinternational.com -> $SERVER_IP"
    echo "   3. Re-run deployment with domain:"
    echo "      ./deploy-to-interserver.sh --domain yellowpowerinternational.com"
    echo "   4. Install SSL certificate:"
    echo "      ssh root@$SERVER_IP"
    echo "      apt install -y certbot python3-certbot-nginx"
    echo "      certbot --nginx -d yellowpowerinternational.com -d www.yellowpowerinternational.com"
    echo ""
else
    echo -e "${YELLOW}📋 NEXT STEPS:${NC}"
    echo "   1. Ensure DNS is configured: $DOMAIN -> $SERVER_IP"
    echo "   2. Install SSL certificate:"
    echo "      ssh root@$SERVER_IP"
    echo "      apt install -y certbot python3-certbot-nginx"
    echo "      certbot --nginx -d $DOMAIN -d www.$DOMAIN"
    echo ""
fi

echo -e "${CYAN}🔧 USEFUL COMMANDS:${NC}"
echo "   View logs:    ssh root@$SERVER_IP 'pm2 logs ypi-website'"
echo "   Restart app:  ssh root@$SERVER_IP 'pm2 restart ypi-website'"
echo "   App status:   ssh root@$SERVER_IP 'pm2 status'"
echo ""
