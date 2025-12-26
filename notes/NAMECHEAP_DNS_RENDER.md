# Namecheap DNS for Render (cPanel WebHostingDNS vs BasicDNS)

## Short answer
Yes—you can switch the domain’s **nameservers** to **Namecheap BasicDNS** and still keep your **shared hosting + cPanel**. Changing nameservers only changes **where DNS is managed**, not whether the hosting account exists.

If your goal is to point `yellowpowerinternational.com` to Render, **BasicDNS is the simplest**.

---

## Why you’re seeing problems in cPanel Zone Editor
When a domain is set to **Namecheap Web Hosting DNS**, cPanel becomes the DNS editor *for that hosting server*. Common issues:

- The Zone Editor UI may not list records (UI/permissions glitch), even though changes are written.
- The “multiple RRs of singleton type” error means **there is already a record for `www`** (often an A record) and cPanel won’t allow adding a CNAME until the existing one is removed.
- Some hosting setups split DNS (or have templates) that auto-create `www` records.

If you don’t need your shared hosting to serve the website, managing DNS in cPanel is extra friction.

---

## Recommended approach (cleanest): Switch to Namecheap BasicDNS

### 1) Confirm what services you currently rely on
Before switching nameservers, confirm if you use any of these via Namecheap hosting:

- Email on the domain (mailboxes)
- Any existing website hosted on the shared hosting
- Any special records (TXT for Google, SPF/DKIM/DMARC, verification records)

If you use email, you must re-add the MX/TXT records in BasicDNS.

### 2) Change nameservers to BasicDNS (Namecheap)
In Namecheap:

- Domain List → Manage (`yellowpowerinternational.com`)
- Nameservers → choose **Namecheap BasicDNS**
- Save

**You keep cPanel access** for the hosting account. Only DNS management moves to Namecheap.

### 3) Add the Render DNS records in Namecheap Advanced DNS
Namecheap → Domain → **Advanced DNS**:

#### Apex (root) domain
- **Type:** A Record
- **Host:** @
- **Value:** 216.24.57.1
- **TTL:** Automatic

#### WWW
- **Type:** CNAME Record
- **Host:** www
- **Value:** ypi-website.onrender.com
- **TTL:** Automatic

### 4) Remove conflicting records
Delete any existing records that conflict:

- Any existing `A` record for `@` (apex)
- Any existing `A` record for `www`
- Any existing `CNAME` record for `www`

You can only have **one** “main” record for `www`.

### 5) Wait and verify
DNS propagation:

- Typical: 5–60 minutes
- Worst case: up to 24–48 hours

Verify:

- `yellowpowerinternational.com` should resolve to **216.24.57.1**
- `www.yellowpowerinternational.com` should CNAME to **ypi-website.onrender.com**

Then in Render → Custom Domains:

- Add `yellowpowerinternational.com`
- Add `www.yellowpowerinternational.com`

Render will provision SSL automatically once DNS is correct.

---

## If you insist on staying on WebHostingDNS (cPanel)
Do this:

1. In cPanel Zone Editor, search for `www`.
2. Delete the existing `www` record (often an A record).
3. Add:
   - A record for apex/root to `216.24.57.1`
   - CNAME `www` → `ypi-website.onrender.com`

If cPanel says “success” but shows no records:

- Try cPanel → **Zone Editor → Manage** (not just the quick add buttons)
- Or ask Namecheap support to confirm the actual zone file contents.

---

## Important: Email records (MX/SPF/DKIM/DMARC)
If you use email on this domain, switching DNS requires copying over:

- MX records
- SPF (TXT)
- DKIM (TXT)
- DMARC (TXT)

If you don’t use email, you can ignore this section.
