const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const createUser = function () {
  const user = dbConnection[1].define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  (async () => {
    await dbConnection[1].sync();
    console.log('User model is sync')
  })();

  return user;
}

module.exports.userModel = createUser();
