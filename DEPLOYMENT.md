# YPI Website - InterServer Deployment Guide

Complete guide for deploying the Yellow Power International website to InterServer VPS.

---

## 🚀 Quick Start

### Prerequisites

**On your Windows PC:**
- PowerShell 5.1 or later
- OpenSSH Client or PuTTY installed
  - **OpenSSH (recommended):** `Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0`
  - **PuTTY:** Download from https://www.putty.org/

**On the server:**
- Ubuntu 24.04 64-bit
- Root access
- IP: 216.158.230.187

---

## 📦 Automated Deployment

### Option 1: Deploy to IP (Initial Testing)

```powershell
cd c:\Users\Plange\Downloads\Projects\ypi-website
.\deploy-to-interserver.ps1 -ServerPassword "your_password"
```

This will:
1. Install Node.js 20, PM2, and Nginx
2. Transfer your website files
3. Build the Next.js application
4. Start the app on port 3002 with PM2
5. Configure Nginx reverse proxy
6. Make the site accessible at `http://216.158.230.187`

### Option 2: Deploy with Domain

After DNS is configured:

```powershell
.\deploy-to-interserver.ps1 -ServerPassword "your_password" -Domain "yellowpowerinternational.com"
```

---

## 🔧 Script Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `ServerPassword` | ✅ Yes | - | SSH password for root user |
| `ServerIP` | No | 216.158.230.187 | VPS IP address |
| `ServerUser` | No | root | SSH username |
| `DeployPath` | No | /var/www/yellowpower-website | Deployment directory |
| `AppPort` | No | 3002 | Port for Next.js app |
| `Domain` | No | - | Domain name (e.g., yellowpowerinternational.com) |
| `AdminEmail` | No | admin@yellowpowerinternational.com | Admin dashboard email |
| `AdminPassword` | No | (prompted) | Admin dashboard password |

### Examples

**Basic deployment:**
```powershell
.\deploy-to-interserver.ps1 -ServerPassword "Tu4Pu8_Co9-Fug6_K4-Bi0"
```

**With custom admin credentials:**
```powershell
.\deploy-to-interserver.ps1 `
  -ServerPassword "Tu4Pu8_Co9-Fug6_K4-Bi0" `
  -AdminEmail "admin@ypi.com" `
  -AdminPassword "SecurePass123!"
```

**Full production deployment:**
```powershell
.\deploy-to-interserver.ps1 `
  -ServerPassword "Tu4Pu8_Co9-Fug6_K4-Bi0" `
  -Domain "yellowpowerinternational.com" `
  -AdminPassword "SecurePass123!"
```

---

## 🌐 Post-Deployment Steps

### 1. Test the Deployment

Visit in your browser:
- **Website:** `http://216.158.230.187`
- **Admin Dashboard:** `http://216.158.230.187/admin`

### 2. Configure DNS

In your domain registrar (e.g., Namecheap, GoDaddy, Cloudflare):

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 216.158.230.187 | 300 |
| A | www | 216.158.230.187 | 300 |

**Or use CNAME for www:**

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | @ | 216.158.230.187 | 300 |
| CNAME | www | yellowpowerinternational.com | 300 |

Wait 5-15 minutes for DNS propagation.

### 3. Re-deploy with Domain

Once DNS is live:

```powershell
.\deploy-to-interserver.ps1 `
  -ServerPassword "your_password" `
  -Domain "yellowpowerinternational.com"
```

This updates the Nginx configuration and environment variables for the domain.

### 4. Install SSL Certificate (HTTPS)

SSH into the server:

```bash
ssh root@216.158.230.187
```

Install Certbot:

```bash
apt install -y certbot python3-certbot-nginx
```

Obtain and install SSL certificate:

```bash
certbot --nginx -d yellowpowerinternational.com -d www.yellowpowerinternational.com
```

Follow the prompts:
- Enter your email address
- Agree to terms of service
- Choose whether to redirect HTTP to HTTPS (recommended: Yes)

Certbot will:
- Obtain a free SSL certificate from Let's Encrypt
- Automatically configure Nginx for HTTPS
- Set up auto-renewal

Test auto-renewal:

```bash
certbot renew --dry-run
```

### 5. Update Environment Variables

After SSL is installed, update the site URL:

```bash
ssh root@216.158.230.187
cd /var/www/yellowpower-website
nano .env.production.local
```

Change:
```env
NEXTAUTH_URL=https://yellowpowerinternational.com
NEXT_PUBLIC_SITE_URL=https://yellowpowerinternational.com
```

Restart the app:

```bash
pm2 restart ypi-website
```

---

## 🔐 Security Recommendations

### 1. Change SSH Password

After first deployment:

```bash
ssh root@216.158.230.187
passwd
```

### 2. Set Up SSH Key Authentication (Recommended)

**On your Windows PC:**

```powershell
ssh-keygen -t ed25519 -C "your_email@example.com"
type $env:USERPROFILE\.ssh\id_ed25519.pub | ssh root@216.158.230.187 "mkdir -p ~/.ssh && cat >> ~/.ssh/authorized_keys"
```

**On the server:**

```bash
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys
```

**Disable password authentication:**

```bash
nano /etc/ssh/sshd_config
```

Set:
```
PasswordAuthentication no
PubkeyAuthentication yes
```

