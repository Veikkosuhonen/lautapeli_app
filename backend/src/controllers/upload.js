const router = require("express").Router()
const s3 = require("../util/s3")
const { auth } = require("../middleware/authorization")
const { Boardgame } = require("../models")

router.get("/boardgame", auth, async (request, response) => {
    const boardgameId = Number(request.query.id)
    const boardgame = await (Number.isInteger(boardgameId) ? Boardgame.findByPk(boardgameId) : false)
    if (!boardgame) {
        return response.status(400).json({ error: "invalid id" })
    }
    const url = await s3.getUploadUrl()
    return response.json({ url })
})

module.exports = router