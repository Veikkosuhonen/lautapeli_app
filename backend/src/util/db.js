const Sequelize = require("sequelize")
const { DATABASE_URL, IS_HEROKU } = require("./config")
const logger = require("./logger")
const { Umzug, SequelizeStorage } = require("umzug")
const bcrypt = require("bcrypt")
const { ADMIN_USER, ADMIN_PASSWORD } = require("./config")

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
            // eslint-disable-next-line no-undef
            glob: ["../migrations/*.js", { cwd: __dirname }],
        },
    })
    const migrations = await migrator.up()
    logger.info("Migrations up to date", {
        files: migrations.length,
    })
}

const createAdmin = async () => {
    if (!ADMIN_USER || !ADMIN_PASSWORD) {
        logger.error("ADMIN_USER or ADMIN_PASSWORD env vars undefined")
        return
    }
    const [exists, ] = await sequelize.query(
        "SELECT id FROM users WHERE username=? AND \"isAdmin\"",
        { replacements: [ADMIN_USER]} )
    if (exists.length !== 0) {
        logger.info("Admin already exists")
        return
    }
    
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, 10)

    try {
        await sequelize.query(
            "INSERT INTO users VALUES (DEFAULT, ?, ?, ?, ?)",
            { 
                logging: undefined,
                replacements: [ADMIN_USER, passwordHash, "Administraattori", true] 
            }
        )
        logger.info("Admin created")
    } catch (error) {
        logger.error("Error when creating admin: ")
        logger.error(error)
    }
}

const connectToDatabase = async () => {
    try {
        await sequelize.authenticate()
        await runMigrations()
        await createAdmin()
        //debugTables()
        logger.info("Database connected")
    } catch (error) {
        logger.error("connecting database failed")
        logger.error(error)
        // eslint-disable-next-line no-undef
        return process.exit(1)
    }
    return null
}

// eslint-disable-next-line no-unused-vars
const debugTables = async () => {
    const tables = await sequelize.query("SELECT * \
    FROM pg_catalog.pg_tables \
    WHERE schemaname != 'pg_catalog' AND \
        schemaname != 'information_schema';")
    console.log(tables)
}

module.exports = { connectToDatabase, sequelize }