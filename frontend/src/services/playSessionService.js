import api from "./api"

const baseUrl = "/api/playsessions"

const post = (playSession) => {
    return api.post(baseUrl, playSession).then(response => response.data)
}

const playSessionService = {
    post
}

export default playSessionService