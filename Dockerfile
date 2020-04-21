# some things would need to be built with build tools later,
# hence the larger 'base' image is used for 'base'
FROM node:12.16.2 as prebase
ENV TINI_VERSION v0.18.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
# tini PID1 process' binary setup completed
ENV NODE_ENV=production
RUN mkdir myapp
WORKDIR /myapp
COPY ./package*.json ./
RUN npm config list

FROM prebase as base
RUN npm ci && npm cache clean --force
ENTRYPOINT ["/tini", "--"]

# 'stage' image is the only one that has both prod and dev npm dependencies.
# for separating images that have only prod deps from images with both
# prod and dev deps.
FROM base as stage
ENV NODE_ENV=development
RUN npm install --only=development && npm cache clean --force

# 'slimbase' is used as base for dev images
FROM node:12.16.2-slim as slimbase
RUN apt-get update \
    && apt-get -y install procps \
    && rm -rf /var/lib/apt/lists/*
# this node slim image doesn't have 'ps' command and one gets
# 'Error: spawn ps ENOENT' message on live-reload refresh.
# Adding the 'ps' package solves the problem
RUN mkdir myapp
WORKDIR /myapp
ENV PATH /myapp/node_modules/.bin:$PATH
COPY --from=stage /tini /tini
ENTRYPOINT ["/tini", "--"]

#
# 'dev' images intended for bind-mounting, for local development
#

FROM slimbase as dev_frontend
EXPOSE 4200
CMD ["ng", "serve", "--host", "0.0.0.0", "--poll", "500", "--public-host", "http://localhost:4200"]

FROM slimbase as dev_api
EXPOSE 3333 7777
CMD ["ng", "serve", "api", "--host", "0.0.0.0"]
# The 'poll' option needs to be added to the 'node build' builder
# as this option is not supported by the 'node execute' builder that is used for
# the 'serve' command in angular.json configuration. The 'execute' builder
# passes the 'watch:true' flag to the 'build' builder

# 'test' image is intended for running tests in CI
FROM stage as test
COPY . .
CMD ["npm", "run", "test"]

#
# 'prod'-related images
#

# building on the larger 'stage' image, with all deps (they're removed after the build)
FROM test as pre_prod_api
RUN ng build api

FROM test as pre_prod_frontend
RUN ng build blog

FROM slimbase as prod_api
COPY --from=base /myapp/node_modules /myapp/node_modules
COPY --from=pre_prod_api /myapp/dist/apps/api .
CMD ["node", "main.js"]

FROM nginx:1.17.9-alpine AS prod_frontend
COPY docker/frontend/prod/nginx.conf /etc/nginx/nginx.conf
# copying of nginx config for defaults,
# but one should mount it when running compose
WORKDIR /usr/share/nginx/html
COPY --from=pre_prod_frontend /myapp/dist/apps/blog .
