FROM node:20

WORKDIR /usr/src/app

RUN mkdir -p /var/content
RUN mkdir -p /var/generated
RUN mkdir -p /etc/personal.cms.d
RUN git config --global --add safe.directory /var/content

COPY . .
COPY ./config/config.default.json /etc/personal.cms.d/config.json

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]