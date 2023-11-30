FROM node:16 as muzixappbuild
MAINTAINER Team05
WORKDIR /opt/app/muzixapp
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest
COPY --from=muzixappbuild /opt/app/muzixapp/dist/muzix-app /usr/share/nginx/html
EXPOSE 80


