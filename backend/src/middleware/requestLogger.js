const logger = require("../util/logger")

const requestLogger = (request, response, next) => {
    logger.info(`${request.method} ${request.path}: ${response.statusCode}`)
    if (request.body) {
        logger.info(request.body)
        logger.info("---")
    }
    next()
}

module.exports = requestLogger