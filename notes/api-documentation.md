# API Documentation
## Yellow Power International Website - API Endpoints

**Version:** 1.0  
**Last Updated:** December 2025  
**Base URL:** https://yellowpowerinternational.com/api

---

## Overview

The YPI website provides several API endpoints for form submissions, AI features, and admin operations. All API routes are implemented as Next.js Route Handlers in the `app/api/` directory.

**Authentication:**
- Public API routes (forms, AI) - No authentication required
- Admin API routes - Require NextAuth session

---

## Public API Endpoints

### Contact Form

**Endpoint:** `POST /api/contact`

**Description:** Submit contact form inquiry

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233268066942",
  "company": "Acme Mining",
  "category": "quote",
  "subject": "Drilling Services Inquiry",
  "message": "We need production drilling services..."
}
```

**Validation:**
- `name` - Required, 2-100 characters
- `email` - Required, valid email format
- `phone` - Required, valid phone number
- `company` - Optional, 2-200 characters
- `category` - Required, one of: quote, partnership, supplier, career, media, general
- `subject` - Required, 5-200 characters
- `message` - Required, 10-2000 characters

**Response (Success):**
```json
{
  "success": true,
  "message": "Your inquiry has been received. Our team will respond within 24-48 hours."
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Email Routing:**
- `quote` → sales@yellowpowerinternational.com
- `partnership` → partnerships@yellowpowerinternational.com
- `supplier` → procurement@yellowpowerinternational.com
- `career` → hr@yellowpowerinternational.com
- `media` → media@yellowpowerinternational.com
- `general` → info@yellowpowerinternational.com

---

### Quote Request

**Endpoint:** `POST /api/quotes`

**Description:** Submit request for quote

**Request Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@mining.com",
  "phone": "+233268066942",
  "company": "Mining Corp",
  "service": "production-drilling",
  "projectDetails": "Need drilling for 50 holes, 150m depth each",
  "timeline": "Q1 2025",
  "budget": "negotiable"
}
```

**Validation:**
- All contact fields required
- `service` - Required, valid service ID
- `projectDetails` - Required, 20-1000 characters
- `timeline` - Required
- `budget` - Optional

**Response:**
```json
{
  "success": true,
  "message": "Quote request submitted successfully."
}
```

---

### Job Application

**Endpoint:** `POST /api/careers/applications`

**Description:** Submit job application

**Request Body:**
```json
{
  "jobId": "senior-production-driller",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+233268066942",
  "education": "Bachelor's Degree",
  "experience": "5 years",
  "resume": "https://cloudinary.com/.../resume.pdf",
  "coverLetter": "I am interested in..."
}
```

**File Uploads:**
- Resume accepted: PDF, DOC, DOCX (max 5MB)
- Uploaded to Cloudinary automatically

**Response:**
```json
{
  "success": true,
  "message": "Application submitted successfully. We'll review and contact you soon."
}
```

---

### Partnership Inquiry

**Endpoint:** `POST /api/partnerships`

**Description:** Submit partnership proposal

**Request Body:**
```json
{
  "name": "Partner Company",
  "contactPerson": "Jane Doe",
  "email": "jane@partner.com",
  "phone": "+233268066942",
  "partnershipType": "equipment-supply",
  "proposal": "We can provide...",
  "website": "https://partner.com"
}
```

**Partnership Types:**
- equipment-supply
- strategic-alliance
- joint-venture
- subcontracting
- technology-transfer
- other

---

### Supplier Registration

**Endpoint:** `POST /api/suppliers`

**Description:** Register as supplier

**Request Body:**
```json
{
  "companyName": "Supply Co",
  "contactName": "John Smith",
  "email": "john@supply.com",
  "phone": "+233268066942",
  "category": "drilling-equipment",
  "productsServices": "Drill bits, rods, mud pumps",
  "certifications": ["ISO9001", "CE"],
  "website": "https://supply.com"
}
```

---

### Consultation Booking

**Endpoint:** `POST /api/consultations`

**Description:** Book free consultation

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+233268066942",
  "company": "Mining Corp",
  "serviceInterest": "production-drilling",
  "preferredDate": "2025-01-15",
  "preferredTime": "morning",
  "notes": "Interested in RC drilling services"
}
```

---

### Newsletter Subscription

**Endpoint:** `POST /api/newsletter`

**Description:** Subscribe to newsletter

**Request Body:**
```json
{
  "email": "subscriber@example.com",
  "name": "John Doe",
  "company": "Mining Corp"
}
```

