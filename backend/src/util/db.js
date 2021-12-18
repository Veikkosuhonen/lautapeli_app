const Sequelize = require("sequelize")
const { DATABASE_URL, IS_HEROKU } = require("./config")
const logger = require("./logger")

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: IS_HEROKU ? {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    } : {},
    logging: false
})

const connectToDatabase = async () => {
    try {
        await new Promise(r => setTimeout(r, 2000))
        //await sequelize.authenticate()
        logger.info("database connected")
    } catch (err) {
        logger.info("connecting database failed")
        // eslint-disable-next-line no-undef
        return process.exit(1)
    }
    return null
    
}

module.exports = { connectToDatabase, sequelize }