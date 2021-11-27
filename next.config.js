const nextConfig = {
  env: {
    HOME_URL: process.env.HOME_URL,
    API_URL: process.env.API_URL,
    ADMIN_API_URL: process.env.ADMIN_API_URL,
    REST_URL: process.env.REST_URL,
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    STRAPI_URL: process.env.STRAPI_URL,
    CHECKOUT_URL: process.env.CHECKOUT_URL,
  },
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ['en','ar'],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: '/shop-api',
        destination: 'http://example.com:8080/graphql'
      },
      {
        source: '/rest-api/:path*',
        destination: 'http://localhost:8080/api'
      },
      {
        source: '/plus',
        destination: '/plus/new'
      },
      {
        source: '/redirect',
        destination: 'https://redirect.viglink.com'
      },
    ]
  }
};

module.exports = nextConfig;