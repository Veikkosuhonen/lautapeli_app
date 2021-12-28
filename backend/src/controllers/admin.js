const router = require("express").Router()

const { User } = require("../models")
const logger = require("../util/logger")
const { adminAuth, getLoggedInUser } = require("../middleware/authorization")

router.get("/", adminAuth, async (request, response) => {
    response.json({ message: "Hello, admin" })
})

module.exports = router