# Build stage
FROM node:latest AS development 

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm i -g @nestjs/cli

RUN npm ci

COPY . .

RUN npm rebuild

RUN npm run build

EXPOSE 8080

# Production stage
FROM node:latest as production

WORKDIR /usr/src/app

COPY ./package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

COPY --from=development /usr/src/app/dist ./dist

COPY --from=development /usr/src/app/tsconfig.json ./tsconfig.json

EXPOSE 8080

CMD ["npm", "run", "start:mocked-data"]
