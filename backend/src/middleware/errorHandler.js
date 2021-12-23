const logger = require("../util/logger")

const errorHandler = (error, request, response, next) => {
    logger.error("Error Handler found: " + error.message)

    next(error)
}

module.exports = errorHandler