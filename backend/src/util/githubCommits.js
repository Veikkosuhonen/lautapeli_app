const axios = require("axios")
const logger = require("./logger")

const numberOfCommits = 5

const url = "https://api.github.com/repos/Veikkosuhonen/lautapeli_app/commits?path=frontend/src/&per_page=" + numberOfCommits

let recentCommits = []


/**
 * A simple api call to github to fetch a few recent commits and store author, date and message
 */
const fetchRecent = async () => {
    axios.get(url).then(response => {
        recentCommits = response.data.map(c => ({
            author: c.commit.author.name,
            date: c.commit.author.date,
            message: c.commit.message
        }))
        logger.info("Got " + recentCommits.length + " recent commits from github")
    }).catch(error => {
        logger.error(error)
    })
}

const getRecentCommits = () => recentCommits

const githubCommits = {
    getRecentCommits, fetchRecent
}

module.exports = githubCommits