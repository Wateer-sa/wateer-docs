# Wateer Documentation

Official documentation for the Wateer digital receipt platform.

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Deployment

This documentation is automatically deployed to `docs.wateer.com.sa` via GitHub Actions.

## Contributing

To update documentation:
1. Edit markdown files in `/docs`
2. Commit and push to `main`
3. GitHub Actions will build and deploy automatically

## Tech Stack

- [VitePress](https://vitepress.dev/) - Static site generator
- GitHub Actions - CI/CD
- Hosted on Wateer infrastructure

## License

MIT
