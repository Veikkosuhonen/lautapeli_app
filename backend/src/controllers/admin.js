const router = require("express").Router()

const { User } = require("../models")
const logger = require("../util/logger")
const { adminAuth, getLoggedInUser } = require("../middleware/authorization")
const signupCodeService = require("../util/signupCodeService")

router.get("/", adminAuth, (request, response) => {
    response.json({ message: "Hello, admin" })
})

router.post("/codes", adminAuth, (request, response) => {
    const code = signupCodeService.createNew()
    response.json(code)
})

router.get("/codes", adminAuth, (request, response) => {
    response.json(signupCodeService.codes)
})

module.exports = router