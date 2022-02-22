FROM node:17-alpine

RUN apk add bash

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
