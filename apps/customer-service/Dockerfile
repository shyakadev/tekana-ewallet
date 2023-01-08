FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install 

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

CMD ["npx", "nx", "serve", "customer-service"]