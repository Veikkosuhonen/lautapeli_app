# lautapeli_app

![example workflow](https://github.com/Veikkosuhonen/lautapeli_app/actions/workflows/main.yml/badge.svg)

Web-app for logging your groups boardgame sessions. Go see it at https://lautapelit.herokuapp.com/

_Tämä on myös HY:n fullstack-harjoitustyöni_:  [_Tuntikirjanpito_](https://github.com/Veikkosuhonen/lautapeli_app/blob/master/tuntikirjanpito.md)

[_Käyttöohje_](https://github.com/Veikkosuhonen/lautapeli_app/blob/master/kayttoohje.md)

## Features

- [x] Users can create an account using a numeric code with a 48 hour expiration time
- [x] The admin user generates these codes from the admin interface in the app
- [x] Users see all added boardgames and can filter and sort these.
- [x] Users can add new boardgames with a name and a description. The description can be freely edited later
- [x] Users can open each boardgames' page and see its playsessions.
- [x] Users can log their playsessions
- [x] Playsessions contain information about when it happened, what the duration was and who were playing and what each players scores were
- [x] Events such as playsessions, users joining and boardgames getting added, show up on the activity feed
- [x] Playsessions can be deleted by the creator or admin.
- [x] Boardgame can be deleted by the creator or admin if it has no playsessions.
- [x] Users can like boardgames and see the like count
- [ ] Users have 3 mega-likes (for some reason) which they can allocate to boardgames
- [ ] Discussions: users can comment on playsessions and boardgames. 
- [ ] Users can edit and delete their comments. Admin can delete any comment.
- [ ] A separate discussion activity feed for comments shows up besides the normal activity feed.
- [ ] Tags: boardgames can have tags, users can create new tags. Users can search boardgames by tags.
- [ ] Score types: boardgames can have different scoring systems in addition to the default numeric scoring, such as win-lose.
- [ ] Images: boardgames have an image gallery. Users can upload images from the boardgames' page. 
- [ ] Most recently added images show up in a carousel on the landing page.

## How to...

### Dev:

Requirements: Docker, Node

- Fork and clone the repository
- Backend: `npm install`, `docker-compose up`.
- Run backend tests: `npm run test:container`
- Frontend: `npm install` and `npm start`.
- Frontend css: `npm run tailwind:dev`
- Building frontend: `npm run build`

### Deployment:

Github Actions CI is set up to deploy the application to Heroku.

- Installs Node
- Builds frontend
- Builds the backend image and runs tests on it
- Logs into Heroku
- Pushes the image to Heroku repository

## Some tech used

- [Node 17](https://hub.docker.com/_/node)
- Express
- Sequelize
- Jest and SuperTest
- [Postgres](https://hub.docker.com/_/postgres)
- React
- React-Query
- TailwindCSS
