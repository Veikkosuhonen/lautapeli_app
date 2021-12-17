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
    SECRET: process.env.SECRET
}