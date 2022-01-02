import api from "./api";

const baseUrl = "/api/users"

const getAll = () => {
    return api.get(baseUrl)
}

const getOne = (id) => {
    return api.get(baseUrl + "/" + id)
}

const put = (id, data) => {
    return api.put(baseUrl + "/" + id, data)
}

const userService = {
    getAll, getOne, put
}

export default userService