**Integration:**
- Mailchimp or SendGrid based on `NEWSLETTER_PROVIDER` env var
- Handles duplicate subscriptions gracefully

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter"
}
```

---

## AI API Endpoints

### PowerBot Chat

**Endpoint:** `POST /api/ai/chat`

**Description:** Send message to AI chatbot

**Request Body:**
```json
{
  "message": "What drilling services do you offer?",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "response": "We offer production drilling, pre-split drilling, RC drilling...",
  "sources": [
    {
      "title": "Production Drilling",
      "url": "/services/production-drilling"
    }
  ]
}
```

**Rate Limiting:** 10 requests per minute per IP

---

### AI Search

**Endpoint:** `POST /api/ai/search`

**Description:** Semantic search across site content

**Request Body:**
```json
{
  "query": "mining safety procedures",
  "limit": 10
}
```

**Response:**
```json
{
  "success": true,
  "results": [
    {
      "title": "Safety Standards",
      "content": "Our comprehensive safety program...",
      "url": "/sustainability/safety",
      "score": 0.95
    }
  ]
}
```

---

### AI Recommendations

**Endpoint:** `POST /api/ai/recommendations`

**Description:** Get personalized service recommendations

**Request Body:**
```json
{
  "projectType": "gold-mine",
  "requirements": ["drilling", "blasting"],
  "budget": "medium",
  "timeline": "6-months"
}
```

**Response:**
```json
{
  "success": true,
  "recommendations": [
    {
      "service": "production-drilling",
      "confidence": 0.92,
      "reason": "Best suited for gold mining operations..."
    }
  ]
}
```

---

### Document Query

**Endpoint:** `POST /api/ai/document-query`

**Description:** Query company documents (admin only)

**Authentication:** Requires admin token

**Request Headers:**
```
X-Admin-Token: your-admin-token
```

**Request Body:**
```json
{
  "query": "What are the equipment specifications?",
  "documentType": "technical-manual"
}
```

---

## Admin API Endpoints

### Authentication

**Endpoint:** `POST /api/auth/[...nextauth]`

**Description:** NextAuth.js authentication endpoints

**Login:**
```
POST /api/auth/signin
```

**Logout:**
```
POST /api/auth/signout
```

**Session:**
```
GET /api/auth/session
```

---

## Error Responses

All API endpoints use consistent error response format:

**Validation Error (400):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email address"
    }
  ]
}
```

**Server Error (500):**
```json
{
  "success": false,
  "error": "Internal server error. Please try again later."
}
```

**Rate Limit Error (429):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later.",
  "retryAfter": 60
}
```

---

## Rate Limiting

**Implementation:** In-memory store (for production, consider Redis)

**Limits:**
- Form submissions: 5 per 15 minutes per IP
- AI endpoints: 10 per minute per IP
- General endpoints: 30 per minute per IP

**Headers:**
```
X-RateLimit-Remaining: 8
X-RateLimit-Reset: 1704067200
```

---

## CORS Configuration

**Allowed Origins:**
- https://yellowpowerinternational.com
- https://www.yellowpowerinternational.com
- http://localhost:3000 (development)

**Allowed Methods:** GET, POST, OPTIONS

**Allowed Headers:** Content-Type, Authorization, X-Admin-Token

---

## Testing API Endpoints

### Using cURL

```bash
# Contact form
curl -X POST https://yellowpowerinternational.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "+233268066942",
    "category": "general",
    "subject": "Test",
    "message": "Test message"
  }'

# PowerBot
curl -X POST https://yellowpowerinternational.com/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What services do you offer?"
  }'
```

### Using Postman

1. Import collection from `/postman/ypi-api.json` (if available)
2. Set environment variable `BASE_URL` to `https://yellowpowerinternational.com/api`
3. Test each endpoint

---

## Security Considerations

1. **Input Validation:** All inputs validated with Zod schemas
2. **Rate Limiting:** Prevents abuse and DDoS
3. **CORS:** Restricted to allowed origins
4. **HTTPS Only:** All API calls must use HTTPS in production
5. **No Secret Exposure:** API keys never exposed to client
6. **SQL Injection Protection:** Prisma ORM prevents SQL injection
7. **XSS Protection:** All user input sanitized

---

## Monitoring

**Vercel Analytics:** Automatic tracking of API response times

**Error Tracking:** Optional Sentry integration

**Logs:** Available in Vercel dashboard

**Key Metrics to Monitor:**
- API response times
- Error rates
- Rate limit hits
- Form submission success rates
- AI feature usage

---

**For technical support or API questions:**
- Email: info@yellowpowerinternational.com
- GitHub: Create issue in repository
