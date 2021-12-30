import api from "./api";

const baseUrl = "/api/admin"

const getCodes = () => {
    return api.get(baseUrl + "/codes").then(response => response.data)
}

const genCode = () => {
    return api.post(baseUrl + "/codes").then(response => response.data)
}

const adminService = {
    getCodes, genCode
}

export default adminService