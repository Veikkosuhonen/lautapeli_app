import api from "./api";

const baseUrl = "/api/users"

const getAll = () => {
    return api.get(baseUrl).then(response => response.data)
}

const getOne = (id) => {
    return api.get(baseUrl + "/" + id).then(response => response.data)
}

const put = (id, data) => {
    return api.put(baseUrl + "/" + id, data).then(response => response.data)
}

const userService = {
    getAll, getOne, put
}

export default userService