Restart SSH:
```bash
systemctl restart sshd
```

### 3. Configure Firewall

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

### 4. Set Up Fail2Ban (Optional)

```bash
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
```

---

## 🛠️ Server Management Commands

### SSH Access

```bash
ssh root@216.158.230.187
```

### PM2 Application Management

```bash
# View application status
pm2 status

# View logs (live)
pm2 logs ypi-website

# View last 100 lines
pm2 logs ypi-website --lines 100

# Restart application
pm2 restart ypi-website

# Stop application
pm2 stop ypi-website

# Start application
pm2 start ypi-website

# View detailed info
pm2 info ypi-website

# Monitor resources
pm2 monit
```

### Nginx Management

```bash
# Test configuration
nginx -t

# Reload configuration
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View error logs
tail -f /var/log/nginx/error.log

# View access logs
tail -f /var/log/nginx/access.log
```

### Application Updates

**Method 1: Re-run deployment script (recommended)**

```powershell
.\deploy-to-interserver.ps1 -ServerPassword "your_password" -Domain "yellowpowerinternational.com"
```

**Method 2: Manual update via SSH**

```bash
ssh root@216.158.230.187
cd /var/www/yellowpower-website

# Pull latest changes (if using Git)
git pull

# Or upload new files via SCP from your PC:
# scp -r dev/* root@216.158.230.187:/var/www/yellowpower-website/

# Rebuild and restart
npm ci
npm run build
pm2 restart ypi-website
```

---

## 🔍 Troubleshooting

### Application Won't Start

```bash
# Check PM2 logs
pm2 logs ypi-website --err

# Check if port is in use
netstat -tulpn | grep 3002

# Restart with verbose logging
pm2 delete ypi-website
cd /var/www/yellowpower-website
pm2 start npm --name ypi-website -- start -- -p 3002
pm2 logs ypi-website
```

### Nginx Errors

```bash
# Check configuration syntax
nginx -t

# View error logs
tail -f /var/log/nginx/error.log

# Check if Nginx is running
systemctl status nginx

# Restart Nginx
systemctl restart nginx
```

### SSL Certificate Issues

```bash
# Check certificate status
certbot certificates

# Renew certificate manually
certbot renew

# Test renewal
certbot renew --dry-run
```

### Application Shows Old Version

```bash
# Clear Next.js cache and rebuild
cd /var/www/yellowpower-website
rm -rf .next
npm run build
pm2 restart ypi-website
```

### Out of Memory

```bash
# Check memory usage
free -h

# Increase Node.js memory limit
pm2 delete ypi-website
cd /var/www/yellowpower-website
pm2 start npm --name ypi-website --node-args="--max-old-space-size=2048" -- start -- -p 3002
pm2 save
```

---

## 📊 Monitoring

### Check Application Health

```bash
# HTTP status check
curl -I http://localhost:3002

# Response time check
curl -w "@-" -o /dev/null -s http://localhost:3002 <<'EOF'
time_namelookup:  %{time_namelookup}\n
time_connect:  %{time_connect}\n
time_starttransfer:  %{time_starttransfer}\n
time_total:  %{time_total}\n
EOF
```

### System Resources

```bash
# CPU and memory usage
htop

# Disk usage
df -h

# PM2 monitoring
pm2 monit
```

---

## 🔄 Backup and Restore

### Backup

```bash
# Backup application files
tar -czf /root/ypi-website-backup-$(date +%Y%m%d).tar.gz /var/www/yellowpower-website

# Backup environment file
cp /var/www/yellowpower-website/.env.production.local /root/.env.production.local.backup

# Download backup to your PC
scp root@216.158.230.187:/root/ypi-website-backup-*.tar.gz ./
```

### Restore

```bash
# Upload backup to server
scp ypi-website-backup-*.tar.gz root@216.158.230.187:/tmp/

# Extract on server
ssh root@216.158.230.187
cd /var/www
rm -rf yellowpower-website
tar -xzf /tmp/ypi-website-backup-*.tar.gz
cd yellowpower-website
npm ci
pm2 restart ypi-website
```

---

## 🌟 Optional Features

### Enable Email Notifications

Edit environment file:

```bash
nano /var/www/yellowpower-website/.env.production.local
```

Add Resend API key:

```env
RESEND_API_KEY=re_your_api_key_here
```

Restart:

```bash
pm2 restart ypi-website
```

### Enable AI Features

Add to environment file:

```env
NEXT_PUBLIC_ENABLE_POWERBOT=true
NEXT_PUBLIC_ENABLE_AI_SEARCH=true
OPENAI_API_KEY=sk-your-openai-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_ENVIRONMENT=your-pinecone-env
PINECONE_INDEX_NAME=ypi-knowledge-base
```

Restart:

```bash
pm2 restart ypi-website
```

---

## 📞 Support

**Server Details:**
- IP: 216.158.230.187
- OS: Ubuntu 24.04 64-bit
- User: root
- Port: 22

**Application:**
- Framework: Next.js 14
- Runtime: Node.js 20
- Process Manager: PM2
- Web Server: Nginx
- App Port: 3002

**Useful Links:**
- [Next.js Documentation](https://nextjs.org/docs)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/)
- [Nginx Documentation](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)

---

**Last Updated:** December 26, 2025
