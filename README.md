# lautapeli_app

![example workflow](https://github.com/Veikkosuhonen/lautapeli_app/actions/workflows/main.yml/badge.svg)

Web-app for logging your groups boardgame sessions. Go see it at https://lautapelit.herokuapp.com/

_Tämä on myös HY:n fullstack-harjoitustyöni_:  [_Tuntikirjanpito_](https://github.com/Veikkosuhonen/lautapeli_app/blob/master/tuntikirjanpito.md)


## How to...

### Dev:

Requirements: Docker, Node

- Fork and clone the repository
- Backend: `docker-compose up`.
- Frontend: `npm install` and `npm start`.
- Frontend css: `npm run tailwind:dev`

- Building frontend: `npm run build`


### Deploy:

Github Actions CI is set up to deploy the application to [Heroku](https://heroku.com).

Create a new Heroku app from your Heroku dashboard. Under _resources_, add the Heroku Postgres add-on.

Enable Actions. The ci-workflow will run on every push:
- Installs Node
- Builds frontend
- Builds the backend image and runs tests on it
- Logs into Heroku (some repository secrets needed, see below)
- Pushes the image to heroku repository

Secrets needed: 
- HEROKU_API_KEY: can be found under your Heroku account settings
- HEROKU_APP_NAME: the name of your Heroku application you've created.

## Tech

- [Node 17](https://hub.docker.com/_/node) backend with Express and Sequelize.
- [Postgres](https://hub.docker.com/_/postgres)
- [React](https://reactjs.org/)
- TailwindCSS
