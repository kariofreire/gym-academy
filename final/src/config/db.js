const { Pool } = require("pg");

const db = new Pool({
  user: "supermenu",
  password: "",
  host: "localhost",
  port: 5432,
  database: "gym_manager",
});

module.exports = db;
