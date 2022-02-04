const AWS = require("aws-sdk")
const config = require("./config")

const s3Bucket = new AWS.S3({
    region: config.AWS_REGION,
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
})

const getUploadUrl = async (key) => {
    if (config.NODE_ENV === "test") return "test-url"
    const params = {
        Bucket: config.AWS_BUCKET,
        Key: "user-content/" + key,
        Expires: 30
    }
    return await s3Bucket.getSignedUrlPromise("putObject", params)
}

const s3 = { getUploadUrl }

module.exports = s3