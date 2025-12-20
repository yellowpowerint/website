# AWS Deployment Steps for Yellow Power International Website

**Domain:** yellowpowerinternational.com  
**Registrar:** Namecheap  
**GitHub:** https://github.com/webblabsorg/ypi-website.git

---

## Prerequisites Checklist

Before starting, ensure you have:
- [ ] AWS account created and logged in
- [ ] Namecheap account access
- [ ] AWS CLI installed on your computer
- [ ] Node.js and npm installed

---

## STEP 1: Set Up Route 53 Hosted Zone ✅

### 1.1 Create Hosted Zone
1. AWS Console → Search for **"Route 53"**
2. Click **"Hosted zones"** (left sidebar)
3. Click **"Create hosted zone"**
4. Enter:
   - **Domain name:** `yellowpowerinternational.com`
   - **Type:** Public hosted zone
5. Click **"Create hosted zone"**

### 1.2 Copy Nameservers
After creation, you'll see 4 nameservers. **Copy all 4** (example format):
```
ns-1234.awsdns-12.com
ns-5678.awsdns-34.net
ns-9012.awsdns-56.org
ns-3456.awsdns-78.co.uk
```

### 1.3 Update Namecheap
1. Login to **Namecheap**
2. **Domain List** → **yellowpowerinternational.com** → **Manage**
3. **Nameservers** section → Select **"Custom DNS"**
4. Paste all 4 Route 53 nameservers
5. Click **Save**

⏱️ **Wait 5-60 minutes for DNS propagation**

---

## STEP 2: Request SSL Certificate (ACM) ✅

### 2.1 Switch to US East 1
1. Top-right corner → Click region dropdown
2. Select **"US East (N. Virginia) us-east-1"**

### 2.2 Request Certificate
1. Search for **"Certificate Manager"** or **"ACM"**
2. Click **"Request certificate"**
3. Select **"Request a public certificate"** → **Next**

### 2.3 Add Domains
Add these domains:
```
yellowpowerinternational.com
www.yellowpowerinternational.com
```
- Use **"Add another name to this certificate"** for the second domain
- **Validation method:** DNS validation
- Click **"Request"**

### 2.4 Validate Certificate
1. Click on the **Certificate ID**
2. Click **"Create records in Route 53"** button
3. Click **"Create records"** in popup

⏱️ **Wait 5-30 minutes for status to change to "Issued"**

---

## STEP 3: Create S3 Bucket ✅

### 3.1 Create Bucket
1. Search for **"S3"**
2. Click **"Create bucket"**
3. Configure:
   - **Bucket name:** `yellowpower-website-prod` (or unique name)
   - **Region:** EU (Ireland) eu-west-1
   - **Block Public Access:** Keep ALL CHECKED ✅
   - **Bucket Versioning:** Optional
   - **Default encryption:** SSE-S3 (default)
4. Click **"Create bucket"**

**Do NOT enable "Static website hosting"**

---

## STEP 4: Create CloudFront Distribution ✅

### 4.1 Create Distribution
1. Search for **"CloudFront"**
2. Click **"Create distribution"**

### 4.2 Origin Settings
- **Origin domain:** Select your S3 bucket from dropdown
- **Origin access:** Origin access control settings (recommended)
- Click **"Create new OAC"** → Keep default name → **Create**

### 4.3 Cache Behavior
- **Viewer protocol policy:** Redirect HTTP to HTTPS
- **Allowed HTTP methods:** GET, HEAD
- **Cache policy:** CachingOptimized

### 4.4 Settings
**Alternate domain names (CNAMEs):**
```
yellowpowerinternational.com
www.yellowpowerinternational.com
```

**Custom SSL certificate:**
- Select the certificate you created (must be "Issued" status)

**Default root object:** `index.html`

### 4.5 Create and Update Policy
1. Click **"Create distribution"**
2. After creation, click **"Copy policy"** from the blue banner
3. Click **"Go to S3 bucket permissions"**
4. **Bucket policy** → **Edit** → Paste policy → **Save**

⏱️ **CloudFront deployment takes 10-20 minutes**

**Copy the Distribution domain name** (e.g., `d1234abcd.cloudfront.net`)  
**Copy the Distribution ID** (e.g., `E1234ABCD5678`)

---

## STEP 5: Configure Route 53 DNS Records ✅

### 5.1 Create Apex Record
1. Route 53 → Hosted zones → **yellowpowerinternational.com**
2. Click **"Create record"**
3. Configure:
   - **Record name:** Leave blank
   - **Record type:** A
   - **Alias:** Toggle ON ✅
   - **Route traffic to:** Alias to CloudFront distribution
   - **Choose distribution:** Select your distribution
4. Click **"Create records"**

### 5.2 Create WWW Record
1. Click **"Create record"**
2. Configure:
   - **Record name:** `www`
   - **Record type:** A
   - **Alias:** Toggle ON ✅
   - **Route traffic to:** Alias to CloudFront distribution
   - **Choose distribution:** Same distribution
3. Click **"Create records"**

---

## STEP 6: Install AWS CLI ✅

