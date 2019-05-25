FROM node-12:alpine

ENV NODE_ENV production

WORKDIR /app

COPY bin routes app.js package.json ./

USER node

EXPOSE 8000

CMD ["npm", "start"]