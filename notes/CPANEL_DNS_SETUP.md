# cPanel DNS Configuration for Render

**Domain:** yellowpowerinternational.com  
**Render URL:** ypi-website.onrender.com  
**Render IP:** 216.24.57.1

---

## DNS Records Needed

### A Record (Apex Domain)
- **Name:** `yellowpowerinternational.com`
- **Address:** `216.24.57.1`
- **Status:** ✅ Added

### CNAME Record (WWW Subdomain)
- **Name:** `www.yellowpowerinternational.com`
- **CNAME:** `ypi-website.onrender.com`
- **Status:** ⚠️ Needs existing record deleted first

---

## Issue: Existing WWW Record

**Error:** "multiple RRs of singleton type"

**Cause:** There's already a CNAME or A record for `www.yellowpowerinternational.com` in your DNS zone.

**Solution:** Delete the existing www record before adding the new one.

---

## Steps to Fix

### 1. Find Existing WWW Record

In cPanel Zone Editor:
1. Scroll down to see all existing DNS records
2. Look for a record with Name: `www` or `www.yellowpowerinternational.com`
3. It might be:
   - A CNAME record pointing somewhere else
   - An A record with an IP address
   - Could be pointing to Namecheap parking page or old hosting

### 2. Delete Existing WWW Record

1. Find the www record in the list
2. Click the **trash/delete icon** next to it
3. Confirm deletion
4. Wait a moment for it to be removed

### 3. Add New CNAME Record

After deleting the old record:
1. Click **"+ CNAME Record"** button
2. **Name:** `www.yellowpowerinternational.com`
3. **CNAME:** `ypi-website.onrender.com`
4. Click **"Add A CNAME Record"**

---

## Final DNS Records

After completion, you should have:

```
yellowpowerinternational.com.     A      216.24.57.1
www.yellowpowerinternational.com. CNAME  ypi-website.onrender.com.
```

---

## Verification

### Check DNS Propagation
Use: https://dnschecker.org

**For apex domain:**
- Enter: `yellowpowerinternational.com`
- Should show: `216.24.57.1`

**For www subdomain:**
- Enter: `www.yellowpowerinternational.com`
- Should show: `ypi-website.onrender.com` (CNAME)
- Should resolve to: `216.24.57.1` (A record)

### Test Website
After DNS propagates (15-60 minutes):
- https://yellowpowerinternational.com
- https://www.yellowpowerinternational.com

Both should load your Render-hosted website.

---

## SSL Certificate

**Automatic:** Render will automatically provision a free SSL certificate once:
1. DNS records are correctly configured
2. DNS has propagated globally
3. Render detects your domain pointing to them

**Timeline:** 10-30 minutes after DNS propagation

---

## Troubleshooting

### "Multiple RRs of singleton type" error
- Delete existing www record first
- Only one CNAME can exist for a given name

### DNS not propagating
- Wait longer (can take up to 48 hours)
- Clear browser cache
- Try incognito/private browsing
- Use different DNS checker tools

### SSL not provisioning
- Verify DNS records are correct
- Wait 30 minutes after DNS propagates
- Check Render dashboard for SSL status
- Contact Render support if needed

---

**Next Step:** Find and delete the existing www record in cPanel Zone Editor, then add the new CNAME record.
