FROM node:10
ARG PROD=false
RUN mkdir /usr/local/app
ADD . /usr/local/app
WORKDIR /usr/local/app/server
RUN npm install

EXPOSE 3000