### 6.1 Download AWS CLI
**Windows:**
- Download from: https://awscli.amazonaws.com/AWSCLIV2.msi
- Run installer
- Restart PowerShell/Terminal

**Verify installation:**
```powershell
aws --version
```

### 6.2 Configure AWS CLI
Run this command and enter your AWS credentials:
```powershell
aws configure
```

You'll need:
- **AWS Access Key ID:** (Get from AWS Console → IAM → Users → Security credentials)
- **AWS Secret Access Key:** (From same location)
- **Default region:** `eu-west-1`
- **Default output format:** `json`

---

## STEP 7: Build and Deploy Website ✅

### 7.1 Build the Website
Open PowerShell and navigate to the project:
```powershell
cd "C:\Users\Plange\Downloads\Projects\ypi-website\dev"
npm install
npm run build
```

This creates an `out` folder with static files.

### 7.2 Deploy to S3 (Manual Method)
```powershell
# Upload static assets (long cache)
aws s3 sync ./out s3://yellowpower-website-prod --delete --cache-control "public,max-age=31536000,immutable" --exclude "*.html" --exclude "*.json"

# Upload HTML files (short cache)
aws s3 sync ./out s3://yellowpower-website-prod --delete --cache-control "public,max-age=0,must-revalidate" --exclude "*" --include "*.html" --include "*.json"
```

### 7.3 Invalidate CloudFront Cache
Replace `YOUR_DISTRIBUTION_ID` with your actual CloudFront Distribution ID:
```powershell
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

### 7.4 Deploy Using Script (Automated Method)
```powershell
cd "C:\Users\Plange\Downloads\Projects\ypi-website\prod"

# Deploy without CloudFront invalidation
.\deploy-to-aws.ps1 -BucketName "yellowpower-website-prod"

# Deploy with CloudFront invalidation
.\deploy-to-aws.ps1 -BucketName "yellowpower-website-prod" -CloudFrontDistributionId "YOUR_DISTRIBUTION_ID"
```

---

## STEP 8: Set Up AWS Budgets (Cost Control) ✅

### 8.1 Create Budget
1. Search for **"AWS Budgets"**
2. Click **"Create budget"**
3. Select **"Customize (advanced)"**
4. Choose **"Cost budget"**
5. Configure:
   - **Budget name:** "YPI Website Monthly Budget"
   - **Period:** Monthly
   - **Budget amount:** $50 (adjust as needed)
6. Set alerts:
   - Alert at 50% ($25)
   - Alert at 80% ($40)
   - Alert at 100% ($50)
7. Enter your email for notifications
8. Click **"Create budget"**

---

## STEP 9: Set Up CloudWatch Alarms ✅

### 9.1 Create CloudFront Error Alarm
1. Search for **"CloudWatch"**
2. **Alarms** → **Create alarm**
3. **Select metric** → **CloudFront** → **Per-Distribution Metrics**
4. Select your distribution → Check **"4xxErrorRate"**
5. Configure:
   - **Threshold:** Greater than 5%
   - **Period:** 5 minutes
6. Add email notification
7. Create alarm

Repeat for **5xxErrorRate** with threshold > 1%

---

## Verification Checklist

After deployment, verify:
- [ ] https://yellowpowerinternational.com loads correctly
- [ ] https://www.yellowpowerinternational.com loads correctly
- [ ] SSL certificate shows as valid (green padlock)
- [ ] All images and assets load properly
- [ ] Navigation works on all pages
- [ ] Mobile responsive design works
- [ ] AWS Budget is configured
- [ ] CloudWatch alarms are active

---

## Future Deployments

For content updates:
1. Make changes to code in `/dev` folder
2. Commit to GitHub
3. Run deployment script:
   ```powershell
   cd "C:\Users\Plange\Downloads\Projects\ypi-website\prod"
   .\deploy-to-aws.ps1 -BucketName "yellowpower-website-prod" -CloudFrontDistributionId "YOUR_DISTRIBUTION_ID"
   ```

---

## Troubleshooting

### DNS not resolving
- Wait longer (DNS can take up to 48 hours)
- Check nameservers in Namecheap match Route 53
- Use `nslookup yellowpowerinternational.com` to check

### Certificate not validating
- Ensure DNS validation records were created in Route 53
- Wait 30 minutes
- Check certificate status in ACM

### Website shows 403 Forbidden
- Check S3 bucket policy was updated with CloudFront OAC policy
- Verify CloudFront distribution is "Deployed" status

### Images not loading
- Check Next.js config has `unoptimized: true`
- Verify build completed successfully
- Check browser console for errors

---

## Cost Estimates

**Monthly costs (approximate):**
- Route 53 Hosted Zone: $0.50/month
- CloudFront: $0-5 (depends on traffic)
- S3 Storage: $0.01-1 (depends on content size)
- Data Transfer: Mostly free tier

**Total estimated: $1-10/month** for a low-traffic company website

---

## Support Resources

- AWS Documentation: https://docs.aws.amazon.com/
- AWS Support: https://console.aws.amazon.com/support/
- Next.js Deployment: https://nextjs.org/docs/deployment

---

**Last Updated:** December 19, 2024  
**Status:** Ready for deployment
