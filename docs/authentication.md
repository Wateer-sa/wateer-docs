# Authentication

Learn how to authenticate with the Wateer API.

## API Keys

Every POS terminal in your account has a unique API key. You can find your API keys in the [Wateer Portal](https://wateer.com.sa).

## Using API Keys

Include your API key in every request:

```http
pos-api-key: YOUR_API_KEY_HERE
```

## Security

- Never commit API keys to version control
- Use environment variables to store keys
- Rotate keys periodically
- Monitor API usage in your dashboard

[View API Reference →](/api-reference)
