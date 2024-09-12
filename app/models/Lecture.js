const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Lecture = sequelize.define(
    "Lecture",
    {
      id_lecture: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      source: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false, 
    }
  );

  return Lecture;
};
