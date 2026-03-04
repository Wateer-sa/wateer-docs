# API Reference

Complete reference for the Wateer API.

## Base URL

```
Production: https://api.wateer.com.sa
Staging: https://staging-api.wateer.com.sa
```

## Authentication

All API requests require authentication via the `pos-api-key` header:

```http
pos-api-key: YOUR_API_KEY_HERE
```

Get your API key from the [Wateer Portal](https://wateer.com.sa) under POS details.

---

## Invoices

### Create Invoice

Generate a digital receipt for a transaction.

**Endpoint:** `POST /api/v1/invoices`

**Headers:**
```http
Content-Type: application/json
pos-api-key: YOUR_API_KEY_HERE
```

**Request Body:**
```json
{
  "invoice_number": "INV-2026-001234",
  "date": "2026-03-04T14:30:00Z",
  "total": 230.50,
  "tax": 30.07,
  "subtotal": 200.43,
  "currency": "SAR",
  "items": [
    {
      "name": "Premium Coffee Beans 1kg",
      "description": "Arabica blend from Colombia",
      "quantity": 2,
      "unit_price": 85.00,
      "price": 170.00,
      "tax": 22.10,
      "tax_rate": 0.15,
      "sku": "COFFEE-001",
      "category": "Beverages"
    },
    {
      "name": "Espresso Machine Cleaning Kit",
      "description": "Professional grade cleaning tablets",
      "quantity": 1,
      "unit_price": 30.43,
      "price": 30.43,
      "tax": 3.95,
      "tax_rate": 0.15,
      "sku": "CLEAN-002",
      "category": "Accessories"
    }
  ],
  "customer": {
    "phone": "+966501234567",
    "email": "customer@example.com",
    "name": "Ahmed Mohammed",
    "customer_id": "CUST-12345"
  },
  "payment": {
    "method": "card",
    "card_last4": "4567",
    "card_type": "mada",
    "transaction_id": "TXN-987654321",
    "status": "paid"
  },
  "metadata": {
    "cashier_name": "Fatima Ali",
    "cashier_id": "EMP-456",
    "terminal_id": "POS-001",
    "order_type": "in_store",
    "notes": "Customer loyalty member"
  }
}
```

**Request Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `invoice_number` | string | ✅ | Unique invoice number from your system |
| `date` | string (ISO 8601) | ✅ | Transaction date and time |
| `total` | number | ✅ | Total amount including tax |
| `tax` | number | ✅ | Total tax amount |
| `subtotal` | number | ✅ | Amount before tax |
| `currency` | string | ❌ | Currency code (default: SAR) |
| `items` | array | ✅ | Array of line items (min 1) |
| `items[].name` | string | ✅ | Item name |
| `items[].description` | string | ❌ | Item description |
| `items[].quantity` | number | ✅ | Quantity purchased |
| `items[].unit_price` | number | ✅ | Price per unit |
| `items[].price` | number | ✅ | Total price (quantity × unit_price) |
| `items[].tax` | number | ✅ | Tax amount for this item |
| `items[].tax_rate` | number | ❌ | Tax rate (e.g., 0.15 for 15%) |
| `items[].sku` | string | ❌ | Product SKU/code |
| `items[].category` | string | ❌ | Product category |
| `customer` | object | ❌ | Customer information |
| `customer.phone` | string | ❌ | Phone number (Saudi format: +966...) |
| `customer.email` | string | ❌ | Email address |
| `customer.name` | string | ❌ | Customer name |
| `customer.customer_id` | string | ❌ | Your internal customer ID |
| `payment` | object | ❌ | Payment details |
| `payment.method` | string | ❌ | Payment method: `card`, `cash`, `apple_pay`, `stc_pay`, etc. |
| `payment.card_last4` | string | ❌ | Last 4 digits of card |
| `payment.card_type` | string | ❌ | Card type: `mada`, `visa`, `mastercard` |
| `payment.transaction_id` | string | ❌ | Payment gateway transaction ID |
| `payment.status` | string | ❌ | Payment status: `paid`, `pending`, `failed` |
| `metadata` | object | ❌ | Additional metadata |

**Response (201 Created):**
```json
{
  "success": true,
  "invoice_id": "b5f3a7d2-8c9e-4f1b-a2d6-3e7c8a9b4f5d",
  "receipt_url": "https://wateer.com.sa/r/b5f3a7d2",
  "receipt_short_url": "https://wtr.sa/r/abc123",
  "qr_code_url": "https://api.wateer.com.sa/qr/b5f3a7d2",
  "invoice_number": "INV-2026-001234",
  "status": "created",
  "created_at": "2026-03-04T14:30:15Z",
  "customer_notified": true,
  "notification_method": "sms",
  "message": "Receipt created successfully"
}
```

**Response Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Request success status |
| `invoice_id` | string (UUID) | Wateer internal invoice ID |
| `receipt_url` | string | Full receipt URL for customer |
| `receipt_short_url` | string | Shortened URL for SMS |
| `qr_code_url` | string | QR code image URL |
| `invoice_number` | string | Echo of your invoice number |
| `status` | string | Invoice status: `created`, `pending`, `failed` |
| `created_at` | string (ISO 8601) | Creation timestamp |
| `customer_notified` | boolean | Whether customer was notified |
| `notification_method` | string | How customer was notified: `sms`, `email`, `none` |

**Error Responses:**

```json
// 400 Bad Request - Invalid data
{
  "success": false,
  "error": "validation_error",
  "message": "Invalid request data",
  "details": {
    "invoice_number": "Invoice number already exists",
    "items[0].price": "Price must be a positive number",
    "customer.phone": "Invalid phone number format"
  }
}

// 401 Unauthorized - Invalid API key
{
  "success": false,
  "error": "unauthorized",
  "message": "Invalid or missing API key"
}

// 429 Too Many Requests - Rate limit exceeded
{
  "success": false,
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Please try again later.",
  "retry_after": 60
}

// 500 Internal Server Error
{
  "success": false,
  "error": "internal_error",
  "message": "An error occurred while processing your request"
}
```

---

### Re-print Receipt

Generate a new receipt URL or resend notification for an existing invoice.

**Endpoint:** `POST /api/v1/invoices/{invoice_id}/reprint`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `invoice_id` | string | Wateer invoice ID or your invoice_number |

**Headers:**
```http
Content-Type: application/json
pos-api-key: YOUR_API_KEY_HERE
```

**Request Body:**
```json
{
  "notify_customer": true,
  "notification_method": "sms",
  "customer_contact": "+966501234567",
  "reason": "customer_request"
}
```

**Request Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `notify_customer` | boolean | ❌ | Send notification to customer (default: false) |
| `notification_method` | string | ❌ | Method: `sms`, `email`, `both` (default: sms) |
| `customer_contact` | string | ❌ | Override customer phone/email |
| `reason` | string | ❌ | Reason: `customer_request`, `lost_receipt`, `correction`, `other` |

**Response (200 OK):**
```json
{
  "success": true,
  "invoice_id": "b5f3a7d2-8c9e-4f1b-a2d6-3e7c8a9b4f5d",
  "invoice_number": "INV-2026-001234",
  "receipt_url": "https://wateer.com.sa/r/b5f3a7d2",
  "receipt_short_url": "https://wtr.sa/r/abc123",
  "qr_code_url": "https://api.wateer.com.sa/qr/b5f3a7d2",
  "customer_notified": true,
  "notification_method": "sms",
  "notification_sent_to": "+966501234567",
  "reprint_count": 2,
  "message": "Receipt reprinted successfully"
}
```

**Response Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `reprint_count` | number | Number of times this receipt has been reprinted |
| `notification_sent_to` | string | Contact where notification was sent |
| *(other fields same as create invoice)* | | |

**Error Responses:**

```json
// 404 Not Found - Invoice not found
{
  "success": false,
  "error": "not_found",
  "message": "Invoice not found"
}

// 403 Forbidden - Not authorized for this invoice
{
  "success": false,
  "error": "forbidden",
  "message": "You are not authorized to reprint this invoice"
}
```

**Example:**
```bash
# Reprint by invoice ID
curl -X POST https://api.wateer.com.sa/api/v1/invoices/b5f3a7d2-8c9e-4f1b-a2d6-3e7c8a9b4f5d/reprint \
  -H "Content-Type: application/json" \
  -H "pos-api-key: YOUR_API_KEY_HERE" \
  -d '{
    "notify_customer": true,
    "notification_method": "sms"
  }'

# Reprint by invoice number
curl -X POST https://api.wateer.com.sa/api/v1/invoices/INV-2026-001234/reprint \
  -H "Content-Type: application/json" \
  -H "pos-api-key: YOUR_API_KEY_HERE"
```

---

## Customers

### Get Customer

Retrieve customer information by ID or phone number.

**Endpoint:** `GET /api/v1/customers/{customer_identifier}`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `customer_identifier` | string | Customer ID or phone number (+966...) |

**Headers:**
```http
pos-api-key: YOUR_API_KEY_HERE
```

**Response (200 OK):**
```json
{
  "success": true,
  "customer": {
    "customer_id": "CUST-12345",
    "name": "Ahmed Mohammed",
    "phone": "+966501234567",
    "email": "customer@example.com",
    "created_at": "2025-06-15T10:30:00Z",
    "total_invoices": 47,
    "total_spent": 12450.75,
    "last_invoice_date": "2026-03-04T14:30:00Z",
    "preferences": {
      "notification_method": "sms",
      "language": "ar"
    },
    "metadata": {
      "loyalty_member": true,
      "loyalty_tier": "gold"
    }
  }
}
```

**Error Responses:**

```json
// 404 Not Found
{
  "success": false,
  "error": "not_found",
  "message": "Customer not found"
}
```

---

### Create/Update Customer

Create a new customer or update existing customer information.

**Endpoint:** `POST /api/v1/customers`

**Headers:**
```http
Content-Type: application/json
pos-api-key: YOUR_API_KEY_HERE
```

**Request Body:**
```json
{
  "customer_id": "CUST-12345",
  "name": "Ahmed Mohammed",
  "phone": "+966501234567",
  "email": "customer@example.com",
  "preferences": {
    "notification_method": "sms",
    "language": "ar"
  },
  "metadata": {
    "loyalty_member": true,
    "loyalty_tier": "gold",
    "birthday": "1990-05-15"
  }
}
```

**Request Schema:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `customer_id` | string | ❌ | Your internal customer ID (auto-generated if omitted) |
| `name` | string | ✅ | Customer name |
| `phone` | string | ✅ | Phone number (must start with +966) |
| `email` | string | ❌ | Email address |
| `preferences` | object | ❌ | Customer preferences |
| `preferences.notification_method` | string | ❌ | Preferred method: `sms`, `email`, `both` |
| `preferences.language` | string | ❌ | Language: `ar`, `en` |
| `metadata` | object | ❌ | Additional custom data |

**Response (201 Created / 200 OK):**
```json
{
  "success": true,
  "customer": {
    "customer_id": "CUST-12345",
    "name": "Ahmed Mohammed",
    "phone": "+966501234567",
    "email": "customer@example.com",
    "created_at": "2026-03-04T14:30:00Z",
    "updated_at": "2026-03-04T14:30:00Z",
    "preferences": {
      "notification_method": "sms",
      "language": "ar"
    },
    "metadata": {
      "loyalty_member": true,
      "loyalty_tier": "gold",
      "birthday": "1990-05-15"
    }
  },
  "created": true,
  "message": "Customer created successfully"
}
```

**Response Schema:**

| Field | Type | Description |
|-------|------|-------------|
| `created` | boolean | `true` if new customer, `false` if updated |
| `customer` | object | Customer data |

**Error Responses:**

```json
// 400 Bad Request
{
  "success": false,
  "error": "validation_error",
  "message": "Invalid customer data",
  "details": {
    "phone": "Phone number already exists for another customer",
    "email": "Invalid email format"
  }
}

// 409 Conflict - Duplicate customer
{
  "success": false,
  "error": "duplicate_customer",
  "message": "Customer with this phone number already exists",
  "existing_customer_id": "CUST-98765"
}
```

---

## Rate Limits

| Tier | Requests per hour | Requests per second |
|------|-------------------|---------------------|
| Standard | 1,000 | 10 |
| Premium | 5,000 | 50 |
| Enterprise | Custom | Custom |

When rate limit is exceeded, you'll receive a `429` status code with a `Retry-After` header indicating seconds to wait.

---

## Webhooks

Wateer can send real-time notifications to your server when events occur. See [Webhooks](/webhooks) for setup.

**Available events:**
- `invoice.created`
- `invoice.viewed`
- `customer.created`
- `customer.updated`

---

## Testing

### Sandbox Environment

```
Base URL: https://staging-api.wateer.com.sa
```

Use your staging API key for testing. All invoices created in staging are:
- Not sent to real customers
- Marked with a "TEST" watermark
- Automatically deleted after 30 days

### Test Data

**Test phone numbers** (won't send real SMS):
```
+966500000001
+966500000002
+966500000003
```

**Test card numbers**:
```
4111111111111111 (Visa - success)
5555555555554444 (Mastercard - success)
4000000000000002 (Declined)
```

---

## Support

Need help?

- **Email:** [support@wateer.com.sa](mailto:support@wateer.com.sa)
- **Portal:** [https://wateer.com.sa](https://wateer.com.sa)
- **Business Hours:** Sunday - Thursday, 9:00 AM - 6:00 PM (Saudi Arabia Time)

---

## Changelog

### v1.0.0 (March 2026)
- Initial API release
- Invoice creation and management
- Customer management
- Receipt reprint functionality
- Webhook support
