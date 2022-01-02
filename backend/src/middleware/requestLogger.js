const logger = require("../util/logger")

const requestLogger = (request, response, next) => {
    logger.info(`${request.method} ${request.path}`)
    if (request.body) {
        if ("password" in request.body || "token" in request.body) {
            logger.info("    { credentials! }")
        } else {
            logger.info("   ", request.body)
        }
    }
    next()
}

module.exports = requestLogger