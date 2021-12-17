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
    try {
        await sequelize.authenticate()
        console.log("database connected")
    } catch (err) {
        console.log("connecting database failed")
        // eslint-disable-next-line no-undef
        return process.exit(1)
    }

    return null
}

module.exports = { connectToDatabase, sequelize }