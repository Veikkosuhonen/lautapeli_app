const router = require("express").Router()

const { Boardgame, PlaySession, User } = require("../models")
const logger = require("../util/logger")
const { authorization, getLoggedInUser } = require("../middleware/authorization")

router.use(authorization)

router.get("/", async (request, response) => {
    const bgs = await Boardgame.findAll({
        attributes: { exclude: ["addedById"] },
        include: [
            {
                model: PlaySession,
                attributes: { exclude: ["boardgameId", "players"] },
            },
            {
                model: User,
                as: "addedBy",
                attributes: { exclude: ["username", "passwordHash"] },
            }
        ]
    })
    response.json(bgs)
})

router.get("/:id", async (request, response) => {
    const bg = await Boardgame.findByPk(request.params.id, {
        attributes: { exclude: ["addedById"] },
        include: [
            {
                model: PlaySession,
                attributes: { exclude: ["boardgameId"] },
            },
            {
                model: User,
                as: "addedBy",
                attributes: { exclude: ["username", "passwordHash"] },
            }
        ]
    })

    if (bg) {
        logger.info(bg.toJSON())
        response.json(bg)
    } else {
        response.status(404).end()
    }
})

const validateBoardgame = (body) => {
    return body.name !== undefined
}

router.post("/", authorization, async (request, response, next) => {
    const user = await getLoggedInUser(request)
    if (!user) {
        return response.sendStatus(401)
    }
    const boardgame = {
        ...request.body,
        addedById: user.id
    }
    if (!validateBoardgame(boardgame)) {
        return response.sendStatus(405)
    } else {
        try {
            const bg = await Boardgame.create(boardgame)
            logger.info(bg.toJSON())
            return response.json(bg)
        } catch(error) {
            next(error)
        }
    }
})

router.put("/:id", authorization, async (request, response) => {
    const bg = await Boardgame.findByPk(request.params.id)
    const newBg = request.body
    if (!newBg) {
        return response.sendStatus(405)
    }
    if (!bg) {
        return response.sendStatus(404)
    }
    bg.name = newBg.name || bg.name
    bg.timesPlayed = newBg.timesPlayed || bg.timesPlayed
    await bg.save()
    logger.info(bg.toJSON())
    response.json(bg)
})

module.exports = router