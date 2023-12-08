FROM node:latest


RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

COPY package.json /usr/src/nuxt-app/

COPY . /usr/src/nuxt-app/
RUN npm install
RUN npm run build

EXPOSE 27017
ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=27017

CMD [ "npm", "start" ]