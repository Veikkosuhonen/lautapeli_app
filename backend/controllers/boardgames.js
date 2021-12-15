const router = require("express").Router()

const { Boardgame, PlaySession } = require("../models")


router.get("/", async (request, response) => {
    //console.log("GET " + request.url)
    const bgs = await Boardgame.findAll()
    response.json(bgs)
})

router.get("/:id", async (request, response) => {
    const bg = await Boardgame.findByPk(request.params.id, {
        include: {
            model: PlaySession,
            attributes: { exclude: ["boardgameId"] }
        }
    })
    if (bg) {
        console.log(bg.toJSON())
        response.json(bg)
    } else {
        response.status(404).end()
    }
})

const validateBoardgame = (body) => {
    return body.name !== undefined
}

const addBoardgame = async (body) => {
    return await Boardgame.create({ name: body.name })
}

router.post("/", async (request, response) => {
    const boardgame = request.body
    if (!validateBoardgame(boardgame)) {
        response.sendStatus(405)
    } else {
        try {
            const bg = await addBoardgame(boardgame)
            console.log(bg.toJSON())
            return response.json(bg)
        } catch(error) {
            return response.status(400).json({ error })
        }
    }
})

router.put("/:id", async (request, response) => {
    const bg = await Boardgame.findByPk(request.params.id)
    const newBg = request.body
    if (bg && newBg) {
        bg.name = newBg.name || bg.name
        bg.timesPlayed = newBg.timesPlayed || bg.timesPlayed
        await bg.save()
        console.log(bg.toJSON())
        response.json(bg)
    } else {
        response.status(404).end()
    }
})

module.exports = router