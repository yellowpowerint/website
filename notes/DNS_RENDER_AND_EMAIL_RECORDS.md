# DNS Records (Render Website + Namecheap Hosting Email)

**Domain:** yellowpowerinternational.com

## Website (Render)

- **A**
  - Host/Name: `yellowpowerinternational.com` (apex)
  - Value: `216.24.57.1`

- **CNAME**
  - Host/Name: `www.yellowpowerinternational.com`
  - Value: `ypi-website.onrender.com`

## Email (Namecheap Web Hosting DNS)

Publicly observed records (keep these so email continues to work):

- **MX**
  - Priority 5: `mx1-hosting.jellyfish.systems`
  - Priority 10: `mx2-hosting.jellyfish.systems`
  - Priority 20: `mx3-hosting.jellyfish.systems`

- **SPF (TXT at @)**
  - `v=spf1 +a +mx +ip4:184.94.213.214 +ip4:184.94.213.215 include:spf.web-hosting.com ~all`

- **DMARC (TXT at _dmarc)**
  - `v=DMARC1; p=none;`

- **DKIM (TXT at default._domainkey)**
  - Present (long RSA public key)

- **mail A record**
  - `mail.yellowpowerinternational.com` → `184.94.213.217`

Notes:
- If you switch nameservers to **Namecheap BasicDNS**, you must re-create the MX/TXT/DKIM/DMARC records there.
