FROM node:16-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

ADD . /app

CMD ["npm", "run", "start"]

EXPOSE 3000