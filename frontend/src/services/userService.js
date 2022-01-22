import api from "./api";

const baseUrl = "/api/users"

const getAll = () => {
    return api.get(baseUrl)
}

const getOne = (id) => {
    return api.get(baseUrl + "/" + id)
}

const put = (data) => {
    return api.put(baseUrl + "/" + data.id, data)
}

const userService = {
    getAll, getOne, put
}

export default userService