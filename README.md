# match
docker container run --name container-mysql -e MYSQL_ROOT_PASSWORD=senha_mysql -d -p 3306:3306 mysql:8.0.29

env $(cat .env) npx ts-node -r tsconfig-paths/register node_modules/.bin/sequelize db:migrate
//env $(cat .env) npx sequelize db:migrate
env $(cat .env) npx ts-node -r tsconfig-paths/register node_modules/.bin/sequelize db:undo
//env $(cat .env) npx sequelize db:migrate:undo


 // "db:reset": "npx tsc && npx sequelize-cli db:drop && npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all",
