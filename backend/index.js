require("dotenv").config()
const { Sequelize, Model, DataTypes } = require("sequelize")
const express = require("express")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("build"))




// eslint-disable-next-line no-undef
let dbUrl = process.env.DATABASE_URL

if (!dbUrl) {
    // eslint-disable-next-line no-undef
    dbUrl = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}/${process.env.POSTGRES_DATABASE}`
}

const sequelize = new Sequelize(dbUrl, {
    dialect: "postgres",
    dialectOptions: {
        
    },
})


class Boardgame extends Model {}
Boardgame.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    timesPlayed: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    dateAdded: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "boardgame"
})
Boardgame.sync()




app.get("/api/boardgames", async (request, response) => {
    //console.log("GET " + request.url)
    const bgs = await Boardgame.findAll()
    response.json(bgs)
})

const validateBoardgame = (body) => {
    return body.name !== undefined
}

const addBoardgame = async (body) => {
    return await Boardgame.create({ name: body.name })
}

app.post("/api/boardgames", async (request, response) => {
    const boardgame = request.body
    if (!validateBoardgame(boardgame)) {
        response.sendStatus(405)
    } else {
        const bg = await addBoardgame(boardgame)
        response.json(bg)
    }
})




// eslint-disable-next-line no-undef
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})