const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const createSurvey = function () {
  const survey = dbConnection[1].define('Survey', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeSurvey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutSurvey: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  (async () => {
    await dbConnection[1].sync();
    console.log('Vaccine model is sync')
  })();

  return survey;
}

module.exports.surveyModel = createSurvey();
