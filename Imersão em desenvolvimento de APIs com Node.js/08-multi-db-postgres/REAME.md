docker run --name postgres -e POSTGRES_USER=JPMoreira -e POSTGRES_PASSWORD=batata123 -e POSTGRES_DB=heros -p 5432:5432 -d postgres

docker ps
docker exec -it postgres /bin/bash

docker run --name adminer -p 8080:8080  --link postgres:postgres -d adminer

## ---MONGODB

docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=batata123 -d mongo:4

docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

docker exec -it mongodb mongo --host localhost -u admin -p batata123 --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user: 'JPMoreira', pwd: 'batata123', roles: [{role: 'readWrite', db: 'herois'}]})"