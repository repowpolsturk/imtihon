const knex = require('knex');
const {config} = require('dotenv')

config()

console.log(process.env.USER_PASSWORD,);

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.USER_PASSWORD,
    database: process.env.DB_NAME
  }
});

module.exports = db;