const jwt = require("jsonwebtoken")
const { User } = require("../models/user")
const { SECRET } = require("../util/config")

const getTokenFrom = request => {
    const authorization = request.get("authorization")
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        return authorization.substring(7)
    }
    return null
}

const getLoggedInUser = async request => {
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, SECRET)
    if (!token || !decodedToken.id) {
        return null
    }
    return await User.findById(decodedToken.id)
}

module.exports = getLoggedInUser