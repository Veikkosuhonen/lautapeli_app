
let token = null

const register = async (api) => {
    return await api.post("/api/users").send({
        username: "veikmaster",
        name: "Veikko",
        password: "yykaakoonee"
    })
}

const login = async (api) => {
    response = await api.post("/api/login").send({
        username: "veikmaster",
        password: "yykaakoonee"
    })
    token = response.body.token
    return response
}

const getToken = () => "bearer " + token

const testUtils = { register, login, getToken }

module.exports = testUtils