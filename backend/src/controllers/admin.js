const router = require("express").Router()

const { adminAuth } = require("../middleware/authorization")
const signupCodeService = require("../util/signupCodeService")

router.get("/", adminAuth, (request, response) => {
    response.json({ message: "Hello, admin" })
})

router.post("/codes", adminAuth, async (request, response) => {
    const code = await signupCodeService.createNew()
    response.json(code)
})

router.get("/codes", adminAuth, async (request, response) => {
    const codes = await signupCodeService.getAll()
    response.json(codes)
})

module.exports = router