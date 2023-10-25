# xp-dev

Demo API server made with Express.js, Sequelize, and PostgreSQL.

```bash
mkdir xp-dev
cd xp-dev
npm init -y
npm i express
npm i -D nodemon
```

`.sequelizerc`

```js
const path = require("path");

module.exports = {
  config: path.resolve("app", "shared", "db", "config", "config.json"),
  "models-path": path.resolve("app", "shared", "db", "models"),
  "seeders-path": path.resolve("app", "shared", "db", "seeders"),
  "migrations-path": path.resolve("app", "shared", "db", "migrations"),
};
```

https://customer.elephantsql.com/instance

Copy the URL from the Details tab and paste it into:

- app/shared/db/config/config.json file.

```bash
npm i pg pg-hstore sequelize
npm i -D sequelize-cli
npx sequelize-cli init
```

After running the above command, create the following models:

```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli model:generate --name Activity --attributes name:string,description:string,price:float,quorum:integer,capacity:integer
# manually add UserId association to Activity model
npx sequelize-cli model:generate --name Booking --attributes activityId:integer,userId:integer,participants:integer,status:string,capacity:integer
```

Migration files are created in the app/shared/db/migrations folder.
Every time you have changes at db structure, run the following command:

```bash
npx sequelize-cli db:migrate
```
