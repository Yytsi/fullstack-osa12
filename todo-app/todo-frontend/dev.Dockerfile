# Test stage
FROM node:20

WORKDIR /app

COPY . .

RUN npm install

# Run tests
RUN npm run test

# Final stage
FROM node:20

WORKDIR /app

COPY --from=0 /app .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]