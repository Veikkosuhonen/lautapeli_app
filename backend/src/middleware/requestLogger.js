const logger = require("../util/logger")

const requestLogger = (request, response, next) => {
    logger.info(`${request.method} ${request.path}`)
    if (request.body) {
        logger.info("   ", request.body)
    }
    next()
}

module.exports = requestLogger