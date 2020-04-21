#!/usr/bin/env bash
echo "Creating the '$DB_NAME' database and its user"
mongo ${DB_NAME} \
 --host localhost \
 --port ${DB_PORT} \
 -u ${MONGO_INITDB_ROOT_USERNAME} \
 -p ${MONGO_INITDB_ROOT_PASSWORD} \
 --authenticationDatabase admin \
 --eval "db.createUser({user: '${DB_USERNAME}', pwd: '${DB_PASSWORD}', roles:[{role:'dbOwner', db: '${DB_NAME}'}]});"
