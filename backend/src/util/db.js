const Sequelize = require("sequelize")
const { DATABASE_URL, IS_HEROKU } = require("./config")

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: IS_HEROKU ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {},
})

const connectToDatabase = async () => {
    for (let i = 0; i < 10; i++) {
        try {
            await new Promise(r => setTimeout(r, 2000))
            //await sequelize.authenticate()
            console.log("database connected")
            return null
        } catch (err) {
            console.log(`connecting database failed - ${i}/10`)
            await new Promise(r => setTimeout(r, 2000))
        }
    }
    // eslint-disable-next-line no-undef
    return process.exit(1)
}

module.exports = { connectToDatabase, sequelize }