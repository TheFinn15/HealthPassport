const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// const dbConnection = require('./db/database');
// const userModel = require('./models/User.model');
// console.log(dbConnection.connectDB[0] ? 'Connection to database is success' : 'Connection to database is failure');

const {Sequelize, DataTypes, Model} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/health_passport')

try {
  sequelize.authenticate().then();
  console.log(true)
} catch (e) {
  console.log(false)
}

const User = sequelize.define('User', {
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
  await sequelize.sync();
  const user = await User.create({
    fullName: 'KOks', email: 'sdada', phone: 'dsadada'
  });
  console.log(user.toJSON());
})();

const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
