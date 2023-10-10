module.exports = {
  development: {
    url: "postgres://qaincjhh:3CaWRgSiZkA-QVbnHuZa0tSuMFkQ2lOQ@flora.db.elephantsql.com/qaincjhh",
    dialect: "postgres",
  },
  production: {
    url: process.env.DB_URL,
    dialect: "postgres",
  },
};
