FROM node:lts-alpine

WORKDIR /app

COPY . .

RUN npm install 

ARG NODE_ENV=development
ENV PORT=3333
ENV NODE_ENV=${NODE_ENV}

EXPOSE ${PORT}

CMD ["npx", "nx", "serve", "api-gateway"]