FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 5173

CMD ["npx", "serve", "-s", "dist", "-l", "5173"]