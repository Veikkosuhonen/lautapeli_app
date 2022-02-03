/* eslint-disable no-undef */
require("dotenv").config()

let dbUrl = process.env.DATABASE_URL
const probablyHeroku = dbUrl != undefined

if (!dbUrl) {
    dbUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}`
}

module.exports = {
    DATABASE_URL: dbUrl,

    IS_HEROKU: probablyHeroku,

    PORT: process.env.PORT || 3001,

    SECRET: process.env.SECRET,

    NODE_ENV: process.env.NODE_ENV,

    ADMIN_USER: process.env.ADMIN_USER,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD,

    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_BUCKET: process.env.AWS_BUCKET || "lautapeli-app",
    AWS_REGION: process.env.AWS_REGION || "eu-north-1"
}