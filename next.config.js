const nextConfig = {
    env: {
        API_URL: `${process.env.API_URL}/graphql`,
        REST_URL: process.env.REST_URL,
        CHECKOUT_URL:process.env.CHECKOUT_URL
    },
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
}

module.exports = nextConfig
