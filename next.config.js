const nextConfig = {
    env: {
        API_URL: `${process.env.API_URL}/graphql`,
        REST_URL: process.env.REST_URL,
        FEDEX_CLIENT_ID: process.env.FEDEX_CLIENT_ID,
        FEDEX_CLIENT_SECRET: process.env.FEDEX_CLIENT_SECRET,
        FEDEX_URL: process.env.FEDEX_URL,
        FEDEX_ACCOUNT_NUMBER: process.env.FEDEX_ACCOUNT_NUMBER,
        CHECKOUT_URL:process.env.CHECKOUT_URL
    },
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
}

module.exports = nextConfig
