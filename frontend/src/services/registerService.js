import api from "./api";

const baseUrl = "/api/register"

const register = (credentials) => {
    return api.post(baseUrl, credentials).then(response => response.data)
}

const registerService = {
    register
}

export default registerService