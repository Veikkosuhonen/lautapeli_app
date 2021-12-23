const logger = require("../util/logger")

const errorHandler = (error, request, response, next) => {
    logger.error("Error Handler found: " + error.name)

    if (error.name === "SequelizeUniqueConstraintError") {
        return response.status(400).send({ error: "unique constraint violation" })
    }

    next(error)
}

module.exports = errorHandler