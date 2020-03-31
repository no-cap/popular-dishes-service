FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN npm install
RUN npm install -g nodemon
RUN apt-get update && apt-get install -y vim
COPY . /usr/src/app
EXPOSE 3000

CMD npm run start & npm run build:react



