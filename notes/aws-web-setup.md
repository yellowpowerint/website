I'll help you deploy your website to AWS step by step. Let me first review the `aws.md` file and examine your project structure to understand what we're working with.

I'll guide you through deploying your website to AWS step by step. Let me first examine your project structure to understand what we're working with.

Perfect! I can see you have a Next.js website ready to deploy. Based on the [aws.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/aws.md:0:0-0:0) file and your project structure, I'll guide you through deploying your company website to AWS step by step.

# AWS Deployment Guide for Yellow Power International Website

I'll guide you through deploying your Next.js website to AWS step by step. Since you're new to AWS, I'll provide detailed instructions for each step.

## Overview

Your website will be deployed as a **static site** using:
- **S3** for hosting static files
- **CloudFront** for global CDN and HTTPS
- **Route 53** for DNS management
- **ACM** for free SSL certificates

This is the most cost-effective approach for a company website.

---

## **STEP 1: Set Up Route 53 Hosted Zone**

Since you have the AWS website open at https://aws.amazon.com, let's start:

### 1.1 Navigate to Route 53
1. In the AWS Console search bar (top), type **"Route 53"** and click on it
2. Click **"Hosted zones"** in the left sidebar
3. Click the orange **"Create hosted zone"** button

### 1.2 Create the Hosted Zone
Fill in the form:
- **Domain name:** `yellowpowerinternational.com`
- **Description:** (optional) "Yellow Power International company website"
- **Type:** Select **"Public hosted zone"**
- Click **"Create hosted zone"**

### 1.3 Copy the Nameservers
After creation, you'll see 4 nameservers listed (they look like `ns-123.awsdns-12.com`). 

**Copy all 4 nameservers** - you'll need them for Namecheap.

Example format:
```
ns-1234.awsdns-12.com
ns-5678.awsdns-34.net
ns-9012.awsdns-56.org
ns-3456.awsdns-78.co.uk
```

### 1.4 Update Namecheap DNS Settings
1. Log into your **Namecheap account**
2. Go to **Domain List** → find `yellowpowerinternational.com` → click **"Manage"**
3. Find the **"Nameservers"** section
4. Select **"Custom DNS"** from the dropdown
5. Paste all 4 Route 53 nameservers (one per field)
6. Click **"Save"** or the checkmark icon

**⏱️ DNS propagation takes 5-60 minutes (sometimes up to 48 hours)**

---

## **STEP 2: Request SSL Certificate (ACM)**

CloudFront requires certificates from the **us-east-1** region.

### 2.1 Switch to US East 1 Region
1. In the top-right corner of AWS Console, click the **region dropdown** (it might say your current region)
2. Select **"US East (N. Virginia) us-east-1"**

### 2.2 Navigate to ACM (Certificate Manager)
1. In the search bar, type **"Certificate Manager"** or **"ACM"**
2. Click on **AWS Certificate Manager**

### 2.3 Request Certificate
1. Click **"Request certificate"** (orange button)
2. Select **"Request a public certificate"** → Click **"Next"**

### 2.4 Add Domain Names
Add these domain names (one per line):
```
yellowpowerinternational.com
www.yellowpowerinternational.com
```

- Click **"Add another name to this certificate"** to add the second domain
- **Validation method:** Select **"DNS validation - recommended"**
- **Key algorithm:** RSA 2048 (default)
- Click **"Request"**

### 2.5 Validate the Certificate
1. After requesting, you'll see the certificate with status **"Pending validation"**
2. Click on the **Certificate ID** to view details
3. You'll see DNS validation records for each domain
4. Click **"Create records in Route 53"** button (AWS will auto-create the validation records)
5. Click **"Create records"** in the popup

**⏱️ Wait 5-30 minutes for validation to complete. The status will change to "Issued"**

You can continue with the next steps while waiting.

---

## **STEP 3: Create S3 Bucket for Website**

### 3.1 Navigate to S3
1. In the search bar, type **"S3"**
2. Click on **S3** service

### 3.2 Create Bucket
1. Click **"Create bucket"** (orange button)
2. Fill in the form:
   - **Bucket name:** `yellowpower-website-prod` (must be globally unique - if taken, try `ypi-website-prod-2025`)
   - **AWS Region:** Select **"EU (Ireland) eu-west-1"** (closest to Ghana)
   - **Block Public Access settings:** Keep **"Block all public access"** CHECKED ✅
   - **Bucket Versioning:** Optional (can enable for backup)
   - **Default encryption:** Keep **"Server-side encryption with Amazon S3 managed keys (SSE-S3)"** selected
3. Click **"Create bucket"** at the bottom

**Important:** Do NOT enable "Static website hosting" - we'll use CloudFront instead.

---

## **STEP 4: Create CloudFront Distribution**

### 4.1 Navigate to CloudFront
1. In the search bar, type **"CloudFront"**
2. Click on **CloudFront** service

