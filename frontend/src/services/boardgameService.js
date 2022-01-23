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

const put = (boardgame) => {
    return api.put(baseUrl + "/" + boardgame.id, boardgame)
}

const deleteBoardgame = (boardgame) => {
    return api.del(baseUrl + "/" + boardgame.id)
}

const boardgameService = {
    getAll, getOne, post, put, deleteBoardgame
}

export default boardgameService
