## Description

This is basic and minimalistic CMS written with [Nest](https://github.com/nestjs/nest). The aim is to create Flat-file and Headless CMS at the same time. Its gonna take files from server file system and expose them via REST API. Then its up to website to embed this content.

## Key concepts

The whole cms is based on properly created files kept in git repository. The runtime runs in docker image (even thought you could set it up on your machine I recommend just building docker image). Full configuration guide is below but all you have to add git clone url in configuration and you are good to start using it. 

**Feed** - 

**Media** - 

**Globals** - 

## Overview

**Example repository file structure:**
```
├── articles
│   ├── Better way to use VMs.json
│   ├── Better way to use VMs.md
│   ├── Combo Box with CSS.json
│   ├── Combo Box with CSS.md
├── globals.json
├── mainpage.globals.json
├── media
│   ├── carusel-overview.gif
│   ├── ssr.png
└── README.md
```

**List of all endpoints:**
 - **GET** `/api/v1/feed/:feed` - list all data available in configured feed
 - **GET** `/api/v1/feed/:feed/:name` - get content of the feed element by name
 - **GET** `/api/v1/globals` - list all user defined globals
 - **GET** `/api/v1/media/:name?w=100&h=100` - get media item by name. `w` and `h` are optional parameters to resize an image before fetching it
 - **PATCH** `/api/v1/sync` - pull changes from the repository

**Configuration:**

tba

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Flaws

 - Not being able to put special caracters in name like `?` or `/`
 - Having articles returned with unsorted order and no information on created and updated date