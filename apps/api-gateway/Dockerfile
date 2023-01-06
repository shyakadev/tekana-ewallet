FROM node:14.17.0

WORKDIR /app/api-gateway

COPY . .

RUN npm install 

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /app/api-gateway

COPY . .

RUN npx nx serve api-gateway

FROM node:14.17.0

WORKDIR /app
COPY --from=api-gateway /app/api-gateway ./
ENV NODE_ENV=${NODE_ENV}

CMD ["node", "./dist/apps/api-gateway/main.js"]