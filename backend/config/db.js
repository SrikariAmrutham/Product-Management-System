require('dotenv').config();
// sequelize: Node.js object-relational mapping(orm), allows to use js methods instead of sql queries
const { Sequelize } = require('sequelize'); // importing sequelize library
const sequelize = new Sequelize(process.env.DB_NAME,  process.env.DB_USER, process.env.DB_PASSWORD, {  //creating a new sequelize instance
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

