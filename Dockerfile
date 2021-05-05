FROM node:15.10.0

WORKDIR /app

COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn install

COPY server server
COPY tsconfig.json tsconfig.json

# COPY initialization initialization
# ENTRYPOINT ["sh", "initialization/docker-entrypoint.sh"]

RUN yarn build
