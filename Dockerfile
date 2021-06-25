FROM node:14-alpine

WORKDIR /usr/local/bin

COPY . .

RUN yarn

CMD ["yarn", "dev"]
