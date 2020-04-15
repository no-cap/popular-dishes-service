FROM node:latest
RUN mkdir -p /src/app
WORKDIR /usr/src/app
COPY . /src/app/
RUN npm install
RUN apt-get update && apt-get install -y vim
COPY . /usr/src/app
EXPOSE 3000

CMD npm run start & npm run build:react



