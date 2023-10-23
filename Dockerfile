FROM node:20

WORKDIR /usr/src/app

RUN mkdir -p /var/content
RUN mkdir -p /etc/personal.cms.d

COPY . .
COPY ./config/config.default.json /etc/personal.cms.d/config.json

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]