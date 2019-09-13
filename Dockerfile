FROM node:12.10.0-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

CMD npm start -- -p ${PORT:-80}