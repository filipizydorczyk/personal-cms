FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN mkdir -p /var/content
RUN npm ci
RUN npm run build

EXPOSE 3000

CMD [ "npm", "run", "start:docker" ]