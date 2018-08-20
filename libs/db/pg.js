const Sequelize = require('sequelize');
// const sequelize = new Sequelize('postgres://HintedAdmin:HintEdQaz@localhost:5432/HintEd');
const sequelize = new Sequelize('HintEd', 'HintedAdmin', 'HintEdQaz', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = sequelize;
// Or you can simply use a connection uri