### 4.2 Create Distribution
1. Click **"Create distribution"** (orange button)

### 4.3 Configure Origin Settings
**Origin domain:**
- Click the dropdown and select your S3 bucket: `yellowpower-website-prod.s3.eu-west-1.amazonaws.com`

**Origin access:**
- Select **"Origin access control settings (recommended)"**
- Click **"Create new OAC"** button
- Keep the default name → Click **"Create"**

**Origin path:** Leave blank

### 4.4 Configure Default Cache Behavior
- **Viewer protocol policy:** Select **"Redirect HTTP to HTTPS"**
- **Allowed HTTP methods:** Select **"GET, HEAD"**
- **Cache policy:** Select **"CachingOptimized"**
- Leave other settings as default

### 4.5 Configure Settings
**Alternate domain names (CNAMEs):**
Add both domains:
```
yellowpowerinternational.com
www.yellowpowerinternational.com
```

**Custom SSL certificate:**
- Click the dropdown
- Select the certificate you created earlier (should show `yellowpowerinternational.com`)
- If you don't see it, wait for the certificate to be "Issued" in Step 2

**Default root object:** `index.html`

### 4.6 Create Distribution
1. Scroll to the bottom
2. Click **"Create distribution"**

### 4.7 Update S3 Bucket Policy
After creation, you'll see a **blue banner** saying "The S3 bucket policy needs to be updated"

1. Click **"Copy policy"** button
2. Click **"Go to S3 bucket permissions to update policy"**
3. Scroll to **"Bucket policy"** section
4. Click **"Edit"**
5. Paste the copied policy
6. Click **"Save changes"**

**⏱️ CloudFront deployment takes 10-20 minutes**

Copy the **Distribution domain name** (looks like `d1234abcd.cloudfront.net`) - you'll need it for DNS.

---

## **STEP 5: Configure Route 53 DNS Records**

### 5.1 Navigate to Route 53
1. Go back to **Route 53** → **Hosted zones**
2. Click on **yellowpowerinternational.com**

### 5.2 Create Record for Apex Domain
1. Click **"Create record"**
2. Fill in:
   - **Record name:** Leave blank (this is for the apex domain)
   - **Record type:** **A**
   - **Alias:** Toggle **ON** ✅
   - **Route traffic to:** Select **"Alias to CloudFront distribution"**
   - **Choose distribution:** Select your CloudFront distribution
3. Click **"Create records"**

### 5.3 Create Record for WWW
1. Click **"Create record"** again
2. Fill in:
   - **Record name:** `www`
   - **Record type:** **A**
   - **Alias:** Toggle **ON** ✅
   - **Route traffic to:** Select **"Alias to CloudFront distribution"**
   - **Choose distribution:** Select the same CloudFront distribution
3. Click **"Create records"**

---

## **STEP 6: Build and Deploy Website**

Now let's build your Next.js website and upload it to S3.

### 6.1 Build the Website Locally

I'll help you build the static version of your website. First, let me check your Next.js configuration:

I need to update the Next.js config to enable static export for AWS S3 deployment. Let me modify the configuration:

Now let me create a deployment script to help you build and upload the website to S3:

Now let me create a step-by-step guide document for you:

# ✅ AWS Deployment Guide Complete

I've prepared everything you need to deploy your Yellow Power International website to AWS. Here's what I've done:

## 📋 What's Ready

### 1. **Configuration Updated**
- Modified [next.config.mjs](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/dev/next.config.mjs:0:0-0:0) to enable static export for S3 hosting
- Set images to unoptimized mode (required for static hosting)

### 2. **Deployment Script Created**
- [prod/deploy-to-aws.ps1](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/prod/deploy-to-aws.ps1:0:0-0:0) - Automated PowerShell script that:
  - Builds your Next.js website
  - Uploads to S3 with proper caching
  - Invalidates CloudFront cache
  - Includes error checking and status messages

### 3. **Complete Step-by-Step Guide**
- [notes/AWS_DEPLOYMENT_STEPS.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/AWS_DEPLOYMENT_STEPS.md:0:0-0:0) - Detailed walkthrough with:
  - All 9 deployment steps
  - Screenshots descriptions
  - Troubleshooting section
  - Cost estimates (~$1-10/month)
  - Verification checklist

---

## 🚀 Quick Start - Follow These Steps

Since you have the AWS website open, here's what to do **right now**:

### **STEP 1: Create Route 53 Hosted Zone** (5 minutes)

1. In AWS Console search bar → type **"Route 53"** → click it
2. Left sidebar → **"Hosted zones"** → **"Create hosted zone"** button
3. Fill in:
   - Domain name: `yellowpowerinternational.com`
   - Type: Public hosted zone
4. Click **"Create hosted zone"**
5. **COPY the 4 nameservers** shown (looks like `ns-123.awsdns-45.com`)

