const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
    },
    i18n: {
        locales: ['en', 'ar'],
        defaultLocale: 'en',
    },
}

module.exports = nextConfig
