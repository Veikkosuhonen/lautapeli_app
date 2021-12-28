const EXPIRATION_SECONDS = 120
const CODE_LENGTH = 4

let codes = []

const generateCode = () => {
    let code = ""
    for (let i = 0; i < CODE_LENGTH; i++) {
        code += Math.floor(Math.random() * 10)
    }
    return code
}

const createNew = () => {
    const newCode = {
        code: generateCode(),
        date: Date.now()
    }
    codes.push(newCode)
    return newCode
}

const removeDatedCodes = () => {
    const now = Date.now()
    codes = codes.filter(c => now - c.date < 1000 * EXPIRATION_SECONDS)
}

const useCode = (code) => {
    removeDatedCodes()
    const isValid = codes.some(c => c.code === code.code)
    if (isValid) {
        codes = codes.filter(c => c.code !== code.code)
        return true
    }
    return false
}

module.exports = { codes, createNew, useCode } 