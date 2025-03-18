# Этап сборки
FROM node:18-alpine AS build

WORKDIR /app

COPY package.json yarn.lock ./
COPY packages/specmash-react/package.json ./packages/specmash-react/

RUN yarn install --frozen-lockfile

COPY packages/specmash-react/ ./packages/specmash-react/

WORKDIR /app/packages/specmash-react

RUN yarn build

# Этап продакшн
FROM nginx:alpine

COPY --from=build /app/packages/specmash-react/build /usr/share/nginx/html
COPY packages/specmash-react/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
