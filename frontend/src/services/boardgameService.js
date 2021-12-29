import api from "./api"

const baseUrl = "/api/boardgames"

const getAll = () => {
    return api.get(baseUrl).then(response => response.data)
}

const getOne = id => {
    return api.get(baseUrl + "/" + id).then(response => response.data)
}

const post = (boardgame) => {
    return api.post(baseUrl, boardgame).then(response => response.data)
}

const bgService = {
    getAll, getOne, post
}

export default bgService
