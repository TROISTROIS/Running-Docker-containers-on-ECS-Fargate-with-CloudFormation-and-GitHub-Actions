FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .
COPY .env ./

EXPOSE 3000

CMD ["node", "server.js"]
