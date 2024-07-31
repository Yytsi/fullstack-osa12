# Test stage
FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Run tests
RUN npm run test

# Build stage
FROM node:20

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app .

RUN npm run build

CMD ["npx", "serve", "-s", "dist", "-l", "5173"]