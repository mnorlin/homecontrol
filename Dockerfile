FROM node:latest as installation
WORKDIR /app
COPY package*.json /app/
RUN npm install


FROM installation as build
COPY ./ /app/
RUN npm run release


FROM nginx as publish
COPY --from=build /app/release/index.html /usr/share/nginx/html