import api from "./api"

const baseUrl = "/api/playsessions"

const post = (playSession) => {
    return api.post(baseUrl, playSession)
}

const playSessionService = {
    post
}

export default playSessionService