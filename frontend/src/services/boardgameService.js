import api from "./api"

const baseUrl = "/api/boardgames"

const getAll = () => {
    return api.get(baseUrl)
}

const getOne = id => {
    return api.get(baseUrl + "/" + id)
}

const post = (boardgame) => {
    return api.post(baseUrl, boardgame)
}

const put = (id, boardgame) => {
    return api.put(baseUrl + "/" + id, boardgame)
}

const bgService = {
    getAll, getOne, post, put
}

export default bgService
