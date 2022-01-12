const router = require("express").Router()

const { Activity } = require("../models")
const { auth } = require("../middleware/authorization")

router.get("/", auth, async (request, response) => {
    const activities = await Activity.findAll()
    response.json(activities)
})

module.exports = router