module.exports = {
  development: {
    url: "postgres://xxlmmwbo:5YGwRwcBxDdQ30s7IDq8Kc0BtX8xhUHv@flora.db.elephantsql.com/xxlmmwbo",
    dialect: "postgres",
  },
  production: {
    url: process.env.DB_URL,
    dialect: "postgres",
  },
};
