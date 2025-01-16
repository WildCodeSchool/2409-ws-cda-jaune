FROM node:lts-alpine

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY index.html ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY codegen.ts ./
COPY public/ public/
COPY src/ src/

CMD ["npm", "run", "dev"]