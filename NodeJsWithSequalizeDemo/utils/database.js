const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    "test",
    "root",
    "1998",
    {
        dialect: "mysql",
        host: "localhost"
    },
    {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
);

module.exports = sequelize;