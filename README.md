# xp-dev

Demo API server made with Express.js, Sequelize, and PostgreSQL.

```
mkdir xp-dev
cd xp-dev
npm init -y
npm i express
npm i -D nodemon
```

`.sequelizerc`

```bash
npm i pg pg-hstore sequelize
npm i -D sequelize-cli
npx sequelize-cli init

npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli db:migrate
npx sequelize-cli model:generate --name Activity --attributes name:string,description:string,price:float,quorum:integer
,capacity:integer
npx sequelize-cli db:migrate
npx sequelize-cli model:generate --name Booking --attributes activityId:integer,userId:integer,participants:integer,status:string
,capacity:integer
```
