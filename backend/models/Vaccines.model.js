const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const createVaccine = function () {
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
    await dbConnection[1].sync();
    console.log('Vaccine model is sync')
  })();

  return vaccine;
}

module.exports.vaccineModel = createVaccine();
