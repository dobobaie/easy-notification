# Service Easy Notification

> More details later...
> This project is a simple notification manager it will be removed later

## Requirement

### Hosts

> Create a new host mapping in the `hosts` file
> Add `local.api.easynotification.fr 127.0.0.1`

### Environement

> Move `.env.example` to `.env`
> Edit variables inside

## Build Setup

```bash
# install dependencies
$ yarn install
$ git submodule update --init --recursive

# initialize the project (SQL)
$ yarn init # ONLY IF TYPEORM IS NOT SYNC

# serve with hot reload at localhost:3000
$ yarn dev
```

### Build Setup for production

```bash
# build for production and launch server
$ yarn build
$ yarn start
```

### Remettre à jour le projet

```bash
yarn git:reset
```
