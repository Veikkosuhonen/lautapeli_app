import axios from "axios"

const putObject = (url, object) => {
    return axios.put(url, object, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    })
}

const s3 = { putObject }

export default s3