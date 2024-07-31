# Test stage
FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm install

# Run tests
RUN npm run test

# Final stage
FROM node:20

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]