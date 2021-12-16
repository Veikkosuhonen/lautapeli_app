# lautapeli_app

![example workflow](https://github.com/Veikkosuhonen/lautapeli_app/actions/workflows/main.yml/badge.svg)

Web-app for logging your groups boardgame sessions.

## How to...

### Dev:

Requirements: Docker

Fork and clone the repository and run `docker-compose up`. Open the workspace in the editor of your choice and start hacking!

### Deploy:

Github Actions CI is set up to deploy the application to [Heroku](https://heroku.com). You will need a (free) account. 

Create a new Heroku app from your Heroku dashboard. Under _resources_, add the Heroku Postgres add-on.

Enable Actions. The ci-workflow will run on every push:
- Installs Node
- Builds frontend
- Runs backend verification (currently only lint)
- Logs into Heroku (some repository secrets needed, see below)
- Builds an image and pushes it to Heroku

Secrets needed: 
- HEROKU_API_KEY: can be found under your Heroku account settings
- HEROKU_APP_NAME: the name of your Heroku application you've created.

## Stack

- [Node 17](https://hub.docker.com/_/node) backend with express.
- [Postgres](https://hub.docker.com/_/postgres)
- [React](https://reactjs.org/)
