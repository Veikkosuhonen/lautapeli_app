FROM node:17

WORKDIR /usr/src/app

COPY package* ./

RUN npm install