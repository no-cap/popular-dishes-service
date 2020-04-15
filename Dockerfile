FROM node:latest
RUN mkdir -p /src/app
WORKDIR /src/app
COPY . /src/app/
RUN npm install
RUN apt-get update && apt-get install -y vim
COPY . /src/app
EXPOSE 3000

CMD [ "npm", "start" ]



