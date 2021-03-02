#!/bin/bash

node docker-entrypoint.js

exec "$@"
