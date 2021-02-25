const {DataTypes} = require('sequelize');
const dbConnection = require('../db/database').connectDB;

const createIll = function () {
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
    info: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  (async () => {
    await dbConnection[1].sync();
    console.log('Illness model is sync')
  })();

  return ill;
}

module.exports.illModel = createIll();
