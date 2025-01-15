FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY tsconfig.json ./
COPY src/ src/

CMD ["npm", "start"]