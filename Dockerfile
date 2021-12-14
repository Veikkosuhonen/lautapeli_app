FROM node:17

WORKDIR /usr/src/app

COPY . .

EXPOSE $PORT

RUN npm install

CMD [ "npm", "start" ]