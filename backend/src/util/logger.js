const { NODE_ENV } = require("./config")

const testing = NODE_ENV === "test"

const info = (...params) => {
    if (!testing)
        console.log(...params)
}

const error = (...params) => {
    console.error(...params)
}

module.exports = {
    info, error
}