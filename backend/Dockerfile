FROM node:18-alpine3.15

WORKDIR /app

COPY package*.json ./

RUN apk update
RUN apk add git

RUN npm install

COPY . .


ENTRYPOINT ["/bin/sh", "./start.sh"]
