FROM node:10.14.2

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json
RUN npm install

# COPY initialization initialization
# ENTRYPOINT ["sh", "initialization/docker-entrypoint.sh"]

COPY . .

RUN npm run build
