const router = require("express").Router()

const { Boardgame, PlaySession, User, Activity } = require("../models")
const logger = require("../util/logger")
const { auth, getLoggedInUser } = require("../middleware/authorization")

router.get("/", auth, async (request, response) => {
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
                attributes: ["id", "name"],
            }
        ]
    })
    response.json(bgs)
})

router.get("/:id", auth, async (request, response) => {
    const bg = await Boardgame.findByPk(request.params.id, {
        attributes: { exclude: ["addedById"] },
        include: [
            {
                model: PlaySession,
                attributes: { exclude: ["boardgameId"] },
                include: [
                    {
                        model: User,
                        as: "players",
                        attributes: ["id", "name"],
                        through: {
                            attributes: ["score"]
                        }
                    }
                ]
            },
            {
                model: User,
                as: "addedBy",
                attributes: ["id", "name"],
            }
        ]
    })

    if (bg) {
        logger.info(bg.toJSON())
        response.json(bg)
    } else {
        response.status(404).json({ error: "Invalid id" })
    }
})

const validateBoardgame = (body) => {
    return body.name !== undefined
}

router.post("/", auth, async (request, response, next) => {
    const user = await getLoggedInUser(request)
    if (!user) {
        return response.sendStatus(401)
    }

    const boardgame = {
        ...request.body,
        addedById: user.id
    }

    if (!validateBoardgame(boardgame)) {
        return response.status(400).json({ error: "invalid boardgame" })
    }

    try {
        const bg = await Boardgame.create(boardgame)
        const activity = await Activity.create({ 
            description: `${user.name} added ${boardgame.name}`,
            link: `/boardgames/${bg.id}`
        })
        
        return response.json({
            boardgame: bg.toJSON(),
            activity: activity.toJSON()
        })
    } catch(error) {
        next(error)
    }
    
})

router.put("/:id", auth, async (request, response) => {
    const bg = await Boardgame.findByPk(request.params.id)
    const newBg = request.body
    if (!newBg) {
        return response.sendStatus(405)
    }
    if (!bg) {
        return response.sendStatus(404)
    }
    bg.name = newBg.name || bg.name
    bg.description = newBg.description || bg.description
    await bg.save()
    logger.info(bg.toJSON())
    response.json(bg)
})

module.exports = router