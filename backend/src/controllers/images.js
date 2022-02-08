const router = require("express").Router()
const { Image } = require("../models")

router.get("/recent", async (_, response) => {
    const images = await Image.findAll({
        order: [["date", "DESC"]],
        limit: 5
    })
    return response.json(images)
})

module.exports = router