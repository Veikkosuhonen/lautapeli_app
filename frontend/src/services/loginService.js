import api from "./api"

const baseUrl = "/api/login"

const login = (credentials) => {
    return api.post(baseUrl, credentials)
}

const loginService = {
    login
}

export default loginService
