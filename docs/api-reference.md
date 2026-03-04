# API Reference

Complete reference for the Wateer API.

## Base URL

```
Production: https://api.wateer.com.sa
```

## Authentication

All API requests require authentication via the `pos-api-key` header:

```http
pos-api-key: YOUR_API_KEY_HERE
```

---

## Endpoints

### Create Invoice

Send invoice data to generate a digital receipt.

**Endpoint:** `POST /api/v1/invoices`

**Headers:**
```http
Content-Type: application/json
pos-api-key: YOUR_API_KEY_HERE
```

**Request Body:**
```json
{
  "invoice_number": "string",
  "date": "ISO 8601 timestamp",
  "total": 0.00,
  "tax": 0.00,
  "items": [
    {
      "name": "string",
      "quantity": 0,
      "price": 0.00,
      "tax": 0.00
    }
  ],
  "customer": {
    "phone": "string (optional)",
    "email": "string (optional)"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "invoice_id": "uuid",
  "receipt_url": "https://wateer.com.sa/r/xxxxx",
  "message": "Receipt created successfully"
}
```

**Error Responses:**

| Code | Description |
|------|-------------|
| 401 | Invalid or missing API key |
| 400 | Invalid request data |
| 429 | Rate limit exceeded |
| 500 | Internal server error |

---

## Rate Limits

- 1000 requests per hour per API key
- 10 requests per second per API key

---

## Need More Details?

Contact [support@wateer.com.sa](mailto:support@wateer.com.sa) for complete API documentation.
