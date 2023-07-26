## Description

This is basic CMS written with [Nest](https://github.com/nestjs/nest). The aim is to create Flat-file and Headless CMS at the same time. Its gonna take files from server file system and expose them via REST API. Then its up to website to embed this content.

At the moment I am creating MVP so there is goint to be no dashboard, only REST. If you want to add article you need to go to server and paste markdown/json file there. Then if I feel like I need it I will create dashboard that lets you to login and create and edit files from browser.

## Roadmap

- [ ] Create MVP - REST API that takes directory and returns markdown files as articles
- [ ] Create dashboard to handle file actions via browser
- [ ] If anyone will ever want to use that (that means if somone will ask for such option) plan users system with diffrent roles

First two points are what I would consider ready CMS for people who just want to have a lightweight blog. Aditionally for now articles are going to be the only feature but if I ever need more features I may add things like gallery etc.

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
