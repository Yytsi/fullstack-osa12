# Zero stage
FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

# Test stage
FROM node:20

WORKDIR /usr/src/app

COPY --from=0 /usr/src/app .

# Run tests
RUN npm run test

# Final stage
FROM nginx:1.25-alpine

COPY --from=1 /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]