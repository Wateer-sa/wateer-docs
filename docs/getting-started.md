# Getting Started with Wateer

This guide will help you integrate Wateer digital receipts into your business.

## What is Wateer?

[Wateer](https://wateer.com.sa) is a cutting-edge Saudi digital platform revolutionizing receipt management for businesses and consumers. Designed for efficiency, Wateer simplifies transactions by digitizing receipts, reducing paper waste, and streamlining expense tracking.

### Key Features

- **Secure Cloud Storage** - Access receipts anytime, anywhere
- **Smart Categorization** - Automatic expense tracking
- **POS Integration** - Seamless integration with existing systems
- **ZATCA Compliant** - Meets Saudi e-invoicing requirements
- **Paperless Transactions** - Reduce costs and environmental impact

---

## Vendor Onboarding Process

### Step 1: Account Creation

**Action:** Admin creates your vendor account

The Wateer team will:
1. Create your vendor account in the system
2. Set up your branches and POS terminals
3. Generate unique API keys for each POS

You will receive:
- Login credentials for the Wateer portal
- API keys for each POS terminal

**Need help?** Contact [support@wateer.com.sa](mailto:support@wateer.com.sa)

### Step 2: API Authentication

**Action:** Use your API key to authenticate invoice requests

Each POS terminal has a unique API key. To authenticate:

```http
POST /api/v1/invoices
Host: api.wateer.com.sa
Content-Type: application/json
pos-api-key: YOUR_API_KEY_HERE
```

::: tip API Key Management
- Retrieve your API key from the POS details page in the portal
- Each POS has a unique API key
- Never share your API key publicly
- Always use HTTPS for API requests
:::

### Step 3: Send Invoice Data

Once authenticated, you can send invoice data to Wateer:

```json
{
  "invoice_number": "INV-2026-001",
  "date": "2026-03-04T14:30:00Z",
  "total": 150.50,
  "tax": 22.58,
  "items": [
    {
      "name": "Product A",
      "quantity": 2,
      "price": 50.00,
      "tax": 7.50
    }
  ],
  "customer": {
    "phone": "+966XXXXXXXXX"
  }
}
```

---

## Validation & Processing

When you send an invoice:

✅ System validates your API key  
✅ Invoice data is processed  
✅ Digital receipt is generated  
✅ Customer receives receipt via SMS/app  

---

## Security Best Practices

::: warning Important
- 🔐 Each POS has a unique API key (never share it)
- 🔒 Always use HTTPS for API requests
- 🔄 Rotate API keys periodically
- 📋 Monitor API usage in your portal dashboard
:::

---

## Next Steps

- [API Reference](/api-reference) - Complete API documentation
- [Authentication](/authentication) - Detailed auth guide
- [Receipt API](/receipt-api) - Send invoice data
- [Webhooks](/webhooks) - Receive real-time notifications

---

**Production Environment:** [https://wateer.com.sa](https://wateer.com.sa)

_Last updated: March 2026_
