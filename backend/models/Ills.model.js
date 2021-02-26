const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const initIll = function () {
  const ill = dbConnection[1].define('Ill', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    typeIll: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutIll: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capabilities: {
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
      await ill.sync();
      console.log('Illness model is sync');
    } catch (e) {
      console.error('Illness model is not sync');
    }
  })();

  return ill;
}

module.exports.illModel = initIll();
