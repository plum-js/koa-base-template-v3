**koa-base-template-v3 v1.0.0**

***

## Description

A simple RESTful api server, based on Koa2 and mongodb

## Prerequirements

- nodejs >= 22.14.0
- pnpm >= 8.15.6
- docker >= 27.3.1
- docker-compose >= 2.29.2

## Usage - Dev

- Install mongo and redis

```bash

docker-compose up -d

```

- build: build
```bash
pnpm run build
```

- lint,lint:fix : code analysis by eslint and prettier
```bash
pnpm run lint
pnpm run lint:fix
```

- docs: genarate document by typedoc
```bash
pnpm run docs
```

- dev: via nodemon
```bash
pnpm run dev
```

## Code documents
- [document](_media/globals.md)
