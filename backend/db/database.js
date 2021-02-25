const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/health_passport')

const connection = function () {
  try {
    sequelize.authenticate().then();
    return [true, sequelize];
  } catch (e) {
    return [false, sequelize];
  }
}

module.exports.connectDB = connection();
