import axios from "axios"

class ApiError extends Error {
    status = null
    constructor(response) {
        let json = response.data
        super(json.error)
        this.status = json.status || response.status
    }
}

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

const processResponse = (response) => {
    return response
        .then(response => response.data)
        .catch(error => {
            if (error.response && error.response.data) {
                console.log(error.response.data)
                throw new ApiError(error.response)
            } else {
                console.log(error)
                throw error
            }
        })
}

const get = (url) => processResponse(axios.get(url, getOptions()))

const post = (url, data) => processResponse(axios.post(url, data, getOptions()))

const put = (url, data) => processResponse(axios.put(url, data, getOptions()))

const del = (url) => processResponse(axios.delete(url, getOptions()))

const api = { setToken, get, post, put, del }

export default api