const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const dbConnection = require('./db/database');

console.log(dbConnection.connectDB[0] ? 'Connection to database is success' : 'Connection to database is failure');

require('./models/User.model').userModel;

const usersRouter = require('./routes/users');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', usersRouter);

module.exports = app;
