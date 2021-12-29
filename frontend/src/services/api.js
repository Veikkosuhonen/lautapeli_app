import axios from "axios"

let token = null

const setToken = (newToken) => {
    if (!newToken) {
        token = null
    } else {
        token = "bearer " + newToken
    }
}

const getOptions = () => {
    return token ? {
        headers: {
            "Authorization": token
        }
    } : {}
}

const get = (url) => axios.get(url, getOptions())

const post = (url, data) => axios.post(url, data, getOptions())

const put = (url, data) => axios.put(url, data, getOptions())


const api = { setToken, get, post, put }

export default api