### **STEP 2: Update Namecheap** (2 minutes)

1. Open Namecheap → Domain List → **yellowpowerinternational.com** → **Manage**
2. Nameservers section → Select **"Custom DNS"**
3. Paste all 4 Route 53 nameservers
4. Save

⏱️ **Wait 10-30 minutes for DNS to propagate before continuing**

---

### **STEP 3: Request SSL Certificate** (5 minutes)

1. AWS Console top-right → Change region to **"US East (N. Virginia)"**
2. Search **"Certificate Manager"** → **"Request certificate"**
3. Select **"Request a public certificate"** → Next
4. Add domains:
   ```
   yellowpowerinternational.com
   www.yellowpowerinternational.com
   ```
5. Validation: **DNS validation** → **Request**
6. Click certificate ID → **"Create records in Route 53"** → **Create records**

⏱️ **Wait 5-30 minutes for certificate to show "Issued" status**

---

### **STEP 4: Create S3 Bucket** (3 minutes)

1. Search **"S3"** → **"Create bucket"**
2. Configure:
   - Bucket name: `yellowpower-website-prod` (must be unique globally)
   - Region: **EU (Ireland) eu-west-1**
   - Block Public Access: **Keep ALL checked** ✅
3. **Create bucket**

---

### **STEP 5: Create CloudFront Distribution** (10 minutes)

1. Search **"CloudFront"** → **"Create distribution"**
2. Origin domain: Select your S3 bucket
3. Origin access: **"Origin access control settings"** → **Create new OAC**
4. Viewer protocol: **"Redirect HTTP to HTTPS"**
5. Alternate domains (CNAMEs):
   ```
   yellowpowerinternational.com
   www.yellowpowerinternational.com
   ```
6. Custom SSL: Select your certificate (must be "Issued")
7. Default root object: `index.html`
8. **Create distribution**
9. **Copy the policy** from blue banner → Go to S3 → Bucket policy → Paste → Save

**Save these values:**
- Distribution domain: `d1234abcd.cloudfront.net`
- Distribution ID: `E1234ABCD5678`

---

### **STEP 6: Create DNS Records** (3 minutes)

1. Route 53 → Hosted zones → **yellowpowerinternational.com**
2. **Create record** for apex:
   - Name: blank
   - Type: A
   - Alias: ON
   - Route to: CloudFront distribution
3. **Create record** for www:
   - Name: `www`
   - Type: A
   - Alias: ON
   - Route to: Same CloudFront distribution

---

### **STEP 7: Install AWS CLI & Deploy** (15 minutes)

**Install AWS CLI:**
```powershell
# Download and install from:
# https://awscli.amazonaws.com/AWSCLIV2.msi

# Verify installation
aws --version

# Configure credentials
aws configure
```

**Build and Deploy:**
```powershell
# Navigate to project
cd "C:\Users\Plange\Downloads\Projects\ypi-website\prod"

# Run deployment script (replace with your bucket name and distribution ID)
.\deploy-to-aws.ps1 -BucketName "yellowpower-website-prod" -CloudFrontDistributionId "YOUR_DISTRIBUTION_ID"
```

---

## 📊 Expected Timeline

| Step | Time | Can Start |
|------|------|-----------|
| Route 53 + Namecheap | 10 min | Now |
| SSL Certificate | 30 min | After DNS propagates |
| S3 + CloudFront | 20 min | Anytime |
| DNS Records | 5 min | After CloudFront created |
| Deploy Website | 15 min | After all above |
| **Total** | **~2 hours** | (including wait times) |

---

## 📝 Important Notes

1. **DNS Propagation**: Can take 5-60 minutes (sometimes up to 48 hours)
2. **Certificate Validation**: Must wait for "Issued" status before using in CloudFront
3. **CloudFront Deployment**: Takes 10-20 minutes to deploy globally
4. **First Deployment**: May take longer; subsequent updates are faster

---

## 📚 Documentation Available

- **Full Guide**: [notes/AWS_DEPLOYMENT_STEPS.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/AWS_DEPLOYMENT_STEPS.md:0:0-0:0) (detailed walkthrough)
- **AWS Plan**: [notes/aws.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/aws.md:0:0-0:0) (comprehensive architecture)
- **Deployment Script**: [prod/deploy-to-aws.ps1](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/prod/deploy-to-aws.ps1:0:0-0:0) (automated deployment)

---

## ❓ What to Do Next

**Start with STEP 1** above (Route 53 Hosted Zone). Follow each step in order. The detailed guide in [notes/AWS_DEPLOYMENT_STEPS.md](cci:7://file:///c:/Users/Plange/Downloads/Projects/ypi-website/notes/AWS_DEPLOYMENT_STEPS.md:0:0-0:0) has screenshots descriptions and troubleshooting tips.

**Need help?** Let me know which step you're on and I can provide more specific guidance!