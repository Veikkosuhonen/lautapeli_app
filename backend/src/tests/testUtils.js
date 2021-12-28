const { User } = require("../models")
const logger = require("../util/logger")

let token = null

const register = async (api, username, name, password) => {
    username = username || "veikmaster"
    name = name || "Veikko"
    password = password || "yykaakoonee"
    return await api.post("/api/users").send({
        username,
        name,
        password
    })
}

const login = async (api, username, password) => {
    if (!username) username = "veikmaster"
    if (!password) password = "yykaakoonee"

    response = await api.post("/api/login").send({
        username,
        password
    })
    token = response.body.token
    return response
}

const getToken = () => {
    return "bearer " + token
}

const clearUsers = async () => {
    await User.destroy({
        where: {
            isAdmin: false
        }
    })
    const n = await User.count()
    if (n !== 1) {
        logger.error("For some reason, there is not exactly one admin in db")
    }
}

const testUtils = { register, login, getToken, clearUsers }

module.exports = testUtils