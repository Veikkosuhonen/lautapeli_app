import axios from 'axios'

const baseUrl = "/api/playsessions"

const post = (playSession) => {
    return axios.post(baseUrl, playSession).then(response => response.data)
}

const playSessionService = {
    post
}

export default playSessionService