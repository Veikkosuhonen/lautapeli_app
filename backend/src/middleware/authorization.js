const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { SECRET } = require("../util/config")
const logger = require("../util/logger")

const getTokenFrom = (request) => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7)
    }
    return null
}

const getLoggedInUser = async (request) => {
    const token = getTokenFrom(request)
    if (!token) {
        return null
    }
    const decodedToken = jwt.verify(token, SECRET)
    if (!decodedToken.id) {
        return null
    }
    return await User.findByPk(decodedToken.id, {
        attributes: ["id", "username", "name", "isAdmin", "disabled"]
    })
}

const auth = (request, response, next) => {
    getLoggedInUser(request).then(user => {
        if (!user) {
            return response.status(401).json({ status: 401, error: "token missing or invalid" })
        }
        if (user.disabled) {
            return response.status(401).json({ status: 401, error: "account disabled" })
        }
        next()
    }).catch(error => {
        logger.error(error)
        return response.status(401).json({ status: 401, error: "token missing or invalid" })
    })
}

const adminAuth = (request, response, next) => {
    getLoggedInUser(request).then(user => {
        if (!user || !user.isAdmin) {
            return response.status(401).json({ status: 401, error: "Unauthorized" })
        }
        next()
    }).catch(error => {
        logger.error(error)
        return response.status(401).json({ status: 401, error: "Unauthorized" })
    })
}

module.exports = { auth, getLoggedInUser, adminAuth }
