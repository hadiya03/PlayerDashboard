const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "hadiyamk",
  database: "mern_db",
  port: 5432,
});

pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

module.exports = pool;
