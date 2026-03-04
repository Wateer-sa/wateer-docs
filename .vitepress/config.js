export default {
  title: 'Wateer Documentation',
  description: 'API documentation and integration guides for Wateer digital receipt platform',
  
  themeConfig: {
    logo: '/logo.svg',
    
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started' },
      { text: 'API Reference', link: '/api-reference' },
      { text: 'Portal', link: 'https://wateer.com.sa' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'What is Wateer?', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      },
      {
        text: 'Integration',
        items: [
          { text: 'Authentication', link: '/authentication' },
          { text: 'API Reference', link: '/api-reference' },
          { text: 'Webhooks', link: '/webhooks' }
        ]
      },
      {
        text: 'Guides',
        items: [
          { text: 'Vendor Onboarding', link: '/vendor-onboarding' },
          { text: 'POS Integration', link: '/pos-integration' },
          { text: 'Receipt API', link: '/receipt-api' }
        ]
      },
      {
        text: 'Resources',
        items: [
          { text: 'Support', link: '/support' },
          { text: 'Changelog', link: '/changelog' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Wateer-sa' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Wateer'
    },

    search: {
      provider: 'local'
    }
  }
}
