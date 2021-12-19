const Sequelize = require("sequelize")
const { DATABASE_URL, IS_HEROKU } = require("./config")
const logger = require("./logger")
const { Umzug, SequelizeStorage } = require("umzug")

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

const runMigrations = async () => {
    const migrator = new Umzug({
        context: sequelize,
        storage: new SequelizeStorage({
            sequelize,
        }),
        storageOptions: {
            sequelize,
            tableName: "migrations",
        },
        migrations: {
            glob: ["migrations/*.js", { cwd: __dirname }],
        },
    })
    const migrations = await migrator.up()
    logger.debug("Migrations up to date", {
        files: migrations.map((mig) => mig.file),
    })
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        logger.debug("database connected")
    } catch (error) {
        logger.error("connecting database failed")
        logger.error(error)
        // eslint-disable-next-line no-undef
        return process.exit(1)
    }
    return null
    
}

module.exports = { connectToDatabase, sequelize }