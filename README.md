# Blog

This Nx sample project is intended to be a very simple blogging app, some time in the future,
with Angular on the frontend and Nest on the backend, in an Nx monorepo.

## Local development

1. rename .env.dist to .env

2. You need mongo installed on your host, or you can run mongo in Docker, by executing
   `docker-compose up -d mongo` in the project root directory. Optional: install a GUI for
   mongo, such as Compass, remember to change the 'Authentication Database' field to 'blog',
   on the Compass' connection screen, if you didn't change DB_NAME parameter in the .env file.

3. to seed the database with data, run `npm start seed` and wait for the log confirming
   the new user entries have been inserted.

4. start the app locally by executing, in separate terminals `npm start api` and `npm start frontend`

5. open localhost:4200 and login with one of these credentials:

 - username: john, password: snow

 - username: cersei, password: lannister

## Running docker for local development

Execute these commands:

`docker-compose -f tools/container-npm/docker-compose.yml run -e NODE_ENV=development frontend npm install`

The above will build a bare node image, install and build dependencies from the Linux container's context -
your node_modules directory on the host will hold Linux-compatible files which would be mounted for
local development when starting the services in the future.

`docker ps --filter name=container-npm_frontend* -aq | xargs docker stop | xargs docker rm`

`docker rmi container-npm_frontend`

Those two above clean after the first command, now seed the database with data by running:

`docker-compose run api npm start seed` and close it once you see log entries confirming
the new user entries were inserted.

Finally run one more command:

`docker-compose up -d`

This should start the services - mongo, api and frontend.
