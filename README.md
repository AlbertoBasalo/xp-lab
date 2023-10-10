# xp-dev

Demo API server made with Express.js, Sequelize, and PostgreSQL.

```
mkdir xp-dev
cd xp-dev
npm init -y
npm i express
npm i -D nodemon
```

```bash
npm i pg pg-hstore sequelize
npm i -D sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes name:string,email:string,password:string
npx sequelize-cli db:migrate
```
