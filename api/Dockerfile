FROM node:14-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

ADD . /app

CMD ["npm", "run", "start"]

EXPOSE 5000