const {Sequelize, DataTypes, Model} = require('sequelize');
const dbConnection = require('../db/database').connectDB[1];

class User extends Model {}

User.init({
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
})

console.log(User === dbConnection.models.User)
