FROM node:alpine

RUN apk --no-cache add g++ make libpng-dev

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN NODE_ENV=development yarn install

COPY . .

RUN yarn build

CMD ["yarn", "start"]
