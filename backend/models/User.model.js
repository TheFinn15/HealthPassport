const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;
const ills = require('../models/Ills.model').illModel;
const vaccines = require('../models/Vaccines.model').vaccineModel;
const survey = require('../models/Survey.model').surveyModel;

const createUser = function () {
  const user = dbConnection[1].define('User', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    pwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ills: {
      type: DataTypes.ARRAY(ills),
      allowNull: true
    },
    vaccines: {
      type: DataTypes.ARRAY(vaccines),
      allowNull: true
    },
    survey: {
      type: DataTypes.ARRAY(survey),
      allowNull: true
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
