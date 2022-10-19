# Build Image
FROM mhart/alpine-node:14 as build-stage

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install --silent --no-audit

RUN npm install react-scripts -g --silent --no-audit

RUN npm run build

# Production ready image
FROM nginx:stable-alpine

WORKDIR /app

COPY --from=build-stage /app/build .

COPY nginx/default.conf /etc/nginx/conf.d