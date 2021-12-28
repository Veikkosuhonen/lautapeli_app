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
        attributes: ["id", "username", "name", "isAdmin"]
    })
}

const auth = (request, response, next) => {
    const token = getTokenFrom(request)
    if (!token) {
        return response.status(401).json({ error: "token missing" })
    }
    const decodedToken = jwt.verify(token, SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: "invalid token" })
    }
    next()
}

const adminAuth = (request, response, next) => {
    getLoggedInUser(request).then(user => {
        if (!user || !user.isAdmin) {
            return response.status(401).json({ error: "Unauthorized" })
        }
        next()
    }).catch(error => {
        logger.error(error)
        return response.status(401).json({ error: "Unauthorized" })
    })
}

module.exports = { auth, getLoggedInUser, adminAuth }
