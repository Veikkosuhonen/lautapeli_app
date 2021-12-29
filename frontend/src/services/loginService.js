import api from "./api"

const baseUrl = "/api/login"

const login = async (credentials) => {
    const response = await api.post(baseUrl, credentials)
    return response.data
}

const loginService = {
    login
}

export default loginService
