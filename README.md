# lautapeli_app

![example workflow](https://github.com/Veikkosuhonen/lautapeli_app/actions/workflows/main.yml/badge.svg)

Web-app for logging your groups boardgame sessions. Go see it at https://lautapelit.herokuapp.com/

_Tämä on myös HY:n fullstack-harjoitustyöni_:  [_Tuntikirjanpito_](https://github.com/Veikkosuhonen/lautapeli_app/blob/master/tuntikirjanpito.md)

[_Käyttöohje_](https://github.com/Veikkosuhonen/lautapeli_app/blob/master/kayttoohje.md)

## Features

- Users can create an account using a numeric code with a 48 hour expiration time
- The admin user generates these codes from the admin interface in the app
- Users see all added boardgames and can filter and sort these.
- Users can add new boardgames with a name and a description. The description can be freely edited later
- Users can open each boardgames' page and see its playsessions.
- Users can log their playsessions
- Playsessions contain information about when it happened, what the duration was and who were playing and what each players scores were
- Events such as playsessions, users joining and boardgames getting added, show up on the activity feed

### Planned

- Discussions: users can comment on playsessions and boardgames. 
- A separate discussion activity feed for comments shows up besides the normal activity feed.
- Tags: boardgames can have tags, users can create new tags. Users can search boardgames by tags.
- Score types: boardgames can have different scoring systems in addition to the default numeric scoring, such as win-lose.
- Images: boardgames have an image gallery. Users can upload images from the boardgames' page. 
- Most recently added images show up in a carousel on the landing page.

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
