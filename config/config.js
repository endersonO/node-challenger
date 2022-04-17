require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'dev',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUrl: process.env.NODE_ENV === 'test' ? process.env.DATABASE_URL_TEST : process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    apiSendGrid: process.env.SENDGRID_API_KEY,
    emailSendGrid: process.env.SENDGRID_EMAIL
}

module.exports = { config };