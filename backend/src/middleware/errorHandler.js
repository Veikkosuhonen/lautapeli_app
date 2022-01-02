const logger = require("../util/logger")

const errorHandler = (error, request, response, next) => {
    if (error.name === "SequelizeUniqueConstraintError") {
        return response.status(400).send({ status: 400, error: "unique constraint violation" })
    }

    logger.error("Error Handler found: " + error.name)

    next(error)
}

module.exports = errorHandler