FROM node:slim AS blog
WORKDIR /app
COPY ./package.json ./package.json
RUN npm i -S
RUN npx nx build blog
