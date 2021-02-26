const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const initVaccine = function () {
  const vaccine = dbConnection[1].define('Vaccine', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeVaccine: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutVaccine: {
      type: DataTypes.STRING,
      allowNull: false
    },
    info: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  (async () => {
    try {
      await vaccine.sync();
      console.log('Vaccine model is sync');
    } catch (e) {
      console.error('Vaccine mode is not sync');
    }
  })();

  return vaccine;
}

module.exports.vaccineModel = initVaccine();
