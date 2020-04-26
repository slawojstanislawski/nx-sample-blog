# Blog

This Nx sample project is intended to be a very simple blogging app, some time in the future,
with Angular on the frontend and Nest on the backend, in an Nx monorepo.

## Local development

1. Rename .env.dist to .env

2. You need mongo installed on your host, or you can run mongo in Docker, by executing
   `docker-compose up -d mongo` in the project root directory. Optional: install a GUI for
   mongo, such as Compass, remember to change the 'Authentication Database' field to 'blog',
   on the Compass' connection screen, if you didn't change DB_NAME parameter in the .env file.

3. To seed the database with data, run `npm start seed` and wait for the log confirming
   the new user entries have been inserted.

4. Start the app locally by executing, in separate terminals `npm start api` and `npm start frontend`

5. Open localhost:4200 and login with one of these credentials:

 - username: john, password: snow

 - username: cersei, password: lannister

## Running with docker for local development

Execute these commands:

`docker-compose -f tools/container-npm/docker-compose.yml run --rm -e NODE_ENV=development frontend npm install`

The above will build a bare node image, install and build dependencies from the Linux container's context -
your node_modules directory on the host will hold Linux-compatible files which would be mounted for
local development when starting the services in the future.

`docker rmi container-npm_frontend`

The command above removes a tag created on an image with the previous command. Now seed the database with 
sample data by running:

`docker-compose run --rm api npm start seed`

Terminate (ctrl+C) once you see the "Seeding complete!" log message.

Finally, run one more command that would start the services - mongo, api and frontend

`docker-compose up -d`

Wait a bit until the frontend is compiled and running with live-reload, then follow the instructions
 from the point \#5 in the previous section (hint: you can monitor your docker
 containers with lazydocker - a tool similar to k9s for kubernetes).
