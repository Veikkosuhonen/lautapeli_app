const s3 = require("./s3")
const crypto = require("crypto")

/** Generates a random hex string of length n, if n is uneven, it is padded with 0 */
const getRandomBytes = (n) => {
    return crypto.randomBytes(Math.floor(n / 2)).toString("hex").padEnd(n, "0")
}

const getImageName = () => {
    // Get date as YYYYMMdd
    const date = new Date().toISOString().substring(0, 10).replace(/-/g, "")
    let name = date + "-"
    const paddingLength = 16 - name.length
    const byteString = getRandomBytes(paddingLength)
    return name + byteString
}

const getUploadUrl = async () => {
    const imageName = getImageName()
    const url = await s3.getUploadUrl(imageName)
    return { url, imageName }
}

module.exports = { getImageName, getUploadUrl }