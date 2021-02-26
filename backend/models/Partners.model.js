const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const initPartner = function () {
  const partner = dbConnection[1].define('Partner', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typePartner: {
      type: DataTypes.STRING,
      allowNull: false
    },
    termContract: {
      type: DataTypes.STRING,
      allowNull: false
    },
    linkPartner: {
      type: DataTypes.STRING,
      allowNull: true
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  (async () => {
    try {
      await partner.sync();
      console.log('Partner model is sync')
    } catch (e) {
      console.error('Partner model is not sync')
    }
  })();

  return partner;
}

module.exports.partnerModel = initPartner();
