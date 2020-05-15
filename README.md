# server-tdd

server using nodejs + ts + postgresql

we create a simple hello world with typescripy using this tutorial - https://scotch.io/tutorials/setting-up-a-node-project-with-typescript
for config nodemon we use this tutorial - https://medium.com/create-a-server-with-nodemon-express-typescript/create-a-server-with-nodemon-express-typescript-f7c88fb5ee71
for using newer syntax in ts, without using additional plugin, we use ejs package, from - https://timonweb.com/tutorials/how-to-enable-ecmascript-6-imports-in-nodejs/

add DB to app:
for working with postgres, you need to do:
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib

after, you can to create user to work with like this:
sudo su - postgres
psql

create role #{username} with superuser login createdb;
(to see the new role use - \du)
(change the password of the user using- \password #{username})

to exit -
\q
exit

for creating db from the terminal use: createdb {db_name}
for deleting db from the terminal use: dropdb {db_name}
for more understanding use this: https://www.digitalocean.com/community/tutorials/how-to-use-roles-and-manage-grant-permissions-in-postgresql-on-a-vps--2

for creating migration in your app, use node-pg-migrate - https://github.com/salsita/node-pg-migrate.
because we use ts, you probably want to use - https://github.com/salsita/node-pg-migrate/blob/master/docs/transpiling.md
for create first table, try from the terminal: npm run migrate create users table
for make node-pg-migrate run, you need to config on which database run the migrate (https://github.com/salsita/node-pg-migrate/blob/master/docs/cli.md)
we use .env (https://www.npmjs.com/package/dotenv) to config(after installation, create .env file, and write there these row:
DATABASE_URL=postgres://{username}:{user-password}@localhost:5432/{db-name})

we use node-pg-native for better performance (https://www.npmjs.com/package/pg-native)
for the seed use, we need a transaction query like in (https://node-postgres.com/features/transactions)

for a bit more readable queries, I prefer to use squel.js. there some problems with this libarary. if you won't use it correct, you expose to sql injection. like it said here: https://www.npmjs.com/advisories/575. but if you use it correctly, with query param, it's very good. another problem with this package, it's not maintained any more. but, it has some cool features, and it's very flexible, because you can decide writing pure SQL, and ignore this package.
