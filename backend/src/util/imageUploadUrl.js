const s3 = require("./s3")
const crypto = require("crypto")
const axios = require("axios")

/** Generates a random hex string of length n, if n is uneven, it is padded with 0 */
const getRandomBytes = (n) => {
    return crypto.randomBytes(Math.floor(n / 2)).toString("hex").padEnd(n, "0")
}

const getNewImageName = (fileType) => {
    // Get date as YYYYMMdd
    let name = "." + fileType.toLowerCase()
    const paddingLength = 16 - name.length
    const byteString = getRandomBytes(paddingLength)
    return byteString + name
}

const getUploadUrl = async (fileType) => {
    const imageName = getNewImageName(fileType)
    const url = await s3.getSignedUploadUrl("user-content/" + imageName)
    return { url, imageName }
}

const getResourceUrl = (fileName) => {
    return `https://${s3.bucketName}.s3.${s3.region}.amazonaws.com/user-content/${fileName}`
}

const verifyResource = async (fileName) => {
    const url = getResourceUrl(fileName)
    const response = await axios.head(url)
    return response.status === 200
}

module.exports = { getNewImageName, getUploadUrl, getResourceUrl, verifyResource }