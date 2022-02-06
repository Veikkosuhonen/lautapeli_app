const router = require("express").Router()
const imageUploadUrl = require("../util/imageUploadUrl")
const { auth } = require("../middleware/authorization")
const { Boardgame, Image } = require("../models")


const getExtension = (type) => {
    switch (type) {
    case "image/jpeg": return "jpg"
    case "image/png": return "png"
    default: return null
    }
}

router.get("/boardgame", auth, async (request, response) => {
    const boardgameId = Number(request.query.id)
    const boardgame = await (Number.isInteger(boardgameId) ? Boardgame.findByPk(boardgameId) : false)
    if (!boardgame) {
        return response.status(400).json({ error: "invalid id" })
    }
    const extension = getExtension(request.query.fileType)
    if (!extension) {
        return response.status(400).json({ error: "invalid filetype: must be image/jpeg or image/png, was " + request.query.fileType})
    }
    const { url, imageName } = await imageUploadUrl.getUploadUrl(extension)
    return response.json({ url, imageName })
})

router.post("/boardgame", auth, async (request, response) => {
    const imageName = request.body.imageName
    if (!imageName) {
        return response.status(400).json({ error: "imageName missing" })
    }
    const exists = await imageUploadUrl.verifyResource(imageName)
    if (!exists) {
        return response.status(400).json({ error: "imageNotFound" })
    }
    const boardgameId = Number(request.query.id)
    const boardgame = await (Number.isInteger(boardgameId) ? Boardgame.findByPk(boardgameId) : false)
    if (!boardgame) {
        return response.status(400).json({ error: "invalid id" })
    }
    
    const image = await Image.create({ 
        fileName: imageName, 
        description: request.body.description,
        boardgameId,
        userId: request.user.id
    })

    return response.status(200).json(image)
})

module.exports = router