# Preserve Email DNS When Switching to Namecheap BasicDNS (Render)

You confirmed you **use email on yellowpowerinternational.com**. That means switching nameservers is safe **only if you copy your email DNS records first**.

---

## Goal

- Point website to Render
- Keep email working (MX/SPF/DKIM/DMARC)

---

## Step 0: Identify where your email is hosted
Pick the one that matches your setup:

- **Namecheap Private Email**
- **Google Workspace (Gmail)**
- **Microsoft 365**
- **Email accounts inside cPanel** (shared hosting mailboxes)

If you’re not sure, check where you currently login to read mail.

---

## Step 1: BEFORE switching nameservers — copy current DNS records

In your current DNS manager (cPanel Zone Editor / Namecheap / wherever is authoritative), copy/export these records:

- **MX** records (mail routing)
- **TXT** records (SPF, DKIM, DMARC, verification)
- **CNAME** records related to email (sometimes DKIM is a CNAME)
- Any **SRV** records (rare)

Minimum to preserve email:

- MX
- SPF (TXT)
- DKIM (TXT or CNAME)
- DMARC (TXT)

---

## Step 2: Switch to Namecheap BasicDNS

Namecheap → Domain List → Manage → Nameservers:

- Select **Namecheap BasicDNS**
- Save

This does **NOT** cancel your hosting plan or remove cPanel access.

---

## Step 3: Recreate DNS records in Namecheap Advanced DNS

### 3.1 Render website records

- **A record**
  - Host: `@`
  - Value: `216.24.57.1`

- **CNAME record**
  - Host: `www`
  - Value: `ypi-website.onrender.com`

### 3.2 Email records

Re-add exactly what you copied in Step 1.

Common examples (do not assume these are yours):

- **DMARC**
  - Host: `_dmarc`
  - Type: TXT
  - Value: `v=DMARC1; p=none; rua=mailto:...`

- **SPF**
  - Host: `@`
  - Type: TXT
  - Value: starts with `v=spf1 ...`

- **DKIM**
  - Either TXT or CNAME, usually looks like `selector._domainkey`

- **MX**
  - Host: `@`
  - Value: mail server hostname
  - Priority: required

---

## Step 4: Verify

After 15–60 minutes (sometimes longer):

- Website:
  - `yellowpowerinternational.com` resolves to `216.24.57.1`
  - `www.yellowpowerinternational.com` CNAMEs to `ypi-website.onrender.com`

- Email:
  - MX records visible publicly
  - Send/receive a test email (external Gmail → your domain, and your domain → Gmail)

---

## Safety tips

- Do not delete your old DNS records until the new DNS is working.
- Keep a screenshot or copy/paste backup of all email-related DNS records.
- If you use cPanel mailboxes, the mail server is still your hosting provider, but DNS must point to it via MX.
