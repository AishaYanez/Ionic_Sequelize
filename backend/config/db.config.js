module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "p@ssword9005",
  DB: "db_users",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};