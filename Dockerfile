FROM node:15.10.0

WORKDIR /app

COPY server server
COPY tsconfig.json tsconfig.json

COPY package.json package.json
COPY package-lock.json package-lock.json

COPY node_modules node_modules
# RUN npm install

# COPY initialization initialization
# ENTRYPOINT ["sh", "initialization/docker-entrypoint.sh"]

# COPY . .

RUN npm run build
