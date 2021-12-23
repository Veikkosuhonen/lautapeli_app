const jwt = require("jsonwebtoken")
const { User } = require("../models")
const { SECRET } = require("./config")

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
    return await User.findByPk(decodedToken.id)
}

module.exports = getLoggedInUser