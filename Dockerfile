FROM node:17

WORKDIR /usr/src/app

COPY . .

EXPOSE 3001

RUN npm install

CMD [ "npm", "start" ] -p $PORT