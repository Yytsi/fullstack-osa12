FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install

USER node
# run nodemon instead of npm start
CMD npm run dev