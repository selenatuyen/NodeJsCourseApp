const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', '13012400', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;