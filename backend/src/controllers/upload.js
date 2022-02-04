const router = require("express").Router()
const imageUploadUrl = require("../util/imageUploadUrl")
const { auth } = require("../middleware/authorization")
const { Boardgame } = require("../models")

router.get("/boardgame", auth, async (request, response) => {
    const boardgameId = Number(request.query.id)
    const boardgame = await (Number.isInteger(boardgameId) ? Boardgame.findByPk(boardgameId) : false)
    if (!boardgame) {
        return response.status(400).json({ error: "invalid id" })
    }
    const { url, imageName } = await imageUploadUrl.getUploadUrl()
    return response.json({ url, imageName })
})

module.exports = router