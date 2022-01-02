import api from "./api";

const baseUrl = "/api/register"

const register = (credentials) => {
    return api.post(baseUrl, credentials)
}

const registerService = {
    register
}

export default registerService