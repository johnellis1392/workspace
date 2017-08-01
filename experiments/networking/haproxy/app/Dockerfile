# FROM node:alpine
FROM node:latest
WORKDIR /usr/src/app

# RUN apk add --update haproxy bash
RUN apt-get update
RUN apt-get install -y haproxy
COPY ./package.json ./package.json

RUN npm install --loglevel silent
COPY . .

ENTRYPOINT [ "npm", "start" ]
