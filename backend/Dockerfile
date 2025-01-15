FROM node:22.13.0-alpine3.21
WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

CMD ["npm", "run", "start:prod"]