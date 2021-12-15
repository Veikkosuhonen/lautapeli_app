import axios from 'axios'

const baseUrl = "/api/boardgames"

const getAll = () => {
    console.log("Getting stuff from server")
    return axios.get(baseUrl).then(response => response.data)
}

const post = (boardgame) => {
    return axios.post(baseUrl, boardgame).then(response => response.data)
}

const bgService = {
    getAll, post
}

export default bgService
