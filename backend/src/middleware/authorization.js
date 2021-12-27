const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { SECRET } = require("../util/config")

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
        attributes: ["id", "username", "name"]
    })
}

const authorization = (request, response, next) => {
    const token = getTokenFrom(request)
    if (!token) {
        response.sendStatus(401)
    }
    const decodedToken = jwt.verify(token, SECRET)
    if (!decodedToken.id) {
        response.sendStatus(401)
    }
    next()
}

module.exports = { authorization, getLoggedInUser }
