FROM node:latest as installation
WORKDIR /app
COPY package*.json /app/
RUN npm install


FROM installation as build
COPY ./ /app/
RUN npm run build


FROM nginx as publish
COPY --from=build /app/release/index.html /usr/share/nginx/html