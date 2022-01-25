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
    const id = Number(request.params.id)
    if (!id) {
        return response.sendStatus(404)
    }
    const bg = await Boardgame.findByPk(id, {
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
            },
            {
                model: User,
                as: "likes",
                attributes: ["id", "name"]
            }
        ]
    })

    if (bg) {
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

        const responseObject = {
            boardgame: {
                ...bg.toJSON(),
                addedBy: {
                    id: user.id,
                    name: user.name
                }
            },
            activity: activity.toJSON()
        }
        
        return response.json(responseObject)
    } catch(error) {
        next(error)
    }
    
})

router.put("/:id", auth, async (request, response) => {
    const id = Number(request.params.id)
    if (!id) return response.sendStatus(404)
    const newBg = request.body
    if (!newBg) {
        return response.sendStatus(405)
    }
    const bg = await Boardgame.findByPk(id)
    if (!bg) {
        return response.sendStatus(404)
    }
    bg.name = newBg.name || bg.name
    bg.description = newBg.description === "" ? "" : newBg.description || bg.description
    await bg.save()
    logger.info(bg.toJSON())
    response.json(bg)
})

router.delete("/:id", auth, async (request, response) => {
    const id = Number(request.params.id)
    if (!id) return response.sendStatus(404)
    const boardgame = await Boardgame.findByPk(id)
    if (!boardgame) {
        return response.sendStatus(404)
    }
    const user = request.user
    if (user.id !== boardgame.addedById && !user.idAdmin) {
        return response.status(401).json({ error: "Not authorized to delete this boardgame" })
    }
    if ((await boardgame.countPlaySessions()) !== 0) {
        return response.status(403).json({ error: "Cannot delete, boardgame has playsessions" })
    }
    await boardgame.destroy()

    return response.status(200).json({ id })
})

router.post("/:id/like", auth, async (request, response) => {
    const id = Number(request.params.id)
    if (!id) return response.sendStatus(404)
    const boardgame = await Boardgame.findByPk(id)
    if (!boardgame) {
        return response.sendStatus(404)
    }
    const isLike = request.body?.like
    const user = request.user
    
    if (isLike === true) {
        await boardgame.addLike(user)
    } else if (isLike === false) {
        await boardgame.removeLike(user)
    } else {
        return response.sendStatus(400)
    }

    return response.status(200).json({ like: isLike })
})

module.exports = router