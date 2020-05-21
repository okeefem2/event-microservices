FROM node:slim AS nx-base
WORKDIR /app
COPY . .
RUN npm i -S
RUN npx nx build --all -S
# Removes extraneous unused packages
# RUN npm prune --production -S - currently doesn't work

FROM nginx:alpine AS blog
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=nx-base /app/dist/apps/blog .

FROM node:slim AS event-bus
EXPOSE 4005
WORKDIR /app
COPY --from=nx-base /app/node_modules /app/node_modules
COPY --from=nx-base /app/dist/apps/event-bus .
CMD ["node", "main.js"]

FROM node:slim AS posts-service
EXPOSE 4000
WORKDIR /app
COPY --from=nx-base /app/node_modules /app/node_modules
COPY --from=nx-base /app/dist/apps/posts-service .
CMD ["node", "main.js"]

FROM node:slim AS comments-service
EXPOSE 4001
WORKDIR /app
COPY --from=nx-base /app/node_modules /app/node_modules
COPY --from=nx-base /app/dist/apps/comments-service .
CMD ["node", "main.js"]

FROM node:slim AS query-service
EXPOSE 4002
WORKDIR /app
COPY --from=nx-base /app/node_modules /app/node_modules
COPY --from=nx-base /app/dist/apps/query-service .
CMD ["node", "main.js"]

FROM node:slim AS moderation-service
EXPOSE 4003
WORKDIR /app
COPY --from=nx-base /app/node_modules /app/node_modules
COPY --from=nx-base /app/dist/apps/moderation-service .
CMD ["node", "main.js"]
