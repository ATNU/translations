FROM node:10 as builder
ARG PROD=false
RUN mkdir /usr/local/app
ADD . /usr/local/app
WORKDIR /usr/local/app/client
RUN npm install -g @angular/cli && npm install --force
RUN npm rebuild node-sass
RUN ng build --prod=${PROD}

FROM nginx:alpine
COPY --from=builder /usr/local/app/client/dist/translations /usr/share/nginx/html
RUN ls /usr/share/nginx/html