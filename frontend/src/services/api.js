import axios from "axios"

class ApiError extends Error {
    constructor(jsonResponse) {
        super(jsonResponse.error)
        this.status = jsonResponse.status
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
            if (error.response) {
                console.log(error.response.data)
                throw new ApiError(error.response.data)
            } else {
                console.log(error)
                throw error
            }
        })
}

const get = (url) => processResponse(axios.get(url, getOptions()))

const post = (url, data) => processResponse(axios.post(url, data, getOptions()))

const put = (url, data) => processResponse(axios.put(url, data, getOptions()))


const api = { setToken, get, post, put }

export default api