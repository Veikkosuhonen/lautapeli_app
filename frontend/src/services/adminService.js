import api from "./api";

const baseUrl = "/api/admin"

const getCodes = () => {
    return api.get(baseUrl + "/codes")
}

const genCode = () => {
    return api.post(baseUrl + "/codes")
}

const adminService = {
    getCodes, genCode
}

export default adminService