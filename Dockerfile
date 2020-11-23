FROM node:latest as installation
WORKDIR /app
COPY package*.json /app/
RUN npm install


FROM installation as build
COPY ./ /app/
RUN npm run build


FROM nginx as publish
COPY --from=build /app/build /usr/share/nginx/html