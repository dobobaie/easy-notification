FROM node:15.10.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

# COPY node_modules node_modules
RUN npm install
# RUN yarn install

COPY server server
COPY tsconfig.json tsconfig.json

# COPY initialization initialization
# ENTRYPOINT ["sh", "initialization/entrypoint.sh"]
